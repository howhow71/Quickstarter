var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: '123', loggedIn: false }));
app.use(express.static(path.join(__dirname, 'public')));
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

/// Database setup
var connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

connection.connect(function(err) {
  if (!err) console.log('Database is connected... \n\n');
  else console.log('Error connecting to database... \n\n');
});

/**********
 * ROUTES *
 **********/

/*
 * Express router
 */
app.use(function(req, res, next) {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.accountEmail = req.session.accountEmail;
  res.locals.userName = req.session.userName;
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.formatDate = function(rawDate) {
    var date = new Date(rawDate);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  next();
});

/************************************ App *************************************/
/*
 * GET - Home page
 * Renders the landing/home page
 */
app.get('/', function(req, res, next) {
  // var query = "SELECT * from category;";
  var query = "SELECT category.name, category.image_url, 0 AS avg_funding " +
              "FROM category " +
              "WHERE NOT EXISTS (SELECT * FROM classify, back " +
				                "WHERE classify.campaign_id = back.campaign_id " +
                                "AND classify.category_name = category.name) " +
              "UNION " +
              "SELECT category.name, category.image_url, avg(totalFund.total) AS avg_funding " +
              "FROM category, classify, (SELECT campaign.id AS id, sum(back.amount) AS total  " +
						                "FROM campaign, back " +
						                "WHERE campaign.id = back.campaign_id " +
						                "GROUP BY campaign.id) totalFund " +
              "WHERE totalFund.id = classify.campaign_id AND classify.category_name = category.name " +
              "GROUP BY category.name, category.image_url " +
              "ORDER BY avg_funding DESC;";
  var callback = function(err, rows) {
    req.categories = rows.slice(0, 6); // get top 6 categories
    next();
  };
  dbQuery(query, callback);
}, function(req, res) {
  res.render('index', {
    title: 'Quickstarter',
    categories: req.categories
  });
});

/* GET - Show login
 * Renders login page
 */
app.get('/login', function(req, res) {
  res.render('account/login', {
    title: 'Log in'
  });
});

/* POST - Create session
 */
app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var query = '';
  if (email && password) {
    query = 'SELECT * FROM account ' +
              'WHERE email = \'' + email + '\' ' +
              'AND password = \'' + password + '\';';
  } else {
    query = 'SELECT * FROM account;'
  }

  if (isAdmin(email)) {
    req.session.isAdmin = true;
  }

  var callback = function(err, rows) {
    if (rows.length === 1) {
      req.session.loggedIn = true;
      req.session.accountEmail = rows[0].email;
      req.session.userName = rows[0].full_name;
      res.redirect('/');
    } else {
      console.log("Got into else");
      res.redirect('/login');
    }
  };

  dbQuery(query, callback);
});

/* GET- User Logout
 */
app.get('/logout', function(req, res) {
  req.session.accountEmail = '';
  req.session.userName = '';
  req.session.loggedIn = false;
  req.session.isAdmin = false;
  res.redirect('/');
});

/*
 * GET - Search page
 * Renders all campaigns for a search
 */
app.get('/search', function(req, res) {
  var searchtext = "%" + req.query.search + "%";
  var titletext = '"' + req.query.search + '"';
  console.log("Gets here in search with search = " + searchtext);
  var query = "SELECT c.id, a.full_name as owner_name, c.title, c.description, c.start_date, c.end_date, c.target_fund, c.image_url " +
              "FROM campaign c, account a " +
              "WHERE (c.title like '" + searchtext + "' OR c.description like '" + searchtext + "') AND a.email=c.owner;";
  var callback = function(err, rows) {
    res.render('search/index', {
      title: 'Search: ' + titletext,
      campaigns: rows
    });
  }
  dbQuery(query, callback);
});

/********************************** Accounts **********************************/
/*
 * GET - Individual account page
 * Renders the account detail page
 */
app.get('/account/:email', function(req, res) {
  var email = req.params.email;
  var query = "SELECT * from account WHERE email='" + email + "';";
  var callback = function(err, rows){
    if (rows.length === 0) {
      res.redirect('/admin/accounts');
      return;
    }

    res.render('account/show', {
      title: rows[0].full_name,
      account: rows[0]
    });
  };
  dbQuery(query, callback);
});

/*
 * GET - Signup page
 * Renders page for a new signup
 */
app.get('/signup', function(req, res) {
   res.render('signup/index', {
     title: 'Signup for a new Quickstarter account'
  });
});

/* POST - New account
 * Creates a new account with form
 */
app.post('/accounts/createAccount', function (req, res) {
  var email = req.body.email;
  var fname = req.body.fname;
  var lname  = req.body.lname;
  var pass = req.body.password;
  var query = "INSERT INTO account (email, password, full_name, is_admin) VALUES(" + "'" + email + "'" + "," + "'" + pass + "'" +  "," + "'" + fname + " " + lname + "'" +  "," + "0" + ");";
  var callback = function(err, rows){
    if (err) {
      res.redirect('/signup');
    } else {
      res.redirect('/login');
    }
  };
  dbQuery(query, callback);
});

/* GET - Edit account information page
 * Renders a page that allows accounts to edit their information
 */
app.get('/account/edit/:id', function(req, res) {
  var email = req.params.id;
  var query = "SELECT * from account WHERE email='" + email + "';";
  var callback = function(err, rows){
    if (rows.length === 0) {
      res.redirect('/');
      return;
    }

    res.render('account/edit', {
      title: "Update account",
      email: rows[0].email,
      password: rows[0].password,
      full_name: rows[0].full_name,
    });
  };
  dbQuery(query, callback);
});

/* PUT - Update account information
 * Edits the account information in database
 */
app.put('/account/:id', function(req, res) {
  var id = decodeURI(req.params.id);
  var email = req.body.email;
  var password = req.body.password;
  var full_name = req.body.full_name;
  var query = "UPDATE account " +
              "SET email='" + email + "', password='" + password + "', full_name='" + full_name + "' " +
              "WHERE email='" + id + "';";
  var callback = function(err, rows) {
    if (!err) {
      req.session.accountEmail = email;
      req.session.userName = full_name;
      res.redirect('/');
      return;
    }
    res.send({
      status: 'Failed!'
    });
  };
  dbQuery(query, callback);
});

/* DELETE - Removes a account
 * Deletes a account from the database
 */
app.delete('/account/:id', function(req, res) {
  var id = decodeURI(req.params.id);
  if (id !== 'admin@quickstarter.com') {
    var query = 'DELETE FROM account WHERE email = \'' + id + '\';';
    var callback = function(err, rows) {
      res.redirect("/admin/accounts");
    };
    dbQuery(query, callback);
  } else {
    res.send({
      status: 'Error'
    });
  }
});

/********************************* Categories *********************************/
/* GET - Category page
 * Renders the list of categories
 */
app.get('/categories', function(req, res) {
  var query = "SELECT * from category;";
  var callback = function(err, rows){
    res.render('category/index', {
      title: 'Categories',
      categories: rows
    });
  };
  dbQuery(query, callback);
});

/* GET - Get new category form
 * (admin only)
 */
app.get('/category/new', function(req, res) {
  if (!res.locals.isAdmin) {
    res.redirect("/categories");
    return;
  }
  res.render("category/new", {
    title: "Create Category"
  });
});

/* POST - Create new category
 * (admin only)
 */
app.post('/category/new', function(req, res) {
  if (!res.locals.isAdmin) {
    res.redirect("/categories");
    return;
  }
  var name = decodeURI(req.body.name);
  var image_url = req.body.image_url;
  var query = "INSERT INTO category (name, image_url) VALUES ('" + name + "','" + image_url + "');"
  var callback = function(err, rows) {
    res.redirect("/categories");
  }
  dbQuery(query, callback);
});

/*
 * GET - Edit category form
 * Renders the category edit page (admin only)
 */
app.get('/category/edit/:category', function(req, res) {
  if (!res.locals.isAdmin) {
    res.redirect("/categories");
    return;
  }
  var name = req.params.category;
  var query = "SELECT * FROM category WHERE name='" + name + "';";
  var callback = function(err, rows) {
    var category = rows[0];
    res.render("category/edit", {
      title: "Edit Category: " + name,
      category: category
    })
  }
  dbQuery(query, callback);
});

/*
 * PUT - Update category
 * (admin only)
 */
app.put('/category/edit/:category', function(req, res) {
  if (!res.locals.isAdmin) {
    res.redirect("/categories");
    return;
  }
  var oldName = req.params.category;
  var name = req.body.name;
  var image_url = req.body.image_url;
  var query = "UPDATE category SET name='" + name + "', image_url='" + image_url + "' WHERE name='" + oldName + "';";
  var callback = function() {
    res.redirect("/categories");
  }
  dbQuery(query, callback);
});

/* GET - Individual Category page
 * Renders the campaigns for the given category
 */
app.get('/category/:category', function(req, res) {
  var category = req.params.category;
  var query = "SELECT c.id, c.title, c.description, c.image_url " +
              "FROM campaign c, classify k " +
              "WHERE k.category_name='" + category + "' AND k.campaign_id=c.id;";
  var callback = function(err, rows) {
    res.render('campaign/index', {
      title: 'Category > ' + category,
      campaigns: rows
    });
  }
  dbQuery(query, callback);
});

/* DELETE - Delete category
 * Deletes the given category (admin only)
 */
app.delete('/category/:category', function(req, res) {
  if (!res.locals.isAdmin) {
    res.redirect("/categories");
    return;
  }
  var name = req.params.category;
  var query = "DELETE FROM category WHERE name='" + name + "';";
  var callback = function(err, rows) {
    res.redirect("/categories");
  }
  dbQuery(query, callback);
});

/********************************** Campaigns *********************************/
/*
 * GET - Index campaign
 * Renders all campaigns
 */
app.get('/campaigns', function(req, res) {
  var query = "SELECT c.id, c.title, c.description, c.image_url " +
              "FROM campaign c;";
  var callback = function(err, rows) {
    res.render('campaign/index', {
      title: 'Campaigns',
      campaigns: rows
    });
  }
  dbQuery(query, callback);
});

/*
 * GET - New campaign
 * Renders new campaign form
 */
app.get("/campaign/new", function(req, res) {
  var query = "SELECT name FROM category;";
  var callback = function(err, rows) {
    res.render("campaign/new", {
      title: "Create New Campaign",
      categories: rows
    });
  }
  dbQuery(query, callback);
});

/*
 * GET - Edit campaign page
 * Renders the page to edit the campaign
 */
app.get('/campaign/edit/:id', function(req, res) {
  var id = req.params.id;
  var campaign;
  var categories;
  var classifications;
  var numRequirements = 3;
  var processed = 0;
  var update = function() {
    processed++;
    if (processed == numRequirements) {
      /* populate classification set */
      classificationSet = {}
      for (var i=0; i<classifications.length; i++) {
        var category_name = classifications[i].category_name;
        classificationSet[category_name] = true;
      }
      /* ensure editor is admin or correct user */
      if (!res.locals.isAdmin && campaign.owner != res.locals.accountEmail) {
        res.redirect('/campaign/:id');
        return;
      }
      res.render('campaign/edit', {
        title: "Edit Campaign",
        campaign: campaign,
        categories: categories,
        classificationSet: classificationSet
      });
    }
  }
  var query1 = "SELECT name FROM category;";
  var query2 = "SELECT * FROM campaign WHERE id='" + id + "';";
  var query3 = "SELECT category_name FROM classify WHERE campaign_id='" + id + "';"
  var callback1 = function(err, rows) {
    categories = rows;
    update();
  }
  var callback2 = function(err, rows) {
    campaign = rows[0];
    update();
  }
  var callback3 = function(err, rows) {
    classifications = rows;
    update();
  }
  dbQuery(query1, callback1);
  dbQuery(query2, callback2);
  dbQuery(query3, callback3);
});

/*
 * GET - Show campaign
 * Renders the page for the given campaign
 */
app.get('/campaign/:id', function(req, res) {
  var id = req.params.id;
  console.log("check id: " + id);
  var query = "(SELECT a.full_name as owner_name, c.owner, c.id, c.title, c.description, c.start_date, c.end_date, c.target_fund, SUM(b.amount) AS pledged, c.image_url " +
              "FROM account a, back b, campaign c " +
              "WHERE a.email=c.owner AND b.campaign_id=c.id AND c.id=" + id + " " +
              "GROUP BY a.full_name, c.owner, c.id, c.title, c.description, c.start_date, c.end_date, c.target_fund, c.image_url) " +
              "UNION " +
              "(SELECT a.full_name as owner_name, c.owner, c.id, c.title, c.description, c.start_date, c.end_date, c.target_fund, 0 AS pledged, c.image_url " +
              "FROM account a, campaign c " +
              "WHERE NOT EXISTS (" +
                "SELECT * " +
                "FROM back b " +
                "WHERE b.campaign_id=c.id " +
              ") AND a.email=c.owner AND c.id=" + id + ");";
  var callback = function(err, rows) {
    if (err) {
      res.redirect('/campaigns');
      return;
    }
    res.render('campaign/show', {
      title: rows[0].title,
      campaign: rows[0]
    });
  }
  dbQuery(query, callback);
});

/*
 * POST - Create campaign
 * Creates new campaign in database
 */
app.post("/campaign/new", function(req, res) {
  var title = req.body.title;
  var sdate = req.body.sdate;
  var edate = req.body.edate;
  var goal = req.body.goal;
  var image_url = req.body.img_url;
  var desc = req.body.desc;
  var categories = req.body.categories

  if (categories === undefined) {
    return res.send('At least one category is needed');
  }

  /* 1: insert new campaign entry to campaign table */
  var query1 = "INSERT INTO campaign (owner, title, description, start_date, end_date, target_fund, image_url) VALUES( '"+ res.locals.accountEmail + "', '" +
    title + "', '" + desc + "', '" + sdate + "', '" + edate + "', " + goal + ", '" + image_url + "');";

    dbQuery(query1, function(err, rows){
    if (err) {
      res.redirect('/campaign/new');
      return;
    }
    var id = rows.insertId;
    /* 2: insert campaign classifications to classify table */

    var query2 = "INSERT INTO classify (campaign_id, category_name) VALUES ";
    for (var i=0; i<categories.length; i++) {
      query2 += "(" + id + ", '" + categories[i] + "')";
      query2 += (i<categories.length-1)? ",": ";";
    }
    dbQuery(query2, function(err, rows){
      if (err) {
        res.redirect('/campaign/new');
        return;
      }
      res.redirect('/campaign/' + id);
    });
  });
});

/*
 * PUT - Update campaign
 * Updates the campaign with newly submitted form
 */
app.put('/campaign/:id', function(req, res) {
  var id = req.params.id;
  var title = req.body.title;
  var start_date = req.body.sdate;
  var end_date = req.body.edate;
  var target_fund = req.body.goal;
  var image_url = req.body.img_url;
  var description = req.body.desc;
  var categories = req.body.categories

  if (categories === undefined) {
    return res.send('At least one category is needed');
  }

  /* 1: update campaign entry in campaign table */
  var query1 = "UPDATE campaign SET " +
                "title='" + title + "', " +
                "description='" + description + "', " +
                "start_date='" + start_date + "', " +
                "end_date='" + end_date + "', " +
                "target_fund='" + target_fund + "', " +
                "image_url='" + image_url + "', " +
                "description='" + description + "' " +
              "WHERE id='" + id + "';";
  dbQuery(query1, function(err, rows) {
    /* 2: delete all classifications for campaign in classify table */
    var query2 = "DELETE FROM classify WHERE campaign_id='" + id + "'";
    dbQuery(query2, function(err, rows) {
      /* 3: insert all newly chosen categories for campaign to classify table */
      var query3 = "INSERT INTO classify (campaign_id, category_name) VALUES ";
      for (var i=0; i<categories.length; i++) {
        query3 += "(" + id + ", '" + categories[i] + "')";
        query3 += (i<categories.length-1)? ",": ";";
      }
      dbQuery(query3, function(err, rows) {
        res.redirect("/campaign/" + id);
      });
    });
  });
});

/*
 * DELETE - Delete campaign
 * Deletes the campaign
 */
app.delete('/campaign/:id', function(req, res) {
  var id = req.params.id;
  var query = "DELETE FROM campaign WHERE id = '" + id + "';";
  var callback = function(err, rows) {
    res.redirect("/campaigns");
  }
  dbQuery(query, callback);
});

/******************************** Transactions ********************************/
/* POST - Create transaction
 */
app.post('/transaction/send', function(req, res) {
  var id = req.body.id;
  var amount = req.body.amount;
  var accountEmail = res.locals.accountEmail;
  var cardNumber = req.body.cardNumber;
  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var query = "INSERT INTO back (account_email, campaign_id, amount, credit_card, time) " +
              "VALUES ('" + accountEmail + "', '" + id + "', '" + amount + "', '" + cardNumber + "', '" + date + "');"
  var callback = function(err, rows) {
    res.redirect('/campaign/' + id);
  };

  dbQuery(query, callback);
});

/* GET - Edit transaction form
 * (admin only)
 */
app.get("/transaction/edit/:account_email/:campaign_id", function(req, res) {
  if (!res.locals.isAdmin) {
    res.redirect("/");
    return;
  }
  var account_email = req.params.account_email;
  var campaign_id = req.params.campaign_id;
  var query = "SELECT * FROM back WHERE account_email='" + account_email + "' AND campaign_id='" + campaign_id + "';";
  var callback = function(err, rows) {
    res.render("transaction/edit", {
      title: "Edit Transaction",
      transaction: rows[0]
    });
  }
  dbQuery(query, callback);
});

/* PUT - Update transaction
 * (admin only)
 */
app.put("/transaction/:account_email/:campaign_id", function(req, res) {
  if (!res.locals.isAdmin) {
    res.redirect("/");
    return;
  }
  var old_account_email = req.params.account_email;
  var old_campaign_id = req.params.campaign_id;
  var account_email = req.body.account_email;
  var campaign_id = req.body.campaign_id;
  var amount = req.body.amount;
  var credit_card = req.body.credit_card;
  var time = req.body.time;
  var query = "UPDATE back SET " +
                "account_email = '" + account_email + "', " +
                "campaign_id = '" + campaign_id + "', " +
                "amount = '" + amount + "', " +
                "credit_card = '" + credit_card + "', " +
                "time = '" + time + "' " +
              "WHERE account_email='" + old_account_email + "' AND campaign_id='" + old_campaign_id + "';";
  var callback = function(err, rows) {
    res.redirect("/admin/transactions");
  }
  dbQuery(query, callback);
});

/* DELETE - Delete transaction
 * (admin only)
 */
app.delete("/transaction/:account_email/:campaign_id", function(req, res) {
  if (!res.locals.isAdmin) {
    res.redirect("/");
    return;
  }
  var account_email = req.params.account_email;
  var campaign_id = req.params.campaign_id;
  var query = "DELETE FROM back WHERE account_email='" + account_email + "' AND campaign_id='" + campaign_id + "';";
  var callback = function(err, rows) {
    res.redirect("/admin/transactions");
  }
  dbQuery(query, callback);
});

/* GET - create new transaction
 * Renders transaction page
 */
app.get('/transaction/:id/:amount', function(req, res) {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  res.render('transaction/index', {
    title: 'Back this project',
    id: req.params.id,
    amount: req.params.amount
  });
});

/************************************ Admin ***********************************/
/* GET - List of accounts page
 * Should only be accessed by admins
 * Renders a page that lists all accounts
 */
app.get('/admin/accounts', function(req, res) {
  if (!req.session.isAdmin) {
    return res.redirect('/');
  }

  var query = "SELECT * FROM account;";
  var callback = function(err, rows){
    res.render('admin/accounts', {
      title: 'Accounts',
      accounts: rows
    });
  };
  dbQuery(query, callback);
});

/* GET - Index transaction
 * Renders all transactions on the platform
 */
app.get('/admin/transactions', function(req, res) {
  console.log(req.session.isAdmin);
  if (!req.session.isAdmin) {
    return res.redirect('/');
  }
  var query = 'SELECT * FROM quickstarter.back';
  var callback = function(err, rows) {
    res.render('admin/transactions', {
      title: 'User Transactions',
      transactions: rows
    });
  };
  dbQuery(query, callback);
});

module.exports = app;

/********************
 * Helper functions *
 *******************/

function dbQuery(query, callback){
  connection.query(query, function(err, rows, fields) {
    if (!err) console.log('Query response: ', rows);
    else console.log('Error:', err);
    callback(err, rows);
  });
 }

function isAdmin(email) {
  return email === 'admin@quickstarter.com';
}

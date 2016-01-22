CREATE TABLE account (
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	full_name VARCHAR(255) NOT NULL,
	is_admin BOOLEAN NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE campaign (
	id INT NOT NULL AUTO_INCREMENT,
	owner VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	target_fund INT NOT NULL,	
	image_url VARCHAR(255),
	PRIMARY KEY (id)
);
delimiter $$
CREATE TRIGGER validate_campaign BEFORE INSERT ON campaign
  FOR EACH ROW
  BEGIN
		IF NEW.target_fund <= 0 THEN						-- cannot have invalid targets
			signal sqlstate '45000' SET message_text = 'check constraint on campaign.target_fund failed';
		ELSEIF NEW.start_date>NEW.end_date THEN -- cannot start after end date
			signal sqlstate '45000' SET message_text = 'check constraint on campaign start/end dates failed';
		END IF;
END;$$
delimiter ;

CREATE TABLE back (
	account_email VARCHAR(255) NOT NULL,
	campaign_id INT NOT NULL,
	amount INT NOT NULL,
	credit_card CHAR(16) NOT NULL,
	time DATETIME NOT NULL,
	PRIMARY KEY (account_email, campaign_id),
	FOREIGN KEY (account_email) REFERENCES account(email) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE CASCADE ON UPDATE CASCADE
);
delimiter $$
CREATE TRIGGER validate_transaction BEFORE INSERT ON back
  FOR EACH ROW
  BEGIN
		IF NEW.amount <= 0 THEN	-- cannot have invalid amounts
			signal sqlstate '45000' SET message_text = 'check constraint on back.amount failed';
		END IF;
END;$$
delimiter ;

CREATE TABLE category (
	name VARCHAR(255) NOT NULL,
	image_url VARCHAR(255) NOT NULL,
	PRIMARY KEY (name)
);

CREATE TABLE classify (
	campaign_id INT NOT NULL,
	category_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (campaign_id, category_name),
	FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (category_name) REFERENCES category(name) ON DELETE CASCADE ON UPDATE CASCADE
);
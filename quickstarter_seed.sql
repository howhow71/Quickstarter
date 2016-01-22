/* category seeds */
INSERT INTO category (name, image_url) VALUES
  ('Technology', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/technology.jpg'),
  ('Games', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/games.jpg'),
  ('Film and Video', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/filmandvideo.jpg'),
  ('Design', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/design.jpg'),
  ('Music', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/music.jpg'),
  ('Photography', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/photography.jpg'),
  ('Fashion', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/fashion.jpg'),
  ('Publishing', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/publishing.jpg'),
  ('Crafts', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/crafts.jpg'),
  ('Art', 'https://s3-ap-southeast-1.amazonaws.com/quickstarter/categories/art.jpg');

/* account seeds */
INSERT INTO account (email, password, full_name, is_admin) VALUES
  (
    'admin@quickstarter.com',
    'foobar',
    'admin',
    1
  ),
  (
    'jin@email.com',
    'foobar',
    'Jin Zhe',
    0
  ),
  (
    'bili@email.com',
    'foobar',
    'Xu Bili',
    0
  ),
  (
    'andrew@email.com',
    'foobar',
    'Andrew Pouleson',
    0
  ),
  (
    'quang@email.com',
    'foobar',
    'Vu N. Quang',
    0
  ),
  (
    'ashish@email.com',
    'foobar',
    'Ashish Juneja',
    0
  ),
  (
    'theo@email.com',
    'foobar',
    'THE O',
    0
  ),
  (
    'consumerphysics@email.com',
    'foobar',
    'Consumer Physics, Inc',
    0
  ),
  (
    'steadxp@email.com',
    'foobar',
    'SteadXP',
    0
  ),
  (
    'megabots@email.com',
    'foobar',
    'MegaBots, Inc.',
    0
  ),
  (
    'cyclelabs@email.com',
    'foobar',
    'CycleLabs',
    0
  ),
  (
    'inkstaingames@email.com',
    'foobar',
    'Ink Stains Games',
    0
  ),
  (
    'sketchypandagames@email.com',
    'foobar',
    'Sketchy Panda Games',
    0
  ),
  (
    'larianstudios@email.com',
    'foobar',
    'Larian Studios LLC',
    0
  ),
  (
    'gustav@email.com',
    'foobar',
    'Gustav ""Goffa"" Söderström',
    0
  ),
  (
    'invented4@email.com',
    'foobar',
    'Invented4',
    0
  ),
  (
    'bicephalypictures@email.com',
    'foobar',
    'Bicephaly Pictures',
    0
  ),
  (
    'arrowstormentertainment@email.com',
    'foobar',
    'Arrowstorm Entertainment',
    0
  ),
  (
    'danielstuyck@email.com',
    'foobar',
    'Daniel Stuyck',
    0
  ),
  (
    'andregaines@email.com',
    'foobar',
    'Andre Gaines',
    0
  ),
  (
    'claylifrod@email.com',
    'foobar',
    'Clay Lifrod',
    0
  ),
  (
    'steveking@email.com',
    'foobar',
    'Steve King',
    0
  ),
  (
    'voltaicsystems@email.com',
    'foobar',
    'Voltaic Systems',
    0
  ),
  (
    'govy@email.com',
    'foobar',
    'govy',
    0
  ),
  (
    'peterboutakis@email.com',
    'foobar',
    'Peter Boutakis',
    0
  ),
  (
    'peakdesign@email.com',
    'foobar',
    'Peak Design',
    0
  ),
  (
    'honkcommittee@email.com',
    'foobar',
    'HONK! Committee',
    0
  ),
  (
    'danielboyle@email.com',
    'foobar',
    'Daniel Boyle',
    0
  ),
  (
    'mattsearles@email.com',
    'foobar',
    'Matt Searles',
    0
  ),
  (
    'scottpinkmountain@email.com',
    'foobar',
    'Scott Pinkmountain',
    0
  ),
  (
    'jimmogini@email.com',
    'foobar',
    'Jim Mogini \'The Colour Wheel\'',
    0
  ),
  (
    'angelajimenez@email.com',
    'foobar',
    'Angela Jimenez',
    0
  ),
  (
    'adamsmith@email.com',
    'foobar',
    'Adam Smith',
    0
  ),
  (
    'lennyleonard@email.com',
    'foobar',
    'Lenny Leonard',
    0
  ),
  (
    'pasadenamuseumofhistory@email.com',
    'foobar',
    'Pasadena Museum of History',
    0
  ),
  (
    'cafeart@email.com',
    'foobar',
    'Cafe Art',
    0
  );

/* campaign seeds */
INSERT INTO campaign (owner, title, description, start_date, end_date, target_fund, image_url) VALUES
  (
    'theo@email.com',
    'THE O: Wearable + App to Never Lose or Forget Anything.',
    'Your personal assistant in a mobile app that immediately reminds you when you leave behind any of your most important belongings!',
    '2015-10-01',
    '2016-02-01',
    32000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/1.jpg'
  ),
  (
    'consumerphysics@email.com',
    'SCiO: Your Sixth Sense. A Pocket Molecular Sensor For All.',
    'Scan materials or physical objects. Get instant relevant information to your smartphone. Food, medicine, plants, and more.',
    '2014-04-29',
    '2016-01-07',
    200000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/2.jpg'
  ),
  (
    'steadxp@email.com',
    'SteadXP - The Future of Video Stabilization',
    'Plug and play video stabilization, hyperlapse and VR device, compatible with nearly all cameras on the market.',
    '2015-09-01',
    '2016-01-01',
    150000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/3.jpg'
  ),
  (
    'megabots@email.com',
    'Support Team USA in the Giant Robot Duel!',
    'We need your help to create the giant combat robot America deserves. With you and our amazing partners, together we can defeat Japan!',
    '2015-08-19',
    '2016-01-01',
    500000,
     'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/4.jpg'
  ),
  (
    'cyclelabs@email.com',
    'SmartHalo - Turn your bike into a smart bike',
    'SmartHalo is a smart biking system that lets you focus on what matters the most - the road.',
    '2015-01-08',
    '2016-02-12',
    67000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/5.jpg'
  ),
  (
    'inkstaingames@email.com',
    '12 is Better Than 6 (PC, Mac, and Linux)',
    'Explore the dangers of Wild West in hand-drawn Top-down shooter',
    '2015-09-01',
    '2016-02-12',
    15000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/6.png'
  ),
  (
    'sketchypandagames@email.com',
    'Aberford: A game of zombies and 50\'s housewives',
    'A brawler/graphic adventure hybrid video game starring 50\'s housewives. Fight social norms and zombies in a pair of killer heels.',
    '2015-09-15',
    '2016-02-16',
    675000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/7.jpg'
  ),
  (
    'larianstudios@email.com',
    'Divinity: Original Sin 2',
    'An epic RPG with turn-based combat, cooperative/competitive multiplayer, sequel to Divinity: Original Sin, GameSpot\'s PC Game of 2014. An epic RPG with turn-based combat, cooperative/competitive multiplayer, sequel to Divinity: Original Sin, GameSpot\'s PC Game of 2014.',
    '2015-09-05',
    '2016-01-01',
    500000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/8.jpg'
  ),
  (
    'gustav@email.com',
    'Castle Heist',
    'The Ultimate Sneak!',
    '2015-09-11',
    '2016-09-12',
     800,
     'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/9.png'
  ),
  (
    'invented4@email.com',
    'Less - Like Chess but Less!',
    'Less is a simple strategy board game for two or four players. It\'s easy to learn and fun to play.',
    '2015-01-09',
    '2015-05-10',
    4000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/10.jpg'
  ),
  (
    'bicephalypictures@email.com',
    'Hench',
    'An absurdist dark comedy about two kidnappers and their latest victim',
    '2015-08-07',
    '2016-09-23',
    5000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/11.jpg'
  ),
  (
    'arrowstormentertainment@email.com',
    'Mythica 3: The Necromancer - starring Kevin Sorbo',
    'The 3rd film in the epic Mythica saga, the largest indie fantasy project ever. Follow the continuing adventures of Marek and her team.',
    '2015-09-09',
    '2016-01-12',
    75000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/12.jpg'
  ),
  (
    'danielstuyck@email.com',
    'The Eternal',
    'An existential ghost story about a pizza delivery driver who receives a cryptic transmission from beyond the grave.',
    '2015-03-01',
    '2017-04-01',
    5000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/13.jpg'
  ),
  (
    'andregaines@email.com',
    'Dick Gregory Film',
    'Fans of Dick Gregory and human rights invite you on a journey to make sense out of the chaos in America. JOIN US!',
    '2015-09-16',
    '2016-10/25',
    200000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/14.jpg'
  ),
  (
    'claylifrod@email.com',
    'Slash – a teen comedy about erotic fan fiction',
    'Neil\'s Vanguard stories are all he cares about, until Julia leads him down a rabbit hole into the strange world of erotic fan fiction.',
    '2015-08-20',
    '2016-03-02',
    45000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/15.png'
  ),
  (
    'steveking@email.com',
    'REMORA • A Stylus & Pen Holder for Apple iPad Smart Covers.',
    'REMORA • A stitched-leather stylus & pen holder whose metal baseplate securely attaches to the magnets in iPad Smart Covers.',
    '2015-09-02',
    '2016-02-12',
    25000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/16.png'
  ),
  (
    'voltaicsystems@email.com',
    'Shine: A Better, Brighter Solar Light + USB Charger',
    'A powerful modern solar light and phone charger that\'s super bright, versatile, and dependable. Useful everyday, essential one day.',
    '2015-09-10',
    '2016-01-02',
    18000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/17.png'
  ),
  (
    'govy@email.com',
    'Space Time Coordinates ~ personalised T-shirt & Poster',
    'discover the solar system on the personal human scale, using a birthdate (or any other date meaningful to you). each design is unique.',
    '2015-09-15',
    '2017-10-12',
    100,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/18.jpg'
  ),
  (
    'peterboutakis@email.com',
    'Helix™ - The World\'s Best Folding Bike',
    'Big wheels. Titanium frame. Smaller, lighter, safer and easier to use than any other folding bike in the world. Made in Canada.',
    '2015-01-01',
    '2016-04-02',
    120000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/19.jpg'
  ),
  (
    'peakdesign@email.com',
    'The Everyday Messenger: A Bag For Cameras & Essential Carry',
    'Beautiful, intelligent, adaptable. The Everyday Messenger is more than just an innovative camera bag. It’s a giant leap for bag-kind.',
    '2015-02-08',
    '2016-03-03',
    100000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/20.jpg'
  ),
  (
    'honkcommittee@email.com',
    '2015 HONK! Festival of Activist Street Bands',
    'This year marks the 10th anniversary of the HONK! Festival of Activist Street Bands!',
    '2015-07-12',
    '2015-12-30',
    17000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/21.png'
  ),
  (
    'danielboyle@email.com',
    'MAX ROMEO meets ROLLING LION STUDIO - NEW ALBUM',
    'Help us Produce Max Romeo\'s new album - Using original the vintage \'Black Ark\' equipment, and original players of instruments!',
    '2015-09-06',
    '2016-01-18',
    5250,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/22.jpg'
  ),
  (
    'mattsearles@email.com',
    'Tumbling Sky - Psalms for Weary Souls',
    'Help me record an album of songs (with accompanying devotions) to help people engage with God in times of sorrow.',
    '2015-06-17',
    '2016-02-18',
    8000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/23.jpeg'
  ),
  (
    'scottpinkmountain@email.com',
    'Help release once-in-a-lifetime album with handmade artwork',
    'Rhythm and color at the intersection of Afro-psych, Kraut rock, space jazz and vintage soul on wax with original letterpress packaging',
    '2015-05-24',
    '2016-05-25',
    8000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/24.jpg'
  ),
  (
    'jimmogini@email.com',
    'Jim Moginie\'s Electric Guitar Orchestra: "The Colour Wheel"',
    'This is to create and fund a CD and a double vinyl LP of Jim Moginie\'s Electric Guitar Orchestra performing \'The Colour Wheel\'',
    '2015-10-09',
    '2016-10-01',
    7000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/25.jpg'
  ),
  (
    'angelajimenez@email.com',
    'Racing Age',
    'Racing Age is a documentary photography book about masters track & field athletes of retirement age and older.',
    '2015-01-09',
    '2016-01-01',
    60000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/26.jpg'
  ),
  (
    'adamsmith@email.com',
    'Men vs. Cosplay',
    'We’re celebrating the diverse and talented male costumers of the cosplay community with an ambitious 365 page-a-day-style calendar!',
    '2015-02-09',
    '2016-01-06',
    200000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/27.jpg'
  ),
  (
    'lennyleonard@email.com',
    'An NFL Story',
    'A story about the history of america\'s favorite pastime',
    '2015-04-09',
    '2016-03-07',
    104000,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/28.jpg'
  ),
  (
    'pasadenamuseumofhistory@email.com',
    'The Great History Freeze to preserve photographic negatives',
    'Join The Great History Freeze and help preserve a collection of invaluable and irreplaceable negatives.',
    '2015-05-10',
    '2016-03-15',
    2450,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/29.jpg'
  ),
  (
    'cafeart@email.com',
    'Cafe Art 2016 My London Calendar',
    'A 2016 photography calendar created by people who have been homeless. Unique photos, inspiring stories. A beautiful gift.',
    '2015-08-12',
    '2016-03-11',
    4500,
    'https://s3-ap-southeast-1.amazonaws.com/quickstarter/campaigns/30.jpg'
  );

/* classify seeds */
INSERT INTO classify (campaign_id, category_name) VALUES
  (1, 'Technology'),
  (1, 'Design'),
  (1, 'Fashion'),
  (2, 'Technology'),
  (3, 'Technology'),
  (3, 'Film and Video'),
  (4, 'Technology'),
  (4, 'Crafts'),
  (5, 'Technology'),
  (5, 'Design'),
  (6, 'Games'),
  (6, 'Art'),
  (7, 'Games'),
  (7, 'Fashion'),
  (8, 'Games'),
  (9, 'Games'),
  (10, 'Games'),
  (11, 'Film and Video'),
  (11, 'Art'),
  (12, 'Film and Video'),
  (12, 'Crafts'),
  (13, 'Film and Video'),
  (14, 'Film and Video'),
  (14, 'Art'),
  (15, 'Film and Video'),
  (15, 'Publishing'),
  (16, 'Technology'),
  (16, 'Design'),
  (16, 'Fashion'),
  (17, 'Technology'),
  (17, 'Design'),
  (18, 'Design'),
  (18, 'Fashion'),
  (19, 'Technology'),
  (19, 'Design'),
  (20, 'Design'),
  (20, 'Fashion'),
  (21, 'Music'),
  (21, 'Art'),
  (22, 'Music'),
  (22, 'Art'),
  (23, 'Music'),
  (23, 'Art'),
  (24, 'Music'),
  (24, 'Art'),
  (25, 'Music'),
  (26, 'Photography'),
  (26, 'Art'),
  (27, 'Photography'),
  (27, 'Crafts'),
  (27, 'Fashion'),
  (28, 'Photography'),
  (28, 'Art'),
  (29, 'Photography'),
  (29, 'Art'),
  (30, 'Photography'),
  (30, 'Art');

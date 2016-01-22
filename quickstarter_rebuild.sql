/* drop all tables */
SELECT 'dropping all tables...';
DROP TABLE classify;
DROP TABLE back;
DROP TABLE category;
DROP TABLE campaign;
DROP TABLE account;
SELECT 'tables dropped!';

/* create all tables */
SELECT 'creating tables...';
source quickstarter.sql;
SELECT 'tables created!';

/* seed */
SELECT 'seeding tables...';
source quickstarter_seed.sql;
SELECT 'tables seeded!';
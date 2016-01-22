/* resets the schema by clearing all data */
DELETE FROM account;
DELETE FROM campaign;
ALTER TABLE campaign AUTO_INCREMENT = 1;
DELETE FROM category;
DELETE FROM back;
DELETE FROM classify;
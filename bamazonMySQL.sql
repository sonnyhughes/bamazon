CREATE DATABASE Bamazon;

USE Bamazon;

-- CREATE NEW TABLE 
CREATE TABLE Products(
	ItemID INTEGER(10) AUTO_INCREMENT NOT NULL,
    MenuItem VARCHAR(50) NOT NULL,
    Category VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Inventory INTEGER(10),
    primary key (ItemId)
);

-- CREATE NEW PRODUCTS
INSERT INTO Products(MenuItem,Category,Price,Inventory) VALUES('Chocolate Chip Cookies','Food',2.99,60);
INSERT INTO Products(MenuItem,Category,Price,Inventory) VALUES('Croquembouche','Food',100.00,50);
INSERT INTO Products(MenuItem,Category,Price,Inventory) VALUES('Caramel Tart','Food',24.99,30);
INSERT INTO Products(MenuItem,Category,Price,Inventory) VALUES('Cafe Latte','Drink',5.99,35);
INSERT INTO Products(MenuItem,Category,Price,Inventory) VALUES('Hot Chocolate','Drink',5.99,20);

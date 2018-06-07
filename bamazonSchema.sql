DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE items(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  count_remaining INT default 10,
  PRIMARY KEY (id)
);

INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Gatorade", "Beverages", 1.99, 299);
INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Salt Rock Lamp", "Home", 20.00, 1000);
INSERT INTO items (product_name, department_name, price) VALUES ("Sprite", "Beverages", 1.50);
INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Muscle Milk", "Beverages", 3.49, 75);
INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Snuggie", "Clothing", 19.99, 279);
INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Burton Snowboard", "Recreation", 399.98, 19);
INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Samsung TV", "Appliances", 1600.00, 10);
INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Kleenex", "Toiletries", 4.25, 25000);
INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Playing Cards", "Games", 3.99, 100);
INSERT INTO items (product_name, department_name, price, count_remaining) VALUES ("Mike n Ikes", "Food", 1.99, 900);

SELECT * FROM items;
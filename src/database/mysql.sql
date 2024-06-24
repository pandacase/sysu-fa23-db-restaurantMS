-- # in user root:

create database restaurant;

use restaurant;

create table dishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(31),
    price FLOAT,
    description VARCHAR(255),
    icon BLOB
);

create table orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time_added DATETIME,
    item_list JSON,
    total_price FLOAT
);

create table tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_id INT,
    type VARCHAR(15),
    customer_num INT,
    CONSTRAINT ct_num CHECK (customer_num >= 0)
);



create user admin;

grant all on restaurant.dishes to admin;
grant all on restaurant.orders to admin;
grant all on restaurant.tables to admin;


ALTER USER 'admin' IDENTIFIED WITH mysql_native_password BY '1234';
flush privileges;


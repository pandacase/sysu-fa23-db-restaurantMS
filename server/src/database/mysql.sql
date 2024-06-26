-- # in user root:

drop database if exists restaurant;
create database restaurant;

use restaurant;

create table dishes
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(31) UNIQUE NOT NULL,
    price       FLOAT              NOT NULL,
    description VARCHAR(255),
    icon        BLOB
);

create table tables
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    -- table_num INT NOT NULL,
    type         VARCHAR(15) NOT NULL,
    customer_num INT,
    CONSTRAINT ct_num CHECK (customer_num >= 0)
);

create table orders
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    time_added DATETIME NOT NULL,
    table_id   int      NOT NULL,
    FOREIGN KEY (table_id) REFERENCES tables (id)
);

create table order_details
(
    order_id  INT,
    dish_id   INT,
    quantity  int   NOT NULL,
    sub_total float NOT NULL, -- = dish_price * quantity
    PRIMARY KEY (order_id, dish_id),
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (dish_id) REFERENCES dishes (id)
);

-- dishes init
# insert into dishes (name, price, description) values ("Taro ice-cream", 3.98, "Great dessert, liked by Asta.");
# insert into dishes (name, price, description) values ("Wine", 648, "Topaz recommends.");
# insert into dishes (name, price, description) values ("Snow on the Hearth", 92.8, "Kamisato Ayaka's specialty.");
# insert into dishes (name, price, description) values ("Minty Fruit Tea", 13.8, "A cooling and refreshing drink.");
# insert into dishes (name, price, description) values ("Pile 'Em Up", 36.6, "A rich, meaty dish. A pile of meat and cheese.");
#
# -- tables init
# insert into tables (type, customer_num) values ("large(8)", 0);
# insert into tables (type, customer_num) values ("large(8)", 0);
# insert into tables (type, customer_num) values ("large(8)", 0);
# insert into tables (type, customer_num) values ("large(8)", 0);
# insert into tables (type, customer_num) values ("middle(4)", 0);
# insert into tables (type, customer_num) values ("middle(4)", 0);
# insert into tables (type, customer_num) values ("middle(4)", 0);
# insert into tables (type, customer_num) values ("middle(4)", 0);
# insert into tables (type, customer_num) values ("small(2)", 0);
# insert into tables (type, customer_num) values ("small(2)", 0);
# insert into tables (type, customer_num) values ("small(2)", 0);
# insert into tables (type, customer_num) values ("small(2)", 0);
#
# -- orders init
# insert into orders (time_added, table_id) values ("2024/6/24 10:56:30", 1);
# insert into orders (time_added, table_id) values ("2024/6/24 10:56:32", 2);
# insert into orders (time_added, table_id) values ("2024/6/24 10:56:33", 3);
#
# -- order_details init
# insert into order_details (order_id, dish_id, quantity, sub_total) values (1, 1, 2, 7.96);
# insert into order_details (order_id, dish_id, quantity, sub_total) values (1, 2, 1, 648);
# insert into order_details (order_id, dish_id, quantity, sub_total) values (2, 2, 1, 648);
# insert into order_details (order_id, dish_id, quantity, sub_total) values (3, 3, 1, 92.8);
#
# create user admin;
#
# grant all on restaurant.dishes to admin;
# grant all on restaurant.orders to admin;
# grant all on restaurant.tables to admin;
# grant all on restaurant.order_details to admin;

-- ALTER USER 'admin' IDENTIFIED WITH mysql_native_password BY '1234';
-- flush privileges;


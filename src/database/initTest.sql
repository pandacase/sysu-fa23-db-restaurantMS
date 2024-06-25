use restaurant;

drop table if exists order_details;
drop table if exists dishes;
drop table if exists orders;
drop table if exists tables;

create table dishes
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(31) UNIQUE NOT NULL,
    price       FLOAT               NOT NULL,
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
CREATE DATABASE B1;

USE B1;

-- 1. REGIONS
CREATE TABLE regions (
    region_id   INT PRIMARY KEY,
    region_name VARCHAR(50) NOT NULL,
    country     VARCHAR(50) NOT NULL
);
INSERT INTO regions VALUES
(1, 'North',     'Vietnam'),
(2, 'South',     'Vietnam'),
(3, 'Central',   'Vietnam'),
(4, 'Overseas',  'USA');

-- 2. CATEGORIES
CREATE TABLE categories (
    category_id   INT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);
INSERT INTO categories VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Books'),
(4, 'Home & Kitchen');

-- 3. EMPLOYEES  (self-join: manager_id → employee_id)
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    full_name   VARCHAR(100) NOT NULL,
    role        VARCHAR(50)  NOT NULL,
    manager_id  INT REFERENCES employees(employee_id),
    hire_date   DATE NOT NULL
);
INSERT INTO employees VALUES
(1, 'Nguyen Van An',   'Sales Manager',  NULL, '2018-03-01'),
(2, 'Tran Thi Bich',   'Sales Rep',      1,    '2020-06-15'),
(3, 'Le Minh Cuong',   'Sales Rep',      1,    '2021-01-10'),
(4, 'Pham Thu Hoa',    'Sales Rep',      1,    '2022-09-01'),
(5, 'Do Quoc Dat',     'Intern',         2,    '2024-02-01');

-- 4. CUSTOMERS
CREATE TABLE customers (
    customer_id   INT PRIMARY KEY,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(100) UNIQUE,
    region_id     INT REFERENCES regions(region_id),
    registered_at DATE NOT NULL
);
INSERT INTO customers VALUES
(1,  'Alice Nguyen',  'alice@mail.com',   1, '2021-05-10'),
(2,  'Bob Tran',      'bob@mail.com',     2, '2021-08-22'),
(3,  'Carol Le',      'carol@mail.com',   3, '2022-01-15'),
(4,  'David Pham',    'david@mail.com',   4, '2022-03-30'),
(5,  'Eva Do',        'eva@mail.com',     2, '2023-07-01'),
(6,  'Frank Vo',      'frank@mail.com',   1, '2023-11-20'),
(7,  'Grace Bui',     'grace@mail.com',   3, '2024-02-14'),
(8,  'Hung Ly',       'hung@mail.com',    1, '2024-04-05');

-- 5. PRODUCTS
CREATE TABLE products (
    product_id   INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category_id  INT REFERENCES categories(category_id),
    unit_price   DECIMAL(10,2) NOT NULL,
    stock_qty    INT NOT NULL DEFAULT 0
);
INSERT INTO products VALUES
(1,  'Laptop Pro 15',     1, 25000000, 10),
(2,  'Wireless Mouse',    1,   450000, 50),
(3,  'USB-C Hub',         1,   890000, 30),
(4,  'T-Shirt Basic',     2,   180000, 100),
(5,  'Running Shoes',     2,   950000, 40),
(6,  'SQL for Beginners', 3,   220000, 60),
(7,  'Clean Code',        3,   310000, 45),
(8,  'Air Fryer 5L',      4,  1200000, 20),
(9,  'Coffee Maker',      4,   780000, 25),
(10, 'Mechanical Keyboard',1,  1500000, 15);

-- 6. ORDERS
CREATE TABLE orders (
    order_id    INT PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    employee_id INT REFERENCES employees(employee_id),
    order_date  DATE NOT NULL,
    status      VARCHAR(20) CHECK (status IN ('pending','completed','cancelled'))
);
INSERT INTO orders VALUES
(1001, 1, 2, '2023-01-15', 'completed'),
(1002, 2, 2, '2023-02-20', 'completed'),
(1003, 3, 3, '2023-03-05', 'completed'),
(1004, 1, 2, '2023-05-10', 'completed'),
(1005, 4, 4, '2023-06-22', 'cancelled'),
(1006, 5, 3, '2023-08-01', 'completed'),
(1007, 2, 4, '2023-09-14', 'completed'),
(1008, 6, 2, '2023-10-30', 'completed'),
(1009, 7, 3, '2024-01-08', 'pending'),
(1010, 8, 4, '2024-02-20', 'completed'),
(1011, 1, 2, '2024-03-15', 'completed'),
(1012, 5, 3, '2024-04-01', 'pending');

-- 7. ORDER_ITEMS
CREATE TABLE order_items (
    item_id    INT PRIMARY KEY,
    order_id   INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity   INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL  -- snapshot giá tại thời điểm mua
);
INSERT INTO order_items VALUES
(1,  1001, 1,  1, 25000000),
(2,  1001, 2,  2,   450000),
(3,  1002, 4,  3,   180000),
(4,  1002, 6,  1,   220000),
(5,  1003, 7,  2,   310000),
(6,  1003, 8,  1,  1200000),
(7,  1004, 3,  1,   890000),
(8,  1004,10,  1,  1500000),
(9,  1005, 5,  1,   950000),  -- cancelled order
(10, 1006, 9,  1,   780000),
(11, 1007, 2,  1,   450000),
(12, 1007, 4,  2,   180000),
(13, 1008, 6,  1,   220000),
(14, 1008, 7,  1,   310000),
(15, 1009, 1,  1, 25000000),  -- pending
(16, 1010, 8,  1,  1200000),
(17, 1010, 9,  1,   780000),
(18, 1011, 2,  3,   450000),
(19, 1011,10,  1,  1500000),
(20, 1012, 5,  2,   950000);  -- pending
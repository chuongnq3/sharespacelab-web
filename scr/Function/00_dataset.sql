-- ============================================================
-- SQL SERVER FUNCTION PRACTICE - DATASET
-- Ho tro: SQL Server 2016+
-- Chay file nay truoc khi lam bai tap
-- ============================================================

USE master;
GO

IF DB_ID('FuncPractice') IS NOT NULL
BEGIN
    ALTER DATABASE FuncPractice SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE FuncPractice;
END
GO

CREATE DATABASE FuncPractice
    COLLATE Vietnamese_CI_AS;
GO

USE FuncPractice;
GO

-- ============================================================
-- 1. TAO BANG
-- ============================================================

CREATE TABLE Customers (
    cust_id     INT             PRIMARY KEY,
    full_name   NVARCHAR(100)   NOT NULL,
    birth_date  DATE,
    gender      CHAR(1),            -- M / F
    segment     VARCHAR(10),        -- MASS / AFFLUENT / PREMIUM
    city        NVARCHAR(50),
    phone       VARCHAR(20),
    email       VARCHAR(100),
    open_date   DATE,
    is_active   BIT DEFAULT 1
);

CREATE TABLE Products (
    prod_id     INT             PRIMARY KEY,
    prod_code   VARCHAR(10)     NOT NULL,
    prod_name   NVARCHAR(100),
    category    VARCHAR(20),        -- HOME / CAR / PERSONAL / BUSINESS
    base_rate   DECIMAL(5,2),       -- % per year
    max_term    INT,                -- months
    min_amount  BIGINT,
    max_amount  BIGINT
);

CREATE TABLE Contracts (
    contract_id     INT         PRIMARY KEY,
    cust_id         INT         REFERENCES Customers(cust_id),
    prod_id         INT         REFERENCES Products(prod_id),
    disbursed_date  DATE        NOT NULL,
    maturity_date   DATE        NOT NULL,
    principal       BIGINT      NOT NULL,
    interest_rate   DECIMAL(5,2),
    term_months     INT,
    outstanding     BIGINT,         -- du no hien tai
    dpd             INT DEFAULT 0,  -- days past due
    status          VARCHAR(10)     -- ACTIVE / CLOSED / NPL
);

CREATE TABLE Transactions (
    txn_id      INT             PRIMARY KEY,
    contract_id INT             REFERENCES Contracts(contract_id),
    txn_date    DATETIME        NOT NULL,
    txn_type    VARCHAR(20),        -- PAYMENT / PENALTY / WAIVER
    amount      BIGINT,
    channel     VARCHAR(20),        -- ONLINE / TELLER / ATM / AUTO
    note        NVARCHAR(200)
);

CREATE TABLE Scores (
    score_id    INT             PRIMARY KEY,
    cust_id     INT             REFERENCES Customers(cust_id),
    score_month DATE,               -- ngay dau thang
    score_value INT,                -- 300-850
    score_band  VARCHAR(5),         -- A / B / C / D / E
    model_ver   VARCHAR(10)
);
GO

-- ============================================================
-- 2. INSERT DU LIEU MAU
-- ============================================================

-- ── Customers (30 rows) ──────────────────────────────────────
INSERT INTO Customers VALUES
(1,  N'Nguyen Van An',      '1985-03-15', 'M', 'AFFLUENT', N'Ha Noi',    '0912345678', 'an.nguyen@email.com',     '2018-01-10', 1),
(2,  N'Tran Thi Binh',      '1990-07-22', 'F', 'MASS',     N'TP.HCM',    '0987654321', 'binh.tran@email.com',     '2019-05-20', 1),
(3,  N'Le Minh Chau',       '1978-11-05', 'M', 'PREMIUM',  N'Da Nang',   '0901234567', 'chau.le@email.com',       '2017-08-14', 1),
(4,  N'Pham Thi Dung',      '1995-02-28', 'F', 'MASS',     N'Ha Noi',    '0923456789', 'dung.pham@email.com',     '2021-03-01', 1),
(5,  N'Hoang Van Em',       '1982-09-10', 'M', 'AFFLUENT', N'Can Tho',   '0934567890', 'em.hoang@email.com',      '2019-11-11', 1),
(6,  N'Vu Thi Phuong',      '1993-04-17', 'F', 'MASS',     N'TP.HCM',    '0945678901', 'phuong.vu@email.com',     '2020-06-30', 0),
(7,  N'Dang Van Giang',     '1975-12-03', 'M', 'PREMIUM',  N'Ha Noi',    '0956789012', 'giang.dang@email.com',    '2016-02-28', 1),
(8,  N'Bui Thi Hoa',        '1988-06-25', 'F', 'AFFLUENT', N'Hai Phong', '0967890123', 'hoa.bui@email.com',       '2018-09-05', 1),
(9,  N'Ngo Van Inh',        '1970-01-30', 'M', 'MASS',     N'Da Nang',   '0978901234', 'inh.ngo@email.com',       '2015-07-19', 1),
(10, N'Dinh Thi Kim',       '1998-08-14', 'F', 'MASS',     N'Hue',       '0989012345', 'kim.dinh@email.com',      '2022-01-15', 1),
(11, N'Truong Van Long',    '1980-05-20', 'M', 'AFFLUENT', N'TP.HCM',    '0901111111', 'long.truong@email.com',   '2017-04-22', 1),
(12, N'Ly Thi Mai',         '1992-10-08', 'F', 'PREMIUM',  N'Ha Noi',    '0902222222', 'mai.ly@email.com',        '2018-12-01', 1),
(13, N'Phan Van Nam',       '1986-03-31', 'M', 'MASS',     N'Can Tho',   '0903333333', 'nam.phan@email.com',      '2020-08-10', 0),
(14, N'Cao Thi Oanh',       '1991-07-16', 'F', 'AFFLUENT', N'TP.HCM',    '0904444444', 'oanh.cao@email.com',      '2019-02-14', 1),
(15, N'Duong Van Phuc',     '1976-11-22', 'M', 'PREMIUM',  N'Ha Noi',    '0905555555', 'phuc.duong@email.com',    '2016-06-06', 1),
(16, N'Hoang Thi Quynh',    '1999-05-05', 'F', 'MASS',     N'Ha Noi',    '0906666666', 'quynh.hoang@email.com',   '2022-09-01', 1),
(17, N'Nguyen Manh Quan',   '1983-08-18', 'M', 'AFFLUENT', N'Bien Hoa',  '0907777777', 'quan.nm@email.com',       '2018-03-15', 1),
(18, N'Tran Thanh Huong',   '1977-01-25', 'F', 'PREMIUM',  N'Ha Noi',    '0908888888', 'huong.tt@email.com',      '2015-11-20', 1),
(19, N'Le Van Son',         '1994-06-12', 'M', 'MASS',     N'Nghe An',   '0909999999', 'son.lv@email.com',        '2021-07-07', 1),
(20, N'Pham Quoc Tuan',     '1987-03-22', 'M', 'AFFLUENT', N'TP.HCM',    '0910000000', 'tuan.pq@email.com',       '2019-04-01', 1),
(21, N'Vo Thi Uyen',        '1996-11-30', 'F', 'MASS',     N'Vung Tau',  '0911111111', 'uyen.vt@email.com',       '2022-02-14', 1),
(22, N'Ly Van Vinh',        '1973-07-04', 'M', 'PREMIUM',  N'Ha Noi',    '0912222222', 'vinh.lv@email.com',       '2014-10-10', 1),
(23, N'Nguyen Bich Xuan',   '1991-04-19', 'F', 'AFFLUENT', N'Da Lat',    '0913333333', 'xuan.nb@email.com',       '2020-01-20', 1),
(24, N'Tran Tuan Yen',      '1985-09-08', 'M', 'MASS',     N'TP.HCM',    '0914444444', 'yen.tt@email.com',        '2019-08-08', 0),
(25, N'Hoang Van Anh',      '1979-02-14', 'M', 'AFFLUENT', N'Ha Noi',    '0915555555', 'anh.hv@email.com',        '2017-05-05', 1),
(26, N'Bui Ngoc Bao',       '1997-12-01', 'F', 'MASS',     N'Hai Duong', '0916666666', 'bao.bn@email.com',        '2022-11-11', 1),
(27, N'Dang Minh Cuong',    '1981-06-15', 'M', 'AFFLUENT', N'TP.HCM',    '0917777777', 'cuong.dm@email.com',      '2018-07-01', 1),
(28, N'Ngo Thi Dao',        '1989-10-20', 'F', 'MASS',     N'Quang Ninh','0918888888', 'dao.nt@email.com',        '2020-03-22', 1),
(29, N'Trinh Van Duc',      '1984-01-11', 'M', 'PREMIUM',  N'Ha Noi',    '0919999999', 'duc.tv@email.com',        '2016-09-30', 1),
(30, N'Cao Lan Huong',      '1993-08-27', 'F', 'AFFLUENT', N'Vinh',      '0920000000', 'huong.cl@email.com',      '2019-12-12', 1);

-- ── Products (8 rows) ────────────────────────────────────────
INSERT INTO Products VALUES
(1, 'HL001', N'Vay mua nha lai suat co dinh', 'HOME',      7.50, 240,  200000000,  5000000000),
(2, 'HL002', N'Vay mua nha lai suat tha noi', 'HOME',      6.80, 300,  200000000, 10000000000),
(3, 'CL001', N'Vay mua o to moi',             'CAR',       8.20,  84,  100000000,  2000000000),
(4, 'CL002', N'Vay mua o to cu',              'CAR',       9.50,  60,   50000000,  1000000000),
(5, 'PL001', N'Vay tieu dung ca nhan',        'PERSONAL', 12.00,  36,   10000000,   500000000),
(6, 'PL002', N'Vay tin chap luong',           'PERSONAL', 14.50,  24,    5000000,   200000000),
(7, 'BL001', N'Vay kinh doanh ho ca the',     'BUSINESS', 10.00,  60,   50000000,   500000000),
(8, 'BL002', N'Vay DNNVV co tai san',         'BUSINESS',  9.00, 120,  100000000, 5000000000);

-- ── Contracts (25 rows) ──────────────────────────────────────
INSERT INTO Contracts VALUES
(1001,  1,  1, '2020-03-15', '2030-03-15',  2000000000,  7.50, 120,  1650000000,  0,  'ACTIVE'),
(1002,  2,  5, '2021-06-01', '2024-06-01',   150000000, 12.00,  36,    45000000,  5,  'ACTIVE'),
(1003,  3,  2, '2019-01-20', '2044-01-20',  5000000000,  6.80, 300,  4200000000,  0,  'ACTIVE'),
(1004,  4,  6, '2022-01-10', '2024-01-10',    80000000, 14.50,  24,    20000000, 30,  'ACTIVE'),
(1005,  5,  3, '2020-11-05', '2026-11-05',   800000000,  8.20,  72,   500000000,  0,  'ACTIVE'),
(1006,  6,  5, '2020-07-01', '2023-07-01',   100000000, 12.00,  36,           0,  0,  'CLOSED'),
(1007,  7,  2, '2018-05-15', '2043-05-15',  8000000000,  6.80, 300,  7100000000,  0,  'ACTIVE'),
(1008,  8,  7, '2021-09-20', '2026-09-20',   300000000, 10.00,  60,   250000000,  0,  'ACTIVE'),
(1009,  9,  4, '2019-03-01', '2024-03-01',   400000000,  9.50,  60,    80000000, 60,  'NPL'),
(1010, 10,  6, '2022-06-15', '2024-06-15',    50000000, 14.50,  24,    30000000,  0,  'ACTIVE'),
(1011, 11,  3, '2021-02-10', '2027-02-10',   600000000,  8.20,  72,   450000000,  0,  'ACTIVE'),
(1012, 12,  1, '2019-08-01', '2029-08-01',  3000000000,  7.50, 120,  2400000000,  0,  'ACTIVE'),
(1013, 13,  5, '2021-04-01', '2024-04-01',   200000000, 12.00,  36,           0, 90,  'NPL'),
(1014, 14,  8, '2020-10-01', '2030-10-01',  1000000000,  9.00, 120,   800000000,  0,  'ACTIVE'),
(1015, 15,  2, '2017-01-01', '2042-01-01', 10000000000,  6.80, 300,  9500000000,  0,  'ACTIVE'),
(1016, 16,  6, '2023-01-01', '2025-01-01',    60000000, 14.50,  24,    40000000,  0,  'ACTIVE'),
(1017, 17,  3, '2020-06-01', '2026-06-01',   500000000,  8.20,  72,   320000000,  0,  'ACTIVE'),
(1018, 18,  1, '2018-03-01', '2028-03-01',  4000000000,  7.50, 120,  2900000000,  0,  'ACTIVE'),
(1019, 19,  5, '2022-03-15', '2025-03-15',    80000000, 12.00,  36,    35000000, 15,  'ACTIVE'),
(1020, 20,  8, '2021-11-01', '2031-11-01',  2000000000,  9.00, 120,  1700000000,  0,  'ACTIVE'),
(1021, 21,  6, '2023-05-01', '2025-05-01',    40000000, 14.50,  24,    28000000,  0,  'ACTIVE'),
(1022, 22,  2, '2016-01-01', '2041-01-01',  6000000000,  6.80, 300,  4500000000,  0,  'ACTIVE'),
(1023, 23,  7, '2021-07-01', '2026-07-01',   200000000, 10.00,  60,   150000000,  0,  'ACTIVE'),
(1024, 24,  5, '2020-09-01', '2023-09-01',   120000000, 12.00,  36,           0,  0,  'CLOSED'),
(1025, 25,  3, '2022-04-01', '2028-04-01',   700000000,  8.20,  72,   580000000,  0,  'ACTIVE');

-- ── Transactions (40 rows) ───────────────────────────────────
INSERT INTO Transactions VALUES
(10001, 1001, '2024-01-05 09:23:00', 'PAYMENT',  25000000, 'ONLINE', N'Thanh toan ky 01/2024'),
(10002, 1001, '2024-02-05 10:00:00', 'PAYMENT',  25000000, 'AUTO',   N'Auto-debit 02/2024'),
(10003, 1001, '2024-03-05 10:00:00', 'PAYMENT',  25000000, 'AUTO',   N'Auto-debit 03/2024'),
(10004, 1001, '2024-04-05 10:00:00', 'PAYMENT',  25000000, 'AUTO',   N'Auto-debit 04/2024'),
(10005, 1002, '2024-01-10 14:30:00', 'PAYMENT',  10000000, 'TELLER', N'Thanh toan tai quay'),
(10006, 1002, '2024-01-10 14:35:00', 'PENALTY',    250000, 'TELLER', N'Phi tra cham'),
(10007, 1002, '2024-02-10 09:00:00', 'PAYMENT',  10000000, 'ONLINE', N'Thanh toan ky 02/2024'),
(10008, 1003, '2024-01-15 08:00:00', 'PAYMENT',  80000000, 'AUTO',   N'Auto HOME premium'),
(10009, 1003, '2024-02-15 08:00:00', 'PAYMENT',  80000000, 'AUTO',   N'Auto HOME premium'),
(10010, 1004, '2024-01-20 11:00:00', 'PAYMENT',   5000000, 'ATM',    N'Thanh toan ATM'),
(10011, 1004, '2024-01-20 11:45:00', 'PENALTY',    500000, 'ATM',    N'Phi qua han'),
(10012, 1005, '2024-01-08 09:00:00', 'PAYMENT',  15000000, 'ONLINE', N'Thanh toan ky 01/2024'),
(10013, 1005, '2024-02-08 09:00:00', 'PAYMENT',  15000000, 'ONLINE', N'Thanh toan ky 02/2024'),
(10014, 1007, '2024-01-15 09:30:00', 'PAYMENT', 110000000, 'AUTO',   N'Auto PREMIUM HOME'),
(10015, 1007, '2024-02-15 09:30:00', 'PAYMENT', 110000000, 'AUTO',   N'Auto PREMIUM HOME'),
(10016, 1008, '2024-01-25 16:00:00', 'PAYMENT',  20000000, 'ONLINE', N'Thanh toan BIZ loan'),
(10017, 1008, '2024-02-25 16:00:00', 'PAYMENT',  20000000, 'ONLINE', N'Thanh toan BIZ 02/2024'),
(10018, 1009, '2023-12-01 10:00:00', 'PAYMENT',  10000000, 'TELLER', N'Thanh toan 1 phan NPL'),
(10019, 1010, '2024-01-20 13:00:00', 'PAYMENT',   4000000, 'ONLINE', N'Thanh toan online 01/2024'),
(10020, 1010, '2024-02-20 13:00:00', 'PAYMENT',   4000000, 'ONLINE', N'Thanh toan online 02/2024'),
(10021, 1011, '2024-01-10 09:00:00', 'PAYMENT',  18000000, 'AUTO',   N'Auto CAR 01/2024'),
(10022, 1011, '2024-02-10 09:00:00', 'PAYMENT',  18000000, 'AUTO',   N'Auto CAR 02/2024'),
(10023, 1012, '2024-01-05 08:30:00', 'PAYMENT',  40000000, 'AUTO',   N'PREMIUM auto HOME'),
(10024, 1012, '2024-02-05 08:30:00', 'PAYMENT',  40000000, 'AUTO',   N'PREMIUM auto HOME'),
(10025, 1013, '2023-11-01 09:00:00', 'PAYMENT',   5000000, 'TELLER', N'Thanh toan 1 phan NPL'),
(10026, 1014, '2024-01-15 10:00:00', 'PAYMENT',  25000000, 'ONLINE', N'BIZ payment 01/2024'),
(10027, 1014, '2024-02-15 10:00:00', 'PAYMENT',  25000000, 'ONLINE', N'BIZ payment 02/2024'),
(10028, 1015, '2024-01-05 07:00:00', 'PAYMENT', 150000000, 'AUTO',   N'PREMIUM HOME auto 01'),
(10029, 1015, '2024-02-05 07:00:00', 'PAYMENT', 150000000, 'AUTO',   N'PREMIUM HOME auto 02'),
(10030, 1015, '2024-03-05 07:00:00', 'PAYMENT', 150000000, 'AUTO',   N'PREMIUM HOME auto 03'),
(10031, 1004, '2024-02-20 11:00:00', 'WAIVER',    1000000, 'TELLER', N'Mien giam phi CTKM'),
(10032, 1017, '2024-01-01 08:00:00', 'PAYMENT',  20000000, 'AUTO',   N'Auto CAR 01/2024'),
(10033, 1017, '2024-02-01 08:00:00', 'PAYMENT',  20000000, 'AUTO',   N'Auto CAR 02/2024'),
(10034, 1018, '2024-01-10 09:00:00', 'PAYMENT',  55000000, 'AUTO',   N'PREMIUM HOME 01/2024'),
(10035, 1019, '2024-01-15 14:00:00', 'PAYMENT',   5000000, 'TELLER', N'Thanh toan qua han'),
(10036, 1020, '2024-01-20 10:00:00', 'PAYMENT',  35000000, 'ONLINE', N'BIZ payment 01/2024'),
(10037, 1022, '2024-01-05 07:30:00', 'PAYMENT',  85000000, 'AUTO',   N'PREMIUM HOME auto'),
(10038, 1023, '2024-01-10 15:00:00', 'PAYMENT',  12000000, 'ONLINE', N'BIZ payment'),
(10039, 1025, '2024-01-08 09:00:00', 'PAYMENT',  17000000, 'ONLINE', N'CAR payment 01/2024'),
(10040, 1001, '2023-12-05 09:00:00', 'PAYMENT',  25000000, 'AUTO',   N'Auto-debit 12/2023');

-- ── Scores (35 rows) ─────────────────────────────────────────
INSERT INTO Scores VALUES
( 1, 1,  '2023-11-01', 715, 'B', 'v2.1'),
( 2, 1,  '2023-12-01', 718, 'B', 'v2.1'),
( 3, 1,  '2024-01-01', 720, 'B', 'v2.1'),
( 4, 1,  '2024-02-01', 730, 'B', 'v2.1'),
( 5, 1,  '2024-03-01', 725, 'B', 'v2.1'),
( 6, 2,  '2023-12-01', 585, 'D', 'v2.1'),
( 7, 2,  '2024-01-01', 580, 'D', 'v2.1'),
( 8, 2,  '2024-02-01', 570, 'D', 'v2.1'),
( 9, 3,  '2023-12-01', 805, 'A', 'v2.1'),
(10, 3,  '2024-01-01', 810, 'A', 'v2.1'),
(11, 3,  '2024-02-01', 820, 'A', 'v2.1'),
(12, 4,  '2024-01-01', 630, 'C', 'v2.1'),
(13, 4,  '2024-02-01', 620, 'C', 'v2.1'),
(14, 5,  '2024-01-01', 750, 'B', 'v2.1'),
(15, 5,  '2024-02-01', 755, 'B', 'v2.1'),
(16, 5,  '2024-03-01', 760, 'A', 'v2.1'),
(17, 7,  '2024-01-01', 790, 'A', 'v2.1'),
(18, 7,  '2024-02-01', 795, 'A', 'v2.1'),
(19, 8,  '2024-01-01', 680, 'C', 'v2.1'),
(20, 8,  '2024-02-01', 690, 'C', 'v2.1'),
(21, 9,  '2023-11-01', 440, 'E', 'v2.0'),
(22, 9,  '2023-12-01', 420, 'E', 'v2.0'),
(23, 10, '2024-01-01', 610, 'C', 'v2.1'),
(24, 11, '2024-01-01', 710, 'B', 'v2.1'),
(25, 11, '2024-02-01', 715, 'B', 'v2.1'),
(26, 12, '2024-01-01', 780, 'A', 'v2.1'),
(27, 12, '2024-02-01', 785, 'A', 'v2.1'),
(28, 13, '2023-11-01', 410, 'E', 'v2.0'),
(29, 13, '2023-12-01', 390, 'E', 'v2.0'),
(30, 14, '2024-01-01', 700, 'B', 'v2.1'),
(31, 15, '2024-01-01', 830, 'A', 'v2.1'),
(32, 15, '2024-02-01', 835, 'A', 'v2.1'),
(33, 17, '2024-01-01', 740, 'B', 'v2.1'),
(34, 20, '2024-01-01', 695, 'C', 'v2.1'),
(35, 22, '2024-01-01', 810, 'A', 'v2.1');
GO

-- ============================================================
-- KIEM TRA
-- ============================================================
SELECT 'Customers'   tbl, COUNT(*) rows FROM Customers
UNION ALL SELECT 'Products',   COUNT(*) FROM Products
UNION ALL SELECT 'Contracts',  COUNT(*) FROM Contracts
UNION ALL SELECT 'Transactions',COUNT(*) FROM Transactions
UNION ALL SELECT 'Scores',     COUNT(*) FROM Scores;
GO

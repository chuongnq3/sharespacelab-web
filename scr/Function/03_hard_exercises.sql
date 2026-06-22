-- ============================================================
-- BAI TAP SQL SERVER FUNCTIONS - CAP DO: HARD (10 bai)
-- Chu de: CTE / Analytic / Pivoting / Complex Logic
-- Yeu cau: Chay 00_dataset.sql truoc
-- ============================================================

USE FuncPractice;
GO

-- ============================================================
-- NHOM 1: CTE + WINDOW FUNCTIONS
-- ============================================================

-- Bai H01
-- Tinh tang truong thang-qua-thang (MoM %) cua tong giao dich PAYMENT.
-- - Nhom theo thang (FORMAT 'yyyy-MM')
-- - Tinh growth% so voi thang lien ke truoc
-- - Ket qua sap xep theo thang tang dan
-- Ket qua: thang | tong_payment | thang_truoc | growth_pct
-- Goi y: CTE + LAG() + NULLIF tranh chia 0
-- -------------------------------------------------------



-- Bai H02
-- Voi moi segment, lay top 3 khach hang co tong outstanding cao nhat.
-- Truong hop bang nhau: dung DENSE_RANK (khong bo qua hang).
-- Chi lay hop dong ACTIVE.
-- Ket qua: segment | hang | cust_id | full_name | tong_outstanding
-- Goi y: CTE voi DENSE_RANK() OVER (PARTITION BY segment ORDER BY ...)
-- -------------------------------------------------------



-- Bai H03
-- Tinh "health score" cho tung hop dong:
--   score = dpd_point * LOG(1 + outstanding / 1000000.0)
-- Trong do dpd_point:
--   dpd = 0     -> 10
--   dpd 1-29    -> 7
--   dpd 30-89   -> 3
--   dpd >= 90   -> 0
-- Lam tron 2 chu so. Xu ly outstanding = 0.
-- Ket qua: contract_id | dpd | outstanding | dpd_point | health_score
-- Goi y: CTE + CASE + LOG + ROUND + NULLIF
-- -------------------------------------------------------



-- ============================================================
-- NHOM 2: PIVOTING
-- ============================================================

-- Bai H04
-- Pivot so giao dich theo channel (ONLINE/TELLER/ATM/AUTO)
-- thanh 4 cot rieng theo tung thang.
-- Ket qua: thang | cnt_online | cnt_teller | cnt_atm | cnt_auto | tong
-- Goi y: SUM(CASE WHEN channel = '...' THEN 1 ELSE 0 END) GROUP BY thang
-- -------------------------------------------------------



-- ============================================================
-- NHOM 3: GAP ANALYSIS
-- ============================================================

-- Bai H05
-- Tim hop dong ACTIVE khong co bat ky giao dich nao
-- trong 90 ngay gan nhat tinh tu hom nay (GETDATE()).
-- Ket qua: contract_id | cust_id | status | ngay_giao_dich_cuoi | so_ngay_im_lang
-- Goi y: LEFT JOIN + MAX(txn_date) + DATEDIFF + HAVING / WHERE
-- -------------------------------------------------------



-- ============================================================
-- NHOM 4: STRING PATTERN
-- ============================================================

-- Bai H06
-- Kiem tra tinh hop le cua so dien thoai:
--   - Bat dau bang 09, 03, hoac 07
--   - Tong 10 chu so
--   - Chi chua cac ky tu so (0-9)
-- Tra ve is_valid = 1 neu hop le, 0 neu khong.
-- Ket qua: cust_id | phone | is_valid | ly_do (neu khong hop le)
-- Goi y: LEFT, LEN, LIKE, ISNUMERIC, PATINDEX
-- -------------------------------------------------------



-- ============================================================
-- NHOM 5: PERCENTILE
-- ============================================================

-- Bai H07
-- Tinh Q1 (25%), Q2 (50%), Q3 (75%) cua score_value
-- phan tach theo tung score_band trong thang 2024-01-01.
-- Ket qua: score_band | q1 | q2_median | q3
-- Goi y: PERCENTILE_CONT(0.25/0.5/0.75) WITHIN GROUP (ORDER BY score_value)
--         OVER (PARTITION BY score_band)
--        + SELECT DISTINCT de gop lai
-- -------------------------------------------------------



-- ============================================================
-- NHOM 6: RUNNING BALANCE
-- ============================================================

-- Bai H08
-- Tinh so du con lai cua hop dong sau tung giao dich PAYMENT.
-- So du = principal ban dau - tong tich luy PAYMENT den hien tai.
-- Ket qua: contract_id | txn_id | txn_date | amount | so_du_sau_giao_dich
-- Goi y: CTE join Contracts + SUM(CASE txn_type='PAYMENT'...) OVER (ROWS UNBOUNDED PRECEDING)
-- -------------------------------------------------------



-- ============================================================
-- NHOM 7: DATE + AGGREGATION
-- ============================================================

-- Bai H09
-- Phan khuc khach hang theo nhom tuoi:
--   < 25         -> 'GEN Z (<25)'
--   25 - 34      -> 'MILLENNIAL (25-34)'
--   35 - 44      -> 'GEN X (35-44)'
--   45 - 54      -> 'BABY BOOMER (45-54)'
--   >= 55        -> 'SENIOR (55+)'
-- Tinh avg score_value cho moi nhom (dung score thang 2024-01-01).
-- Ket qua: nhom_tuoi | so_kh | avg_score
-- Goi y: CTE tinh tuoi + CASE band + JOIN Scores + AVG
-- -------------------------------------------------------



-- ============================================================
-- NHOM 8: STRING PARSING
-- ============================================================

-- Bai H10
-- Trong cot note cua Transactions, co nhieu giao dich ghi kieu '01/2024', '02/2024'.
-- Extract phan thang/nam nay va chuyen thanh kieu DATE (ngay dau thang).
-- Vi du: 'Thanh toan ky 01/2024' -> '2024-01-01'
-- Neu khong extract duoc -> NULL.
-- Ket qua: txn_id | note | note_month (DATE)
-- Goi y: PATINDEX, SUBSTRING, CHARINDEX, DATEFROMPARTS, CAST, TRY_CAST
-- -------------------------------------------------------

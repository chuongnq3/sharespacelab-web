-- ============================================================
-- BAI TAP SQL SERVER FUNCTIONS - CAP DO: EASY (15 bai)
-- Chu de: String / Date / Math / NULL / Conversion
-- Yeu cau: Chay 00_dataset.sql truoc
-- ============================================================

USE FuncPractice;
GO

-- ============================================================
-- NHOM 1: STRING FUNCTIONS
-- ============================================================

-- Bai E01
-- Lay ho (phan truoc dau cach dau tien) cua tung khach hang.
-- Ket qua: cust_id | full_name | ho
-- Goi y: LEFT, CHARINDEX
-- -------------------------------------------------------
-- Viet query cua ban o day:



-- Bai E02
-- Viet hoa toan bo full_name, chuyen email thanh chu thuong.
-- Ket qua: cust_id | full_name_upper | email_lower
-- Goi y: UPPER, LOWER
-- -------------------------------------------------------



-- Bai E03
-- Tao cot username = 6 ky tu dau cua phan truoc @ trong email
--   + '_' + cust_id (dang text).
-- Vi du: 'an.ngu_1'
-- Ket qua: cust_id | email | username
-- Goi y: LEFT, CHARINDEX, CAST, CONCAT hoac +
-- -------------------------------------------------------



-- Bai E04
-- Dem so ky tu cua full_name.
-- Chi lay nhung khach hang co ten dai hon 15 ky tu.
-- Ket qua: cust_id | full_name | do_dai
-- Goi y: LEN
-- -------------------------------------------------------



-- Bai E05
-- Format lai so dien thoai: them dau '-' sau 4 ky tu dau.
-- Vi du: '0912345678' -> '0912-345678'
-- Ket qua: cust_id | phone | phone_format
-- Goi y: LEFT, RIGHT, LEN, STUFF hoac CONCAT
-- -------------------------------------------------------



-- ============================================================
-- NHOM 2: DATE FUNCTIONS
-- ============================================================

-- Bai E06
-- Tinh tuoi chinh xac (nam) cua tung khach hang tinh den hom nay.
-- Xu ly dung: neu chua qua sinh nhat trong nam nay thi tru 1.
-- Ket qua: cust_id | full_name | birth_date | tuoi
-- Goi y: DATEDIFF, GETDATE, MONTH, DAY
-- -------------------------------------------------------



-- Bai E07
-- Lay thang va nam cua disbursed_date theo dinh dang 'MM/YYYY'.
-- Ket qua: contract_id | disbursed_date | thang_nam
-- Goi y: FORMAT hoac RIGHT/LEFT ket hop CAST
-- -------------------------------------------------------



-- Bai E08
-- Tinh so ngay con lai den maturity_date (chi lay hop dong ACTIVE).
-- Neu maturity_date da qua (< hom nay) hien thi 0.
-- Ket qua: contract_id | maturity_date | so_ngay_con_lai
-- Goi y: DATEDIFF, GETDATE, CASE, IIF
-- -------------------------------------------------------



-- Bai E09
-- Tinh ngay dau thang va ngay cuoi thang cua txn_date.
-- Ket qua: txn_id | txn_date | ngay_dau_thang | ngay_cuoi_thang
-- Goi y: EOMONTH, DATEFROMPARTS, YEAR, MONTH
-- -------------------------------------------------------



-- Bai E10
-- Phan loai giao dich theo buoi dua vao gio cua txn_date:
--   06:00-11:59 -> 'SANG'
--   12:00-17:59 -> 'CHIEU'
--   18:00-23:59 -> 'TOI'
--   00:00-05:59 -> 'KHUYA'
-- Ket qua: txn_id | txn_date | buoi
-- Goi y: DATEPART(HOUR,...), CASE
-- -------------------------------------------------------



-- ============================================================
-- NHOM 3: MATH FUNCTIONS
-- ============================================================

-- Bai E11
-- Tinh lai hang thang uoc tinh:
--   lai = outstanding * interest_rate / 100 / 12
-- Lam tron 2 chu so thap phan.
-- Chi lay hop dong ACTIVE co outstanding > 0.
-- Ket qua: contract_id | outstanding | interest_rate | lai_thang
-- Goi y: ROUND, CAST
-- -------------------------------------------------------



-- Bai E12
-- Tinh ty le thu hoi no (%):
--   = (principal - outstanding) * 100.0 / principal
-- Lam tron 1 chu so. Xu ly truong hop principal = 0.
-- Ket qua: contract_id | principal | outstanding | ty_le_thu_hoi
-- Goi y: ROUND, NULLIF, CAST
-- -------------------------------------------------------



-- Bai E13
-- Phan tich term_months thanh so nam va so thang le.
-- Vi du: 72 thang -> 6 nam 0 thang; 25 thang -> 2 nam 1 thang
-- Ket qua: contract_id | term_months | so_nam | thang_le
-- Goi y: term_months / 12, term_months % 12 (hoac FLOOR)
-- -------------------------------------------------------



-- ============================================================
-- NHOM 4: NULL HANDLING
-- ============================================================

-- Bai E14
-- Hien thi thong tin khach hang, xu ly NULL:
--   birth_date NULL -> '1900-01-01'
--   city NULL       -> 'Chua cap nhat'
--   email NULL      -> 'no-email@unknown.com'
-- Ket qua: cust_id | full_name | birth_date_safe | city_safe | email_safe
-- Goi y: ISNULL, COALESCE
-- -------------------------------------------------------



-- ============================================================
-- NHOM 5: CONVERSION
-- ============================================================

-- Bai E15
-- Hien thi principal voi dinh dang co dau phan cach nghin.
-- Vi du: 2000000000 -> '2,000,000,000'
-- Ket qua: contract_id | principal | principal_format
-- Goi y: FORMAT(value, 'N0') hoac CONVERT + style
-- -------------------------------------------------------

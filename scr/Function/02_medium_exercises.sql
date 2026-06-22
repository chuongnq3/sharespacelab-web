-- ============================================================
-- BAI TAP SQL SERVER FUNCTIONS - CAP DO: MEDIUM (15 bai)
-- Chu de: Window Functions / CASE / Conversion / NULL nang cao
-- Yeu cau: Chay 00_dataset.sql truoc
-- ============================================================

USE FuncPractice;
GO

-- ============================================================
-- NHOM 1: WINDOW FUNCTIONS
-- ============================================================

-- Bai M01
-- Xep hang khach hang theo outstanding giam dan TRONG TUNG segment.
-- Dung RANK (dong gia tri = cung hang, bo qua hang tiep theo).
-- Chi lay hop dong ACTIVE.
-- Ket qua: segment | cust_id | full_name | outstanding | hang
-- Goi y: RANK() OVER (PARTITION BY segment ORDER BY outstanding DESC)
-- -------------------------------------------------------



-- Bai M02
-- Danh so thu tu giao dich theo txn_date tang dan cho tung hop dong.
-- Ket qua: contract_id | txn_id | txn_date | stt
-- Goi y: ROW_NUMBER() OVER (PARTITION BY contract_id ORDER BY txn_date)
-- -------------------------------------------------------



-- Bai M03
-- So sanh so du du no (outstanding) cua tung hop dong hien tai
-- voi hop dong "truoc do" trong danh sach (sort theo disbursed_date).
-- Ket qua: contract_id | disbursed_date | outstanding | outstanding_truoc | chenh_lech
-- Goi y: LAG(outstanding) OVER (ORDER BY disbursed_date)
-- -------------------------------------------------------



-- Bai M04
-- Tinh tong so tien giao dich tich luy (running total) theo txn_date
-- cho tung hop dong (chi PAYMENT).
-- Ket qua: contract_id | txn_id | txn_date | amount | luy_ke
-- Goi y: SUM() OVER (PARTITION BY contract_id ORDER BY txn_date
--          ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
-- -------------------------------------------------------



-- Bai M05
-- Chia khach hang thanh 4 nhom (quartile) theo score_value
-- trong thang 2024-01-01.
-- Ket qua: cust_id | score_value | nhom_quartile
-- Goi y: NTILE(4) OVER (ORDER BY score_value)
-- -------------------------------------------------------



-- Bai M06
-- Lay giao dich dau tien va giao dich gan nhat cua tung hop dong.
-- Ket qua: contract_id | txn_dau | amount_dau | txn_gan_nhat | amount_gan_nhat
-- Goi y: FIRST_VALUE / LAST_VALUE OVER (PARTITION BY ... ORDER BY txn_date
--          ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)
-- -------------------------------------------------------



-- ============================================================
-- NHOM 2: CASE EXPRESSION
-- ============================================================

-- Bai M07
-- Phan loai hop dong theo DPD:
--   dpd = 0        -> 'NORMAL'
--   dpd 1-29       -> 'WATCH'
--   dpd 30-89      -> 'SUB_STANDARD'
--   dpd >= 90      -> 'NPL'
-- Dem so hop dong va tong outstanding theo tung nhom.
-- Ket qua: dpd_band | so_hop_dong | tong_outstanding
-- Goi y: CASE WHEN + GROUP BY
-- -------------------------------------------------------



-- Bai M08
-- Tao cot risk_label ket hop segment va DPD band:
--   PREMIUM + NORMAL   -> 'LOW RISK'
--   PREMIUM + WATCH    -> 'MEDIUM RISK'
--   AFFLUENT + NORMAL  -> 'MEDIUM RISK'
--   AFFLUENT + WATCH   -> 'HIGH RISK'
--   con lai            -> 'VERY HIGH RISK'
-- Ket qua: cust_id | segment | dpd | dpd_band | risk_label
-- Goi y: Nested CASE WHEN hoac CASE + AND
-- -------------------------------------------------------



-- ============================================================
-- NHOM 3: STRING NANG CAO
-- ============================================================

-- Bai M09
-- Tim tat ca giao dich co note chua tu 'auto' hoac 'Auto' hoac 'AUTO'
-- (khong phan biet hoa/thuong).
-- Ket qua: txn_id | contract_id | txn_date | note
-- Goi y: LOWER(note) LIKE '%auto%'
-- -------------------------------------------------------



-- Bai M10
-- Mask email: chi giu 2 ky tu dau + '***' + phan tu @ tro di.
-- Vi du: 'an.nguyen@email.com' -> 'an***@email.com'
-- Ket qua: cust_id | email | email_masked
-- Goi y: LEFT, CHARINDEX, SUBSTRING, LEN
-- -------------------------------------------------------



-- ============================================================
-- NHOM 4: DATE NANG CAO
-- ============================================================

-- Bai M11
-- Voi moi hop dong, tinh ngay du kien tra no tiep theo (next_due_date).
-- Gia su moi ky la 1 thang, tinh tu disbursed_date.
-- So ky da qua = DATEDIFF(MONTH, disbursed_date, GETDATE())
-- next_due_date = disbursed_date + (so_ky_da_qua + 1) thang
-- Ket qua: contract_id | disbursed_date | so_ky_da_qua | next_due_date
-- Goi y: DATEDIFF, DATEADD(MONTH, ...)
-- -------------------------------------------------------



-- Bai M12
-- Tinh so ngay trong tung thang cua score_month.
-- Ket qua: score_month | so_ngay_trong_thang
-- Goi y: DAY(EOMONTH(score_month))
-- -------------------------------------------------------



-- ============================================================
-- NHOM 5: AGGREGATE NANG CAO
-- ============================================================

-- Bai M13
-- Lay cac khach hang co tu 2 hop dong tro len
-- va tong principal > 1,000,000,000.
-- Ket qua: cust_id | so_hop_dong | tong_principal
-- Goi y: COUNT, SUM, GROUP BY, HAVING
-- -------------------------------------------------------



-- Bai M14
-- Tinh lai suat binh quan gia quyen (weight = outstanding) cho tung khach hang.
-- Xu ly truong hop tat ca outstanding = 0 (tranh chia cho 0).
-- Chi lay hop dong ACTIVE.
-- Ket qua: cust_id | tong_outstanding | lai_suat_bq
-- Goi y: SUM(outstanding * interest_rate) / NULLIF(SUM(outstanding), 0)
-- -------------------------------------------------------



-- Bai M15
-- Viet query tra ve JSON chua thong tin co ban cua tung khach hang.
-- Format: {"cust_id":1,"full_name":"...","segment":"..."}
-- Ket qua: mot cot json_info cho tung khach hang.
-- Goi y: FOR JSON PATH, hoac CONCAT + CAST
-- -------------------------------------------------------

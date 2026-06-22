-- ============================================================
-- BAI TAP SQL SERVER FUNCTIONS - CAP DO: EXTREME (8 bai)
-- Chu de: Recursive CTE / Dynamic SQL / Sessionization / Scoring
-- Yeu cau: Chay 00_dataset.sql truoc
-- ============================================================

USE FuncPractice;
GO

-- ============================================================
-- Bai X01: AMORTIZATION SCHEDULE (Lich tra no ly thuyet)
-- ============================================================
-- Sinh lich tra no bang phan deu (equal installment) cho hop dong 1001.
-- Moi dong la 1 ky (1 thang), tinh:
--   - ky_so        : 1, 2, 3, ...
--   - ngay_den_han : disbursed_date + ky_so thang
--   - goc_ky       : phan goc phai tra trong ky
--   - lai_ky       : outstanding_dau_ky * interest_rate / 100 / 12
--   - tra_tong     : goc_ky + lai_ky
--   - outstanding_cuoi_ky : outstanding_dau_ky - goc_ky
--
-- Cong thuc tra deu (EMI):
--   EMI = P * r * (1+r)^n / ((1+r)^n - 1)
--   Trong do r = interest_rate/100/12, n = term_months, P = principal
--
-- Dung Recursive CTE, dung khi ky_so = term_months.
-- Ket qua: ky_so | ngay_den_han | outstanding_dau_ky | lai_ky | goc_ky | tra_tong | outstanding_cuoi_ky
-- Goi y: WITH RCTE AS (anchor + recursive) OPTION (MAXRECURSION 360)
-- -------------------------------------------------------



-- ============================================================
-- Bai X02: SESSIONIZATION (Gop giao dich thanh session)
-- ============================================================
-- Phan nhom giao dich cua tung hop dong thanh "session":
--   Cac giao dich cach nhau <= 30 phut thuoc cung session.
--   Giao dich dau tien cua moi hop dong luon la session moi.
-- Danh session_id (so nguyen, tang dan theo thoi gian, reset cho tung hop dong).
-- Ket qua: contract_id | txn_id | txn_date | txn_type | session_id
-- Goi y:
--   B1: CTE gaps: LAG(txn_date) -> tinh gap_minutes
--   B2: CTE flags: CASE WHEN gap IS NULL OR gap > 30 THEN 1 ELSE 0 END
--   B3: SUM(is_new_session) OVER (PARTITION BY contract_id ORDER BY txn_date)
-- -------------------------------------------------------



-- ============================================================
-- Bai X03: DYNAMIC PIVOT (Pivot dong theo thang)
-- ============================================================
-- Pivot bang Scores: moi dong la 1 cust_id,
-- cac cot la cac thang co trong data (gia tri = score_value).
-- Vi du: cust_id | 2023-11 | 2023-12 | 2024-01 | 2024-02 | 2024-03
-- Vi so thang co the thay doi, dung Dynamic SQL.
-- Goi y:
--   B1: Lay danh sach thang distinct -> @cols (dung STUFF + FOR XML PATH)
--   B2: Build chuoi SQL PIVOT dong
--   B3: EXEC (@sql) hoac sp_executesql
-- -------------------------------------------------------



-- ============================================================
-- Bai X04: COMPOSITE SCORING (Tinh diem tong hop)
-- ============================================================
-- Tinh diem tong hop cho tung khach hang (dung thang 2024-01-01):
--
--   composite = 0.4 * norm_score
--             + 0.3 * norm_payment_ratio
--             + 0.3 * norm_activity
--
-- Trong do:
--   norm_score          = normalize(score_value)
--   norm_payment_ratio  = normalize(tong PAYMENT / principal)  <- chi ACTIVE
--   norm_activity       = normalize(so giao dich trong 3 thang gan nhat)
--   normalize(x)        = (x - min(x)) / NULLIF(max(x) - min(x), 0)
--
-- Ket qua: cust_id | score_value | payment_ratio | activity_cnt | composite_score
-- Goi y: Nhieu CTE: raw_data -> min_max -> normalized -> final
-- -------------------------------------------------------



-- ============================================================
-- Bai X05: COHORT RETENTION
-- ============================================================
-- Phan tich retention theo cohort:
--   Cohort = thang co hop dong dau tien cua khach hang (disbursed_date).
--   Sau do kiem tra: trong cac thang tiep theo (M+1, M+2, M+3, M+6, M+12),
--   co bao nhieu % khach hang con thuc hien giao dich PAYMENT.
--
-- Ket qua:
--   cohort_month | cohort_size | M1_pct | M2_pct | M3_pct | M6_pct | M12_pct
--
-- Goi y:
--   B1: CTE cohort: MIN(disbursed_date) GROUP BY cust_id -> cohort_month
--   B2: CTE activity: cust_id, FORMAT(txn_date,'yyyy-MM-01') activity_month
--   B3: DATEDIFF(MONTH, cohort_month, activity_month) -> bucket
--   B4: SUM(CASE WHEN bucket = 1 THEN 1 END) * 100.0 / cohort_size
-- -------------------------------------------------------



-- ============================================================
-- Bai X06: RECURSIVE HIERARCHY (Cay phan cap san pham)
-- ============================================================
-- Tao bang tam chua phan cap san pham:
--   Level 0: category (HOME, CAR, PERSONAL, BUSINESS)
--   Level 1: tung san pham thuoc category do
-- Dung Recursive CTE de traverse va tao cot:
--   full_path = 'HOME > Vay mua nha lai suat co dinh'
-- Ket qua: level | node_id | node_name | parent_name | full_path
-- Goi y: 
--   B1: Tao bang #Hierarchy tu Products voi parent_id gia lap (dung category lam parent)
--   B2: CTE anchor = cac category (level 0)
--   B3: CTE recursive = join vao Products
--   B4: Noi full_path = parent_path + ' > ' + node_name
-- -------------------------------------------------------



-- ============================================================
-- Bai X07: SCD TYPE 2 DETECTION (Phat hien thay doi score band)
-- ============================================================
-- Phat hien cac khach hang co score_band THAY DOI giua 2 thang lien tiep.
-- Ket qua: cust_id | full_name | thang_thay_doi | band_cu | band_moi | chieu ('UP' / 'DOWN')
-- Goi y:
--   B1: CTE ranked: LAG(score_band) OVER (PARTITION BY cust_id ORDER BY score_month)
--   B2: WHERE band_cu IS NOT NULL AND band_cu <> band_moi
--   B3: Chieu: band A > B > C > D > E (A tot nhat), nen UP = band moi tot hon (A < B thi la DOWN)
-- -------------------------------------------------------



-- ============================================================
-- Bai X08: PORTFOLIO STRESS TEST
-- ============================================================
-- Gia lap stress test: tat ca hop dong ACTIVE bi tang them 30 DPD.
-- Tinh lai:
--   1. Phan phoi so hop dong theo DPD band moi
--   2. Uoc tinh provision (trich lap du phong):
--        NORMAL       -> 0%
--        WATCH        -> 2%
--        SUB_STANDARD -> 20%
--        NPL          -> 50%
--      cua outstanding
--   3. So sanh voi truoc stress (provision_truoc vs provision_sau)
--
-- Ket qua:
--   dpd_band_sau | so_hop_dong | tong_outstanding | provision_sau
--   + dong tong cong
--   + dong so sanh tong provision truoc/sau
--
-- Goi y: CTE stress_contracts (dpd + 30) -> CASE band moi ->
--         SUM(outstanding * provision_rate) GROUP BY band
-- -------------------------------------------------------

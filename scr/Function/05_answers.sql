-- ============================================================
-- LOI GIAI - TAT CA CAP DO (EASY / MEDIUM / HARD / EXTREME)
-- ============================================================

USE FuncPractice;
GO

-- ============================================================
-- ██████  EASY
-- ============================================================

-- [E01] Lay ho khach hang
SELECT
    cust_id,
    full_name,
    LEFT(full_name, CHARINDEX(' ', full_name + ' ') - 1) AS ho
FROM Customers;

-- [E02] Viet hoa ten, chuyen thuong email
SELECT
    cust_id,
    UPPER(full_name)  AS full_name_upper,
    LOWER(email)      AS email_lower
FROM Customers;

-- [E03] Tao username
SELECT
    cust_id,
    email,
    LEFT(email, 6) + '_' + CAST(cust_id AS VARCHAR) AS username
FROM Customers;
-- Luu y: neu muon lay chinh xac phan truoc @:
--   LEFT(email, CHARINDEX('@', email) - 1) lay phan truoc @, sau do LEFT(..., 6)

-- [E04] Chieu dai ten > 15
SELECT
    cust_id,
    full_name,
    LEN(full_name) AS do_dai
FROM Customers
WHERE LEN(full_name) > 15;

-- [E05] Format phone them dau '-'
SELECT
    cust_id,
    phone,
    LEFT(phone, 4) + '-' + SUBSTRING(phone, 5, LEN(phone)) AS phone_format
FROM Customers;

-- [E06] Tinh tuoi chinh xac
SELECT
    cust_id,
    full_name,
    birth_date,
    DATEDIFF(YEAR, birth_date, GETDATE())
    - CASE
        WHEN MONTH(birth_date) > MONTH(GETDATE())
          OR (MONTH(birth_date) = MONTH(GETDATE()) AND DAY(birth_date) > DAY(GETDATE()))
        THEN 1 ELSE 0
      END AS tuoi
FROM Customers;

-- [E07] Thang nam disbursed_date
SELECT
    contract_id,
    disbursed_date,
    FORMAT(disbursed_date, 'MM/yyyy') AS thang_nam
FROM Contracts;

-- [E08] So ngay con lai den maturity_date
SELECT
    contract_id,
    maturity_date,
    CASE
        WHEN maturity_date < CAST(GETDATE() AS DATE) THEN 0
        ELSE DATEDIFF(DAY, CAST(GETDATE() AS DATE), maturity_date)
    END AS so_ngay_con_lai
FROM Contracts
WHERE status = 'ACTIVE';

-- [E09] Ngay dau thang / cuoi thang
SELECT
    txn_id,
    txn_date,
    DATEFROMPARTS(YEAR(txn_date), MONTH(txn_date), 1)  AS ngay_dau_thang,
    EOMONTH(txn_date)                                   AS ngay_cuoi_thang
FROM Transactions;

-- [E10] Buoi giao dich
SELECT
    txn_id,
    txn_date,
    CASE
        WHEN DATEPART(HOUR, txn_date) BETWEEN  6 AND 11 THEN 'SANG'
        WHEN DATEPART(HOUR, txn_date) BETWEEN 12 AND 17 THEN 'CHIEU'
        WHEN DATEPART(HOUR, txn_date) BETWEEN 18 AND 23 THEN 'TOI'
        ELSE 'KHUYA'
    END AS buoi
FROM Transactions;

-- [E11] Lai hang thang
SELECT
    contract_id,
    outstanding,
    interest_rate,
    ROUND(outstanding * interest_rate / 100.0 / 12, 2) AS lai_thang
FROM Contracts
WHERE status = 'ACTIVE'
  AND outstanding > 0;

-- [E12] Ty le thu hoi no
SELECT
    contract_id,
    principal,
    outstanding,
    ROUND((principal - outstanding) * 100.0 / NULLIF(principal, 0), 1) AS ty_le_thu_hoi
FROM Contracts;

-- [E13] Phan tich term_months
SELECT
    contract_id,
    term_months,
    term_months / 12    AS so_nam,
    term_months % 12    AS thang_le
FROM Contracts;

-- [E14] Xu ly NULL
SELECT
    cust_id,
    full_name,
    ISNULL(CAST(birth_date AS VARCHAR), '1900-01-01')   AS birth_date_safe,
    COALESCE(city, 'Chua cap nhat')                     AS city_safe,
    COALESCE(email, 'no-email@unknown.com')             AS email_safe
FROM Customers;

-- [E15] Format principal
SELECT
    contract_id,
    principal,
    FORMAT(principal, 'N0') AS principal_format
FROM Contracts;


-- ============================================================
-- ██████  MEDIUM
-- ============================================================

-- [M01] RANK outstanding theo segment
SELECT
    c.segment,
    cu.cust_id,
    cu.full_name,
    c.outstanding,
    RANK() OVER (PARTITION BY cu.segment ORDER BY c.outstanding DESC) AS hang
FROM Contracts c
JOIN Customers cu ON cu.cust_id = c.cust_id
WHERE c.status = 'ACTIVE';

-- [M02] ROW_NUMBER giao dich theo hop dong
SELECT
    contract_id,
    txn_id,
    txn_date,
    ROW_NUMBER() OVER (PARTITION BY contract_id ORDER BY txn_date) AS stt
FROM Transactions;

-- [M03] LAG outstanding
SELECT
    contract_id,
    disbursed_date,
    outstanding,
    LAG(outstanding) OVER (ORDER BY disbursed_date)                             AS outstanding_truoc,
    outstanding - LAG(outstanding) OVER (ORDER BY disbursed_date)               AS chenh_lech
FROM Contracts;

-- [M04] Running total PAYMENT
SELECT
    contract_id,
    txn_id,
    txn_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY contract_id
        ORDER BY txn_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS luy_ke
FROM Transactions
WHERE txn_type = 'PAYMENT';

-- [M05] NTILE quartile theo score
SELECT
    cust_id,
    score_value,
    NTILE(4) OVER (ORDER BY score_value) AS nhom_quartile
FROM Scores
WHERE score_month = '2024-01-01';

-- [M06] FIRST_VALUE / LAST_VALUE
SELECT DISTINCT
    contract_id,
    FIRST_VALUE(txn_date) OVER (
        PARTITION BY contract_id ORDER BY txn_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS txn_dau,
    FIRST_VALUE(amount) OVER (
        PARTITION BY contract_id ORDER BY txn_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS amount_dau,
    LAST_VALUE(txn_date) OVER (
        PARTITION BY contract_id ORDER BY txn_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS txn_gan_nhat,
    LAST_VALUE(amount) OVER (
        PARTITION BY contract_id ORDER BY txn_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS amount_gan_nhat
FROM Transactions;

-- [M07] Phan loai DPD, dem theo nhom
SELECT
    CASE
        WHEN dpd = 0           THEN 'NORMAL'
        WHEN dpd BETWEEN 1 AND 29  THEN 'WATCH'
        WHEN dpd BETWEEN 30 AND 89 THEN 'SUB_STANDARD'
        ELSE 'NPL'
    END AS dpd_band,
    COUNT(*)            AS so_hop_dong,
    SUM(outstanding)    AS tong_outstanding
FROM Contracts
GROUP BY
    CASE
        WHEN dpd = 0           THEN 'NORMAL'
        WHEN dpd BETWEEN 1 AND 29  THEN 'WATCH'
        WHEN dpd BETWEEN 30 AND 89 THEN 'SUB_STANDARD'
        ELSE 'NPL'
    END;

-- [M08] Risk label ket hop segment + dpd band
WITH dpd_band AS (
    SELECT
        cn.contract_id,
        cu.cust_id,
        cu.segment,
        cn.dpd,
        CASE
            WHEN cn.dpd = 0           THEN 'NORMAL'
            WHEN cn.dpd BETWEEN 1 AND 29  THEN 'WATCH'
            WHEN cn.dpd BETWEEN 30 AND 89 THEN 'SUB_STANDARD'
            ELSE 'NPL'
        END AS dpd_band
    FROM Contracts cn
    JOIN Customers cu ON cu.cust_id = cn.cust_id
)
SELECT
    cust_id, segment, dpd, dpd_band,
    CASE
        WHEN segment = 'PREMIUM'  AND dpd_band = 'NORMAL' THEN 'LOW RISK'
        WHEN segment = 'PREMIUM'  AND dpd_band = 'WATCH'  THEN 'MEDIUM RISK'
        WHEN segment = 'AFFLUENT' AND dpd_band = 'NORMAL' THEN 'MEDIUM RISK'
        WHEN segment = 'AFFLUENT' AND dpd_band = 'WATCH'  THEN 'HIGH RISK'
        ELSE 'VERY HIGH RISK'
    END AS risk_label
FROM dpd_band;

-- [M09] Tim giao dich co note chua 'auto' (case-insensitive)
SELECT txn_id, contract_id, txn_date, note
FROM Transactions
WHERE LOWER(note) LIKE '%auto%';

-- [M10] Mask email
SELECT
    cust_id,
    email,
    LEFT(email, 2)
    + '***'
    + SUBSTRING(email, CHARINDEX('@', email), LEN(email)) AS email_masked
FROM Customers
WHERE email IS NOT NULL;

-- [M11] Next due date
SELECT
    contract_id,
    disbursed_date,
    DATEDIFF(MONTH, disbursed_date, GETDATE())              AS so_ky_da_qua,
    DATEADD(MONTH, DATEDIFF(MONTH, disbursed_date, GETDATE()) + 1, disbursed_date) AS next_due_date
FROM Contracts;

-- [M12] So ngay trong thang cua score_month
SELECT DISTINCT
    score_month,
    DAY(EOMONTH(score_month)) AS so_ngay_trong_thang
FROM Scores
ORDER BY score_month;

-- [M13] Khach hang >= 2 hop dong, tong principal > 1 ty
SELECT
    cust_id,
    COUNT(*)            AS so_hop_dong,
    SUM(principal)      AS tong_principal
FROM Contracts
GROUP BY cust_id
HAVING COUNT(*) >= 2
   AND SUM(principal) > 1000000000;

-- [M14] Lai suat binh quan gia quyen
SELECT
    cust_id,
    SUM(outstanding)                                                        AS tong_outstanding,
    ROUND(
        SUM(outstanding * interest_rate) / NULLIF(SUM(outstanding), 0)
    , 2)                                                                    AS lai_suat_bq
FROM Contracts
WHERE status = 'ACTIVE'
GROUP BY cust_id;

-- [M15] JSON output
SELECT
    cust_id,
    (
        SELECT cust_id, full_name, segment
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ) AS json_info
FROM Customers;


-- ============================================================
-- ██████  HARD
-- ============================================================

-- [H01] MoM growth cua PAYMENT
WITH monthly AS (
    SELECT
        FORMAT(txn_date, 'yyyy-MM')     AS thang,
        SUM(amount)                     AS tong_payment
    FROM Transactions
    WHERE txn_type = 'PAYMENT'
    GROUP BY FORMAT(txn_date, 'yyyy-MM')
)
SELECT
    thang,
    tong_payment,
    LAG(tong_payment) OVER (ORDER BY thang)    AS thang_truoc,
    ROUND(
        (tong_payment - LAG(tong_payment) OVER (ORDER BY thang))
        * 100.0
        / NULLIF(LAG(tong_payment) OVER (ORDER BY thang), 0)
    , 1) AS growth_pct
FROM monthly
ORDER BY thang;

-- [H02] Top 3 outstanding theo segment (DENSE_RANK)
WITH ranked AS (
    SELECT
        cu.segment,
        cu.cust_id,
        cu.full_name,
        SUM(cn.outstanding)                                                         AS tong_outstanding,
        DENSE_RANK() OVER (PARTITION BY cu.segment ORDER BY SUM(cn.outstanding) DESC) AS hang
    FROM Contracts cn
    JOIN Customers cu ON cu.cust_id = cn.cust_id
    WHERE cn.status = 'ACTIVE'
    GROUP BY cu.segment, cu.cust_id, cu.full_name
)
SELECT segment, hang, cust_id, full_name, tong_outstanding
FROM ranked
WHERE hang <= 3
ORDER BY segment, hang;

-- [H03] Health score
WITH scored AS (
    SELECT
        contract_id, dpd, outstanding,
        CASE
            WHEN dpd = 0           THEN 10
            WHEN dpd BETWEEN 1 AND 29  THEN 7
            WHEN dpd BETWEEN 30 AND 89 THEN 3
            ELSE 0
        END AS dpd_point
    FROM Contracts
)
SELECT
    contract_id, dpd, outstanding, dpd_point,
    ROUND(
        dpd_point * LOG(1 + outstanding / 1000000.0)
    , 2) AS health_score
FROM scored;

-- [H04] Pivot giao dich theo channel
SELECT
    FORMAT(txn_date, 'yyyy-MM')                                         AS thang,
    SUM(CASE WHEN channel = 'ONLINE' THEN 1 ELSE 0 END)                AS cnt_online,
    SUM(CASE WHEN channel = 'TELLER' THEN 1 ELSE 0 END)                AS cnt_teller,
    SUM(CASE WHEN channel = 'ATM'    THEN 1 ELSE 0 END)                AS cnt_atm,
    SUM(CASE WHEN channel = 'AUTO'   THEN 1 ELSE 0 END)                AS cnt_auto,
    COUNT(*)                                                             AS tong
FROM Transactions
GROUP BY FORMAT(txn_date, 'yyyy-MM')
ORDER BY thang;

-- [H05] Hop dong ACTIVE khong co giao dich trong 90 ngay
SELECT
    cn.contract_id,
    cn.cust_id,
    cn.status,
    MAX(t.txn_date)                                                     AS ngay_giao_dich_cuoi,
    DATEDIFF(DAY, MAX(t.txn_date), GETDATE())                          AS so_ngay_im_lang
FROM Contracts cn
LEFT JOIN Transactions t ON t.contract_id = cn.contract_id
WHERE cn.status = 'ACTIVE'
GROUP BY cn.contract_id, cn.cust_id, cn.status
HAVING MAX(t.txn_date) IS NULL
    OR DATEDIFF(DAY, MAX(t.txn_date), GETDATE()) > 90;

-- [H06] Validate phone
SELECT
    cust_id,
    phone,
    CASE
        WHEN LEN(phone) = 10
         AND (LEFT(phone, 2) IN ('09', '03', '07'))
         AND phone NOT LIKE '%[^0-9]%'
        THEN 1 ELSE 0
    END AS is_valid,
    CASE
        WHEN LEN(phone) <> 10
        THEN 'Khong du 10 so'
        WHEN LEFT(phone, 2) NOT IN ('09', '03', '07')
        THEN 'Sai dau so (phai 09/03/07)'
        WHEN phone LIKE '%[^0-9]%'
        THEN 'Chua ky tu khong phai so'
        ELSE NULL
    END AS ly_do
FROM Customers;

-- [H07] Percentile score theo band
SELECT DISTINCT
    score_band,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY score_value) OVER (PARTITION BY score_band) AS q1,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY score_value) OVER (PARTITION BY score_band) AS q2_median,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY score_value) OVER (PARTITION BY score_band) AS q3
FROM Scores
WHERE score_month = '2024-01-01';

-- [H08] Running balance sau moi giao dich
WITH payments AS (
    SELECT
        t.contract_id,
        t.txn_id,
        t.txn_date,
        t.amount,
        SUM(CASE WHEN t.txn_type = 'PAYMENT' THEN t.amount ELSE 0 END)
            OVER (PARTITION BY t.contract_id ORDER BY t.txn_date
                  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS tong_da_tra
    FROM Transactions t
)
SELECT
    p.contract_id,
    p.txn_id,
    p.txn_date,
    p.amount,
    c.principal - p.tong_da_tra AS so_du_sau_giao_dich
FROM payments p
JOIN Contracts c ON c.contract_id = p.contract_id;

-- [H09] Nhom tuoi + avg score
WITH ages AS (
    SELECT
        cu.cust_id,
        DATEDIFF(YEAR, cu.birth_date, GETDATE())
        - CASE
            WHEN MONTH(cu.birth_date) > MONTH(GETDATE())
              OR (MONTH(cu.birth_date) = MONTH(GETDATE()) AND DAY(cu.birth_date) > DAY(GETDATE()))
            THEN 1 ELSE 0
          END AS tuoi
    FROM Customers cu
),
bands AS (
    SELECT
        a.cust_id,
        CASE
            WHEN a.tuoi < 25          THEN 'GEN Z (<25)'
            WHEN a.tuoi BETWEEN 25 AND 34 THEN 'MILLENNIAL (25-34)'
            WHEN a.tuoi BETWEEN 35 AND 44 THEN 'GEN X (35-44)'
            WHEN a.tuoi BETWEEN 45 AND 54 THEN 'BABY BOOMER (45-54)'
            ELSE 'SENIOR (55+)'
        END AS nhom_tuoi
    FROM ages a
)
SELECT
    b.nhom_tuoi,
    COUNT(DISTINCT b.cust_id)       AS so_kh,
    ROUND(AVG(CAST(s.score_value AS FLOAT)), 1) AS avg_score
FROM bands b
JOIN Scores s ON s.cust_id = b.cust_id AND s.score_month = '2024-01-01'
GROUP BY b.nhom_tuoi
ORDER BY avg_score DESC;

-- [H10] Extract note_month tu cot note
SELECT
    txn_id,
    note,
    TRY_CAST(
        CASE
            WHEN PATINDEX('%[0-9][0-9]/[0-9][0-9][0-9][0-9]%', note) > 0
            THEN
                SUBSTRING(note,
                    PATINDEX('%[0-9][0-9]/[0-9][0-9][0-9][0-9]%', note),
                    7)   -- 'MM/yyyy' = 7 ky tu
            ELSE NULL
        END
    AS DATE) AS note_month_raw,
    -- Cach chuyen thanh ngay dau thang:
    CASE
        WHEN PATINDEX('%[0-9][0-9]/[0-9][0-9][0-9][0-9]%', note) > 0
        THEN DATEFROMPARTS(
                CAST(SUBSTRING(note, PATINDEX('%[0-9][0-9]/[0-9][0-9][0-9][0-9]%', note) + 3, 4) AS INT),
                CAST(SUBSTRING(note, PATINDEX('%[0-9][0-9]/[0-9][0-9][0-9][0-9]%', note), 2) AS INT),
                1)
        ELSE NULL
    END AS note_month
FROM Transactions;


-- ============================================================
-- ██████  EXTREME
-- ============================================================

-- [X01] Amortization schedule cho hop dong 1001
DECLARE @P    BIGINT;
DECLARE @r    FLOAT;
DECLARE @n    INT;
DECLARE @d    DATE;

SELECT
    @P = principal,
    @r = interest_rate / 100.0 / 12,
    @n = term_months,
    @d = disbursed_date
FROM Contracts WHERE contract_id = 1001;

DECLARE @EMI FLOAT = @P * @r * POWER(1 + @r, @n) / (POWER(1 + @r, @n) - 1);

WITH amort AS (
    -- Anchor: ky dau tien
    SELECT
        1                                                   AS ky_so,
        DATEADD(MONTH, 1, @d)                               AS ngay_den_han,
        CAST(@P AS FLOAT)                                   AS outstanding_dau_ky,
        CAST(@P * @r AS FLOAT)                              AS lai_ky,
        CAST(@EMI - @P * @r AS FLOAT)                      AS goc_ky,
        CAST(@EMI AS FLOAT)                                 AS tra_tong,
        CAST(@P - (@EMI - @P * @r) AS FLOAT)               AS outstanding_cuoi_ky

    UNION ALL

    -- Recursive: cac ky tiep theo
    SELECT
        a.ky_so + 1,
        DATEADD(MONTH, a.ky_so + 1, @d),
        a.outstanding_cuoi_ky,
        a.outstanding_cuoi_ky * @r,
        @EMI - a.outstanding_cuoi_ky * @r,
        @EMI,
        a.outstanding_cuoi_ky - (@EMI - a.outstanding_cuoi_ky * @r)
    FROM amort a
    WHERE a.ky_so < @n
      AND a.outstanding_cuoi_ky > 1   -- dung khi gan het (tranh float drift)
)
SELECT
    ky_so,
    ngay_den_han,
    ROUND(outstanding_dau_ky, 0)    AS outstanding_dau_ky,
    ROUND(lai_ky, 0)                AS lai_ky,
    ROUND(goc_ky, 0)                AS goc_ky,
    ROUND(tra_tong, 0)              AS tra_tong,
    ROUND(outstanding_cuoi_ky, 0)   AS outstanding_cuoi_ky
FROM amort
ORDER BY ky_so
OPTION (MAXRECURSION 360);

-- [X02] Sessionization (gop giao dich <= 30 phut)
WITH gaps AS (
    SELECT
        contract_id,
        txn_id,
        txn_date,
        txn_type,
        DATEDIFF(
            MINUTE,
            LAG(txn_date) OVER (PARTITION BY contract_id ORDER BY txn_date),
            txn_date
        ) AS gap_minutes
    FROM Transactions
),
flags AS (
    SELECT
        *,
        CASE
            WHEN gap_minutes IS NULL OR gap_minutes > 30 THEN 1
            ELSE 0
        END AS is_new_session
    FROM gaps
)
SELECT
    contract_id,
    txn_id,
    txn_date,
    txn_type,
    SUM(is_new_session) OVER (
        PARTITION BY contract_id
        ORDER BY txn_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS session_id
FROM flags
ORDER BY contract_id, txn_date;

-- [X03] Dynamic Pivot score theo thang
DECLARE @cols   NVARCHAR(MAX);
DECLARE @sql    NVARCHAR(MAX);

SELECT @cols = STUFF(
    (
        SELECT DISTINCT ', ' + QUOTENAME(FORMAT(score_month, 'yyyy-MM'))
        FROM Scores
        ORDER BY ', ' + QUOTENAME(FORMAT(score_month, 'yyyy-MM'))
        FOR XML PATH(''), TYPE
    ).value('.', 'NVARCHAR(MAX)')
, 1, 2, '');

SET @sql = N'
SELECT cust_id, ' + @cols + N'
FROM (
    SELECT cust_id, FORMAT(score_month, ''yyyy-MM'') AS thang, score_value
    FROM Scores
) src
PIVOT (
    MAX(score_value)
    FOR thang IN (' + @cols + N')
) pvt
ORDER BY cust_id;';

EXEC sp_executesql @sql;

-- [X04] Composite scoring
WITH raw AS (
    SELECT
        cu.cust_id,
        s.score_value,
        -- payment ratio = tong PAYMENT / principal (chi ACTIVE)
        ISNULL(
            SUM(CASE WHEN t.txn_type = 'PAYMENT' THEN CAST(t.amount AS FLOAT) END)
            / NULLIF(MAX(CAST(cn.principal AS FLOAT)), 0)
        , 0) AS payment_ratio,
        -- activity: so giao dich 3 thang gan nhat
        SUM(CASE
            WHEN t.txn_date >= DATEADD(MONTH, -3, GETDATE()) THEN 1 ELSE 0
        END) AS activity_cnt
    FROM Customers cu
    JOIN Scores s ON s.cust_id = cu.cust_id AND s.score_month = '2024-01-01'
    LEFT JOIN Contracts cn ON cn.cust_id = cu.cust_id AND cn.status = 'ACTIVE'
    LEFT JOIN Transactions t ON t.contract_id = cn.contract_id
    GROUP BY cu.cust_id, s.score_value
),
minmax AS (
    SELECT
        MIN(CAST(score_value AS FLOAT))     min_s,  MAX(CAST(score_value AS FLOAT))     max_s,
        MIN(payment_ratio)                  min_p,  MAX(payment_ratio)                  max_p,
        MIN(CAST(activity_cnt AS FLOAT))    min_a,  MAX(CAST(activity_cnt AS FLOAT))    max_a
    FROM raw
),
normed AS (
    SELECT
        r.cust_id,
        r.score_value,
        r.payment_ratio,
        r.activity_cnt,
        (CAST(r.score_value AS FLOAT)  - m.min_s) / NULLIF(m.max_s - m.min_s, 0) AS n_score,
        (r.payment_ratio               - m.min_p) / NULLIF(m.max_p - m.min_p, 0) AS n_payment,
        (CAST(r.activity_cnt AS FLOAT) - m.min_a) / NULLIF(m.max_a - m.min_a, 0) AS n_activity
    FROM raw r CROSS JOIN minmax m
)
SELECT
    cust_id,
    score_value,
    ROUND(payment_ratio, 4)                             AS payment_ratio,
    activity_cnt,
    ROUND(0.4 * ISNULL(n_score,0)
        + 0.3 * ISNULL(n_payment,0)
        + 0.3 * ISNULL(n_activity,0), 4)               AS composite_score
FROM normed
ORDER BY composite_score DESC;

-- [X05] Cohort Retention
WITH cohort AS (
    SELECT
        cust_id,
        DATEFROMPARTS(YEAR(MIN(disbursed_date)), MONTH(MIN(disbursed_date)), 1) AS cohort_month
    FROM Contracts
    GROUP BY cust_id
),
activity AS (
    SELECT DISTINCT
        cn.cust_id,
        DATEFROMPARTS(YEAR(t.txn_date), MONTH(t.txn_date), 1) AS activity_month
    FROM Transactions t
    JOIN Contracts cn ON cn.contract_id = t.contract_id
    WHERE t.txn_type = 'PAYMENT'
),
cohort_size AS (
    SELECT cohort_month, COUNT(*) AS cohort_sz FROM cohort GROUP BY cohort_month
),
joined AS (
    SELECT
        co.cohort_month,
        DATEDIFF(MONTH, co.cohort_month, a.activity_month) AS bucket,
        co.cust_id
    FROM cohort co
    LEFT JOIN activity a ON a.cust_id = co.cust_id
)
SELECT
    j.cohort_month,
    cs.cohort_sz,
    ROUND(SUM(CASE WHEN j.bucket =  1 THEN 1.0 END) / cs.cohort_sz * 100, 1) AS M1_pct,
    ROUND(SUM(CASE WHEN j.bucket =  2 THEN 1.0 END) / cs.cohort_sz * 100, 1) AS M2_pct,
    ROUND(SUM(CASE WHEN j.bucket =  3 THEN 1.0 END) / cs.cohort_sz * 100, 1) AS M3_pct,
    ROUND(SUM(CASE WHEN j.bucket =  6 THEN 1.0 END) / cs.cohort_sz * 100, 1) AS M6_pct,
    ROUND(SUM(CASE WHEN j.bucket = 12 THEN 1.0 END) / cs.cohort_sz * 100, 1) AS M12_pct
FROM joined j
JOIN cohort_size cs ON cs.cohort_month = j.cohort_month
GROUP BY j.cohort_month, cs.cohort_sz
ORDER BY j.cohort_month;

-- [X06] Recursive Hierarchy san pham
WITH base AS (
    -- Level 0: category lam root ao
    SELECT DISTINCT
        0                       AS level,
        category                AS node_id,
        category                AS node_name,
        NULL                    AS parent_name,
        CAST(category AS NVARCHAR(500)) AS full_path
    FROM Products

    UNION ALL

    -- Level 1: san pham con
    SELECT
        1,
        CAST(prod_id AS VARCHAR),
        prod_name,
        p.category,
        CAST(b.full_path + N' > ' + p.prod_name AS NVARCHAR(500))
    FROM Products p
    JOIN base b ON b.node_id = p.category AND b.level = 0
)
SELECT level, node_id, node_name, parent_name, full_path
FROM base
ORDER BY full_path;

-- [X07] SCD detect - thay doi score band
WITH ranked AS (
    SELECT
        cust_id,
        score_month,
        score_band,
        LAG(score_band) OVER (PARTITION BY cust_id ORDER BY score_month) AS band_cu
    FROM Scores
)
SELECT
    r.cust_id,
    cu.full_name,
    r.score_month                                                       AS thang_thay_doi,
    r.band_cu                                                           AS band_cu,
    r.score_band                                                        AS band_moi,
    -- A(1) > B(2) > C(3) > D(4) > E(5): band moi co so nho hon = tot hon = UP
    CASE
        WHEN ASCII(r.score_band) < ASCII(r.band_cu) THEN 'UP'
        ELSE 'DOWN'
    END                                                                 AS chieu
FROM ranked r
JOIN Customers cu ON cu.cust_id = r.cust_id
WHERE r.band_cu IS NOT NULL
  AND r.band_cu <> r.score_band
ORDER BY r.cust_id, r.score_month;

-- [X08] Portfolio Stress Test
WITH stressed AS (
    SELECT
        contract_id,
        outstanding,
        dpd,
        dpd + 30 AS dpd_stress,
        CASE
            WHEN dpd = 0           THEN 'NORMAL'
            WHEN dpd BETWEEN 1 AND 29  THEN 'WATCH'
            WHEN dpd BETWEEN 30 AND 89 THEN 'SUB_STANDARD'
            ELSE 'NPL'
        END AS band_truoc,
        CASE
            WHEN (dpd + 30) = 0           THEN 'NORMAL'
            WHEN (dpd + 30) BETWEEN 1 AND 29  THEN 'WATCH'
            WHEN (dpd + 30) BETWEEN 30 AND 89 THEN 'SUB_STANDARD'
            ELSE 'NPL'
        END AS band_sau
    FROM Contracts
    WHERE status = 'ACTIVE'
),
provision_rate AS (
    SELECT *,
        CASE band_truoc
            WHEN 'NORMAL'       THEN 0.00
            WHEN 'WATCH'        THEN 0.02
            WHEN 'SUB_STANDARD' THEN 0.20
            ELSE 0.50
        END AS rate_truoc,
        CASE band_sau
            WHEN 'NORMAL'       THEN 0.00
            WHEN 'WATCH'        THEN 0.02
            WHEN 'SUB_STANDARD' THEN 0.20
            ELSE 0.50
        END AS rate_sau
    FROM stressed
)
SELECT
    band_sau                        AS dpd_band_sau,
    COUNT(*)                        AS so_hop_dong,
    SUM(outstanding)                AS tong_outstanding,
    SUM(outstanding * rate_truoc)   AS provision_truoc,
    SUM(outstanding * rate_sau)     AS provision_sau
FROM provision_rate
GROUP BY band_sau

UNION ALL

SELECT
    'TOTAL',
    COUNT(*),
    SUM(outstanding),
    SUM(outstanding * rate_truoc),
    SUM(outstanding * rate_sau)
FROM provision_rate

ORDER BY CASE dpd_band_sau
    WHEN 'NORMAL'       THEN 1
    WHEN 'WATCH'        THEN 2
    WHEN 'SUB_STANDARD' THEN 3
    WHEN 'NPL'          THEN 4
    ELSE 5
END;
GO

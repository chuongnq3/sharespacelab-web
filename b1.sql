Bài giảng: Cách luyện tập tư duy SQL
1. Mục tiêu bài học

Sau bài học này, người học cần hiểu được:

SQL không chỉ là cú pháp, mà là cách tư duy xử lý dữ liệu dạng bảng.
Biết cách phân tích một bài toán dữ liệu trước khi viết query.
Biết luyện tập SQL theo từng cấp độ: từ đọc bảng, lọc dữ liệu, join, group by, đến CTE và window function.
Hình thành thói quen viết SQL rõ ràng, có kiểm tra logic, tránh sai dữ liệu.
2. SQL là gì?

SQL là ngôn ngữ dùng để làm việc với dữ liệu trong cơ sở dữ liệu quan hệ.

Nhưng khi học SQL, không nên chỉ học theo kiểu:

SELECT ...
FROM ...
WHERE ...
GROUP BY ...

Mà cần hiểu SQL là cách trả lời các câu hỏi như:

Dữ liệu đang nằm ở bảng nào?
Mỗi dòng trong bảng đại diện cho cái gì?
Cần lọc điều kiện nào?
Cần nối thêm bảng nào?
Cần tính toán ở cấp độ dòng hay cấp độ nhóm?
Kết quả cuối cùng cần có bao nhiêu dòng?
Có bị nhân bản dữ liệu sau khi join không?

Nói ngắn gọn:

Học SQL là học cách biến một câu hỏi nghiệp vụ thành một luồng xử lý dữ liệu logic.

3. Tư duy SQL bắt đầu từ “Grain”
3.1. Grain là gì?

Grain là mức độ chi tiết của dữ liệu trong một bảng hoặc một kết quả query.

Ví dụ:

Bảng giao dịch
transaction_id	customer_id	trans_date	amount
T001	C01	2026-01-01	100
T002	C01	2026-01-02	200
T003	C02	2026-01-01	300

Grain của bảng này là:

Mỗi dòng là một giao dịch.

Nếu bài toán yêu cầu:

Tổng số tiền giao dịch theo từng khách hàng.

Thì kết quả cần đổi grain từ:

1 dòng = 1 giao dịch

thành:

1 dòng = 1 khách hàng

Query:

SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
GROUP BY customer_id;
4. Quy trình tư duy trước khi viết SQL

Khi gặp một bài toán SQL, không nên viết ngay. Hãy đi theo 6 bước sau.

Bước 1: Hiểu câu hỏi nghiệp vụ
Ví dụ câu hỏi:

Lấy danh sách khách hàng có tổng dư nợ lớn hơn 1 tỷ trong tháng 05/2026.

Cần tách câu hỏi thành các thành phần:

Thành phần	Ý nghĩa
Đối tượng chính	Khách hàng
Chỉ tiêu cần tính	Tổng dư nợ
Điều kiện thời gian	Tháng 05/2026
Điều kiện lọc sau tính toán	Tổng dư nợ > 1 tỷ
Kết quả mong muốn	Danh sách khách hàng

Bước 2: Xác định bảng nguồn
Cần tự hỏi:

Dữ liệu khách hàng nằm ở bảng nào?
Dữ liệu dư nợ nằm ở bảng nào?
Có cần join bảng thông tin khách hàng không?
Có cần bảng mapping sản phẩm, ngành nghề, chi nhánh không?

Ví dụ:

LOAN_BALANCE_DAILY
CUSTOMER_INFO
BRANCH_INFO
Bước 3: Xác định grain của bảng nguồn

Ví dụ bảng LOAN_BALANCE_DAILY có thể có grain:

1 dòng = 1 khoản vay / 1 ngày

Nếu cần tính theo khách hàng trong tháng, cần group lại theo:

customer_id

Có thể thêm điều kiện ngày:

WHERE backup_date >= DATE '2026-05-01'
  AND backup_date <  DATE '2026-06-01'
Bước 4: Xác định phép xử lý chính

Có 5 nhóm xử lý SQL rất quan trọng:

Nhóm xử lý	Câu hỏi tư duy
SELECT	Cần lấy cột nào?
WHERE	Lọc dòng nào trước khi tính toán?
JOIN	Cần nối thêm bảng nào?
GROUP BY	Cần tổng hợp theo cấp nào?
HAVING	Lọc sau khi đã tổng hợp như thế nào?

Ví dụ:

SELECT
    customer_id,
    SUM(outstanding_amount) AS total_outstanding
FROM loan_balance_daily
WHERE backup_date >= DATE '2026-05-01'
  AND backup_date <  DATE '2026-06-01'
GROUP BY customer_id
HAVING SUM(outstanding_amount) > 1000000000;
Bước 5: Kiểm tra logic nhân bản dữ liệu

Đây là lỗi rất hay gặp khi học SQL.

Ví dụ:

SELECT
    a.customer_id,
    SUM(a.outstanding_amount)
FROM loan_balance_daily a
LEFT JOIN customer_product b
    ON a.customer_id = b.customer_id
GROUP BY a.customer_id;

Nếu bảng customer_product có nhiều dòng cho một khách hàng, dữ liệu từ bảng a có thể bị nhân bản sau khi join.

Cần kiểm tra:

SELECT
    customer_id,
    COUNT(*) AS cnt
FROM customer_product
GROUP BY customer_id
HAVING COUNT(*) > 1;

Nếu có nhiều dòng, cần xử lý trước khi join, ví dụ:

WITH product_one_row AS (
    SELECT
        customer_id,
        MAX(product_type) AS product_type
    FROM customer_product
    GROUP BY customer_id
)
SELECT
    a.customer_id,
    SUM(a.outstanding_amount) AS total_outstanding
FROM loan_balance_daily a
LEFT JOIN product_one_row b
    ON a.customer_id = b.customer_id
GROUP BY a.customer_id;
Bước 6: Kiểm tra kết quả cuối cùng

Sau khi viết SQL, cần kiểm tra:

Số dòng kết quả có hợp lý không?
Tổng tiền trước và sau join có bị lệch không?
Có null bất thường không?
Có bị duplicate không?
Điều kiện thời gian đã đúng chưa?
WHERE và HAVING có dùng đúng chỗ không?

Ví dụ kiểm tra tổng trước và sau join:

SELECT SUM(outstanding_amount)
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31';

So với:

WITH final_data AS (
    SELECT
        a.*
    FROM loan_balance_daily a
    LEFT JOIN customer_info b
        ON a.customer_id = b.customer_id
    WHERE a.backup_date = DATE '2026-05-31'
)
SELECT SUM(outstanding_amount)
FROM final_data;

Nếu tổng bị lệch, khả năng cao là join bị nhân bản dữ liệu.

5. Cách luyện tập tư duy SQL theo cấp độ
Cấp độ 1: Đọc bảng và lọc dữ liệu

Mục tiêu:

Biết dùng SELECT
Biết dùng WHERE
Biết lọc theo ngày, số, text, null

Ví dụ bài tập:

Lấy danh sách giao dịch có số tiền lớn hơn 100 triệu.

SELECT
    transaction_id,
    customer_id,
    amount,
    trans_date
FROM transactions
WHERE amount > 100000000;

Câu hỏi tư duy:

Điều kiện lọc đặt ở đâu?
Có cần lọc ngày không?
Cột amount có null không?
Cấp độ 2: Tổng hợp dữ liệu

Mục tiêu:

Biết dùng GROUP BY
Biết dùng SUM, COUNT, AVG, MAX, MIN
Phân biệt WHERE và HAVING

Ví dụ:

Tính tổng doanh số theo từng khách hàng.

SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
GROUP BY customer_id;

Nếu cần lọc khách hàng có tổng doanh số lớn hơn 500 triệu:

SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
GROUP BY customer_id
HAVING SUM(amount) > 500000000;

Cần nhớ:

WHERE lọc trước khi GROUP BY.
HAVING lọc sau khi GROUP BY.
Cấp độ 3: Join bảng

Mục tiêu:

Biết nối bảng
Hiểu INNER JOIN, LEFT JOIN
Biết kiểm tra duplicate sau join

Ví dụ:

Lấy giao dịch kèm tên khách hàng.

SELECT
    a.transaction_id,
    a.customer_id,
    b.customer_name,
    a.amount
FROM transactions a
LEFT JOIN customers b
    ON a.customer_id = b.customer_id;

Câu hỏi tư duy:

Bảng chính là bảng nào?
Có cần giữ toàn bộ giao dịch không?
Nếu khách hàng không có thông tin thì có giữ lại không?
Quan hệ giữa hai bảng là 1-1 hay 1-nhiều?
Cấp độ 4: CTE để chia nhỏ logic

Khi query dài, nên dùng WITH để chia bài toán thành nhiều bước.

Ví dụ:

Tìm khách hàng có tổng dư nợ lớn hơn 1 tỷ và thuộc phân khúc VIP.

WITH loan_by_customer AS (
    SELECT
        customer_id,
        SUM(outstanding_amount) AS total_outstanding
    FROM loan_balance_daily
    WHERE backup_date = DATE '2026-05-31'
    GROUP BY customer_id
),

vip_customer AS (
    SELECT
        customer_id,
        customer_name,
        segment
    FROM customer_info
    WHERE segment = 'VIP'
)

SELECT
    a.customer_id,
    b.customer_name,
    b.segment,
    a.total_outstanding
FROM loan_by_customer a
JOIN vip_customer b
    ON a.customer_id = b.customer_id
WHERE a.total_outstanding > 1000000000;

Tư duy đúng ở đây là:

Bước 1: Tính dư nợ theo khách hàng.
Bước 2: Lấy danh sách khách VIP.
Bước 3: Join hai kết quả lại.
Bước 4: Lọc khách hàng thỏa điều kiện.
Cấp độ 5: Window Function

Window function dùng khi cần tính toán nhưng vẫn giữ nguyên số dòng chi tiết.

Ví dụ:

Xếp hạng giao dịch lớn nhất của từng khách hàng.

SELECT
    transaction_id,
    customer_id,
    amount,
    ROW_NUMBER() OVER (
        PARTITION BY customer_id
        ORDER BY amount DESC
    ) AS rn
FROM transactions;

Lấy giao dịch lớn nhất của mỗi khách hàng:

WITH ranked_transaction AS (
    SELECT
        transaction_id,
        customer_id,
        amount,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY amount DESC
        ) AS rn
    FROM transactions
)

SELECT
    transaction_id,
    customer_id,
    amount
FROM ranked_transaction
WHERE rn = 1;

Cần nhớ:

GROUP BY làm giảm số dòng.
Window function vẫn giữ số dòng.
6. Các lỗi tư duy SQL thường gặp
Lỗi 1: Viết query khi chưa hiểu grain

Ví dụ sai:

SELECT
    customer_id,
    account_number,
    SUM(balance)
FROM loan_balance_daily
GROUP BY customer_id;

Sai vì account_number không nằm trong GROUP BY.

Đúng:

SELECT
    customer_id,
    SUM(balance) AS total_balance
FROM loan_balance_daily
GROUP BY customer_id;

Hoặc nếu cần theo từng tài khoản:

SELECT
    customer_id,
    account_number,
    SUM(balance) AS total_balance
FROM loan_balance_daily
GROUP BY
    customer_id,
    account_number;
Lỗi 2: Join trước rồi mới group, gây nhân bản dữ liệu

Sai nếu bảng join có nhiều dòng cho một key.

Cách luyện tập:

Trước khi join, luôn kiểm tra key:

SELECT
    customer_id,
    COUNT(*) AS cnt
FROM customer_info
GROUP BY customer_id
HAVING COUNT(*) > 1;
Lỗi 3: Dùng WHERE thay cho HAVING

Sai:

SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
WHERE SUM(amount) > 100000000
GROUP BY customer_id;

Đúng:

SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
GROUP BY customer_id
HAVING SUM(amount) > 100000000;
Lỗi 4: Lọc ngày không chuẩn

Không nên viết:

WHERE TO_CHAR(backup_date, 'YYYYMMDD') = '20260531'

Nên viết:

WHERE backup_date >= DATE '2026-05-31'
  AND backup_date <  DATE '2026-06-01'

Cách này tốt hơn vì dễ tận dụng index/partition hơn.

Lỗi 5: Không kiểm tra null

Ví dụ:

WHERE status <> 'CLOSED'

Điều kiện này sẽ không lấy các dòng có status IS NULL.

Nếu muốn lấy cả null:

WHERE status <> 'CLOSED'
   OR status IS NULL

Hoặc trong Oracle:

WHERE NVL(status, 'UNKNOWN') <> 'CLOSED'
7. Phương pháp luyện tập SQL hiệu quả
Phương pháp 1: Luôn viết bằng ngôn ngữ tự nhiên trước

Ví dụ đề bài:

Lấy tổng dư nợ theo khách hàng trong ngày 31/05/2026.

Viết thành các bước:

1. Lấy dữ liệu từ bảng dư nợ.
2. Lọc backup_date = 31/05/2026.
3. Nhóm theo customer_id.
4. Tính SUM(outstanding_amount).
5. Trả ra customer_id và total_outstanding.

Sau đó mới viết SQL.

Phương pháp 2: Viết query từ trong ra ngoài

Không nên viết một query rất dài ngay từ đầu.

Nên viết từng bước:

Bước 1: Xem dữ liệu gốc
SELECT *
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31'
FETCH FIRST 10 ROWS ONLY;
Bước 2: Kiểm tra số dòng
SELECT COUNT(*)
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31';
Bước 3: Tổng hợp
SELECT
    customer_id,
    SUM(outstanding_amount) AS total_outstanding
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31'
GROUP BY customer_id;
Bước 4: Thêm điều kiện lọc
SELECT
    customer_id,
    SUM(outstanding_amount) AS total_outstanding
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31'
GROUP BY customer_id
HAVING SUM(outstanding_amount) > 1000000000;
Phương pháp 3: Mỗi CTE chỉ nên có một nhiệm vụ

Ví dụ tốt:

WITH base_data AS (
    SELECT
        backup_date,
        customer_id,
        account_number,
        outstanding_amount
    FROM loan_balance_daily
    WHERE backup_date = DATE '2026-05-31'
),

agg_customer AS (
    SELECT
        customer_id,
        SUM(outstanding_amount) AS total_outstanding
    FROM base_data
    GROUP BY customer_id
),

final_data AS (
    SELECT
        customer_id,
        total_outstanding
    FROM agg_customer
    WHERE total_outstanding > 1000000000
)

SELECT *
FROM final_data;

Cách này giúp query:

Dễ đọc hơn.
Dễ debug hơn.
Dễ kiểm tra từng bước.
Dễ bàn giao cho người khác.
8. Bài tập luyện tư duy SQL
Bài tập 1: Lọc dữ liệu

Bảng transactions gồm:

transaction_id	customer_id	trans_date	amount	status

Yêu cầu:

Lấy các giao dịch thành công trong tháng 05/2026 có số tiền lớn hơn 50 triệu.

Gợi ý tư duy:

Bảng chính: transactions
Điều kiện thời gian: tháng 05/2026
Điều kiện trạng thái: SUCCESS
Điều kiện số tiền: amount > 50 triệu

SQL mẫu:

SELECT
    transaction_id,
    customer_id,
    trans_date,
    amount,
    status
FROM transactions
WHERE trans_date >= DATE '2026-05-01'
  AND trans_date <  DATE '2026-06-01'
  AND status = 'SUCCESS'
  AND amount > 50000000;
Bài tập 2: Tổng hợp dữ liệu

Yêu cầu:

Tính tổng số tiền giao dịch theo từng khách hàng trong tháng 05/2026.

SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
WHERE trans_date >= DATE '2026-05-01'
  AND trans_date <  DATE '2026-06-01'
GROUP BY customer_id;
Bài tập 3: Join dữ liệu

Bảng customers gồm:

customer_id	customer_name	segment

Yêu cầu:

Tính tổng số tiền giao dịch theo từng khách hàng, kèm tên khách hàng và phân khúc.

WITH trans_by_customer AS (
    SELECT
        customer_id,
        SUM(amount) AS total_amount
    FROM transactions
    WHERE trans_date >= DATE '2026-05-01'
      AND trans_date <  DATE '2026-06-01'
    GROUP BY customer_id
)

SELECT
    a.customer_id,
    b.customer_name,
    b.segment,
    a.total_amount
FROM trans_by_customer a
LEFT JOIN customers b
    ON a.customer_id = b.customer_id;
Bài tập 4: Top N

Yêu cầu:

Lấy top 3 khách hàng có tổng giao dịch lớn nhất trong tháng 05/2026.

WITH trans_by_customer AS (
    SELECT
        customer_id,
        SUM(amount) AS total_amount
    FROM transactions
    WHERE trans_date >= DATE '2026-05-01'
      AND trans_date <  DATE '2026-06-01'
    GROUP BY customer_id
),

ranked_customer AS (
    SELECT
        customer_id,
        total_amount,
        ROW_NUMBER() OVER (
            ORDER BY total_amount DESC
        ) AS rn
    FROM trans_by_customer
)

SELECT
    customer_id,
    total_amount
FROM ranked_customer
WHERE rn <= 3;
9. Khung tư duy chuẩn khi làm một bài SQL

Có thể hướng dẫn học viên dùng checklist này:

1. Bài toán hỏi gì?
2. Kết quả cuối cùng cần ở grain nào?
3. Dữ liệu nằm ở bảng nào?
4. Cần lọc điều kiện gì?
5. Cần join bảng nào?
6. Join key có unique không?
7. Cần group theo cột nào?
8. Cần dùng WHERE hay HAVING?
9. Có cần window function không?
10. Kết quả có cần kiểm tra duplicate, null, tổng tiền không?
10. Kết luận bài học

Muốn giỏi SQL, người học không nên chỉ học thuộc cú pháp. Cần luyện theo tư duy:

Câu hỏi nghiệp vụ
→ Xác định bảng nguồn
→ Xác định grain
→ Lọc dữ liệu
→ Join dữ liệu
→ Tổng hợp dữ liệu
→ Kiểm tra kết quả

SQL tốt không phải là SQL viết ngắn nhất, mà là SQL:

Đúng logic nghiệp vụ.
Không làm sai số liệu.
Dễ đọc.
Dễ kiểm tra.
Dễ bảo trì.
Có thể giải thích lại cho người khác hiểu.

Một câu nên nhấn mạnh với học viên:

Trước khi viết SQL, hãy hiểu dữ liệu. Sau khi viết SQL, hãy kiểm tra dữ liệu
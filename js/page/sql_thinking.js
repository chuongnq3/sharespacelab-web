/* =========================================================
   SQL THINKING DATA
   Structure:
   Phần 1: Tư duy SQL & Grain
   Phần 2: 6 bước trước khi viết query
   Phần 3: Luyện tập theo cấp độ
   Phần 4: Lỗi thường gặp & Phương pháp luyện tập
   Phần 5: Bài tập & Checklist
========================================================= */

const thinkingParts = [
  {
    id: "sql-mindset",
    title: "Phần 1",
    subtitle: "Tư duy SQL & Grain",
    sidebarTitle: "SQL Mindset",
    lessons: [
      {
        id: "sql-is-thinking",
        title: "SQL là tư duy, không chỉ là cú pháp",
        label: "Phần 1 · SQL Mindset",
        blocks: [
          {
            heading: "SQL là gì?",
            html: `
              <p>
                SQL là ngôn ngữ dùng để làm việc với dữ liệu trong cơ sở dữ liệu quan hệ.
                Nhưng khi học SQL, không nên chỉ học theo kiểu:
              </p>

              <pre><code>SELECT ...
FROM ...
WHERE ...
GROUP BY ...</code></pre>

              <p>Mà cần hiểu SQL là cách trả lời các câu hỏi như:</p>

              <div class="thinking-checklist">
                <div class="thinking-item">Dữ liệu đang nằm ở bảng nào?</div>
                <div class="thinking-item">Mỗi dòng trong bảng đại diện cho cái gì?</div>
                <div class="thinking-item">Cần lọc điều kiện nào?</div>
                <div class="thinking-item">Cần nối thêm bảng nào?</div>
                <div class="thinking-item">Cần tính toán ở cấp độ dòng hay cấp độ nhóm?</div>
                <div class="thinking-item">Kết quả cuối cùng cần có bao nhiêu dòng?</div>
                <div class="thinking-item">Có bị nhân bản dữ liệu sau khi join không?</div>
              </div>

              <div class="callout">
                Học SQL là học cách biến một câu hỏi nghiệp vụ thành một luồng xử lý dữ liệu logic.
              </div>
            `
          }
        ]
      },

      {
        id: "grain-concept",
        title: "Tư duy bắt đầu từ Grain",
        label: "Phần 1 · Grain",
        blocks: [
          {
            heading: "Grain là gì?",
            html: `
              <p>
                Grain là mức độ chi tiết của dữ liệu trong một bảng hoặc một kết quả query.
                Hiểu grain là nền tảng của mọi câu SQL đúng.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>transaction_id</th>
                    <th>customer_id</th>
                    <th>trans_date</th>
                    <th>amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>T001</td><td>C01</td><td>2026-01-01</td><td>100</td></tr>
                  <tr><td>T002</td><td>C01</td><td>2026-01-02</td><td>200</td></tr>
                  <tr><td>T003</td><td>C02</td><td>2026-01-01</td><td>300</td></tr>
                </tbody>
              </table>

              <p>Grain của bảng này là: <b>mỗi dòng là một giao dịch.</b></p>

              <p>
                Nếu bài toán yêu cầu <em>tổng số tiền giao dịch theo từng khách hàng</em>,
                cần đổi grain từ <b>1 dòng = 1 giao dịch</b> thành <b>1 dòng = 1 khách hàng</b>:
              </p>

              <pre><code>SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
GROUP BY customer_id;</code></pre>

              <div class="grain-shift">
                <div class="grain-box">
                  <div class="grain-label">Grain gốc</div>
                  <div class="grain-value">1 dòng = 1 giao dịch</div>
                </div>
                <div class="grain-arrow">→</div>
                <div class="grain-box grain-box--target">
                  <div class="grain-label">Grain cần</div>
                  <div class="grain-value">1 dòng = 1 khách hàng</div>
                </div>
              </div>

              <div class="callout">
                Trước khi viết SQL, luôn xác định: grain hiện tại của bảng nguồn là gì,
                và grain của kết quả cần là gì?
              </div>
            `
          }
        ]
      }
    ]
  },

  {
    id: "query-process",
    title: "Phần 2",
    subtitle: "6 bước trước khi viết query",
    sidebarTitle: "Query Process",
    lessons: [
      {
        id: "step-business",
        title: "Bước 1–2: Hiểu bài toán & Bảng nguồn",
        label: "Phần 2 · Query Process",
        blocks: [
          {
            heading: "Bước 1: Hiểu câu hỏi nghiệp vụ",
            html: `
              <p>
                Khi gặp một bài toán SQL, không nên viết ngay.
                Hãy tách câu hỏi thành các thành phần:
              </p>

              <div class="callout">
                Ví dụ câu hỏi: <b>Lấy danh sách khách hàng có tổng dư nợ lớn hơn 1 tỷ trong tháng 05/2026.</b>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Thành phần</th>
                    <th>Ý nghĩa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Đối tượng chính</b></td>
                    <td>Khách hàng</td>
                  </tr>
                  <tr>
                    <td><b>Chỉ tiêu cần tính</b></td>
                    <td>Tổng dư nợ</td>
                  </tr>
                  <tr>
                    <td><b>Điều kiện thời gian</b></td>
                    <td>Tháng 05/2026</td>
                  </tr>
                  <tr>
                    <td><b>Điều kiện lọc sau tính</b></td>
                    <td>Tổng dư nợ > 1 tỷ</td>
                  </tr>
                  <tr>
                    <td><b>Kết quả mong muốn</b></td>
                    <td>Danh sách khách hàng</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Bước 2: Xác định bảng nguồn",
            html: `
              <p>Cần tự hỏi:</p>

              <ul>
                <li>Dữ liệu khách hàng nằm ở bảng nào?</li>
                <li>Dữ liệu dư nợ nằm ở bảng nào?</li>
                <li>Có cần join bảng thông tin khách hàng không?</li>
                <li>Có cần bảng mapping sản phẩm, ngành nghề, chi nhánh không?</li>
              </ul>

              <div class="step-flow">
                <div class="step-box">
                  <div class="step-num">1</div>
                  <div class="step-text">LOAN_BALANCE_DAILY</div>
                </div>
                <div class="step-box">
                  <div class="step-num">2</div>
                  <div class="step-text">CUSTOMER_INFO</div>
                </div>
                <div class="step-box">
                  <div class="step-num">3</div>
                  <div class="step-text">BRANCH_INFO</div>
                </div>
              </div>

              <div class="warning">
                Không phải cứ JOIN được là nên JOIN. Phải hiểu ý nghĩa business và grain của từng bảng.
              </div>
            `
          }
        ]
      },

      {
        id: "step-grain-ops",
        title: "Bước 3–4: Grain & Phép xử lý",
        label: "Phần 2 · Query Process",
        blocks: [
          {
            heading: "Bước 3: Xác định grain của bảng nguồn",
            html: `
              <p>
                Ví dụ bảng <code>LOAN_BALANCE_DAILY</code> có grain là:
                <b>1 dòng = 1 khoản vay / 1 ngày.</b>
              </p>

              <p>Nếu cần tính theo khách hàng trong tháng, cần GROUP lại theo <code>customer_id</code>
              và thêm điều kiện lọc ngày:</p>

              <pre><code>WHERE backup_date >= DATE '2026-05-01'
  AND backup_date <  DATE '2026-06-01'</code></pre>
            `
          },
          {
            heading: "Bước 4: Xác định phép xử lý chính",
            html: `
              <p>Có 5 nhóm xử lý SQL rất quan trọng:</p>

              <table>
                <thead>
                  <tr>
                    <th>Nhóm xử lý</th>
                    <th>Câu hỏi tư duy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>SELECT</b></td>
                    <td>Cần lấy cột nào?</td>
                  </tr>
                  <tr>
                    <td><b>WHERE</b></td>
                    <td>Lọc dòng nào trước khi tính toán?</td>
                  </tr>
                  <tr>
                    <td><b>JOIN</b></td>
                    <td>Cần nối thêm bảng nào?</td>
                  </tr>
                  <tr>
                    <td><b>GROUP BY</b></td>
                    <td>Cần tổng hợp theo cấp nào?</td>
                  </tr>
                  <tr>
                    <td><b>HAVING</b></td>
                    <td>Lọc sau khi đã tổng hợp như thế nào?</td>
                  </tr>
                </tbody>
              </table>

              <pre><code>SELECT
    customer_id,
    SUM(outstanding_amount) AS total_outstanding
FROM loan_balance_daily
WHERE backup_date >= DATE '2026-05-01'
  AND backup_date <  DATE '2026-06-01'
GROUP BY customer_id
HAVING SUM(outstanding_amount) > 1000000000;</code></pre>
            `
          }
        ]
      },

      {
        id: "step-validate",
        title: "Bước 5–6: Kiểm tra logic & Kết quả",
        label: "Phần 2 · Query Process",
        blocks: [
          {
            heading: "Bước 5: Kiểm tra logic nhân bản dữ liệu",
            html: `
              <p>Đây là lỗi rất hay gặp khi học SQL.</p>

              <pre><code>SELECT
    a.customer_id,
    SUM(a.outstanding_amount)
FROM loan_balance_daily a
LEFT JOIN customer_product b
    ON a.customer_id = b.customer_id
GROUP BY a.customer_id;</code></pre>

              <div class="warning">
                Nếu bảng <code>customer_product</code> có nhiều dòng cho một khách hàng,
                dữ liệu từ bảng a có thể bị nhân bản sau khi join.
              </div>

              <p>Kiểm tra key trước khi join:</p>

              <pre><code>SELECT
    customer_id,
    COUNT(*) AS cnt
FROM customer_product
GROUP BY customer_id
HAVING COUNT(*) > 1;</code></pre>

              <p>Nếu có nhiều dòng, xử lý trước khi join:</p>

              <pre><code>WITH product_one_row AS (
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
GROUP BY a.customer_id;</code></pre>
            `
          },
          {
            heading: "Bước 6: Kiểm tra kết quả cuối cùng",
            html: `
              <p>Sau khi viết SQL, cần kiểm tra:</p>

              <div class="thinking-checklist">
                <div class="thinking-item">Số dòng kết quả có hợp lý không?</div>
                <div class="thinking-item">Tổng tiền trước và sau join có bị lệch không?</div>
                <div class="thinking-item">Có null bất thường không?</div>
                <div class="thinking-item">Có bị duplicate không?</div>
                <div class="thinking-item">Điều kiện thời gian đã đúng chưa?</div>
                <div class="thinking-item">WHERE và HAVING có dùng đúng chỗ không?</div>
              </div>

              <p>Ví dụ kiểm tra tổng trước và sau join:</p>

              <pre><code>-- Kiểm tra trước join
SELECT SUM(outstanding_amount)
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31';

-- Kiểm tra sau join
WITH final_data AS (
    SELECT a.*
    FROM loan_balance_daily a
    LEFT JOIN customer_info b
        ON a.customer_id = b.customer_id
    WHERE a.backup_date = DATE '2026-05-31'
)
SELECT SUM(outstanding_amount)
FROM final_data;</code></pre>

              <div class="callout">
                Nếu tổng bị lệch, khả năng cao là join bị nhân bản dữ liệu.
              </div>
            `
          }
        ]
      }
    ]
  },

  {
    id: "practice-levels",
    title: "Phần 3",
    subtitle: "Luyện tập theo cấp độ",
    sidebarTitle: "Practice Levels",
    lessons: [
      {
        id: "level-1-2",
        title: "Cấp độ 1–2: Lọc & Tổng hợp",
        label: "Phần 3 · Practice Levels",
        blocks: [
          {
            heading: "Cấp độ 1: Đọc bảng và lọc dữ liệu",
            html: `
              <p>Mục tiêu: biết dùng SELECT, WHERE, lọc theo ngày/số/text/null.</p>

              <div class="level-badge">Level 1</div>

              <p><b>Bài tập:</b> Lấy danh sách giao dịch có số tiền lớn hơn 100 triệu.</p>

              <pre><code>SELECT
    transaction_id,
    customer_id,
    amount,
    trans_date
FROM transactions
WHERE amount > 100000000;</code></pre>

              <div class="thinking-checklist">
                <div class="thinking-item">Điều kiện lọc đặt ở đâu?</div>
                <div class="thinking-item">Có cần lọc ngày không?</div>
                <div class="thinking-item">Cột amount có null không?</div>
              </div>
            `
          },
          {
            heading: "Cấp độ 2: Tổng hợp dữ liệu",
            html: `
              <p>Mục tiêu: biết dùng GROUP BY, SUM/COUNT/AVG/MAX/MIN, phân biệt WHERE và HAVING.</p>

              <div class="level-badge">Level 2</div>

              <p><b>Bài tập:</b> Tính tổng doanh số theo từng khách hàng. Lấy những khách hàng có tổng > 500 triệu.</p>

              <pre><code>SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
GROUP BY customer_id
HAVING SUM(amount) > 500000000;</code></pre>

              <div class="warning">
                WHERE lọc trước khi GROUP BY. HAVING lọc sau khi GROUP BY.
                Đây là sự khác biệt quan trọng nhất ở cấp độ này.
              </div>
            `
          }
        ]
      },

      {
        id: "level-3-4",
        title: "Cấp độ 3–4: Join & CTE",
        label: "Phần 3 · Practice Levels",
        blocks: [
          {
            heading: "Cấp độ 3: Join bảng",
            html: `
              <p>Mục tiêu: biết nối bảng, hiểu INNER JOIN và LEFT JOIN, kiểm tra duplicate sau join.</p>

              <div class="level-badge">Level 3</div>

              <p><b>Bài tập:</b> Lấy giao dịch kèm tên khách hàng.</p>

              <pre><code>SELECT
    a.transaction_id,
    a.customer_id,
    b.customer_name,
    a.amount
FROM transactions a
LEFT JOIN customers b
    ON a.customer_id = b.customer_id;</code></pre>

              <div class="thinking-checklist">
                <div class="thinking-item">Bảng chính là bảng nào?</div>
                <div class="thinking-item">Có cần giữ toàn bộ giao dịch không?</div>
                <div class="thinking-item">Quan hệ giữa hai bảng là 1-1 hay 1-nhiều?</div>
              </div>
            `
          },
          {
            heading: "Cấp độ 4: CTE để chia nhỏ logic",
            html: `
              <p>Khi query dài, nên dùng WITH để chia bài toán thành nhiều bước.</p>

              <div class="level-badge">Level 4</div>

              <p><b>Bài tập:</b> Tìm khách hàng có tổng dư nợ > 1 tỷ và thuộc phân khúc VIP.</p>

              <pre><code>WITH loan_by_customer AS (
    SELECT
        customer_id,
        SUM(outstanding_amount) AS total_outstanding
    FROM loan_balance_daily
    WHERE backup_date = DATE '2026-05-31'
    GROUP BY customer_id
),

vip_customer AS (
    SELECT customer_id, customer_name, segment
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
WHERE a.total_outstanding > 1000000000;</code></pre>

              <div class="step-flow">
                <div class="step-box"><div class="step-num">1</div><div class="step-text">Tính dư nợ theo KH</div></div>
                <div class="step-box"><div class="step-num">2</div><div class="step-text">Lấy DS KH VIP</div></div>
                <div class="step-box"><div class="step-num">3</div><div class="step-text">Join 2 kết quả</div></div>
                <div class="step-box"><div class="step-num">4</div><div class="step-text">Lọc thỏa điều kiện</div></div>
              </div>
            `
          }
        ]
      },

      {
        id: "level-5",
        title: "Cấp độ 5: Window Function",
        label: "Phần 3 · Practice Levels",
        blocks: [
          {
            heading: "Window Function là gì?",
            html: `
              <p>
                Window function dùng khi cần tính toán nhưng vẫn giữ nguyên số dòng chi tiết.
                Đây là sự khác biệt quan trọng so với GROUP BY.
              </p>

              <div class="level-badge">Level 5</div>

              <table>
                <thead>
                  <tr>
                    <th>Cách xử lý</th>
                    <th>Ảnh hưởng số dòng</th>
                    <th>Dùng khi nào</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>GROUP BY</b></td>
                    <td>Giảm số dòng xuống còn grain mới.</td>
                    <td>Cần kết quả đã tổng hợp.</td>
                  </tr>
                  <tr>
                    <td><b>Window Function</b></td>
                    <td>Giữ nguyên số dòng.</td>
                    <td>Cần tính toán nhưng vẫn giữ chi tiết.</td>
                  </tr>
                </tbody>
              </table>

              <p><b>Xếp hạng giao dịch lớn nhất của từng khách hàng:</b></p>

              <pre><code>WITH ranked_transaction AS (
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
WHERE rn = 1;</code></pre>
            `
          }
        ]
      }
    ]
  },

  {
    id: "common-errors",
    title: "Phần 4",
    subtitle: "Lỗi thường gặp & Phương pháp luyện tập",
    sidebarTitle: "Errors & Method",
    lessons: [
      {
        id: "error-patterns",
        title: "Lỗi tư duy SQL thường gặp",
        label: "Phần 4 · Common Errors",
        blocks: [
          {
            heading: "Lỗi 1: Viết query khi chưa hiểu grain",
            html: `
              <div class="error-block">
                <div class="error-label">SAI</div>
                <pre><code>SELECT
    customer_id,
    account_number,
    SUM(balance)
FROM loan_balance_daily
GROUP BY customer_id;</code></pre>
              </div>

              <p>Sai vì <code>account_number</code> không nằm trong GROUP BY.</p>

              <div class="correct-block">
                <div class="correct-label">ĐÚNG</div>
                <pre><code>-- Nếu cần theo từng tài khoản
SELECT
    customer_id,
    account_number,
    SUM(balance) AS total_balance
FROM loan_balance_daily
GROUP BY
    customer_id,
    account_number;</code></pre>
              </div>
            `
          },
          {
            heading: "Lỗi 2: WHERE thay cho HAVING",
            html: `
              <div class="error-block">
                <div class="error-label">SAI</div>
                <pre><code>SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
WHERE SUM(amount) > 100000000
GROUP BY customer_id;</code></pre>
              </div>

              <div class="correct-block">
                <div class="correct-label">ĐÚNG</div>
                <pre><code>SELECT
    customer_id,
    SUM(amount) AS total_amount
FROM transactions
GROUP BY customer_id
HAVING SUM(amount) > 100000000;</code></pre>
              </div>
            `
          },
          {
            heading: "Lỗi 3: Lọc ngày không chuẩn",
            html: `
              <div class="error-block">
                <div class="error-label">TRÁNH</div>
                <pre><code>WHERE TO_CHAR(backup_date, 'YYYYMMDD') = '20260531'</code></pre>
              </div>

              <div class="correct-block">
                <div class="correct-label">NÊN DÙNG</div>
                <pre><code>WHERE backup_date >= DATE '2026-05-31'
  AND backup_date <  DATE '2026-06-01'</code></pre>
              </div>

              <div class="callout">
                Cách này tốt hơn vì dễ tận dụng index/partition hơn.
              </div>
            `
          },
          {
            heading: "Lỗi 4: Không kiểm tra null",
            html: `
              <div class="error-block">
                <div class="error-label">DỄ BỊ THIẾU</div>
                <pre><code>WHERE status <> 'CLOSED'</code></pre>
              </div>

              <p>Điều kiện này sẽ KHÔNG lấy các dòng có status IS NULL.</p>

              <div class="correct-block">
                <div class="correct-label">ĐÚNG</div>
                <pre><code>WHERE status <> 'CLOSED'
   OR status IS NULL

-- Hoặc trong Oracle
WHERE NVL(status, 'UNKNOWN') <> 'CLOSED'</code></pre>
              </div>
            `
          }
        ]
      },

      {
        id: "practice-method",
        title: "Phương pháp luyện tập SQL hiệu quả",
        label: "Phần 4 · Method",
        blocks: [
          {
            heading: "Phương pháp 1: Viết bằng ngôn ngữ tự nhiên trước",
            html: `
              <p>Ví dụ đề bài: <em>Lấy tổng dư nợ theo khách hàng trong ngày 31/05/2026.</em></p>

              <div class="method-steps">
                <div class="method-step">
                  <span class="method-num">1</span>
                  Lấy dữ liệu từ bảng dư nợ.
                </div>
                <div class="method-step">
                  <span class="method-num">2</span>
                  Lọc backup_date = 31/05/2026.
                </div>
                <div class="method-step">
                  <span class="method-num">3</span>
                  Nhóm theo customer_id.
                </div>
                <div class="method-step">
                  <span class="method-num">4</span>
                  Tính SUM(outstanding_amount).
                </div>
                <div class="method-step">
                  <span class="method-num">5</span>
                  Trả ra customer_id và total_outstanding.
                </div>
              </div>

              <div class="callout">
                Sau khi viết xong bằng ngôn ngữ tự nhiên, mới chuyển sang SQL.
              </div>
            `
          },
          {
            heading: "Phương pháp 2: Viết query từ trong ra ngoài",
            html: `
              <p>Không nên viết một query rất dài ngay từ đầu. Nên viết từng bước:</p>

              <pre><code>-- Bước 1: Xem dữ liệu gốc
SELECT *
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31'
FETCH FIRST 10 ROWS ONLY;

-- Bước 2: Kiểm tra số dòng
SELECT COUNT(*)
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31';

-- Bước 3: Tổng hợp
SELECT
    customer_id,
    SUM(outstanding_amount) AS total_outstanding
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31'
GROUP BY customer_id;

-- Bước 4: Thêm điều kiện lọc
SELECT
    customer_id,
    SUM(outstanding_amount) AS total_outstanding
FROM loan_balance_daily
WHERE backup_date = DATE '2026-05-31'
GROUP BY customer_id
HAVING SUM(outstanding_amount) > 1000000000;</code></pre>
            `
          },
          {
            heading: "Phương pháp 3: Mỗi CTE chỉ nên có một nhiệm vụ",
            html: `
              <pre><code>WITH base_data AS (
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
    SELECT customer_id, total_outstanding
    FROM agg_customer
    WHERE total_outstanding > 1000000000
)

SELECT * FROM final_data;</code></pre>

              <div class="method-steps">
                <div class="method-step"><span class="method-num">✓</span>Dễ đọc hơn.</div>
                <div class="method-step"><span class="method-num">✓</span>Dễ debug hơn.</div>
                <div class="method-step"><span class="method-num">✓</span>Dễ kiểm tra từng bước.</div>
                <div class="method-step"><span class="method-num">✓</span>Dễ bàn giao cho người khác.</div>
              </div>
            `
          }
        ]
      }
    ]
  }
//   ,

//   {
//     id: "exercises",
//     title: "Phần 5",
//     subtitle: "Bài tập & Checklist",
//     sidebarTitle: "Exercises",
//     lessons: [
//       {
//         id: "exercises-basic",
//         title: "Bài tập 1–3",
//         label: "Phần 5 · Exercises",
//         blocks: [
//           {
//             heading: "Bài tập 1: Lọc dữ liệu",
//             html: `
//               <p>
//                 Bảng <code>transactions</code> gồm: transaction_id, customer_id, trans_date, amount, status.
//               </p>

//               <div class="exercise-task">
//                 Lấy các giao dịch thành công trong tháng 05/2026 có số tiền lớn hơn 50 triệu.
//               </div>

//               <pre><code>SELECT
//     transaction_id,
//     customer_id,
//     trans_date,
//     amount,
//     status
// FROM transactions
// WHERE trans_date >= DATE '2026-05-01'
//   AND trans_date <  DATE '2026-06-01'
//   AND status = 'SUCCESS'
//   AND amount > 50000000;</code></pre>
//             `
//           },
//           {
//             heading: "Bài tập 2: Tổng hợp dữ liệu",
//             html: `
//               <div class="exercise-task">
//                 Tính tổng số tiền giao dịch theo từng khách hàng trong tháng 05/2026.
//               </div>

//               <pre><code>SELECT
//     customer_id,
//     SUM(amount) AS total_amount
// FROM transactions
// WHERE trans_date >= DATE '2026-05-01'
//   AND trans_date <  DATE '2026-06-01'
// GROUP BY customer_id;</code></pre>
//             `
//           },
//           {
//             heading: "Bài tập 3: Join dữ liệu",
//             html: `
//               <p>
//                 Bảng <code>customers</code> gồm: customer_id, customer_name, segment.
//               </p>

//               <div class="exercise-task">
//                 Tính tổng số tiền giao dịch theo từng khách hàng, kèm tên khách hàng và phân khúc.
//               </div>

//               <pre><code>WITH trans_by_customer AS (
//     SELECT
//         customer_id,
//         SUM(amount) AS total_amount
//     FROM transactions
//     WHERE trans_date >= DATE '2026-05-01'
//       AND trans_date <  DATE '2026-06-01'
//     GROUP BY customer_id
// )

// SELECT
//     a.customer_id,
//     b.customer_name,
//     b.segment,
//     a.total_amount
// FROM trans_by_customer a
// LEFT JOIN customers b
//     ON a.customer_id = b.customer_id;</code></pre>
//             `
//           }
//         ]
//       },

//       {
//         id: "exercise-topn-checklist",
//         title: "Bài tập 4 & Checklist",
//         label: "Phần 5 · Exercises",
//         blocks: [
//           {
//             heading: "Bài tập 4: Top N",
//             html: `
//               <div class="exercise-task">
//                 Lấy top 3 khách hàng có tổng giao dịch lớn nhất trong tháng 05/2026.
//               </div>

//               <pre><code>WITH trans_by_customer AS (
//     SELECT
//         customer_id,
//         SUM(amount) AS total_amount
//     FROM transactions
//     WHERE trans_date >= DATE '2026-05-01'
//       AND trans_date <  DATE '2026-06-01'
//     GROUP BY customer_id
// ),

// ranked_customer AS (
//     SELECT
//         customer_id,
//         total_amount,
//         ROW_NUMBER() OVER (
//             ORDER BY total_amount DESC
//         ) AS rn
//     FROM trans_by_customer
// )

// SELECT
//     customer_id,
//     total_amount
// FROM ranked_customer
// WHERE rn <= 3;</code></pre>
//             `
//           },
//           {
//             heading: "Khung tư duy chuẩn khi làm một bài SQL",
//             html: `
//               <p>Dùng checklist này mỗi khi bắt đầu một bài toán SQL:</p>

//               <div class="thinking-checklist">
//                 <div class="thinking-item"><b>1.</b> Bài toán hỏi gì?</div>
//                 <div class="thinking-item"><b>2.</b> Kết quả cuối cùng cần ở grain nào?</div>
//                 <div class="thinking-item"><b>3.</b> Dữ liệu nằm ở bảng nào?</div>
//                 <div class="thinking-item"><b>4.</b> Cần lọc điều kiện gì?</div>
//                 <div class="thinking-item"><b>5.</b> Cần join bảng nào?</div>
//                 <div class="thinking-item"><b>6.</b> Join key có unique không?</div>
//                 <div class="thinking-item"><b>7.</b> Cần group theo cột nào?</div>
//                 <div class="thinking-item"><b>8.</b> Cần dùng WHERE hay HAVING?</div>
//                 <div class="thinking-item"><b>9.</b> Có cần window function không?</div>
//                 <div class="thinking-item"><b>10.</b> Kết quả có cần kiểm tra duplicate, null, tổng tiền không?</div>
//               </div>

//               <div class="callout">
//                 SQL tốt không phải là SQL viết ngắn nhất, mà là SQL đúng logic nghiệp vụ,
//                 không làm sai số liệu, dễ đọc, dễ kiểm tra và dễ bảo trì.
//               </div>
//             `
//           }
//         ]
//       }
//     ]
//   }
];


/* =========================================================
   STATE
========================================================= */

let currentPartIndex = 0;
let currentLessonIndex = 0;
let currentSearchKeyword = "";
let isInitialized = false;

let sidebarTitle = null;
let sidebarList = null;
let lessonLabel = null;
let lessonTitle = null;
let lessonContent = null;
let prevBtn = null;
let nextBtn = null;


/* =========================================================
   INIT
========================================================= */

window.addEventListener("common-loaded", initSqlThinking);

window.addEventListener("global-search", event => {
  currentSearchKeyword = event.detail?.keyword || "";
  applySearch(currentSearchKeyword);
});

function initSqlThinking(event) {
  if (isInitialized) return;

  currentPartIndex = normalizePartIndex(
    event?.detail?.currentPartIndex,
    thinkingParts.length
  );

  currentLessonIndex = getCurrentLessonIndex(currentPartIndex);

  sidebarTitle  = document.getElementById("sidebarTitle");
  sidebarList   = document.getElementById("sidebarList");
  lessonLabel   = document.getElementById("lessonLabel");
  lessonTitle   = document.getElementById("lessonTitle");
  lessonContent = document.getElementById("lessonContent");
  prevBtn       = document.getElementById("prevBtn");
  nextBtn       = document.getElementById("nextBtn");

  const required = [sidebarTitle, sidebarList, lessonLabel, lessonTitle, lessonContent, prevBtn, nextBtn];

  if (required.some(el => !el)) {
    console.error("SQL Thinking init failed: missing required DOM elements.");
    return;
  }

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  isInitialized = true;

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
}


/* =========================================================
   RENDER
========================================================= */

function renderSidebar() {
  const part = thinkingParts[currentPartIndex];

  sidebarTitle.textContent = part.sidebarTitle;

  sidebarList.innerHTML = `
    <div class="sidebar-section-label">${part.title}</div>
    ${part.lessons.map((lesson, index) => `
      <a class="sidebar-link ${index === currentLessonIndex ? "active" : ""}" data-lesson-index="${index}">
        ${lesson.title}
      </a>
    `).join("")}
  `;

  sidebarList.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", () => {
      currentLessonIndex = Number(link.dataset.lessonIndex);
      renderAll();
      scrollContentTop();
    });
  });
}

function renderLesson() {
  const part   = thinkingParts[currentPartIndex];
  const lesson = part.lessons[currentLessonIndex];

  lessonLabel.textContent = lesson.label;
  lessonTitle.textContent = lesson.title;

  lessonContent.innerHTML = lesson.blocks.map(block => `
    <section class="lesson-block">
      <h2>${block.heading}</h2>
      ${block.html}
    </section>
  `).join("");

  prevBtn.disabled = currentPartIndex === 0 && currentLessonIndex === 0;

  nextBtn.disabled =
    currentPartIndex === thinkingParts.length - 1 &&
    currentLessonIndex === part.lessons.length - 1;
}

function renderAll() {
  renderSidebar();
  renderLesson();
  applySearch(currentSearchKeyword);
}


/* =========================================================
   NAVIGATION
========================================================= */

function goPrev() {
  if (currentLessonIndex > 0) {
    currentLessonIndex--;
  } else if (currentPartIndex > 0) {
    currentPartIndex--;
    currentLessonIndex = thinkingParts[currentPartIndex].lessons.length - 1;
  }

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
  scrollContentTop();
}

function goNext() {
  const part = thinkingParts[currentPartIndex];

  if (currentLessonIndex < part.lessons.length - 1) {
    currentLessonIndex++;
  } else if (currentPartIndex < thinkingParts.length - 1) {
    currentPartIndex++;
    currentLessonIndex = 0;
  }

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
  scrollContentTop();
}


/* =========================================================
   SEARCH
========================================================= */

function applySearch(keyword) {
  const normalized = String(keyword || "").trim().toLowerCase();

  document.querySelectorAll(".lesson-block").forEach(block => {
    const raw = block.textContent.toLowerCase();

    block.style.display =
      !normalized || raw.includes(normalized) ? "" : "none";
  });

  updateSearchEmptyState(normalized);
}

function updateSearchEmptyState(normalizedKeyword) {
  const old = lessonContent.querySelector(".search-empty-state");

  if (old) old.remove();

  if (!normalizedKeyword) return;

  const visible = Array.from(
    lessonContent.querySelectorAll(".lesson-block")
  ).filter(b => b.style.display !== "none");

  if (visible.length > 0) return;

  lessonContent.insertAdjacentHTML(
    "beforeend",
    `<div class="search-empty-state">Không tìm thấy nội dung phù hợp trong lesson hiện tại.</div>`
  );
}


/* =========================================================
   URL / STATE UTILITIES
========================================================= */

function getCurrentLessonIndex(partIndex) {
  const params    = new URLSearchParams(window.location.search);
  const rawLesson = params.get("lesson");

  if (rawLesson === null) return 0;

  const byIndex = Number(rawLesson);

  if (Number.isInteger(byIndex)) {
    return normalizeLessonIndex(partIndex, byIndex);
  }

  const part  = thinkingParts[partIndex];
  const found = part.lessons.findIndex(l => l.id === rawLesson);

  return found < 0 ? 0 : found;
}

function normalizePartIndex(value, total) {
  const idx = Number(value);

  if (!Number.isInteger(idx) || idx < 0 || idx >= total) return 0;

  return idx;
}

function normalizeLessonIndex(partIndex, lessonIndex) {
  const part = thinkingParts[partIndex];

  if (!part) return 0;

  const idx = Number(lessonIndex);

  if (!Number.isInteger(idx) || idx < 0 || idx >= part.lessons.length) return 0;

  return idx;
}

function syncUrlState(partIndex, lessonIndex) {
  const part   = thinkingParts[partIndex];
  const lesson = part?.lessons?.[lessonIndex];

  if (!part || !lesson) return;

  const url = new URL(window.location.href);

  url.searchParams.set("part",   String(partIndex));
  url.searchParams.set("lesson", lesson.id);

  window.history.replaceState({}, "", url.toString());
  window.dispatchEvent(new CustomEvent("part-changed"));
}

function scrollContentTop() {
  document.querySelector(".content-body")?.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector(".content")?.scrollTo({ top: 0, behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
}  
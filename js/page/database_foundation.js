/* =========================================================
   DATABASE FOUNDATION DATA
   Structure:
   Phần 1: Data Ecosystem
   Phần 2: Data Structure
   Phần 3: Data Validation & Thinking
========================================================= */

const foundationParts = [
  {
    id: "data-ecosystem",
    title: "Phần 1",
    subtitle: "Database & SQL Foundation",
    sidebarTitle: "Data Ecosystem",
    lessons: [
      {
        id: "database-overview",
        title: "Database là gì?",
        label: "Phần 1 · Data Ecosystem",
        blocks: [
          {
            heading: "Database là gì?",
            html: `
              <p>
                Database là nơi lưu trữ dữ liệu có tổ chức, giúp hệ thống có thể ghi nhận,
                tra cứu, cập nhật, kiểm soát và phân tích dữ liệu một cách nhất quán.
              </p>

              <div class="callout">
                Nói đơn giản: database là nơi dữ liệu được lưu có cấu trúc để nhiều người,
                nhiều hệ thống và nhiều báo cáo có thể cùng sử dụng.
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Khía cạnh</th>
                    <th>Ý nghĩa</th>
                    <th>Ví dụ thực tế</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Lưu trữ</b></td>
                    <td>Lưu dữ liệu lâu dài, có tổ chức.</td>
                    <td>Thông tin khách hàng, tài khoản, giao dịch.</td>
                  </tr>
                  <tr>
                    <td><b>Truy vấn</b></td>
                    <td>Cho phép lấy dữ liệu theo điều kiện.</td>
                    <td>Lấy danh sách khách hàng có dư nợ lớn hơn 1 tỷ.</td>
                  </tr>
                  <tr>
                    <td><b>Quản trị</b></td>
                    <td>Kiểm soát quyền, bảo mật, backup, log.</td>
                    <td>User chỉ được xem dữ liệu thuộc phòng ban của mình.</td>
                  </tr>
                  <tr>
                    <td><b>Phân tích</b></td>
                    <td>Làm nguồn cho báo cáo, dashboard, mô hình.</td>
                    <td>Báo cáo MIS, risk dashboard, mô hình dự báo.</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Database khác Excel như thế nào?",
            html: `
              <p>
                Excel phù hợp với dữ liệu nhỏ, thao tác thủ công và phân tích cá nhân.
                Database phù hợp với dữ liệu lớn hơn, nhiều người dùng hơn và cần kiểm soát chặt chẽ hơn.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    <th>Excel</th>
                    <th>Database</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Dung lượng</b></td>
                    <td>Phù hợp dữ liệu nhỏ đến vừa.</td>
                    <td>Phù hợp dữ liệu lớn, nhiều bảng, nhiều năm.</td>
                  </tr>
                  <tr>
                    <td><b>Nhiều người dùng</b></td>
                    <td>Dễ xung đột file.</td>
                    <td>Hỗ trợ nhiều user cùng truy cập.</td>
                  </tr>
                  <tr>
                    <td><b>Kiểm soát logic</b></td>
                    <td>Dễ sửa tay, khó audit.</td>
                    <td>Có constraint, permission, log, version.</td>
                  </tr>
                  <tr>
                    <td><b>Truy vết</b></td>
                    <td>Khó biết ai sửa gì, sửa lúc nào.</td>
                    <td>Có thể audit theo user, thời gian, job, run.</td>
                  </tr>
                </tbody>
              </table>

              <div class="warning">
                Với dữ liệu nghiệp vụ quan trọng, Excel thường nên là công cụ phân tích/nhập liệu phụ trợ,
                không nên là nguồn dữ liệu chuẩn cuối cùng.
              </div>
            `
          }
        ]
      },

      {
        id: "dbms-overview",
        title: "DBMS là gì?",
        label: "Phần 1 · DBMS",
        blocks: [
          {
            heading: "DBMS là phần mềm quản lý database",
            html: `
              <p>
                DBMS là viết tắt của <b>Database Management System</b>.
                Đây là phần mềm giúp tạo, lưu trữ, truy vấn, bảo mật và vận hành database.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>DBMS</th>
                    <th>Đặc điểm thường gặp</th>
                    <th>Ngữ cảnh sử dụng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Oracle</b></td>
                    <td>Mạnh về enterprise, transaction, procedure, phân quyền.</td>
                    <td>Banking, finance, ERP, core system.</td>
                  </tr>
                  <tr>
                    <td><b>DB2</b></td>
                    <td>Phổ biến trong hệ thống lớn, legacy enterprise.</td>
                    <td>Core banking, mainframe, hệ thống lâu năm.</td>
                  </tr>
                  <tr>
                    <td><b>PostgreSQL</b></td>
                    <td>Mã nguồn mở, mạnh, hiện đại, mở rộng tốt.</td>
                    <td>Data platform, web application, analytics.</td>
                  </tr>
                  <tr>
                    <td><b>SQL Server</b></td>
                    <td>Tích hợp tốt với hệ sinh thái Microsoft.</td>
                    <td>BI, dashboard, ứng dụng nội bộ doanh nghiệp.</td>
                  </tr>
                  <tr>
                    <td><b>MySQL</b></td>
                    <td>Nhẹ, phổ biến cho web app.</td>
                    <td>Website, ứng dụng vừa và nhỏ.</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "DBMS làm gì phía sau một câu SQL?",
            html: `
              <p>
                Khi người dùng viết một câu SQL, DBMS không chỉ đơn giản là đọc dữ liệu.
                Nó còn phải phân tích câu lệnh, chọn execution plan, kiểm tra quyền,
                đọc dữ liệu từ storage, xử lý join/filter/group và trả kết quả.
              </p>

              <div class="db-hierarchy">
                <span>SQL</span>
                <span>Parser</span>
                <span>Optimizer</span>
                <span>Execution</span>
                <span>Result</span>
              </div>

              <div class="callout">
                Người học SQL tốt không chỉ biết viết câu lệnh, mà còn hiểu database đang xử lý dữ liệu như thế nào.
              </div>
            `
          }
        ]
      },

      {
        id: "sql-position",
        title: "SQL đứng ở đâu trong hệ thống?",
        label: "Phần 1 · SQL Position",
        blocks: [
          {
            heading: "SQL là ngôn ngữ giao tiếp với database",
            html: `
              <p>
                SQL không phải là database. SQL là ngôn ngữ dùng để yêu cầu database thực hiện một việc nào đó:
                lấy dữ liệu, thêm dữ liệu, cập nhật dữ liệu, xóa dữ liệu hoặc tổng hợp dữ liệu.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Nhóm lệnh</th>
                    <th>Ý nghĩa</th>
                    <th>Ví dụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>SELECT</b></td>
                    <td>Truy vấn dữ liệu.</td>
                    <td>Lấy danh sách khách hàng.</td>
                  </tr>
                  <tr>
                    <td><b>INSERT</b></td>
                    <td>Thêm dữ liệu mới.</td>
                    <td>Thêm một bản ghi vào bảng log.</td>
                  </tr>
                  <tr>
                    <td><b>UPDATE</b></td>
                    <td>Cập nhật dữ liệu.</td>
                    <td>Cập nhật trạng thái job.</td>
                  </tr>
                  <tr>
                    <td><b>DELETE</b></td>
                    <td>Xóa dữ liệu.</td>
                    <td>Xóa bản ghi tạm.</td>
                  </tr>
                  <tr>
                    <td><b>CREATE</b></td>
                    <td>Tạo object database.</td>
                    <td>Tạo table, view, procedure.</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "SQL trong luồng dữ liệu doanh nghiệp",
            html: `
              <p>
                Trong doanh nghiệp, SQL thường nằm ở giữa hệ thống nghiệp vụ và lớp báo cáo/phân tích.
              </p>

              <div class="db-hierarchy">
                <span>Business</span>
                <span>Application</span>
                <span>Database</span>
                <span>SQL</span>
                <span>Report</span>
              </div>

              <div class="warning">
                Nếu không hiểu business và cấu trúc dữ liệu, câu SQL có thể đúng syntax nhưng vẫn sai kết quả.
              </div>
            `
          }
        ]
      },

      {
        id: "database-hierarchy",
        title: "Database Hierarchy",
        label: "Phần 1 · Database Hierarchy",
        blocks: [
          {
            heading: "Database, Schema, Table, Row, Column",
            html: `
              <p>
                Một database thường được tổ chức theo nhiều tầng. Hiểu được cấu trúc này giúp học viên
                biết dữ liệu đang nằm ở đâu và cần truy cập bằng cách nào.
              </p>

              <div class="db-hierarchy">
                <span>Database</span>
                <span>Schema</span>
                <span>Table</span>
                <span>Row</span>
                <span>Column</span>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Tầng</th>
                    <th>Ý nghĩa</th>
                    <th>Ví dụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Database</b></td>
                    <td>Không gian lưu trữ dữ liệu lớn.</td>
                    <td>Enterprise Data Warehouse.</td>
                  </tr>
                  <tr>
                    <td><b>Schema</b></td>
                    <td>Nhóm object thuộc một owner hoặc domain.</td>
                    <td>CRM, RISK, FINANCE.</td>
                  </tr>
                  <tr>
                    <td><b>Table</b></td>
                    <td>Nơi lưu dữ liệu dạng dòng/cột.</td>
                    <td>CUSTOMER, ACCOUNT, TRANSACTION.</td>
                  </tr>
                  <tr>
                    <td><b>Row</b></td>
                    <td>Một bản ghi cụ thể.</td>
                    <td>Một khách hàng, một giao dịch.</td>
                  </tr>
                  <tr>
                    <td><b>Column</b></td>
                    <td>Một thuộc tính của bản ghi.</td>
                    <td>customer_id, balance, report_date.</td>
                  </tr>
                </tbody>
              </table>
            `
          }
        ]
      },

      {
        id: "data-lifecycle",
        title: "Data Lifecycle",
        label: "Phần 1 · Data Lifecycle",
        blocks: [
          {
            heading: "Dữ liệu đi qua những tầng nào?",
            html: `
              <p>
                Trong hệ thống dữ liệu doanh nghiệp, dữ liệu thường không đi thẳng từ source lên báo cáo.
                Nó thường qua nhiều tầng xử lý để làm sạch, chuẩn hóa, kiểm tra và tổng hợp.
              </p>

              <div class="db-hierarchy">
                <span>Source</span>
                <span>ETL</span>
                <span>Staging</span>
                <span>Warehouse</span>
                <span>Mart</span>
                <span>Dashboard</span>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Tầng</th>
                    <th>Vai trò</th>
                    <th>Ví dụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Source</b></td>
                    <td>Dữ liệu gốc từ hệ thống nghiệp vụ.</td>
                    <td>Core banking, CRM, LOS.</td>
                  </tr>
                  <tr>
                    <td><b>Staging</b></td>
                    <td>Khu vực nhận dữ liệu thô.</td>
                    <td>Bảng landing theo ngày.</td>
                  </tr>
                  <tr>
                    <td><b>Warehouse</b></td>
                    <td>Dữ liệu đã chuẩn hóa và quản trị.</td>
                    <td>Customer master, account snapshot.</td>
                  </tr>
                  <tr>
                    <td><b>Mart</b></td>
                    <td>Dữ liệu phục vụ một domain báo cáo.</td>
                    <td>MIS mart, Risk mart.</td>
                  </tr>
                  <tr>
                    <td><b>Dashboard</b></td>
                    <td>Lớp hiển thị cho người dùng cuối.</td>
                    <td>Power BI, Cognos, web report.</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Tại sao analyst cần hiểu data lifecycle?",
            html: `
              <ul>
                <li>Biết dữ liệu mình đang query là dữ liệu thô hay dữ liệu đã chuẩn hóa.</li>
                <li>Biết nên đối chiếu số liệu với tầng nào.</li>
                <li>Biết lỗi có thể phát sinh ở source, ETL, mapping hay report.</li>
                <li>Biết vì sao cùng một chỉ tiêu nhưng nhiều bảng có thể ra số khác nhau.</li>
              </ul>

              <div class="callout">
                Một analyst tốt không chỉ hỏi “query bảng nào”, mà còn hỏi “bảng này nằm ở tầng nào của data lifecycle”.
              </div>
            `
          }
        ]
      }
    ]
  },

  {
    id: "data-structure",
    title: "Phần 2",
    subtitle: "Table, Key, Relationship & Grain",
    sidebarTitle: "Data Structure",
    lessons: [
      {
        id: "table-row-column",
        title: "Table, Row, Column",
        label: "Phần 2 · Table Structure",
        blocks: [
          {
            heading: "Một bảng dữ liệu gồm những gì?",
            html: `
              <p>
                Table là cấu trúc cơ bản nhất khi làm việc với SQL.
                Một table thường đại diện cho một nhóm dữ liệu có cùng ý nghĩa business.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>customer_id</th>
                    <th>customer_name</th>
                    <th>segment</th>
                    <th>open_date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>C001</td>
                    <td>Nguyễn Văn A</td>
                    <td>Retail</td>
                    <td>2024-01-15</td>
                  </tr>
                  <tr>
                    <td>C002</td>
                    <td>Trần Thị B</td>
                    <td>SME</td>
                    <td>2024-03-20</td>
                  </tr>
                </tbody>
              </table>

              <div class="concept-grid">
                <div class="concept-card">
                  <h3>Table</h3>
                  <p>Tập hợp các bản ghi cùng ý nghĩa.</p>
                </div>
                <div class="concept-card">
                  <h3>Row</h3>
                  <p>Một bản ghi cụ thể trong bảng.</p>
                </div>
                <div class="concept-card">
                  <h3>Column</h3>
                  <p>Một thuộc tính của bản ghi.</p>
                </div>
                <div class="concept-card">
                  <h3>Value</h3>
                  <p>Giá trị tại giao điểm dòng/cột.</p>
                </div>
              </div>
            `
          }
        ]
      },

      {
        id: "data-type",
        title: "Data Type trong SQL",
        label: "Phần 2 · Data Type",
        blocks: [
          {
            heading: "Vì sao phải hiểu data type?",
            html: `
              <p>
                Data type quyết định cách database lưu trữ, so sánh, tính toán và sắp xếp dữ liệu.
                Rất nhiều lỗi phân tích đến từ việc hiểu sai kiểu dữ liệu.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Data type</th>
                    <th>Ý nghĩa</th>
                    <th>Ví dụ</th>
                    <th>Lỗi thường gặp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>VARCHAR</b></td>
                    <td>Dữ liệu chữ.</td>
                    <td>customer_name, segment.</td>
                    <td>Số bị lưu dạng text nên sort sai.</td>
                  </tr>
                  <tr>
                    <td><b>NUMBER</b></td>
                    <td>Dữ liệu số.</td>
                    <td>balance, amount.</td>
                    <td>Nhầm NULL với 0.</td>
                  </tr>
                  <tr>
                    <td><b>DATE</b></td>
                    <td>Dữ liệu ngày.</td>
                    <td>report_date.</td>
                    <td>So sánh ngày như chuỗi text.</td>
                  </tr>
                  <tr>
                    <td><b>TIMESTAMP</b></td>
                    <td>Ngày giờ chi tiết.</td>
                    <td>transaction_time.</td>
                    <td>Lọc thiếu dữ liệu do có giờ/phút/giây.</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Ví dụ lỗi do sai data type",
            html: `
              <p>
                Nếu một cột số bị lưu dạng text, việc sắp xếp có thể sai về mặt số học.
              </p>

              <pre><code>-- Dữ liệu text có thể sort sai theo logic số học
'10' &lt; '2'</code></pre>

              <p>
                Với dữ liệu thời gian, nếu cột có cả giờ/phút/giây, không nên lọc bằng dấu bằng theo ngày.
              </p>

              <pre><code>-- Không nên nếu transaction_time có giờ/phút/giây
WHERE transaction_time = DATE '2026-05-27'

-- Nên dùng khoảng thời gian
WHERE transaction_time &gt;= DATE '2026-05-27'
  AND transaction_time &lt;  DATE '2026-05-28'</code></pre>

              <div class="warning">
                Data type sai có thể làm query chạy được nhưng kết quả sai.
              </div>
            `
          }
        ]
      },

      {
        id: "primary-key",
        title: "Primary Key",
        label: "Phần 2 · Primary Key",
        blocks: [
          {
            heading: "Primary key là gì?",
            html: `
              <p>
                Primary key là cột hoặc nhóm cột dùng để định danh duy nhất một dòng trong bảng.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Đặc điểm</th>
                    <th>Ý nghĩa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Unique</b></td>
                    <td>Không được trùng giữa các dòng.</td>
                  </tr>
                  <tr>
                    <td><b>Not null</b></td>
                    <td>Không được để trống.</td>
                  </tr>
                  <tr>
                    <td><b>Stable</b></td>
                    <td>Nên ít thay đổi theo thời gian.</td>
                  </tr>
                  <tr>
                    <td><b>Identifiable</b></td>
                    <td>Giúp xác định chính xác một record.</td>
                  </tr>
                </tbody>
              </table>

              <div class="callout">
                Khi đọc một bảng mới, câu hỏi đầu tiên nên là: key nào xác định duy nhất một dòng?
              </div>
            `
          },
          {
            heading: "Business key và surrogate key",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>Loại key</th>
                    <th>Ý nghĩa</th>
                    <th>Ví dụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Business key</b></td>
                    <td>Key có ý nghĩa nghiệp vụ.</td>
                    <td>customer_id, account_no, contract_no.</td>
                  </tr>
                  <tr>
                    <td><b>Surrogate key</b></td>
                    <td>Key kỹ thuật do hệ thống sinh ra.</td>
                    <td>id, sequence_id, row_id.</td>
                  </tr>
                </tbody>
              </table>

              <div class="warning">
                Không phải lúc nào cột tên là ID cũng là business key tốt để phân tích.
              </div>
            `
          }
        ]
      },

      {
        id: "foreign-key",
        title: "Foreign Key",
        label: "Phần 2 · Foreign Key",
        blocks: [
          {
            heading: "Foreign key là gì?",
            html: `
              <p>
                Foreign key là cột dùng để liên kết một bảng với bảng khác.
                Nó thường trỏ về primary key hoặc business key của bảng cha.
              </p>

              <div class="relationship-flow">
                <div class="relationship-box">
                  <h3>CUSTOMER</h3>
                  <p><b>customer_id</b> là primary key.</p>

                  <table>
                    <thead>
                      <tr>
                        <th>customer_id</th>
                        <th>name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>C001</td>
                        <td>Nguyễn Văn A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="relationship-arrow">→</div>

                <div class="relationship-box">
                  <h3>ACCOUNT</h3>
                  <p><b>customer_id</b> là foreign key.</p>

                  <table>
                    <thead>
                      <tr>
                        <th>account_no</th>
                        <th>customer_id</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>A001</td>
                        <td>C001</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="warning">
                Không phải cứ 2 cột cùng tên là join được. Phải hiểu ý nghĩa business và grain của bảng.
              </div>
            `
          }
        ]
      },

      {
        id: "relationship",
        title: "Relationship",
        label: "Phần 2 · Relationship",
        blocks: [
          {
            heading: "Các kiểu quan hệ thường gặp",
            html: `
              <table>
                <thead>
                  <tr>
                    <th>Kiểu quan hệ</th>
                    <th>Ví dụ</th>
                    <th>Rủi ro khi JOIN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>1 - 1</b></td>
                    <td>1 khách hàng - 1 hồ sơ định danh.</td>
                    <td>Ít rủi ro nhân dòng nếu key unique thật sự.</td>
                  </tr>
                  <tr>
                    <td><b>1 - N</b></td>
                    <td>1 khách hàng - nhiều tài khoản.</td>
                    <td>JOIN có thể làm tăng số dòng.</td>
                  </tr>
                  <tr>
                    <td><b>N - N</b></td>
                    <td>Nhiều khách hàng - nhiều sản phẩm.</td>
                    <td>Cần bridge table hoặc logic mapping rõ ràng.</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Relationship không chỉ là kỹ thuật JOIN",
            html: `
              <p>
                Relationship phản ánh quan hệ business giữa các thực thể.
                Trước khi join, cần hiểu mối quan hệ này là 1-1, 1-N hay N-N.
              </p>

              <ul>
                <li>Một khách hàng có thể có nhiều tài khoản.</li>
                <li>Một tài khoản có thể có nhiều giao dịch.</li>
                <li>Một sản phẩm có thể được nhiều khách hàng sử dụng.</li>
                <li>Một khách hàng có thể thuộc nhiều phân nhóm theo từng thời điểm.</li>
              </ul>

              <div class="callout">
                JOIN đúng về mặt kỹ thuật chưa chắc đúng về mặt business.
              </div>
            `
          }
        ]
      },

      {
        id: "grain",
        title: "Grain của bảng",
        label: "Phần 2 · Grain",
        blocks: [
          {
            heading: "Một dòng dữ liệu đại diện cho cái gì?",
            html: `
              <p>
                Grain là khái niệm cực kỳ quan trọng. Nếu hiểu sai grain,
                kết quả SQL có thể đúng syntax nhưng sai hoàn toàn về business.
              </p>

              <table class="grain-table">
                <thead>
                  <tr>
                    <th>Bảng</th>
                    <th>Grain</th>
                    <th>Ý nghĩa một dòng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CUSTOMER</td>
                    <td>1 dòng / customer</td>
                    <td>Một khách hàng.</td>
                  </tr>
                  <tr>
                    <td>ACCOUNT</td>
                    <td>1 dòng / account</td>
                    <td>Một tài khoản.</td>
                  </tr>
                  <tr>
                    <td>TRANSACTION</td>
                    <td>1 dòng / transaction</td>
                    <td>Một giao dịch phát sinh.</td>
                  </tr>
                  <tr>
                    <td>ACCOUNT_SNAPSHOT</td>
                    <td>1 dòng / account / report_date</td>
                    <td>Trạng thái tài khoản tại một ngày.</td>
                  </tr>
                </tbody>
              </table>

              <div class="callout">
                Trước khi query, luôn hỏi: một dòng trong bảng này đang đại diện cho điều gì?
              </div>
            `
          },
          {
            heading: "Ví dụ sai grain làm sai số liệu",
            html: `
              <p>
                Nếu bảng khách hàng có grain là <b>1 dòng / customer</b>,
                còn bảng tài khoản có grain là <b>1 dòng / account</b>,
                khi JOIN theo customer_id, số dòng có thể tăng lên.
              </p>

              <pre><code>SELECT c.customer_id,
       c.customer_name,
       a.account_no
FROM customer c
LEFT JOIN account a
  ON c.customer_id = a.customer_id;</code></pre>

              <div class="warning">
                Query trên đúng syntax, nhưng nếu sau đó đếm số khách hàng bằng COUNT(*),
                kết quả có thể sai vì một khách hàng có nhiều tài khoản.
              </div>
            `
          }
        ]
      },

      {
        id: "fact-dimension",
        title: "Fact và Dimension",
        label: "Phần 2 · Fact & Dimension",
        blocks: [
          {
            heading: "Fact table và Dimension table",
            html: `
              <p>
                Fact và Dimension là tư duy nền tảng trong data warehouse và BI.
                Hiểu được hai loại bảng này giúp người học biết bảng nào để tính toán,
                bảng nào để mô tả/ngữ cảnh hóa dữ liệu.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Loại bảng</th>
                    <th>Ý nghĩa</th>
                    <th>Ví dụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Fact</b></td>
                    <td>Bảng chứa sự kiện, giao dịch, số đo.</td>
                    <td>TRANSACTION, BALANCE_SNAPSHOT, SALES_FACT.</td>
                  </tr>
                  <tr>
                    <td><b>Dimension</b></td>
                    <td>Bảng chứa thông tin mô tả.</td>
                    <td>CUSTOMER_DIM, PRODUCT_DIM, BRANCH_DIM.</td>
                  </tr>
                </tbody>
              </table>

              <div class="callout">
                Fact thường dùng để SUM/COUNT/AVG. Dimension thường dùng để filter, group hoặc enrich.
              </div>
            `
          },
          {
            heading: "Ví dụ phân tích",
            html: `
              <pre><code>SELECT d.segment,
       SUM(f.balance) AS total_balance
FROM balance_snapshot_fact f
LEFT JOIN customer_dim d
  ON f.customer_id = d.customer_id
GROUP BY d.segment;</code></pre>

              <p>
                Trong ví dụ này, bảng fact chứa số dư, còn bảng dimension cung cấp phân khúc khách hàng.
              </p>
            `
          }
        ]
      }
    ]
  },

  {
    id: "data-validation",
    title: "Phần 3",
    subtitle: "Validation & Data Thinking",
    sidebarTitle: "Data Validation",
    lessons: [
      {
        id: "null-validation",
        title: "NULL và Missing Data",
        label: "Phần 3 · NULL",
        blocks: [
          {
            heading: "NULL không phải là 0",
            html: `
              <p>
                NULL nghĩa là chưa có giá trị, không xác định hoặc không áp dụng.
                NULL không giống số 0 và cũng không giống chuỗi rỗng.
              </p>

              <div class="null-warning">
                Trong SQL, điều kiện <code>balance &lt;&gt; 0</code> không tự động bao gồm các dòng có balance NULL.
              </div>

              <pre><code>SELECT *
FROM account_snapshot
WHERE balance IS NULL;</code></pre>

              <p>
                Khi phân tích dữ liệu, phải kiểm tra NULL trước khi kết luận dữ liệu đúng hay sai.
              </p>
            `
          },
          {
            heading: "COUNT(*) và COUNT(column)",
            html: `
              <p>
                COUNT(*) đếm số dòng. COUNT(column) chỉ đếm những dòng mà column không NULL.
              </p>

              <pre><code>SELECT COUNT(*)        AS total_rows,
       COUNT(balance)  AS rows_has_balance
FROM account_snapshot;</code></pre>

              <div class="warning">
                Nếu không hiểu NULL, các chỉ tiêu về số lượng, tỷ lệ và trung bình có thể bị diễn giải sai.
              </div>
            `
          }
        ]
      },

      {
        id: "duplicate-data",
        title: "Duplicate Data",
        label: "Phần 3 · Duplicate",
        blocks: [
          {
            heading: "Duplicate không chỉ là trùng toàn bộ dòng",
            html: `
              <p>
                Duplicate có thể là duplicate vật lý hoặc duplicate theo business key.
                Trong phân tích dữ liệu, duplicate theo business key thường nguy hiểm hơn.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Loại duplicate</th>
                    <th>Ý nghĩa</th>
                    <th>Ví dụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Physical duplicate</b></td>
                    <td>Hai dòng giống hệt nhau.</td>
                    <td>Cùng tất cả column.</td>
                  </tr>
                  <tr>
                    <td><b>Business duplicate</b></td>
                    <td>Trùng theo key nghiệp vụ.</td>
                    <td>Một customer_id xuất hiện 2 lần trong bảng customer master.</td>
                  </tr>
                  <tr>
                    <td><b>Join duplicate</b></td>
                    <td>Dòng bị nhân lên sau JOIN.</td>
                    <td>1 customer join với nhiều account.</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Cách kiểm tra duplicate theo key",
            html: `
              <pre><code>SELECT customer_id,
       COUNT(*) AS row_count
FROM customer
GROUP BY customer_id
HAVING COUNT(*) &gt; 1;</code></pre>

              <div class="callout">
                Trước khi JOIN hoặc aggregate, nên kiểm tra duplicate theo key quan trọng.
              </div>
            `
          }
        ]
      },

      {
        id: "validation-mindset",
        title: "Validation Mindset",
        label: "Phần 3 · Validation Mindset",
        blocks: [
          {
            heading: "Tư duy kiểm tra dữ liệu",
            html: `
              <p>
                Một người làm data tốt không tin ngay kết quả query đầu tiên.
                Họ luôn kiểm tra dữ liệu theo từng bước để tránh sai số âm thầm.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Checklist</th>
                    <th>Câu hỏi cần trả lời</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Row count</b></td>
                    <td>Số dòng trước và sau xử lý có hợp lý không?</td>
                  </tr>
                  <tr>
                    <td><b>Duplicate check</b></td>
                    <td>Key chính có bị trùng không?</td>
                  </tr>
                  <tr>
                    <td><b>NULL check</b></td>
                    <td>Trường quan trọng có bị thiếu không?</td>
                  </tr>
                  <tr>
                    <td><b>Sum reconciliation</b></td>
                    <td>Tổng số liệu trước và sau enrich có bị lệch không?</td>
                  </tr>
                  <tr>
                    <td><b>Grain check</b></td>
                    <td>Một dòng đang đại diện cho điều gì?</td>
                  </tr>
                </tbody>
              </table>
            `
          },
          {
            heading: "Query nên được xây theo từng lớp",
            html: `
              <p>
                Với bài toán phức tạp, nên dùng CTE để chia query thành nhiều bước.
                Mỗi bước nên có thể kiểm tra riêng.
              </p>

              <pre><code>WITH base AS (
  SELECT *
  FROM account_snapshot
  WHERE report_date = DATE '2026-05-27'
),

validated AS (
  SELECT *
  FROM base
  WHERE account_no IS NOT NULL
),

aggregated AS (
  SELECT customer_id,
         SUM(balance) AS total_balance
  FROM validated
  GROUP BY customer_id
)

SELECT *
FROM aggregated;</code></pre>
            `
          }
        ]
      },

      {
        id: "wrong-join",
        title: "SQL đúng syntax nhưng sai business",
        label: "Phần 3 · Wrong JOIN",
        blocks: [
          {
            heading: "Vì sao SQL chạy được nhưng kết quả sai?",
            html: `
              <p>
                SQL đúng syntax chỉ có nghĩa là database hiểu câu lệnh.
                Nó không đảm bảo logic nghiệp vụ đúng.
              </p>

              <ul>
                <li>JOIN sai key.</li>
                <li>JOIN sai grain.</li>
                <li>Filter sai thời điểm dữ liệu.</li>
                <li>COUNT(*) sau khi JOIN bị nhân dòng.</li>
                <li>SUM dữ liệu fact sau khi join với bảng dimension bị duplicate.</li>
              </ul>

              <div class="warning">
                Đây là lỗi rất phổ biến: query không báo lỗi, dashboard vẫn lên số,
                nhưng số liệu sai về mặt business.
              </div>
            `
          },
          {
            heading: "Ví dụ COUNT(*) sai sau JOIN",
            html: `
              <pre><code>SELECT COUNT(*) AS customer_count
FROM customer c
LEFT JOIN account a
  ON c.customer_id = a.customer_id;</code></pre>

              <p>
                Nếu một khách hàng có nhiều tài khoản, COUNT(*) sẽ đếm theo số dòng sau JOIN,
                không còn là số khách hàng duy nhất.
              </p>

              <pre><code>SELECT COUNT(DISTINCT c.customer_id) AS customer_count
FROM customer c
LEFT JOIN account a
  ON c.customer_id = a.customer_id;</code></pre>
            `
          }
        ]
      },

      {
        id: "data-quality",
        title: "Data Quality",
        label: "Phần 3 · Data Quality",
        blocks: [
          {
            heading: "Các chiều chất lượng dữ liệu",
            html: `
              <p>
                Data quality là mức độ dữ liệu đủ tốt để sử dụng cho báo cáo, phân tích hoặc ra quyết định.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Chiều chất lượng</th>
                    <th>Ý nghĩa</th>
                    <th>Câu hỏi kiểm tra</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Completeness</b></td>
                    <td>Dữ liệu có đầy đủ không?</td>
                    <td>Có thiếu ngày, thiếu khách hàng, thiếu giao dịch không?</td>
                  </tr>
                  <tr>
                    <td><b>Accuracy</b></td>
                    <td>Dữ liệu có đúng không?</td>
                    <td>Số dư có khớp nguồn chuẩn không?</td>
                  </tr>
                  <tr>
                    <td><b>Consistency</b></td>
                    <td>Dữ liệu có nhất quán không?</td>
                    <td>Cùng một customer_id có nhiều tên khác nhau không?</td>
                  </tr>
                  <tr>
                    <td><b>Timeliness</b></td>
                    <td>Dữ liệu có đúng thời điểm không?</td>
                    <td>Dữ liệu T-1 đã về đủ chưa?</td>
                  </tr>
                  <tr>
                    <td><b>Traceability</b></td>
                    <td>Dữ liệu có truy vết được không?</td>
                    <td>Biết dữ liệu đến từ source nào, run nào không?</td>
                  </tr>
                </tbody>
              </table>
            `
          }
        ]
      },

      {
        id: "query-debugging",
        title: "Query Debugging Mindset",
        label: "Phần 3 · Query Debugging",
        blocks: [
          {
            heading: "Cách debug một query phân tích",
            html: `
              <p>
                Khi query ra số liệu không đúng, không nên sửa ngẫu nhiên.
                Cần debug có hệ thống theo từng tầng logic.
              </p>

              <ol>
                <li>Kiểm tra bảng nguồn có đúng không.</li>
                <li>Kiểm tra filter ngày/kỳ báo cáo.</li>
                <li>Kiểm tra số dòng trước JOIN.</li>
                <li>Kiểm tra duplicate key trước JOIN.</li>
                <li>Kiểm tra số dòng sau JOIN.</li>
                <li>Kiểm tra tổng số trước và sau aggregate.</li>
                <li>Đối chiếu với báo cáo/source chuẩn.</li>
              </ol>

              <div class="callout">
                Debug query tốt là biết cô lập lỗi: lỗi từ source, filter, join, mapping hay aggregate.
              </div>
            `
          },
          {
            heading: "Mẫu kiểm tra nhanh",
            html: `
              <pre><code>-- 1. Row count
SELECT COUNT(*) FROM your_table;

-- 2. Duplicate key
SELECT business_key, COUNT(*)
FROM your_table
GROUP BY business_key
HAVING COUNT(*) &gt; 1;

-- 3. NULL check
SELECT COUNT(*)
FROM your_table
WHERE important_column IS NULL;

-- 4. Sum check
SELECT SUM(amount)
FROM your_table;</code></pre>
            `
          }
        ]
      }
    ]
  }
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

window.addEventListener("common-loaded", initDatabaseFoundation);

window.addEventListener("global-search", event => {
  currentSearchKeyword = event.detail?.keyword || "";
  applySearch(currentSearchKeyword);
});

function initDatabaseFoundation(event) {
  if (isInitialized) return;

  currentPartIndex = normalizePartIndex(
    event?.detail?.currentPartIndex,
    foundationParts.length
  );

  currentLessonIndex = getCurrentLessonIndex(currentPartIndex);

  sidebarTitle = document.getElementById("sidebarTitle");
  sidebarList = document.getElementById("sidebarList");
  lessonLabel = document.getElementById("lessonLabel");
  lessonTitle = document.getElementById("lessonTitle");
  lessonContent = document.getElementById("lessonContent");
  prevBtn = document.getElementById("prevBtn");
  nextBtn = document.getElementById("nextBtn");

  const requiredElements = [
    sidebarTitle,
    sidebarList,
    lessonLabel,
    lessonTitle,
    lessonContent,
    prevBtn,
    nextBtn
  ];

  if (requiredElements.some(element => !element)) {
    console.error("Database Foundation init failed: missing required DOM elements.");
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
  const part = foundationParts[currentPartIndex];

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
  const part = foundationParts[currentPartIndex];
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
    currentPartIndex === foundationParts.length - 1 &&
    currentLessonIndex === part.lessons.length - 1;
}

function renderAll() {
  renderSidebar();
  renderLesson();
  applySearch(currentSearchKeyword);
}

function updateNavigationButtons() {
  prevBtn.disabled = currentPartIndex === 0 && currentLessonIndex === 0;

  const isLastPart = currentPartIndex === foundationParts.length - 1;
  const isLastLesson =
    currentLessonIndex === foundationParts[currentPartIndex].lessons.length - 1;

  nextBtn.disabled = isLastPart && isLastLesson;

  prevBtn.textContent = "← Previous";
  nextBtn.textContent = "Next →";
}


/* =========================================================
   NAVIGATION
========================================================= */

function goPrev() {
  if (currentLessonIndex > 0) {
    currentLessonIndex--;
  } else if (currentPartIndex > 0) {
    currentPartIndex--;
    currentLessonIndex = foundationParts[currentPartIndex].lessons.length - 1;
  }

  syncUrlState(currentPartIndex, currentLessonIndex);
  renderAll();
  scrollContentTop();
}

function goNext() {
  const part = foundationParts[currentPartIndex];

  if (currentLessonIndex < part.lessons.length - 1) {
    currentLessonIndex++;
  } else if (currentPartIndex < foundationParts.length - 1) {
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
      !normalized || raw.includes(normalized)
        ? ""
        : "none";
  });

  updateSearchEmptyState(normalized);
}

function updateSearchEmptyState(normalizedKeyword) {
  const oldEmptyState = lessonContent.querySelector(".search-empty-state");

  if (oldEmptyState) {
    oldEmptyState.remove();
  }

  if (!normalizedKeyword) return;

  const visibleBlocks = Array.from(
    lessonContent.querySelectorAll(".lesson-block")
  ).filter(block => block.style.display !== "none");

  if (visibleBlocks.length > 0) return;

  lessonContent.insertAdjacentHTML(
    "beforeend",
    `
      <div class="search-empty-state">
        Không tìm thấy nội dung phù hợp trong lesson hiện tại.
      </div>
    `
  );
}


/* =========================================================
   URL / STATE UTILITIES
========================================================= */

function getCurrentLessonIndex(partIndex) {
  const params = new URLSearchParams(window.location.search);
  const rawLesson = params.get("lesson");

  if (rawLesson === null) return 0;

  const lessonByIndex = Number(rawLesson);

  if (Number.isInteger(lessonByIndex)) {
    return normalizeLessonIndex(partIndex, lessonByIndex);
  }

  const part = foundationParts[partIndex];

  const lessonIndex = part.lessons.findIndex(lesson => lesson.id === rawLesson);

  if (lessonIndex < 0) return 0;

  return lessonIndex;
}

function normalizePartIndex(value, totalParts) {
  const partIndex = Number(value);

  if (!Number.isInteger(partIndex)) return 0;
  if (partIndex < 0) return 0;
  if (partIndex >= totalParts) return 0;

  return partIndex;
}

function normalizeLessonIndex(partIndex, lessonIndex) {
  const part = foundationParts[partIndex];

  if (!part) return 0;

  const index = Number(lessonIndex);

  if (!Number.isInteger(index)) return 0;
  if (index < 0) return 0;
  if (index >= part.lessons.length) return 0;

  return index;
}

function syncUrlState(partIndex, lessonIndex) {
  const part = foundationParts[partIndex];
  const lesson = part?.lessons?.[lessonIndex];

  if (!part || !lesson) return;

  const url = new URL(window.location.href);

  url.searchParams.set("part", String(partIndex));
  url.searchParams.set("lesson", lesson.id);

  window.history.replaceState({}, "", url.toString());
  window.dispatchEvent(new CustomEvent("part-changed"));
}

function scrollContentTop() {
  document.querySelector(".content-body")?.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  document.querySelector(".content")?.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   SAFETY UTILITIES
========================================================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
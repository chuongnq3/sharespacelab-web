# =============================================================
#  BAI TAP 3 — ADVANCED AUTOMATION
#  Python Foundation · Tu dong hoa bao cao
# =============================================================
#
#  YEU CAU:
#  Doc file Excel, tinh cac KPI, dien vao HTML template co san
#  va xuat ra file bao cao HTML hoan chinh.
#
#  INPUT : input/data.xlsx
#           - Sheet : "Data"
#           - Cot   : CIF, BRANCH, BALANCE, DATE, STATUS
#          template/dashboard_template.html
#           - Placeholder: {{REPORT_DATE}}, {{TOTAL_BALANCE}},
#             {{TOTAL_CUSTOMER}}, {{ACTIVE_PCT}}, {{TOP5_ROWS}}
#
#  OUTPUT: output/dashboard_report.html
#
#  4 CAU HOI TRUOC KHI VIET CODE:
#  1. Input la gi?    → Excel + HTML template voi placeholder
#  2. Logic la gi?    → tinh KPI, tao HTML rows, replace placeholder
#  3. Output la gi?   → file HTML co the mo tren trinh duyet
#  4. Co the sai gi?  → template thieu placeholder, data rong sau filter,
#                       encoding loi, BALANCE / STATUS null
#
#  HUONG DAN:
#  - Placeholder dung cu phap {{TEN_BIEN}} trong file HTML
#  - Dung str.replace() de thay the, khong dung template engine
#  - Kiem tra placeholder con sot sau khi replace → phat hien loi som
#  - Format so voi f"{value:,.0f}" → 18,800,000,000 (co dau phan cach)
# =============================================================

import pandas as pd
from pathlib import Path
from datetime import datetime

input_file    = Path("input/data.xlsx")
template_file = Path("template/dashboard_template.html")
output_file   = Path("output/dashboard_report.html")


# TODO 1: Doc file Excel, chuan hoa kieu du lieu
#         - BALANCE → numeric, errors="coerce", fillna(0)
#         - DATE    → datetime, errors="coerce"
#         - STATUS  → strip() de bo khoang trang thua


# TODO 2: Tinh cac KPI sau:
#         a) total_balance   = tong BALANCE
#         b) total_customer  = so CIF duy nhat (nunique)
#         c) active_pct      = so KH co STATUS == "Active" / total_customer * 100
#         Xu ly truong hop total_customer = 0 (tranh ZeroDivisionError)


# TODO 3: Tinh top 5 BRANCH theo tong BALANCE
#         → tao chuoi HTML rows de dien vao bang trong template
#         Vi du output:
#           <tr><td>HN001</td><td>8,500,000,000</td></tr>
#           <tr><td>HCM002</td><td>7,200,000,000</td></tr>
#         Goi y: dung "".join(f"<tr>...</tr>" for _, row in top5.iterrows())


# TODO 4: Tao dict params voi cac placeholder lam key
#         Vi du:
#           params = {
#               "{{REPORT_DATE}}":    datetime.today().strftime("%d/%m/%Y"),
#               "{{TOTAL_BALANCE}}":  f"{total_balance:,.0f}",
#               ...
#           }


# TODO 5: Doc template HTML, replace tung placeholder, ghi ra output
#         Goi y:
#           html = template_file.read_text(encoding="utf-8")
#           for key, value in params.items():
#               html = html.replace(key, str(value))
#           output_file.write_text(html, encoding="utf-8")


# TODO 6: Sau khi replace, kiem tra xem con placeholder {{...}} nao sot khong
#         In canh bao neu co → giup phat hien template thieu variable
#         Goi y: kiem tra "{{" in html


# TODO 7: In thong bao hoan thanh


# =============================================================
#  TEMPLATE MAU (luu vao template/dashboard_template.html)
#  Copy noi dung duoi day vao file HTML de test
# =============================================================

TEMPLATE_SAMPLE = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8"/>
  <title>Dashboard {{REPORT_DATE}}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 32px; background: #F4F8FF; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap:16px; margin:24px 0; }
    .kpi { background:#fff; border-radius:12px; padding:20px; border:1px solid #E0E8F6; }
    .kpi-label { font-size:12px; color:#6B7A99; font-weight:600; }
    .kpi-value { font-size:28px; font-weight:800; color:#00246B; margin-top:4px; }
    table { width:100%; border-collapse:collapse; background:#fff;
            border-radius:12px; overflow:hidden; }
    th,td { padding:12px 16px; text-align:left; border-bottom:1px solid #E0E8F6; }
    th { background:#00246B; color:#fff; font-size:13px; }
  </style>
</head>
<body>
  <h1>Bao cao ngay {{REPORT_DATE}}</h1>
  <div class="kpi-grid">
    <div class="kpi">
      <div class="kpi-label">Tong du no</div>
      <div class="kpi-value">{{TOTAL_BALANCE}}</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">Khach hang</div>
      <div class="kpi-value">{{TOTAL_CUSTOMER}}</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">Ty le Active</div>
      <div class="kpi-value">{{ACTIVE_PCT}}</div>
    </div>
  </div>
  <h2>Top 5 Chi nhanh</h2>
  <table>
    <thead><tr><th>Chi nhanh</th><th>Du no (VND)</th></tr></thead>
    <tbody>{{TOP5_ROWS}}</tbody>
  </table>
</body>
</html>"""

# De tao file template tu code:
# from pathlib import Path
# Path("template").mkdir(exist_ok=True)
# Path("template/dashboard_template.html").write_text(TEMPLATE_SAMPLE, encoding="utf-8")
# print("Da tao template")

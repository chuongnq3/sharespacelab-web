# =============================================================
#  BAI TAP 4 — EXPERT AUTOMATION
#  Python Foundation · Tu dong hoa bao cao
# =============================================================
#
#  YEU CAU:
#  Xay dung pipeline hoan chinh theo cau truc modular:
#    load_config() → load_data() → compute_kpi() → render_html()
#  Pipeline phai co logging day du va doc cau hinh tu config.json.
#
#  INPUT : config/config.json  (xem cau truc ben duoi)
#          file Excel (duong dan lay tu config)
#          HTML template (duong dan lay tu config)
#
#  OUTPUT: file HTML bao cao
#          file log trong thu muc logs/
#
#  4 CAU HOI TRUOC KHI VIET CODE:
#  1. Input la gi?    → config.json dinh nghia tat ca duong dan va ten cot
#  2. Logic la gi?    → 4 function rieng biet, moi function mot nhiem vu ro rang
#  3. Output la gi?   → HTML report + log file ghi trang thai tung buoc
#  4. Co the sai gi?  → config thieu key, file khong ton tai, du lieu rong
#                       sau validate, encoding loi, quyen ghi thu muc
#
#  CAU TRUC CONFIG (config/config.json):
#  {
#    "input_file":    "input/data.xlsx",
#    "template_file": "template/dashboard_template.html",
#    "output_file":   "output/dashboard_report.html",
#    "sheet_name":    "Data",
#    "col_cif":       "CIF",
#    "col_branch":    "BRANCH",
#    "col_balance":   "BALANCE",
#    "col_date":      "DATE",
#    "col_status":    "STATUS"
#  }
#
#  HUONG DAN:
#  - Moi function nhan cfg: dict lam tham so → khong dung bien global
#  - Dung logging thay vi print → ghi duoc vao file log
#  - exc_info=True trong log.error → ghi ca traceback vao log
#  - main() goi tung function trong try/except → bat loi ro rang
# =============================================================

import json
import logging
import pandas as pd
from pathlib import Path
from datetime import datetime


# =============================================================
#  SETUP LOGGING
#  Ghi ca ra console va file log theo ngay gio
# =============================================================

# TODO 1: Tao thu muc logs/, dat ten file log theo format run_YYYYMMDD_HHMMSS.log
#         Config logging ghi ca ra FileHandler va StreamHandler
#         Format: "%(asctime)s [%(levelname)s] %(message)s"
#         Goi y:
#           log_dir  = Path("logs")
#           log_dir.mkdir(exist_ok=True)
#           log_file = log_dir / f"run_{datetime.today().strftime(...)}.log"
#           logging.basicConfig(level=logging.INFO, format=...,
#                               handlers=[FileHandler, StreamHandler])
#           log = logging.getLogger(__name__)


# =============================================================
#  FUNCTION 1: LOAD CONFIG
# =============================================================

def load_config(config_path: Path) -> dict:
    """
    Doc file config.json, kiem tra cac key bat buoc.
    Raise FileNotFoundError neu file khong ton tai.
    Raise ValueError neu thieu bat ky key nao.
    """
    # TODO 2: Kiem tra file ton tai, doc JSON
    #         Kiem tra cac required_keys:
    #           ["input_file", "template_file", "output_file",
    #            "sheet_name", "col_cif", "col_branch",
    #            "col_balance", "col_date", "col_status"]
    #         Neu thieu → raise ValueError liet ke cac key bi thieu
    pass


# =============================================================
#  FUNCTION 2: LOAD DATA
# =============================================================

def load_data(cfg: dict) -> pd.DataFrame:
    """
    Doc file Excel theo config, validate cot, chuan hoa kieu du lieu.
    Ghi log so dong doc duoc va so null cua tung cot.
    """
    # TODO 3: Doc file Excel tu cfg["input_file"], sheet cfg["sheet_name"]
    #         Kiem tra cac cot required (lay ten tu cfg)
    #         Chuan hoa:
    #           - cfg["col_balance"] → numeric, errors="coerce", fillna(0)
    #           - cfg["col_date"]    → datetime, errors="coerce"
    #         Ghi log canh bao neu co cot null
    #         Tra ve DataFrame
    pass


# =============================================================
#  FUNCTION 3: COMPUTE KPI
# =============================================================

def compute_kpi(df: pd.DataFrame, cfg: dict) -> dict:
    """
    Tinh cac KPI tu DataFrame, tra ve dict params de replace vao HTML.
    Keys cua dict la placeholder (vi du: "{{TOTAL_BALANCE}}").
    """
    # TODO 4: Lay ten cot tu cfg (cfg["col_cif"], cfg["col_branch"], ...)
    #         Tinh:
    #           - total_balance  = sum(col_balance)
    #           - total_customer = nunique(col_cif)
    #           - active_pct     = KH Active / total_customer * 100
    #           - top5_rows      = chuoi HTML <tr>...</tr> top 5 branch
    #         Ghi log ket qua KPI
    #         Tra ve dict {
    #             "{{REPORT_DATE}}":    ...,
    #             "{{TOTAL_BALANCE}}":  ...,
    #             "{{TOTAL_CUSTOMER}}": ...,
    #             "{{ACTIVE_PCT}}":     ...,
    #             "{{TOP5_ROWS}}":      ...
    #         }
    pass


# =============================================================
#  FUNCTION 4: RENDER HTML
# =============================================================

def render_html(params: dict, cfg: dict) -> None:
    """
    Doc HTML template, replace placeholder bang gia tri thuc,
    kiem tra placeholder con sot, ghi ra file output.
    """
    # TODO 5: Doc template tu cfg["template_file"]
    #         Replace tung key trong params
    #         Kiem tra placeholder con sot → log warning neu co
    #         Tao thu muc output neu chua co
    #         Ghi HTML ra cfg["output_file"]
    #         Log ten file output
    pass


# =============================================================
#  MAIN — GOI TUNG BUOC
# =============================================================

def main():
    # TODO 6: Goi tung function theo thu tu:
    #           load_config → load_data → compute_kpi → render_html
    #         Boc trong try/except, log loi voi exc_info=True
    #         Log "=== BAT DAU ===" va "=== HOAN THANH ===" de de theo doi
    pass


if __name__ == "__main__":
    main()


# =============================================================
#  TAO DU LIEU MAU DE TEST
#  Chay phan nay mot lan de tao du cac file can thiet
# =============================================================

def create_sample_files():
    """Tao tat ca file mau de test pipeline."""
    import json

    # --- tao cac thu muc
    for d in ["input", "output", "template", "config", "logs"]:
        Path(d).mkdir(exist_ok=True)

    # --- tao config.json
    cfg = {
        "input_file":    "input/data.xlsx",
        "template_file": "template/dashboard_template.html",
        "output_file":   "output/dashboard_report.html",
        "sheet_name":    "Data",
        "col_cif":       "CIF",
        "col_branch":    "BRANCH",
        "col_balance":   "BALANCE",
        "col_date":      "DATE",
        "col_status":    "STATUS"
    }
    Path("config/config.json").write_text(
        json.dumps(cfg, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    # --- tao data.xlsx
    import pandas as pd, numpy as np
    n = 300
    branches = ["HN001", "HN002", "HCM001", "HCM002", "DN001", "CT001"]
    data = {
        "CIF":     [f"KH{i:04d}" for i in range(1, n + 1)],
        "BRANCH":  np.random.choice(branches, n),
        "BALANCE": np.random.randint(100_000_000, 20_000_000_000, n),
        "DATE":    pd.date_range("2024-01-01", periods=n, freq="D"),
        "STATUS":  np.random.choice(["Active", "Inactive"], n, p=[0.85, 0.15])
    }
    pd.DataFrame(data).to_excel("input/data.xlsx", sheet_name="Data", index=False)

    # --- tao template HTML
    template = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8"/>
  <title>Dashboard {{REPORT_DATE}}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 32px; background: #F4F8FF; }
    h1   { color: #00246B; }
    .kpi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:24px 0; }
    .kpi { background:#fff; border-radius:12px; padding:20px; border:1px solid #E0E8F6; }
    .kpi-label { font-size:12px; color:#6B7A99; font-weight:600; }
    .kpi-value { font-size:28px; font-weight:800; color:#00246B; margin-top:4px; }
    table { width:100%; border-collapse:collapse; background:#fff; border-radius:12px; }
    th,td { padding:12px 16px; text-align:left; border-bottom:1px solid #E0E8F6; }
    th { background:#00246B; color:#fff; font-size:13px; }
  </style>
</head>
<body>
  <h1>Bao cao ngay {{REPORT_DATE}}</h1>
  <div class="kpi-grid">
    <div class="kpi">
      <div class="kpi-label">Tong du no (VND)</div>
      <div class="kpi-value">{{TOTAL_BALANCE}}</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">Tong khach hang</div>
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
    Path("template/dashboard_template.html").write_text(template, encoding="utf-8")

    print("Da tao xong cac file mau:")
    print("  config/config.json")
    print("  input/data.xlsx  (300 dong)")
    print("  template/dashboard_template.html")
    print("\nBay gio co the chay: python 04_expert_automation.py")


# Bo comment dong duoi de tao file mau:
# create_sample_files()

# =============================================================
#  BAI TAP 1 — BASIC AUTOMATION
#  Python Foundation · Tu dong hoa bao cao
# =============================================================
#
#  YEU CAU:
#  Doc file Excel (input/data.xlsx), tinh tong BALANCE theo
#  BRANCH, sap xep giam dan va xuat ket qua ra file CSV.
#
#  INPUT : input/data.xlsx
#           - Sheet : "Data"
#           - Cot   : BRANCH (str), BALANCE (so)
#
#  OUTPUT: output/summary.csv
#           - Cot   : BRANCH, TOTAL_BALANCE
#           - Sap xep: TOTAL_BALANCE giam dan
#
#  4 CAU HOI TRUOC KHI VIET CODE:
#  1. Input la gi?    → file Excel, sheet "Data", 2 cot can thiet
#  2. Logic la gi?    → group by BRANCH, tinh sum(BALANCE)
#  3. Output la gi?   → CSV, 2 cot, sap xep giam dan
#  4. Co the sai gi?  → file khong ton tai, ten cot sai, BALANCE null
#
#  HUONG DAN:
#  - Dien code vao cac vi tri co comment "# TODO"
#  - Chay thu voi file data mau truoc khi test voi file that
#  - Kiem tra output bang cach mo file CSV sau khi chay
# =============================================================

import pandas as pd
from pathlib import Path

# --- khai bao duong dan
input_file  = Path("input/data.xlsx")
output_file = Path("output/summary.csv")


# TODO 1: Kiem tra file input co ton tai khong
#         Neu khong → raise FileNotFoundError voi thong bao ro rang
# Goi y: dung input_file.exists()


# TODO 2: Doc file Excel vao DataFrame
#         Goi y: pd.read_excel(..., sheet_name="Data")


# TODO 3: Kiem tra cac cot BRANCH va BALANCE co trong DataFrame khong
#         Neu thieu → raise ValueError liet ke cac cot bi thieu
#         Goi y: [c for c in required_cols if c not in df.columns]


# TODO 4: Tinh tong BALANCE theo BRANCH
#         - groupby BRANCH
#         - sum BALANCE → dat ten cot la TOTAL_BALANCE
#         - sort giam dan theo TOTAL_BALANCE
#         Goi y: df.groupby(...).agg(...).rename(...).sort_values(...)


# TODO 5: Tao thu muc output neu chua co, xuat ra CSV
#         - encoding: "utf-8-sig"  (Excel doc duoc tieng Viet)
#         - index=False
#         Goi y: output_file.parent.mkdir(parents=True, exist_ok=True)


# TODO 6: In thong bao hoan thanh voi so chi nhanh va duong dan output
#         Vi du: "Done — 5 chi nhanh, luu tai output/summary.csv"


# =============================================================
#  DU LIEU MAU DE TEST (chay thu khong can file Excel)
#  Bo comment phan nay de test nhanh, sau do dung file that
# =============================================================

# import io
# SAMPLE = """BRANCH,BALANCE
# HN001,5000000000
# HN001,3500000000
# HCM002,7200000000
# DN003,3100000000
# HCM002,500000000
# """
# df = pd.read_csv(io.StringIO(SAMPLE))
# input_file = None   # bo qua buoc kiem tra file

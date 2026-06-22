# =============================================================
#  BAI TAP 2 — INTERMEDIATE AUTOMATION
#  Python Foundation · Tu dong hoa bao cao
# =============================================================
#
#  YEU CAU:
#  Gom nhieu file Excel tu thu muc input/, loai trung theo CIF
#  (giu ban ghi co DATE moi nhat), tinh KPI theo BRANCH va
#  xuat ra file Excel co 2 sheet.
#
#  INPUT : thu muc input/  (nhieu file *.xlsx)
#           - Sheet : "Data"
#           - Cot   : CIF (str), BRANCH (str),
#                     BALANCE (so), DATE (ngay)
#
#  OUTPUT: output/combined_report.xlsx
#           - Sheet "Chi tiet"    : toan bo du lieu sau khi loai trung
#           - Sheet "KPI tong hop": BRANCH | SO_KH | TONG_DU_NO | DU_NO_TB
#
#  4 CAU HOI TRUOC KHI VIET CODE:
#  1. Input la gi?    → thu muc chua nhieu file Excel
#  2. Logic la gi?    → doc het, gom lai, loai trung CIF giu moi nhat,
#                       dem KH duy nhat va tinh tong/trung binh BALANCE
#  3. Output la gi?   → Excel 2 sheet
#  4. Co the sai gi?  → file rong, ten cot khac nhau, DATE sai format,
#                       CIF null, thu muc khong co file nao
#
#  HUONG DAN:
#  - Xu ly tung file trong try/except rieng → 1 file loi khong dung pipeline
#  - Ghi lai SOURCE_FILE de biet ban ghi den tu file nao
#  - Dung nunique() de dem KH, khong dung count()
# =============================================================

import pandas as pd
from pathlib import Path

input_dir   = Path("input")
output_file = Path("output/combined_report.xlsx")

required_cols = ["CIF", "BRANCH", "BALANCE", "DATE"]


# TODO 1: Lay danh sach tat ca file *.xlsx trong input_dir
#         Neu khong co file nao → raise FileNotFoundError
#         Goi y: list(input_dir.glob("*.xlsx"))


# TODO 2: Doc tung file, them cot SOURCE_FILE = ten file
#         Boc moi file trong try/except → in canh bao neu loi, tiep tuc
#         Gom tat ca DataFrame vao list frames[]
#         Goi y:
#           for f in all_files:
#               try:
#                   df_tmp = pd.read_excel(...)
#                   df_tmp["SOURCE_FILE"] = f.name
#                   frames.append(df_tmp)
#               except Exception as e:
#                   print(f"[WARN] {f.name}: {e}")


# TODO 3: Kiem tra frames co du lieu khong, sau do concat
#         Goi y: pd.concat(frames, ignore_index=True)


# TODO 4: Chuan hoa kieu du lieu
#         - BALANCE → numeric, errors="coerce", fillna(0)
#         - DATE    → datetime, errors="coerce"


# TODO 5: Loai trung theo CIF, giu ban ghi co DATE moi nhat
#         Goi y: sort_values("DATE", ascending=False)
#                .drop_duplicates(subset=["CIF"], keep="first")


# TODO 6: Tinh KPI theo BRANCH
#         - SO_KH      = nunique CIF
#         - TONG_DU_NO = sum BALANCE
#         - DU_NO_TB   = mean BALANCE
#         Lam tron 0 chu so thap phan, sort giam dan theo TONG_DU_NO
#         Goi y: groupby("BRANCH").agg(SO_KH=(...), ...).round(0)


# TODO 7: Xuat Excel 2 sheet bang ExcelWriter
#         Goi y:
#           with pd.ExcelWriter(output_file, engine="openpyxl") as writer:
#               df.to_excel(writer, sheet_name="Chi tiet", index=False)
#               kpi.to_excel(writer, sheet_name="KPI tong hop", index=False)


# TODO 8: In thong bao ket qua (so file doc duoc, so dong truoc/sau loai trung)


# =============================================================
#  DU LIEU MAU DE TEST
# =============================================================

# import io
# SAMPLE_1 = """CIF,BRANCH,BALANCE,DATE
# KH001,HN001,5000000000,2024-01-15
# KH002,HCM002,3000000000,2024-01-10
# KH001,HN001,4500000000,2024-01-20
# """
# SAMPLE_2 = """CIF,BRANCH,BALANCE,DATE
# KH003,DN003,2000000000,2024-01-12
# KH002,HCM002,3200000000,2024-01-18
# """
# frames = [
#     pd.read_csv(io.StringIO(SAMPLE_1)),
#     pd.read_csv(io.StringIO(SAMPLE_2)),
# ]
# df = pd.concat(frames, ignore_index=True)
# Ket qua mong muon sau loai trung: KH001 giu ban ghi 2024-01-20
#                                   KH002 giu ban ghi 2024-01-18

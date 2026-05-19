import os
import re
import json
import docx

folder_path = r"D:\khode\tailieu\50 De TL HN"

def get_solutions():
    for f in os.listdir(folder_path):
        if f.endswith(".docx") and "_converted_" in f:
            file_path = os.path.join(folder_path, f)
            doc = docx.Document(file_path)
            lines = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
            full_text = '\n'.join(lines)
            
            # Find where HƯỚNG DẪN starts
            match = re.search(r'(HƯỚNG DẪN|ĐÁP ÁN|LỜI GIẢI|ĐÁP SỐ)', full_text, flags=re.IGNORECASE)
            if match:
                solution_text = full_text[match.end():].strip()
                with open("D:\\khode\\sample_solution.txt", "w", encoding="utf-8") as out:
                    out.write(f"--- Solutions for {f} ---\n")
                    out.write(solution_text[:2000])
                break

get_solutions()

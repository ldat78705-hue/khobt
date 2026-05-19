import os
import re
import json
import docx

folder_path = r"D:\khode\tailieu\50 De TL HN"
output_data = []

def classify_topic(text):
    text = text.lower()
    if 'hệ phương trình' in text:
        return 'he_phuong_trinh'
    if 'rút gọn' in text and '\\sqrt' in text:
        return 'can_thuc'
    if 'rút gọn' in text or 'biểu thức' in text:
        return 'bieu_thuc'
    if 'vận tốc' in text or 'quãng đường' in text or 'thời gian' in text or 'chuyển động' in text or 'xe' in text:
        return 'chuyen_dong'
    if 'đường tròn' in text or 'tam giác' in text or 'tiếp tuyến' in text or 'nội tiếp' in text:
        return 'hinh_hoc'
    if 'x_1' in text and 'x_2' in text or 'phương trình' in text or 'vi-ét' in text or 'nghiệm' in text:
        return 'phuong_trinh'
    if 'giá trị lớn nhất' in text or 'giá trị nhỏ nhất' in text or '\\ge' in text or '\\le' in text or 'bất đẳng thức' in text:
        return 'bat_phuong_trinh'
    return 'khac'

def parse_docx(file_path):
    try:
        doc = docx.Document(file_path)
        lines = []
        for p in doc.paragraphs:
            text = p.text.strip()
            if not text:
                continue
            
            # Stop parsing when hitting Answer/Solution indicators
            upper = text.upper()
            if any(keyword in upper for keyword in ["ĐÁP ÁN", "HƯỚNG DẪN CHẤM", "LỜI GIẢI", "ĐÁP SỐ", "HƯỚNG DẪN GIẢI"]):
                break
            
            lines.append(text)
            
        full_text = '\n'.join(lines)
        
        # Split by "Câu X" or "Bài X" (support both digits and Roman numerals)
        parts = re.split(r'\n(?=(?:Câu|Bài)\s+(?:\d+|[IVX]+)\b)', full_text, flags=re.IGNORECASE)
        
        parsed = []
        for part in parts:
            part = part.strip()
            if re.match(r'^(?:Câu|Bài)\s+(?:\d+|[IVX]+)\b', part, flags=re.IGNORECASE):
                # Remove extra blank lines
                part = re.sub(r'\n\s*\n', '\n', part)
                topic = classify_topic(part)
                parsed.append({
                    "content": part,
                    "topic": topic
                })
        return parsed
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
        return []

for f in os.listdir(folder_path):
    if f.endswith(".docx") and "_converted_" in f:
        file_path = os.path.join(folder_path, f)
        questions = parse_docx(file_path)
        for q in questions:
            q["source_file"] = f
            output_data.append(q)

with open("D:\\khode\\import_50.json", "w", encoding="utf-8") as out_f:
    json.dump(output_data, out_f, ensure_ascii=False, indent=2)

print(f"Extracted {len(output_data)} questions.")

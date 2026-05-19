import os
import re
import json
import docx

folder_path = r"D:\khode\tailieu\ĐỀ THI LỚP 8"
output_data = []

for root, dirs, files in os.walk(folder_path):
    for f in files:
        if f.endswith(".docx") and "_converted_" in f:
            file_path = os.path.join(root, f)
            try:
                doc = docx.Document(file_path)
                text = '\n'.join([p.text for p in doc.paragraphs if p.text.strip()])
                
                # Split by "Câu X" or "Bài X"
                parts = re.split(r'\n(?=(?:Câu|Bài)\s+\d+)', text)
                
                for part in parts:
                    part = part.strip()
                    if part.startswith("Câu ") or part.startswith("Bài "):
                        # parse out question
                        output_data.append({
                            "source_file": f,
                            "content": part
                        })
            except Exception as e:
                print(f"Error parsing {file_path}: {e}")

with open("D:\\khode\\extracted_questions.json", "w", encoding="utf-8") as out_f:
    json.dump(output_data, out_f, ensure_ascii=False, indent=2)
print(f"Extracted {len(output_data)} questions.")

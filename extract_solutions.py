import os
import re
import json
import docx

folder_path = r"D:\khode\tailieu\50 De TL HN"

# Load the questions we imported
with open(r"D:\khode\import_50.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

# Build a dictionary to map normalized content to the question
q_map = {}
for q in questions:
    norm = re.sub(r'\s+', '', q['content']).lower()
    q_map[norm] = q

def normalize(text):
    return re.sub(r'\s+', '', text).lower()

updated_count = 0

for file_name in os.listdir(folder_path):
    if file_name.endswith(".docx") and "_converted_" in file_name:
        file_path = os.path.join(folder_path, file_name)
        doc = docx.Document(file_path)
        lines = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
        full_text = '\n'.join(lines)
        
        # Split into parts by Câu / Bài
        parts = re.split(r'\n(?=(?:Câu|Bài)\s+(?:\d+|[IVX]+)\b)', full_text, flags=re.IGNORECASE)
        
        for part in parts:
            part = part.strip()
            if not re.match(r'^(?:Câu|Bài)\s+(?:\d+|[IVX]+)\b', part, flags=re.IGNORECASE):
                continue
                
            # Look for solution indicator
            match = re.search(r'\n(Lời giải|Hướng dẫn giải|Đáp án|Hướng dẫn chấm)\s*\n', part, flags=re.IGNORECASE)
            if match:
                question_text = part[:match.start()].strip()
                solution_text = part[match.end():].strip()
                
                norm_q = normalize(question_text)
                if norm_q in q_map:
                    q_map[norm_q]['solution'] = solution_text
                    updated_count += 1
                else:
                    # try to find a substring match
                    for k, q in q_map.items():
                        if k in norm_q or norm_q in k:
                            if 'solution' not in q or not q['solution']:
                                q['solution'] = solution_text
                                updated_count += 1
                            break

with open(r"D:\khode\import_50_with_solutions.json", "w", encoding="utf-8") as f:
    json.dump(list(q_map.values()), f, ensure_ascii=False, indent=2)

print(f"Matched and extracted solutions for {updated_count} questions.")

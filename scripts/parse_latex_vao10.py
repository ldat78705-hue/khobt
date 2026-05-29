"""
Parse converted HTM files (MathType → LaTeX) from vao10 folder.
Extract questions + answers, convert to KaTeX-compatible LaTeX.
Output structured JSON ready for database insertion.
"""
import re
import os
import sys
import io
import json
from html.parser import HTMLParser
from html import unescape

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

class LaTeXHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paragraphs = []
        self.current_para = []
        self.in_para = False
        self.in_li = False
        self.in_style = False
        self.in_script = False

    def handle_starttag(self, tag, attrs):
        if tag == 'style': self.in_style = True; return
        if tag == 'script': self.in_script = True; return
        if tag in ('p', 'h1', 'h2', 'h3', 'h4'):
            self.in_para = True; self.current_para = []
        elif tag == 'li':
            self.in_li = True; self.current_para = []
        elif tag == 'br':
            if self.in_para or self.in_li: self.current_para.append('\n')
        elif tag == 'img':
            src = dict(attrs).get('src', '')
            if src and 'image' in src.lower():
                w = dict(attrs).get('width', '')
                h = dict(attrs).get('height', '')
                if self.in_para or self.in_li:
                    self.current_para.append(f'{{IMG:{src}|{w}x{h}}}')

    def handle_endtag(self, tag):
        if tag == 'style': self.in_style = False; return
        if tag == 'script': self.in_script = False; return
        if tag in ('p', 'h1', 'h2', 'h3', 'h4'):
            if self.in_para and self.current_para:
                text = ''.join(self.current_para).strip()
                if text: self.paragraphs.append(text)
            self.in_para = False; self.current_para = []
        elif tag == 'li':
            if self.in_li and self.current_para:
                text = '• ' + ''.join(self.current_para).strip()
                if text.strip() != '•': self.paragraphs.append(text)
            self.in_li = False; self.current_para = []

    def handle_data(self, data):
        if self.in_style or self.in_script: return
        if self.in_para or self.in_li:
            text = data.replace('\r\n', ' ').replace('\n', ' ')
            text = re.sub(r'\s+', ' ', text)
            if text.strip(): self.current_para.append(text)

    def handle_entityref(self, name):
        if self.in_para or self.in_li:
            self.current_para.append(unescape(f'&{name};'))

    def handle_charref(self, name):
        if self.in_para or self.in_li:
            self.current_para.append(unescape(f'&#{name};'))

    def handle_comment(self, data): pass


def parse_htm(filepath):
    for enc in ['windows-1258', 'cp1252', 'utf-8', 'latin-1']:
        try:
            with open(filepath, 'r', encoding=enc) as f: html = f.read()
            break
        except: continue

    # Remove MSO conditionals but keep ![if !vml] content
    html = re.sub(r'<!--\[if gte mso.*?\[endif\]-->', '', html, flags=re.DOTALL)
    html = re.sub(r'<!--\[if gte vml.*?\[endif\]-->', '', html, flags=re.DOTALL)
    html = re.sub(r'<!--\[if !mso\]>.*?<!\[endif\]-->', '', html, flags=re.DOTALL)
    html = re.sub(r'<!\[if !vml\]>', '', html)
    html = re.sub(r'<!\[endif\]>', '', html)
    html = re.sub(r'<o:p>.*?</o:p>', '', html, flags=re.DOTALL)
    html = re.sub(r'<a name=MT.*?</a>', '', html, flags=re.DOTALL)
    html = re.sub(r"<span style='mso-bookmark:.*?'></span>", '', html, flags=re.DOTALL)

    parser = LaTeXHTMLParser()
    parser.feed(html)
    return parser.paragraphs


def fix_latex(text):
    """Clean up LaTeX for KaTeX compatibility."""
    # Convert $...$ to \\(...\\) for inline math
    def replace_inline_math(m):
        latex = m.group(1).strip()
        # Fix common MathType → LaTeX issues
        latex = latex.replace('{{', '{').replace('}}', '}')
        # Fix \text{} → just text
        latex = re.sub(r'\\text\{([^}]*)\}', r'\1', latex)
        # Ensure proper fraction display
        latex = re.sub(r'\\tfrac', r'\\frac', latex)
        return f'\\\\({latex}\\\\)'
    
    # Replace $...$ but not $$...$$
    text = re.sub(r'(?<!\$)\$(?!\$)(.*?)\$(?!\$)', replace_inline_math, text)
    # Replace $$...$$ with display math
    text = re.sub(r'\$\$(.*?)\$\$', lambda m: f'\\\\[{m.group(1).strip().replace("{{","{").replace("}}","}")}\\\\]', text)
    
    return text


def group_questions_with_answers(paragraphs):
    """Group paragraphs into questions with answers. Handle multiple section formats."""
    questions = []
    current_q = None
    in_answer_section = False
    answer_map = {}
    current_answer_num = None

    bai_re = re.compile(r'^Bài\s+(\d+)[.:]?\s*(.*)', re.IGNORECASE)
    
    for para in paragraphs:
        # Detect answer sections
        if re.search(r'(ĐÁP\s+ÁN|HƯỚNG\s+DẪN\s+GIẢI|PHẦN\s+C)', para, re.IGNORECASE):
            in_answer_section = True
            if current_q:
                questions.append(current_q)
                current_q = None
            continue

        bai_m = bai_re.match(para)
        
        if bai_m:
            num = int(bai_m.group(1))
            content = bai_m.group(2).strip()
            
            if in_answer_section:
                current_answer_num = num
                answer_map[num] = content
            else:
                if current_q:
                    questions.append(current_q)
                current_q = {'bai_num': num, 'content': content, 'parts': []}
        else:
            if in_answer_section:
                if current_answer_num is not None:
                    answer_map[current_answer_num] += '\n' + para
            elif current_q:
                part_m = re.match(r'^([a-d])\)\s*(.*)', para)
                if part_m:
                    current_q['parts'].append(para)
                elif not re.match(r'^(PHẦN|DẠNG|Mục|Phương pháp|Yêu cầu)', para):
                    current_q['content'] += '\n' + para

    if current_q:
        questions.append(current_q)

    # Merge answers
    for q in questions:
        if q['bai_num'] in answer_map:
            q['answer'] = answer_map[q['bai_num']]
    
    return questions


# ===== MAIN =====
folder = r'D:\khode\tailieu\vao10'
files = [
    ('PBT Hinh khong gian 9 HN 2026_converted_130257.htm', 'hinh_khong_gian'),
    ('PBT Vi-et full_MathType_converted_131255.htm', 'viet'),
    ('PBT tong hop GBT lapPT-HPT Chi tiet_MathType_converted_131025.htm', 'lappt'),
]

all_results = {}

for fname, ftype in files:
    fpath = os.path.join(folder, fname)
    if not os.path.exists(fpath):
        print(f'SKIP: {fname} not found')
        continue

    paragraphs = parse_htm(fpath)
    questions = group_questions_with_answers(paragraphs)

    # Apply LaTeX fix
    for q in questions:
        q['content'] = fix_latex(q['content'])
        q['parts'] = [fix_latex(p) for p in q['parts']]
        if 'answer' in q:
            q['answer'] = fix_latex(q['answer'])

    all_results[ftype] = {
        'file': fname,
        'total_paragraphs': len(paragraphs),
        'total_questions': len(questions),
        'questions': questions,
    }

    has_answer = sum(1 for q in questions if q.get('answer'))
    has_latex = sum(1 for q in questions if '\\(' in q.get('content', '') or '$' in q.get('content', ''))
    has_img = sum(1 for q in questions if '{IMG:' in q.get('content', ''))
    print(f'{ftype}: {len(questions)} questions, {has_answer} with answers, {has_latex} with LaTeX, {has_img} with remaining images')

# Save
out = os.path.join(folder, 'parsed_latex_questions.json')
with open(out, 'w', encoding='utf-8') as f:
    json.dump(all_results, f, ensure_ascii=False, indent=2)

print(f'\nSaved to: {out}')

# Also save a readable preview
preview = os.path.join(folder, 'latex_preview.txt')
with open(preview, 'w', encoding='utf-8') as f:
    for ftype, data in all_results.items():
        f.write(f'\n{"="*100}\n')
        f.write(f'{ftype}: {data["file"]} — {data["total_questions"]} questions\n')
        f.write(f'{"="*100}\n\n')
        for q in data['questions']:
            f.write(f'--- Bài {q["bai_num"]} ---\n')
            f.write(f'NỘI DUNG: {q["content"]}\n')
            for p in q.get('parts', []):
                f.write(f'  {p}\n')
            if q.get('answer'):
                f.write(f'ĐÁP ÁN: {q["answer"][:500]}...\n' if len(q.get('answer',''))>500 else f'ĐÁP ÁN: {q.get("answer","")}\n')
            else:
                f.write('ĐÁP ÁN: [CHƯA CÓ]\n')
            f.write('\n')
print(f'Preview saved to: {preview}')

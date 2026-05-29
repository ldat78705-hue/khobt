"""
Parse HTM files exported from Word (with MathType images) into structured JSON.
Extracts text + math images, groups by question (Bài X).
"""
import re
import os
import sys
import json
import io
from html.parser import HTMLParser
from html import unescape

# Redirect stdout to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

class WordHTMLParser(HTMLParser):
    """Parse Word-exported HTML, extracting text and MathType image references."""
    
    def __init__(self):
        super().__init__()
        self.paragraphs = []
        self.current_para = []
        self.in_para = False
        self.in_li = False
        self.skip = False
        self.depth = 0
        self.bold = False
        self.italic = False
        self.in_style = False
        self.in_script = False
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        if tag == 'style':
            self.in_style = True
            return
        if tag == 'script':
            self.in_script = True
            return
            
        if tag in ('p', 'h1', 'h2', 'h3', 'h4'):
            self.in_para = True
            self.current_para = []
        elif tag == 'li':
            self.in_li = True
            self.current_para = []
        elif tag == 'br':
            if self.in_para or self.in_li:
                self.current_para.append('\n')
        elif tag == 'b':
            self.bold = True
        elif tag == 'i':
            self.italic = True
        elif tag == 'img':
            src = attrs_dict.get('src', '')
            if src and ('image' in src.lower() or 'equation' in src.lower()):
                width = attrs_dict.get('width', '')
                height = attrs_dict.get('height', '')
                if self.in_para or self.in_li:
                    self.current_para.append(f'{{IMG:{src}|{width}x{height}}}')
    
    def handle_endtag(self, tag):
        if tag == 'style':
            self.in_style = False
            return
        if tag == 'script':
            self.in_script = False
            return
            
        if tag in ('p', 'h1', 'h2', 'h3', 'h4'):
            if self.in_para and self.current_para:
                text = ''.join(self.current_para).strip()
                if text:
                    self.paragraphs.append(text)
            self.in_para = False
            self.current_para = []
        elif tag == 'li':
            if self.in_li and self.current_para:
                text = '• ' + ''.join(self.current_para).strip()
                if text.strip() != '•':
                    self.paragraphs.append(text)
            self.in_li = False
            self.current_para = []
        elif tag == 'b':
            self.bold = False
        elif tag == 'i':
            self.italic = False
    
    def handle_data(self, data):
        if self.in_style or self.in_script:
            return
        if self.in_para or self.in_li:
            text = data.replace('\r\n', ' ').replace('\n', ' ')
            text = re.sub(r'\s+', ' ', text)
            if text.strip():
                self.current_para.append(text)
    
    def handle_entityref(self, name):
        if self.in_para or self.in_li:
            char = unescape(f'&{name};')
            self.current_para.append(char)
    
    def handle_charref(self, name):
        if self.in_para or self.in_li:
            char = unescape(f'&#{name};')
            self.current_para.append(char)
    
    def handle_comment(self, data):
        pass


def parse_htm(filepath):
    """Parse a Word-exported HTM file."""
    for enc in ['windows-1258', 'cp1252', 'utf-8', 'latin-1']:
        try:
            with open(filepath, 'r', encoding=enc) as f:
                html = f.read()
            break
        except (UnicodeDecodeError, UnicodeError):
            continue
    
    # Remove MSO conditional comments but keep ![if !vml] img content
    html = re.sub(r'<!--\[if gte mso.*?\[endif\]-->', '', html, flags=re.DOTALL)
    html = re.sub(r'<!--\[if gte vml.*?\[endif\]-->', '', html, flags=re.DOTALL)
    html = re.sub(r'<!--\[if !mso\]>.*?<!\[endif\]-->', '', html, flags=re.DOTALL)
    html = re.sub(r'<!\[if !vml\]>', '', html)
    html = re.sub(r'<!\[endif\]>', '', html)
    html = re.sub(r'<o:p>.*?</o:p>', '', html, flags=re.DOTALL)
    html = re.sub(r'<a name=MT.*?</a>', '', html, flags=re.DOTALL)
    html = re.sub(r"<span style='mso-bookmark:.*?'></span>", '', html, flags=re.DOTALL)
    
    parser = WordHTMLParser()
    parser.feed(html)
    return parser.paragraphs


def group_questions(paragraphs, file_type):
    """Group paragraphs into questions with content + answer."""
    questions = []
    current_question = None
    in_answers = False
    answer_map = {}
    
    bai_pattern = re.compile(r'^(?:Bài\s+(\d+))[.:]\s*(.*)', re.IGNORECASE)
    
    for i, para in enumerate(paragraphs):
        # Check if entering answer section
        if re.search(r'(ĐÁP\s+ÁN|HƯỚNG\s+DẪN\s+GIẢI|PHẦN\s+C:?\s+HƯỚNG)', para, re.IGNORECASE):
            in_answers = True
            continue
        
        bai_match = bai_pattern.match(para)
        
        if bai_match:
            bai_num = int(bai_match.group(1))
            content = bai_match.group(2).strip()
            
            if in_answers:
                if bai_num not in answer_map:
                    answer_map[bai_num] = content
                else:
                    answer_map[bai_num] += '\n' + content
            else:
                if current_question:
                    questions.append(current_question)
                current_question = {
                    'bai_num': bai_num,
                    'content': content,
                    'parts': [],
                }
        else:
            if in_answers and answer_map:
                last_key = max(answer_map.keys())
                answer_map[last_key] += '\n' + para
            elif current_question and not in_answers:
                part_match = re.match(r'^([a-d])\)\s*(.*)', para)
                if part_match:
                    current_question['parts'].append(para)
                else:
                    current_question['content'] += '\n' + para
    
    if current_question:
        questions.append(current_question)
    
    for q in questions:
        bai_num = q['bai_num']
        if bai_num in answer_map:
            q['answer'] = answer_map[bai_num]
    
    return questions


# Process files
folder = r'D:\khode\tailieu\vao10'
results = {}

for fname in ['PBT Hinh khong gian 9 HN 2026.htm', 'PBT Vi-et full_MathType.htm']:
    fpath = os.path.join(folder, fname)
    if not os.path.exists(fpath):
        continue
    
    paragraphs = parse_htm(fpath)
    file_type = 'hinh_khong_gian' if 'Hinh khong gian' in fname else 'viet'
    questions = group_questions(paragraphs, file_type)
    
    results[fname] = {
        'total_paragraphs': len(paragraphs),
        'total_questions': len(questions),
        'questions': questions,
    }
    
    print(f'{fname}: {len(paragraphs)} paragraphs, {len(questions)} questions')
    for q in questions[:3]:
        print(f'  Bai {q["bai_num"]}: {q["content"][:100]}...')

# Check for 3rd file
lappt_htm = os.path.join(folder, 'PBT tong hop GBT lapPT-HPT Chi tiet_MathType.htm')
if os.path.exists(lappt_htm):
    paragraphs = parse_htm(lappt_htm)
    questions = group_questions(paragraphs, 'lappt')
    results['PBT tong hop GBT lapPT-HPT Chi tiet_MathType.htm'] = {
        'total_paragraphs': len(paragraphs),
        'total_questions': len(questions),
        'questions': questions,
    }
    print(f'PBT lapPT-HPT: {len(paragraphs)} paragraphs, {len(questions)} questions')
else:
    print(f'WARNING: PBT tong hop GBT lapPT-HPT not found as .htm')

# Save results
out_path = os.path.join(folder, 'parsed_questions.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f'\nSaved to: {out_path}')
for fname, data in results.items():
    qs = data['questions']
    has_answer = sum(1 for q in qs if q.get('answer'))
    has_img = sum(1 for q in qs if '{IMG:' in q.get('content', ''))
    print(f'  {fname}: {len(qs)} questions, {has_answer} with answers, {has_img} with formula images')


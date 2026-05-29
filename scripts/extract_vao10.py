"""
Extract text content from DOCX files in vao10 folder.
Preserves paragraph structure for manual review.
"""
import os
import sys

try:
    import docx
except ImportError:
    print("Installing python-docx...")
    os.system(f"{sys.executable} -m pip install python-docx")
    import docx

from docx.oxml.ns import qn
import json
import re

def get_paragraph_text_with_math(paragraph):
    """Extract text from paragraph, converting OMML math to a readable placeholder."""
    text_parts = []
    for child in paragraph._element:
        if child.tag == qn('w:r'):
            # Regular run
            t = child.find(qn('w:t'))
            if t is not None and t.text:
                text_parts.append(t.text)
        elif child.tag == qn('m:oMathPara') or child.tag == qn('m:oMath'):
            # Math element - extract text content
            math_text = extract_math_text(child)
            text_parts.append(math_text)
    
    # Also try standard text extraction as fallback
    if not text_parts and paragraph.text:
        return paragraph.text
    
    return ''.join(text_parts)


def extract_math_text(element):
    """Extract readable text from OMML math element."""
    parts = []
    for child in element.iter():
        if child.tag == qn('m:t') and child.text:
            parts.append(child.text)
        elif child.tag == qn('w:t') and child.text:
            parts.append(child.text)
    return ''.join(parts)


def extract_docx(filepath):
    """Extract all paragraphs from a docx file."""
    doc = docx.Document(filepath)
    paragraphs = []
    for para in doc.paragraphs:
        text = get_paragraph_text_with_math(para)
        if text.strip():
            paragraphs.append(text.strip())
    return paragraphs


folder = r"D:\khode\tailieu\vao10"
output = {}

for fname in os.listdir(folder):
    if fname.endswith('.docx') and not fname.startswith('~'):
        fpath = os.path.join(folder, fname)
        print(f"\n{'='*80}")
        print(f"FILE: {fname}")
        print(f"{'='*80}")
        
        try:
            paragraphs = extract_docx(fpath)
            output[fname] = paragraphs
            
            for i, p in enumerate(paragraphs):
                print(f"[{i:3d}] {p}")
        except Exception as e:
            print(f"ERROR: {e}")

# Save extracted data
out_path = r"D:\khode\tailieu\vao10\extracted_content.json"
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"\n\nSaved to: {out_path}")
print(f"Total files: {len(output)}")
for fname, paras in output.items():
    print(f"  {fname}: {len(paras)} paragraphs")

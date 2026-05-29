import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
d = json.load(open(r'D:\khode\tailieu\vao10\parsed_latex_questions.json', 'r', encoding='utf-8'))
for k, v in d.items():
    qs = v['questions']
    has_ans = sum(1 for q in qs if q.get('answer'))
    print(f'{k}: {v["total_questions"]} questions, {has_ans} with answers')
    for q in qs:
        a = 'YES' if q.get('answer') else 'NO'
        print(f'  Bai {q["bai_num"]}: ans={a}, parts={len(q.get("parts",[]))}, content_len={len(q["content"])}')

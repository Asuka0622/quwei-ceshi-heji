import json
from pathlib import Path

# 由 reviewed-people.json 生成网站使用的 dist/people.js。
# 结果页等前端代码在 dist/app.js 中直接维护，本脚本不再改写它。
# v 的八个维度顺序与 app.js 中 dimensions 一致：探索新鲜、分析问题、外向交流、计划有序、想象创造、专注深耕、进取抱负、坚守原则（5 分偏向前者）。
DIMENSIONS=8

root=Path(__file__).parent.parent
people=json.loads((root/'knowledge-base/reviewed-people.json').read_text(encoding='utf-8'))
assert len(people)==20 and len({p['name'] for p in people})==20
assert all(len(p['v'])==DIMENSIONS and all(1<=x<=5 for x in p['v']) and p['url'].startswith('https://') for p in people)
(root/'dist/people.js').write_text('const people = '+json.dumps(people,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
html=root/'dist/index.html'
s=html.read_text(encoding='utf-8')
if 'src="people.js"' not in s: s=s.replace('<script src="app.js"></script>','<script src="people.js"></script><script src="app.js"></script>')
html.write_text(s,encoding='utf-8')

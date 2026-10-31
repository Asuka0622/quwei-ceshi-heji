import json
import re
from pathlib import Path

# 由 reviewed-people.json 生成网站使用的 dist/people.js。
# 结果页等前端代码在 dist/app.js 中直接维护，本脚本不再改写它。
# v 的八个维度顺序与 app.js 中 dimensions 一致：探索新鲜、分析问题、外向交流、计划有序、想象创造、专注深耕、进取抱负、坚守原则（5 分偏向前者）。
DIMENSIONS=8

root=Path(__file__).parent.parent
people=json.loads((root/'knowledge-base/reviewed-people.json').read_text(encoding='utf-8'))
assert len({p['name'] for p in people})==len(people)
assert all(len(p['v'])==DIMENSIONS and all(1<=x<=5 for x in p['v']) and p['url'].startswith('https://') for p in people)
# 结果页会读取每位人物的经历和名言，缺一项页面就打不开，所以三份数据的人物必须一致。
names={p['name'] for p in people}
for data in ('stories.js','quotes.js'):
    found=set(re.findall(r"^ '([^']+)':\{",(root/'dist'/data).read_text(encoding='utf-8'),re.M))
    assert found==names,f'{data} 与人物库不一致：{sorted(found^names)}'
quote_dims=dict(re.findall(r"^ '([^']+)':\{d:(\d+)",(root/'dist/quotes.js').read_text(encoding='utf-8'),re.M))
assert all(p['v'][int(quote_dims[p['name']])]!=3 for p in people),'名言对应的维度不能是中性分 3'
(root/'dist/people.js').write_text('const people = '+json.dumps(people,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
html=root/'dist/index.html'
s=html.read_text(encoding='utf-8')
if 'src="people.js"' not in s: s=s.replace('<script src="app.js"></script>','<script src="people.js"></script><script src="app.js"></script>')
html.write_text(s,encoding='utf-8')

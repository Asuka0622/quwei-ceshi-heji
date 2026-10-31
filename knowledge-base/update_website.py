import json
from pathlib import Path

root=Path(__file__).parent.parent
people=json.loads((root/'knowledge-base/reviewed-people.json').read_text(encoding='utf-8'))
assert len(people)==20 and len({p['name'] for p in people})==20
assert all(len(p['v'])==4 and all(1<=x<=5 for x in p['v']) and p['url'].startswith('https://') for p in people)
(root/'dist/people.js').write_text('const people = '+json.dumps(people,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
html=root/'dist/index.html'
s=html.read_text(encoding='utf-8')
if 'src="people.js"' not in s: s=s.replace('<script src="app.js"></script>','<script src="people.js"></script><script src="app.js"></script>')
html.write_text(s,encoding='utf-8')
app=root/'dist/app.js'
s=app.read_text(encoding='utf-8')
start=s.index('// 人物画像')
end=s.index('let questions=',start)
s=s[:start]+s[end:]
start=s.index('function result()')
end=s.index('\nhome();',start)
result=r'''function result(){
 const totals=[0,0,0,0]; questions.forEach((q,i)=>{totals[q.d]+=[5,4,2,1][answers[i]]});
 const user=totals.map(x=>x/(questions.length/4));
 const ranked=people.map((p,order)=>({...p,order,distance:p.v.reduce((sum,n,i)=>sum+(n-user[i])**2,0)})).sort((a,b)=>a.distance-b.distance||a.order-b.order);
 const near=ranked[0], far=ranked[ranked.length-1];
 const dimensions=[['探索新鲜','偏向熟悉'],['分析问题','关注感受'],['外向交流','安静独处'],['计划有序','灵活应变']];
 const nameFor=(i,value)=>value>=3.5?dimensions[i][0]:value<=2.5?dimensions[i][1]:'两者之间';
 const similarities=near.v.map((v,i)=>({i,d:Math.abs(user[i]-v)})).sort((a,b)=>a.d-b.d||a.i-b.i).slice(0,2).map(x=>dimensions[x.i][0]+' / '+dimensions[x.i][1]).join('、');
 const contrasts=far.v.map((v,i)=>({i,d:Math.abs(user[i]-v)})).sort((a,b)=>b.d-a.d||a.i-b.i).slice(0,2).map(x=>dimensions[x.i][0]+' / '+dimensions[x.i][1]).join('、');
 lastResult={near,far};
 app.innerHTML=`<div class="page result"><button class="back" id="home">← 返回测试合集</button><div class="quiz-head"><div class="eyebrow">YOUR RESULT · ${questions.length} QUESTIONS</div><h1>跨越时空，遇见另一种自己。</h1><p>根据你的 ${questions.length} 个回答，在 20 位人物的趣味画像中进行比较。</p></div>
 <div class="result-grid"><article class="result-card"><small>✳ 画像与你更相近</small><h2>${near.name}</h2><strong>${near.title}</strong><p>你的回答与这份人物画像在「${similarities}」方面比较接近。</p><p><b>人物生平：</b>${near.fact}</p><a href="${near.url}" target="_blank" rel="noopener noreferrer">查看生平资料 ↗</a></article>
 <article class="result-card contrast"><small>✳ 画像与你差异较大</small><h2>${far.name}</h2><strong>${far.title}</strong><p>你的回答与这份人物画像在「${contrasts}」方面差异较大。</p><p><b>人物生平：</b>${far.fact}</p><a href="${far.url}" target="_blank" rel="noopener noreferrer">查看生平资料 ↗</a></article></div>
 <div class="dimensions"><h3>你的倾向地图</h3><p class="dim-intro">四个维度反映你在本次答题中的选择，没有好坏之分。</p>${dimensions.map((d,i)=>`<div class="dimension"><div class="dimension-row"><span>${d[0]}</span><span>${d[1]}</span></div><div class="scale"><span style="left:${(5-user[i])/4*100}%"></span></div><div class="dimension-caption">${nameFor(i,user[i])}</div></div>`).join('')}</div>
 <div class="rankings"><h3>还有这些相近的画像</h3><p>以下人物按本次测试中的画像距离排序。</p>${ranked.slice(1,3).map((p,i)=>`<div class="rank-row"><span>0${i+2}</span><div><b>${p.name}</b><small>${p.title}</small></div><a href="${p.url}" target="_blank" rel="noopener noreferrer">了解人物 ↗</a></div>`).join('')}</div>
 <p class="disclaimer">这是趣味探索：人物生平与编辑设定的人物画像是两回事。历史人物没有参与答题，画像不是对真实性格的测量；匹配只在本测试的 20 位人物中比较，分数相同时按人物库顺序展示。本测试未经科学验证，不构成心理评估或历史定论。</p>
 <div class="result-actions"><button class="primary" id="share">分享测试 <span>↗</span></button><button class="secondary" id="again">重新选择题量</button><button class="secondary" id="home2">返回合集</button></div><p class="notice" aria-live="polite" id="notice"></p></div>`;
 document.querySelector('#home').onclick=home;document.querySelector('#home2').onclick=home;document.querySelector('#again').onclick=chooseLength;
 document.querySelector('#share').onclick=async()=>{const data={title:'星笺 · 历史人物匹配测试',text:`我在星笺的趣味测试中匹配到了${near.name}，来看看你与哪位历史人物的画像更相近？`,url:location.href.split('#')[0]};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(data.text+' '+data.url);document.querySelector('#notice').textContent='分享内容和测试链接已复制。'}}catch(e){document.querySelector('#notice').textContent='可复制浏览器地址分享给朋友。'}};window.scrollTo(0,0)
}'''
s=s[:start]+result+s[end:]
app.write_text(s,encoding='utf-8')

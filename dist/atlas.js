// 图鉴：每个主题收录全部可能的结果，测出过的会点亮。记录只存在用户自己的浏览器里，读写失败时图鉴照常显示。
const atlasThemes=[['history','历史人物'],['boundary','边界感'],['ancient','穿越古代'],['talent','你的天赋']];
function atlasLoad(){try{return JSON.parse(localStorage.getItem('xingjian-atlas'))||{}}catch(e){return {}}}
// 同一项保留最高分；没有分数的主题记 1。
function atlasRecord(theme,key,score=1){try{const d=atlasLoad();d[theme]=d[theme]||{};d[theme][key]=Math.max(score,d[theme][key]||0);localStorage.setItem('xingjian-atlas',JSON.stringify(d))}catch(e){}}
function atlasShell(theme,body){show('atlas',`<div class="page page-wide atlas"><button class="back" data-home>← 返回测试合集</button><div class="quiz-head"><div class="eyebrow">THE COLLECTION</div><h1>星笺图鉴</h1><p>每个主题的全部结果都收在这里，你测出过的会被点亮。记录只保存在这台设备的浏览器里。</p></div><div class="compare atlas-tabs" role="group" aria-label="选择主题">${atlasThemes.map(([id,name])=>`<button class="chip${id===theme?' active':''}" data-theme="${id}" aria-pressed="${id===theme}">${name}</button>`).join('')}</div>${body}</div>`);app.querySelectorAll('[data-theme]').forEach(b=>b.onclick=()=>atlas(b.dataset.theme))}
function atlasProgress(met,total,unit,hint){return `<div class="atlas-progress"><div class="progress-meta"><span>${met?`已点亮${unit}`:hint}</span><span><b>${pad(met)}</b> / ${pad(total)}</span></div><div class="progress" role="progressbar" aria-label="图鉴进度" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${met}"><span style="width:${met/total*100}%"></span></div></div>`}
function atlas(theme='history'){
 const seen=atlasLoad()[theme]||{};
 if(theme==='history'){
  const met=people.filter(p=>seen[p.name]).length;
  atlasShell(theme,`${atlasProgress(met,people.length,'的人物','做完测试，与你最相近的人物会在这里点亮。')}<div class="atlas-grid">${people.map((p,i)=>`<button class="atlas-card${seen[p.name]?' met':''}" data-person="${i}">${portrait({...p,order:i},'avatar-xl')}<strong>${p.name}</strong><small>${p.title}</small><em>${seen[p.name]?`最高相近 ${seen[p.name]}%`:'尚未遇见'}</em></button>`).join('')}</div><div class="atlas-cta"><button class="primary" id="atlas-start">${met?'再测一次':'开始测试'} <span>→</span></button></div>`);
  app.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>atlasPerson(Number(b.dataset.person)));
  app.querySelector('#atlas-start').onclick=chooseLength;
 }else if(theme==='boundary'){
  const met=boundaryTypes.filter(t=>seen[t[0]]).length;
  atlasShell(theme,`${atlasProgress(met,boundaryTypes.length,'的类型','做完测试，你的相处类型会在这里点亮。')}<div class="atlas-types">${boundaryTypes.map(t=>`<article class="atlas-type${seen[t[0]]?' met':''}"><em>${seen[t[0]]?'已测出':'尚未测出'}</em><h3>${t[0]}</h3><p>${t[1]}</p><p class="atlas-tip"><b>可以留意</b>${t[2]}</p></article>`).join('')}</div><div class="atlas-cta"><button class="primary" id="atlas-start">${met?'再测一次':'开始测试'} <span>→</span></button></div>`);
  app.querySelector('#atlas-start').onclick=boundaryChoose;
 }else if(theme==='ancient'){
  const met=ancientRoles.filter(r=>seen[r.role]).length;
  atlasShell(theme,`${atlasProgress(met,ancientRoles.length,'的身份','做完测试，你的古代身份会在这里点亮。')}<div class="atlas-types">${ancientRoles.map(r=>`<article class="atlas-type${seen[r.role]?' met':''}"><em>${seen[r.role]?'已测出':'尚未测出'}</em><h3>${r.role}</h3><p>${r.text}</p><p class="atlas-tip"><b>关卡批语</b>${r.pass}</p></article>`).join('')}</div><div class="atlas-cta"><button class="primary" id="atlas-start">${met?'再测一次':'开始测试'} <span>→</span></button></div>`);
  app.querySelector('#atlas-start').onclick=ancientBag;
 }else{
  const met=talentTypes.filter(x=>seen[x.name]).length;
  atlasShell(theme,`${atlasProgress(met,talentTypes.length,'的天赋','做完测试，你最想靠近的天赋会在这里点亮。')}<div class="atlas-types">${talentTypes.map(x=>`<article class="atlas-type${seen[x.name]?' met':''}"><em>${seen[x.name]?'已测出':'尚未测出'}</em><h3>${x.name}</h3><p>${x.text}</p><p class="atlas-tip"><b>同样偏爱的人物</b>${x.person}，${x.why}。</p></article>`).join('')}</div><div class="atlas-cta"><button class="primary" id="atlas-start">${met?'再测一次':'开始测试'} <span>→</span></button></div>`);
  app.querySelector('#atlas-start').onclick=talentStart;
 }
}
function atlasPerson(i){
 const p={...people[i],order:i},q=quotes[p.name],score=(atlasLoad().history||{})[p.name],side=p.v[q.d]>=3?0:1;
 show('atlas-person',`<div class="page atlas-person"><button class="back" id="atlas-back">← 返回图鉴</button><article class="match atlas-detail">${portrait(p,'avatar-xl')}<div class="match-body"><span class="kicker">${score?`你测出过 · 最高相近 ${score}%`:'尚未遇见'}</span><div class="match-title"><h2>${p.name}</h2></div><strong class="role">${p.title}</strong></div></article><figure class="quote"><blockquote${q.kind==='fact'?' class="is-fact"':''}>${q.kind==='fact'?q.text:`「${q.text}」`}</blockquote><figcaption>${q.src}</figcaption><p><b>对应「${dimensions[q.d][side].replace(/^偏向/,'')}」</b>${traits[q.d][side]}。</p></figure><div class="fact"><b>${p.name}的经历</b><p>${stories[p.name].text}</p></div><section class="panel"><h3>画像设定</h3><p class="panel-intro">这是编辑根据公开生平设定的趣味解读，不是对真实性格的测量。</p>${dimensions.map((d,k)=>`<div class="dimension"><div class="dimension-row"><span>${d[0]}</span><span>${d[1]}</span></div><div class="scale"><span style="left:${(5-p.v[k])/4*100}%"></span></div><div class="dimension-caption">${p.v[k]===3?'两边比较平衡':traits[k][p.v[k]>3?0:1]}</div></div>`).join('')}</section><div class="quiz-actions"><button class="secondary" id="atlas-prev">← ${people[(i+people.length-1)%people.length].name}</button><button class="secondary" id="atlas-next">${people[(i+1)%people.length].name} →</button></div></div>`);
 app.querySelector('#atlas-back').onclick=()=>atlas('history');
 app.querySelector('#atlas-prev').onclick=()=>atlasPerson((i+people.length-1)%people.length);
 app.querySelector('#atlas-next').onclick=()=>atlasPerson((i+1)%people.length);
}

// 天赋二选一：20 组卡片，每组选更想做的一件事。8 种天赋各出现 5 次；结果反映这次的偏好，不是能力评估。
const talentTypes=[
 {name:'语言',text:'你喜欢把事情说清楚、说好听，一句话也愿意反复掂量。',person:'苏轼',why:'写诗、作文、作词都留下了名篇'},
 {name:'逻辑',text:'你看到一团乱麻就想理出头绪，弄明白为什么才舒服。',person:'牛顿',why:'用同一套定律解释了天上和地上的运动'},
 {name:'空间',text:'你脑子里常有一张图，东西该摆在哪儿、路怎么走，一看就有数。',person:'林徽因',why:'测绘古建筑，也投身建筑设计'},
 {name:'音律',text:'你对声音和节奏很敏感，一段旋律能在心里留很久。',person:'贝多芬',why:'听力衰退之后仍然坚持作曲'},
 {name:'身体',text:'你更相信亲手试一遍，动起来的时候想得最清楚。',person:'岳飞',why:'少年习武，以善骑射闻名'},
 {name:'人际',text:'你很留意人和人之间的气氛，也愿意花心思把大家连起来。',person:'郑和',why:'率领庞大船队远航，与沿途各国往来'},
 {name:'内省',text:'你常常回头看自己，心里的变化你比别人先知道。',person:'陶渊明',why:'辞官归田，把日常的心境写进诗里'},
 {name:'自然观察',text:'花草、天气和小动物总能吸引你，你能看见别人路过的细节。',person:'达尔文',why:'随贝格尔号环球考察，细致记录各地物种'}
];
const talentRounds=[
 [0,'为朋友写一段生日贺词',1,'帮朋友理清一笔算不明白的账'],
 [2,'照着地图自己找一条路',3,'跟着旋律哼一首新歌'],
 [4,'学一套新的舞蹈动作',5,'让一桌陌生人聊起来'],
 [6,'独自想清楚一件心事',7,'查查路边开的是什么花'],
 [0,'把一件小事讲得起承转合',2,'把乱糟糟的房间重新布局'],
 [1,'找出一段说法里的漏洞',3,'听出一首歌里藏着的伴奏'],
 [4,'打一场酣畅的球',6,'写一页只给自己看的日记'],
 [5,'调解两位朋友的小矛盾',7,'观察一窝蚂蚁怎么搬家'],
 [0,'给喜欢的歌重写一段歌词',3,'学一件新乐器'],
 [1,'解一道绕人的谜题',2,'用积木搭出脑子里的房子'],
 [4,'爬一座没爬过的山',7,'养活一盆难养的植物'],
 [5,'陪朋友聊到对方轻松一些',6,'一个人走一段路，理理这阵子的变化'],
 [0,'写一封让人记很久的信',4,'亲手做一件手工'],
 [1,'算清大家怎么分工最省事',5,'把大家的气氛带起来'],
 [2,'画一张公园的手绘地图',7,'记下今年第一声蝉鸣的日子'],
 [3,'给今天的心情配一首歌',6,'搞明白自己为什么突然不高兴'],
 [0,'把一部电影讲得让人想去看',7,'从云的样子猜明天的天气'],
 [1,'研究一款游戏最好的打法',4,'练一个投篮动作，直到手感对了'],
 [2,'给聚会设计座位和布置',5,'给聚会拉来几位有趣的新朋友'],
 [3,'跟着节拍敲一段桌子',6,'隔一阵子回头看看自己的变化']
];
let tAns=[],tIndex=0;
function talentStart(){tAns=Array(talentRounds.length).fill(null);tIndex=0;talentQuiz()}
function talentQuiz(){const r=talentRounds[tIndex];show('talent-quiz',stage('assets/talent-cover.webp',tIndex,talentRounds.length,100*(tIndex+1)/talentRounds.length,'fwd','哪件事你更想做？',[1,3].map((k,i)=>`<button class="duel-card${tAns[tIndex]===i?' selected':''}" data-tcard="${i}" aria-pressed="${tAns[tIndex]===i}">${r[k]}</button>`).join('<em aria-hidden="true">或</em>'),tIndex?'<button class="stage-back" id="t-back" aria-label="上一组">←</button>':'<button class="stage-back" data-home aria-label="返回首页">×</button>'));
 if(tIndex)app.querySelector('#t-back').onclick=()=>{tIndex--;talentQuiz()};
 app.querySelectorAll('[data-tcard]').forEach(b=>b.onclick=()=>talentPick(Number(b.dataset.tcard)))}
function talentPick(i){tAns[tIndex]=i;app.querySelectorAll('[data-tcard]').forEach((o,j)=>{o.classList.toggle('selected',j===i);o.setAttribute('aria-pressed',j===i)});clearTimeout(advanceTimer);advanceTimer=setTimeout(()=>{if(tIndex<talentRounds.length-1){tIndex++;talentQuiz()}else talentResult()},260)}
// 同分时按这次的答案决定先后：同样的答案结果不变，也不会总偏向某一种天赋。
function talentScore(ans){const s=talentTypes.map(()=>0);ans.forEach((a,k)=>s[talentRounds[k][a*2]]++);const seed=ans.reduce((n,a,k)=>n+a*(k+1),0),n=talentTypes.length;return {s,order:talentTypes.map((t,i)=>i).sort((x,y)=>s[y]-s[x]||(x+seed)%n-(y+seed)%n)}}
function talentStar(s){const c=160,R=108,pt=(i,r)=>{const a=-Math.PI/2+i*Math.PI/4;return [(c+Math.cos(a)*r).toFixed(1),(c+Math.sin(a)*r).toFixed(1)]};
 return `<svg class="talent-star" viewBox="0 0 320 320" role="img" aria-label="${talentTypes.map((t,i)=>t.name+s[i]).join('，')}">${[.5,1].map(f=>`<polygon points="${talentTypes.map((t,i)=>pt(i,R*f).join(',')).join(' ')}"/>`).join('')}${talentTypes.map((t,i)=>{const [x,y]=pt(i,R);return `<line x1="${c}" y1="${c}" x2="${x}" y2="${y}"/>`}).join('')}<polygon class="mine" points="${talentTypes.map((t,i)=>pt(i,8+(R-8)*s[i]/5).join(',')).join(' ')}"/>${talentTypes.map((t,i)=>{const [x,y]=pt(i,R+24);return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${t.name}</text>`}).join('')}</svg>`}
// 牌面上的星座：八种天赋是八颗星，偏爱越多离中心越远。
function talentGlyph(s){const c=120,pts=s.map((v,i)=>{const a=-Math.PI/2+i*Math.PI/4,r=26+v*17;return [c+Math.cos(a)*r,c+Math.sin(a)*r]});return `<svg class="tcard-glyph" viewBox="0 0 240 240" aria-hidden="true"><circle cx="120" cy="120" r="112"/><circle cx="120" cy="120" r="58"/><polygon points="${pts.map(p=>p.map(x=>x.toFixed(1)).join(',')).join(' ')}"/>${pts.map(p=>`<circle class="star" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4"/>`).join('')}</svg>`}
// 分享图：一张天赋牌。
async function drawTalentCard(canvas,{no,s,top}){const W=1080,H=1620,g=canvas.getContext('2d'),SERIF="'Xingjian Serif','Noto Serif SC','Songti SC',serif",GOLD='#d9bd7c',PALE='#efe7d2';canvas.width=W;canvas.height=H;try{await document.fonts.load(`600 40px "Xingjian Serif"`,top.map(t=>t.name).join(''))}catch(e){}
 const bg=g.createRadialGradient(W/2,560,80,W/2,700,1000);bg.addColorStop(0,'#26305a');bg.addColorStop(1,'#0b1024');g.fillStyle=bg;g.fillRect(0,0,W,H);
 let seed=s.reduce((a,v,i)=>a+v*(i+3),7);const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;for(let i=0;i<150;i++){g.fillStyle=`rgba(239,231,210,${.15+rnd()*.5})`;g.beginPath();g.arc(rnd()*W,rnd()*H,rnd()*2.4+.5,0,7);g.fill()}
 g.strokeStyle=GOLD;g.lineWidth=3;g.strokeRect(60,60,W-120,H-120);g.lineWidth=1;g.strokeRect(78,78,W-156,H-156);
 g.fillStyle=GOLD;g.font=`600 44px ${SERIF}`;g.textAlign='center';g.textBaseline='middle';g.fillText(no,W/2,150);
 const cx=W/2,cy=540,pts=s.map((v,i)=>{const a=-Math.PI/2+i*Math.PI/4,r=100+v*62;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r]});
 g.strokeStyle='rgba(217,189,124,.45)';g.lineWidth=2;[380,200].forEach(r=>{g.beginPath();g.arc(cx,cy,r,0,7);g.stroke()});
 g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fillStyle='rgba(217,189,124,.16)';g.fill();g.strokeStyle=GOLD;g.lineWidth=2.5;g.stroke();pts.forEach(p=>{g.fillStyle=PALE;g.shadowColor=GOLD;g.shadowBlur=22;g.beginPath();g.arc(p[0],p[1],9,0,7);g.fill()});g.shadowBlur=0;
 g.fillStyle='rgba(239,231,210,.8)';g.font=`400 32px ${SERIF}`;g.fillText('我最想靠近的天赋',W/2,1000);g.fillStyle=PALE;g.font=`600 ${top[0].name.length>2?104:136}px ${SERIF}`;g.fillText(top[0].name,W/2,1110);
 g.fillStyle='rgba(239,231,210,.85)';g.font=`400 30px ${SERIF}`;drawWrapped(g,top[0].text,W/2,1230,760,48);
 g.fillStyle=GOLD;g.font=`600 36px ${SERIF}`;g.fillText(`其次 · ${top[1].name} · ${top[2].name}`,W/2,1400);
 g.fillStyle='rgba(239,231,210,.6)';g.font=`400 24px ${SERIF}`;g.fillText('星笺 · 你身上藏着什么天赋？',W/2,H-110)}
function talentResult(){const {s,order}=talentScore(tAns),top=order.slice(0,3).map(i=>talentTypes[i]);atlasRecord('talent',top[0].name,s[order[0]]);
 const no=['I','II','III','IV','V','VI','VII','VIII'][order[0]];
 show('talent-result',deck([['天赋牌',`<article class="tcard"><span class="tcard-no">${no}</span>${talentGlyph(s)}<small>你最想靠近的天赋</small><h1>${top[0].name}</h1><p>${top[0].text}</p></article>`],['星图',`<section class="panel talent-map"><h3>你的天赋星图</h3>${talentStar(s)}</section><section class="panel"><h3>你的前三项</h3>${top.map((t,k)=>{const i=people.findIndex(p=>p.name===t.person);return `<div class="talent-row">${portrait({...people[i],order:i},'avatar-sm')}<div><strong>${k+1}. ${t.name}</strong><p>${k?t.text+' ':''}同样偏爱这件事的人物：${t.person}，${t.why}。</p></div></div>`}).join('')}</section><section class="panel share-slide"><div class="result-actions"><button class="primary" id="tshare">分享结果</button><button class="secondary" id="tagain">再测一次</button><button class="secondary" id="tatlas">查看图鉴</button><button class="secondary" data-home>回到首页</button></div><p class="notice" id="notice" aria-live="polite"></p><p class="disclaimer">这只反映这次你更想做哪件事，不是能力或智力评估。人物只用来帮助联想，他们并未答题。</p></section>`]],'<button class="top-share" id="top-share">分享</button>'));bindDeck();
 const shareIt=()=>openShareCard({draw:cv=>drawTalentCard(cv,{no,s,top}),wait:'正在翻开你的天赋牌…',alt:'我的天赋牌：测试结果分享图',file:'星笺-我的天赋牌.png',text:`我最想靠近的天赋是「${top[0].name}」，其次是${top[1].name}和${top[2].name}。你呢？`});app.querySelector('#tshare').onclick=shareIt;app.querySelector('#top-share').onclick=shareIt;
 app.querySelector('#tagain').onclick=talentStart;app.querySelector('#tatlas').onclick=()=>atlas('talent')}
document.addEventListener('keydown',e=>{if(view!=='talent-quiz'||e.ctrlKey||e.metaKey||e.altKey)return;const i='12'.indexOf(e.key);if(i>=0)talentPick(i)});

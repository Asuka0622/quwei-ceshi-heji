// 穿越古代：先选 3 件随身物品（每件 2 分），再答 4 个路上的情境（每题 1 分），得分最高的身份即结果。身份均为虚构设定。
const ancientRoles=[
 {item:'剑',role:'游侠',text:'你习惯走到哪儿算哪儿，遇到看不过去的事也不太会绕开。',pass:'此人行踪不定，所到之处常有人道谢，也常有人躲着走。',mate:3},
 {item:'算盘',role:'行商',text:'你走到哪儿都在看什么贵、什么缺，一条路在你眼里也是一门生意。',pass:'此人账目清楚，过关时请核对货物，也请小心被他说动。',mate:5},
 {item:'毛笔',role:'史官',text:'你总想把看到的事记下来，觉得今天的小事过些年也许就是大事。',pass:'此人一路都在写，与之交谈前请想好是否愿意被记上一笔。',mate:0},
 {item:'药囊',role:'游医',text:'你对身边人的不舒服格外敏感，到一个地方先认当地的草药。',pass:'此人沿途行医，各处驿站若有病人，可请其看一看。',mate:0},
 {item:'琵琶',role:'乐师',text:'你靠声音记住一座城，走到哪儿都能和陌生人凑出一支曲子。',pass:'此人携琵琶一面，夜间弹奏请先问过邻房。',mate:7},
 {item:'舆图',role:'行旅人',text:'你对没去过的地方总是好奇，地图上的空白比目的地更吸引你。',pass:'此人只为看路而来，若问他要去哪里，答案每天不同。',mate:1},
 {item:'官印',role:'县令',text:'你一到人多的地方，就会开始想这事该谁负责、怎么安排。',pass:'此人公务在身，沿途若有纠纷，他多半已经在调解了。',mate:2},
 {item:'酒壶',role:'酒肆主人',text:'你身边总能聚起一桌人，南来北往的消息也都从你这里过。',pass:'此人所到之处很快便有酒局，关卡守卒请当值时勿饮。',mate:4},
 {item:'刻刀',role:'匠人',text:'你看见东西坏了就手痒，比起说清楚道理，更愿意动手做出来。',pass:'此人携工具若干，并非凶器，如有桥坏屋漏可就近相求。',mate:6}
];
// 情境的 r 是每个选项对应的身份序号。
const ancientScenes=[
 {q:'城门口，守卒拦下你盘问来路。你会？',a:['递上一杯酒，先聊两句','拿出账本，说明是来做生意的','摊开舆图，说清要走哪条路','报上师承，写一段文书给他看'],r:[7,1,5,2]},
 {q:'客栈半夜有人喊肚子疼。你会？',a:['下楼找掌柜，把人手安排开','起身看看，翻一翻药囊','先守住门口，免得有人趁乱','拨几下弦，让大家定定神'],r:[6,3,0,4]},
 {q:'路遇一座断桥，对岸也有人等着过河。你会？',a:['算算摆渡一趟能收几文','找些木料，动手修','绕路走，顺便看看上游','召集两岸的人，商量谁出钱出力'],r:[1,8,5,6]},
 {q:'旅途最后一晚。你会？',a:['开一坛酒，请同行的人都喝一杯','把这一路写下来','再练一遍路上学的曲子','修一修用旧了的工具'],r:[7,2,4,8]}
];
let aPicks=[],aAns=[],aIndex=0;
function ancientBag(){aPicks=[];show('ancient-bag',`<div class="stage"><div class="stage-art"><img src="assets/ancient-cover.webp" alt="" decoding="async"><button class="stage-back" data-home aria-label="返回首页">×</button></div><div class="question fwd"><h2>明天一早出发，行囊只装得下 3 件。</h2><div class="bag-grid">${ancientRoles.map((r,i)=>`<button class="bag-item" data-item="${i}" aria-pressed="false"><i>${r.item[0]}</i>${r.item}</button>`).join('')}</div></div><div class="bag-actions"><span id="bag-hint">还差 3 件</span><span class="bag-count"><b id="bag-count">0</b> / 3</span><button class="primary" id="bag-next" disabled>收好出发</button></div></div>`);
 app.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.item),at=aPicks.indexOf(i);if(at>=0)aPicks.splice(at,1);else if(aPicks.length<3)aPicks.push(i);else{app.querySelector('#bag-hint').textContent='行囊满了，先放回一件';return}
  app.querySelectorAll('[data-item]').forEach(x=>{const on=aPicks.includes(Number(x.dataset.item));x.classList.toggle('selected',on);x.setAttribute('aria-pressed',on)});app.querySelector('#bag-count').textContent=aPicks.length;app.querySelector('#bag-hint').textContent=aPicks.length<3?`还差 ${3-aPicks.length} 件`:'行囊收好了';app.querySelector('#bag-next').disabled=aPicks.length<3});
 app.querySelector('#bag-next').onclick=()=>{aAns=Array(ancientScenes.length).fill(null);aIndex=0;ancientQuiz()}}
function ancientQuiz(){const s=ancientScenes[aIndex];show('ancient-quiz',stage('assets/ancient-cover.webp',aIndex,ancientScenes.length,100*(aIndex+1)/ancientScenes.length,'fwd',s.q,s.a.map((x,i)=>`<button class="option${aAns[aIndex]===i?' selected':''}" data-aopt="${i}" style="--i:${i}" aria-pressed="${aAns[aIndex]===i}">${x}</button>`).join(''),`<button class="stage-back" id="a-back" aria-label="${aIndex?'上一个路口':'重新收拾行囊'}">←</button>`));
 app.querySelector('#a-back').onclick=()=>{if(aIndex){aIndex--;ancientQuiz()}else ancientBag()};
 app.querySelectorAll('[data-aopt]').forEach(b=>b.onclick=()=>ancientPick(Number(b.dataset.aopt)))}
function ancientPick(i){aAns[aIndex]=i;app.querySelectorAll('[data-aopt]').forEach((o,j)=>{o.classList.toggle('selected',j===i);o.setAttribute('aria-pressed',j===i)});clearTimeout(advanceTimer);advanceTimer=setTimeout(()=>{if(aIndex<ancientScenes.length-1){aIndex++;ancientQuiz()}else ancientResult()},320)}
// 同分时优先先放进行囊的物品，其次按身份顺序。
function ancientScore(picks,ans){const s=ancientRoles.map(()=>0);picks.forEach(i=>s[i]+=2);ans.forEach((a,k)=>s[ancientScenes[k].r[a]]++);return ancientRoles.map((r,i)=>i).sort((x,y)=>s[y]-s[x]||(picks.indexOf(x)+1||9)-(picks.indexOf(y)+1||9)||x-y)[0]}
function ancientResult(){const r=ancientRoles[ancientScore(aPicks,aAns)],mate=ancientRoles[r.mate];atlasRecord('ancient',r.role);
 show('ancient-result',deck([['文牒',`${resultHero('assets/ancient-cover.webp','持牒人身份',r.role,r.text)}<section class="panel pass"><span class="seal" aria-hidden="true">准予<br>通行</span><dl><dt>随身之物</dt><dd>${aPicks.map(i=>ancientRoles[i].item).join('、')}</dd><dt>关卡批语</dt><dd>${r.pass}</dd><dt>宜同行者</dt><dd>${mate.role}</dd></dl></section><section class="panel share-slide"><div class="result-actions"><button class="primary" id="ashare">分享我的文牒</button><button class="secondary" id="aagain">重新收拾行囊</button><button class="secondary" id="aatlas">查看图鉴</button><button class="secondary" data-home>回到首页</button></div><p class="notice" id="notice" aria-live="polite"></p><p class="disclaimer">纯属趣味想象，身份和文牒都是虚构的，不是历史考证或性格评估。</p></section>`]]));bindDeck();
 app.querySelector('#ashare').onclick=shareLink({title:'星笺 · 穿越古代',text:`穿越到古代，我的文牒上写着「${r.role}」，行囊里装着${aPicks.map(i=>ancientRoles[i].item).join('、')}。你会是什么身份？`,url:location.href.split('#')[0]},'分享内容和测试链接已复制。');
 app.querySelector('#aagain').onclick=ancientBag;app.querySelector('#aatlas').onclick=()=>atlas('ancient')}
document.addEventListener('keydown',e=>{if(view!=='ancient-quiz'||e.ctrlKey||e.metaKey||e.altKey)return;const i='1234'.indexOf(e.key);if(i>=0)ancientPick(i)});

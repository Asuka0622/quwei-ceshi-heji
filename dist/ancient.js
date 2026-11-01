// 穿越古代：先选 3 件随身物品（每件 2 分），再答 4 个路上的情境（每题 1 分），得分最高的身份即结果。身份均为虚构设定。
const ancientRoles=[
 {item:'剑',role:'游侠',day:'天亮前就上路，午后在茶棚听人诉苦，傍晚已经在替人讨公道。',good:'说走就走，遇事敢出头。',trap:'帮完人才发现，自己的盘缠见底了。',text:'你习惯走到哪儿算哪儿，遇到看不过去的事也不太会绕开。',pass:'此人行踪不定，所到之处常有人道谢，也常有人躲着走。',mate:3},
 {item:'算盘',role:'行商',day:'早市看货，午后议价，夜里在灯下把账算到最后一文。',good:'看一眼就知道什么东西在哪里值钱。',trap:'有时候连交朋友，都会先算一笔账。',text:'你走到哪儿都在看什么贵、什么缺，一条路在你眼里也是一门生意。',pass:'此人账目清楚，过关时请核对货物，也请小心被他说动。',mate:5},
 {item:'毛笔',role:'史官',day:'白天四处打听，晚上誊抄；一件小事要问三个人才肯落笔。',good:'记性好、有耐心，不轻信一面之词。',trap:'写得太入迷，常常错过眼前的热闹。',text:'你总想把看到的事记下来，觉得今天的小事过些年也许就是大事。',pass:'此人一路都在写，与之交谈前请想好是否愿意被记上一笔。',mate:0},
 {item:'药囊',role:'游医',day:'每到一村先认草药，再看病人，诊金常常是一篮鸡蛋。',good:'细心，能从脸色看出别人哪里不舒服。',trap:'总先照顾别人，自己累了也不说。',text:'你对身边人的不舒服格外敏感，到一个地方先认当地的草药。',pass:'此人沿途行医，各处驿站若有病人，可请其看一看。',mate:0},
 {item:'琵琶',role:'乐师',day:'上午调弦，下午在街头试新曲，晚上被请进酒楼。',good:'耳朵灵，很快就能和陌生人合上拍子。',trap:'听见好曲子就跟着走，常常走错路。',text:'你靠声音记住一座城，走到哪儿都能和陌生人凑出一支曲子。',pass:'此人携琵琶一面，夜间弹奏请先问过邻房。',mate:7},
 {item:'舆图',role:'行旅人',day:'天一亮就看舆图，专挑没走过的岔路，夜里把新路画上去。',good:'认路、胆大，到哪儿都能安顿下来。',trap:'总想着下一站，很少在一个地方久留。',text:'你对没去过的地方总是好奇，地图上的空白比目的地更吸引你。',pass:'此人只为看路而来，若问他要去哪里，答案每天不同。',mate:1},
 {item:'官印',role:'县令',day:'上午升堂断案，下午巡视仓廪，傍晚还要调解两家的田界。',good:'能把一团乱的事理出头绪、分好工。',trap:'出门游玩，也忍不住替大家安排。',text:'你一到人多的地方，就会开始想这事该谁负责、怎么安排。',pass:'此人公务在身，沿途若有纠纷，他多半已经在调解了。',mate:2},
 {item:'酒壶',role:'酒肆主人',day:'清早开门备酒，午后听南来北往的消息，打烊时全城的事都知道了。',good:'记得每位客人的口味，三句话就能让人打开话匣子。',trap:'秘密听得太多，有时也不知道该不该说。',text:'你身边总能聚起一桌人，南来北往的消息也都从你这里过。',pass:'此人所到之处很快便有酒局，关卡守卒请当值时勿饮。',mate:4},
 {item:'刻刀',role:'匠人',day:'天亮生炉开工，一件东西改了又改，到天黑才肯放下。',good:'手巧，坏了的东西到你手里都有救。',trap:'修得太投入，饭凉了也想不起来。',text:'你看见东西坏了就手痒，比起说清楚道理，更愿意动手做出来。',pass:'此人携工具若干，并非凶器，如有桥坏屋漏可就近相求。',mate:6}
];
// 情境的 r 是每个选项对应的身份序号。
const ancientScenes=[
 {q:'城门口，守卒拦下你盘问来路。你会？',a:['递上一杯酒，先聊两句','拿出账本，说明是来做生意的','摊开舆图，说清要走哪条路','报上师承，写一段文书给他看'],r:[7,1,5,2]},
 {q:'客栈半夜有人喊肚子疼。你会？',a:['下楼找掌柜，把人手安排开','起身看看，翻一翻药囊','先守住门口，免得有人趁乱','拨几下弦，让大家定定神'],r:[6,3,0,4]},
 {q:'路遇一座断桥，对岸也有人等着过河。你会？',a:['算算摆渡一趟能收几文','找些木料，动手修','绕路走，顺便看看上游','召集两岸的人，商量谁出钱出力'],r:[1,8,5,6]},
 {q:'渡口的船已经坐满，船夫不肯开船。你会？',a:['替大家重新算船资，再和船夫谈','先看看有没有人晕船不适','补一补船舷，让船更稳当些','让老人孩子先上，自己等下一班'],r:[1,3,8,0]},
 {q:'集市上有人吵起来，说买到了假药。你会？',a:['把两边的说法都记下来','拉开两人，不让他们动手','拿起药闻一闻，辨一辨真假','请双方到官府说个明白'],r:[2,0,3,6]},
 {q:'山道上遇到一伙拦路的人。你会？',a:['挡在同伴前面，看对方想干什么','掏出酒来，请他们坐下喝一杯','指一条小路，带大家绕过去','问问要多少，谈个价钱'],r:[0,7,5,1]},
 {q:'雨夜困在驿站，一屋子人闲得发慌。你会？',a:['排好谁守夜，谁看行李','讲讲这一路听来的故事','修好吱呀作响的门窗','弹一曲给大家解闷'],r:[6,2,8,4]},
 {q:'旅途最后一晚。你会？',a:['开一坛酒，请同行的人都喝一杯','把这一路写下来','再练一遍路上学的曲子','修一修用旧了的工具'],r:[7,2,4,8]}
];
let aPicks=[],aAns=[],aIndex=0;
function ancientBag(){aPicks=[];show('ancient-bag',`<div class="trunk"><button class="stage-back" data-home aria-label="返回首页">×</button><header class="trunk-head"><small>启程前夜</small><h1>行囊只装得下三样</h1></header><div class="trunk-slots" id="bag-slots">${[0,1,2].map(()=>'<span class="trunk-slot"></span>').join('')}</div><div class="bag-grid">${ancientRoles.map((r,i)=>`<button class="bag-item" data-item="${i}" aria-pressed="false"><i>${r.item[0]}</i>${r.item}</button>`).join('')}</div><div class="trunk-foot"><span id="bag-hint">还差 3 件</span><button class="primary" id="bag-next" disabled>收好出发</button></div></div>`);
 app.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.item),at=aPicks.indexOf(i);if(at>=0)aPicks.splice(at,1);else if(aPicks.length<3)aPicks.push(i);else{app.querySelector('#bag-hint').textContent='行囊满了，先放回一件';return}
  app.querySelectorAll('[data-item]').forEach(x=>{const on=aPicks.includes(Number(x.dataset.item));x.classList.toggle('selected',on);x.setAttribute('aria-pressed',on)});app.querySelectorAll('.trunk-slot').forEach((slot,k)=>{const r=ancientRoles[aPicks[k]];slot.textContent=r?r.item[0]:'';slot.classList.toggle('full',!!r)});app.querySelector('#bag-hint').textContent=aPicks.length<3?`还差 ${3-aPicks.length} 件`:'行囊收好了';app.querySelector('#bag-next').disabled=aPicks.length<3});
 app.querySelector('#bag-next').onclick=()=>{aAns=Array(ancientScenes.length).fill(null);aIndex=0;ancientQuiz()}}
const ancientStops=['城门','客栈','断桥','渡口','市集','山道','驿站','末夜'];
function ancientQuiz(){const s=ancientScenes[aIndex];show('ancient-quiz',`<div class="road"><button class="stage-back" id="a-back" aria-label="${aIndex?'上一个路口':'重新收拾行囊'}">←</button><ol class="road-map">${ancientStops.map((x,i)=>`<li class="${i<aIndex?'past':i===aIndex?'now':''}"><i></i>${x}</li>`).join('')}</ol><div class="road-pack">行囊：${aPicks.map(i=>ancientRoles[i].item).join(' · ')}</div><h2 class="road-q">${s.q}</h2><div class="options road-options">${s.a.map((x,i)=>`<button class="option${aAns[aIndex]===i?' selected':''}" data-aopt="${i}" style="--i:${i}" aria-pressed="${aAns[aIndex]===i}">${x}</button>`).join('')}</div></div>`);
 app.querySelector('#a-back').onclick=()=>{if(aIndex){aIndex--;ancientQuiz()}else ancientBag()};
 app.querySelectorAll('[data-aopt]').forEach(b=>b.onclick=()=>ancientPick(Number(b.dataset.aopt)))}
function ancientPick(i){aAns[aIndex]=i;app.querySelectorAll('[data-aopt]').forEach((o,j)=>{o.classList.toggle('selected',j===i);o.setAttribute('aria-pressed',j===i)});clearTimeout(advanceTimer);advanceTimer=setTimeout(()=>{if(aIndex<ancientScenes.length-1){aIndex++;ancientQuiz()}else ancientResult()},320)}
// 同分时优先先放进行囊的物品，其次按身份顺序。
function ancientScore(picks,ans){const s=ancientRoles.map(()=>0);picks.forEach(i=>s[i]+=2);ans.forEach((a,k)=>s[ancientScenes[k].r[a]]++);return ancientRoles.map((r,i)=>i).sort((x,y)=>s[y]-s[x]||(picks.indexOf(x)+1||9)-(picks.indexOf(y)+1||9)||x-y)[0]}
// 分享图：竖排文牒，右起第一列是标题，朱印压在左下。
async function drawPermit(canvas,{role,items,pass,mate}){const W=1080,H=1620,g=canvas.getContext('2d'),SERIF="'Xingjian Serif','Noto Serif SC','Songti SC',serif",INK='#2a2118',SEAL='#a4412c';canvas.width=W;canvas.height=H;try{await document.fonts.load(`600 40px "Xingjian Serif"`,role+'通关文牒')}catch(e){}
 g.fillStyle='#2b2017';g.fillRect(0,0,W,H);g.fillStyle='#e9dcc0';g.fillRect(70,70,W-140,H-140);g.strokeStyle=INK;g.lineWidth=5;g.strokeRect(100,100,W-200,H-250);g.lineWidth=1.5;g.strokeRect(112,112,W-224,H-274);
 const col=(text,x,size,top=170,color=INK,font=`400 ${size}px ${SERIF}`,max=1180)=>{const step=size*1.16,per=Math.floor(max/step),chars=[...text.replace(/[，。、]/g,' ')];g.fillStyle=color;g.font=font;g.textAlign='center';g.textBaseline='middle';let cx=x,lines=0;for(let k=0;k<chars.length;k+=per){chars.slice(k,k+per).forEach((ch,i)=>g.fillText(ch,cx,top+i*step));cx-=size+22;lines++}return cx};
 let x=W-190;g.strokeStyle='rgba(42,33,24,.32)';g.lineWidth=1.5;for(let lx=W-240;lx>120;lx-=120){if(lx<W-112){g.beginPath();g.moveTo(lx,112);g.lineTo(lx,H-162);g.stroke()}}
 col('通关文牒',x,76,190,INK,`600 76px ${SERIF}`);x-=120;col('持牒人身份',x,38,180);x-=120;col(role,x,role.length>3?96:120,200,SEAL,`600 ${role.length>3?96:120}px ${SERIF}`);x-=150;col('随身携带'+items,x,38,180);x-=120;x=col(pass,x,36,180,INK,`400 36px ${SERIF}`,1120);x-=98;col('宜与'+mate+'同行',x,36,180);
 g.save();g.translate(240,1200);g.rotate(-.1);g.fillStyle='rgba(164,65,44,.9)';g.fillRect(-92,-92,184,184);g.fillStyle='#f3e8d2';g.font=`600 54px ${SERIF}`;g.textAlign='center';g.textBaseline='middle';g.fillText('准予',0,-32);g.fillText('通行',0,36);g.restore();
 g.fillStyle='#6c6252';g.font=`400 26px ${SERIF}`;g.textAlign='center';g.textBaseline='middle';g.fillText('星笺 · 穿越古代，你会是什么身份？',W/2,H-110)}
function ancientResult(){const r=ancientRoles[ancientScore(aPicks,aAns)],mate=ancientRoles[r.mate];atlasRecord('ancient',r.role);
 const items=aPicks.map(i=>ancientRoles[i].item).join('、');
 show('ancient-result',deck([['文牒',`<article class="permit"><div class="permit-sheet"><div class="permit-col permit-title">通关文牒</div><div class="permit-col">持牒人身份</div><div class="permit-col permit-role">${r.role}</div><div class="permit-col">随身携带${items}</div><div class="permit-col">${r.pass}</div><div class="permit-col">宜与${mate.role}同行</div><span class="permit-stamp" aria-hidden="true">准予<br>通行</span></div></article><div class="permit-text"><p>${r.text}</p></div><dl class="role-file"><dt>你的一天</dt><dd>${r.day}</dd><dt>拿手的事</dt><dd>${r.good}</dd><dt>容易吃亏的地方</dt><dd>${r.trap}</dd></dl><section class="panel share-slide"><div class="result-actions"><button class="primary" id="ashare">分享我的文牒</button><button class="secondary" id="aagain">重新收拾行囊</button><button class="secondary" id="aatlas">查看图鉴</button><button class="secondary" data-home>回到首页</button></div><p class="notice" id="notice" aria-live="polite"></p><p class="disclaimer">纯属趣味想象，身份和文牒都是虚构的，不是历史考证或性格评估。</p></section>`]],'<button class="top-share" id="top-share">分享</button>'));bindDeck();
 const shareIt=()=>openShareCard({draw:cv=>drawPermit(cv,{role:r.role,items,pass:r.pass,mate:mate.role}),wait:'正在盖印你的文牒…',alt:'我的通关文牒：测试结果分享图',file:'星笺-我的文牒.png',text:`穿越到古代，我的文牒上写着「${r.role}」，行囊里装着${items}。你会是什么身份？`});app.querySelector('#ashare').onclick=shareIt;app.querySelector('#top-share').onclick=shareIt;
 app.querySelector('#aagain').onclick=ancientBag;app.querySelector('#aatlas').onclick=()=>atlas('ancient')}
document.addEventListener('keydown',e=>{if(view!=='ancient-quiz'||e.ctrlKey||e.metaKey||e.altKey)return;const i='1234'.indexOf(e.key);if(i>=0)ancientPick(i)});

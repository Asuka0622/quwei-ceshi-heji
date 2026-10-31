// 边界感主题是趣味自我观察，分数不是心理测量或健康判断。
const boundaryQuestions=[
 {d:0,q:'朋友临时请你帮忙，但你今晚已经安排了自己的时间。你会？',a:['晚点再回复，先想想怎么安排','说今晚有安排，另约时间','看看能否挪出一点时间','答应下来，今晚的安排可以改'],v:[1,3,2,0]},
 {d:1,q:'朋友没打招呼就用了你的东西。你会？',a:['先问问是怎么回事，再说自己的想法','朋友之间用一下没什么，不提了','把东西收好，不特意提这件事','跟对方说，下次用之前先问一声'],v:[2,0,1,3]},
 {d:2,q:'讨论中有人问了一个你不想回答的私人问题。你会？',a:['直接说这个问题我不太想聊','简单回答一下，让讨论继续','聊一部分，其余的不展开','换个话题聊别的'],v:[3,0,2,1]},
 {d:0,q:'同事在下班后发来并不紧急的请求。你会？',a:['顺手处理掉，早点了结','先问一句急不急，再决定','留到上班时间处理，并告诉对方','看情况，晚些时候再处理'],v:[0,2,3,1]},
 {d:1,q:'聚会时，大家一直拿你的一件糗事开玩笑。你会？',a:['顺着聊几句，再换个话题','笑着说这个话题到这里吧','跟着一起笑，当作聚会的乐子','事后跟熟悉的人说，下次别再提'],v:[1,3,0,2]},
 {d:2,q:'朋友希望你分享一件你还没准备好说的事。你会？',a:['先说愿意说的部分','聊开了，说出来也无妨','这次先聊点别的','说等自己想好了再聊'],v:[2,0,1,3]},
 {d:0,q:'家人希望你周末参加活动，而你本来想休息。你会？',a:['说明想休息，约下次再去','去一部分时间，再回来休息','去参加，和家人待着也是休息','先不定，到周末看状态'],v:[3,2,0,1]},
 {d:1,q:'有人反复打断你说话。你会？',a:['找个时机说说被打断的事','等对方说完，再接着讲','说一句“我先讲完”','把话说短一些，让讨论继续'],v:[2,1,3,0]},
 {d:2,q:'朋友想查看你手机里的私人照片。你会？',a:['递过去让对方看，也没什么','说手机里的照片想自己留着','开个玩笑带过去','挑几张给对方看'],v:[0,3,1,2]},
 {d:0,q:'你已经答应帮朋友办事，后来发现需要花费比预想多得多的时间。你会？',a:['调整自己的安排，再和朋友讨论','既然答应了，就都做完','先做着，视情况再说','说明实际能投入多少，重新商量'],v:[2,0,1,3]},
 {d:1,q:'朋友总向你倾诉同一件烦心事，而你今天也有点累。你会？',a:['说今天想休息，另约时间聊','先简单聊几句','说说自己的状态，商量聊多久','陪对方聊完，朋友需要时就在'],v:[3,1,2,0]},
 {d:2,q:'朋友发了有你出镜的照片，你本来没打算公开。你会？',a:['既然发了，就留着吧','不特意提，下次留意镜头','请对方换一张','问问能否只让部分人看到'],v:[0,1,3,2]}
];
// 四种相处类型：[名称, 描述, 可以留意]，结果页和图鉴共用。
const boundaryTypes=[['温柔坚定型','你在这些场景中比较倾向直接说出自己的需要，也愿意让对方知道你的安排。','你的清晰能让相处更有预期；遇到关系敏感的时刻，也可以先听听对方的需求，再决定自己能做到哪一步。'],['灵活协商型','你常根据事情的重要程度和彼此的关系调整回应，希望在自己的空间和对方的需要之间找到平衡。','灵活是你的优势；面对不想承担的请求时，记得先确认自己真正愿意做到哪里。'],['谨慎观察型','你在一些场景中会先照顾气氛或观察对方反应，再决定是否表达自己的感受。','给自己一点整理想法的时间，再从一件小事开始表达，会比勉强自己立刻说清楚更容易。'],['贴心照顾型','你的回答显示，你经常会先考虑对方的感受；有时自己的时间或意愿可能因此被暂时放在后面。','照顾别人是你的长处，也可以练习把自己的需要放进考虑范围，不必每次都立刻答应。']];
let bq=[],bi=0,ba=[],bDirection='fwd',bProgress=0;
function boundaryChoose(){lengthPage('boundary-length','assets/boundaries.webp','想聊多久？','从日常相处的小场景出发，看看你怎么安排时间、表达感受和保留私人空间。',[[6,'随手测一下','约 2 分钟'],[9,'认真看一看','约 3 分钟',true],[12,'全部答完','约 4 分钟']],'','这是趣味自我观察，题多不代表更准，也不是心理诊断。',boundaryStart)}
function boundaryStart(n){bq=boundaryQuestions.slice(0,n);bi=0;bDirection='fwd';bProgress=0;ba=Array(n).fill(null);boundaryQuiz();window.scrollTo({top:0,behavior:'instant'})}
function boundaryQuiz(){let q=bq[bi];show('boundary-quiz',stage(`question-art/boundary-${String(bi+1).padStart(2,'0')}.webp`,bi,bq.length,bProgress,bDirection,q.q,q.a.map((x,i)=>`<button class="option${ba[bi]===i?' selected':''}" data-bopt="${i}" style="--i:${i}" aria-pressed="${ba[bi]===i}">${x}</button>`).join(''),'<button class="stage-back" data-home aria-label="返回首页">×</button>',`<button class="stage-link" id="bprev" ${bi===0?'disabled':''}>上一题</button><button class="${bi===bq.length-1?'primary stage-finish':'stage-link'}" id="bnext" ${ba[bi]===null?'disabled':''}>${bi===bq.length-1?'查看结果':'下一题'}</button>`),false);app.querySelectorAll('[data-bopt]').forEach(x=>x.onclick=()=>boundaryPick(Number(x.dataset.bopt)));app.querySelector('#bprev').onclick=boundaryPrev;app.querySelector('#bnext').onclick=boundaryNext;const bar=app.querySelector('.progress span');bProgress=100*(bi+1)/bq.length;bar.offsetWidth;bar.style.width=bProgress+'%'}
// 与主测试一致：就地更新选中状态，稍作停留后自动进入下一题；最后一题手动查看结果。
function boundaryPick(i){ba[bi]=i;const opts=app.querySelectorAll('[data-bopt]');opts.forEach((o,j)=>{o.classList.toggle('selected',j===i);o.setAttribute('aria-pressed',j===i)});opts[i].classList.remove('pop');opts[i].offsetWidth;opts[i].classList.add('pop');app.querySelector('#bnext').disabled=false;clearTimeout(advanceTimer);if(bi<bq.length-1)advanceTimer=setTimeout(boundaryNext,320)}
function boundaryPrev(){if(bi>0){bi--;bDirection='back';boundaryQuiz();window.scrollTo({top:0,behavior:'instant'})}}
function boundaryNext(){if(ba[bi]===null)return;if(bi+1<bq.length){bi++;bDirection='fwd';boundaryQuiz();window.scrollTo({top:0,behavior:'instant'})}else boundaryResult()}
function boundaryResult(){
 const values=[0,0,0],counts=[0,0,0];
 bq.forEach((q,i)=>{values[q.d]+=q.v[ba[i]];counts[q.d]++});
 const scores=values.map((x,i)=>x/counts[i]);
 const mean=scores.reduce((a,b)=>a+b,0)/3;
 const type=boundaryTypes[mean>=2.25?0:mean>=1.5?1:mean>=0.75?2:3];
 atlasRecord('boundary',type[0]);
 const dimensions=[
  {name:'时间与精力',high:'你比较愿意说明自己的安排，给休息和个人计划留空间。',mid:'你会根据事情的重要程度调整，有时也可能先顾及别人的期待。',low:'面对邀请或请求，你可能先考虑对方是否失望，自己的安排容易往后放。',tip:'我今晚已经有安排了，这次先不参加；我们可以另找时间。'},
  {name:'感受与表达',high:'遇到不舒服的互动时，你较倾向把自己的感受或顾虑说出来。',mid:'你会看关系和场合选择表达方式，有时直接说，有时先观察。',low:'为了让气氛保持和谐，你有时会先忍住不舒服，或等待更合适的时机。',tip:'刚才那句话让我有点不舒服，我们能换个说法吗？'},
  {name:'隐私与分享',high:'你比较清楚哪些内容愿意分享，也会为不想透露的部分留出空间。',mid:'你会依照亲疏和话题决定分享多少，有时选择先含糊带过。',low:'当别人追问私人信息时，你可能会为了避免尴尬而多分享一些。',tip:'这件事我现在想先保留，等准备好了再和你说。'}
 ];
 const weakest=scores.indexOf(Math.min(...scores));
 const evidence=dimensions.map((dim,d)=>{const idx=bq.findIndex((q,i)=>q.d===d && q.v[ba[i]]===Math.min(...bq.filter(x=>x.d===d).map(x=>x.v[ba[bq.indexOf(x)]])));const q=bq[idx];return `<div class="dimension"><div class="dimension-row"><strong>${dim.name}</strong><span>${scores[d]>=2?'较常清晰表达':scores[d]>=1?'会视情境调整':'较常先顾及他人'}</span></div><p>${scores[d]>=2?dim.high:scores[d]>=1?dim.mid:dim.low}</p><p><small>你的回答：${q.q}「${q.a[ba[idx]]}」</small></p></div>`}).join('');
 show('boundary-result',deck([`${resultHero('assets/boundaries.webp','你的边界相处风格',type[0],type[1])}`,`<section class="panel"><h3>你可以留意</h3><p>${type[2]}</p><div class="panel-gap"></div><span class="kicker">一个可以尝试的小步骤</span><h3>从「${dimensions[weakest].name}」开始</h3><p>${scores[weakest]>=2?'三个方面你都比较习惯说清楚，这一方面相对更常看情况调整。备用一句也无妨：':'这次你在这方面更常先顾及他人，或先观察情况。如果这段关系让你觉得安全，可以试着用自己的话说：'}</p><p>“${dimensions[weakest].tip}”</p><p><small>如果你更想练习其他场景，也可以从那里开始。</small></p></section>`,`<section class="panel"><h3>三个生活侧面</h3><p>每个方面各取一道你的回答作为例子。</p>${evidence}</section>`,`<section class="panel share-slide"><h3>发给朋友看看</h3><div class="result-actions"><button class="primary" id="bshare">分享结果</button><button class="secondary" id="bagain">再测一次</button><button class="secondary" id="batlas">查看图鉴</button><button class="secondary" data-home>回到首页</button></div><p class="notice" id="notice" aria-live="polite"></p><p class="disclaimer">这是一份趣味自我观察，只反映这次的回答，不是人格定论或心理诊断。</p></section>`]));bindDeck();app.querySelector('#bshare').onclick=shareLink({title:'星笺 · 边界感测试',text:`我的边界相处风格是「${type[0]}」，你是哪一种？`,url:location.href.split('#')[0]},'分享内容和测试链接已复制。');app.querySelector('#bagain').onclick=boundaryChoose;app.querySelector('#batlas').onclick=()=>atlas('boundary')
}

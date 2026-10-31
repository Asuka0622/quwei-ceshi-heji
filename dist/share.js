// 分享图：把结果做成一幅册页。用 Canvas 画成一张图，看到的就是保存下来的，手机上也能长按存图。
function loadImage(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src})}
function drawCover(g,img,x,y,w,h,px=.5,py=0){const s=Math.max(w/img.width,h/img.height),sw=w/s,sh=h/s;g.drawImage(img,(img.width-sw)*px,(img.height-sh)*py,sw,sh,x,y,w,h)}
// 竖排文字：从右往左排列，每个分句一列
function drawColumns(g,columns,right,top,size,gap){g.textAlign='center';g.textBaseline='middle';columns.forEach((text,c)=>{[...text].forEach((ch,i)=>g.fillText(ch,right-c*(size+gap),top+i*size*1.12))})}
function drawWrapped(g,text,cx,y,maxWidth,lineHeight){let line='';const lines=[];for(const ch of text){if(g.measureText(line+ch).width>maxWidth){lines.push(line);line=ch}else line+=ch}lines.push(line);g.textAlign='center';lines.forEach((l,i)=>g.fillText(l,cx,y+i*lineHeight))}
async function drawLeaf(canvas,{near,ranked,far,user,quote,summary}){
 const W=1080,H=1620,g=canvas.getContext('2d'),SERIF="'Xingjian Serif','Noto Serif SC','Songti SC',serif",PAPER='#f6f1e4',INK='#1c2a24',SEAL='#a4412c',GOLD='#b89a5e',MUTED='#6d716b';
 canvas.width=W;canvas.height=H;
 try{await Promise.all([document.fonts.load(`600 40px "Xingjian Serif"`,near.name+quote.text)])}catch(e){}
 const art=await loadImage(`portraits/${pad(near.order)}.webp`);
 // 丝绫裱边和纸心
 g.fillStyle='#1f3529';g.fillRect(0,0,W,H);
 g.strokeStyle=GOLD;g.lineWidth=2;g.strokeRect(46,46,W-92,H-92);
 g.fillStyle=PAPER;g.fillRect(60,60,W-120,H-120);
 // 立绘
 const px=316,py=118,pw=644,ph=805,mat=15;
 g.save();g.shadowColor='rgba(60,45,25,.35)';g.shadowBlur=34;g.shadowOffsetY=14;g.fillStyle='#fffdf8';g.fillRect(px,py,pw,ph);g.restore();
 if(art)drawCover(g,art,px+mat,py+mat,pw-mat*2,ph-mat*2);
 // 竖排名字和朱印
 const chars=[...near.name],size=Math.min(136,Math.floor(640/chars.length/1.12));
 g.fillStyle=INK;g.font=`600 ${size}px ${SERIF}`;drawColumns(g,[near.name],196,122+size/2,size,0);
 const sealY=122+chars.length*size*1.12+22;
 g.fillStyle=SEAL;g.fillRect(156,sealY,80,80);g.fillStyle=PAPER;g.font=`600 32px ${SERIF}`;g.textAlign='center';g.textBaseline='middle';g.fillText('星',196,sealY+24);g.fillText('笺',196,sealY+58);
 // 关键词和相近度
 const kw=keywords(user);g.fillStyle=MUTED;g.font=`400 26px ${SERIF}`;g.textAlign='left';g.textBaseline='middle';g.fillText('我的关键词',104,1006);g.fillStyle=SEAL;g.font=`600 54px ${SERIF}`;kw.forEach((w,k)=>g.fillText(w,104,1076+k*76));
 g.fillStyle=INK;g.font=`600 60px ${SERIF}`;g.fillText(near.score+'%',104,1344);const sw=g.measureText(near.score+'%').width;g.fillStyle=MUTED;g.font=`400 26px ${SERIF}`;g.fillText('相近',104+sw+12,1354);
 // 题字：短句竖排，长句和事迹横排
 g.fillStyle=INK;const parts=quote.text.split(/(?<=[，。；！？])/).map(x=>x.replace(/[，。；！？]$/,'')).filter(Boolean);
 if(quote.kind!=='fact'&&parts.length<=3&&Math.max(...parts.map(x=>x.length))<=8){const qs=50,qg=30;g.font=`600 ${qs}px ${SERIF}`;drawColumns(g,parts,638+(parts.length-1)*(qs+qg)/2,1000,qs,qg)}
 else{g.font=`600 38px ${SERIF}`;g.textBaseline='middle';drawWrapped(g,quote.text,638,1020,560,62)}
 g.fillStyle=MUTED;g.font=`400 24px ${SERIF}`;g.textAlign='center';g.textBaseline='middle';const src=quote.src.length>24?quote.src.slice(0,24)+'…':quote.src;g.fillText(src,638,1420);
 // 落款
 g.strokeStyle='rgba(28,42,36,.28)';g.lineWidth=1.5;g.beginPath();g.moveTo(110,1454);g.lineTo(W-110,1454);g.stroke();
 g.fillStyle=INK;g.font=`400 26px ${SERIF}`;g.fillText(`也像 ${ranked[1].name}、${ranked[2].name}　　最不像 ${far.name}`,W/2,1490);
 g.fillStyle=MUTED;g.font=`400 22px ${SERIF}`;g.fillText('星笺 · 你与哪位历史人物最像？',W/2,1530);
}
// 回顾流程：像年度报告一样，一屏只讲一件事，一张张翻到最后的册页。点右边下一张，点左边上一张。
function keywords(user){return user.map((v,i)=>({i,off:Math.abs(v-3),w:dimensions[i][v>=3?0:1].replace(/^偏向/,'')})).sort((a,b)=>b.off-a.off||a.i-b.i).slice(0,3).map(x=>x.w)}
function storyCards(data){const {near,ranked,far,user,quote,nearText}=data,kw=keywords(user),total=questions.length;
 // 选最能代表你的一次选择：最突出的那个维度里，分值离中间最远的一题
 let pick=0,best=-1;questions.forEach((q,i)=>{const score=Math.abs(user[q.d]-3)*2+Math.abs(q.v[answers[i]]-3);if(score>best){best=score;pick=i}});
 const q=questions[pick],scene=q.q.replace(/[^。？]*？$/,'').replace(/。$/,'')||q.q,art=`question-art/personality-${pad(q.d*4+Math.floor(pick/8)+1)}.webp`,parts=quote.text.split(/(?<=[，。；！？])/).map(x=>x.replace(/[，。；！？]$/,'')).filter(Boolean),vertical=quote.kind!=='fact'&&parts.length<=3&&Math.max(...parts.map(x=>x.length))<=9;
 return [
  `<div class="s-card s-night"><small style="--i:0">这一趟</small><b class="s-huge" style="--i:1">${total}</b><p class="s-big" style="--i:2">个历史现场</p><p style="--i:3">你做了 ${total} 次选择，<br>每一次都在悄悄说你是谁。</p></div>`,
  `<div class="s-card s-photo"><img src="${art}" alt="" decoding="async"><div class="s-photo-body"><small style="--i:0">其中有这样一次</small><p class="s-scene" style="--i:1">${scene}</p><small style="--i:2">你选了</small><p class="s-big" style="--i:3">${q.a[answers[pick]]}</p></div></div>`,
  `<div class="s-card s-seal"><small style="--i:0">你的关键词</small>${kw.map((w,i)=>`<b class="s-word" style="--i:${i+1}">${w}</b>`).join('')}</div>`,
  `<div class="s-card s-photo s-person">${portrait(near,'avatar-xl')}<div class="s-photo-body"><small style="--i:0">穿越时空，最像你的是</small><b class="s-name" style="--i:1">${near.name}</b><p class="s-big" style="--i:2">${near.score}% 相近 · ${near.title}</p></div></div>`,
  `<div class="s-card s-paper"><small style="--i:0">TA 留下过这样的话</small>${vertical?`<blockquote class="s-vertical" style="--i:1">${parts.map(x=>`<span>${x}</span>`).join('')}</blockquote>`:`<blockquote class="s-quote" style="--i:1">${quote.text}</blockquote>`}<small style="--i:2">${quote.src}</small><p style="--i:3">${nearText}</p></div>`,
  `<div class="s-card s-night"><small style="--i:0">时空里，还有这些人</small>${[[ranked[1],'也像你'],[ranked[2],'也像你'],[far,'最不像你']].map(([p,label],i)=>`<div class="s-person-row" style="--i:${i+1}">${portrait(p,'avatar-md')}<div><b>${p.name}</b><small>${label}</small></div></div>`).join('')}</div>`
 ]}
function openStory(data){const deckEl=app.querySelector('.deck');deckEl.querySelector('.story')?.remove();deckEl.querySelector('.box-sheet')?.remove();const cards=storyCards(data);let at=0,timer=0;
 deckEl.insertAdjacentHTML('beforeend',`<div class="story"><div class="story-bars">${cards.map(()=>'<i><u></u></i>').join('')}</div><div class="story-stage"></div><button class="story-zone story-prev" aria-label="上一张"></button><button class="story-zone story-next" aria-label="下一张"></button><button class="story-close" aria-label="关闭">×</button><button class="story-skip">看我的册页</button></div>`);
 const el=deckEl.querySelector('.story'),stage=el.querySelector('.story-stage'),bars=[...el.querySelectorAll('.story-bars u')];
 const end=()=>{clearTimeout(timer);el.remove()},finish=()=>{end();openShareCard(data)};
 const go=i=>{clearTimeout(timer);if(i<0)i=0;if(i>=cards.length)return finish();at=i;stage.innerHTML=cards[i];stage.querySelectorAll('img[loading=lazy]').forEach(x=>x.loading='eager');bars.forEach((b,k)=>{b.style.animation='none';b.style.width=k<i?'100%':'0';if(k===i){b.offsetWidth;b.style.animation='storyBar 5s linear forwards'}});timer=setTimeout(()=>{if(el.isConnected)go(at+1)},5000)};
 el.querySelector('.story-prev').onclick=()=>go(at-1);el.querySelector('.story-next').onclick=()=>go(at+1);el.querySelector('.story-close').onclick=end;el.querySelector('.story-skip').onclick=finish;go(0)}
async function openShareCard(data){
 const deckEl=app.querySelector('.deck');let sheet=deckEl.querySelector('.box-sheet');if(sheet)sheet.remove();
 deckEl.insertAdjacentHTML('beforeend','<div class="box-sheet"><button class="box-close" aria-label="关闭">×</button><p class="box-wait">正在装裱你的册页…</p><img class="box-image" alt="我的册页：测试结果分享图" hidden><p class="box-tip" hidden>长按图片可以保存</p><div class="box-actions" hidden><button class="primary" id="box-send">发给朋友</button><a class="secondary" id="box-save" download="星笺-我的册页.png">保存图片</a></div><p class="notice" id="box-notice" aria-live="polite"></p></div>');
 sheet=deckEl.querySelector('.box-sheet');sheet.querySelector('.box-close').onclick=()=>sheet.remove();
 const canvas=document.createElement('canvas');await drawLeaf(canvas,data);
 const url=canvas.toDataURL('image/png'),img=sheet.querySelector('.box-image');img.src=url;img.hidden=false;sheet.querySelector('.box-wait').hidden=true;sheet.querySelector('.box-tip').hidden=false;sheet.querySelector('.box-actions').hidden=false;sheet.querySelector('#box-save').href=url;
 const text=`我的册页上是${data.near.name}，相近度 ${data.near.score}%。你的呢？`,link=location.href.split('#')[0],notice=sheet.querySelector('#box-notice');
 sheet.querySelector('#box-send').onclick=()=>canvas.toBlob(async blob=>{const file=new File([blob],'星笺-我的册页.png',{type:'image/png'});try{if(navigator.canShare&&navigator.canShare({files:[file]}))await navigator.share({files:[file],text,url:link});else if(navigator.share)await navigator.share({text,url:link});else{await copyText(text+' '+link);notice.textContent='文字和链接已复制，图片可以长按保存后一起发。'}}catch(e){if(e.name!=='AbortError')notice.textContent='可以长按保存图片，再发给朋友：'+link}});
}

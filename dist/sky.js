// 交互式主题背景：每个测试主题一套场景，底图由 CSS 铺在下层（html[data-scene]），这里画上层的动态粒子。
// 系统开启「减少动态效果」时只画一层静态粒子；页面切到后台时暂停绘制。
// 切换场景：window.skyScene('ink')；预览：网址加 ?scene=ink（stars / ink / lantern / glow）。
(()=>{
const cv=document.getElementById('sky');if(!cv||!cv.getContext)return;
const ctx=cv.getContext('2d'),still=matchMedia('(prefers-reduced-motion: reduce)').matches;
// 场景参数：density = 每多少平方像素一颗粒子；size 为半径范围；speed 为漂移速度；touch 决定触摸反馈。
// sprite 是美术提供的贴图，加载失败时用矢量图形代替。
const SCENES={
 stars:{rgb:'168,131,79',density:9000,max:150,size:[.5,1.8],speed:0,shape:'dot',touch:'link',meteor:true},
 ink:{rgb:'28,42,36',density:15000,max:80,size:[.6,2.6],speed:.12,shape:'dot',touch:'ripple',petal:{rgb:'196,120,118',sprite:'assets/sprites/petal.png'}},
 lantern:{rgb:'204,138,62',density:12000,max:110,size:[.8,2.2],speed:.4,rise:true,shape:'ember',touch:'burst'},
 glow:{rgb:'140,126,186',density:40000,max:24,size:[22,56],speed:.2,shape:'orb',touch:'attract'},
};
const LINK=130,MAX_LINKS=7;
let name='',S=SCENES.stars,W=0,H=0,parts=[],fx=[],petals=[],px=-999,py=-999,tx=0,ty=0,ox=0,oy=0,raf=0,lastPointer=0,lastFx=0,petalImg=null;
const rand=(a,b)=>a+Math.random()*(b-a);

function build(){
 const dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
 cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
 const n=Math.min(S.max,Math.round(W*H/S.density));
 parts=Array.from({length:n},()=>{const z=rand(.25,1);return {x:rand(0,W),y:rand(0,H),z,r:rand(S.size[0],S.size[1]),p:rand(0,6.28),vx:rand(-.5,.5)*S.speed,vy:S.rise?-rand(.2,1)*S.speed:rand(-.5,.5)*S.speed}});
}
function setScene(next){
 if(!SCENES[next])next='stars';if(next===name)return;
 name=next;S=SCENES[name];fx=[];petals=[];document.documentElement.dataset.scene=name;
 petalImg=null;if(S.petal&&S.petal.sprite){const img=new Image();img.src=S.petal.sprite;petalImg=img}
 build();frame(performance.now());
}

function drawPart(x,y,s,a,t){
 if(S.shape==='orb'){const g=ctx.createRadialGradient(x,y,0,x,y,s.r);g.addColorStop(0,`rgba(${S.rgb},${a*.28})`);g.addColorStop(1,`rgba(${S.rgb},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,s.r,0,6.283);ctx.fill();return}
 if(S.shape==='ember'){const r=s.r*3,g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${S.rgb},${a})`);g.addColorStop(.35,`rgba(${S.rgb},${a*.35})`);g.addColorStop(1,`rgba(${S.rgb},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,6.283);ctx.fill();return}
 ctx.fillStyle=`rgba(${S.rgb},${a*.7})`;ctx.beginPath();ctx.arc(x,y,s.r,0,6.283);ctx.fill();
}

function frame(t){
 raf=0;if(!Number.isFinite(ox+oy+tx+ty))ox=oy=tx=ty=0;
 ox+=(tx-ox)*.06;oy+=(ty-oy)*.06;
 ctx.clearRect(0,0,W,H);
 const sy=still?0:scrollY*.08,near=[],active=px>-900;
 for(const s of parts){
  if(!still&&S.speed){s.x+=s.vx;s.y+=s.vy;if(s.x<-60)s.x+=W+120;if(s.x>W+60)s.x-=W+120;if(s.y<-60)s.y+=H+120;if(s.y>H+60)s.y-=H+120}
  let x=s.x+ox*s.z,y=((s.y-sy*s.z+oy*s.z)%H+H)%H;
  // 柔光场景：手指附近的光斑被缓缓吸过去
  if(S.touch==='attract'&&active){const dx=px-x,dy=py-y,dd=Math.hypot(dx,dy);if(dd<240){s.x+=dx*.012*s.z;s.y+=dy*.012*s.z}}
  const d=Math.hypot(x-px,y-py);
  let a=still?.6:S.shape==='ember'?.3+.55*Math.abs(Math.sin(t/420+s.p)):.45+.35*Math.sin(t/900+s.p);a*=s.z;
  if(S.touch==='link'&&d<LINK){a=Math.min(1,a+(1-d/LINK)*.6);near.push([x,y,d])}
  drawPart(x,y,S.touch==='link'&&d<LINK?{...s,r:s.r*1.4}:s,a,t);
 }
 // 星图场景：指针附近最近的几颗星两两相连，形成临时星座
 const k=near.sort((a,b)=>a[2]-b[2]).slice(0,MAX_LINKS);ctx.lineWidth=.6;
 for(let i=0;i<k.length;i++)for(let j=i+1;j<k.length;j++){
  const dd=Math.hypot(k[i][0]-k[j][0],k[i][1]-k[j][1]);if(dd>=LINK)continue;
  ctx.strokeStyle=`rgba(${S.rgb},${(1-dd/LINK)*.45})`;ctx.beginPath();ctx.moveTo(k[i][0],k[i][1]);ctx.lineTo(k[j][0],k[j][1]);ctx.stroke();
 }
 // 水墨场景：梅花瓣从上方缓缓飘落
 if(S.petal&&!still){
  if(petals.length<6&&Math.random()<.012)petals.push({x:rand(0,W),y:-20,vy:rand(.35,.8),sw:rand(.4,1.2),p:rand(0,6.28),rot:rand(0,6.28),vr:rand(-.02,.02),size:rand(6,10)});
  petals=petals.filter(q=>{q.y+=q.vy;q.p+=.02;q.rot+=q.vr;const x=q.x+Math.sin(q.p)*20*q.sw;
   ctx.save();ctx.translate(x,q.y);ctx.rotate(q.rot);ctx.globalAlpha=.55;
   if(petalImg&&petalImg.complete&&petalImg.naturalWidth)ctx.drawImage(petalImg,-q.size,-q.size,q.size*2,q.size*2);
   else{ctx.fillStyle=`rgba(${S.petal.rgb},.55)`;ctx.beginPath();ctx.ellipse(0,0,q.size*.55,q.size*.3,0,0,6.283);ctx.fill()}
   ctx.restore();return q.y<H+30});
 }
 // 触摸特效：流星、墨圈、火星
 fx=fx.filter(f=>{
  f.life-=f.decay;
  if(f.kind==='meteor'){f.x+=f.vx;f.y+=f.vy;const g=ctx.createLinearGradient(f.x,f.y,f.x-f.vx*12,f.y-f.vy*12);g.addColorStop(0,`rgba(${S.rgb},${f.life*.8})`);g.addColorStop(1,`rgba(${S.rgb},0)`);ctx.strokeStyle=g;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(f.x,f.y);ctx.lineTo(f.x-f.vx*12,f.y-f.vy*12);ctx.stroke()}
  else if(f.kind==='ring'){f.r+=f.grow;ctx.strokeStyle=`rgba(${S.rgb},${f.life*.28})`;ctx.lineWidth=1.4*f.life+.3;ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.283);ctx.stroke()}
  else if(f.kind==='spark'){f.x+=f.vx;f.y+=f.vy;f.vy-=.02;drawPart(f.x,f.y,{r:1.6},f.life,t)}
  return f.life>0;
 });
 if(!still)loop();
}
function loop(){if(!raf&&!document.hidden)raf=requestAnimationFrame(frame)}
function touchFx(x,y,strong){
 const now=Date.now();if(!strong&&now-lastFx<(S.touch==='ripple'?140:220))return;lastFx=now;
 if(S.touch==='ripple'){fx.push({kind:'ring',x,y,r:strong?6:2,grow:strong?1.4:.8,life:1,decay:strong?.012:.025});if(strong)fx.push({kind:'ring',x,y,r:0,grow:.9,life:1,decay:.014})}
 else if(S.touch==='burst'){for(let i=0;i<(strong?14:4);i++){const a=rand(0,6.28),v=rand(.4,strong?2.2:1);fx.push({kind:'spark',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.6,life:1,decay:rand(.015,.03)})}}
 else if(S.meteor&&strong&&fx.filter(f=>f.kind==='meteor').length<3)fx.push({kind:'meteor',x,y,vx:-rand(3,6),vy:rand(2,4),life:1,decay:1/60});
}
function aim(x,y){px=x;py=y;lastPointer=Date.now();if(W&&H){tx=(x/W-.5)*-24;ty=(y/H-.5)*-24}if(!still)touchFx(x,y,false)}

const preview=new URLSearchParams(location.search).get('scene');
setScene(preview||'stars');
window.skyScene=setScene;
let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{build();frame(performance.now())},200)});
if(still)return;
addEventListener('pointermove',e=>aim(e.clientX,e.clientY),{passive:true});
addEventListener('touchmove',e=>{const p=e.touches[0];if(p)aim(p.clientX,p.clientY)},{passive:true});
addEventListener('touchend',()=>setTimeout(()=>{if(Date.now()-lastPointer>500){px=py=-999}},600),{passive:true});
document.addEventListener('mouseleave',()=>{px=py=-999});
// 点在空白处（不是按钮、链接或选项）才触发强一点的特效
addEventListener('click',e=>{if(!e.target.closest('a,button,input,textarea,[data-option],.hit'))touchFx(e.clientX,e.clientY,true)});
// 手机倾斜视差（安卓直接可用；iOS 需要授权，未授权时不触发，不影响其他效果）
addEventListener('deviceorientation',e=>{if(e.gamma==null||Date.now()-lastPointer<2000)return;tx=Math.max(-1,Math.min(1,e.gamma/30))*-18;ty=Math.max(-1,Math.min(1,(e.beta-40)/30))*-18});
setInterval(()=>{if(!document.hidden&&S.meteor&&Math.random()<.5)touchFx(W*rand(.4,1),H*rand(0,.4),true)},12000);
document.addEventListener('visibilitychange',loop);
})();

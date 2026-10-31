// 手机友好的动效：点按涟漪和震动、可拖动的星图、倾斜立体感、跟随滚动的星图与封面视差。
// 页面是动态渲染的，所以都用事件委托，每次按需查找元素；系统开启「减少动态效果」时全部不启用。
(()=>{
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
// iOS 需要有 touchstart 监听，:active 按压样式才会生效
addEventListener('touchstart',()=>{},{passive:true});

// 点按涟漪：从手指位置泛开
const TAP='.primary,.secondary,.option,.length-option,.chip,.atlas-card,.header-link';
addEventListener('pointerdown',e=>{
 const el=e.target.closest&&e.target.closest(TAP);if(!el||el.disabled)return;
 const r=el.getBoundingClientRect(),size=Math.max(r.width,r.height)*2,dot=document.createElement('span');
 dot.className='tap-ripple';dot.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
 el.classList.add('tap-fx');el.appendChild(dot);dot.addEventListener('animationend',()=>dot.remove());
},{passive:true});
// 选答案时轻微震动（安卓支持，iOS 没有这个接口）
addEventListener('click',e=>{if(e.target.closest('.option')&&navigator.vibrate)navigator.vibrate(8)});

// 星图：左右拖动转动并带惯性，轻点发光；上下滑动仍然是滚动页面（touch-action:pan-y）
let drag=0,spin=0,startX=null,lastX=0,moved=0,tiltX=0,tiltY=0,curX=0,curY=0,raf=0,askedTilt=false;
const kick=()=>{if(!raf)raf=requestAnimationFrame(tick)};
addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('.hero-art')){startX=lastX=e.clientX;moved=0;spin=0}},{passive:true});
addEventListener('pointermove',e=>{if(startX===null)return;const dx=e.clientX-lastX;lastX=e.clientX;moved+=Math.abs(dx);drag+=dx*.45;spin=dx*.45;kick()},{passive:true});
const release=e=>{
 if(startX===null)return;startX=null;kick();
 if(moved>=6||!e||e.type!=='pointerup')return;
 const chart=document.querySelector('.star-chart');if(chart){chart.classList.remove('sc-pulse');chart.getBoundingClientRect();chart.classList.add('sc-pulse')}
 if(navigator.vibrate)navigator.vibrate(10);
 // iOS 读取倾斜要用户授权，且必须由点按触发：只在用户主动点星图时才询问一次
 if(!askedTilt&&window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission){askedTilt=true;DeviceOrientationEvent.requestPermission().catch(()=>{})}
};
addEventListener('pointerup',release,{passive:true});addEventListener('pointercancel',release,{passive:true});

// 倾斜手机时星图有立体晃动
addEventListener('deviceorientation',e=>{if(e.gamma==null)return;tiltX=Math.max(-1,Math.min(1,e.gamma/30))*7;tiltY=Math.max(-1,Math.min(1,(e.beta-45)/30))*-7;kick()},{passive:true});
addEventListener('scroll',kick,{passive:true});addEventListener('resize',kick,{passive:true});

function tick(){
 raf=0;let again=false;
 if(startX===null&&Math.abs(spin)>.02){drag+=spin;spin*=.94;again=true}
 curX+=(tiltX-curX)*.1;curY+=(tiltY-curY)*.1;if(Math.abs(tiltX-curX)+Math.abs(tiltY-curY)>.02)again=true;
 const h=innerHeight,y=scrollY;
 const ring=document.querySelector('.sc-drag');if(ring)ring.style.transform=`rotate(${drag+y*.05}deg)`;
 const chart=document.querySelector('.star-chart');if(chart)chart.style.transform=`perspective(700px) rotateY(${curX}deg) rotateX(${curY}deg) translateY(${y*.03}px)`;
 // 封面图：只在画面内时随滚动移动取景位置
 document.querySelectorAll('.boundary-cover,.atlas-soon img').forEach(img=>{const r=img.getBoundingClientRect();if(r.bottom<0||r.top>h)return;const p=Math.max(0,Math.min(1,(h-r.top)/(h+r.height)));img.style.objectPosition=`center ${Math.round(20+p*60)}%`});
 if(again)kick();
}
kick();
})();

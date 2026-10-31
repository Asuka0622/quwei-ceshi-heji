// 手机上的点按反馈：涟漪和震动。
// 页面是动态渲染的，所以都用事件委托，每次按需查找元素；系统开启「减少动态效果」时全部不启用。
(()=>{
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
// iOS 需要有 touchstart 监听，:active 按压样式才会生效
addEventListener('touchstart',()=>{},{passive:true});

// 点按涟漪：从手指位置泛开
const TAP='.primary,.secondary,.option,.duel-card,.bag-item,.chip,.atlas-card';
addEventListener('pointerdown',e=>{
 const el=e.target.closest&&e.target.closest(TAP);if(!el||el.disabled)return;
 const r=el.getBoundingClientRect(),size=Math.max(r.width,r.height)*2,dot=document.createElement('span');
 dot.className='tap-ripple';dot.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
 el.classList.add('tap-fx');el.appendChild(dot);dot.addEventListener('animationend',()=>dot.remove());
},{passive:true});
// 选答案时轻微震动（安卓支持，iOS 没有这个接口）
addEventListener('click',e=>{if(e.target.closest('.option,.duel-card,.bag-item')&&navigator.vibrate)navigator.vibrate(8)});

})();

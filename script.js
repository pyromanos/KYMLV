const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("hide"), 700);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 45, 250)}ms`;
  observer.observe(el);
});

// Falling yellow petals.
const canvas = $("#petalsCanvas");
const ctx = canvas.getContext("2d");
let W, H, petals = [];
function resize(){
  W = canvas.width = innerWidth * devicePixelRatio;
  H = canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth+"px";
  canvas.style.height = innerHeight+"px";
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
function makePetal(){
  return {x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight*.5,
    r:2+Math.random()*3.5,vy:.35+Math.random()*1.1,vx:-.25+Math.random()*.5,
    a:Math.random()*Math.PI*2,spin:(-.015+Math.random()*.03),alpha:.12+Math.random()*.3};
}
function initPetals(){petals=Array.from({length:34},makePetal)}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  petals.forEach(p=>{
    p.y+=p.vy;p.x+=p.vx+Math.sin(p.y*.008)*.12;p.a+=p.spin;
    if(p.y>innerHeight+30){Object.assign(p,makePetal(),{y:-15})}
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);
    ctx.fillStyle=`rgba(246,201,69,${p.alpha})`;
    ctx.beginPath();ctx.ellipse(0,0,p.r*1.8,p.r,.5,0,Math.PI*2);ctx.fill();ctx.restore();
  });
  requestAnimationFrame(draw);
}
addEventListener("resize",()=>{resize();initPetals()}); resize(); initPetals(); draw();

// Interactive flowers.
const messageModal=$("#messageModal");
const messageText=$("#flowerMessage");
$$(".flower-card").forEach(card=>{
  card.addEventListener("click",()=>{
    card.classList.remove("bloom"); void card.offsetWidth; card.classList.add("bloom");
    messageText.textContent=card.dataset.message;
    messageModal.classList.add("open");
    messageModal.setAttribute("aria-hidden","false");
    document.body.classList.add("lock");
  });
});
function closeMessage(){
  messageModal.classList.remove("open");
  messageModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("lock");
}
$("#closeModal").addEventListener("click",closeMessage);
$(".message-modal .modal-backdrop").addEventListener("click",closeMessage);

// Final surprise.
const surprise=$("#surpriseModal");
$("#surpriseBtn").addEventListener("click",()=>{
  surprise.classList.add("open"); surprise.setAttribute("aria-hidden","false");
  document.body.classList.add("lock");
  burst();
});
function closeSurprise(){
  surprise.classList.remove("open"); surprise.setAttribute("aria-hidden","true");
  document.body.classList.remove("lock");
}
$("#closeSurprise").addEventListener("click",closeSurprise);
$(".surprise-modal .modal-backdrop").addEventListener("click",closeSurprise);
addEventListener("keydown",e=>{
  if(e.key==="Escape"){closeMessage();closeSurprise()}
});

// A tiny celebration burst.
function burst(){
  for(let i=0;i<45;i++){
    const p=makePetal(); p.x=innerWidth/2; p.y=innerHeight/2;
    p.vx=(Math.random()-.5)*7; p.vy=(Math.random()-.5)*7;
    petals.push(p);
  }
}

// The music button stays intentionally simple: it provides a visual cue
// without forcing audio/autoplay on GitHub Pages.
$("#musicBtn").addEventListener("click", e=>{
  e.currentTarget.textContent = e.currentTarget.textContent==="♪" ? "♫" : "♪";
  e.currentTarget.style.transform="rotate(15deg) scale(1.08)";
  setTimeout(()=>e.currentTarget.style.transform="",250);
});

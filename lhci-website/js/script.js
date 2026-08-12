const header=document.getElementById("siteHeader");
const toggle=document.querySelector(".nav-toggle");
const nav=document.querySelector(".nav");

toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>30);
});

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters=document.querySelectorAll("[data-count]");
const counterObserver=new IntersectionObserver((entries)=>{
 entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   const el=entry.target, target=Number(el.dataset.count); let start=0;
   const duration=1300, startTime=performance.now();
   function tick(now){
     const progress=Math.min((now-startTime)/duration,1);
     const eased=1-Math.pow(1-progress,3);
     el.textContent=Math.round(target*eased)+"+";
     if(progress<1)requestAnimationFrame(tick);
   }
   requestAnimationFrame(tick); counterObserver.unobserve(el);
 })
},{threshold:.5});
counters.forEach(c=>counterObserver.observe(c));

document.getElementById("year").textContent=new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit",(e)=>{
 e.preventDefault();
 const status=e.currentTarget.querySelector(".form-status");
 status.textContent="Thanks. Your message has been sent successfully";
 e.currentTarget.reset();
});

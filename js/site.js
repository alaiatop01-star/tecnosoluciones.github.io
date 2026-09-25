
const menu=document.querySelector('.menu-btn');
if(menu) menu.addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open'));

const routes=[
 {keys:['android','espacio','almacenamiento','celular lleno','teléfono lleno','telefono lleno','memoria'],url:'articulos/liberar-espacio-android.html',title:'Liberar espacio en Android',cat:'Android',icon:'📱'},
 {keys:['windows','disco','pc','computadora','ordenador'],url:'articulos/liberar-espacio-windows.html',title:'Liberar espacio en Windows',cat:'Windows',icon:'💻'},
 {keys:['whatsapp'],url:'articulos/liberar-espacio-whatsapp.html',title:'Liberar espacio de WhatsApp',cat:'WhatsApp',icon:'💬'},
 {keys:['wifi','wi-fi','internet','router','conexión','conexion'],url:'articulos/problemas-wifi.html',title:'Solucionar problemas de Wi‑Fi',cat:'Wi‑Fi',icon:'📶'},
 {keys:['lento','rendimiento','rápido','rapido'],url:'articulos/android-lento.html',title:'Hacer Android más rápido',cat:'Rendimiento',icon:'⚡'}
];

function normalize(s){
 return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

function getMatches(q){
 const n=normalize(q).trim();
 if(!n) return routes;
 return routes.filter(r=>r.keys.some(k=>normalize(k).includes(n)||n.includes(normalize(k))));
}

function renderResults(q){
 const box=document.getElementById('solutionResults');
 if(!box) return;
 const matches=getMatches(q);
 box.innerHTML='';
 if(!q.trim()){
   box.innerHTML='<div class="solution-empty">Escribe un problema arriba para encontrar una guía.</div>';
 }else if(!matches.length){
   box.innerHTML='<div class="solution-empty">No encontramos una guía exacta. Prueba con: <button type="button" onclick="quickSearch(\'Android lento\')">Android lento</button>, <button type="button" onclick="quickSearch(\'WhatsApp\')">WhatsApp</button> o <button type="button" onclick="quickSearch(\'Wi-Fi\')">Wi‑Fi</button>.</div>';
 }else{
   matches.forEach(r=>{
     const a=document.createElement('a');
     a.className='solution-result';
     a.href=r.url;
     a.innerHTML=`<span class="solution-icon">${r.icon}</span><span><strong>${r.title}</strong><small>${r.cat} · Guía paso a paso</small></span><b>→</b>`;
     box.appendChild(a);
   });
 }
 box.classList.add('visible');
}

function quickSearch(q){
 const input=document.getElementById('siteSearch');
 if(input){input.value=q;renderResults(q);input.focus();}
}

function searchSite(e){
 e.preventDefault();
 const q=document.getElementById('siteSearch')?.value||'';
 const matches=getMatches(q);
 if(matches.length===1){
   window.location.href=matches[0].url;
   return;
 }
 renderResults(q);
 document.getElementById('solutionResults')?.scrollIntoView({behavior:'smooth',block:'center'});
}

document.addEventListener('DOMContentLoaded',()=>{
 const input=document.getElementById('siteSearch');
 if(input){
   input.addEventListener('input',()=>renderResults(input.value));
   input.addEventListener('focus',()=>{if(input.value.trim()) renderResults(input.value);});
 }
});

/* Polymarket Gamma API: public read-only quotations, independent YES prices. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const cfg=[
['senate','Сенат','which-party-will-win-the-senate-in-2026'],
['house','Палата представителей','which-party-will-win-the-house-in-2026'],
['balance','Обе палаты','balance-of-power-2026-midterms'],
['AK','Аляска · Сенат','alaska-senate-election-winner'],
['IA','Айова · Сенат','iowa-senate-election-winner'],
['KS','Канзас · Сенат','kansas-senate-election-winner'],
['ME','Мэн · Сенат','maine-senate-election-winner'],
['MI','Мичиган · Сенат','michigan-senate-election-winner'],
['OH','Огайо · Сенат','ohio-senate-election-winner'],
['TX','Техас · Сенат','texas-senate-election-winner'],
['AZ','Аризона · губернатор','arizona-governor-election-winner'],
['GA','Джорджия · губернатор','georgia-governor-election-winner'],
['NV','Невада · губернатор','nevada-governor-election-winner'],
['WI','Висконсин · губернатор','wisconsin-governor-election-winner']
];
const events=new Map();let busy=false,lastCheck=0,liveCount=0,stamp='';
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function arr(x){if(Array.isArray(x))return x;try{let a=JSON.parse(x);return Array.isArray(a)?a:[]}catch{return []}}
function yes(m){const outcomes=arr(m.outcomes),prices=arr(m.outcomePrices);let ix=outcomes.findIndex(v=>String(v).toLowerCase()==='yes');if(ix<0)return null;const v=Number(prices[ix]);return Number.isFinite(v)&&v>=0&&v<=1?v*100:null}
function name(m){return String(m.groupItemTitle||m.question||'').trim()}
function odds(v){return v===null||v===undefined?'—':v<1?'<1%':v>=99.5?'>99%':v.toFixed(v<10?1:0).replace('.',',')+'%'}
function time(x){const d=new Date(x);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',timeZone:'Europe/London'}).format(d)+' UK':'время не указано'}
function valid(obj,slug){return obj&&obj.slug===slug&&Array.isArray(obj.markets)&&obj.markets.length}
function party(ms,code){const rx=code==='D'?/democratic party|democrats\b|\(d\)/i:/republican party|republicans\b|\(r\)/i;for(const m of ms){const s=name(m)+' '+String(m.question||'');if(rx.test(s)&&yes(m)!=null)return yes(m)}return null}
function market(cfgItem){return 'https://polymarket.com/event/'+cfgItem[2]}
function render(){
 const major=cfg.slice(0,3).map((c,i)=>{
  const e=events.get(c[2]),url=market(c);
  if(!e)return '<article class="pm-card"><b>'+esc(c[1])+'</b><p>Ожидание рыночных котировок</p><a href="'+url+'" target="_blank" rel="noopener noreferrer">Источник ↗</a></article>';
  let body='';
  if(i<2){
   const d=party(e.markets,'D'),r=party(e.markets,'R');
   body='<div class="pm-pair"><div class="pm-dem"><span>Демократы</span><strong>'+odds(d)+'</strong></div><div class="pm-rep"><span>Республиканцы</span><strong>'+odds(r)+'</strong></div></div>';
  }else{
   body='<div class="pm-options">'+e.markets.map(m=>({label:name(m).replace(/^2026 Balance of Power:\s*/,'').replace('D Senate, D House','Обе — демократы').replace('R Senate, R House','Обе — республиканцы').replace('R Senate, D House','Сенат R, Палата D').replace('D Senate, R House','Сенат D, Палата R'),v:yes(m)})).filter(x=>x.v!==null).sort((a,b)=>b.v-a.v).slice(0,4).map(x=>'<div><span>'+esc(x.label)+'</span><b>'+odds(x.v)+'</b></div>').join('')+'</div>';
  }
  return '<article class="pm-card"><b>'+esc(c[1])+'</b>'+body+'<a href="'+url+'" target="_blank" rel="noopener noreferrer">Polymarket ↗</a></article>'
 }).join('');
 $('pmCards').innerHTML=major;
 $('pmStates').innerHTML=cfg.slice(3).map(c=>{
  const e=events.get(c[2]),url=market(c);
  const choices=e?e.markets.map(m=>({label:name(m),v:yes(m)})).filter(x=>x.v!==null).sort((a,b)=>b.v-a.v).slice(0,2):[];
  return '<div class="pm-state"><b>'+esc(c[1])+'</b><div class="pm-choices">'+(choices.length?choices.map(x=>'<span><strong>'+odds(x.v)+'</strong> '+esc(x.label)+'</span>').join(''):'<span>Котировок пока нет</span>')+'</div><a href="'+url+'" target="_blank" rel="noopener noreferrer">Рынок ↗</a></div>';
 }).join('');
 const updated=[...events.values()].map(x=>x.updatedAt).filter(Boolean).sort().pop();
 $('pmStatus').textContent=events.size+' из '+cfg.length+' рынков · '+(liveCount?'Прямой API · ':'Резервная копия · ')+(updated?'цены на '+time(updated):'нет отметки времени');
}
async function fetchJSON(url,timeout=12000){const ac=new AbortController(),t=setTimeout(()=>ac.abort(),timeout);try{const u=new URL(url,location.href);u.searchParams.set('_',Date.now().toString());const r=await fetch(u.toString(),{cache:'no-store',signal:ac.signal});if(!r.ok)throw Error('HTTP '+r.status);return await r.json()}finally{clearTimeout(t)}}
async function mirror(){try{const doc=await fetchJSON('./data/polymarket.json',8000);if(doc&&doc.events){for(const c of cfg){const ev=doc.events[c[2]];if(valid(ev,c[2])&&!events.has(c[2]))events.set(c[2],ev)}render()}}catch{}}
async function update(){if(busy)return;busy=true;lastCheck=Date.now();$('pmStatus').textContent='Обновление Polymarket…';
const statuses=await Promise.all(cfg.map(async c=>{try{const ev=await fetchJSON('https://gamma-api.polymarket.com/events/slug/'+encodeURIComponent(c[2]),12000);if(!valid(ev,c[2]))return false;events.set(c[2],ev);render();return true}catch{return false}}));
liveCount=statuses.filter(Boolean).length;busy=false;if(liveCount<cfg.length)await mirror();render();
}
$('pmRefresh').addEventListener('click',update);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-lastCheck>90000)update()});
window.addEventListener('pageshow',e=>{if(e.persisted&&Date.now()-lastCheck>90000)update()});
setInterval(()=>{if(!document.hidden&&Date.now()-lastCheck>180000)update()},60000);
render();mirror().then(update);
})();
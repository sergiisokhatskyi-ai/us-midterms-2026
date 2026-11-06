/* Live 2026 US election data adapter. Source: civicAPI as published by sitmap.live.
   The fallback Open America feed comes directly from 22 participating state authorities.
   A candidate leading the count is never treated as the winner unless explicitly called. */
(function (root) {
'use strict';
const SOURCE='https://sitmap.live/api/elections/us-2026.json';
const OFFICIAL='https://openamerica.io/elections/results.json';
const STATES=new Set('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(' '));
const party=x=>{const p=String(x?.group||x?.party||x?.p||'').toLowerCase();return /^(dem|d|democratic)|democrat/.test(p)?'D':/^(rep|r|republican)|republican/.test(p)?'R':'O'};
const number=x=>typeof x==='number'&&Number.isFinite(x)?Math.max(0,Math.round(x)):0;
function sitmap(doc){
 if(doc?.election?.id!=='us-2026'||!Array.isArray(doc?.contests))throw Error('Неверный формат civicAPI');
 const races={};let withVotes=0,asof='';
 for(const c of doc.contests){
  const chamber=c.chamber;const st=String(c.jurisdiction?.state||'').toUpperCase();
  if(!STATES.has(st)||!['senate','house','governor'].includes(chamber))continue;
  let key=(chamber==='senate'?'S':chamber==='governor'?'G':'H')+'-'+st;
  if(chamber==='house'){
   let district=String(c.jurisdiction?.district||c.id?.split(':')[1]?.match(/-(\d{1,2})$/)?.[1]||'00');
   key+='-'+district.padStart(2,'0');
  }else if(c.special)key+='-sp';
  if(races[key])continue;
  const cands=(Array.isArray(c.candidates)?c.candidates:[]).map(x=>({
   name:String(x.name||''),
   party:party(x),
   votes:number(x.votes),
   pct:x.pct==null?null:Number(x.pct),
   winner:!!(c.call?.winners?.includes?.(String(x.id))),
   original_party:x.party
  }));
  if(cands.some(x=>x.votes>0))withVotes++;
  const as=c.updatedAt||null;if(as&&as>asof)asof=as;
  races[key]={cands,exp:c.reportingPct??null,asof:as,
     status:c.call?'Called by civicAPI':'Counting',
     called_by:c.call?.caller||null,
     url:'https://sitmap.live/elections/us-2026',
     src:'civicAPI via Sitmap',
     candidate_data_source:'State election authorities',
     sourceId:c.sourceId||null};
 }
 if(Object.keys(races).length<20||withVotes===0)throw Error('civicAPI не опубликовал подсчёт голосов');
 return {races,generated_at:doc.generatedAt||asof||doc.fetchedAt,
   source:'civicAPI via Sitmap (unofficial state-election counts)',
   election:'2026-11-03',coverage:{scope:'US: 50 states',races:Object.keys(races).length,withVotes,
   sourceUpdated:doc.fetchedAt||null,source:'civicAPI via sitmap.live',
   called:doc.counts?.called||null},feed_status:'live',api_version:2};
}
function openamerica(feeds){
 const races={};let withVotes=0,asof='';
 for(const [office,d] of Object.entries(feeds)){
  if(!d||Number(d.year)!==2026||!d.races)continue;
  for(const [id,race] of Object.entries(d.races)){
   const st=id.slice(0,2).toUpperCase();
   if(!STATES.has(st))continue;
   const suffix=office==='house'?'-'+(id.split('-')[1]||'00').padStart(2,'0'):id.endsWith('-special')?'-sp':'';
   const key=({senate:'S',governor:'G',house:'H'}[office])+'-'+st+suffix;
   const cands=(race.cands||[]).map(c=>({name:c.n||'',party:party(c),votes:number(c.v),pct:c.pct??null,winner:false}));
   if(cands.some(x=>x.votes>0))withVotes++;
   if(race.as_of&&race.as_of>asof)asof=race.as_of;
   races[key]={cands,exp:race.pct_in??null,asof:race.as_of||null,
     status:'Counting (not called)',url:'https://openamerica.io/elections/api/',
     src:'official state election feeds via Open America'};
  }
 }
 if(!withVotes)throw Error('Нет опубликованных голосов Open America');
 return {races,generated_at:asof||null,source:'State election offices via Open America',
   coverage:{scope:'22 of 50 states (partial)',races:Object.keys(races).length,withVotes},
   feed_status:'partial',api_version:1};
}
async function get(url,ms=8500){
 const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),ms);
 try{
  const u=new URL(url,location.href);u.searchParams.set('_',String(Date.now()));
  const r=await fetch(u,{cache:'no-store',signal:ac.signal,headers:{Accept:'application/json'}});
  if(!r.ok)throw Error('HTTP '+r.status);
  return await r.json();
 }finally{clearTimeout(timer)}
}
async function load(){
 // Check the current live feed and the published GitHub Pages mirror in parallel.
 // This avoids blocking the map when cross-origin requests are disallowed.
 const checks=await Promise.allSettled([
  (async()=>({data:sitmap(await get(SOURCE,7500)),channel:'civicAPI · Sitmap (LIVE)'}))(),
  (async()=>{
    const data=await get('./data/results.json',6500);
    const races=data?.races;
    const withVotes=races&&typeof races==='object'?Object.values(races).filter(r=>(r.cands||r.candidates||[]).some(c=>Number(c.votes??c.v??0)>0)).length:0;
    if(withVotes<1)throw Error('Резервная копия без голосов');
    return {data:{...data,coverage:data.coverage||{withVotes,races:Object.keys(races).length,scope:'не уточнено'}},channel:'GitHub Pages · резервная копия'};
  })()
 ]);
 const valid=checks.filter(x=>x.status==='fulfilled').map(x=>x.value);
 const issues=checks.filter(x=>x.status==='rejected').map(x=>String(x.reason?.message||x.reason));
 if(valid.length){
  // Prefer a current full-coverage feed over an older or 22-state partial snapshot.
  valid.sort((a,b)=>{
   const score=x=>Number(x.data?.coverage?.withVotes||0);
   const gap=score(b)-score(a);
   if(Math.abs(gap)>20)return gap;
   return (Date.parse(b.data?.coverage?.sourceUpdated||b.data?.generated_at)||0)
       -(Date.parse(a.data?.coverage?.sourceUpdated||a.data?.generated_at)||0);
  });
  return {...valid[0],diagnostics:{success:true,checks:valid.length,issues}};
 }
 try{
  const values=await Promise.allSettled(['senate','house','governor'].map(async office=>{
   const d=await get(OFFICIAL+'?year=2026&office='+office,7500);
   return [office,d];
  }));
  const feeds=Object.fromEntries(values.filter(x=>x.status==='fulfilled').map(x=>x.value));
  const data=openamerica(feeds);
  return {data,channel:'Open America · 22 штата (неполное покрытие)',diagnostics:{success:true,issues,partial:true}};
 }catch(e){issues.push('Open America: '+(e?.message||e))}
 throw Error('Ни один источник не вернул подсчитанные голоса: '+issues.join('; '));
}
root.ElectionResultsSource={sitmap,openamerica,load,source:SOURCE};
})(window);

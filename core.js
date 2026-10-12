(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.HomeScanCore=api;})(globalThis,function(){
 'use strict';
 const uid=()=>globalThis.crypto?.randomUUID?.()||'id_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2);
 const text=(v,n=500)=>String(v??'').slice(0,n);
 const esc=v=>text(v,100000).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const url=v=>{try{const u=new URL(String(v));return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
 const photo=v=>typeof v==='string'&&v.length<=4000000&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v)?v:'';
 const date=v=>{const s=String(v);return /^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s?s:'';};
 const cleanItem=(v={})=>({id:text(v.id||uid(),100),name:text(v.name||'Unnamed item',150),qty:Math.max(1,Math.min(999,Math.floor(Number(v.qty)||1))),photo:photo(v.photo),labelPhoto:photo(v.labelPhoto),brand:text(v.brand,120),model:text(v.model,160),serial:text(v.serial,200),notes:text(v.notes,10000),purchaseDate:date(v.purchaseDate),warrantyUntil:date(v.warrantyUntil),careDate:date(v.careDate),careNote:text(v.careNote,500),manualUrl:url(v.manualUrl),supportUrl:url(v.supportUrl),verified:v.verified===true,status:v.verified===true&&v.status!=='needs confirmation'?'user verified':'needs confirmation',source:text(v.source||'manual',30),family:text(v.family,100),labels:Object.fromEntries(Object.entries(v.labels||{}).slice(0,20).filter(([k,n])=>typeof k==='string'&&Number.isFinite(Number(n))).map(([k,n])=>[text(k,80),Number(n)])),documents:Array.isArray(v.documents)?v.documents.slice(0,30).filter(d=>d&&['application/pdf','image/jpeg','image/png','image/webp'].includes(d.type)&&typeof d.data==='string'&&d.data.length<=15000000&&new RegExp('^data:'+d.type.replace('/','\\/')+';base64,[A-Za-z0-9+/=]+$').test(d.data)).map(d=>({id:text(d.id||uid(),100),name:text(d.name,200),type:d.type,data:d.data})):[]});
 function fresh(){return {schema:2,activeProperty:'home',properties:[{id:'home',name:'My home',address:''}],rooms:[],draft:null,updated:new Date().toISOString()};}
 function normalise(raw){
  if(!raw||raw.schema!==2||!Array.isArray(raw.properties)||!Array.isArray(raw.rooms))throw Error('This is not a compatible HomeScan backup.');
  if(raw.properties.length>200||raw.rooms.length>2000)throw Error('This backup contains too many records.');
  const state=fresh();const ids=new Set();
  state.properties=raw.properties.map(p=>({id:text(p.id||uid(),100),name:text(p.name||'My property',150),address:text(p.address,1000)}));
  if(!state.properties.length)state.properties=fresh().properties;
  for(const p of state.properties){if(ids.has(p.id))throw Error('Duplicate property records.');ids.add(p.id);}
  state.activeProperty=ids.has(raw.activeProperty)?raw.activeProperty:state.properties[0].id;
  const roomIds=new Set();state.rooms=raw.rooms.map(r=>{
   if(!Array.isArray(r.items)||r.items.length>1000)throw Error('Invalid room items.');
   const id=text(r.id||uid(),100);if(roomIds.has(id))throw Error('Duplicate room records.');roomIds.add(id);
   const items=r.items.map(cleanItem), itemIds=new Set();for(const it of items){if(itemIds.has(it.id))throw Error('Duplicate item records.');itemIds.add(it.id);}
   return {id,propertyId:ids.has(r.propertyId)?r.propertyId:state.properties[0].id,name:text(r.name||r.room||'Room',150),created:text(r.created||new Date().toISOString(),60),updated:text(r.updated||r.created||new Date().toISOString(),60),items};
  });
  if(raw.draft&&Array.isArray(raw.draft.items)&&raw.draft.items.length<=1000)state.draft={roomId:roomIds.has(raw.draft.roomId)?raw.draft.roomId:null,propertyId:ids.has(raw.draft.propertyId)?raw.draft.propertyId:state.properties[0].id,name:text(raw.draft.name,150),items:raw.draft.items.map(cleanItem),updated:text(raw.draft.updated,60)};
  return state;
 }
 function legacy(rooms){const state=fresh();state.rooms=(Array.isArray(rooms)?rooms:[]).map(r=>({id:r.id||uid(),propertyId:'home',name:r.room||r.name||'Room',created:r.created,updated:r.updated,items:(r.items||[]).map(cleanItem)}));return normalise(state);}
 const backup=state=>JSON.stringify({format:'HomeScanBackup',version:2,exported:new Date().toISOString(),state:normalise(state)});
 function restore(value){const raw=typeof value==='string'?JSON.parse(value):value;if(raw.format!=='HomeScanBackup'||raw.version!==2)throw Error('Choose a HomeScan backup file.');return normalise(raw.state);}
 function mergeStates(current,incoming){
  const a=normalise(current),b=normalise(incoming),propertyMap=new Map();
  for(const p of b.properties){let existing=a.properties.find(x=>x.name===p.name&&x.address===p.address);if(!existing){existing={...p,id:a.properties.some(x=>x.id===p.id)?uid():p.id};a.properties.push(existing);}propertyMap.set(p.id,existing.id);}
  const content=r=>JSON.stringify({propertyId:r.propertyId,name:r.name,created:r.created,items:r.items});
  for(const room of b.rooms){const mapped={...room,propertyId:propertyMap.get(room.propertyId)};if(a.rooms.some(x=>content(x)===content(mapped)))continue;if(a.rooms.some(x=>x.id===room.id))mapped.id=uid();a.rooms.push(mapped);}
  if(!a.draft&&b.draft)a.draft={...b.draft,roomId:null,propertyId:propertyMap.get(b.draft.propertyId)};
  return normalise(a);
 }
 function mergeItems(items,sourceId,targetId){const source=items.find(x=>x.id===sourceId),target=items.find(x=>x.id===targetId);if(!source||!target||source===target)throw Error('Choose a different item.');const merged=cleanItem({...source,...target,photo:target.photo||source.photo,qty:Math.max(source.qty,target.qty),notes:[target.notes,source.notes].filter(Boolean).join('\n'),documents:[...(target.documents||[]),...(source.documents||[])]});return items.filter(x=>x.id!==sourceId).map(x=>x.id===targetId?merged:x);}
 const search=(state,q)=>{const needle=String(q).trim().toLocaleLowerCase();return state.rooms.flatMap(room=>room.items.filter(it=>[it.name,it.brand,it.model,it.serial,it.notes,room.name,state.properties.find(p=>p.id===room.propertyId)?.name].join(' ').toLocaleLowerCase().includes(needle)).map(item=>({room,item})));};
 function report(state,rooms=state.rooms){return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>HomeScan room record</title><style>body{font:16px system-ui;color:#20372e;max-width:900px;margin:auto;padding:24px}article{border-bottom:1px solid #ddd;padding:20px 0;break-inside:avoid}img{max-width:260px;max-height:200px;object-fit:contain}h1,h2{line-height:1.2}small{color:#64746c}p{white-space:pre-wrap}a{color:#276b52}@media print{button{display:none}}</style></head><body><button onclick="window.print()">Print / Save as PDF</button><h1>HomeScan room record</h1><small>Created '+esc(new Date().toLocaleDateString('en-IE'))+'</small>'+rooms.map(room=>'<section><h2>'+esc(state.properties.find(p=>p.id===room.propertyId)?.name)+' · '+esc(room.name)+'</h2>'+room.items.map(it=>'<article>'+(photo(it.photo)?'<img src="'+it.photo+'" alt="Item photo">':'')+'<h3>'+esc(it.name)+' × '+it.qty+'</h3><small>'+(it.verified&&it.status!=='needs confirmation'?'Checked by the owner':'Needs checking')+'</small><p>'+esc([it.brand,it.model].filter(Boolean).join(' · '))+'</p>'+(it.serial?'<p>Serial number: '+esc(it.serial)+'</p>':'')+(it.warrantyUntil?'<p>Warranty recorded until: '+esc(it.warrantyUntil)+'</p>':'')+'<p>'+esc(it.notes)+'</p>'+(url(it.manualUrl)?'<a href="'+esc(url(it.manualUrl))+'">Saved manual link</a>':'')+'</article>').join('')+'</section>').join('')+'</body></html>';}
 class Store{
  constructor(indexedDB,localStorage){this.api=indexedDB;this.local=localStorage;this.db=null;this.queue=Promise.resolve();}
  async open(){if(!this.api)throw Error('Local storage is unavailable. Use a normal browser window.');this.db=await new Promise((resolve,reject)=>{const r=this.api.open('homescan-household',1);r.onupgradeneeded=()=>r.result.createObjectStore('records');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(Error('Close other HomeScan tabs, then reopen this one.'));});return this;}
  async read(){return new Promise((resolve,reject)=>{const tx=this.db.transaction('records','readonly'),r=tx.objectStore('records').get('household');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
  write(value){const snapshot=JSON.parse(JSON.stringify(value));const task=this.queue.catch(()=>{}).then(()=>new Promise((resolve,reject)=>{const tx=this.db.transaction('records','readwrite');tx.objectStore('records').put(snapshot,'household');tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||Error('Storage could not save this record.'));tx.onabort=()=>reject(tx.error||Error('Saving was interrupted.'));}));this.queue=task;return task;}
  async load(){await this.open();const saved=await this.read();if(saved)return normalise(saved);let old=this.local?.getItem('homescan.rooms');const initial=old?legacy(JSON.parse(old)):fresh();await this.write(initial);return initial;}
 }
 return {uid,text,esc,url,photo,date,cleanItem,fresh,normalise,legacy,backup,restore,mergeStates,mergeItems,search,report,Store};
});

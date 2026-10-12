/* HomeScan Lab v1.2: short-term spatial tracking and conservative inventory. */
(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HomeScanDetection = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const useful = new Set(['refrigerator','oven','microwave','toaster','tv','laptop','keyboard','mouse','sink','couch','chair','dining table','bed','toilet','clock','book','backpack','suitcase','hair drier']);
  const nice = {refrigerator:'Fridge / refrigerator',tv:'Television',couch:'Sofa / couch','dining table':'Dining table','hair drier':'Hair dryer'};
  const name = label => nice[label] || label.replace(/\b\w/g,c=>c.toUpperCase());
  const family = label => ['oven','microwave'].includes(label) ? 'oven-microwave' : label;
  function iou(a,b) {
    const w=Math.max(0,Math.min(a[0]+a[2],b[0]+b[2])-Math.max(a[0],b[0]));
    const h=Math.max(0,Math.min(a[1]+a[3],b[1]+b[3])-Math.max(a[1],b[1]));
    const area=w*h; return area/(a[2]*a[3]+b[2]*b[3]-area || 1);
  }
  class Tracker {
    constructor() { this.reset(); }
    reset() { this.tick=0; this.next=0; this.tracks=[]; this.profiles=[]; }
    resetView() { this.tracks=[]; }
    inventory() { return this.profiles.filter(p=>!p.rejected); }
    pending() { return this.tracks.filter(t=>this.tick-t.last<=2 && !t.profile).length; }
    process(predictions,width,height,threshold=0.65) {
      if (!(width>0 && height>0)) return [];
      this.tick++;
      const groups=[];
      const input=predictions.filter(p=>useful.has(p.class) && p.score>=threshold && Number.isFinite(p.score) && Array.isArray(p.bbox) && p.bbox.length===4 && p.bbox.every(Number.isFinite) && p.bbox[2]>0 && p.bbox[3]>0).sort((a,b)=>b.score-a.score);
      for(const p of input) {
        const box=[p.bbox[0]/width,p.bbox[1]/height,p.bbox[2]/width,p.bbox[3]/height];
        // Strongly overlapping, compatible boxes in ONE frame are one observation.
        const existing=groups.find(g=>g.family===family(p.class) && iou(g.box,box)>=0.65);
        if(existing) existing.labels[p.class]=Math.max(existing.labels[p.class]||0,p.score);
        else groups.push({box,bbox:p.bbox,family:family(p.class),labels:{[p.class]:p.score}});
      }
      this.tracks=this.tracks.filter(t=>this.tick-t.last<=6);
      // Match globally by overlap; each track and detection can be used once.
      const pairs=[];
      groups.forEach((g,gi)=>this.tracks.forEach((t,ti)=>{
        if(t.family!==g.family) return;
        const overlap=iou(t.box,g.box);
        if(overlap>=0.3) pairs.push({gi,ti,overlap});
      }));
      pairs.sort((a,b)=>b.overlap-a.overlap);
      const usedTracks=new Set(),usedGroups=new Set();
      for(const pair of pairs) {
        if(usedTracks.has(pair.ti)||usedGroups.has(pair.gi)) continue;
        groups[pair.gi].track=this.tracks[pair.ti]; usedTracks.add(pair.ti); usedGroups.add(pair.gi);
      }
      for(const g of groups) {
        if(!g.track) { g.track={id:++this.next,family:g.family,box:g.box,last:this.tick,hits:[],labels:{},profile:null}; this.tracks.push(g.track); }
        const t=g.track; t.box=g.box; t.last=this.tick;
        t.hits=t.hits.filter(f=>this.tick-f<=7); t.hits.push(this.tick);
        for(const [label,score] of Object.entries(g.labels)) t.labels[label]=Math.max(t.labels[label]||0,score);
      }
      // Claim all already-linked objects before assigning any new ones. This
      // keeps two concurrently visible appliances separate, even after a pan.
      const claimed=new Set(groups.filter(g=>g.track.profile).map(g=>g.track.profile.id));
      for(const g of groups) {
        const t=g.track;
        if(!t.profile && t.hits.length>=3) {
          // A returning view must not automatically increase the room count.
          // Reuse an unclaimed compatible inventory slot and flag uncertainty.
          let p=this.profiles.find(p=>p.source!=='manual' && p.family===t.family && !claimed.has(p.id));
          if(p) { p.review=true; }
          else {
            p={id:'camera_'+t.id,family:t.family,name:'',qty:1,conf:0,seen:0,source:'camera',labels:{},verified:false,review:false,rejected:false};
            this.profiles.push(p);
          }
          p.seen+=t.hits.length-1;
          t.profile=p; claimed.add(p.id);
        }
        if(t.profile) {
          const p=t.profile;
          if(p.lastTick!==this.tick) { p.seen++; p.lastTick=this.tick; }
          for(const [label,score] of Object.entries(t.labels)) p.labels[label]=Math.max(p.labels[label]||0,score);
          p.conf=Math.max(p.conf,...Object.values(p.labels));
          if(!p.verified) {
            const labels=Object.keys(p.labels);
            p.name=labels.length>1 ? 'Oven / microwave' : name(labels[0]);
            p.status=labels.length>1 || p.review ? 'needs confirmation' : 'detected';
          } else p.status=p.review?'needs confirmation':'user verified';
        }
      }
      return groups.map(g=>({bbox:g.bbox,name:g.track.profile?.name || name(Object.keys(g.labels)[0]),score:Math.max(...Object.values(g.labels)),status:g.track.profile?.status || 'checking'}));
    }
    edit(id,value) {
      const p=this.profiles.find(p=>p.id===id); const clean=String(value||'').trim();
      if(p && clean && clean.toLowerCase()!=='oven / microwave') {p.name=clean; p.verified=true; p.review=false; p.status='user verified';}
    }
    verify(id) {const p=this.profiles.find(p=>p.id===id); if(p) this.edit(id,p.name);}
    adjust(id,delta) {const p=this.profiles.find(p=>p.id===id); if(p) p.qty=Math.max(1,p.qty+delta);}
    remove(id) {const p=this.profiles.find(p=>p.id===id); if(p) p.rejected=true;}
    manual(value) {
      const clean=String(value||'').trim(); if(!clean) return;
      this.profiles.push({id:'manual_'+ ++this.next,name:clean,qty:1,conf:null,seen:0,source:'manual',labels:{},verified:true,status:'user verified'});
    }
    load(items) {
      this.reset();
      for(const item of items) {
        const label=Object.keys(nice).find(k=>nice[k]===item.name) || String(item.name||'').toLowerCase();
        const p={...item,id:'saved_'+ ++this.next,name:item.name||'Item',qty:Math.max(1,Number(item.qty)||1),labels:{...(item.labels||{})},seen:Number(item.seen)||0,source:item.source||'saved',rejected:false};
        p.family=item.family || (useful.has(label)?family(label):null);
        if(!Object.keys(p.labels).length && useful.has(label)) p.labels[label]=Number(item.conf)||0;
        p.verified=item.verified===true || p.source==='manual';
        p.review=!p.verified; p.status=p.verified?'user verified':'needs confirmation';
        delete p.lastTick; this.profiles.push(p);
      }
    }
  }
  return {Tracker,useful,displayName:name,iou};
});

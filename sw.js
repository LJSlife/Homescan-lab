const CACHE='homescan-lab-v2.6.3';
const LOCAL=['./index.html','./styles.css?v=2.6.3','./core.js?v=2.6.3','./catalog.js?v=2.6.3','./focused.js?v=2.6.3','./focused-worker.js?v=2.6.3','./voice.js?v=2.6.3','./labels.js?v=2.6.3','./experience.js?v=2.6.3','./memories.js?v=2.6.3','./email-config.js?v=2.6.3','./email.js?v=2.6.3','./app.js?v=2.6.3','./detection.js?v=2.6.3','./privacy.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(LOCAL)));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE && k.startsWith('homescan-lab-')).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET' || new URL(req.url).origin!==self.location.origin) return;
  // Prefer deployed files, retaining an offline fallback for local assets.
  event.respondWith((async()=>{
    try{
      const res=await fetch(req);
      if(res.ok) {const cache=await caches.open(CACHE); await cache.put(req,res.clone());}
      return res;
    }catch(err){
      const hit=await caches.match(req);
      if(hit) return hit;
      if(req.mode==='navigate') {const page=await caches.match('./index.html'); if(page) return page;}
      throw err;
    }
  })());
});

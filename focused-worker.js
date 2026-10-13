self.onmessage=async event=>{
 const {image,entries,groups,paths={}}=event.data;
 try{
  if(self.OffscreenCanvas){const getContext=OffscreenCanvas.prototype.getContext;OffscreenCanvas.prototype.getContext=function(type,options){return getContext.call(this,type,type==='2d'?{...options,willReadFrequently:true}:options);};}
  const originalFetch=self.fetch.bind(self);self.fetch=(input,options)=>{const url=new URL(typeof input==='string'?input:input.url);if(url.hostname==='huggingface.co'&&url.pathname.endsWith('.onnx')){url.searchParams.set('download','true');return originalFetch(url.href,options);}return originalFetch(input,options);};
  const {pipeline,env}=await import(paths.runtime||'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js');
  env.allowLocalModels=false;env.backends.onnx.wasm.numThreads=1;env.backends.onnx.wasm.proxy=false;
  if(paths.modelHost){env.remoteHost=paths.modelHost;env.remotePathTemplate='{model}/';}
  if(paths.wasm)env.backends.onnx.wasm.wasmPaths=paths.wasm;
  const classify=await pipeline('zero-shot-image-classification','Xenova/clip-vit-base-patch32',{quantized:true,progress_callback:m=>self.postMessage({progress:m.status==='progress'?'Getting the broader item reader ready…':'Preparing the item reader…'})});
  self.postMessage({progress:'Looking closely at your item…'});
  const broad=await classify(image,[...groups.map(x=>x.label),'an empty scene or an unrecognisable object'],{hypothesis_template:'a photo of {}'});
  if(broad[0].label==='an empty scene or an unrecognisable object'){await classify.dispose();self.postMessage({result:[]});return;}
  const selected=broad.slice(0,2).map(x=>groups.find(g=>g.label===x.label)?.category).filter(Boolean);
  const labels=entries.filter(x=>selected.includes(x.category)).map(x=>x.prompt);
  const output=await classify(image,labels,{hypothesis_template:'a photo of a {}'});
  await classify.dispose();self.postMessage({result:output});
 }catch(error){console.error('Item reader failed',error);try{const cache=await caches.open('transformers-cache');for(const req of await cache.keys())if(req.url.includes('/Xenova/clip-vit-base-patch32/'))await cache.delete(req);}catch{}self.postMessage({error:error.message||'The item reader could not run.'});}
};

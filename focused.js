(() => {
 'use strict';
 class Reader{
  constructor(){this.worker=null;this.finish=null;}
  cancel(){this.worker?.terminate();this.worker=null;this.finish?.(Error('Reading stopped.'));this.finish=null;}
  read(image,onProgress=()=>{}){this.cancel();return new Promise((resolve,reject)=>{let timer;const done=(error,result)=>{clearTimeout(timer);this.worker?.terminate();this.worker=null;this.finish=null;error?reject(error):resolve(result);};this.finish=done;this.worker=new Worker('focused-worker.js?v=2.6.1');this.worker.onmessage=event=>{const data=event.data;if(data.progress)onProgress(data.progress);if(data.error)done(Error('The broader item reader could not finish. Choose an item type below, or try again on Wi-Fi.'));if(data.result)done(null,HomeScanCatalog.suggestions(data.result));};this.worker.onerror=()=>done(Error('This device could not open the broader item reader. Choose an item type below.'));timer=setTimeout(()=>done(Error('Reading took too long. Choose an item type or try a closer photo.')),180000);this.worker.postMessage({image,entries:HomeScanCatalog.entries,groups:HomeScanCatalog.visualGroups,paths:window.HomeScanVisionPaths||{}});});}
 }
 window.HomeScanFocused={Reader};
})();

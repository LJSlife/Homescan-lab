(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.HomeScanCatalog=api;})(globalThis,function(){
 const groups={
 'Jewellery':['Ring','Necklace','Bracelet','Earrings','Watch','Brooch'],
 'Electronics':['Smartphone','Tablet','Laptop','Television','Camera','Headphones','Games console','Keyboard','Computer mouse','Charger'],
 'Furniture & home':['Sofa / couch','Armchair','Chair','Dining table','Desk','Bed','Wardrobe','Bookcase','Mirror','Lamp','Curtains','Rug','Paint tin'],
 'Clothes & footwear':['Shirt','T-shirt','Coat','Jacket','Dress','Trousers','Jumper','Shoes','Trainers','Handbag','Hat'],
 'Bedding & linen':['Duvet','Blanket','Pillow','Bed sheet','Towel'],
 'Beauty & personal care':['Perfume','Lipstick','Face cream','Shampoo','Hair dryer','Electric shaver'],
 'Appliances':['Fridge','Freezer','Oven','Microwave','Cooker','Dishwasher','Washing machine','Dryer','Toaster','Kettle','Coffee machine','Vacuum cleaner','Boiler','Radiator','Air conditioner','Smoke alarm'],
 'Car & tools':['Car seat','Car tyre','Car keys','Spanner','Screwdriver','Drill','Toolbox'],
 'School, university & work':['Book','Notebook','Pen','Pencil case','Backpack','Calculator','Document'],
 'Travel, sport & recreation':['Suitcase','Football','Rugby ball','Tennis racket','Bicycle','Helmet','Yoga mat','Guitar','Board game'],
 'Food & kitchenware':['Apple','Banana','Bread','Milk','Eggs','Food container','Saucepan','Plate','Cup','Water bottle']};
 const categories=[...Object.keys(groups),'Faith & personal items','Wellbeing & personal items','Other'];
 const entries=Object.entries(groups).flatMap(([category,names])=>names.map(name=>({name,category,prompt:({'Sofa / couch':'sofa','Computer mouse':'computer mouse','Ring':'jewellery finger ring','Watch':'wristwatch','Face cream':'jar of face cream','Paint tin':'tin of wall paint','Document':'paper document','Car tyre':'car tire'})[name]||name.toLowerCase()})));
 const find=name=>entries.find(x=>x.name.toLowerCase()===String(name).trim().toLowerCase());
 function suggestions(raw){return raw.filter(x=>Number.isFinite(x.score)).sort((a,b)=>b.score-a.score).map(x=>{const item=entries.find(y=>y.prompt===x.label);return item?{name:item.name,category:item.category}:null;}).filter(Boolean).slice(0,3);}
 const visualGroups=Object.entries(groups).map(([category])=>({category,label:({'Furniture & home':'furniture or home furnishings','Clothes & footwear':'clothing or shoes','Bedding & linen':'bedding, pillows or towels','Beauty & personal care':'cosmetics or personal care products','Car & tools':'car accessories or hand tools','School, university & work':'books, bags or stationery','Travel, sport & recreation':'travel luggage, sports equipment or musical instruments','Food & kitchenware':'food or kitchen utensils'})[category]||category.toLowerCase()}));
 return {groups,categories,entries,visualGroups,find,suggestions};
});

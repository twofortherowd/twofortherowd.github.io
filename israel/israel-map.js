(function(){
  const places=[
    {n:1,name:'Tel Aviv',lat:32.0853,lng:34.7818,day:'Days 1 & 9',text:'Arrival, coastal city and departure.'},
    {n:2,name:'Jerusalem',lat:31.778,lng:35.235,day:'Days 2–3',text:'Old City, Mount of Olives, Gethsemane and the Via Dolorosa.',url:'/israel/jerusalem.html'},
    {n:3,name:'Bethlehem',lat:31.7054,lng:35.2024,day:'Day 4',text:'Church of the Nativity and Manger Square.',url:'/israel/bethlehem.html'},
    {n:4,name:'Jericho',lat:31.8611,lng:35.4618,day:'Day 4',text:'Ancient Jericho and the Mount of Temptation area.'},
    {n:5,name:'Qasr al-Yahud',lat:31.8372,lng:35.5393,day:'Day 4',text:'Jordan River baptism site.'},
    {n:6,name:'Masada',lat:31.3156,lng:35.3534,day:'Day 5',text:'Herod’s desert fortress above the Dead Sea.',url:'/israel/masada-dead-sea.html'},
    {n:7,name:'Ein Gedi & Dead Sea',lat:31.4504,lng:35.3839,day:'Day 5',text:'Desert nature reserve and Dead Sea floating.',url:'/israel/masada-dead-sea.html'},
    {n:8,name:'Caesarea',lat:32.5005,lng:34.892,day:'Day 7',text:'Roman theatre, harbour and aqueduct.'},
    {n:9,name:'Akko',lat:32.9236,lng:35.0712,day:'Day 7',text:'Crusader city and UNESCO-listed old town.'},
    {n:10,name:'Haifa',lat:32.794,lng:34.9896,day:'Day 7',text:'Baháʼí Gardens and Mediterranean views.'},
    {n:11,name:'Sea of Galilee',lat:32.824,lng:35.583,day:'Days 6 & 8',text:'Boat trip and Christian sites around the lake.',url:'/israel/sea-of-galilee.html'},
    {n:12,name:'Capernaum',lat:32.8803,lng:35.5755,day:'Day 8',text:'Centre of Jesus’ ministry.',url:'/israel/sea-of-galilee.html'},
    {n:13,name:'Nazareth',lat:32.6996,lng:35.3035,day:'Day 8',text:'Church of the Annunciation and Jesus’ hometown.',url:'/israel/sea-of-galilee.html'}
  ];
  const mapEl=document.getElementById('journeyMap');
  if(!mapEl)return;
  function fail(){mapEl.innerHTML='<div style="height:100%;display:grid;place-items:center;padding:25px;text-align:center"><strong>The interactive map could not load.<br><small>Please refresh or allow Leaflet and OpenStreetMap.</small></strong></div>'}
  function init(){
    if(mapEl.dataset.ready||mapEl._leaflet_id||!window.L)return;
    mapEl.dataset.ready='1';
    const map=L.map(mapEl,{scrollWheelZoom:false});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors',maxZoom:18}).addTo(map);
    const coords=[];
    places.forEach(function(p){
      coords.push([p.lat,p.lng]);
      const icon=L.divIcon({className:'',html:'<div style="width:30px;height:30px;border-radius:50%;background:#174a7e;color:#fff;border:3px solid #ffd84a;display:grid;place-items:center;font:700 11px DM Sans">'+p.n+'</div>',iconSize:[30,30],iconAnchor:[15,15]});
      const link=p.url?'<br><a style="font-weight:800;color:#174a7e" href="'+p.url+'">Open guide →</a>':'';
      L.marker([p.lat,p.lng],{icon:icon}).addTo(map).bindPopup('<strong>'+p.name+'</strong><br><small>'+p.day+'</small><br>'+p.text+link);
    });
    L.polyline(coords,{color:'#e8562a',weight:3,opacity:.72,dashArray:'7 7'}).addTo(map);
    map.fitBounds(coords,{padding:[25,25]});
    setTimeout(function(){map.invalidateSize()},150);
  }
  function load(){
    if(window.L){init();return}
    const script=document.createElement('script');
    script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload=init;
    script.onerror=fail;
    document.head.appendChild(script);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();

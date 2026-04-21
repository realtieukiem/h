var HL={};
HX.forEach(function(h){HL[h.u+h.l]=h;});

function byBits(bits){return HL[bits] || HX[0];}
function escapeHtml(value){
  return String(value==null?'':value).replace(/[&<>"']/g,function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
  });
}
function lineHtml(hex,line){
  var html='';
  for(var i=5;i>=0;i--){
    var yang=(i<3 ? hex.l[i] : hex.u[i-3])==='1';
    var active=i===line;
    html += yang
      ? '<div class="hl y'+(active?' a':'')+'"></div>'
      : '<div class="hl n'+(active?' a':'')+'"><span></span><span></span></div>';
  }
  return html;
}
function flipLine(hex,line){
  var upper=hex.u.split('');
  var lower=hex.l.split('');
  if(line<3) lower[line]=lower[line]==='1'?'0':'1';
  else upper[line-3]=upper[line-3]==='1'?'0':'1';
  return byBits(upper.join('')+lower.join(''));
}
function randomInt(max){return Math.floor(Math.random()*max);}
function randomHex(){return HX[randomInt(HX.length)];}
function upperName(hex){return TN[TT[hex.u]] || '';}
function lowerName(hex){return TN[TT[hex.l]] || '';}
function hexCard(hex,line,label){
  return '<div class="card hex-card">'+
    '<div class="hvis">'+lineHtml(hex,line)+'</div>'+
    '<div>'+
      '<span class="pill">'+escapeHtml(label || ('Quẻ '+hex.id))+'</span>'+
      '<h3>'+escapeHtml(hex.n)+' <span style="color:var(--gold)">'+escapeHtml(hex.c)+'</span></h3>'+
      '<div class="meta">Quẻ '+hex.id+' · Ngoại '+escapeHtml(upperName(hex))+' · Nội '+escapeHtml(lowerName(hex))+'</div>'+
      '<p>'+escapeHtml(hex.m)+'</p>'+
      (line>=0?'<div class="reading"><p><strong>Hào '+escapeHtml(HN[line])+' động:</strong> '+escapeHtml(hex.h[line])+'</p></div>':'')+
    '</div>'+
  '</div>';
}
function tendency(hex,line){
  var text=[];
  var upper=upperName(hex), lower=lowerName(hex);
  text.push('Quẻ này lấy tượng '+lower+' ở trong và '+upper+' ở ngoài, nên việc đang hỏi có một phần nội lực bên trong và một thế ứng xử bên ngoài cần đặt cho đúng.');
  if(line<=1) text.push('Hào động ở phần dưới cho thấy việc còn ở giai đoạn khởi sự. Nên sửa nền, hỏi lại điều cốt lõi, chưa nên vội chốt kết quả.');
  else if(line<=3) text.push('Hào động ở giữa cho thấy tình thế đang chuyển. Điều quan trọng là chọn cách làm cân bằng, không để cảm xúc kéo lệch quyết định.');
  else text.push('Hào động ở phần trên cho thấy việc đã gần tới điểm đổi pha. Nên chuẩn bị kết thúc một nhịp cũ và chuyển sang cách ứng xử mới.');
  text.push('Lời khuyên: lấy ý chính của quẻ làm trục, làm chậm lại một nhịp, giữ điều đúng và chỉ tiến khi phần chuẩn bị đã đủ.');
  return text.map(function(t){return '<p>'+escapeHtml(t)+'</p>';}).join('');
}
function renderCatalog(targetId){
  var target=document.getElementById(targetId);
  if(!target || target.getAttribute('data-ready')==='1') return;
  target.innerHTML=HX.map(function(hex){
    return '<button class="card hex-card" type="button" onclick="showHexDetail('+hex.id+')">'+
      '<div class="hvis">'+lineHtml(hex,-1)+'</div>'+
      '<div><span class="pill">Quẻ '+hex.id+'</span><h3>'+escapeHtml(hex.n)+' <span style="color:var(--gold)">'+escapeHtml(hex.c)+'</span></h3><p>'+escapeHtml(hex.m)+'</p></div>'+
    '</button>';
  }).join('');
  target.setAttribute('data-ready','1');
}
function showHexDetail(id){
  var hex=HX.filter(function(h){return h.id===id;})[0];
  var out=document.getElementById('hexDetail');
  if(out && hex) out.innerHTML=hexCard(hex,-1,'Tra cứu 64 quẻ')+'<div class="card"><h3>Luận giải khái quát</h3><div class="reading">'+tendency(hex,2)+'</div></div>';
  var detailTab=document.querySelector('[data-tab-target="detail"]');
  if(detailTab) switchLocalTab('detail');
}
function switchLocalTab(name){
  document.querySelectorAll('.tab').forEach(function(btn){btn.classList.toggle('on',btn.getAttribute('data-tab-target')===name);});
  document.querySelectorAll('.tab-panel').forEach(function(panel){panel.classList.toggle('on',panel.id===name);});
}

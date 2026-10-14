(function(){
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const P=[
{id:'sonar',n:'Sonar Municipal',y:2026,yr:'2025–26',a:'NLP',k:'Pesquisa + produto',st:'Público · demo no ar',badge:'Imprensa',
 what:'Busca em linguagem natural sobre projetos de lei municipais. Um PTT5 ajustado reescreve cada ementa como uma ação curta.',
 why:'Gestores encontram políticas que já deram certo em outras cidades, cruzadas com dados de segurança e educação.',
 m:'0,704',ml:'nDCG@10, contra 0,536 do BM25',ev:['220 mil PLs','322 municípios','3 DOIs','Jornal da USP','Agência FAPESP'],sk:'PTT5 + LoRA · E5 · Qdrant · Next.js',s:{imp:10,tec:9,evi:10},
 prob:'As soluções de um município raramente chegam ao vizinho; os projetos de lei estão espalhados em centenas de sites de câmaras.',
 sol:'Coleta automática em 322 câmaras, reescrita das ementas como ações e busca semântica com reranqueamento.',
 res:'nDCG@10 de 0,704 num benchmark estilo TREC com três juízes LLM (κ = 0,672). Matérias no Jornal da USP, Agência FAPESP e Rádio USP.'},
{id:'portrait',n:'Portrait Stylization',y:2023,yr:'2021–23',a:'Visão',k:'Pesquisa',st:'Público · open source',badge:'Artigo',
 what:'Transferência de estilo para retratos com perdas de identidade facial (FaceNet) e de malha facial (FaceMesh).',
 why:'Pesquisa original de autor único e o repositório com mais tração orgânica da conta.',
 m:'79 ★',ml:'no GitHub, 13 forks',ev:['arXiv 2309.13492','autor único','ablações + Colab'],sk:'PyTorch · VGG-19 · MODNet',s:{imp:6,tec:8,evi:9},
 prob:'A transferência de estilo clássica deforma o rosto e a pessoa deixa de ser reconhecível.',
 sol:'Duas perdas auxiliares que preservam identidade e geometria do rosto, com remoção de fundo.',
 res:'Artigo no arXiv, 79 estrelas e ablações com imagens comparativas.'},
{id:'sva',n:'SVA-VAE',y:2026,yr:'2024–26',a:'Generativos',k:'Iniciação científica',st:'Privado · relatório',badge:'Pesquisa',
 what:'Reimplementação do LiteVAE e uma variante própria que codifica imagem e máscara num único latente.',
 why:'Gera dados sintéticos para segmentação médica, partindo de um artigo sem código oficial.',
 m:'FAPESP',ml:'bolsa de IC no IARA',ev:['latente imagem + máscara','WGAN-GP latente','destilação VA-VAE → LiteVAE'],sk:'PyTorch · Weights & Biases',s:{imp:7,tec:9,evi:4},
 prob:'Segmentação médica precisa de muitas imagens anotadas, e anotar é caro.',
 sol:'Um autoencoder que comprime imagem e máscara juntas e uma GAN no espaço latente que gera novos pares.',
 res:'Segundo o relatório, reconstrói RGB melhor que o SDXL-VAE e o VA-VAE no MS-COCO.'},
{id:'atlas',n:'Neural Atlases',y:2022,yr:'2022',a:'Visão',k:'Open source',st:'Público',badge:'Open source',
 what:'Edição de vídeo consistente com atlas neurais em camadas.',
 why:'Vai além da implementação oficial, com um recurso feito em conversa com o autor do artigo.',
 m:'34 ★',ml:'no GitHub',ev:['atlas multicamada','atlas animados','remoção de camadas'],sk:'PyTorch · MODNet',s:{imp:5,tec:8,evi:7},
 prob:'Editar um objeto em vídeo quadro a quadro gera tremulação.',
 sol:'Atlas neurais que separam o vídeo em camadas editáveis como imagens únicas.',
 res:'34 estrelas e recursos que a versão oficial não tem.'},
{id:'kin',n:'k-Influential Nodes',y:2023,yr:'2023',a:'Grafos',k:'Artigo',st:'Publicado',badge:'Artigo',
 what:'Redes de influência entre ações para escolher carteiras de investimento.',
 why:'Artigo revisado por pares no IEEE ICDMW, testado em 6 índices de mercado.',
 m:'IEEE',ml:'ICDMW 2023',ev:['6 índices de mercado','correlação com defasagem','DOI'],sk:'Python · redes complexas',s:{imp:5,tec:7,evi:8},
 prob:'Correlação simples não mostra quais ações puxam as outras.',
 sol:'Redes direcionadas de influência e seleção dos nós mais influentes para compor a carteira.',
 res:'Publicado no IEEE ICDMW 2023.'},
{id:'sim',n:'Simulador ICMC',y:2021,yr:'Graduação',a:'Ferramentas',k:'Open source',st:'Demo no ar',badge:'Demo',
 what:'Simulador do processador didático do ICMC no navegador.',
 why:'Ferramenta para alunos da USP, com jogos de exemplo rodando.',
 m:'Demo',ml:'no GitHub Pages',ev:['JavaScript puro','jogos de exemplo'],sk:'JavaScript',s:{imp:4,tec:5,evi:6},
 prob:'Rodar programas do processador didático exigia instalar ferramentas.',
 sol:'Um simulador que roda direto no navegador.',
 res:'Demo pública no GitHub Pages.'}
];
const IMG={
 "sonar": "assets/img/sonar.jpg",
 "portrait": "assets/img/portrait.jpg",
 "atlas": "assets/img/atlas.jpg",
 "sva": "assets/img/sva.svg",
 "kin": "assets/img/kin.svg",
 "sim": "assets/img/sim.svg",
 "ps_o1": "assets/img/ps-original-1.jpg",
 "ps_s1": "assets/img/ps-style-1.jpg",
 "ps_r1": "assets/img/ps-result-1.jpg",
 "ps_o2": "assets/img/ps-original-2.jpg",
 "ps_s2": "assets/img/ps-style-2.jpg",
 "ps_r2": "assets/img/ps-result-2.jpg",
 "ps_o3": "assets/img/ps-original-3.jpg",
 "ps_s3": "assets/img/ps-style-3.jpg",
 "ps_r3": "assets/img/ps-result-3.jpg",
 "ps_o4": "assets/img/ps-original-4.jpg",
 "ps_s4": "assets/img/ps-style-4.jpg",
 "ps_r4": "assets/img/ps-result-4.jpg",
 "ps_o5": "assets/img/ps-original-5.jpg",
 "ps_s5": "assets/img/ps-style-5.jpg",
 "ps_r5": "assets/img/ps-result-5.jpg",
 "ps_o6": "assets/img/ps-original-6.jpg",
 "ps_s6": "assets/img/ps-style-6.jpg",
 "ps_r6": "assets/img/ps-result-6.jpg",
 "ps_all": "assets/img/ps-ablation-all.jpg",
 "ps_novgg": "assets/img/ps-ablation-novgg.jpg",
 "ps_nofacenet": "assets/img/ps-ablation-nofacenet.jpg",
 "ps_nomesh": "assets/img/ps-ablation-nomesh.jpg"
};
const VID={
 "blackswan": "assets/video/blackswan.mp4",
 "blackswan_edited": "assets/video/blackswan-edited.mp4",
 "surf": "assets/video/surf.mp4",
 "surf_edited": "assets/video/surf-edited.mp4",
 "paragliding": "assets/video/paragliding.mp4",
 "paragliding_edited": "assets/video/paragliding-edited.mp4",
 "paragliding_no_foreground": "assets/video/paragliding-no-foreground.mp4"
};VID.atlas=VID.blackswan_edited;
const media=(p,alt)=>VID[p.id]?`<video src="${VID[p.id]}" autoplay muted loop playsinline${alt?` aria-label="${alt}"`:' aria-hidden="true"'}></video>`:`<img src="${IMG[p.id]}" alt="${alt}">`;
const PSX=[['Eletricidade',1],['Abstrato fluido',2],['Pintura a óleo',3],['Abstrato em ondas',4],['Abstrato com folhagem',5],['Chamas',6]];
const ABL=[['all','Modelo completo'],['novgg','Sem perda de conteúdo (VGG)'],['nofacenet','Sem identidade (FaceNet)'],['nomesh','Sem malha facial (FaceMesh)']];
const psDemo=()=>`<div class="demos" style="background:${COL.portrait}"><h4>Exemplos do repositório</h4><p class="lead">Foto original + imagem de estilo → resultado com o rosto preservado.</p>
 <div class="psg">${PSX.map(([t,i])=>`<figure><div class="ins"><img src="${IMG['ps_o'+i]}" alt="Foto original ${i}"><img src="${IMG['ps_s'+i]}" alt="Estilo: ${t}"></div><img class="res" src="${IMG['ps_r'+i]}" alt="Resultado ${i} com estilo ${t}"><figcaption>${t}</figcaption></figure>`).join('')}</div>
 <h4 style="margin-top:clamp(28px,4vw,48px)">Ablação: o que cada perda faz</h4>
 <div class="abl">${ABL.map(([k,t])=>`<figure><img src="${IMG['ps_'+k]}" alt="${t}"><figcaption>${t}</figcaption></figure>`).join('')}</div></div>`;
const DEMOS={atlas:[
 {t:'Black swan',d:'Padrão desenhado no pescoço e no corpo',v:[['Original','blackswan'],['Editado','blackswan_edited']]},
 {t:'Paragliding',d:'Nova arte aplicada ao parapente',v:[['Original','paragliding'],['Editado','paragliding_edited']]},
 {t:'Surf',d:'Desenho aplicado à vela',v:[['Original','surf'],['Editado','surf_edited']]},
 {t:'Remoção de camada',d:'O primeiro plano some e o fundo é reconstruído pelo atlas',v:[['Original','paragliding'],['Sem o primeiro plano','paragliding_no_foreground']]}]};
const COL={sonar:'#2340ff',portrait:'#e3335b',sva:'#6a1fb5',atlas:'#e25a0b',kin:'#13204a',sim:'#0f5257'};
const SRC={
 sonar:[['Site','https://sonar-municipal.vercel.app'],['Código','https://github.com/thiagoambiel/SonarMunicipal'],['Modelo · Hugging Face','https://huggingface.co/thiagoambiel/sonar_municipal_ptt5_ementa2action'],['DOI · pipeline','https://doi.org/10.5281/zenodo.20518536'],['DOI · benchmark','https://doi.org/10.5281/zenodo.20564284'],['DOI · modelo','https://doi.org/10.5281/zenodo.20564327']],
 portrait:[['Artigo · arXiv','https://arxiv.org/abs/2309.13492'],['Código','https://github.com/thiagoambiel/PortraitStylization'],['Demo · Colab','https://colab.research.google.com/github/thiagoambiel/PortraitStylization/blob/colab/notebooks/PortraitStylization_Demo.ipynb']],
 sva:[['Artigo base · LiteVAE','https://arxiv.org/abs/2405.14477'],['Código privado · relatório sob pedido','#contato']],
 atlas:[['Código','https://github.com/thiagoambiel/NeuralAtlases'],['Artigo original','https://arxiv.org/abs/2109.11418']],
 kin:[['Artigo · IEEE','https://doi.org/10.1109/ICDMW60847.2023.00066']],
 sim:[['Demo','https://thiagoambiel.github.io/SimuladorICMC/'],['Código','https://github.com/thiagoambiel/SimuladorICMC']]};
const srcA=([t,u])=>u[0]==='#'?`<a class="priv" href="${u}">${t}</a>`:`<a href="${u}" target="_blank" rel="noopener">${t} <i>↗</i></a>`;
const AREA={NLP:'Busca & NLP',Visão:'Visão computacional',Generativos:'Modelos generativos',Produto:'Produto & mobile',Sistemas:'Sistemas distribuídos',Grafos:'Redes complexas',Ferramentas:'Ferramentas'};
const ORDER=['sonar','portrait','sva','atlas','kin','sim'];
const L=ORDER.map(id=>P.find(p=>p.id===id));
const SHOW=4;
const PRESS=[
 {o:'Jornal da USP',d:'12 mar 2026',k:'Reportagem',q:'Aluno da USP cria plataforma que identifica políticas públicas eficazes em municípios brasileiros',u:'https://jornal.usp.br/universidade/aluno-da-usp-cria-plataforma-que-identifica-politicas-publicas-eficazes-em-municipios-brasileiros/'},
 {o:'Agência FAPESP',d:'10 abr 2026',k:'Reportagem',q:'Criado por estudante da USP de São Carlos, o Sonar Municipal funciona como se fosse um Google para leis municipais',u:'https://agencia.fapesp.br/57709'},
 {o:'Rádio USP',d:'29 abr 2026',k:'Entrevista em vídeo · Instagram',q:'Entrevista em vídeo sobre o Sonar Municipal, publicada no Instagram da Rádio USP.',u:'https://www.instagram.com/reels/DWYxEyzDnJo/',plain:1,cta:'Assistir ao vídeo ↗'}];
const lnk=(x,inner,cls)=>x.u?`<a class="${cls||''}" href="${x.u}" target="_blank" rel="noopener">${inner}</a>`:`<span class="${cls||''}">${inner}</span>`;
document.getElementById('pl').innerHTML=PRESS.map(x=>`<li class="pi">${x.u?`<a href="${x.u}" target="_blank" rel="noopener">`:'<a role="presentation" style="cursor:default">'}<span class="out">${x.o}<small>${x.k}</small></span>${x.plain?`<span style="font-size:clamp(22px,2.5vw,36px);line-height:1.2;letter-spacing:-.025em">${x.q}</span>`:`<q>${x.q}</q>`}<span class="dt">${x.d}</span><span class="go"${x.u?'':' style="opacity:.35"'}>${x.u?'↗':'·'}</span></a></li>`).join('');

/* ---------- preloader ---------- */
const pre=document.getElementById('pre');
if(RM){pre.classList.add('gone')}else{
  const words=['Olá','Hello','Hola','Bonjour','Ciao','Hallo','Hej','こんにちは','Olá'];let i=0;const h=document.getElementById('hello');
  const iv=setInterval(()=>{i++;if(i<words.length){h.textContent=words[i]}else{clearInterval(iv);pre.classList.add('out');setTimeout(()=>pre.classList.add('gone'),1000)}},i===0?160:140);
}

/* ---------- work list ---------- */
const wl=document.getElementById('wl');
wl.innerHTML=L.map((p,i)=>`<li class="wr${i>=SHOW?' extra':''}"${i>=SHOW?' hidden':''}><button type="button" class="cols" data-i="${i}" data-id="${p.id}"><h3>${p.n}</h3><span class="ar">${AREA[p.a]||p.a}</span><span class="mt"><b>${p.m}</b><small>${p.ml}</small></span><span class="yr">${p.yr}</span><span class="why">${p.why}</span></button><div class="press-row src"><span class="lab">Fontes</span>${(SRC[p.id]||[]).map(srcA).join('')}</div>${p.id==='sonar'?`<div class="press-row"><span class="lab">Na imprensa</span>${PRESS.map(x=>x.u?`<a href="${x.u}" target="_blank" rel="noopener">${x.o}<small>${x.d}</small></a>`:`<a href="#imprensa">${x.o}<small>${x.d}</small></a>`).join('')}</div>`:''}</li>`).join('');
const moreBtn=document.getElementById('moreBtn');document.getElementById('moreN').textContent=L.length-SHOW;
moreBtn.addEventListener('click',()=>{const ex=[...wl.querySelectorAll('.extra')];const open=ex[0].hidden;ex.forEach(e=>e.hidden=!open);moreBtn.querySelector('.t').innerHTML=open?'Menos trabalhos':`Mais trabalhos <sup>${L.length-SHOW}</sup>`});

/* preview slides */
const pvs=document.getElementById('pvs');
pvs.innerHTML=L.map(p=>`<div class="sl" style="background:${COL[p.id]}">${IMG[p.id]?`${media(p,'')}${p.id==='sonar'?'<span class="badge">Destaque no Jornal da USP, Agência FAPESP e Rádio USP</span>':''}`:`<div class="tx"><b>${p.m}</b><span>${p.ml}</span><p>${p.why}</p></div>`}</div>`).join('');
const pv=document.getElementById('pv'),cur=document.getElementById('cur');
let mx=innerWidth/2,my=innerHeight/2,px=mx,py=my,cx=mx,cy=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
wl.addEventListener('pointerover',e=>{const b=e.target.closest('button[data-i]');if(!b)return;pv.classList.add('on');cur.classList.add('on');pvs.style.transform=`translateY(${-100*b.dataset.i}%)`});
wl.addEventListener('pointerleave',()=>{pv.classList.remove('on');cur.classList.remove('on')});

/* ---------- tiles rows ---------- */
const tile=(p)=>`<div class="tile" style="background:${p.c||COL[p.id]}"><div class="in">${IMG[p.id]&&!p.c?media(p,p.n):`<div><b>${p.m}</b><small>${p.n} · ${p.ml}</small></div>`}</div></div>`;
const extra=[{id:'kin',c:'#ffc21a',n:'IEEE ICDMW',m:'2023',ml:'artigo publicado'},{id:'sim',c:'#008c8c',n:'Imprensa',m:'3',ml:'matérias sobre o Sonar'},{id:'sva',c:'#ff5e7e',n:'Publicações',m:'3',ml:'ICDMW, ENIAC, arXiv'}];
document.getElementById('row1').innerHTML=[L[0],L[1],extra[0],L[3],L[2]].map(tile).join('');
document.getElementById('row2').innerHTML=[extra[1],L[4],L[5],extra[2],L[0]].map(tile).join('');
const row1=document.getElementById('row1'),row2=document.getElementById('row2'),slides=document.querySelector('.slides');

/* ---------- magnetic ---------- */
document.querySelectorAll('.mag').forEach(el=>{
  const inner=el.querySelector('.t');
  el.addEventListener('pointermove',e=>{if(RM)return;const r=el.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.35}px,${y*.35}px)`;if(inner)inner.style.transform=`translate(${x*.15}px,${y*.15}px)`});
  el.addEventListener('pointerleave',()=>{el.style.transition='transform .6s cubic-bezier(.2,.8,.2,1)';el.style.transform='';if(inner){inner.style.transition='transform .6s cubic-bezier(.2,.8,.2,1)';inner.style.transform=''}setTimeout(()=>{el.style.transition='';if(inner)inner.style.transition=''},600)});
});

/* ---------- intro word reveal ---------- */
const ih=document.getElementById('introH');
ih.innerHTML=ih.textContent.split(' ').map((w,i)=>`<span class="w"><span style="transition-delay:${i*.02}s">${w}</span></span>`).join(' ');
const intro=document.querySelector('.intro');
if(RM||!('IntersectionObserver' in window))intro.classList.add('in');else new IntersectionObserver((es,o)=>{es.forEach(e=>{if(e.isIntersecting){intro.classList.add('in');o.disconnect()}})},{threshold:.25}).observe(intro);
setTimeout(()=>intro.classList.add('in'),4000);

/* ---------- menu ---------- */
const burger=document.getElementById('burger'),hero=document.querySelector('.hero');
const setMenu=o=>{document.body.classList.toggle('menu-open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')};
burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
document.getElementById('veil').addEventListener('click',()=>setMenu(false));
document.querySelectorAll('[data-close]').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});

/* ---------- project panel ---------- */
const dlg=document.getElementById('dlgB'),D=document.getElementById('dlg');
wl.addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(!b)return;const p=P.find(x=>x.id===b.dataset.id);
  dlg.innerHTML=`<div class="dp"><span class="mag x"><button type="button" class="round" style="width:56px;height:56px" aria-label="Fechar" id="dx"><span class="t">✕</span></button></span>
   <div><div class="k">${p.k} · ${AREA[p.a]||p.a} · ${p.yr} · ${p.st}</div><h3 id="dlgT">${p.n}</h3><p class="why">${p.why}</p><div class="big"><b>${p.m}</b><span>${p.ml}</span></div><div class="ev" style="margin-top:18px">${p.ev.map(e=>`<span>${e}</span>`).join('')}</div><div class="srcs"><h4>Fontes</h4>${(SRC[p.id]||[]).map(srcA).join('')}</div></div>
   <dl><div><dt>Problema</dt><dd>${p.prob}</dd></div><div><dt>O que construí</dt><dd>${p.sol}</dd></div><div><dt>Resultado</dt><dd>${p.res}</dd></div><div><dt>Stack</dt><dd>${p.sk}</dd></div></dl>
   ${p.id==='sonar'?`<div class="news"><h4>Na imprensa</h4><ul>${PRESS.map(x=>`<li><b>${x.o}</b><small>${x.k} · ${x.d}</small>${x.plain?`<span>${x.q}</span>`:`<q>${x.q}</q>`}${x.u?`<a href="${x.u}" target="_blank" rel="noopener">${x.cta||'Ler matéria ↗'}</a>`:''}</li>`).join('')}</ul></div>`:''}
   ${p.id==='portrait'?psDemo():DEMOS[p.id]?`<div class="demos" style="background:${COL[p.id]}"><h4>Exemplos do repositório</h4><div class="dg">${DEMOS[p.id].map(e=>`<figure><figcaption><b>${e.t}</b><span>${e.d}</span></figcaption><div class="pair">${e.v.map(([l,k])=>`<div><video src="${VID[k]}" autoplay muted loop playsinline aria-label="${e.t}: ${l}"></video><small>${l}</small></div>`).join('')}</div></figure>`).join('')}</div></div>`:IMG[p.id]?`<div class="vis" style="background:${COL[p.id]}"><img src="${IMG[p.id]}" alt="Imagem do projeto ${p.n}"></div>`:''}</div>`;
  D.showModal?D.showModal():D.setAttribute('open','');document.getElementById('dx').addEventListener('click',()=>D.close())});
D.addEventListener('click',e=>{if(e.target===D)D.close()});

/* ---------- hero: dot grid that swells around the cursor; clicks send shockwaves ---------- */
(function(){const c=document.getElementById('orbit'),x=c.getContext('2d'),TAU=Math.PI*2;
  const S={w:0,h:0,mx:0,my:0,tx:0,ty:0,last:-1e9,pulses:[],auto:0};let run=true;
  function size(){const d=Math.min(devicePixelRatio||1,1.75),w=c.clientWidth,h=c.clientHeight;if(w===S.w&&h===S.h&&S.d===d)return;S.w=w;S.h=h;S.d=d;c.width=Math.round(w*d);c.height=Math.round(h*d);x.setTransform(d,0,0,d,0,0)}
  function draw(t){size();x.fillStyle='#2340ff';x.fillRect(0,0,S.w,S.h);
    const idle=t-S.last>2600;if(idle){S.tx=S.w*(.5+.2*Math.sin(t*.00042));S.ty=S.h*(.44+.15*Math.sin(t*.00069));if(t-S.auto>2300){S.pulses.push({x:S.mx,y:S.my,t});S.auto=t}}
    S.mx+=(S.tx-S.mx)*.09;S.my+=(S.ty-S.my)*.09;S.pulses=S.pulses.filter(p=>t-p.t<2600);
    const g=26,ox=(S.w%g)/2,oy=(S.h%g)/2;
    for(let X=ox;X<=S.w;X+=g)for(let Y=oy;Y<=S.h;Y+=g){const dx=X-S.mx,dy=Y-S.my,d=Math.hypot(dx,dy)||1,n=Math.max(0,1-d/240);let b=0;
      for(const p of S.pulses){const a=t-p.t,pd=Math.hypot(X-p.x,Y-p.y);b=Math.max(b,Math.exp(-1*((pd-a*.6)/30)**2)*(1-a/2600))}
      const z=1.3+n*n*6+b*6;x.fillStyle=b>n*.8&&b>.12?`hsl(318,100%,${78-b*8}%)`:n>.02?`hsl(${48-n*10},100%,${96-n*36}%)`:'rgba(255,255,255,.55)';
      x.beginPath();x.arc(X+dx/d*n*14,Y+dy/d*n*14,z,0,TAU);x.fill()}}
  hero.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect();S.tx=e.clientX-b.left;S.ty=e.clientY-b.top;S.last=performance.now()},{passive:true});
  hero.addEventListener('pointerleave',()=>{S.last=-1e9});
  hero.addEventListener('pointerdown',e=>{if(e.target.closest('a,button'))return;const b=c.getBoundingClientRect(),px=e.clientX-b.left,py=e.clientY-b.top;S.tx=S.mx=px;S.ty=S.my=py;S.last=performance.now();S.pulses.push({x:px,y:py,t:performance.now()})});
  S.mx=S.tx=innerWidth*.62;S.my=S.ty=innerHeight*.42;
  function loop(t){requestAnimationFrame(loop);if(run)draw(t)}
  if(RM){draw(0);addEventListener('resize',()=>draw(0))}else requestAnimationFrame(loop);
  new IntersectionObserver(es=>{run=es[0].isIntersecting}).observe(hero);
})();

/* ---------- clock ---------- */
const clock=document.getElementById('clock');const tick=()=>{try{clock.textContent=new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'}).format(new Date())}catch(e){}};tick();setInterval(tick,30000);

/* ---------- main loop: marquee, sliding rows, curve, preview follow ---------- */
const marq=document.getElementById('marq'),curve=document.getElementById('curve');
let x=0,dir=-1,lastY=scrollY;
function frame(){
  const y=scrollY;if(y!==lastY){dir=y>lastY?-1:1;lastY=y}
  if(!RM){const w=marq.firstElementChild.offsetWidth;x+=dir*0.6;if(x<-w)x+=w;if(x>0)x-=w;marq.style.transform=`translateX(${x}px)`}
  burger.classList.toggle('show',y>hero.offsetHeight*.6);
  const r=slides.getBoundingClientRect();const p=(innerHeight-r.top)/(innerHeight+r.height);
  if(!RM){row1.style.transform=`translateX(${-120+p*-180}px)`;row2.style.transform=`translateX(${-380+p*180}px)`}
  const cr=curve.parentElement.getBoundingClientRect();const cp=Math.min(Math.max((innerHeight-cr.top)/innerHeight,0),1);curve.style.setProperty('--ch',(100-cp*100)+'%');
  px+=(mx-px)*.12;py+=(my-py)*.12;cx+=(mx-cx)*.35;cy+=(my-cy)*.35;
  pv.style.left=px+'px';pv.style.top=py+'px';cur.style.left=cx+'px';cur.style.top=cy+'px';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();

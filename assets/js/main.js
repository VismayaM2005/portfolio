/* ==========================================================================
   VISMAYA M — OPERATOR CONSOLE — behavior
   ========================================================================== */
(function(){
  "use strict";

  /* ---------- live Bengaluru clock ---------- */
  var clockEl = document.getElementById('clock');
  function tickClock(){
    try{
      var now = new Date();
      var fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false
      });
      clockEl.textContent = fmt.format(now) + ' IST';
    }catch(e){
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ---------- uptime readout (since B.E. program start) ---------- */
  var uptimeEl = document.getElementById('uptimeReadout');
  var EPOCH = new Date('2023-08-01T00:00:00+05:30').getTime();
  function tickUptime(){
    var diff = Date.now() - EPOCH;
    var days = Math.floor(diff / 86400000);
    var years = Math.floor(days / 365);
    var remDays = days % 365;
    uptimeEl.textContent = years + 'y ' + remDays + 'd IN FIELD';
  }
  tickUptime();
  setInterval(tickUptime, 60000);

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainnav = document.getElementById('mainnav');
  if(navToggle && mainnav){
    navToggle.addEventListener('click', function(){
      var open = mainnav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mainnav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mainnav.classList.remove('open'); });
    });
  }

  /* ---------- active-section nav highlight + sector readout ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sectorReadout = document.getElementById('sectorReadout');
  var sections = navLinks.map(function(a){
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  function onScrollSpy(){
    var pos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function(sec){
      if(sec.offsetTop <= pos) current = sec;
    });
    navLinks.forEach(function(a){
      var target = document.querySelector(a.getAttribute('href'));
      var isActive = target === current;
      a.classList.toggle('active', isActive);
      if(isActive && sectorReadout){
        var idx = a.querySelector('.nav-idx').textContent;
        sectorReadout.textContent = idx + '_' + a.getAttribute('data-label');
      }
    });
  }
  document.addEventListener('scroll', onScrollSpy, { passive:true });
  onScrollSpy();

  /* ---------- rotating role text ---------- */
  var roles = [
    'EDGE AI ENGINEER',
    'IOT & EMBEDDED SYSTEMS',
    'COMPUTER VISION ENGINEER',
    'BACKEND / TEST SYSTEMS',
    'GENERATIVE AI & LLM SYSTEMS'
  ];
  var roleEl = document.getElementById('roleCycle');
  var ri = 0;
  function cycleRole(){
    if(!roleEl) return;
    var current = roleEl.textContent;
    var target = roles[ri % roles.length];
    // simple erase/type effect
    var i = current.length;
    var eraseTimer = setInterval(function(){
      roleEl.textContent = current.slice(0, i);
      i--;
      if(i < 0){
        clearInterval(eraseTimer);
        var j = 0;
        var typeTimer = setInterval(function(){
          roleEl.textContent = target.slice(0, j);
          j++;
          if(j > target.length){ clearInterval(typeTimer); }
        }, 32);
      }
    }, 22);
    ri++;
  }
  cycleRole();
  setInterval(cycleRole, 3400);

  /* ---------- reveal-on-scroll ---------- */
  var revealTargets = document.querySelectorAll('.module-card, .skill-card, .cred-panel, .log-entry, .capsec, .uplink-panel, .id-card, .stat-strip');
  revealTargets.forEach(function(el){ el.classList.add('reveal'); });

  var barFills = document.querySelectorAll('.bar-fill');

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold:0.15 });

  revealTargets.forEach(function(el){ io.observe(el); });

  var barIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        barIo.unobserve(entry.target);
      }
    });
  }, { threshold:0.4 });
  barFills.forEach(function(el){ barIo.observe(el); });

  /* ---------- clipboard copy for email ---------- */
  var copyBtn = document.getElementById('copyEmail');
  if(copyBtn){
    copyBtn.addEventListener('click', function(){
      var val = copyBtn.getAttribute('data-copy');
      var actionEl = copyBtn.querySelector('.uplink-action');
      var original = actionEl.textContent;
      function done(ok){
        actionEl.textContent = ok ? 'COPIED ✓' : 'COPY FAILED';
        copyBtn.classList.toggle('copied', ok);
        setTimeout(function(){
          actionEl.textContent = original;
          copyBtn.classList.remove('copied');
        }, 1800);
      }
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(val).then(function(){ done(true); }, function(){ done(false); });
      }else{
        try{
          var ta = document.createElement('textarea');
          ta.value = val; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta);
          done(true);
        }catch(e){ done(false); }
      }
    });
  }

  /* ---------- capability radar chart (SVG) ---------- */
  var radarData = [
    { label:'AI / ML', value:9, color:'#ffb400' },
    { label:'Computer Vision', value:8, color:'#3ee6e0' },
    { label:'IoT / Embedded', value:8, color:'#7ee787' },
    { label:'Backend / Systems', value:8, color:'#ff7edb' },
    { label:'Test Automation', value:8, color:'#8aa2ff' },
    { label:'Frontend', value:6, color:'#f2c14e' }
  ];

  function buildRadar(container){
    var size = 340, cx = size/2, cy = size/2, maxR = 118, maxVal = 10;
    var n = radarData.length;
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);

    function pointFor(i, r){
      var angle = (-90 + (360/n) * i) * Math.PI/180;
      return [ cx + r*Math.cos(angle), cy + r*Math.sin(angle) ];
    }

    // grid rings
    [0.2,0.4,0.6,0.8,1].forEach(function(f){
      var pts = [];
      for(var i=0;i<n;i++){ pts.push(pointFor(i, maxR*f).join(',')); }
      var poly = document.createElementNS(svgNS,'polygon');
      poly.setAttribute('points', pts.join(' '));
      poly.setAttribute('fill','none');
      poly.setAttribute('stroke','rgba(255,255,255,0.08)');
      poly.setAttribute('stroke-width','1');
      svg.appendChild(poly);
    });

    // axes + labels
    for(var i=0;i<n;i++){
      var p = pointFor(i, maxR);
      var line = document.createElementNS(svgNS,'line');
      line.setAttribute('x1',cx); line.setAttribute('y1',cy);
      line.setAttribute('x2',p[0]); line.setAttribute('y2',p[1]);
      line.setAttribute('stroke','rgba(255,255,255,0.08)');
      svg.appendChild(line);

      var lp = pointFor(i, maxR + 28);
      var text = document.createElementNS(svgNS,'text');
      text.setAttribute('x', lp[0]); text.setAttribute('y', lp[1]);
      text.setAttribute('text-anchor','middle');
      text.setAttribute('dominant-baseline','middle');
      text.setAttribute('font-family','JetBrains Mono, monospace');
      text.setAttribute('font-size','9.5');
      text.setAttribute('fill','#8b95a7');
      var words = radarData[i].label.split(' ');
      words.forEach(function(w, wi){
        var tspan = document.createElementNS(svgNS,'tspan');
        tspan.setAttribute('x', lp[0]);
        tspan.setAttribute('dy', wi === 0 ? 0 : 11);
        tspan.textContent = w;
        text.appendChild(tspan);
      });
      svg.appendChild(text);
    }

    // data polygon
    var dataPts = radarData.map(function(d,i){ return pointFor(i, (d.value/maxVal)*maxR); });
    var dataPoly = document.createElementNS(svgNS,'polygon');
    dataPoly.setAttribute('points', dataPts.map(function(p){return p.join(',');}).join(' '));
    dataPoly.setAttribute('fill','rgba(255,180,0,0.14)');
    dataPoly.setAttribute('stroke','#ffb400');
    dataPoly.setAttribute('stroke-width','2');
    svg.appendChild(dataPoly);

    dataPts.forEach(function(p, i){
      var dot = document.createElementNS(svgNS,'circle');
      dot.setAttribute('cx', p[0]); dot.setAttribute('cy', p[1]); dot.setAttribute('r', 4);
      dot.setAttribute('fill', radarData[i].color);
      svg.appendChild(dot);
    });

    container.appendChild(svg);
  }

  var radarContainer = document.getElementById('radarChart');
  if(radarContainer) buildRadar(radarContainer);

})();

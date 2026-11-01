// Site do POLLO — seletor de temas, revelação ao rolar, barra fixa e o segredo "pollo".
(function () {
  'use strict';
  var calmo = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // Seletor de temas
  var bts = document.querySelectorAll('.tema-bt');
  var img = document.getElementById('temaImg');
  var nome = document.getElementById('temaNome');
  var desc = document.getElementById('temaDesc');
  var selo = document.getElementById('temaSelo');
  bts.forEach(function (b) {
    var pre = new Image(); pre.src = b.dataset.img;
    b.addEventListener('click', function () {
      bts.forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); });
      b.classList.add('on'); b.setAttribute('aria-selected', 'true');
      img.classList.add('troca');
      setTimeout(function () {
        img.src = b.dataset.img; img.alt = b.dataset.nome;
        nome.textContent = b.dataset.nome; desc.textContent = b.dataset.desc;
        selo.textContent = b.dataset.selotx; selo.className = 'selo selo-' + b.dataset.selo;
        img.classList.remove('troca');
      }, calmo ? 0 : 180);
    });
  });

  // Revelação ao rolar
  var blocos = document.querySelectorAll('.revela');
  if (!calmo && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    blocos.forEach(function (b) { io.observe(b); });
  } else {
    blocos.forEach(function (b) { b.classList.add('visto'); });
  }

  // Barra fixa no celular: aparece depois do topo
  var barra = document.querySelector('.barra-fixa');
  var hero = document.querySelector('.hero');
  if (barra && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { barra.classList.toggle('on', !es[0].isIntersecting); }).observe(hero);
  }

  // Segredo: digite "pollo" (como os ovos do app)
  var buf = '';
  var galinha = document.querySelector('.galinha-voa');
  document.addEventListener('keydown', function (e) {
    if (!e.key || e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-5);
    if (buf === 'pollo' && galinha && !calmo) {
      galinha.classList.remove('voa'); void galinha.offsetWidth; galinha.classList.add('voa');
    }
  });
})();

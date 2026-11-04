(function () {
  'use strict';
  var KEY = 'devez_cookie_consent_v1';
  var MESES = 12;
  /* ---------- Logo (cabecera, pie y favicon) ---------- */
  var LOGO = 'data:image/webp;base64,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';
  function marca() {
    var marcas = document.querySelectorAll('.brand');
    for (var i = 0; i < marcas.length; i++) {
      var m = marcas[i];
      if (m.querySelector('img.logo')) continue;
      var img = document.createElement('img');
      img.className = 'logo'; img.src = LOGO; img.alt = ''; img.width = 38; img.height = 38;
      m.textContent = 'DevEs';
      m.insertBefore(img, m.firstChild);
    }
    if (!document.querySelector('link[rel~="icon"]')) {
      var l = document.createElement('link'); l.rel = 'icon'; l.type = 'image/webp'; l.href = LOGO; document.head.appendChild(l);
    }
  }


  /* ---------- Cabecera: se oculta al bajar y reaparece al subir ---------- */
  var hdr = document.querySelector('header');
  var last = window.scrollY || 0;
  window.addEventListener('scroll', function () {
    if (!hdr) return;
    var y = window.scrollY || 0;
    if (y > last + 6 && y > 90) hdr.classList.add('oculto');
    else if (y < last - 6 || y <= 90) hdr.classList.remove('oculto');
    last = y;
  }, { passive: true });
  if (hdr) hdr.addEventListener('focusin', function () { hdr.classList.remove('oculto'); });

  /* ---------- Consentimiento ---------- */
  function leer() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!v || !v.ts || (Date.now() - v.ts) > MESES * 30 * 864e5) return null;
      return v;
    } catch (e) { return null; }
  }
  function guardar(media) {
    try { localStorage.setItem(KEY, JSON.stringify({ media: !!media, ts: Date.now(), v: 1 })); } catch (e) {}
  }
  function mediaOk() { var c = leer(); return !!(c && c.media); }

  /* ---------- Vídeos de YouTube: solo se cargan con consentimiento ---------- */
  function idDe(src) { var m = /embed\/([\w-]+)/.exec(src || ''); return m ? m[1] : ''; }
  function aplicarVideos() {
    var ok = mediaOk();
    var frames = document.querySelectorAll('iframe[data-src]');
    for (var i = 0; i < frames.length; i++) {
      var f = frames[i];
      var caja = f.parentNode;
      var ph = caja.querySelector('.embed-ph');
      if (ok) {
        if (f.getAttribute('src') !== f.getAttribute('data-src')) f.setAttribute('src', f.getAttribute('data-src'));
        if (ph) ph.parentNode.removeChild(ph);
      } else {
        f.removeAttribute('src');
        if (!ph) {
          ph = document.createElement('div');
          ph.className = 'embed-ph';
          var id = idDe(f.getAttribute('data-src'));
          ph.innerHTML = '<span>Este vídeo se aloja en YouTube. Al reproducirlo, YouTube (Google) puede instalar cookies en tu dispositivo.</span>' +
            '<button type="button" class="ck-btn pri" data-aceptar-media>Aceptar y ver el vídeo</button>' +
            '<span><a href="https://www.youtube.com/watch?v=' + id + '" target="_blank" rel="noopener">Verlo directamente en YouTube</a> · <a href="politica-cookies.html">Política de cookies</a></span>';
          caja.appendChild(ph);
        }
      }
    }
  }

  /* ---------- Banner y modal de cookies ---------- */
  var banner = null, overlay = null, previoFoco = null;
  function cerrarBanner() { if (banner && banner.parentNode) banner.parentNode.removeChild(banner); banner = null; }
  function cerrarModal() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
    document.removeEventListener('keydown', teclaModal);
    if (previoFoco && previoFoco.focus) previoFoco.focus();
  }
  function decidir(media) { guardar(media); cerrarBanner(); cerrarModal(); aplicarVideos(); }
  function teclaModal(e) {
    if (e.key === 'Escape') { cerrarModal(); return; }
    if (e.key === 'Tab' && overlay) {
      var f = overlay.querySelectorAll('button, input, a[href]');
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  }
  function abrirModal() {
    if (overlay) return;
    previoFoco = document.activeElement;
    var c = leer();
    overlay = document.createElement('div');
    overlay.className = 'ck-overlay';
    overlay.innerHTML =
      '<div class="ck-modal" role="dialog" aria-modal="true" aria-labelledby="ck-t">' +
      '<h2 id="ck-t">Configuración de cookies</h2>' +
      '<p>Elige qué tipos de cookies y tecnologías similares aceptas. Puedes cambiar tu decisión en cualquier momento desde el enlace «Configurar cookies» del pie de página. Más información en la <a href="politica-cookies.html">Política de cookies</a>.</p>' +
      '<div class="ck-row"><div><strong>Técnicas (necesarias)</strong><span>Guardan tu elección sobre cookies y permiten el funcionamiento básico del sitio. No requieren consentimiento y no se pueden desactivar.</span></div><input class="ck-sw" type="checkbox" checked disabled aria-label="Cookies técnicas, siempre activas"></div>' +
      '<div class="ck-row"><div><strong>Contenido multimedia de terceros (YouTube)</strong><span>Permiten reproducir los vídeos incrustados de YouTube (Google). Al cargarlos, YouTube puede instalar cookies y tratar datos de tu navegación.</span></div><input class="ck-sw" id="ck-media" type="checkbox" aria-label="Contenido multimedia de YouTube"' + (c && c.media ? ' checked' : '') + '></div>' +
      '<div class="ck-actions"><button type="button" class="ck-btn pri" data-ck="rechazar">Rechazar todas</button><button type="button" class="ck-btn pri" data-ck="aceptar">Aceptar todas</button><button type="button" class="ck-btn" data-ck="guardar">Guardar selección</button></div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.addEventListener('keydown', teclaModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) { cerrarModal(); return; }
      var b = e.target.closest ? e.target.closest('[data-ck]') : null;
      if (!b) return;
      var acc = b.getAttribute('data-ck');
      if (acc === 'aceptar') decidir(true);
      else if (acc === 'rechazar') decidir(false);
      else if (acc === 'guardar') decidir(!!overlay.querySelector('#ck-media').checked);
    });
    var primero = overlay.querySelector('#ck-media');
    if (primero) primero.focus();
  }
  function mostrarBanner() {
    if (banner || leer()) return;
    banner = document.createElement('div');
    banner.className = 'ck-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<h2>Tu privacidad</h2>' +
      '<p>Este sitio usa almacenamiento técnico propio (necesario) y, <strong>solo si lo aceptas</strong>, contenido de terceros (vídeos de YouTube) que puede instalar cookies. Puedes aceptar, rechazar o configurar. Más información en la <a href="politica-cookies.html">Política de cookies</a> y la <a href="politica-privacidad.html">Política de privacidad</a>.</p>' +
      '<div class="ck-actions"><button type="button" class="ck-btn pri" data-ck="rechazar">Rechazar todas</button><button type="button" class="ck-btn pri" data-ck="aceptar">Aceptar todas</button><button type="button" class="ck-btn" data-ck="config">Configurar</button></div>';
    document.body.appendChild(banner);
    banner.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-ck]') : null;
      if (!b) return;
      var acc = b.getAttribute('data-ck');
      if (acc === 'aceptar') decidir(true);
      else if (acc === 'rechazar') decidir(false);
      else if (acc === 'config') abrirModal();
    });
  }

  /* ---------- Pie de página ---------- */
  function pie() {
    var f = document.querySelector('footer');
    if (!f) { f = document.createElement('footer'); document.body.appendChild(f); }
    var anio = new Date().getFullYear();
    f.innerHTML =
      '<div class="wrap"><div class="foot">' +
      '<div><div class="brand">&lt;/&gt; DevEs</div><p>Tutoriales de programación en español, gratuitos y paso a paso.</p><p>Un vídeo nuevo cada semana.</p></div>' +
      '<div><h4>Explora</h4><a href="index.html">Inicio</a><a href="ruta-30-dias.html">Ruta de 30 días</a><a href="recursos.html">Recursos</a><a href="sobre-mi.html">Quiénes somos</a></div>' +
      '<div><h4>Comunidad</h4><a href="https://www.youtube.com/@DevEs-f1t" target="_blank" rel="noopener">Canal de YouTube</a><a href="https://www.youtube.com/playlist?list=PLAv3ZRdQabH4" target="_blank" rel="noopener">Curso Python desde cero</a><a href="contacto.html">Contacto</a></div>' +
      '<div><h4>Legal</h4><a href="aviso-legal.html">Aviso legal</a><a href="politica-privacidad.html">Política de privacidad</a><a href="politica-cookies.html">Política de cookies</a><a href="afiliacion.html">Divulgación de afiliación</a><a href="#" data-abrir-cookies>Configurar cookies</a></div>' +
      '</div><div class="legal-bar"><span>&copy; ' + anio + ' DevEs. Todos los derechos reservados.</span><span>Algunos enlaces son de afiliado &middot; Algunos vídeos usan voz generada con IA</span></div></div>';
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target : null;
    if (!t) return;
    var a = t.closest('[data-abrir-cookies]');
    if (a) { e.preventDefault(); abrirModal(); return; }
    var m = t.closest('[data-aceptar-media]');
    if (m) { decidir(true); }
  });

  function iniciar() { pie(); marca(); aplicarVideos(); mostrarBanner(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();

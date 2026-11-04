(function () {
  'use strict';
  var KEY = 'devez_cookie_consent_v1';
  var MESES = 12;

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

  function iniciar() { pie(); aplicarVideos(); mostrarBanner(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();

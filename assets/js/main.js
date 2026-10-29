(function () {
  // mobile menu
  var pill = document.getElementById('navpill');
  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mmenu');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = pill.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      mmenu.style.display = open ? 'block' : 'none';
    });
    mmenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        pill.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        mmenu.style.display = 'none';
      }
    });
  }

  // reveal on scroll
  var items = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  function reveal() {
    var limit = window.innerHeight * 0.92;
    items = items.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) { el.classList.add('in'); return false; }
      return true;
    });
    if (!items.length) {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', reveal);
    }
  }
  window.addEventListener('scroll', reveal, { passive: true });
  window.addEventListener('resize', reveal);
  window.addEventListener('load', reveal);
  reveal();

  // count-up numbers
  var nums = document.querySelectorAll('[data-count]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || '', t0 = null;
        function tick(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 1200, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { co.observe(n); });
  }

  // preview-only form handler (no backend connected yet)
  var form = document.getElementById('form');
  var msg = document.getElementById('form-msg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var mail = form.elements.email.value.trim();
      msg.classList.add('show');
      if (!name || !/^\S+@\S+\.\S+$/.test(mail)) {
        msg.textContent = 'Vyplňte prosím meno a platný e-mail.';
        return;
      }
      msg.textContent = 'Ukážkový formulár: odosielanie sa zapojí pri nasadení webu, zatiaľ sa nič neodoslalo.';
    });
  }
})();

// ===== AUTOCAR MAIN.JS =====

// HERO SLIDER
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0, autoPlay;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

document.querySelector('.slider-next')?.addEventListener('click', () => { goToSlide(current + 1); resetAuto(); });
document.querySelector('.slider-prev')?.addEventListener('click', () => { goToSlide(current - 1); resetAuto(); });
dots.forEach((d, i) => d.addEventListener('click', () => { goToSlide(i); resetAuto(); }));

function startAuto() { autoPlay = setInterval(() => goToSlide(current + 1), 5000); }
function resetAuto() { clearInterval(autoPlay); startAuto(); }
startAuto();

// TESTIMONIALS SLIDER
const tSlides = document.querySelectorAll('.testimonial-slide');
const tDots = document.querySelectorAll('.t-dot');
let tCurrent = 0, tAuto;

function goToTestimonial(n) {
  tSlides[tCurrent].classList.remove('active');
  tDots[tCurrent].classList.remove('active');
  tCurrent = (n + tSlides.length) % tSlides.length;
  tSlides[tCurrent].classList.add('active');
  tDots[tCurrent].classList.add('active');
}
window.goToTestimonial = goToTestimonial;
tAuto = setInterval(() => goToTestimonial(tCurrent + 1), 4000);

// STICKY HEADER
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) header.style.boxShadow = '0 4px 30px rgba(0,0,0,.15)';
  else header.style.boxShadow = '0 2px 20px rgba(0,0,0,.08)';
  const btn = document.getElementById('backTop');
  if (btn) { if (window.scrollY > 400) btn.classList.add('visible'); else btn.classList.remove('visible'); }
});

// BACK TO TOP
document.getElementById('backTop')?.addEventListener('click', e => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });

// MOBILE MENU
document.getElementById('menuToggle')?.addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});

// CLOSE NAV ON LINK CLICK
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('nav').classList.remove('open');
}));

// ACCORDION
document.querySelectorAll('.acc-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  });
});

// COUNTER ANIMATION
function animateCount(el, target) {
  let start = 0;
  const dur = 2000;
  const step = target / (dur / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
    else el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.counter-num').forEach(el => {
        animateCount(el, parseInt(el.dataset.count));
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const counterSection = document.querySelector('.counter-section');
if (counterSection) counterObserver.observe(counterSection);

// SKILL BARS ANIMATION
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.style.width;
      });
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillSection = document.querySelector('.skills-section');
if (skillSection) skillObserver.observe(skillSection);

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) { e.preventDefault(); const top = target.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({top, behavior:'smooth'}); }
  });
});

// CONTACT FORM
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fa fa-check"></i> Enviado!';
  btn.style.background = '#28a745';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; this.reset(); }, 3000);
});

// FADE IN ANIMATION ON SCROLL
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .blog-card, .team-card, .price-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-card, .blog-card, .team-card, .price-card, .gallery-item').forEach((el, i) => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i % 4 * 100);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
  });
});

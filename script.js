const site = {
  role: "product designer",
  email: "hello@yourname.com",
  projects: [
    { title: "Project One", tags: ["Web App", "React", "2025"], description: "Short description of the project and your role in it.", link: "https://example.com", image: null },
    { title: "Project Two", tags: ["Branding", "Figma", "2024"], description: "Short description of the project and your role in it.", link: "https://example.com", image: null },
    { title: "Project Three", tags: ["Mobile", "iOS", "2024"], description: "Short description of the project and your role in it.", link: "https://example.com", image: null },
    { title: "Project Four", tags: ["Case Study", "Research", "2023"], description: "Short description of the project and your role in it.", link: "https://example.com", image: null }
  ],
  skills: {
    "Design": ["Product Design", "Design Systems", "Prototyping", "Typography"],
    "Development": ["React", "TypeScript", "CSS / Motion", "Accessibility"],
    "Tools": ["Figma", "Framer", "Git", "Notion"]
  },
  socials: [
    { label: "Email", url: "mailto:hello@yourname.com" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname" },
    { label: "GitHub", url: "https://github.com/yourname" },
    { label: "Dribbble / Behance", url: "https://dribbble.com/yourname" }
  ]
};

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('yearFooter').textContent = new Date().getFullYear();
document.getElementById('roleText').textContent = site.role;
document.getElementById('emailLink').textContent = site.email;
document.getElementById('emailLink').href = "mailto:" + site.email;

const workList = document.getElementById('workList');
site.projects.forEach((p, i) => {
  const item = document.createElement('a');
  item.className = 'work-item';
  item.href = p.link;
  item.target = '_blank';
  item.rel = 'noopener noreferrer';
  item.setAttribute('data-hover', '');
  const num = String(i + 1).padStart(2, '0');
  item.innerHTML = `
    <div class="work-index">${num}</div>
    <div class="work-main">
      <h3>${p.title} <span class="work-arrow">→</span></h3>
      <p style="color:var(--ink-dim); margin-top:10px; max-width:440px; font-size:15px;">${p.description}</p>
      <div class="work-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <div class="work-visual">
      <div class="spotlight"></div>
      ${p.image ? `<img src="${p.image}" alt="${p.title}">` : `<div class="ph">image goes here</div>`}
    </div>
  `;
  workList.appendChild(item);

  const visual = item.querySelector('.work-visual');
  visual.addEventListener('mousemove', (e) => {
    const r = visual.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    visual.style.setProperty('--mx', (px * 100) + '%');
    visual.style.setProperty('--my', (py * 100) + '%');
    const rotY = (px - 0.5) * 12;
    const rotX = (0.5 - py) * 12;
    visual.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
  });
  visual.addEventListener('mouseleave', () => { visual.style.transform = ''; });
});

const skillsGrid = document.getElementById('skillsGrid');
Object.entries(site.skills).forEach(([cat, items]) => {
  const card = document.createElement('div');
  card.className = 'skill-card';
  card.innerHTML = `<h4>${cat}</h4><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  skillsGrid.appendChild(card);
});

const socialRow = document.getElementById('socialRow');
site.socials.forEach(s => {
  const a = document.createElement('a');
  a.href = s.url;
  a.textContent = s.label;
  a.setAttribute('data-hover', '');
  if (!s.url.startsWith('mailto')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  if (s.url.startsWith('mailto')) a.addEventListener('click', () => copyEmail());
  socialRow.appendChild(a);
});

const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
function copyEmail(){
  navigator.clipboard?.writeText(site.email).then(() => showToast('Email copied — ' + site.email));
}
document.getElementById('emailLink').addEventListener('click', () => copyEmail());

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
function animateRing(){
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('[data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');
let cw, ch, dpr;

function sizeCanvas(){
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  cw = window.innerWidth; ch = window.innerHeight;
  canvas.width = cw * dpr; canvas.height = ch * dpr;
  canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

if (!reduceMotion && window.matchMedia('(hover:hover)').matches) {
  const brassRGB = '201,169,97';
  let points = [];
  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let px = tx, py = ty;

  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });

  function drawTrail(){
    ctx.clearRect(0, 0, cw, ch);

    px += (tx - px) * 0.35;
    py += (ty - py) * 0.35;
    points.push({ x: px, y: py, life: 1 });

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < points.length - 1; i++) {
      const p0 = points[i - 1], p1 = points[i], p2 = points[i + 1];
      const alpha = Math.max(p1.life, 0) * 0.5;
      if (alpha <= 0) continue;
      const midA = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      const midB = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      ctx.beginPath();
      ctx.moveTo(midA.x, midA.y);
      ctx.quadraticCurveTo(p1.x, p1.y, midB.x, midB.y);
      ctx.strokeStyle = `rgba(${brassRGB},${alpha})`;
      ctx.lineWidth = 3.2 * p1.life;
      ctx.shadowColor = `rgba(${brassRGB},${alpha * 0.8})`;
      ctx.shadowBlur = 12;
      ctx.stroke();
    }

    for (let i = points.length - 1; i >= 0; i--) {
      points[i].life -= 0.024;
      if (points[i].life <= 0) points.splice(i, 1);
    }
    if (points.length > 140) points.splice(0, points.length - 140);

    requestAnimationFrame(drawTrail);
  }
  requestAnimationFrame(drawTrail);
}

const progressRail = document.getElementById('progressRail');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  progressRail.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

if (window.matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.btn, .nav-cta').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.35;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

const sectionEls = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sectionEls.forEach(s => spy.observe(s));

console.log('%cLooking around, huh?', 'color:#C9A961; font-family:monospace; font-size:13px;');
console.log('%cFeel free to poke at the code — nothing here is minified.', 'color:#9A9D9F; font-family:monospace; font-size:12px;');


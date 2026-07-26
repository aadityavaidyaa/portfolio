/* ============================================================
   AADITYA VAIDYA — PORTFOLIO — behavior
   ============================================================ */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------------------------------------------------------- */
  /* Data — swap the placeholder hrefs (#) for your real links   */
  /* ---------------------------------------------------------- */
  const WORK = [
    {
      title: "NationRise",
      desc: "Browser-based grand strategy game — 32 nations, alliance betrayal, espionage, a naval and missile tech tree, all rendered on a zoom/pan map with a cinematic news ticker.",
      tags: ["React", "Simulation", "Game Systems"],
      year: "2025"
    },
    {
      title: "Cosmic Byte AR",
      desc: "Android AR app that detects a physical game controller via a trained OpenCV model and overlays live button labels and stats on top of it.",
      tags: ["OpenCV", "AR", "Android"],
      year: "2026"
    },
    {
      title: "Neon Pong",
      desc: "Cyberpunk canvas game with a 16-opponent career mode, ranked ELO ladder, and real-time online multiplayer over a WebSocket relay.",
      tags: ["Canvas", "WebSockets", "Game Dev"],
      year: "2025"
    },
    {
      title: "QT Robot Companion",
      desc: "A desktop companion app pairing a local LLM with natural-sounding speech synthesis for low-latency, offline-friendly conversation.",
      tags: ["Python", "LLM", "TTS"],
      year: "2025"
    },
    {
      title: "Faction Wars Datapack",
      desc: "A Minecraft datapack turning a survival server into a two-faction political sim — elections, territory capture, economy, and a spy/betrayal system.",
      tags: ["Minecraft", "Datapack", "Systems Design"],
      year: "2025"
    },
    {
      title: "Signal Loss",
      desc: "A sci-fi psychological-thriller short built with an AI-assisted, prompt-per-clip pipeline and character-consistent reference generation.",
      tags: ["Veo 3", "Cinematics", "AI Pipeline"],
      year: "2026"
    }
  ];

  const SKILLS = [
    { group: "3D", items: ["Autodesk Maya", "Blender", "Houdini", "Unreal Engine", "Unity", "Substance Painter", "Gaea", "Embergen", "Marvelous Designer"] },
    { group: "Adobe", items: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Audition"] },
    { group: "Programming", items: ["Python", "C#", "MEL Script"] },
    { group: "Version Control", items: ["Git", "GitHub"] },
    { group: "AI Tools", items: ["ChatGPT", "Gemini", "Sora", "VEO 3", "Meshy AI", "Rodin", "Tripo AI", "Higgsfield", "ElevenLabs"] }
  ];

  const SOCIALS = [
    { label: "LinkedIn", href: "#" },
    { label: "ArtStation", href: "#" },
    { label: "Behance", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "GitHub", href: "#" }
  ];

  const ROLES = ["3D Generalist", "Technical Artist", "Game Developer"];

  /* ---------------------------------------------------------- */
  /* Utility                                                     */
  /* ---------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------------------------------------------------- */
  /* Year stamps                                                 */
  /* ---------------------------------------------------------- */
  const year = new Date().getFullYear();
  const yearEl = $("#year");
  const yearFooterEl = $("#yearFooter");
  if (yearEl) yearEl.textContent = year;
  if (yearFooterEl) yearFooterEl.textContent = year;

  /* ---------------------------------------------------------- */
  /* Nav toggle (mobile)                                         */
  /* ---------------------------------------------------------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("is-open");
    });
    $$("a", navLinks).forEach(a =>
      a.addEventListener("click", () => navLinks.classList.remove("is-open"))
    );
  }

  /* ---------------------------------------------------------- */
  /* Role text cycle                                             */
  /* ---------------------------------------------------------- */
  const roleText = $("#roleText");
  if (roleText && !reduceMotion) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % ROLES.length;
      roleText.classList.add("is-swapping");
      setTimeout(() => {
        roleText.textContent = ROLES[i];
        roleText.classList.remove("is-swapping");
      }, 300);
    }, 2600);
  }

  /* ---------------------------------------------------------- */
  /* Reveal on scroll                                             */
  /* ---------------------------------------------------------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("is-visible"));
  }

  /* ---------------------------------------------------------- */
  /* Scroll progress rail                                        */
  /* ---------------------------------------------------------- */
  const progressRail = $("#progressRail");
  if (progressRail) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (scrollTop / max) * 100 : 0;
      progressRail.style.width = pct + "%";
    };
    document.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------------------------------------------------------- */
  /* Toast                                                        */
  /* ---------------------------------------------------------- */
  const toastEl = $("#toast");
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
  }

  const emailLink = $("#emailLink");
  if (emailLink) {
    emailLink.addEventListener("click", e => {
      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(emailLink.textContent.trim()).then(() => {
          showToast("Email copied to clipboard");
          setTimeout(() => { window.location.href = emailLink.href; }, 250);
        }).catch(() => { window.location.href = emailLink.href; });
      }
    });
  }

  /* ---------------------------------------------------------- */
  /* Custom cursor (dot + ring) + trail                          */
  /* ---------------------------------------------------------- */
  const cursorDot = $("#cursorDot");
  const cursorRing = $("#cursorRing");
  const trailCanvas = $("#trail");

  if (!isTouch && cursorDot && cursorRing) {
    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let ringX = mouseX, ringY = mouseY;

    window.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function raf() {
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%,-50%)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    $$("[data-hover]").forEach(el => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("is-active"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("is-active"));
    });
  }

  if (!isTouch && !reduceMotion && trailCanvas) {
    const ctx = trailCanvas.getContext("2d");
    let w, h;
    function resize() {
      w = trailCanvas.width = window.innerWidth;
      h = trailCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    window.addEventListener("mousemove", e => {
      particles.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (particles.length > 40) particles.shift();
    });

    function drawTrail() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(162, 71, 42, ${p.life * 0.35})`;
        ctx.fill();
        p.life -= 0.035;
      });
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(drawTrail);
    }
    requestAnimationFrame(drawTrail);
  }

  /* ---------------------------------------------------------- */
  /* Hero wireframe sphere (signature element)                   */
  /* ---------------------------------------------------------- */
  const hero = $(".hero");
  if (hero) {
    const wrap = document.createElement("div");
    wrap.className = "hero-sphere";
    wrap.setAttribute("aria-hidden", "true");

    const latCount = 6, lonCount = 7, r = 150, cx = 160, cy = 160;
    let svg = `<svg viewBox="0 0 320 320">`;
    for (let i = 1; i < latCount; i++) {
      const ry = (r * i) / latCount;
      svg += `<ellipse class="lat" cx="${cx}" cy="${cy}" rx="${r}" ry="${ry}"></ellipse>`;
    }
    svg += `<ellipse class="lat" cx="${cx}" cy="${cy}" rx="${r}" ry="${r}"></ellipse>`;
    for (let i = 0; i < lonCount; i++) {
      const rx = Math.max(6, Math.abs(r * Math.cos((Math.PI * i) / lonCount)));
      svg += `<ellipse class="lon" cx="${cx}" cy="${cy}" rx="${rx}" ry="${r}" data-i="${i}"></ellipse>`;
    }
    svg += `<circle class="core" cx="${cx}" cy="${cy}" r="2.5"></circle>`;
    svg += `</svg>`;
    wrap.innerHTML = svg;
    hero.appendChild(wrap);

    const lons = $$(".lon", wrap);
    let t = 0;
    if (!reduceMotion) {
      function spin() {
        t += 0.006;
        lons.forEach((el, i) => {
          const phase = t + (i * Math.PI) / lonCount;
          const rx = Math.max(4, Math.abs(r * Math.cos(phase)));
          el.setAttribute("rx", rx);
        });
        requestAnimationFrame(spin);
      }
      requestAnimationFrame(spin);
    }

    if (!isTouch) {
      window.addEventListener("mousemove", e => {
        const px = (e.clientX / window.innerWidth - 0.5) * 14;
        const py = (e.clientY / window.innerHeight - 0.5) * 14;
        wrap.style.transform = `translateY(-50%) translate(${px}px, ${py}px)`;
      });
    }
  }

  /* ---------------------------------------------------------- */
  /* Work list                                                    */
  /* ---------------------------------------------------------- */
  const workList = $("#workList");
  const workAccents = ["#A2472A", "#565F44", "#7E3620", "#4C4739", "#A2472A", "#565F44"];
  if (workList) {
    WORK.forEach((item, i) => {
      const row = document.createElement("div");
      row.className = "work-row";
      row.setAttribute("data-hover", "");
      row.innerHTML = `
        <div class="work-index">${String(i + 1).padStart(2, "0")}</div>
        <div class="work-main">
          <div class="work-title">${item.title}</div>
          <div class="work-desc">${item.desc}</div>
        </div>
        <div class="work-tags">${item.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="work-year">${item.year}</div>
      `;
      row.dataset.accent = workAccents[i % workAccents.length];
      row.dataset.title = item.title;
      workList.appendChild(row);
    });
  }

  /* cursor-following thumbnail preview over work rows */
  if (!isTouch && workList) {
    const preview = document.createElement("div");
    preview.className = "work-preview";
    preview.innerHTML = `<span></span>`;
    document.body.appendChild(preview);
    const label = $("span", preview);

    let px = 0, py = 0, tx = 0, ty = 0, active = false;
    window.addEventListener("mousemove", e => {
      tx = e.clientX; ty = e.clientY;
    });
    function movePreview() {
      px += (tx - px) * 0.2;
      py += (ty - py - 90) * 0.2;
      if (active) preview.style.transform = `translate(${px}px, ${py}px) scale(1)`;
      requestAnimationFrame(movePreview);
    }
    requestAnimationFrame(movePreview);

    $$(".work-row", workList).forEach(row => {
      row.addEventListener("mouseenter", () => {
        active = true;
        preview.style.background = `linear-gradient(160deg, ${row.dataset.accent}, #1A1712)`;
        label.textContent = row.dataset.title;
        preview.classList.add("is-visible");
      });
      row.addEventListener("mouseleave", () => {
        active = false;
        preview.classList.remove("is-visible");
      });
    });
  }

  /* ---------------------------------------------------------- */
  /* Skills grid                                                  */
  /* ---------------------------------------------------------- */
  const skillsGrid = $("#skillsGrid");
  if (skillsGrid) {
    SKILLS.forEach(group => {
      const el = document.createElement("div");
      el.className = "skill-group";
      el.innerHTML = `
        <h3>${group.group}</h3>
        <ul>${group.items.map(s => `<li>${s}</li>`).join("")}</ul>
      `;
      skillsGrid.appendChild(el);
    });
  }

  /* ---------------------------------------------------------- */
  /* Social row                                                   */
  /* ---------------------------------------------------------- */
  const socialRow = $("#socialRow");
  if (socialRow) {
    SOCIALS.forEach(s => {
      const a = document.createElement("a");
      a.href = s.href;
      a.textContent = s.label;
      a.setAttribute("data-hover", "");
      if (s.href !== "#") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      socialRow.appendChild(a);
    });
  }
})();

/* THEME TOGGLE (dark / light) */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const btnMobile = document.getElementById('themeToggleMobile');

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  function safeSet(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch {
      /* storage unavailable — theme just won't persist */
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document
      .querySelectorAll('.theme-toggle i')
      .forEach(
        i => (i.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'),
      );
    const mobileLabel = btnMobile?.querySelector('span');
    if (mobileLabel)
      mobileLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  const saved = safeGet('theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  function toggle() {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    safeSet('theme', next);
  }

  btn?.addEventListener('click', toggle);
  btnMobile?.addEventListener('click', toggle);
})();

/* FOOTER YEAR */
const copyYearEl = document.getElementById('copyYear');
if (copyYearEl) copyYearEl.textContent = new Date().getFullYear();

/* PROJECT FILTER */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');
  const grid = document.getElementById('projGrid');
  if (!filterBtns.length || !grid) return;

  const empty = document.createElement('p');
  empty.className = 'proj-empty';
  empty.textContent = 'No projects in this category yet.';
  grid.after(empty);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      let visibleCount = 0;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('filtered-out', !show);
        if (show) visibleCount++;
      });
      empty.classList.toggle('show', visibleCount === 0);
    });
  });
})();

/* CURSOR */
const cur = document.getElementById('cursor'),
  ring = document.getElementById('cursor-ring');
if (cur && matchMedia('(min-width:641px)').matches) {
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx - 3 + 'px';
    cur.style.top = my - 3 + 'px';
  });
  (function l() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx - 17 + 'px';
    ring.style.top = ry - 17 + 'px';
    requestAnimationFrame(l);
  })();
  document.querySelectorAll('[data-cursor="link"], a, button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });

  /* COMET CURSOR TRAIL */
  const trailColors = [
    'var(--emerald)',
    'var(--azure)',
    'var(--gold)',
    'var(--emerald)',
    'var(--azure)',
  ];
  const trailDots = trailColors.map((c, i) => {
    const d = document.createElement('div');
    d.style.cssText = `position:fixed;top:0;left:0;width:${5 - i * 0.6}px;height:${5 - i * 0.6}px;border-radius:50%;background:${c};pointer-events:none;z-index:9996;opacity:${0.55 - i * 0.08};will-change:transform;`;
    document.body.appendChild(d);
    return { el: d, x: 0, y: 0 };
  });
  let tmx = 0,
    tmy = 0;
  document.addEventListener('mousemove', e => {
    tmx = e.clientX;
    tmy = e.clientY;
  });
  (function trailLoop() {
    let px = tmx,
      py = tmy;
    trailDots.forEach((dot, i) => {
      dot.x += (px - dot.x) * (0.32 - i * 0.03);
      dot.y += (py - dot.y) * (0.32 - i * 0.03);
      dot.el.style.transform = `translate(${dot.x - 2}px, ${dot.y - 2}px)`;
      px = dot.x;
      py = dot.y;
    });
    requestAnimationFrame(trailLoop);
  })();
}

/* SPARKLE FIELD — premium ambient particles */
(function () {
  const field = document.getElementById('sparkleField');
  if (!field) return;
  const count = matchMedia('(min-width:641px)').matches ? 26 : 12;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    const left = Math.random() * 100;
    const dur = 9 + Math.random() * 10;
    const delay = Math.random() * 14;
    const size = 1.5 + Math.random() * 2.5;
    s.style.left = left + 'vw';
    s.style.bottom = '-10px';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = delay + 's';
    field.appendChild(s);
  }
})();

/* SCROLL PROGRESS + NAV SHRINK */
const nav = document.getElementById('mainNav');
const progress = document.getElementById('progress');
window.addEventListener(
  'scroll',
  () => {
    nav.classList.toggle('scrolled', scrollY > 50);
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = pct + '%';
  },
  { passive: true },
);

/* HAMBURGER */
const tog = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
function openMenu() {
  tog.classList.add('open');
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  tog.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}
tog.addEventListener('click', () =>
  tog.classList.contains('open') ? closeMenu() : openMenu(),
);
document
  .querySelectorAll('#mobileLinks a')
  .forEach(a => a.addEventListener('click', closeMenu));

/* TYPED */
const phrases = [
  { t: 'React Frontend Developer', chip: 'react', cls: 'chip-green' },
  { t: 'Full Stack Dev in Progress', chip: 'MERN', cls: 'chip-blue' },
  { t: 'JavaScript & Node.js Builder', chip: 'js', cls: 'chip-green' },
  { t: 'Express.js & MongoDB Learner', chip: 'backend', cls: 'chip-gold' },
  { t: 'Building Scalable Web Apps', chip: 'dev', cls: 'chip-blue' },
];
const typedEl = document.getElementById('typed'),
  chipEl = document.getElementById('typedChip');
let pi = 0,
  ci = 0,
  del = false;
function showChip(p) {
  chipEl.className = 'typed-chip ' + p.cls;
  chipEl.textContent = p.chip;
  setTimeout(() => chipEl.classList.add('show'), 150);
}
function hideChip() {
  chipEl.classList.remove('show');
}
function type() {
  const p = phrases[pi];
  typedEl.textContent = p.t.slice(0, ci);
  if (!del) {
    ci++;
    if (ci > p.t.length) {
      showChip(p);
      del = true;
      setTimeout(type, 2200);
      return;
    }
    setTimeout(type, 70 + Math.random() * 40);
  } else {
    if (ci === p.t.length) hideChip();
    ci--;
    if (ci < 0) {
      del = false;
      pi = (pi + 1) % phrases.length;
      ci = 0;
      setTimeout(type, 450);
      return;
    }
    setTimeout(type, 30);
  }
}
type();

/* REVEAL */
const obs = new IntersectionObserver(
  e =>
    e.forEach(x => {
      if (x.isIntersecting) x.target.classList.add('vis');
    }),
  { threshold: 0.08 },
);
document.querySelectorAll('.reveal,.stagger').forEach(el => obs.observe(el));

/* COUNT-UP STATS */
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseFloat(el.getAttribute('data-count'));
  const isFloat = el.getAttribute('data-count').includes('.');
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          let start = 0,
            dur = 1400,
            t0 = null;
          function step(ts) {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = target * eased;
            el.textContent = isFloat ? val.toFixed(3) : Math.round(val);
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    },
    { threshold: 0.6 },
  );
  io.observe(el);
});

/* HERO IMAGE TILT */
const tiltImg = document.getElementById('tiltImg');
if (tiltImg && matchMedia('(min-width:641px)').matches) {
  const wrap = tiltImg.closest('.hero-visual');
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltImg.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    tiltImg.style.transform = 'rotateY(0) rotateX(0)';
  });
}

/* CARD TILT — projects + skills */
document.querySelectorAll('[data-tilt]').forEach(card => {
  if (!matchMedia('(min-width:769px)').matches) return;
  // The CSS "breathing" keyframe animation on this card also animates
  // transform, and a CSS animation always wins over an inline style —
  // even while paused on :hover — so it silently ate the tilt effect.
  // Fully disabling the animation (not just pausing it) while the
  // pointer is over the card lets our inline transform actually render.
  card.addEventListener('mouseenter', () => {
    card.style.animation = 'none';
  });
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.animation = '';
  });
});

/* MAGNETIC BUTTONS + NAV LINKS */
if (matchMedia('(min-width:641px)').matches) {
  document
    .querySelectorAll('.btn-primary, .btn-outline, .btn-send, .soc-btn')
    .forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) * 0.28;
        const my = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = `translate(${mx}px, ${my}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  document.querySelectorAll('.nav-links a:not(.nav-resume)').forEach(link => {
    link.addEventListener('mousemove', e => {
      const r = link.getBoundingClientRect();
      const mx = (e.clientX - r.left - r.width / 2) * 0.35;
      const my = (e.clientY - r.top - r.height / 2) * 0.35;
      link.style.transform = `translate(${mx}px, ${my}px)`;
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
    });
  });
}

/* CLICK RIPPLE + SPARKLE BURST */
const sparkleColors = ['#6a4ae2', '#0fa383', '#e8794a', '#b39bf0'];
document
  .querySelectorAll('.btn-primary, .btn-outline, .btn-send')
  .forEach(btn => {
    btn.style.position = btn.style.position || 'relative';
    btn.addEventListener('click', function (e) {
      const r = this.getBoundingClientRect();
      const s = document.createElement('span');
      const size = Math.max(r.width, r.height) * 1.6;
      s.style.cssText = `position:absolute;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,.35);pointer-events:none;transform:scale(0);opacity:1;transition:transform .6s ease,opacity .6s ease;`;
      this.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = 'scale(1)';
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 650);

      for (let i = 0; i < 6; i++) {
        const p = document.createElement('span');
        const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
        const dist = 26 + Math.random() * 18;
        const dx = Math.cos(angle) * dist,
          dy = Math.sin(angle) * dist;
        const color = sparkleColors[i % sparkleColors.length];
        p.style.cssText = `position:absolute;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;width:4px;height:4px;border-radius:50%;background:${color};pointer-events:none;box-shadow:0 0 6px 1px ${color};transition:transform .55s cubic-bezier(.16,1,.3,1),opacity .55s ease;opacity:1;transform:translate(0,0) scale(1);z-index:5;`;
        this.appendChild(p);
        requestAnimationFrame(() => {
          p.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
          p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), 600);
      }
    });
  });

/* PROJECT QUICK VIEW MODAL — now with case studies (problem / solution / learnings) */
const projectsData = {
  1: {
    cat: 'Frontend',
    emoji: '🛒',
    title: 'E-Commerce Website',
    desc: 'StyleShop is a fully responsive e-commerce demo built to practice real-world frontend patterns — product listings, category filters, a live cart sidebar with quantity controls, and smooth micro-interactions throughout. Focus was on clean component structure and a polished, production-feel UI using only vanilla JavaScript.',
    stack: ['HTML', 'CSS3', 'JavaScript'],
    live: 'https://shamim-01.github.io/e-Commarce/',
    source: 'https://github.com/shamim-01/e-Commarce',
    problem:
      'বেশিরভাগ frontend প্র্যাকটিস প্রজেক্ট static থাকে — real cart interaction বা quantity/price sync থাকে না।',
    solution:
      'Vanilla JS দিয়ে live cart state, quantity control আর category filter বানানো হয়েছে, কোনো framework ছাড়াই — DOM-কে সরাসরি efficient ভাবে update করে।',
    learnings:
      'DOM manipulation efficiently করা এবং UI-র সাথে state sync রাখা শিখেছি, কোড bloated না করেই।',
  },
  2: {
    cat: 'React Project',
    emoji: '🎨',
    title: 'The Coding Journey',
    desc: 'A learning-focused platform built to help aspiring developers grow through structured tutorials, hands-on project ideas, and skill-building exercises. Built with React and styled with Tailwind CSS, with Framer Motion powering the page transitions and scroll-based reveals for a modern, engaging feel.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    live: 'https://react-project-coding-journey.vercel.app/',
    source: 'https://github.com/shamim-01/React-project-coding_journey',
    problem:
      'শুরুতে pages আগে বানিয়ে ফেলছিলাম component-first না ভেবেই — ফলে markup অনেক জায়গায় duplicate হয়ে যাচ্ছিল।',
    solution:
      'প্রতিটা repeated pattern (card, section header, button) কে ছোট, prop-driven component-এ ভাগ করে ফেলি, এমনকি দ্বিতীয় use-case আসার আগেই।',
    learnings:
      'Component আগে থেকেই ছোট রাখলে প্রজেক্ট বড় হওয়ার সময় maintain করা অনেক সহজ হয় — এবং animation trigger একসাথে বেশি না রাখলে performance ভালো থাকে।',
  },
  3: {
    cat: 'Tailwind CSS',
    emoji: '🌐',
    title: 'TravelPro Elite',
    desc: 'A responsive single-page travel agency landing page featuring custom Tailwind styling, a PostCSS build pipeline, and interactive JavaScript-driven sections. Designed to showcase destinations and packages with a clean, conversion-focused layout across all screen sizes.',
    stack: ['Tailwind CSS', 'PostCSS', 'JavaScript'],
    live: 'https://shamim-01.github.io/tailwind/',
    source: 'https://github.com/shamim-01/tailwind',
    problem:
      'Utility-first CSS দিয়ে landing page বানালে সহজেই class list অগোছালো আর inconsistent হয়ে যায়।',
    solution:
      'PostCSS build pipeline সেট করে custom Tailwind config বানিয়েছি, যাতে design token (color, spacing) consistent থাকে পুরো পেজ জুড়ে।',
    learnings:
      'Consistent design token তৈরি করলে utility classes ব্যবহার করেও clean, maintainable styling সম্ভব।',
  },
  4: {
    cat: 'React Project',
    emoji: '🚀',
    title: 'Smart Coders',
    desc: 'A modern, fast-loading landing page built with React and Vite, featuring smooth Framer Motion animations, a clean responsive layout, and component-driven architecture. Built to explore Vite\u2019s build speed alongside polished motion design.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    live: 'https://react-project-adq4.vercel.app/',
    source: 'https://github.com/shamim-01/react-project',
    problem:
      'Create React App দিয়ে dev server স্লো লাগছিল, বড় প্রজেক্টে iteration speed কমে যাচ্ছিল।',
    solution:
      'Vite দিয়ে পুরো সেটআপ rebuild করি — instant HMR আর দ্রুত build time পেয়ে animation নিয়ে বেশি experiment করতে পেরেছি।',
    learnings:
      'Build tool-এর গতি সরাসরি development experience-কে প্রভাবিত করে — দ্রুত feedback loop মানে দ্রুত ভালো UI decision নেওয়া যায়।',
  },
  5: {
    cat: 'Full Stack',
    emoji: '📋',
    title: 'To Do System',
    desc: 'A smart task manager with priority labels, search and filter tools, progress analytics, and persistent storage using LocalStorage. Built to practice state management patterns and building a genuinely usable productivity tool from scratch.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://shamim-01.github.io/To-do-System/',
    source: 'https://github.com/shamim-01/To-do-System',
    problem:
      'সাধারণ to-do app গুলোতে priority, filter আর progress analytics একসাথে থাকে না — বেশিরভাগই খুব basic।',
    solution:
      'LocalStorage-ভিত্তিক persistent state বানিয়ে priority label, search/filter এবং একটা progress analytics view যোগ করেছি।',
    learnings:
      'ছোট প্রজেক্টেও real state management pattern practice করলে বড় প্রজেক্টে state হ্যান্ডেল করা অনেক সহজ মনে হয়।',
  },
  6: {
    cat: 'Data Analysis',
    emoji: '📊',
    title: 'Sales Data Dashboard',
    desc: 'An interactive Excel dashboard analyzing customer behavior and sales trends using Pivot Tables, dynamic charts, and slicers. Built to practice translating raw sales data into clear, decision-ready visual insights.',
    stack: ['Microsoft Excel', 'Pivot Tables', 'Charts'],
    live: 'https://1drv.ms/x/c/68DD670D228DF5E1/IQBC7jZgQt3VQY-0juUeygvGAXYgHhWDpdpU4pes8fXq310?e=K8k85P',
    source: 'https://github.com/shamim-01/Data-Analysis-dash-board-Excel-',
    problem:
      'কাঁচা sales data থেকে সরাসরি সিদ্ধান্ত নেওয়া কঠিন — pattern আর trend খালি চোখে বোঝা যায় না।',
    solution:
      'Pivot Table, dynamic chart আর slicer ব্যবহার করে একটা interactive dashboard বানিয়েছি যেখানে filter করে বিভিন্ন কোণ থেকে data দেখা যায়।',
    learnings:
      'Data visualization-এর আসল কাজ হলো decision-কে সহজ করা — শুধু চার্ট বানানো না, সঠিক প্রশ্নের উত্তর দেওয়া।',
  },
};

const projOverlay = document.getElementById('projOverlay');
function openProjectModal(id) {
  const p = projectsData[id];
  if (!p || !projOverlay) return;
  document.getElementById('pmThumb').textContent = p.emoji;
  document.getElementById('pmCat').textContent = p.cat;
  document.getElementById('pmTitle').textContent = p.title;
  document.getElementById('pmDesc').innerHTML = `
    <p>${p.desc}</p>
    ${p.problem ? `<div class="cs-block"><b>Problem</b><p>${p.problem}</p></div>` : ''}
    ${p.solution ? `<div class="cs-block"><b>Solution</b><p>${p.solution}</p></div>` : ''}
    ${p.learnings ? `<div class="cs-block"><b>Learnings</b><p>${p.learnings}</p></div>` : ''}
  `;
  document.getElementById('pmStack').innerHTML = p.stack
    .map(s => `<span class="stack-pill">${s}</span>`)
    .join('');
  document.getElementById('pmLive').href = p.live;
  document.getElementById('pmSource').href = p.source;
  projOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeProjectModal() {
  if (!projOverlay) return;
  projOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
document.querySelectorAll('.proj-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', e => {
    if (e.target.closest('.proj-acts')) return;
    openProjectModal(card.dataset.project);
  });
});
document
  .getElementById('projModalClose')
  ?.addEventListener('click', closeProjectModal);
projOverlay?.addEventListener('click', e => {
  if (e.target === projOverlay) closeProjectModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProjectModal();
});

/* HERO NAME — logo pulse on load (letters now animate via pure CSS, no DOM rebuild needed) */
const logoMark = document.querySelector('.logo-mark');
if (logoMark) {
  logoMark.addEventListener('mouseenter', () =>
    logoMark.classList.add('spin-once'),
  );
  logoMark.addEventListener('animationend', () =>
    logoMark.classList.remove('spin-once'),
  );
}

/* HERO PARALLAX ON SCROLL */
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && matchMedia('(min-width:641px)').matches) {
  // .hero-visual has a one-shot CSS entrance animation
  // (fadeUp ... forwards). Because of fill-mode "forwards", that
  // animation keeps holding/overriding the transform property forever
  // after it finishes — which silently blocked the parallax transform
  // set below. Clear it once the entrance animation ends so scroll
  // parallax can actually apply.
  heroVisual.addEventListener(
    'animationend',
    () => {
      // .hero-visual's base (non-animated) rule is opacity:0 — the
      // animation was the only thing making it visible. Freeze the
      // finished state inline BEFORE removing the animation, or the
      // element snaps back to opacity:0 the moment it's cleared.
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = '';
      heroVisual.style.animation = 'none';
    },
    { once: true },
  );
  window.addEventListener(
    'scroll',
    () => {
      const y = Math.min(scrollY, 700);
      heroVisual.style.transform = `translateY(${y * 0.12}px) scale(${1 - y * 0.00012})`;
    },
    { passive: true },
  );
}

/* EDUCATION TIMELINE — trigger connector fill on scroll into view */
const eduWrap = document.querySelector('.edu-wrap');
if (eduWrap) {
  const eduObs = new IntersectionObserver(
    entries => {
      entries.forEach(en => {
        if (en.isIntersecting) eduWrap.classList.add('vis');
      });
    },
    { threshold: 0.15 },
  );
  eduObs.observe(eduWrap);
}

/* CURRENTLY LEARNING — trigger progress bar fill on scroll into view */
(function () {
  const items = document.querySelectorAll('.learn-item');
  if (!items.length) return;
  const learnObs = new IntersectionObserver(
    entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('vis');
          learnObs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  items.forEach(el => learnObs.observe(el));
})();

/* FORM */
document
  .getElementById('contactForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault();
    const fd = new FormData(this);
    try {
      const r = await fetch('https://formspree.io/f/mpqbawqe', {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (r.ok) {
        alert('✅ Message sent!');
        this.reset();
      } else {
        alert('❌ Error sending. Please try again.');
      }
    } catch {
      alert('❌ Network error. Please try again.');
    }
  });

/* ═══ GITHUB LIVE STATS — per-project card (star/fork/updated) ═══
   Reads data-repo="owner/name" off each .proj-card, fetches star/fork
   counts + last-updated date from the public GitHub API, and renders
   them inline. Results are cached in localStorage for 1 hour so the
   60-req/hr unauthenticated rate limit is never a problem on repeat
   visits. */
(function () {
  const CACHE_KEY = 'gh_stats_cache_v1';
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour

  function readCache() {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    } catch {
      return {};
    }
  }
  function writeCache(cache) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
      /* storage unavailable — stats just won't cache */
    }
  }

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days < 1) return 'today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} mo ago`;
    return `${Math.floor(months / 12)} yr ago`;
  }

  function renderSkeleton(el) {
    el.innerHTML = `
      <span class="gh-stat gh-star"><i class="fas fa-star"></i><span class="gh-skel"></span></span>
      <span class="gh-stat gh-fork"><i class="fas fa-code-branch"></i><span class="gh-skel"></span></span>
      <span class="gh-updated gh-skel" style="width:60px"></span>`;
  }

  function renderStats(el, data) {
    el.innerHTML = `
      <span class="gh-stat gh-star" style="animation-delay:.05s"><i class="fas fa-star"></i>${data.stargazers_count}</span>
      <span class="gh-stat gh-fork" style="animation-delay:.12s"><i class="fas fa-code-branch"></i>${data.forks_count}</span>
      <span class="gh-updated" style="animation-delay:.18s">updated ${timeAgo(data.pushed_at)}</span>`;
  }

  function renderError(el) {
    el.innerHTML = `<span class="gh-stat" style="opacity:.6"><i class="fab fa-github"></i>stats unavailable</span>`;
  }

  async function fetchRepoStats(repo) {
    const cache = readCache();
    const hit = cache[repo];
    if (hit && Date.now() - hit.ts < CACHE_TTL) return hit.data;

    const res = await fetch(`https://api.github.com/repos/${repo}`);
    if (!res.ok) throw new Error('GitHub API error: ' + res.status);
    const data = await res.json();

    cache[repo] = { ts: Date.now(), data };
    writeCache(cache);
    return data;
  }

  function init() {
    const cards = document.querySelectorAll('.proj-card[data-repo]');
    if (!cards.length) return;

    cards.forEach(card => {
      const body = card.querySelector('.proj-body');
      if (!body) return;
      const statsEl = document.createElement('div');
      statsEl.className = 'proj-gh-stats';
      renderSkeleton(statsEl);
      body.appendChild(statsEl);

      // Only fetch once the card scrolls into view — saves API calls.
      const io = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            fetchRepoStats(card.dataset.repo)
              .then(data => renderStats(statsEl, data))
              .catch(() => renderError(statsEl));
          });
        },
        { threshold: 0.1 },
      );
      io.observe(card);
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();

/* ═══ GITHUB PROFILE OVERVIEW — #github-stats section ═══
   Fetches public profile info (avatar, repos, followers, following)
   for shamim-01 from the GitHub API and fills the #ghProfile card.
   The readme-stats / contribution-graph images in that section are
   static third-party image endpoints — no JS needed for those. */
(function () {
  const el = document.getElementById('ghProfile');
  if (!el) return;

  const CACHE_KEY = 'gh_profile_cache_v1';
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour

  function readCache() {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    } catch {
      return null;
    }
  }
  function writeCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
    } catch {
      /* storage unavailable — profile just won't cache */
    }
  }

  function render(u) {
    el.innerHTML = `
      <img class="gh-avatar" src="${u.avatar_url}" alt="${u.login}" loading="lazy">
      <div class="gh-profile-stats">
        <div class="gh-profile-stat"><b>${u.public_repos}</b><span>Repos</span></div>
        <div class="gh-profile-stat"><b>${u.followers}</b><span>Followers</span></div>
        <div class="gh-profile-stat"><b>${u.following}</b><span>Following</span></div>
      </div>`;
  }

  function renderError() {
    el.innerHTML = `<span style="color:var(--dim);font-family:'JetBrains Mono',monospace;font-size:0.8rem"><i class="fab fa-github"></i> GitHub profile এখন load করা যাচ্ছে না।</span>`;
  }

  const cached = readCache();
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    render(cached.data);
  }

  fetch('https://api.github.com/users/shamim-01')
    .then(r => {
      if (!r.ok) throw new Error('GitHub API error: ' + r.status);
      return r.json();
    })
    .then(u => {
      render(u);
      writeCache(u);
    })
    .catch(() => {
      if (!cached) renderError();
    });
})();

/* ═══ BLOG SECTION (add to script.js) ═══
   Edit blogData below to add/remove posts — everything else (grid
   render, filtering, read modal) wires itself up automatically. */
(function () {
  const blogData = [
    {
      id: 1,
      cat: 'React',
      emoji: '⚛️',
      title: 'What I Learned Building The Coding Journey',
      date: 'Jun 2026',
      excerpt:
        'Notes on structuring a React + Tailwind project for real growth — component design, Framer Motion pitfalls, and what I\u2019d do differently next time.',
      tags: ['React', 'Tailwind CSS', 'Framer Motion'],
      content: `
        <p>When I started The Coding Journey, my biggest mistake was building pages before building components. I ended up rewriting half the UI once I realized how much markup was being duplicated across routes.</p>
        <p>The fix was pulling every repeated pattern — cards, section headers, buttons — into small, prop-driven components early, even before they had a second use case. It felt like premature abstraction at the time, but it paid off the moment the project grew past three pages.</p>
        <p>Framer Motion was the other big lesson. Animating on every scroll trigger looked great in isolation but tanked performance once combined with several other effects. Batching animations and reducing simultaneous triggers made the biggest visible difference.</p>
      `,
    },
    {
      id: 2,
      cat: 'Backend',
      emoji: '🛠️',
      title: 'Moving From Frontend-Only to MERN',
      date: 'May 2026',
      excerpt:
        'Why I started learning Node.js and Express after a year of frontend work, and the mental shift from "how does it look" to "how does it hold state."',
      tags: ['Node.js', 'Express.js', 'MongoDB'],
      content: `
        <p>Frontend work trains you to think in terms of what\u2019s visible: layout, state, interaction. Backend work forces a different question — what happens when the request fails, when two users hit the same endpoint at once, when the data doesn\u2019t look like you expected.</p>
        <p>Building small REST APIs with Express was the fastest way I found to internalize this. Starting with a single resource — a to-do list, a notes API — and adding validation, error handling, and auth one layer at a time made the concepts stick far better than reading about them.</p>
        <p>MongoDB and Mongoose came next, mostly because schema flexibility made it easier to iterate on data models while still learning what a "good" schema looks like.</p>
      `,
    },
    {
      id: 3,
      cat: 'Career',
      emoji: '🎯',
      title: 'What I\u2019m Looking For in My First Full-Time Role',
      date: 'Apr 2026',
      excerpt:
        'Some honest thoughts on what matters most to me right now: mentorship, real ownership, and a codebase I can actually learn from.',
      tags: ['Career', 'Job Search'],
      content: `
        <p>Coming out of university, it\u2019s tempting to chase the biggest name on the offer. What I\u2019ve come to value more is proximity to people who\u2019ll actually review my code and explain why, not just approve or reject it.</p>
        <p>I\u2019m specifically looking for teams where junior developers get real ownership early — not just tickets, but the context behind them. That context is what turns a task into an actual lesson.</p>
      `,
    },
  ];

  const grid = document.getElementById('blogGrid');
  const filtersWrap = document.getElementById('blogFilters');
  if (!grid) return;

  function render(list) {
    grid.innerHTML = list
      .map(
        p => `
      <div class="blog-card" data-post="${p.id}" data-cat="${p.cat}">
        <div class="blog-thumb"><span>${p.emoji}</span></div>
        <div class="blog-body">
          <div class="blog-meta"><span>${p.cat}</span><span class="blog-date">${p.date}</span></div>
          <div class="blog-title">${p.title}</div>
          <p class="blog-excerpt">${p.excerpt}</p>
          <div class="blog-tags">${p.tags.map(t => `<span class="stack-pill">${t}</span>`).join('')}</div>
          <div class="blog-readmore">Read more <i class="fas fa-arrow-right"></i></div>
        </div>
      </div>`,
      )
      .join('');

    grid.querySelectorAll('.blog-card').forEach(card => {
      card.addEventListener('click', () => openBlogModal(card.dataset.post));
    });
  }

  render(blogData);

  // Filters
  if (filtersWrap) {
    filtersWrap.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersWrap
          .querySelectorAll('.filter-btn')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        render(f === 'all' ? blogData : blogData.filter(p => p.cat === f));
      });
    });
  }

  // Read modal
  const overlay = document.getElementById('blogOverlay');
  function openBlogModal(id) {
    const p = blogData.find(x => x.id == id);
    if (!p || !overlay) return;
    document.getElementById('bmThumb').textContent = p.emoji;
    document.getElementById('bmCat').textContent = p.cat;
    document.getElementById('bmTitle').textContent = p.title;
    document.getElementById('bmMeta').textContent = p.date;
    document.getElementById('bmContent').innerHTML = p.content;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeBlogModal() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  document
    .getElementById('blogModalClose')
    ?.addEventListener('click', closeBlogModal);
  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeBlogModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBlogModal();
  });
})();

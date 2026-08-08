<h1 align="center">Shamim Alam — Portfolio Website</h1>

<p align="center">
  <a href="[https://shamim-01.github.io/](https://shamim-nine.vercel.app/)"><img src="https://img.shields.io/badge/Live-Demo-9b83f2?style=for-the-badge" alt="Live Demo"></a>
  <a href="https://github.com/shamim-01"><img src="https://img.shields.io/badge/GitHub-shamim--01-181717?style=for-the-badge&logo=github" alt="GitHub"></a>
  <a href="https://www.linkedin.com/in/shamim-alam-620719330/"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn"></a>
</p>

<p align="center">
A modern, animated, fully responsive personal portfolio website built with vanilla <b>HTML, CSS and JavaScript</b>. It showcases my work as a <b>Frontend Developer (React)</b> and aspiring <b>Full Stack (MERN) Developer</b> — including my projects, skills, education, blog posts, and a contact form.
</p>


---

## 📖 About

I'm a Frontend Developer based in Dhaka, Bangladesh, focused on building clean, responsive, and user-friendly web applications. My core stack includes **HTML, CSS, Tailwind CSS, JavaScript, and React**, and I'm currently expanding into **Full Stack (MERN)** development with **Node.js, Express, and MongoDB**.

- 🎓 B.Sc. in Computer Science & Engineering — Ahsanullah University of Science & Technology 
- 📍 Dhaka, Bangladesh
- ✅ Open to freelance, internship, and full-time frontend/MERN roles

---

## ✨ Features

- **Dark / Light mode** toggle with `localStorage` persistence and system-preference detection
- **Custom cursor** with magnetic buttons and comet-style trail effect (desktop only)
- **Animated hero section** with a typewriter effect cycling through roles/skills
- **Scroll-triggered reveal animations** using `IntersectionObserver`
- **Filterable project grid** with a quick-view modal for each project
- **Live GitHub stats** (stars, forks, last updated) fetched per-project via the GitHub REST API, with local caching to respect rate limits
- **Blog section** with category filtering and a full read modal
- **Animated education timeline** that fills in on scroll
- **Working contact form** powered by [Formspree](https://formspree.io/)
- **Fully responsive** — optimized for desktop, tablet, and mobile
- Respects `prefers-reduced-motion` for accessibility

---

## 🛠️ Tech Stack

| Category | Technologies |
| --- | --- |
| Structure & Logic | HTML5, CSS3, JavaScript (ES6+) |
| Styling | Custom CSS (CSS Variables, Flexbox, Grid), responsive breakpoints |
| Fonts | Fraunces, Space Grotesk, JetBrains Mono, Inter (Google Fonts) |
| Icons | Font Awesome 6 |
| APIs | GitHub REST API, Formspree |
| Tools | Git, GitHub, VS Code |

---

## 📁 Project Structure

```
├── index.html          # Main HTML file (hero, about, skills, education, projects, blog, contact)
├── 404.html             # Custom "page not found" error page
├── style.css            # All styling, theming (light/dark), and animations
├── script.js             # Interactivity: theme toggle, typing effect, filters, modals, GitHub stats, blog, form
├── favicon.svg
├── robots.txt            # Search engine crawler rules
├── sitemap.xml           # Sitemap for SEO
├── ShamimAlam.pdf        # Downloadable resume
└── images/
    └── shamim.jpeg       # Profile photo
```

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/shamim-01/shamim-01.github.io.git
   cd shamim-01.github.io
   ```

2. **Open locally**
   Simply open `index.html` in your browser, or serve it with a local dev server:
   ```bash
   npx serve .
   ```

3. **Customize**
   - Update personal info and section content directly in `index.html`
   - Edit project cards and their data in `index.html` / `projectsData` in `script.js`
   - Edit or add blog posts in the `blogData` array in `script.js`
   - Update the contact form endpoint in `script.js` (`formspree.io/f/...`) with your own Formspree ID
   - Replace `images/shamim.jpeg` and `ShamimAlam.pdf` with your own assets

---

## 📬 Contact

- **Email:** [shamimalam4949@gmail.com](mailto:shamimalam4949@gmail.com)
- **Phone:** +880 1880 003042
- **GitHub:** [@shamim-01](https://github.com/shamim-01)

---

## 📄 License

This project is open source and available for reference. If you reuse significant portions of the design or code, a credit/link back is appreciated. Personal content (photo, resume, bio) is © Shamim Alam and should not be reused as-is.

---

<p align="center">Designed & built with ♥ by <a href="https://github.com/shamim-01">Shamim Alam</a></p>

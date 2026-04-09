import { useState, useEffect, useRef } from "react";

const DATA = {
  name: "Mahetab Patel",
  initials: "MP",
  avatarUrl: "/profile.png", // Add your photo to public folder as profile.png
  title: "Full-Stack Developer",
  roles: ["Full-Stack Developer", "MERN Stack Engineer", "React Developer", "Next.js Builder", "AI Integration Dev"],
  tagline: "I build scalable web apps & ship AI-powered products to production.",
  email: "mahetabpatel33@gmail.com",
  phone: "+91 90755-36040",
  location: "Pune, Maharashtra",
  github: "https://github.com/petelmahetab",
  linkedin: "https://www.linkedin.com/in/mahetab-patel-0b0a54292/",
  resumeUrl: "https://drive.google.com/file/d/10eOSsCj1zJBvf__wQVq3NFZZVCx64kF4/preview",
  about: `Full-Stack Developer with a B.Tech in Computer Science Graduate.
I specialize in building scalable MERN applications and have shipped AI-integrated SaaS products to production.
Passionate about clean architecture, real-world impact, and turning complex problems into elegant solutions.`,
  stats: [
    { label: "Projects Shipped", value: 10, suffix: "+" },
    { label: "Internship Months", value: 6, suffix: "" },
    { label: "Technologies", value: 20, suffix: "+" },
    { label: "GPA", value: 8.0, suffix: "" },
  ],
  skills: {
    Frontend: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Redux Toolkit", "TanStack Query", "Tailwind CSS"],
    Backend: ["Node.js", "Express.js", "RESTful APIs", "Socket.IO", "Stream.IO", "Inngest"],
    Databases: ["MongoDB", "PostgreSQL", "Prisma", "Supabase"],
    "Tools & Platforms": ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Clerk", "Groq API", "Vapi"],
  },
  projects: [
    {
      id: "01", title: "CareerPilot", date: "Jan 2026",
      description: "AI-powered career coaching SaaS — resume builder, ATS templates, cover letters & mock interviews. Pro/Free gating via Clerk auth with Groq LLM (Llama 3.3 70B).",
      tech: ["Next.js 16", "Supabase", "Prisma", "Clerk", "Groq LLM", "Vercel"],
      github: "https://github.com/petelmahetab/CareerPilots",
      live: "https://career-pilots.vercel.app/",
    },
    {
      id: "02", title: "Talk2Hire", date: "Oct 2025",
      description: "Secure 1-on-1 video interview platform with real-time chat, screen sharing, recording, collaborative code editor with isolated runtimes, and automated code-execution feedback.",
      tech: ["React", "Node.js", "MongoDB", "Clerk", "Stream.io", "Inngest", "TanStack Query"],
      github: "https://github.com/petelmahetab/Talk2Hire",
      live: "https://talk2-hire-seven.vercel.app/",
    },
    {
      id: "03", title: "DentWise", date: "Dec 2025",
      description: "3-step dentist appointment booking with email verification, AI voice agent (Vapi), subscription billing, and an admin dashboard for appointment management.",
      tech: ["React", "Node.js", "PostgreSQL", "Prisma", "Clerk", "Vapi", "TanStack Query"],
      github: "https://github.com/petelmahetab/BookMyDent",
      live: "https://book-my-dent.vercel.app/",
    },
    {
      id: "04",
      title: "Expense Tracker",
      date: "Jan 2025",
      description: "MERN stack finance app with JWT auth, interactive charts, income/expense tracking, Excel export, and responsive dashboard.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Chart.js"],
      github: "https://github.com/petelmahetab/expense-tracker",
      live: "https://xpense-tracks-with-me.vercel.app/"
    },
    {
      id: "05",
      title: "AZURA",
      date: "Mar 2025",
      description: "Real-time chat platform with in-browser code execution, AI-powered suggestions, and WebContainer integration.",
      tech: ["React", "Vite", "Node.js", "Socket.IO", "MongoDB", "WebContainer", "Gemini API"],
      github: "https://github.com/petelmahetab/AZURA",
      live: "https://azura-with-me.vercel.app/"
    },
  ],
  education: [
    { degree: "B.Tech — Computer Science", institution: "Vilasrao Deshmukh Foundation School of Engineering", university: "DBATU University, Raigad", year: "June 2024", score: "GPA: 8.0" },
    { degree: "Diploma — Mechanical Engineering", institution: "Rajiv Gandhi Polytechnic, Udgir", university: "MSBTE, Mumbai", year: "July 2021", score: "Score: 88.5%" },
  ],
  certifications: [
    { title: "Claude Code in Action", issuer: "Anthropic", year: "Mar 2026" },
    { title: "Internship", issuer: "IT Shaala (6 months)", year: "2023–24" },
    { title: "Advanced Web Technologies Workshop", issuer: "Top 10% of Participants", year: "2025" },
  ],
};

function useTypewriter(words, speed = 90) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    const word = words[index];
    if (!deleting && sub === word.length + 1) { const t = setTimeout(() => setDeleting(true), 1800); return () => clearTimeout(t); }
    if (deleting && sub === 0) { setDeleting(false); setIndex((i) => (i + 1) % words.length); return; }
    const t = setTimeout(() => { setSub((s) => s + (deleting ? -1 : 1)); setText(word.substring(0, sub)); }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [sub, deleting, index, words, speed]);
  return text;
}

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    const isFloat = target % 1 !== 0; const steps = 60; const inc = target / steps; let current = 0;
    const t = setInterval(() => { current += inc; if (current >= target) { setCount(target); clearInterval(t); } else setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current)); }, 20);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function RevealSection({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return <div ref={ref} className={`reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

// Icons
const GithubIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const ExternalIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const LinkedinIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const MailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const MapIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;

const CSS2 = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  :root {
    --bg:       #03050a;
    --surface:  #070d15;
    --surface2: #0b1220;
    --border:   #0f1e30;
    --border2:  #162840;
    --accent:   #00d4ff;
    --accent-d: rgba(0,212,255,0.07);
    --text:     #dde8f0;
    --muted:    #7a9bb5;
    --faint:    #3d5a70;
    --font-h:   'Plus Jakarta Sans', sans-serif;
    --font-b:   'Plus Jakarta Sans', sans-serif;
    --font-m:   'JetBrains Mono', monospace;
  }
  body { background: var(--bg); color: var(--text); font-family: var(--font-b); line-height: 1.6; }
  ::selection { background: var(--accent); color: var(--bg); }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.8)} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes scanLine { 0%{top:-20%} 100%{top:120%} }
  @keyframes scrollBar{ 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
  @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes glow     { 0%,100%{box-shadow:0 0 20px rgba(0,212,255,.3)} 50%{box-shadow:0 0 40px rgba(0,212,255,.6)} }
  @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes morph    { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
  @keyframes rotate   { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
  @keyframes borderGlow { 0%,100%{border-color:rgba(0,212,255,.3)} 50%{border-color:rgba(0,212,255,.8)} }
  @keyframes navGlow   { 0%,100%{text-shadow:0 0 10px transparent} 50%{text-shadow:0 0 20px var(--accent)} }
  @keyframes slideDown { from{transform:translateY(-10px);opacity:0} to{transform:translateY(0);opacity:1} }

  .reveal { opacity:0; transform:translateY(22px); transition: opacity .5s ease, transform .5s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }

  .portfolio2 { min-height:100vh; background:var(--bg); overflow-x:hidden; }
  .container { max-width:1100px; margin:0 auto; padding:0 1.5rem; }
  section { padding:5.5rem 0; }
  .divider { width:100%; height:1px; background:var(--border); }

  /* SECTION HEADERS */
  .section-header {
    text-align: center;
    margin-bottom: 3.5rem;
    position: relative;
  }

  .section-label {
    font-family: var(--font-m);
    font-size: 0.85rem;
    color: var(--accent);
    letter-spacing: 0.4em;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
    display: block;
    opacity: 0.9;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .section-label::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 0;
    height: 1px;
    background: var(--accent);
    transition: all 0.4s ease;
    transform: translateX(-50%);
  }

  .section-header:hover .section-label {
    letter-spacing: 0.6em;
    opacity: 1;
    text-shadow: 0 0 30px var(--accent);
  }

  .section-header:hover .section-label::before {
    width: 100px;
  }

  .section-title {
    font-family: var(--font-h);
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 800;
    color: #fff;
    letter-spacing: -3px;
    line-height: 1.05;
    position: relative;
    display: inline-block;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .section-title:hover {
    transform: scale(1.03) translateY(-2px);
  }

  .section-title .hl {
    color: var(--accent);
    position: relative;
    display: inline-block;
    transition: all 0.3s ease;
  }

  .section-title .hl::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent), transparent);
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 2px;
  }

  .section-header:hover .section-title .hl::after {
    width: 100%;
  }

  .section-header:hover .section-title .hl {
    text-shadow: 0 0 40px var(--accent);
    filter: brightness(1.2);
  }

  .section-title::before {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    border-radius: 3px;
    transition: all 0.4s ease;
    opacity: 0.7;
  }

  .section-header:hover .section-title::before {
    width: 150px;
    opacity: 1;
    box-shadow: 0 0 30px var(--accent), 0 0 60px rgba(0,212,255,.3);
  }

  .section-header {
    animation: float 5s ease-in-out infinite;
  }

  .section-header:hover {
    animation-play-state: paused;
  }

  .section-header::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,.05), transparent);
    transition: left 0.6s ease;
    pointer-events: none;
  }

  .section-header:hover::after {
    left: 100%;
  }

  /* NAV */
  .nav2 {
    position:fixed; top:0; left:0; right:0; z-index:999;
    padding:.85rem 2rem; display:flex; align-items:center; justify-content:space-between;
    background:rgba(3,5,10,.95); backdrop-filter:blur(20px);
    border-bottom:1px solid var(--border); transition:all .3s;
    animation: slideDown 0.6s ease;
  }
  .nav2.scrolled {
    padding:.6rem 2rem;
    background:rgba(3,5,10,.98);
    box-shadow: 0 10px 40px rgba(0,0,0,.5);
  }

  .nav2-left { display:flex; align-items:center; gap:1rem; }
  .nav2-logo-box {
    width: 42px; height: 42px;
    border: 2px solid var(--accent); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(0,212,255,.1), transparent);
    box-shadow: 0 0 20px rgba(0,212,255,.2);
    transition: all 0.3s ease; position: relative; overflow: hidden;
  }
  .nav2-logo-box::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,.3), transparent);
    transition: left 0.5s ease;
  }
  .nav2-logo-box:hover { transform: scale(1.05) rotate(5deg); box-shadow: 0 0 30px rgba(0,212,255,.4); }
  .nav2-logo-box:hover::before { left: 100%; }
  .nav2-logo-text {
    font-family: var(--font-h); font-size: 1.1rem; font-weight: 800;
    color: var(--accent); letter-spacing: 1px; text-shadow: 0 0 10px rgba(0,212,255,.5);
  }

  .nav2-brand {
    font-family: var(--font-h); font-weight: 700; font-size: 1.2rem;
    color: #fff; letter-spacing: -0.5px; transition: all 0.3s ease;
  }
  .nav2-brand:hover { color: var(--accent); text-shadow: 0 0 20px rgba(0,212,255,.3); }

  .nav2-links { display:flex; gap:2.5rem; list-style:none; align-items: center; }
  .nav2-link-item { position: relative; }
  .nav2-link {
    font-family: var(--font-m); font-size: 0.75rem; color: var(--muted);
    text-decoration: none; letter-spacing: 0.1em; text-transform: lowercase;
    padding: 0.5rem 0; position: relative; transition: all 0.3s ease;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
  }
  .nav2-link-underline {
    width: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    transition: width 0.3s ease; border-radius: 1px;
  }
  .nav2-link:hover { color: var(--accent); transform: translateY(-2px); }
  .nav2-link:hover .nav2-link-underline { width: 100%; box-shadow: 0 0 10px var(--accent); }
  .nav2-link.active { color: var(--accent); }
  .nav2-link.active .nav2-link-underline { width: 100%; background: var(--accent); }
  .nav2-link-num { display: none; }
  .nav2-link:hover .nav2-link-num { display: none; }

  .nav2-cta {
    font-family: var(--font-m); font-size: 0.7rem; font-weight: 700;
    color: var(--bg); background: var(--accent); border: none;
    padding: 0.6rem 1.3rem; border-radius: 4px; cursor: pointer;
    letter-spacing: 0.08em; transition: all 0.3s ease; text-decoration: none;
    box-shadow: 0 0 20px rgba(0,212,255,.3); position: relative; overflow: hidden;
    display: flex; align-items: center; gap: 0.4rem;
  }
  .nav2-cta::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
    transition: left 0.5s ease;
  }
  .nav2-cta:hover { box-shadow: 0 0 35px rgba(0,212,255,.6); transform: translateY(-2px) scale(1.02); }
  .nav2-cta:hover::before { left: 100%; }
  .nav2-cta-arrow { transition: transform 0.3s ease; }
  .nav2-cta:hover .nav2-cta-arrow { transform: translate(3px, -3px); }

  @media(max-width:768px){
    .nav2-links { display: none; }
    .nav2 { padding: 0.7rem 1rem; }
  }

  /* HERO */
  .hero2 {
    min-height:100vh; display:flex; align-items:center;
    padding:7rem 0 4rem; position:relative; overflow:hidden;
  }
  .hero2-dots {
    position:absolute; inset:0; pointer-events:none;
    background-image: radial-gradient(rgba(0,212,255,.12) 1px, transparent 1px);
    background-size:36px 36px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }
  .hero2-glow { position:absolute; top:-20%; left:-10%; width:560px; height:560px; background:radial-gradient(circle, rgba(0,212,255,.07) 0%, transparent 65%); pointer-events:none; }
  .hero2-glow2 { position:absolute; bottom:-10%; right:-5%; width:340px; height:340px; background:radial-gradient(circle, rgba(0,212,255,.04) 0%, transparent 70%); pointer-events:none; }
  .hero2-scanline {
    position:absolute; left:0; right:0; height:1px;
    background:linear-gradient(90deg, transparent, rgba(0,212,255,.15), transparent);
    animation: scanLine 6s linear infinite; pointer-events:none;
  }

  .hero2-container {
    display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center;
    max-width: 1200px; margin: 0 auto; padding: 0 2rem; width: 100%; position: relative; z-index: 1;
  }
  @media(max-width:900px) {
    .hero2-container { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
    .hero2-image-wrapper { order: -1; }
  }
  .hero2-content { position: relative; max-width: 600px; }

  .hero2-image-wrapper { position: relative; display: flex; justify-content: center; align-items: center; }
  .hero2-image-container {
    position: relative; width: 320px; height: 320px;
    animation: morph 8s ease-in-out infinite; overflow: hidden;
    border: 3px solid rgba(0,212,255,.3);
    box-shadow: 0 0 60px rgba(0,212,255,.2), inset 0 0 60px rgba(0,212,255,.1);
    transition: all 0.4s ease;
  }
  .hero2-image-container:hover { box-shadow: 0 0 80px rgba(0,212,255,.4), inset 0 0 80px rgba(0,212,255,.2); border-color: rgba(0,212,255,.6); transform: scale(1.02); }
  .hero2-image { width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: transform 0.4s ease; }
  .hero2-image-container:hover .hero2-image { transform: scale(1.05); }
  .hero2-image-border {
    position: absolute; width: 340px; height: 340px;
    border: 2px dashed rgba(0,212,255,.2); border-radius: 50%;
    animation: rotate 20s linear infinite; pointer-events: none;
  }
  .hero2-image-border::before {
    content: ''; position: absolute; inset: 10px;
    border: 1px solid rgba(0,212,255,.1); border-radius: 50%;
    animation: rotate 15s linear infinite reverse;
  }
  .hero2-particles { position: absolute; width: 100%; height: 100%; pointer-events: none; }
  .particle {
    position: absolute; width: 6px; height: 6px;
    background: var(--accent); border-radius: 50%; opacity: 0.6; animation: float 3s ease-in-out infinite;
  }
  .particle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
  .particle:nth-child(2) { top: 20%; right: 15%; animation-delay: 0.5s; }
  .particle:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 1s; }
  .particle:nth-child(4) { bottom: 10%; right: 10%; animation-delay: 1.5s; }

  .hero2-label { display:inline-flex; align-items:center; gap:.5rem; font-family:var(--font-m); font-size:.65rem; color:var(--accent); letter-spacing:.16em; margin-bottom:1.5rem; animation:fadeIn .6s ease; }
  .hero2-label-dot { width:5px; height:5px; border-radius:50%; background:var(--accent); animation:pulse 2s infinite; }
  .hero2-name { font-family:var(--font-h); font-size:clamp(2.5rem,5vw,4rem); font-weight:800; color:#fff; line-height:1.1; letter-spacing:-2px; margin-bottom:.3rem; animation:fadeUp .7s ease; }
  .hero2-name .hl { color:var(--accent); text-shadow:0 0 32px rgba(0,212,255,.3); }
  .hero2-role { font-family:var(--font-m); font-size:clamp(.85rem,1.5vw,1rem); color:var(--muted); min-height:2rem; margin-bottom:1.5rem; animation:fadeUp .7s .1s ease both; }
  .cursor2 { display:inline-block; width:2px; height:1em; background:var(--accent); margin-left:2px; animation:blink .7s infinite; vertical-align:text-bottom; box-shadow:0 0 6px var(--accent); }
  .hero2-desc { color:var(--faint); font-size:.95rem; line-height:1.75; max-width:480px; margin-bottom:2rem; animation:fadeUp .7s .2s ease both; }
  @media(max-width:900px) { .hero2-desc { margin-left: auto; margin-right: auto; } }
  .hero2-btns { display:flex; gap:.85rem; flex-wrap:wrap; animation:fadeUp .7s .3s ease both; }
  @media(max-width:900px) { .hero2-btns { justify-content: center; } }

  .btn2-primary {
    font-family:var(--font-m); font-size:.72rem; font-weight:700;
    background:var(--accent); color:var(--bg); border:none;
    padding:.75rem 1.7rem; border-radius:2px; cursor:pointer;
    letter-spacing:.06em; transition:all .3s ease; text-decoration:none;
    box-shadow:0 0 20px rgba(0,212,255,.25); position: relative; overflow: hidden;
  }
  .btn2-primary::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent); transition: left 0.5s ease; }
  .btn2-primary:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 0 40px rgba(0,212,255,.5); }
  .btn2-primary:hover::before { left: 100%; }

  .btn2-ghost {
    font-family:var(--font-m); font-size:.72rem; background:transparent; color:var(--text);
    border:1px solid var(--border2); padding:.75rem 1.7rem; border-radius:2px;
    cursor:pointer; letter-spacing:.06em; transition:all .3s ease; text-decoration:none;
    position: relative; overflow: hidden;
  }
  .btn2-ghost::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0,212,255,.1), transparent); transition: left 0.5s ease; }
  .btn2-ghost:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-3px) scale(1.02); box-shadow:0 0 25px rgba(0,212,255,.25); }
  .btn2-ghost:hover::before { left: 100%; }

  .hero2-socials { position:absolute; right:0; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:.85rem; }
  .hero2-social {
    width:36px; height:36px; display:flex; align-items:center; justify-content:center;
    border:1px solid var(--border2); background:var(--surface); color:var(--muted);
    text-decoration:none; border-radius:3px; transition:all .3s ease; position: relative; overflow: hidden;
  }
  .hero2-social::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0,212,255,.2), transparent); transition: left 0.5s ease; }
  .hero2-social:hover { border-color:var(--accent); color:var(--accent); box-shadow:0 0 20px rgba(0,212,255,.3); transform:translateX(-5px) scale(1.05); }
  .hero2-social:hover::before { left: 100%; }

  .hero2-scroll { position:absolute; bottom:2.5rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:.5rem; }
  .hero2-scroll-line { width:1px; height:52px; background:linear-gradient(to bottom,var(--accent),transparent); animation:scrollBar 2s ease-in-out infinite; }
  @media(max-width:900px){
    .hero2-socials { position: static; flex-direction: row; justify-content: center; transform: none; margin-top: 2rem; }
    .hero2-scroll { display:none; }
  }

  /* ABOUT */
  .about2 { background:var(--surface); }
  .about2-grid { display:grid; grid-template-columns:1.1fr .9fr; gap:4rem; margin-top:3rem; }
  @media(max-width:760px){ .about2-grid{grid-template-columns:1fr; gap:2rem;} }
  .about2-text { color:var(--muted); font-size:.975rem; line-height:1.85; margin-bottom:1.25rem; }
  .about2-text strong { color:var(--text); }
  .meta2 { display:flex; flex-direction:column; gap:.55rem; margin-top:.75rem; }
  .meta2-item { display:flex; align-items:center; gap:.55rem; font-family:var(--font-m); font-size:.68rem; color:var(--muted); transition: all 0.3s ease; }
  .meta2-item:hover { color: var(--accent); transform: translateX(5px); }
  .meta2-item svg { color:var(--accent); transition: all 0.3s ease; }
  .meta2-item:hover svg { transform: scale(1.2); filter: drop-shadow(0 0 5px var(--accent)); }
  .stats2-grid { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; }
  .stat2-card { background:var(--surface2); border:1px solid var(--border); border-radius:4px; padding:1.2rem; transition:all .3s ease; position:relative; overflow:hidden; }
  .stat2-card::before { content:''; position:absolute; inset:0; border-radius:4px; background:linear-gradient(135deg, rgba(0,212,255,.08), transparent); opacity:0; transition:opacity .3s; }
  .stat2-card:hover { border-color:var(--accent); transform:translateY(-5px) scale(1.02); box-shadow:0 10px 40px rgba(0,212,255,.15); }
  .stat2-card:hover::before { opacity:1; }
  .stat2-num { font-family:var(--font-h); font-size:2.1rem; font-weight:800; color:var(--accent); line-height:1; text-shadow:0 0 20px rgba(0,212,255,.3); transition: all 0.3s ease; }
  .stat2-card:hover .stat2-num { transform: scale(1.1); text-shadow: 0 0 30px rgba(0,212,255,.5); }
  .stat2-label { font-size:.7rem; color:var(--faint); margin-top:.25rem; }

  .edu2-list { margin-top:2.5rem; display:flex; flex-direction:column; gap:.85rem; }
  .edu2-card { background:var(--surface); border:1px solid var(--border); border-radius:4px; padding:1.25rem 1.5rem; display:flex; align-items:flex-start; gap:1.25rem; transition:all .3s ease; position:relative; overflow:hidden; }
  .edu2-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--accent); transform:scaleY(0); transform-origin:bottom; transition:transform .3s; box-shadow:0 0 10px var(--accent); }
  .edu2-card:hover::before { transform:scaleY(1); }
  .edu2-card:hover { border-color:var(--border2); transform:translateX(10px); box-shadow: 0 10px 30px rgba(0,0,0,.3); }
  .edu2-year { font-family:var(--font-m); font-size:.62rem; color:var(--accent); letter-spacing:.1em; white-space:nowrap; }
  .edu2-degree { font-family:var(--font-h); font-size:.975rem; font-weight:700; color:#fff; margin-bottom:.2rem; transition: color 0.3s ease; }
  .edu2-card:hover .edu2-degree { color: var(--accent); }
  .edu2-inst { font-size:.82rem; color:var(--muted); margin-bottom:.1rem; }
  .edu2-score { font-family:var(--font-m); font-size:.68rem; color:var(--accent); }

  /* SKILLS */
  .skills2 { background:var(--surface); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
  .skills2-grid { margin-top:2.5rem; display:grid; grid-template-columns:1fr 1fr; gap:2rem; }
  @media(max-width:640px){ .skills2-grid{grid-template-columns:1fr;} }
  .skill2-group-label { font-family:var(--font-m); font-size:.7rem; color:var(--accent); letter-spacing:.25em; text-transform:uppercase; margin-bottom:.75rem; transition: all 0.3s ease; }
  .skill2-group:hover .skill2-group-label { letter-spacing: 0.35em; text-shadow: 0 0 10px var(--accent); }
  .skill2-tags { display:flex; flex-wrap:wrap; gap:.4rem; }
  .skill2-tag {
    background:var(--surface2); border:1px solid var(--border); color:var(--muted);
    padding:.35rem .9rem; border-radius:3px; font-size:.78rem; font-family:var(--font-m);
    transition:all .3s cubic-bezier(0.4, 0, 0.2, 1); cursor:default; position: relative; overflow: hidden;
  }
  .skill2-tag::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0,212,255,.1), transparent); transition: left 0.5s ease; }
  .skill2-tag:hover { background:rgba(0,212,255,.1); border-color:var(--accent); color:var(--accent); transform:translateY(-3px) scale(1.05); box-shadow:0 5px 20px rgba(0,212,255,.2); }
  .skill2-tag:hover::before { left: 100%; }

  /* PROJECTS */
  .projects2-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(320px,1fr)); gap:1.5rem; margin-top:3rem; align-items:stretch; }
  .proj2-wrap { display:flex; height:100%; }
  .project2-card {
    background:var(--surface); border:1px solid var(--border); border-radius:8px;
    padding:2rem; display:flex; flex-direction:column;
    width:100%; position:relative; overflow:hidden; transition:all .4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .project2-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--accent),transparent); opacity:0; transition:opacity .3s; }
  .project2-card::after { content:''; position:absolute; inset:0; border-radius:8px; background:linear-gradient(135deg,rgba(0,212,255,.05),transparent 60%); opacity:0; transition:opacity .3s; pointer-events:none; }
  .project2-card:hover { border-color:var(--accent); transform:translateY(-8px) scale(1.01); box-shadow:0 25px 80px rgba(0,0,0,.5), 0 0 50px rgba(0,212,255,.1); }
  .project2-card:hover::before, .project2-card:hover::after { opacity:1; }
  .proj2-header { display:flex; justify-content:space-between; margin-bottom:1.2rem; align-items: center; }
  .proj2-num { font-family:var(--font-m); font-size:.7rem; color:var(--border2); letter-spacing:.12em; transition: all 0.3s ease; }
  .project2-card:hover .proj2-num { color: var(--accent); }
  .proj2-date { font-family:var(--font-m); font-size:.65rem; color:var(--faint); }
  .proj2-title { font-family:var(--font-h); font-size:1.3rem; font-weight:700; color:#fff; letter-spacing:-.3px; margin-bottom:.75rem; transition: all 0.3s ease; }
  .project2-card:hover .proj2-title { color: var(--accent); text-shadow: 0 0 20px rgba(0,212,255,.3); }
  .proj2-desc { color:var(--faint); font-size:.9rem; line-height:1.8; flex:1; margin-bottom:1.5rem; }
  .proj2-tech { display:flex; flex-wrap:wrap; gap:.4rem; margin-bottom:1.5rem; }
  .tech2-pill {
    background:rgba(0,212,255,.08); color:var(--accent); border:1px solid rgba(0,212,255,.2);
    padding:.2rem .7rem; border-radius:3px; font-family:var(--font-m); font-size:.65rem; letter-spacing:.04em; transition: all 0.3s ease;
  }
  .tech2-pill:hover { background: rgba(0,212,255,.15); transform: translateY(-2px); box-shadow: 0 3px 10px rgba(0,212,255,.2); }
  .proj2-links { display:flex; gap:1rem; margin-top:auto; }
  .proj2-link {
    display:inline-flex; align-items:center; gap:.4rem;
    font-family:var(--font-m); font-size:.7rem; color:var(--muted);
    text-decoration:none; transition:all .3s ease;
    border-bottom:1px solid transparent; padding-bottom:2px;
    position: relative; cursor: pointer; z-index: 10;
  }
  .proj2-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--accent); transition: width 0.3s ease; }
  .proj2-link:hover { color:var(--accent); transform: translateY(-2px); }
  .proj2-link:hover::after { width: 100%; }

  /* CERTS */
  .certs2-list { margin-top:2.5rem; display:flex; flex-direction:column; gap:.75rem; }
  .cert2-item {
    background:var(--surface); border:1px solid var(--border); border-radius:6px;
    padding:1rem 1.5rem; display:flex; align-items:center; justify-content:space-between;
    transition:all .3s ease; position: relative; overflow: hidden;
  }
  .cert2-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: linear-gradient(90deg, var(--accent), transparent); opacity: 0.1; transition: width 0.3s ease; }
  .cert2-item:hover { border-color:var(--accent); transform:translateX(10px); box-shadow:0 10px 30px rgba(0,212,255,.1); }
  .cert2-item:hover::before { width: 100%; }
  .cert2-left { display:flex; align-items:center; gap:.7rem; }
  .cert2-icon { color:var(--accent); transition: all 0.3s ease; }
  .cert2-item:hover .cert2-icon { transform: scale(1.2) rotate(10deg); filter: drop-shadow(0 0 5px var(--accent)); }
  .cert2-title { font-size:.9rem; color:var(--text); font-weight:500; transition: color 0.3s ease; }
  .cert2-item:hover .cert2-title { color: var(--accent); }
  .cert2-issuer { font-family:var(--font-m); font-size:.65rem; color:var(--muted); margin-top:.12rem; }
  .cert2-year { font-family:var(--font-m); font-size:.65rem; color:var(--faint); }

  /* CONTACT */
  .contact2 { background:var(--surface); }
  .contact2-inner { max-width:680px; margin:0 auto; text-align:center; }
  .contact2-big { font-family:var(--font-h); font-size:clamp(2.2rem,5vw,3.5rem); font-weight:800; color:#fff; letter-spacing:-2px; line-height:1.1; margin:.5rem 0 1rem; }
  .contact2-big .hl { color: var(--accent); text-shadow: 0 0 30px rgba(0,212,255,.3); position: relative; display: inline-block; }
  .contact2-big .hl::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, var(--accent), transparent); border-radius: 2px; }
  .contact2-sub { color:var(--faint); font-size:1rem; line-height:1.7; margin-bottom:2.5rem; }
  .contact2-email {
    display:inline-flex; align-items:center; gap:.7rem;
    font-family:var(--font-m); font-size:.85rem; font-weight:700;
    background:var(--accent); color:var(--bg); text-decoration:none;
    padding:1rem 2.5rem; border-radius:4px; letter-spacing:.06em;
    transition:all .3s ease; margin-bottom:2.5rem;
    box-shadow:0 0 30px rgba(0,212,255,.3); position: relative; overflow: hidden;
  }
  .contact2-email::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent); transition: left 0.5s ease; }
  .contact2-email:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 0 50px rgba(0,212,255,.5); }
  .contact2-email:hover::before { left: 100%; }
  .contact2-socials { display:flex; justify-content:center; gap:1rem; }
  .social2-btn {
    display:flex; align-items:center; gap:.5rem;
    font-family:var(--font-m); font-size:.7rem; color:var(--muted);
    text-decoration:none; border:1px solid var(--border); padding:.6rem 1.2rem;
    border-radius:4px; transition:all .3s ease; letter-spacing:.05em; position: relative; overflow: hidden;
  }
  .social2-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0,212,255,.1), transparent); transition: left 0.5s ease; }
  .social2-btn:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-3px) scale(1.02); box-shadow:0 0 20px rgba(0,212,255,.2); }
  .social2-btn:hover::before { left: 100%; }

  .footer2 { padding:2rem; text-align:center; border-top:1px solid var(--border); font-family:var(--font-m); font-size:.65rem; color:var(--faint); letter-spacing:.08em; }
  .footer2 span { color:var(--accent); text-shadow: 0 0 10px rgba(0,212,255,.3); }

  @media(max-width:768px) {
    .section-title { font-size: clamp(2rem, 8vw, 3rem); }
    .projects2-grid { grid-template-columns: 1fr; }
    .skills2-grid { grid-template-columns: 1fr; }
  }
`;

function Navbar2({ scrolled, activeSection }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navItems = [
    { id: "about", label: "about", num: "01" },
    { id: "skills", label: "skills", num: "02" },
    { id: "projects", label: "projects", num: "03" },
    { id: "contact", label: "contact", num: "04" }
  ];

  return (
    <nav className={`nav2 ${scrolled ? "scrolled" : ""}`}>
      <div className="nav2-left">
        <div className="nav2-logo-box">
          <span className="nav2-logo-text">{DATA.initials}</span>
        </div>
        <span className="nav2-brand">{DATA.name.split(" ")[0]}</span>
      </div>

      <ul className="nav2-links">
        {navItems.map((item) => (
          <li key={item.id} className="nav2-link-item">
            <a
              href={`#${item.id}`}
              className={`nav2-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
            >
              <span className="nav2-link-num">{item.num}</span>
              {item.label}
              <span className="nav2-link-underline" />
            </a>
          </li>
        ))}
      </ul>

      <a className="nav2-cta" href={DATA.resumeUrl} target="_blank" rel="noreferrer">
        Resume
        <span className="nav2-cta-arrow">↗</span>
      </a>
    </nav>
  );
}

export default function Portfolio2() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["about", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const typed = useTypewriter(DATA.roles);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS2 }} />
      <div className="portfolio2">
        <Navbar2 scrolled={scrolled} activeSection={activeSection} />

        {/* HERO */}
        <section id="hero" className="hero2">
          <div className="hero2-dots" />
          <div className="hero2-glow" />
          <div className="hero2-glow2" />
          <div className="hero2-scanline" />

          <div className="hero2-container">
            <div className="hero2-content">
              <div className="hero2-label">
                <span className="hero2-label-dot" />
                AVAILABLE FOR FULL-TIME ROLES
              </div>
              <h1 className="hero2-name">
                Hi, I'm <span className="hl">{DATA.name.split(" ")[0]}</span><br/>{DATA.name.split(" ")[1]}
              </h1>
              <p className="hero2-role">&gt;&nbsp;{typed}<span className="cursor2" /></p>
              <p className="hero2-desc">{DATA.tagline}</p>
              <div className="hero2-btns">
                <a className="btn2-primary" href="#projects">View My Work</a>
                <a className="btn2-ghost" href={`mailto:${DATA.email}`}>Let's Connect</a>
              </div>
            </div>

            <div className="hero2-image-wrapper">
              <div className="hero2-image-border" />
              <div className="hero2-image-container">
                <img
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  className="hero2-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span style="font-family:var(--font-m);font-size:3rem;color:var(--accent);font-weight:700;">${DATA.initials}</span>`;
                  }}
                />
              </div>
              <div className="hero2-particles">
                <span className="particle" />
                <span className="particle" />
                <span className="particle" />
                <span className="particle" />
              </div>
            </div>
          </div>

          <div className="hero2-socials">
            <a className="hero2-social" href={DATA.github} target="_blank" rel="noreferrer"><GithubIcon /></a>
            <a className="hero2-social" href={DATA.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /></a>
            <a className="hero2-social" href={`mailto:${DATA.email}`}><MailIcon /></a>
          </div>

          <div className="hero2-scroll"><div className="hero2-scroll-line" /></div>
        </section>
        <div className="divider" />

        {/* ABOUT */}
        <section id="about" className="about2">
          <div className="container">
            <RevealSection>
              <div className="section-header">
                <span className="section-label">About Me</span>
                <h2 className="section-title">Who I <span className="hl">Am</span></h2>
              </div>
            </RevealSection>
            <div className="about2-grid">
              <RevealSection>
                <p className="about2-text"><strong>Full-Stack Developer (MERN)</strong> with B.Tech in Computer Science (DBATU, 2024 — GPA 8.0).</p>
                <p className="about2-text">{DATA.about}</p>
                <div className="meta2">
                  <div className="meta2-item"><MapIcon />{DATA.location}</div>
                  <div className="meta2-item"><MailIcon />{DATA.email}</div>
                </div>
              </RevealSection>
              <RevealSection delay={0.15}>
                <div className="stats2-grid">
                  {DATA.stats.map(s => (
                    <div className="stat2-card" key={s.label}>
                      <div className="stat2-num"><Counter target={s.value} suffix={s.suffix} /></div>
                      <div className="stat2-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>
            <div style={{ marginTop:"3.5rem" }}>
              <RevealSection>
                <div className="section-header" style={{ marginBottom: "2rem" }}>
                  <span className="section-label">Background</span>
                  <h3 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>Education</h3>
                </div>
              </RevealSection>
              <div className="edu2-list">
                {DATA.education.map((e,i) => (
                  <RevealSection key={i} delay={i*.1}>
                    <div className="edu2-card">
                      <span className="edu2-year">{e.year}</span>
                      <div>
                        <p className="edu2-degree">{e.degree}</p>
                        <p className="edu2-inst">{e.institution}</p>
                        <p className="edu2-inst" style={{fontSize:".76rem",opacity:.7}}>{e.university}</p>
                        <p className="edu2-score">{e.score}</p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="divider" />

        {/* SKILLS */}
        <section id="skills" className="skills2">
          <div className="container">
            <RevealSection>
              <div className="section-header">
                <span className="section-label">Skills</span>
                <h2 className="section-title">What I <span className="hl">Work With</span></h2>
              </div>
            </RevealSection>
            <div className="skills2-grid">
              {Object.entries(DATA.skills).map(([g,tags],gi) => (
                <RevealSection key={g} delay={gi*.1}>
                  <div className="skill2-group">
                    <p className="skill2-group-label">{g}</p>
                    <div className="skill2-tags">{tags.map(t=><span className="skill2-tag" key={t}>{t}</span>)}</div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
        <div className="divider" />

        {/* PROJECTS */}
        <section id="projects">
          <div className="container">
            <RevealSection>
              <div className="section-header">
                <span className="section-label">Projects</span>
                <h2 className="section-title">Things I've <span className="hl">Built</span></h2>
                <p style={{color:"var(--faint)",fontSize:"1rem",maxWidth:500,margin:"1.5rem auto 0",lineHeight:1.6}}>Real-world applications shipped to production.</p>
              </div>
            </RevealSection>
            <div className="projects2-grid">
              {DATA.projects.map((p,i) => (
                <RevealSection key={p.id} delay={i*.12}>
                  <div className="proj2-wrap">
                    <div className="project2-card">
                      <div className="proj2-header">
                        <span className="proj2-num">/{p.id}</span>
                        <span className="proj2-date">{p.date}</span>
                      </div>
                      <h3 className="proj2-title">{p.title}</h3>
                      <p className="proj2-desc">{p.description}</p>
                      <div className="proj2-tech">
                        {p.tech.map(t => <span className="tech2-pill" key={t}>{t}</span>)}
                      </div>
                      {/* ✅ FIXED: proper <a> tags for clickable links */}
                      <div className="proj2-links">
                        <a
                          className="proj2-link"
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GithubIcon />Code
                        </a>
                        <a
                          className="proj2-link"
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalIcon />Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
        <div className="divider" />

        {/* CERTS */}
        <section style={{paddingTop:0}}>
          <div className="container">
            <RevealSection>
              <div className="section-header">
                <span className="section-label">Achievements</span>
                <h2 className="section-title">Certs & <span className="hl">Wins</span></h2>
              </div>
            </RevealSection>
            <div className="certs2-list">
              {DATA.certifications.map((c,i) => (
                <RevealSection key={i} delay={i*.1}>
                  <div className="cert2-item">
                    <div className="cert2-left">
                      <span className="cert2-icon"><StarIcon /></span>
                      <div>
                        <p className="cert2-title">{c.title}</p>
                        <p className="cert2-issuer">{c.issuer}</p>
                      </div>
                    </div>
                    <span className="cert2-year">{c.year}</span>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
        <div className="divider" />

        {/* CONTACT */}
        <section id="contact" className="contact2">
          <div className="container">
            <RevealSection>
              <div className="contact2-inner">
                <div className="section-header" style={{marginBottom:"2rem"}}>
                  <span className="section-label">Get In Touch</span>
                  <h2 className="contact2-big">Let's Work<br/><span className="hl">Together</span></h2>
                </div>
                <p className="contact2-sub">I'm actively looking for full-time roles. Whether you have an opportunity or just want to say hi — my inbox is always open.</p>
                <a className="contact2-email" href={`mailto:${DATA.email}`}><MailIcon />{DATA.email}</a>
                <div className="contact2-socials">
                  <a className="social2-btn" href={DATA.github} target="_blank" rel="noreferrer"><GithubIcon />GitHub</a>
                  <a className="social2-btn" href={DATA.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon />LinkedIn</a>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>
        <footer className="footer2">Built with <span>♥</span> by <span>Mahetab Patel</span> — {new Date().getFullYear()}</footer>
      </div>
    </>
  );
}
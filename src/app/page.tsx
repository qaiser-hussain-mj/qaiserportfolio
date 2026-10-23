
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "github"
  | "mail"
  | "pin"
  | "code"
  | "spark"
  | "bot"
  | "globe"
  | "menu"
  | "close"
  | "sun"
  | "moon"
  | "check"
  | "external"
  | "terminal"
  | "brain"
  | "layers"
  | "coffee"
  | "send"
  | "chevron"
  | "linkedin"
  | "clock";

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };

  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    code: <><path d="m8 17-5-5 5-5" /><path d="m16 7 5 5-5 5" /><path d="m14 4-4 16" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    bot: <><rect x="4" y="7" width="16" height="13" rx="4" /><path d="M12 3v4M9 13h.01M15 13h.01M9 17h6M2 12v4M22 12v4" /><circle cx="12" cy="3" r="1" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <><path d="M20.98 13A9 9 0 0 1 11 3.02 9 9 0 1 0 20.98 13Z" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    external: <><path d="M15 3h6v6M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
    brain: <><path d="M12 18V5a3 3 0 0 0-5.8-1A4 4 0 0 0 4 11a4 4 0 0 0 2 7.5 3 3 0 0 0 6-.5" /><path d="M12 18V5a3 3 0 0 1 5.8-1A4 4 0 0 1 20 11a4 4 0 0 1-2 7.5 3 3 0 0 1-6-.5M8 8a2 2 0 0 0 0 4m8-4a2 2 0 0 1 0 4M9 16h.01M15 16h.01" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    coffee: <><path d="M10 2v2m4-2v2M4 7h15v8a5 5 0 0 1-5 5h-5a5 5 0 0 1-5-5V7Z" /><path d="M19 10h1a3 3 0 1 1 0 6h-2" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
    chevron: <><path d="m6 9 6 6 6-6" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

const skillGroups = [
  {
    title: "AI & Chatbots",
    subtitle: "Building smarter conversations",
    icon: "brain" as const,
    skills: [
      { name: "AI Fundamentals", level: 65 },
      { name: "Chatbot Development", level: 70 },
      { name: "Prompt Engineering", level: 75 },
      { name: "AI Tool Exploration", level: 70 },
    ],
  },
  {
    title: "Web Development",
    subtitle: "Bringing ideas to the browser",
    icon: "code" as const,
    skills: [
      { name: "HTML & CSS", level: 80 },
      { name: "JavaScript / TypeScript", level: 65 },
      { name: "React & Next.js", level: 60 },
      { name: "Tailwind CSS", level: 75 },
    ],
  },
  {
    title: "Tools & Workflow",
    subtitle: "Learning through practical work",
    icon: "terminal" as const,
    skills: [
      { name: "Git & GitHub", level: 65 },
      { name: "VS Code", level: 80 },
      { name: "API Integration", level: 60 },
      { name: "Problem Solving", level: 75 },
    ],
  },
];

const projects = [
  {
    number: "01",
    category: "AI / CUSTOMER EXPERIENCE",
    title: "SupportMate AI",
    description:
      "A customer-support chatbot concept that helps users find answers to common questions, explore FAQs, and navigate support information without unnecessary friction.",
    icon: "bot" as const,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accent: "#38bdf8",
    tags: ["AI", "Chatbot", "React", "API Concepts"],
    demo: "https://example.com",
    github: "https://github.com",
    visual: "support",
  },
  {
    number: "02",
    category: "AI / EDUCATION",
    title: "StudyBuddy",
    description:
      "An AI study-assistant concept for learners who want to break down difficult topics, organize revision notes, and explore a more interactive way to study.",
    icon: "brain" as const,
    gradient: "from-violet-500/20 via-blue-500/10 to-transparent",
    accent: "#a78bfa",
    tags: ["AI", "Education", "Prompt Design", "UX"],
    demo: "https://example.com",
    github: "https://github.com",
    visual: "study",
  },
  {
    number: "03",
    category: "WEB DEVELOPMENT",
    title: "DevSpace Portfolio",
    description:
      "A responsive developer portfolio exploring clean layouts, subtle motion, accessible components, and a cohesive visual identity for presenting work online.",
    icon: "layers" as const,
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    accent: "#2dd4bf",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demo: "https://example.com",
    github: "https://github.com",
    visual: "portfolio",
  },
];

const stats = [
  { value: 3, suffix: "+", label: "Project concepts", icon: "layers" as const },
  { value: 8, suffix: "+", label: "Technologies explored", icon: "code" as const },
  { value: 0, suffix: "", label: "Official certifications", icon: "check" as const },
  { value: 100, suffix: "%", label: "Curiosity to learn", icon: "coffee" as const },
];

const emailAddress = "qaiserhussain.foodtech18@gmail.com";

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useReveal(reducedMotion: boolean) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);
}

function useTypingEffect(reducedMotion: boolean) {
  const roles = ["AI Learner", "Chatbot Developer", "Problem Solver"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState(reducedMotion ? roles[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setText(roles[0]);
      return;
    }

    const current = roles[roleIndex];
    const isComplete = text === current;
    const isEmpty = text === "";

    const timeout = window.setTimeout(
      () => {
        if (!deleting && isComplete) {
          setDeleting(true);
        } else if (deleting && isEmpty) {
          setDeleting(false);
          setRoleIndex((index) => (index + 1) % roles.length);
        } else {
          setText(
            deleting
              ? current.slice(0, Math.max(0, text.length - 1))
              : current.slice(0, text.length + 1)
          );
        }
      },
      isComplete && !deleting ? 1400 : deleting && isEmpty ? 250 : deleting ? 42 : 85
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, roleIndex, reducedMotion]);

  return text;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Counter({
  value,
  suffix,
  reducedMotion,
}: {
  value: number;
  suffix: string;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(reducedMotion ? value : 0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setCount(value);
      return;
    }

    const element = ref.current;
    if (!element || started) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);

        const start = performance.now();
        const duration = 1300;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setCount(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, started, reducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Page() {
  const reducedMotion = useReducedMotionPreference();
  useReveal(reducedMotion);

  const typingText = useTypingEffect(reducedMotion);
  const progress = useScrollProgress();
  const activeSection = useActiveSection();

  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 450);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  function validateForm() {
    const next = { name: "", email: "", message: "" };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) next.name = "Please enter your name.";
    else if (form.name.trim().length < 2)
      next.name = "Your name must be at least 2 characters.";

    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!emailPattern.test(form.email.trim()))
      next.email = "Please enter a valid email address.";

    if (!form.message.trim()) next.message = "Please write a message.";
    else if (form.message.trim().length < 10)
      next.message = "Your message must be at least 10 characters.";

    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);

    if (!validateForm()) return;

    const subject = encodeURIComponent(
      `Portfolio inquiry from ${form.name.trim()}`
    );
    const body = encodeURIComponent(
      `Hello Qaiser,\n\n${form.message.trim()}\n\nBest regards,\n${form.name.trim()}\n${form.email.trim()}`
    );

    setSuccess(true);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  }

  const theme = darkMode
    ? {
        page: "bg-[#081120] text-slate-100",
        nav: "border-white/[0.08] bg-[#081120]/80",
        surface: "border-white/[0.08] bg-white/[0.035]",
        card: "border-white/[0.09] bg-[#0d192b]",
        muted: "text-slate-400",
        subtle: "text-slate-500",
        heading: "text-white",
        input:
          "border-white/10 bg-[#081120] text-white placeholder:text-slate-600 focus:border-blue-400",
        footer: "border-white/[0.08] bg-[#060c17]",
      }
    : {
        page: "bg-[#f4f7fc] text-slate-800",
        nav: "border-slate-200/80 bg-white/85",
        surface: "border-slate-200 bg-white/70",
        card: "border-slate-200 bg-white",
        muted: "text-slate-600",
        subtle: "text-slate-500",
        heading: "text-slate-900",
        input:
          "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500",
        footer: "border-slate-200 bg-white",
      };

  return (
    <main
      className={`min-h-screen overflow-x-clip transition-colors duration-300 ${theme.page}`}
    >
      <style>{`
        :root {
          color-scheme: ${darkMode ? "dark" : "light"};
          scroll-behavior: ${reducedMotion ? "auto" : "smooth"};
          scroll-padding-top: 88px;
        }

        * { box-sizing: border-box; }

        ::selection {
          background: rgba(59, 130, 246, 0.35);
          color: ${darkMode ? "#ffffff" : "#0f172a"};
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track {
          background: ${darkMode ? "#081120" : "#e9eef6"};
        }
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 99px;
          border: 2px solid ${darkMode ? "#081120" : "#e9eef6"};
        }

        .grid-bg {
          background-image:
            linear-gradient(${darkMode ? "rgba(148,163,184,.045)" : "rgba(71,85,105,.055)"} 1px, transparent 1px),
            linear-gradient(90deg, ${darkMode ? "rgba(148,163,184,.045)" : "rgba(71,85,105,.055)"} 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: linear-gradient(to bottom, black 0%, transparent 95%);
        }

        .gradient-text {
          background: linear-gradient(115deg, #60a5fa 0%, #38bdf8 48%, #818cf8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .section-kicker::before {
          content: "";
          display: inline-block;
          width: 24px;
          height: 2px;
          margin-right: 10px;
          vertical-align: middle;
          background: #3b82f6;
        }

        .reveal {
          opacity: ${reducedMotion ? "1" : "0"};
          transform: ${reducedMotion ? "none" : "translateY(24px)"};
          transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-1 { transition-delay: 90ms; }
        .delay-2 { transition-delay: 180ms; }
        .delay-3 { transition-delay: 270ms; }

        .glow-blob {
          animation: blob-float 9s ease-in-out infinite;
        }

        .float-card {
          animation: float-card 6s ease-in-out infinite;
        }

        .typing-caret {
          display: inline-block;
          width: 2px;
          height: .95em;
          margin-left: 4px;
          vertical-align: -0.08em;
          background: #38bdf8;
          animation: caret-blink 1s steps(2, start) infinite;
        }

        .project-card {
          transform-style: preserve-3d;
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }

        .project-card:hover {
          transform: translateY(-7px);
          border-color: rgba(96,165,250,.45);
          box-shadow: 0 24px 65px -32px rgba(37,99,235,.36);
        }

        .skill-pill {
          transition: transform .25s ease, border-color .25s ease, background .25s ease;
        }
        .skill-pill:hover {
          transform: translateY(-3px);
          border-color: rgba(96,165,250,.55);
          background: rgba(59,130,246,.1);
        }

        .skill-track {
          overflow: hidden;
          height: 5px;
          border-radius: 99px;
          background: ${darkMode ? "rgba(148,163,184,.14)" : "rgba(100,116,139,.16)"};
        }
        .skill-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #38bdf8);
          transform-origin: left;
          transition: width 1.2s cubic-bezier(.2,.7,.2,1);
        }

        .field-error { color: #f87171; }
        .focus-ring:focus-visible {
          outline: 2px solid #60a5fa;
          outline-offset: 4px;
        }

        @keyframes blob-float {
          0%, 100% { transform: translate(0,0) scale(1); }
          35% { transform: translate(22px,-18px) scale(1.05); }
          70% { transform: translate(-12px,14px) scale(.96); }
        }
        @keyframes float-card {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-9px) rotate(.4deg); }
        }
        @keyframes caret-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes scroll-down {
          0%, 100% { transform: translateY(0); opacity: .6; }
          50% { transform: translateY(5px); opacity: 1; }
        }

        .scroll-down {
          animation: scroll-down 1.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
          .reveal { opacity: 1; transform: none; }
          .project-card:hover, .skill-pill:hover { transform: none; }
        }
      `}</style>

      {/* Scroll progress */}
      <div
        className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-400 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${theme.nav}`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={closeMenu}
            className="focus-ring group flex shrink-0 items-center gap-3 rounded-xl"
            aria-label="KH home"
          >
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-black tracking-tight text-white shadow-lg shadow-blue-500/20">
              KH
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-white/20 blur-sm" />
            </span>
            <span className={`text-base font-bold tracking-tight ${theme.heading}`}>
              Qaiser<span className="text-blue-500">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "location" : undefined}
                  className={`focus-ring relative rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "text-blue-500"
                      : `${theme.muted} hover:text-blue-500`
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] origin-left rounded-full bg-blue-500 transition-transform ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setDarkMode((mode) => !mode)}
              aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
              title={darkMode ? "Light mode" : "Dark mode"}
              className={`focus-ring flex h-10 w-10 items-center justify-center rounded-xl border transition hover:border-blue-400/50 hover:text-blue-500 ${
                darkMode
                  ? "border-white/10 text-slate-300"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              <Icon name={darkMode ? "sun" : "moon"} size={18} />
            </button>

            <a
              href="#contact"
              className="focus-ring hidden items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 sm:inline-flex"
            >
              Let&apos;s talk <Icon name="arrow" size={15} />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className={`focus-ring flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden ${
                darkMode
                  ? "border-white/10 text-slate-200"
                  : "border-slate-200 text-slate-700"
              }`}
            >
              <Icon name={menuOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </nav>

        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="mx-auto max-w-7xl border-t border-current/10 px-5 py-3 sm:px-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
                aria-current={
                  activeSection === item.href.slice(1) ? "location" : undefined
                }
                className={`focus-ring flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-blue-500/10 hover:text-blue-500 ${
                  activeSection === item.href.slice(1)
                    ? "text-blue-500"
                    : theme.muted
                }`}
              >
                {item.label}
                <Icon name="arrow" size={15} />
              </a>
            ))}
            <a
              href="#contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white sm:hidden"
            >
              Let&apos;s talk <Icon name="arrow" size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative isolate scroll-mt-20 overflow-hidden"
      >
        <div className="grid-bg pointer-events-none absolute inset-0 -z-20" />
        <div className="pointer-events-none absolute -right-40 -top-24 -z-10 h-[470px] w-[470px] rounded-full bg-blue-600/[0.13] blur-[120px] glow-blob" />
        <div className="pointer-events-none absolute -left-40 top-[340px] -z-10 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.08] blur-[110px] glow-blob" />

        <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_.92fr] lg:gap-10 lg:px-12 lg:py-20">
          <div className="relative z-10">
            <div className="mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-blue-400/20 bg-blue-500/[0.07] px-3.5 py-2 sm:px-4">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="truncate text-xs font-medium tracking-wide text-blue-400 sm:text-sm">
                BS Student · University of Sargodha, Pakistan
              </span>
            </div>

            <p className={`mb-3 text-sm font-medium ${theme.muted}`}>
              Hello there, I&apos;m
            </p>

            <h1 className="text-[clamp(3.4rem,9vw,6.6rem)] font-black leading-[.98] tracking-[-.065em]">
              <span className={theme.heading}>Qaiser</span>
              <br />
              <span className="gradient-text">Hussain.</span>
            </h1>

            <div className="mt-7 flex min-h-9 flex-wrap items-center gap-2 text-lg font-semibold sm:text-2xl">
              <span className={theme.muted}>An aspiring</span>
              <span className="text-blue-400">
                {typingText}
                <span className="typing-caret" aria-hidden="true" />
              </span>
            </div>

            <p className={`mt-6 max-w-xl text-base leading-8 sm:text-[17px] ${theme.muted}`}>
              Exploring the world of AI and chatbot development, one idea at a
              time. I&apos;m learning to turn curiosity into useful digital
              experiences through code, creativity, and continuous improvement.
            </p>

            <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
              <a
                href="#projects"
                className="focus-ring inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:bg-blue-500"
              >
                View Projects <Icon name="arrow" size={17} />
              </a>
              <a
                href="#contact"
                className={`focus-ring inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl border px-6 py-3.5 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-500 ${
                  darkMode
                    ? "border-white/15 text-slate-200"
                    : "border-slate-300 text-slate-700"
                }`}
              >
                Contact Me <Icon name="mail" size={17} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={`mailto:${emailAddress}`}
                className={`focus-ring inline-flex items-center gap-2 rounded-lg text-xs transition hover:text-blue-400 sm:text-sm ${theme.muted}`}
              >
                <Icon name="mail" size={16} />
                Email me
              </a>
              <span className="h-4 w-px bg-current/20" />
              <span className={`inline-flex items-center gap-2 text-xs sm:text-sm ${theme.muted}`}>
                <Icon name="pin" size={16} className="text-blue-400" />
                Sargodha, Pakistan
              </span>
            </div>
          </div>

          {/* Decorative developer workspace */}
          <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-blue-500/15 via-cyan-400/[0.06] to-violet-500/10 blur-2xl" />

            <div className={`float-card relative overflow-hidden rounded-[1.75rem] border shadow-2xl ${
              darkMode
                ? "border-white/10 bg-[#0b1729]/95 shadow-black/30"
                : "border-slate-200 bg-white/95 shadow-slate-300/40"
            }`}>
              <div className={`flex items-center justify-between border-b px-5 py-4 ${
                darkMode ? "border-white/[0.08]" : "border-slate-200"
              }`}>
                <div className="flex items-center gap-2" aria-label="Code editor window">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className={`font-mono text-[11px] ${theme.subtle}`}>
                  qaiser.tsx
                </span>
                <Icon name="code" size={17} className="text-blue-400" />
              </div>

              <div className="overflow-x-auto p-5 font-mono text-[11px] leading-[2.2] sm:p-7 sm:text-[13px]">
                <div className="whitespace-nowrap">
                  <span className="mr-4 select-none text-slate-600">01</span>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-sky-400">developer</span>{" "}
                  <span className={theme.muted}>= {"{"}</span>
                </div>
                <div className="whitespace-nowrap pl-8">
                  <span className="text-cyan-400">name</span>
                  <span className={theme.muted}>: </span>
                  <span className="text-emerald-400">&quot;Qaiser Hussain&quot;</span>,
                </div>
                <div className="whitespace-nowrap pl-8">
                  <span className="text-cyan-400">role</span>
                  <span className={theme.muted}>: </span>
                  <span className="text-emerald-400">&quot;AI Learner&quot;</span>,
                </div>
                <div className="whitespace-nowrap pl-8">
                  <span className="text-cyan-400">basedIn</span>
                  <span className={theme.muted}>: </span>
                  <span className="text-emerald-400">&quot;Pakistan&quot;</span>,
                </div>
                <div className="whitespace-nowrap pl-8">
                  <span className="text-cyan-400">interests</span>
                  <span className={theme.muted}>: [</span>
                </div>
                <div className="whitespace-nowrap pl-14 text-emerald-400">
                  &quot;Artificial Intelligence&quot;,
                </div>
                <div className="whitespace-nowrap pl-14 text-emerald-400">
                  &quot;Conversational AI&quot;,
                </div>
                <div className="whitespace-nowrap pl-14 text-emerald-400">
                  &quot;Web Development&quot;
                </div>
                <div className="whitespace-nowrap pl-8">
                  <span className={theme.muted}>],</span>
                </div>
                <div className="whitespace-nowrap pl-8">
                  <span className="text-cyan-400">mindset</span>
                  <span className={theme.muted}>: </span>
                  <span className="text-emerald-400">&quot;Keep building&quot;</span>
                </div>
                <div className={theme.muted}>{"};"}</div>

                <div className="mt-5 whitespace-nowrap">
                  <span className="mr-4 select-none text-slate-600">02</span>
                  <span className="text-violet-400">function</span>{" "}
                  <span className="text-amber-400">buildFuture</span>
                  <span className={theme.muted}>() {"{"}</span>
                </div>
                <div className="whitespace-nowrap pl-8">
                  <span className="text-violet-400">return</span>{" "}
                  <span className="text-sky-400">learn</span>()
                  <span className={theme.muted}> + </span>
                  <span className="text-sky-400">build</span>()
                  <span className={theme.muted}> + </span>
                  <span className="text-sky-400">repeat</span>();
                </div>
                <div className={theme.muted}>{"}"}</div>
              </div>

              <div className={`border-t px-5 py-5 sm:px-7 ${
                darkMode
                  ? "border-white/[0.08] bg-gradient-to-r from-blue-500/[0.09] to-cyan-500/[0.04]"
                  : "border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50"
              }`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={`text-[11px] ${theme.subtle}`}>
                      CURRENTLY WORKING ON
                    </p>
                    <p className={`mt-1.5 text-sm font-bold ${theme.heading}`}>
                      Making technology more human.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                    <Icon name="spark" size={23} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`absolute -right-2 top-16 hidden items-center gap-3 rounded-2xl border p-3.5 shadow-xl sm:flex ${
              darkMode
                ? "border-white/10 bg-[#122139]"
                : "border-slate-200 bg-white"
            }`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <Icon name="brain" size={21} />
              </span>
              <div>
                <p className={`text-[10px] ${theme.subtle}`}>EXPLORING</p>
                <p className={`mt-0.5 text-xs font-bold ${theme.heading}`}>
                  AI possibilities
                </p>
              </div>
            </div>

            <div className={`absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl sm:flex ${
              darkMode
                ? "border-white/10 bg-[#122139]"
                : "border-slate-200 bg-white"
            }`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Icon name="check" size={19} />
              </span>
              <div>
                <p className={`text-[10px] ${theme.subtle}`}>DAILY APPROACH</p>
                <p className={`mt-0.5 text-xs font-bold ${theme.heading}`}>
                  Learn by building
                </p>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          aria-label="Scroll down to about section"
          className={`focus-ring mx-auto mb-8 flex w-fit flex-col items-center gap-2 rounded-xl px-4 py-2 text-xs ${theme.subtle} transition hover:text-blue-400`}
        >
          Scroll to explore
          <span className="scroll-down">
            <Icon name="chevron" size={19} />
          </span>
        </a>
      </section>

      {/* About */}
      <section
        id="about"
        className={`scroll-mt-20 border-t ${darkMode ? "border-white/[0.06]" : "border-slate-200"}`}
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
            <div className="reveal">
              <p className="section-kicker text-xs font-bold uppercase tracking-[.2em] text-blue-500">
                Get to know me
              </p>
              <h2 className={`mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl ${theme.heading}`}>
                Curious mind.
                <br />
                <span className="gradient-text">Builder&apos;s mindset.</span>
              </h2>

              <div className={`mt-7 flex items-center gap-4 rounded-2xl border p-4 ${theme.surface}`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon name="globe" size={23} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${theme.heading}`}>
                    University of Sargodha
                  </p>
                  <p className={`mt-1 text-xs ${theme.muted}`}>
                    BS Student · Sargodha, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal delay-1">
              <p className={`text-base leading-8 sm:text-[17px] ${theme.muted}`}>
                I&apos;m Qaiser Hussain, a BS student at the University of
                Sargodha, Pakistan, building my foundation in artificial
                intelligence and chatbot development. I&apos;m fascinated by
                how technology can make information easier to access and
                everyday tasks simpler.
              </p>
              <p className={`mt-5 text-base leading-8 sm:text-[17px] ${theme.muted}`}>
                My current journey combines exploring conversational AI,
                experimenting with modern web tools, and building small
                projects that turn concepts into something tangible. I&apos;m
                not claiming to know everything yet — I&apos;m focused on
                learning consistently, improving my code, and understanding
                how to build solutions people actually find useful.
              </p>
              <p className={`mt-5 text-base leading-8 sm:text-[17px] ${theme.muted}`}>
                I welcome thoughtful collaboration, beginner-friendly
                opportunities, and conversations with people who enjoy
                exploring what&apos;s possible with technology.
              </p>

              <a
                href="#contact"
                className="focus-ring mt-7 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-blue-500 transition hover:gap-3 hover:text-sky-400"
              >
                Let&apos;s connect <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`reveal rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 sm:p-6 ${
                  index === 1 ? "delay-1" : index === 2 ? "delay-2" : index === 3 ? "delay-3" : ""
                } ${theme.surface}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Icon name={stat.icon} size={20} />
                </div>
                <p className={`mt-5 text-3xl font-black tracking-tight sm:text-4xl ${theme.heading}`}>
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    reducedMotion={reducedMotion}
                  />
                </p>
                <p className={`mt-2 text-xs leading-5 sm:text-sm ${theme.muted}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className={`mt-4 text-xs ${theme.subtle}`}>
            Personal learning milestones; certification count reflects official
            certifications only. Project concepts are not necessarily completed
            or deployed applications.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className={`scroll-mt-20 border-y ${darkMode ? "border-white/[0.06] bg-[#0a1628]" : "border-slate-200 bg-slate-100/80"}`}
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="section-kicker inline-block text-xs font-bold uppercase tracking-[.2em] text-blue-500">
              Skills &amp; technologies
            </p>
            <h2 className={`mt-5 text-3xl font-black tracking-tight sm:text-5xl ${theme.heading}`}>
              My learning toolkit<span className="text-blue-500">.</span>
            </h2>
            <p className={`mt-5 text-base leading-7 ${theme.muted}`}>
              A growing collection of technologies and skills I&apos;m
              exploring through practice, experimentation, and project work.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <article
                key={group.title}
                className={`reveal rounded-2xl border p-5 shadow-lg shadow-black/[0.025] transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 sm:p-6 ${
                  index === 1 ? "delay-1" : index === 2 ? "delay-2" : ""
                } ${theme.card}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-blue-400">
                    <Icon name={group.icon} size={23} />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold ${theme.heading}`}>
                      {group.title}
                    </h3>
                    <p className={`mt-1 text-xs ${theme.subtle}`}>
                      {group.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className={`text-xs font-medium sm:text-sm ${theme.muted}`}>
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-semibold tabular-nums text-blue-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="skill-track"
                        role="progressbar"
                        aria-label={`${skill.name} self-assessed learning level`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={skill.level}
                      >
                        <div
                          className="skill-fill"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {["Python basics", "GitHub", "REST APIs", "Responsive UI", "Continuous learning"].map((skill) => (
              <span
                key={skill}
                className={`skill-pill rounded-xl border px-3.5 py-2 text-xs font-medium sm:text-sm ${theme.surface} ${theme.muted}`}
              >
                {skill}
              </span>
            ))}
          </div>
          <p className={`mt-5 text-center text-xs ${theme.subtle}`}>
            Progress levels are illustrative self-assessments, not formal
            proficiency tests or certifications.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker text-xs font-bold uppercase tracking-[.2em] text-blue-500">
                Selected explorations
              </p>
              <h2 className={`mt-5 text-3xl font-black tracking-tight sm:text-5xl ${theme.heading}`}>
                Ideas worth building<span className="gradient-text">.</span>
              </h2>
              <p className={`mt-5 max-w-2xl text-base leading-7 ${theme.muted}`}>
                A look at the kinds of problems I&apos;m interested in solving
                with AI, chatbots, and thoughtful web development.
              </p>
            </div>
            <div className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium ${theme.surface} ${theme.muted}`}>
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Learning through projects
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.number}
                className={`project-card reveal group flex min-w-0 flex-col overflow-hidden rounded-3xl border shadow-lg shadow-black/[0.035] ${
                  index === 1 ? "delay-1" : index === 2 ? "delay-2" : ""
                } ${theme.card}`}
              >
                <div
                  className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 45%, ${project.accent}25 0, transparent 58%)`,
                    }}
                  />
                  <div className="absolute inset-0 grid-bg opacity-60" />

                  {project.visual === "support" && (
                    <div className={`relative w-[72%] max-w-[260px] rounded-2xl border p-3 shadow-2xl ${
                      darkMode
                        ? "border-white/10 bg-[#0b1729]/95"
                        : "border-white/80 bg-white/95"
                    }`}>
                      <div className="flex items-center gap-2 border-b border-current/10 pb-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                          <Icon name="bot" size={17} />
                        </span>
                        <div className="flex-1">
                          <p className={`text-[10px] font-bold ${theme.heading}`}>SupportMate</p>
                          <p className="text-[9px] text-emerald-400">Assistant concept</p>
                        </div>
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="w-[88%] rounded-lg rounded-tl-none bg-blue-500/10 px-3 py-2 text-[9px] text-blue-400">
                          Hi! How can I help you today?
                        </div>
                        <div className={`ml-auto w-[70%] rounded-lg rounded-tr-none px-3 py-2 text-[9px] ${darkMode ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-600"}`}>
                          I have a question...
                        </div>
                        <div className="w-[78%] rounded-lg rounded-tl-none bg-cyan-500/10 px-3 py-2 text-[9px] text-cyan-500">
                          Let&apos;s find the right answer.
                        </div>
                      </div>
                    </div>
                  )}

                  {project.visual === "study" && (
                    <div className={`relative w-[76%] max-w-[270px] rounded-2xl border p-4 shadow-2xl ${
                      darkMode
                        ? "border-white/10 bg-[#0b1729]/95"
                        : "border-white/80 bg-white/95"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                            <Icon name="brain" size={17} />
                          </span>
                          <div>
                            <p className={`text-[10px] font-bold ${theme.heading}`}>StudyBuddy</p>
                            <p className={`text-[9px] ${theme.subtle}`}>Your study space</p>
                          </div>
                        </div>
                        <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[9px] text-violet-400">AI</span>
                      </div>
                      <div className="mt-4 rounded-lg border border-current/10 p-3">
                        <p className={`text-[9px] font-semibold ${theme.heading}`}>Today&apos;s learning goals</p>
                        <div className="mt-3 space-y-2.5">
                          {[75, 48, 90].map((width, i) => (
                            <div key={i} className="h-1.5 overflow-hidden rounded-full bg-current/10">
                              <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-400" style={{ width: `${width}%` }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {project.visual === "portfolio" && (
                    <div className={`relative w-[75%] max-w-[260px] rounded-2xl border p-4 shadow-2xl ${
                      darkMode
                        ? "border-white/10 bg-[#0b1729]/95"
                        : "border-white/80 bg-white/95"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-black text-white">QH</div>
                        <div className="flex-1">
                          <div className={`h-2 w-20 rounded-full ${darkMode ? "bg-white/60" : "bg-slate-400"}`} />
                          <div className="mt-2 h-1.5 w-14 rounded-full bg-current/20" />
                        </div>
                      </div>
                      <div className="mt-4 rounded-lg bg-gradient-to-r from-cyan-500/15 to-blue-500/15 p-3">
                        <div className="h-2 w-[75%] rounded-full bg-blue-400/70" />
                        <div className="mt-2 h-1.5 w-full rounded-full bg-current/10" />
                        <div className="mt-1.5 h-1.5 w-[82%] rounded-full bg-current/10" />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <div className="h-7 flex-1 rounded-lg bg-cyan-500/15" />
                        <div className="h-7 flex-1 rounded-lg bg-blue-500/15" />
                        <div className="h-7 flex-1 rounded-lg bg-teal-500/15" />
                      </div>
                    </div>
                  )}

                  <span className={`absolute right-4 top-4 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] ${theme.surface} ${theme.muted}`}>
                    {project.number} / 03
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[10px] font-bold tracking-[.13em] text-blue-500">
                    {project.category}
                  </p>
                  <h3 className={`mt-3 text-xl font-bold tracking-tight transition-colors group-hover:text-blue-500 ${theme.heading}`}>
                    {project.title}
                  </h3>
                  <p className={`mt-3 flex-1 text-sm leading-7 ${theme.muted}`}>
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-medium sm:text-[11px] ${
                          darkMode
                            ? "border-white/[0.08] bg-white/[0.025] text-slate-400"
                            : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={`mt-6 grid grid-cols-2 gap-3 border-t pt-5 ${
                    darkMode ? "border-white/[0.08]" : "border-slate-200"
                  }`}>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open sample live demo for ${project.title}`}
                      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-semibold transition hover:border-blue-400 hover:text-blue-500 ${
                        darkMode
                          ? "border-white/10 text-slate-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      Live Demo <Icon name="external" size={14} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open GitHub placeholder for ${project.title}`}
                      className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs font-semibold text-white transition hover:bg-blue-500"
                    >
                      <Icon name="github" size={15} /> GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className={`reveal mt-8 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${theme.surface}`}>
            <div className="flex items-start gap-3">
              <Icon name="spark" size={21} className="mt-0.5 shrink-0 text-blue-500" />
              <div>
                <p className={`text-sm font-bold ${theme.heading}`}>
                  Good ideas start with a first version.
                </p>
                <p className={`mt-1 text-xs leading-6 sm:text-sm ${theme.muted}`}>
                  These are sample portfolio concepts. Replace the placeholder
                  links with real deployed projects and repositories before
                  sharing this portfolio with clients.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="focus-ring inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-blue-500/30 px-4 py-3 text-xs font-semibold text-blue-500 transition hover:bg-blue-500/10 sm:self-center"
            >
              Discuss an idea <Icon name="arrow" size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className={`relative scroll-mt-20 overflow-hidden border-t ${
          darkMode ? "border-white/[0.06] bg-[#0a1628]" : "border-slate-200 bg-slate-100/80"
        }`}
      >
        <div className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-blue-600/[0.09] blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="section-kicker inline-block text-xs font-bold uppercase tracking-[.2em] text-blue-500">
              Get in touch
            </p>
            <h2 className={`mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl ${theme.heading}`}>
              Have an idea?
              <br />
              <span className="gradient-text">Let&apos;s talk about it.</span>
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-base leading-7 ${theme.muted}`}>
              Whether it&apos;s a chatbot concept, a collaboration, or a chance
              to learn something new, I&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
            <div className="reveal space-y-4">
              <a
                href={`mailto:${emailAddress}`}
                className={`group flex items-center gap-4 rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 ${theme.card}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
                  <Icon name="mail" size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-xs ${theme.subtle}`}>Email me</span>
                  <span className={`mt-1 block break-all text-sm font-semibold ${theme.heading}`}>
                    {emailAddress}
                  </span>
                </span>
                <Icon name="arrow" size={17} className={`shrink-0 transition group-hover:text-blue-500 ${theme.subtle}`} />
              </a>

              <div className={`flex items-center gap-4 rounded-2xl border p-5 ${theme.card}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Icon name="pin" size={22} />
                </span>
                <div>
                  <p className={`text-xs ${theme.subtle}`}>Based in</p>
                  <p className={`mt-1 text-sm font-semibold ${theme.heading}`}>
                    Sargodha, Punjab, Pakistan
                  </p>
                  <p className={`mt-1 text-xs ${theme.muted}`}>
                    Open to online collaboration
                  </p>
                </div>
              </div>

              <div className={`rounded-2xl border p-5 sm:p-6 ${theme.card}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Icon name="clock" size={20} />
                  </span>
                  <h3 className={`text-sm font-bold ${theme.heading}`}>
                    What I&apos;m open to
                  </h3>
                </div>
                <ul className={`mt-5 space-y-3 text-sm ${theme.muted}`}>
                  {[
                    "AI and chatbot project collaborations",
                    "Learning opportunities and mentorship",
                    "Ideas for practical web applications",
                    "Connecting with fellow developers",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit}
              className={`reveal delay-1 rounded-3xl border p-5 shadow-2xl shadow-black/[0.04] sm:p-8 ${theme.card}`}
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <h3 className={`text-xl font-bold ${theme.heading}`}>
                    Send a message
                  </h3>
                  <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>
                    Tell me a little about what&apos;s on your mind.
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Icon name="send" size={20} />
                </span>
              </div>

              {success && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 flex gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08] p-4 text-sm text-emerald-500"
                >
                  <Icon name="check" size={19} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Your message is prepared.</p>
                    <p className="mt-1 leading-6">
                      Your default email app should open with the details
                      filled in. Send the email there to complete delivery.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className={`mb-2 block text-sm font-semibold ${theme.heading}`}
                  >
                    Your name <span className="text-blue-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={form.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    onChange={(event) => {
                      setForm({ ...form, name: event.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                      setSuccess(false);
                    }}
                    placeholder="e.g. Ahmed Khan"
                    className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/15 ${theme.input} ${
                      errors.name ? "border-red-400 focus:border-red-400" : ""
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="field-error mt-2 text-xs" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className={`mb-2 block text-sm font-semibold ${theme.heading}`}
                  >
                    Email address <span className="text-blue-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    onChange={(event) => {
                      setForm({ ...form, email: event.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                      setSuccess(false);
                    }}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/15 ${theme.input} ${
                      errors.email ? "border-red-400 focus:border-red-400" : ""
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="field-error mt-2 text-xs" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className={`mb-2 block text-sm font-semibold ${theme.heading}`}
                  >
                    Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    maxLength={3000}
                    value={form.message}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    onChange={(event) => {
                      setForm({ ...form, message: event.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                      setSuccess(false);
                    }}
                    placeholder="Share your idea, question, or collaboration opportunity..."
                    className={`w-full resize-y rounded-xl border px-4 py-3.5 text-sm leading-6 outline-none transition focus:ring-2 focus:ring-blue-500/15 ${theme.input} ${
                      errors.message ? "border-red-400 focus:border-red-400" : ""
                    }`}
                  />
                  <div className="mt-2 flex items-start justify-between gap-3">
                    {errors.message ? (
                      <p id="message-error" className="field-error text-xs" role="alert">
                        {errors.message}
                      </p>
                    ) : (
                      <p className={`text-xs ${theme.subtle}`}>
                        At least 10 characters
                      </p>
                    )}
                    <span className={`shrink-0 text-[10px] tabular-nums ${theme.subtle}`}>
                      {form.message.length}/3000
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="focus-ring flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Send Message <Icon name="send" size={17} />
                </button>

                <p className={`text-center text-xs leading-5 ${theme.subtle}`}>
                  Your email app handles delivery. No message is sent to a
                  server by this portfolio.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${theme.footer}`}>
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <a href="#home" className="focus-ring flex w-fit items-center gap-3 rounded-xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-black text-white">
                KH
              </span>
              <span>
                <span className={`block text-sm font-bold ${theme.heading}`}>
                  Qaiser Hussain<span className="text-blue-500">.</span>
                </span>
                <span className={`mt-1 block text-[11px] ${theme.subtle}`}>
                  Learning. Building. Growing.
                </span>
              </span>
            </a>

            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`focus-ring rounded text-xs font-medium transition hover:text-blue-500 sm:text-sm ${theme.muted}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={`mailto:${emailAddress}`}
              className={`focus-ring inline-flex w-fit items-center gap-2 rounded-lg text-xs transition hover:text-blue-500 sm:text-sm ${theme.muted}`}
            >
              <Icon name="mail" size={16} />
              Email me
            </a>
          </div>

          <div className={`mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${
            darkMode ? "border-white/[0.08]" : "border-slate-200"
          }`}>
            <p className={`text-xs leading-6 ${theme.subtle}`}>
              © {new Date().getFullYear()} Qaiser Hussain. Made with curiosity
              and a little bit of code.
            </p>

            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <span className={`text-xs ${theme.subtle}`}>
                Sargodha, Pakistan
              </span>
              <a
                href="#home"
                className={`focus-ring inline-flex items-center gap-2 rounded-lg text-xs font-semibold transition hover:text-blue-500 ${theme.muted}`}
              >
                Back to top <Icon name="arrow" size={15} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating back-to-top */}
      <a
        href="#home"
        aria-label="Back to top"
        tabIndex={scrolled ? 0 : -1}
        className={`focus-ring fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600 text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 sm:bottom-7 sm:right-7 ${
          scrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m18 15-6-6-6 6" />
          <path d="M12 9v12" />
        </svg>
      </a>
    </main>
  );
}

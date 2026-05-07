import React, { useState, useEffect } from 'react';
import {
  Linkedin,
  Mail,
  MapPin,
  Award,
  Phone,
  Github,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';
import {
  FaJava,
  FaPython,
  FaPhp,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaDatabase,
  FaDocker,
  FaLinux,
  FaCodeBranch,
  FaJs,
  FaProjectDiagram
} from 'react-icons/fa';

import {
  SiCplusplus,
  SiTypescript,
  SiExpo,
  SiFastapi,
  SiDjango,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiVite,
  SiGo,
  SiNodedotjs,
  SiNpm,
  SiRedis,
  SiPostman,
  SiEslint,
  SiStylelint,
  SiPytest,
  SiReactrouter,
  SiAxios,
  SiSqlalchemy
} from 'react-icons/si';

import './App.css';

// Add custom animations for side-drawer
const modalStyles = `
  @keyframes slideInRight {
    0% { 
      transform: translateX(100%);
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% { 
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    0% { 
      transform: translateX(0);
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% { 
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from { 
      opacity: 0;
    }
    to { 
      opacity: 1;
    }
  }

  @keyframes slideInFromBottom {
    0% { 
      transform: translateY(20px);
      opacity: 0;
    }
    100% { 
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    0% { 
      transform: scale(0.95);
      opacity: 0;
    }
    100% { 
      transform: scale(1);
      opacity: 1;
    }
  }

  .drawer-enter {
    animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .drawer-exit {
    animation: slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .backdrop-enter {
    animation: fadeIn 0.3s ease-out forwards;
  }

  .content-stagger-1 {
    animation: slideInFromBottom 0.5s ease-out 0.1s both;
  }

  .content-stagger-2 {
    animation: slideInFromBottom 0.5s ease-out 0.2s both;
  }

  .content-stagger-3 {
    animation: scaleIn 0.4s ease-out 0.3s both;
  }
`;

// Inject styles into head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modalStyles;
  document.head.appendChild(styleSheet);
}

const BentoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 md:p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:scale-[1.005] h-full ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({ title }: { title: string }) => (
  <div className="mb-4 border-b border-[var(--card-border)] pb-2">
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">{title}</h2>
  </div>
);

const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('java') && !s.includes('javascript')) return <FaJava className="text-sm opacity-80" />;
  if (s.includes('python')) return <FaPython className="text-sm opacity-80" />;
  if (s.includes('c++')) return <SiCplusplus className="text-sm opacity-80" />;
  if (s.includes('php')) return <FaPhp className="text-sm opacity-80" />;
  if (s.includes('javascript')) return <FaJs className="text-sm opacity-80" />;
  if (s.includes('typescript')) return <SiTypescript className="text-sm opacity-80" />;
  if (s.includes('html')) return <FaHtml5 className="text-sm opacity-80" />;
  if (s.includes('css')) return <FaCss3Alt className="text-sm opacity-80" />;
  if (s.includes('react')) return <FaReact className="text-sm opacity-80" />;
  if (s.includes('expo')) return <SiExpo className="text-sm opacity-80" />;
  if (s.includes('fastapi')) return <SiFastapi className="text-sm opacity-80" />;
  if (s.includes('django')) return <SiDjango className="text-sm opacity-80" />;
  if (s.includes('tailwind')) return <SiTailwindcss className="text-sm opacity-80" />;
  if (s.includes('sql')) return <FaDatabase className="text-sm opacity-80" />;
  if (s.includes('postgres')) return <SiPostgresql className="text-sm opacity-80" />;
  if (s.includes('mysql')) return <SiMysql className="text-sm opacity-80" />;
  if (s.includes('git')) return <FaCodeBranch className="text-sm opacity-80" />;
  if (s.includes('docker')) return <FaDocker className="text-sm opacity-80" />;
  if (s.includes('vite')) return <SiVite className="text-sm opacity-80" />;
  if (s.includes('linux')) return <FaLinux className="text-sm opacity-80" />;
  if (s.includes('go')) return <SiGo className="text-sm opacity-80" />;
  if (s.includes('fiber')) return <SiGo className="text-sm opacity-80" />;
  if (s.includes('node')) return <SiNodedotjs className="text-sm opacity-80" />;
  if (s.includes('npm')) return <SiNpm className="text-sm opacity-80" />;
  if (s.includes('redis')) return <SiRedis className="text-sm opacity-80" />;
  if (s.includes('websocket')) return <SiPostman className="text-sm opacity-80" />;
  if (s.includes('jwt')) return <FaCodeBranch className="text-sm opacity-80" />;
  if (s.includes('uvicorn')) return <SiFastapi className="text-sm opacity-80" />;
  if (s.includes('eslint')) return <SiEslint className="text-sm opacity-80" />;
  if (s.includes('stylelint')) return <SiStylelint className="text-sm opacity-80" />;
  if (s.includes('pytest')) return <SiPytest className="text-sm opacity-80" />;
  if (s.includes('router')) return <SiReactrouter className="text-sm opacity-80" />;
  if (s.includes('zustand')) return <SiAxios className="text-sm opacity-80" />;
  if (s.includes('axios')) return <SiAxios className="text-sm opacity-80" />;
  if (s.includes('sqlalchemy')) return <SiSqlalchemy className="text-sm opacity-80" />;
  if (s.includes('nativewind')) return <SiTailwindcss className="text-sm opacity-80" />;
  if (s.includes('react navigation')) return <SiReactrouter className="text-sm opacity-80" />;
  if (s.includes('pydantic')) return <SiFastapi className="text-sm opacity-80" />;
  if (s.includes('iot') || s.includes('agile')) return <FaProjectDiagram className="text-sm opacity-80" />;
  return null;
};

const SkillPill = ({ children }: { children: React.ReactNode }) => {
  const icon = typeof children === 'string' ? getSkillIcon(children) : null;
  
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 h-8 rounded-full text-[11px] font-bold border cursor-default transition-all duration-200 bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-primary)] hover:border-slate-300 dark:hover:border-slate-500 whitespace-nowrap">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </span>
  );
};

const ExperienceTimeline = ({ title, company, period, onViewDetails }: { title: string, company: string, period: string, onViewDetails: () => void }) => {
  // Parse company string to extract project, company, and location
  const parts = company.split(' | ');
  const project = parts[0] || '';
  const actualCompany = parts[1] || '';
  const location = parts[2] || '';

  return (
    <div className="relative pl-8 pb-6 last:pb-0">
      <div className="absolute left-0 top-3 bottom-0 w-[1px] bg-slate-300 dark:bg-slate-700 opacity-50" />
      <div className="absolute left-[-5px] top-[10px] w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-[var(--card-bg)] z-10" />

      <div 
        className="cursor-pointer group"
        onClick={onViewDetails}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
          <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-black uppercase text-[var(--text-primary)] opacity-80 font-mono tracking-tighter">{period}</span>
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <div className="mb-3 space-y-1">
          <p className="text-sm font-semibold text-[var(--text-primary)]">{project}</p>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{actualCompany}</p>
          <p className="text-[10px] text-[var(--text-primary)] opacity-70">{location}</p>
        </div>
      </div>
    </div>
  );
};

const ExperienceModal = ({ experience, isOpen, onClose }: { experience: any, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  const parts = experience.company.split(' | ');
  const project = parts[0] || '';
  const actualCompany = parts[1] || '';
  const location = parts[2] || '';

  return (
    <div className="fixed inset-0 z-50 flex pointer-events-none" onClick={onClose}>
      {/* Drawer */}
      <div 
        className="bg-[var(--card-bg)] border-l border-[var(--card-border)] w-[40%] shadow-2xl relative ml-auto pointer-events-auto drawer-enter overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b border-[var(--card-border)] p-5 md:p-6 pb-4 content-stagger-1">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 pr-4">
                <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 leading-tight">{experience.title}</h2>
                <div className="space-y-2">
                  <p className="text-base font-semibold text-[var(--text-primary)]">{project}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{actualCompany}</span>
                    <span className="text-[var(--text-primary)] opacity-40">•</span>
                    <span className="text-sm text-[var(--text-primary)] opacity-80">{location}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <p className="text-xs font-bold text-[var(--text-primary)] opacity-70 uppercase tracking-wider">{experience.period}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-primary)] opacity-60 hover:opacity-100 transition-all hover:scale-105 hover:rotate-90 duration-300"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 pt-4">
            <div className="space-y-6">
              {/* Key Contributions */}
              <div className="content-stagger-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--text-primary)]">Key Contributions</h3>
                </div>
                <ul className="space-y-3">
                  {experience.bullets.map((b: string, i: number) => (
                    <li key={i} className="text-sm text-[var(--text-primary)] leading-relaxed flex items-start gap-3 opacity-0" style={{
                      animation: `slideInFromBottom 0.5s ease-out ${0.3 + i * 0.1}s both`
                    }}>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                      <span className="flex-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="content-stagger-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--text-primary)]">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((t: string, i: number) => (
                    <div key={t} className="opacity-0" style={{
                      animation: `scaleIn 0.3s ease-out ${0.4 + i * 0.05}s both`
                    }}>
                      <SkillPill>{t}</SkillPill>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Link */}
              {experience.documentLink && (
                <div className="pt-4 border-t border-[var(--card-border)] opacity-0" style={{
                  animation: 'slideInFromBottom 0.5s ease-out 0.6s both'
                }}>
                  <a 
                    href={experience.documentLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-lg"
                  >
                    <ExternalLink size={16} />
                    {experience.documentLabel || "View Related Documents"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationBlock = ({ school, degree, period, honors }: { school: string, degree: string, period: string, honors?: React.ReactNode[] }) => (
  <div className="mb-4 last:mb-0 pb-4 border-b border-[var(--card-border)] last:border-0 last:pb-0">
    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1 leading-tight">{school}</h3>
    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{degree}</p>
    <p className="text-[10px] font-black text-[var(--text-primary)] opacity-80 uppercase tracking-[0.1em] mb-3">{period}</p>
    {honors && (
      <div className="mt-3 space-y-2">
        {honors.map((h, i) => (
          <div key={i} className="text-[11px] font-bold text-[var(--text-primary)] leading-snug tracking-tight flex items-start gap-1.5">
            <span className="mt-[2px] text-blue-500">•</span>
            <div>{h}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const CertGridItem = ({ name, date, link }: { name: string, date: string, link?: string }) => {
  const content = (
    <>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-[var(--text-primary)] leading-snug line-clamp-3">{name}</p>
        <p className="text-[9px] font-bold text-[var(--text-primary)] opacity-80 mt-2 uppercase tracking-tighter">{date}</p>
      </div>
      <Award size={14} className="text-[var(--text-primary)] opacity-40 shrink-0" />
    </>
  );

  const className = `h-full p-4 bg-transparent border border-[var(--card-border)] rounded-xl transition-all duration-200 flex flex-col justify-between gap-4 ${link ? 'cursor-pointer' : ''} hover:border-slate-300 dark:hover:border-slate-500`;

  return (
    <div className="h-full min-h-[120px]">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
          {content}
        </a>
      ) : (
        <div className={className}>
          {content}
        </div>
      )}
    </div>
  );
};

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean, onToggle: () => void }) => (
  <button
    onClick={onToggle}
    aria-label="Toggle dark mode"
    className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
  >
    {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-600" />}
  </button>
);

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const experiences = [
    {
      title: "Application Developer Intern",
      company: "Sakai — Ride-Hailing Platform | Skaiwel Trading & Solutions Inc. | Project 8, Quezon City",
      period: "04/2026 – Present",
      bullets: [
        "Extended a production-grade ride-hailing system across React Native (Expo) driver/passenger apps and a FastAPI backend, implementing end-to-end ride lifecycle flows including matching, live tracking, and trip state synchronization.",
        "Improved real-time system reliability and scalability by designing a WebSocket-based update pipeline with Redis backed driver location fanout and geohash-based spatial throttling, significantly reducing redundant location updates while preserving map accuracy.",
        "Delivered core platform features including OTP authentication, session management, map-based booking, routing with toll-aware fare estimation, rewards system, and optimized media pipelines, improving overall system responsiveness and user experience consistency."
      ],
      tags: ["React Native", "Expo", "FastAPI", "Redis", "WebSockets", "PostgreSQL"]
    },
    {
      title: "Application Developer Intern",
      company: "Full-Stack Inventory Management System | Skaiwel Trading & Solutions Inc. | Project 8, Quezon City",
      period: "12/2025 – 04/2026",
      bullets: [
        "Built and deployed a full-stack inventory operations platform (FastAPI, React, React Native/Expo), replacing a legacy system with a rebuilt, automated solution aligned to existing business workflows.",
        "Reduced manual inventory handling by digitizing pull-out, return, transfer, and drop-off processes, integrating QR/barcode scanning, approval workflows, stock validation, and conflict prevention to ensure data integrity.",
        "Enhanced data visibility and traceability through a centralized, role-based system with dashboards, analytics, searchable audit logs, and exportable reports, plus offline-capable mobile workflows for warehouse and admin operations."
      ],
      tags: ["FastAPI", "React", "React Native", "PostgreSQL", "Expo"]
    },
    {
      title: "Full Stack Developer (Student)",
      company: "Barangay Information System with IoT-Enabled Incident Reporting and E-Services | Barangay Gumaoc East — National University Fairview | Regalado Hwy, Quezon City",
      period: "08/2025 – 10/2025",
      bullets: [
        "Developed and deployed a full-stack barangay information system with IoT-enabled incident reporting, digitizing public service workflows and administrative records management.",
        "Reduced incident processing and reporting time by ~40–60% through automation of logging, record handling, and e-service request workflows.",
        "Implemented a centralized real-time database system for barangay personnel, improving data accessibility and enabling faster coordination and decision-making."
      ],
      tags: ["React", "FastAPI", "IoT", "PostgreSQL", "TailwindCSS"]
    },
    {
      title: "Full Stack Developer (Student)",
      company: "MabInventory: Web-Based Ordering and Inventory Management System | Mabini Vape Shop — National University Fairview | Regalado Hwy, Quezon City",
      period: "03/2025 – 06/2025",
      bullets: [
        "Built a full-stack inventory and ordering system to automate stock monitoring and sales operations for a retail business.",
        "Improved inventory accuracy by ~30–50% through automated stock tracking, low-stock alerts, and real-time inventory updates.",
        "Reduced manual workload and order processing time by centralizing product management and digitizing order workflows."
      ],
      tags: ["React", "FastAPI", "PostgreSQL", "TailwindCSS"]
    }
  ];

  const techStack = {
    languages: ["Python", "JavaScript", "TypeScript", "HTML", "CSS"],
    frameworks: ["React", "React Native", "Expo", "FastAPI", "TailwindCSS", "Zustand", "Axios", "SQLAlchemy", "Pydantic"],
    tools: ["Node.js", "npm", "PostgreSQL", "Redis", "WebSockets", "JWT", "Uvicorn", "Git", "Docker", "Vite", "ESlint", "Stylelint", "Pytest", "Agile"]
  };

  const certifications = [
    { name: "TOPCIT (Test of Practical Competency in IT) – Level 3", date: "12/2025", link: "https://drive.google.com/file/d/16IlCFXVUTy4kvivb7AuinIfb8YBxgfCx/view?usp=sharing" },
    { name: "Alibaba Cloud Auto Scaling Fundamentals", date: "06/2025", link: "https://drive.google.com/file/d/1v3OXdzFm2XI38YNZyhDnPp3Ih8FkYfPd/view?usp=sharing" },
    { name: "Alibaba Cloud SLB Fundamentals", date: "05/2025", link: "https://drive.google.com/file/d/1h8uhOrt9y2cpoSPiqen5DOMQZ_HXHXnD/view?usp=sharing" },
    { name: "Alibaba Cloud OSS Fundamentals", date: "05/2025", link: "https://drive.google.com/file/d/1fEbraGA295_DmK3yqoi3NtClHjzJFaKW/view?usp=sharing" },
    { name: "Alibaba Cloud ECS Fundamentals", date: "05/2025", link: "https://drive.google.com/file/d/114QRpBjn5k4m4oUI9KKvoQ5lQpbs6L0_/view?usp=sharing" },
    { name: "Alibaba Cloud ApsaraDB RDS Fundamentals", date: "05/2025", link: "https://drive.google.com/file/d/1rq75XZUjhydLsKVeqjYwVXXXA8DyJXNU/view?usp=sharing" },
    { name: "ACA Big Data Certification", date: "06/2024", link: "https://drive.google.com/file/d/1dzQ1DTuLPyKEJlbPHEATFGt2FAz7s6k8/view?usp=sharing" },
    { name: "Oracle Cloud Infrastructure Associate", date: "08/2023", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BDE76515D95C5A2A68859AC180B3134AE763ABDA8760EC708990B1EFB5D01598" },
    { name: "Oracle Cloud Data Associate", date: "08/2023", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=948BC58FB0C9B1803710D9BF877E6D05058CED47A41DD9BD2250AFFBC052AAF0" }
  ];

  return (
    <div className={isDark ? "dark" : ""}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />

      <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-500 pt-12 pb-6 md:pt-20 md:pb-10 px-4">
        <div className="max-w-[1100px] mx-auto">

          <div className="flex flex-col gap-6 md:gap-8">

            <header className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)] mb-4">
                  Mar Yvan S. Dela Cruz
                </h1>
                <p className="text-[var(--text-primary)] font-bold mb-10 text-base md:text-xl flex flex-wrap justify-center md:justify-start items-center gap-3">
                  Fullstack Developer
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-y-4 gap-x-10">
                  <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)]"><Phone size={14} className="text-blue-500" /> 09162291763</span>
                  <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)]"><Mail size={14} className="text-blue-500" /> dcruzyvan@gmail.com</span>
                  <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)]"><MapPin size={14} className="text-blue-500" /> San Jose Del Monte, Bulacan</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
                <div className="flex gap-4 w-full">
                  <a href="https://linkedin.com/in/mcdofrenchfries" target="_blank" rel="noopener noreferrer"
                    className="md:w-44 flex-1 md:flex-none flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-xl shadow-blue-500/10 hover:bg-blue-700 hover:shadow-blue-500/20 hover:scale-105 hover:-translate-y-0.5">
                    <Linkedin size={20} />
                    Connect
                  </a>
                  <a href="https://github.com/mcdofrenchfreis/" target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center justify-center w-14 h-14 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl transition-all text-[var(--text-primary)] hover:bg-slate-900 hover:border-slate-700 hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg dark:hover:bg-slate-100 dark:hover:border-slate-300 dark:hover:text-slate-900">
                    <Github size={22} />
                  </a>
                </div>
                <a href="/assets/Resume.DelaCruz-MarYvan.pdf" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center py-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-sm text-[var(--text-primary)] hover:bg-slate-900 hover:border-slate-700 hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-lg dark:hover:bg-slate-100 dark:hover:border-slate-300 dark:hover:text-slate-900">
                  Resume
                </a>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">

              {/* First Row: Experience + Tech Stack */}
              <div className="lg:col-span-8">
                <BentoCard className="h-full">
                  <SectionHeading title="Experience" />
                  <div className="pt-2">
                    {experiences.map((exp, i) => (
                      <ExperienceTimeline key={i} {...exp} onViewDetails={() => setSelectedExperience(exp)} />
                    ))}
                  </div>
                </BentoCard>
              </div>

              <div className="lg:col-span-4">
                <BentoCard className="relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                  <SectionHeading title="Tech Stack" />
                  <div className="space-y-4 mt-2 relative z-10">
                    <div className="group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                        <p className="text-[9px] font-black uppercase text-[var(--text-primary)] tracking-[0.2em]">Languages</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {techStack.languages.map((s, i) => (
                          <div key={s} className="opacity-0" style={{
                            animation: `slideInFromBottom 0.4s ease-out ${i * 0.05}s both`
                          }}>
                            <SkillPill>{s}</SkillPill>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        <p className="text-[9px] font-black uppercase text-[var(--text-primary)] tracking-[0.2em]">Frameworks</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-w-full">
                        {techStack.frameworks.map((s, i) => (
                          <div key={s} className="opacity-0" style={{
                            animation: `slideInFromBottom 0.4s ease-out ${0.2 + i * 0.05}s both`
                          }}>
                            <SkillPill>{s}</SkillPill>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                        <p className="text-[9px] font-black uppercase text-[var(--text-primary)] tracking-[0.2em]">Tools</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {techStack.tools.map((s, i) => (
                          <div key={s} className="opacity-0" style={{
                            animation: `slideInFromBottom 0.4s ease-out ${0.4 + i * 0.05}s both`
                          }}>
                            <SkillPill>{s}</SkillPill>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </BentoCard>
              </div>

              {/* Second Row: Certifications + Education */}
              <div className="lg:col-span-8">
                <BentoCard>
                  <SectionHeading title="Certifications" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    {certifications.map((cert, i) => (
                      <CertGridItem key={i} {...cert} />
                    ))}
                  </div>
                </BentoCard>
              </div>

              <div className="lg:col-span-4">
                <BentoCard>
                  <SectionHeading title="Education" />
                  <div className="pt-2">
                    <EducationBlock
                      school="National University – Fairview"
                      degree="Bachelor of Science in Information Technology, Major in Mobile and Internet Technologies"
                      period="2022 - Present"
                      honors={[
                        <>
                          Dean's Lister (First Honors)
                          <span className="block font-normal mt-1 opacity-80">Academic Years 2023–2024 & 2024–2025 (Term 1 & Term 2)</span>
                        </>
                      ]}
                    />
                    <EducationBlock
                      school="Access Computer College"
                      degree="Senior High School (Information and Communications Technology)"
                      period="2020 – 2022"
                      honors={["Graduated with High Honors"]}
                    />
                  </div>
                </BentoCard>
              </div>

            </div>

            <footer className="pt-6 pb-4 flex justify-center items-center">
              <div className="flex items-center opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-105 transform-gpu cursor-default">
                <span className="text-[var(--text-primary)] text-xl md:text-3xl font-bold -mr-4 md:-mr-8 relative z-10">
                  &copy;
                </span>
                <div
                  className="w-48 h-20 md:w-72 md:h-28 bg-[var(--text-primary)]"
                  style={{
                    WebkitMaskImage: "url('/ttd.png')",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: "url('/ttd.png')",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                  title="xevan signature"
                />
              </div>
            </footer>

          </div>
        </div>
      </main>

      <ExperienceModal 
        experience={selectedExperience} 
        isOpen={!!selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
    </div>
  );
}

export default App;
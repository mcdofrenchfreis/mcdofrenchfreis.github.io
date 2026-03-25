import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Mail, 
  MapPin,
  Award, 
  Phone, 
  Github,
  Sun,
  Moon
} from 'lucide-react';
import './App.css';

// --- ATOMIC COMPONENTS (CSS VARIABLE DRIVEN) ---

const BentoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  // Using variables for bg and border to avoid dark: modifiers and resolve IDE warnings
  <div className={`bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01] h-full ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({ title }: { title: string }) => (
  <div className="mb-8 border-b border-[var(--card-border)] pb-4">
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">{title}</h2>
  </div>
);

const SkillPill = ({ children, dark = false }: { children: React.ReactNode, dark?: boolean }) => (
  <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border cursor-default transition-all hover:scale-105 ${
    dark 
      ? "bg-slate-800 border-slate-700 text-white" 
      : "bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-primary)] opacity-80"
  }`}>
    {children}
  </span>
);

const ExperienceTimeline = ({ title, company, period, bullets, tags }: { title: string, company: string, period: string, bullets: string[], tags: string[] }) => (
  <div className="relative pl-8 pb-12 last:pb-0">
    <div className="absolute left-0 top-3 bottom-0 w-[1px] bg-slate-200 dark:bg-slate-800 opacity-50" />
    <div className="absolute left-[-5px] top-[10px] w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-[var(--card-bg)] z-10" />
    
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
      <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors">{title}</h3>
      <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 shrink-0 font-mono tracking-tighter">{period}</span>
    </div>
    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wide">{company}</p>
    <ul className="space-y-4 mb-6">
      {bullets.map((b, i) => (
        <li key={i} className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-3">
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 shrink-0 opacity-50" />
          {b}
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2">
      {tags.map(t => <SkillPill key={t}>{t}</SkillPill>)}
    </div>
  </div>
);

const EducationBlock = ({ school, degree, period, honors }: { school: string, degree: string, period: string, honors?: string[] }) => (
  <div className="mb-10 last:mb-0 pb-10 border-b border-[var(--card-border)] last:border-0 last:pb-0">
    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1 leading-tight">{school}</h3>
    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{degree}</p>
    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.1em] mb-4">{period}</p>
    {honors && (
      <div className="bg-[var(--background)] p-4 rounded-xl border border-[var(--card-border)] mt-4">
        <div className="space-y-2">
          {honors.map((h, i) => <p key={i} className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-snug tracking-tight">• {h}</p>)}
        </div>
      </div>
    )}
  </div>
);

const CertGridItem = ({ name, date }: { name: string, date: string }) => (
  <div className="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl transition-all shadow-sm flex items-start justify-between gap-4">
    <div className="flex-1">
      <p className="text-xs font-bold text-[var(--text-primary)] leading-snug">{name}</p>
      <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 mt-2 uppercase tracking-tighter">{date}</p>
    </div>
    <Award size={14} className="text-slate-300 dark:text-slate-700 shrink-0" />
  </div>
);

// --- THEME TOGGLE SHORTCUT ---

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean, onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    aria-label="Toggle dark mode"
    className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
  >
    {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-600" />}
  </button>
);

// --- MAIN APPLICATION ---

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

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
      title: "Barangay Information System with IoT-Enabled Incident Reporting",
      company: "National University – Fairview | Quezon City",
      period: "08/2025 – 10/2025",
      bullets: [
        "Developed full-stack barangay info system digitizing community services and streamline administrative workflows.",
        "Reduced manual reporting and processing time by an estimated 40–60% through digital automation of incident logging.",
        "Implemented centralized, real-time records management for improved data accessibility."
      ],
      tags: ["Go", "React Native", "PostgreSQL", "IoT"]
    },
    {
      title: "MabInventory: Web-Based Ordering and Inventory Management",
      company: "Mabini Vape Shop | Quezon City",
      period: "03/2025 – 06/2025",
      bullets: [
        "Automated stock monitoring and sales tracking for a retail business using a centralized inventory hub.",
        "Increased inventory accuracy and reduced stock-out errors by 30–50% via automated alerts.",
        "Optimized processing time by implementing real-time inventory updates and sales logging."
      ],
      tags: ["Fiber", "TailwindCSS", "SQLAlchemy", "Agile"]
    }
  ];

  const techStack = {
    languages: ["Java", "Python", "C++", "PHP", "JavaScript", "TypeScript", "HTML", "CSS"],
    frameworks: ["React (Web)", "React Native", "Expo", "FastAPI", "Django", "TailwindCSS", "SQLAlchemy"],
    tools: ["PostgreSQL", "MySQL", "Git (CLI)", "Docker", "Vite", "Linux", "Agile"]
  };

  const certifications = [
    { name: "TOPCIT (Test of Practical Competency in IT) – Level 3", date: "12/2025" },
    { name: "Alibaba Cloud Auto Scaling Fundamentals", date: "06/2025" },
    { name: "Alibaba Cloud SLB Fundamentals", date: "05/2025" },
    { name: "Alibaba Cloud OSS Fundamentals", date: "05/2025" },
    { name: "Alibaba Cloud ACA Cloud Computing Certification", date: "05/2025" },
    { name: "ACA Big Data Certification", date: "06/2024" },
    { name: "Oracle Cloud Infrastructure Associate", date: "08/2023" }
  ];

  return (
    <div className={isDark ? "dark" : ""}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      
      <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-500 py-12 md:py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          
          <div className="flex flex-col gap-10 md:gap-14">
            
            {/* --- Identity Header --- */}
            <header className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)] mb-4">
                  Mar Yvan Dela Cruz
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold mb-10 text-base md:text-xl flex flex-wrap justify-center md:justify-start items-center gap-3">
                  Fullstack Developer
                  <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  IT Engineer
                  <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  NU Student
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-y-4 gap-x-10">
                  <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600"><Phone size={14} className="text-blue-500" /> 09162291763</span>
                  <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600"><Mail size={14} className="text-blue-500" /> dcruzyvan@gmail.com</span>
                  <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600"><MapPin size={14} className="text-blue-500" /> Quezon City, PH</span>
                </div>
              </div>

              <div className="flex gap-4 w-full md:w-auto shrink-0 justify-center">
                <a href="https://linkedin.com/in/mcdofrenchfries" target="_blank" rel="noopener noreferrer" 
                   className="md:w-44 flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all text-xs uppercase tracking-widest shadow-xl shadow-blue-500/10">
                  <Linkedin size={20} />
                  Connect
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-center w-14 h-14 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl hover:bg-slate-900 hover:text-white transition-all text-slate-700 dark:text-slate-300">
                  <Github size={22} />
                </a>
              </div>
            </header>

            {/* --- Bento Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
              
              {/* Left Side */}
              <div className="lg:col-span-8 flex flex-col gap-8 md:gap-10">
                <BentoCard>
                  <SectionHeading title="Experience" />
                  <div className="pt-2">
                    {experiences.map((exp, i) => (
                      <ExperienceTimeline key={i} {...exp} />
                    ))}
                  </div>
                </BentoCard>

                <BentoCard>
                  <SectionHeading title="Certifications" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {certifications.map((cert, i) => (
                      <CertGridItem key={i} {...cert} />
                    ))}
                  </div>
                </BentoCard>
              </div>

              {/* Right Side */}
              <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10">
                <BentoCard>
                  <SectionHeading title="Stack" />
                  <div className="space-y-12 mt-6">
                    <div>
                      <p className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-600 mb-6 tracking-[0.2em]">Core Languages</p>
                      <div className="flex flex-wrap gap-2.5">
                        {techStack.languages.map(s => <SkillPill key={s}>{s}</SkillPill>)}
                      </div>
                    </div>
                    <div>
                       <p className="text-[11px] font-black uppercase text-slate-600 mb-6 tracking-[0.2em]">Frameworks</p>
                      <div className="flex flex-wrap gap-2.5">
                        {techStack.frameworks.map(s => <SkillPill key={s}>{s}</SkillPill>)}
                      </div>
                    </div>
                    <div>
                       <p className="text-[11px] font-black uppercase text-slate-600 mb-6 tracking-[0.2em]">Workflow</p>
                      <div className="flex flex-wrap gap-2.5">
                        {techStack.tools.map(s => <SkillPill key={s}>{s}</SkillPill>)}
                      </div>
                    </div>
                  </div>
                </BentoCard>

                <BentoCard>
                  <SectionHeading title="Education" />
                  <div className="pt-2">
                    <EducationBlock 
                      school="National University – Fairview"
                      degree="B.S. Information Technology"
                      period="2022 - Present"
                      honors={["Dean’s Lister (First Honors) — AY 23–24", "Dean’s Lister — AY 24–25 (T1 & T2)"]}
                    />
                    <EducationBlock 
                      school="Access Computer College"
                      degree="Senior High School (ICT)"
                      period="2020 – 2022"
                      honors={["Graduated with High Honors"]}
                    />
                  </div>
                </BentoCard>
              </div>

            </div>

            {/* --- Footer --- */}
            <footer className="py-24 text-center text-slate-300 dark:text-slate-800 transition-colors">
              <p className="text-[10px] font-black uppercase tracking-[1em] mb-8">
                MAR YVAN DELA CRUZ
              </p>
              <div className="flex items-center justify-center gap-14">
                <a href="#" className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-700 hover:text-blue-500 transition-all">Resume</a>
                <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full" />
                <a href="#" className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-700 hover:text-blue-500 transition-all">Source</a>
              </div>
            </footer>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
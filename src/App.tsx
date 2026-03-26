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

const SkillPill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1.5 rounded-lg text-[11px] font-bold border cursor-default transition-all duration-300 hover:scale-105 bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-primary)] hover:shadow-md hover:border-slate-300 dark:hover:border-slate-500">
    {children}
  </span>
);

const ExperienceTimeline = ({ title, company, period, bullets, tags }: { title: string, company: string, period: string, bullets: string[], tags: string[] }) => (
  <div className="relative pl-8 pb-12 last:pb-0">
    <div className="absolute left-0 top-3 bottom-0 w-[1px] bg-slate-300 dark:bg-slate-700 opacity-50" />
    <div className="absolute left-[-5px] top-[10px] w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-[var(--card-bg)] z-10" />

    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
      <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors">{title}</h3>
      <span className="text-[10px] font-black uppercase text-[var(--text-primary)] opacity-80 shrink-0 font-mono tracking-tighter">{period}</span>
    </div>
    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wide">{company}</p>
    <ul className="space-y-4 mb-6">
      {bullets.map((b, i) => (
        <li key={i} className="text-sm text-[var(--text-primary)] leading-relaxed flex items-start gap-3">
          <span className="w-1.5 h-1.5 bg-[var(--text-primary)] opacity-40 rounded-full mt-2 shrink-0" />
          {b}
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2">
      {tags.map(t => <SkillPill key={t}>{t}</SkillPill>)}
    </div>
  </div>
);

const EducationBlock = ({ school, degree, period, honors }: { school: string, degree: string, period: string, honors?: React.ReactNode[] }) => (
  <div className="mb-10 last:mb-0 pb-10 border-b border-[var(--card-border)] last:border-0 last:pb-0">
    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1 leading-tight">{school}</h3>
    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{degree}</p>
    <p className="text-[10px] font-black text-[var(--text-primary)] opacity-80 uppercase tracking-[0.1em] mb-4">{period}</p>
    {honors && (
      <div className="bg-[var(--card-bg)] dark:bg-[var(--background)] p-4 rounded-xl border border-[var(--card-border)] mt-4">
        <div className="space-y-3">
          {honors.map((h, i) => (
            <div key={i} className="text-[11px] font-bold text-[var(--text-primary)] leading-snug tracking-tight flex items-start gap-1.5">
              <span className="mt-[2px]">•</span>
              <div>{h}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const CertGridItem = ({ name, date, link }: { name: string, date: string, link?: string }) => {
  const content = (
    <>
      <div className="flex-1">
        <p className="text-xs font-bold text-[var(--text-primary)] leading-snug">{name}</p>
        <p className="text-[9px] font-bold text-[var(--text-primary)] opacity-80 mt-2 uppercase tracking-tighter">{date}</p>
      </div>
      <Award size={14} className="text-[var(--text-primary)] opacity-40 shrink-0" />
    </>
  );

  const className = `p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl transition-all duration-300 shadow-sm flex items-start justify-between gap-4 ${link ? 'hover:-translate-y-1 hover:shadow-md cursor-pointer hover:border-slate-300 dark:hover:border-slate-500' : ''}`;

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>
      {content}
    </div>
  );
};

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
    { name: "TOPCIT (Test of Practical Competency in IT) – Level 3", date: "12/2025", link: "https://drive.google.com/drive/u/0/folders/1uViOkumvh2sM-bXF-D1puiX622ECvGxs" },
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

          <div className="flex flex-col gap-10 md:gap-14">

            {/* --- Identity Header --- */}
            <header className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--text-primary)] mb-4">
                  Mar Yvan S. Dela Cruz
                </h1>
                <p className="text-[var(--text-primary)] font-bold mb-10 text-base md:text-xl flex flex-wrap justify-center md:justify-start items-center gap-3">
                  Fullstack Developer
                  <span className="w-1.5 h-1.5 bg-[var(--text-primary)] opacity-30 rounded-full" />
                  National University Student
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
                    className="md:w-44 flex-1 md:flex-none flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all text-xs uppercase tracking-widest shadow-xl shadow-blue-500/10">
                    <Linkedin size={20} />
                    Connect
                  </a>
                  <a href="https://github.com/mcdofrenchfreis/" target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center justify-center w-14 h-14 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl hover:bg-slate-900 hover:text-white transition-all text-[var(--text-primary)]">
                    <Github size={22} />
                  </a>
                </div>
                <a href="/assets/Resume.DelaCruz-MarYvan.pdf" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center py-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl font-black hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs uppercase tracking-widest shadow-sm text-[var(--text-primary)]">
                  Resume
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
                      <p className="text-[11px] font-black uppercase text-[var(--text-primary)] mb-6 tracking-[0.2em]">Core Languages</p>
                      <div className="flex flex-wrap gap-2.5">
                        {techStack.languages.map(s => <SkillPill key={s}>{s}</SkillPill>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase text-[var(--text-primary)] mb-6 tracking-[0.2em]">Frameworks</p>
                      <div className="flex flex-wrap gap-2.5">
                        {techStack.frameworks.map(s => <SkillPill key={s}>{s}</SkillPill>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase text-[var(--text-primary)] mb-6 tracking-[0.2em]">Workflow</p>
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
                      degree="Bachelor of Science in Information Technology, Major in Mobile and Internet Technologies"
                      period="2022 - Present"
                      honors={[
                        <>
                          Dean’s Lister (First Honors)
                          <span className="block font-normal mt-1 opacity-80">Academic Year 2023–2024</span>
                        </>,
                        <>
                          Dean’s Lister (First Honors)
                          <span className="block font-normal mt-1 opacity-80">Academic Year 2024–2025 (Term 1 & Term 2)</span>
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

            {/* --- Footer --- */}
            <footer className="pt-8 pb-6 flex justify-center items-center">
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
    </div>
  );
}

export default App;
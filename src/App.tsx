import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Bomb, Gamepad2, Utensils } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const personalInfo = {
    name: "Gabriel Felipe Vargas Ferreira",
    role: "Senior Mobile Developer",
    email: "gabrielfvf@outlook.com",
    github: "https://github.com/gabrielfvf7",
    linkedin: "https://www.linkedin.com/in/gabrielfvf/",
    summary: "Senior Mobile Developer especializado na criação de aplicativos móveis de alta qualidade e escaláveis utilizando React Native, TypeScript e tecnologias nativas. Experiência em aplicações financeiras, campanhas de referral, deeplinks e gamificação."
  };

  const skills: string[] = [
    "React Native", "Firebase", "Python", "A/B Testing", "Typescript", "Java", "Kotlin", "Flutter", "React"
  ];

  const experience: ExperienceItem[] = [
    {
      company: "Méliuz",
      role: "Senior Mobile Developer",
      period: "10/2021 - 01/2025", 
      description: "Desenvolvimento de aplicativo financeiro em React Native (Typescript) e código Nativo (Java e Swift). Atuação com referral, deeplinks, testes A/B, gamificação, Strapi e Firebase." 
    },
    {
      company: "ProntLife",
      role: "Mobile Application Developer",
      period: "09/2019 - 10/2021", 
      description: "Desenvolvimento de app na área médica (React Native/Expo). Criação de protótipos em Kotlin para testar videochamadas e integração com dispositivos bluetooth." 
    },
    {
      company: "DevMob UFRJ",
      role: "Mobile Developer",
      period: "09/2016 - 09/2021", 
      description: "Grupo de extensão da UFRJ focado em apps para a comunidade. Desenvolvimento utilizando Java, Flutter e React-Native."
    },
    {
      company: "Banco Maré",
      role: "Mobile Developer",
      period: "12/2018 - 08/2019", 
      description: "Manutenção e criação de funcionalidades para aplicativo Android nativo (Java e Kotlin) no setor financeiro." 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <nav className="fixed w-full z-50 bg-slate-900/95 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-teal-400">Gabriel<span className="text-white"> Vargas</span></div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#about" className="hover:text-teal-400 transition-colors">Sobre</a>
            <a href="#projects" className="hover:text-teal-400 transition-colors">Projetos</a>
            <a href="#experience" className="hover:text-teal-400 transition-colors">Experiência</a>
            <a href="#skills" className="hover:text-teal-400 transition-colors">Skills</a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-300">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <section id="about" className="pt-32 pb-20 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-teal-400 font-mono mb-4 text-sm uppercase tracking-widest">Mobile Engineer</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{personalInfo.name}</h1>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl leading-relaxed">{personalInfo.summary}</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href={`mailto:${personalInfo.email}`} className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
              <Mail size={18}/> Contato
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all border border-slate-700">
              <Github size={18}/> GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all border border-slate-700">
              <Linkedin size={18}/> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-slate-800/40">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Gamepad2 className="text-teal-500" size={32} /> Projetos Pessoais & Acadêmicos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 group hover:border-teal-400 transition-all">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500"><Utensils size={28} /></div>
                <a href="https://github.com/DevMobUFRJ/rango" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><ExternalLink size={20}/></a>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400">Rango (TCC)</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                App desenvolvido em Flutter para a comunidade da UFRJ, facilitando o comércio de refeições entre estudantes.
              </p>
              <div className="flex gap-2 mb-6">
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">FLUTTER</span>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">DART</span>
              </div>
              <a href="https://github.com/DevMobUFRJ/rango" target="_blank" rel="noreferrer" className="block text-center bg-slate-800 hover:bg-teal-600 py-2 rounded-lg transition-colors font-medium">Ver Repositório</a>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 group hover:border-teal-400 transition-all">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Bomb size={28} /></div>
                <a href="/minado/index.html" target="_blank" className="text-slate-400 hover:text-white"><ExternalLink size={20}/></a>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400">Minesweeper XP</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Clone do Campo Minado clássico. Foco em lógica de algoritmos e manipulação de DOM com JavaScript puro.
              </p>
              <div className="flex gap-2 mb-6">
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">JAVASCRIPT</span>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">HTML/CSS</span>
              </div>
              <a href="/minado/index.html" target="_blank" className="block text-center bg-slate-800 hover:bg-teal-600 py-2 rounded-lg transition-colors font-medium">Jogar Agora</a>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map(s => (
              <span key={s} className="bg-slate-800 px-5 py-2 rounded-full border border-slate-700 text-slate-300 font-medium hover:border-teal-500 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">Trajetória Profissional</h2>
        <div className="space-y-12">
          {experience.map((job, i) => (
            <div key={i} className="pl-8 border-l-2 border-slate-800 relative group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-teal-500 group-hover:bg-teal-500 transition-all"></div>
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{job.role}</h3>
                <span className="text-teal-400 font-mono text-sm font-bold bg-teal-500/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">{job.period}</span>
              </div>
              <h4 className="text-slate-300 font-semibold mb-4">{job.company}</h4>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} - {personalInfo.name}</p>
        <p className="mt-2 font-mono">Senior Mobile Developer</p>
      </footer>
    </div>
  );
};

export default Portfolio;
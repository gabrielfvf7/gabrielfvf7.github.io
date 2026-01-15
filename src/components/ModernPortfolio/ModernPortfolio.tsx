import React, { useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Bomb, Gamepad2, Utensils, Monitor, FileText } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, EXPERIENCE } from '../../constants';
import './ModernPortfolio.css';

interface ModernPortfolioProps {
  onSwitchToXP: () => void;
}

export const ModernPortfolio: React.FC<ModernPortfolioProps> = ({ onSwitchToXP }) => {
  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.fontSize = '16px';
    document.body.style.fontSize = '16px';
    const root = document.getElementById('root');
    if (root) {
      root.style.overflow = 'auto';
      root.style.height = 'auto';
    }

    return () => {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.fontSize = '11px';
      document.body.style.fontSize = '11px';
      if (root) {
        root.style.overflow = 'hidden';
        root.style.height = '100vh';
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <nav className="fixed w-full z-50 bg-slate-900/95 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl text-teal-400">Gabriel<span className="text-white"> Vargas</span></div>
          
          <div className="hidden md:flex space-x-8 text-base font-medium">
            <a href="#about" className="hover:text-teal-400 transition-colors">Sobre</a>
            <a href="#projects" className="hover:text-teal-400 transition-colors">Projetos</a>
            <a href="#experience" className="hover:text-teal-400 transition-colors">Experiência</a>
            <a href="#skills" className="hover:text-teal-400 transition-colors">Skills</a>
          </div>

          <button onClick={onSwitchToXP} className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all border border-slate-700 text-base">
            <Monitor size={16}/> Versão XP
          </button>
        </div>
      </nav>

      <section id="about" className="pt-36 pb-24 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-teal-400 font-mono mb-4 text-base uppercase tracking-widest">Mobile Engineer</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">{PERSONAL_INFO.name}</h1>
          <p className="text-slate-400 text-xl mb-8 max-w-2xl leading-relaxed">{PERSONAL_INFO.summary}</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-all text-base">
              <Mail size={20}/> Contato
            </a>
            <a href="/documents/resume.pdf" target="_blank" rel="noreferrer" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-all text-base">
              <FileText size={20}/> Currículo
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-all border border-slate-700 text-base">
              <Github size={20}/> GitHub
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-all border border-slate-700 text-base">
              <Linkedin size={20}/> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 bg-slate-800/40">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-3">
            <Gamepad2 className="text-teal-500" size={36} /> Projetos Pessoais & Acadêmicos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 group hover:border-teal-400 transition-all">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500"><Utensils size={28} /></div>
                <a href="https://github.com/DevMobUFRJ/rango" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><ExternalLink size={20}/></a>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-400">Rango (TCC)</h3>
              <p className="text-slate-400 text-base mb-6 leading-relaxed">
                App desenvolvido em Flutter, com uso do Firebase, para a comunidade da UFRJ, facilitando o comércio de refeições entre estudantes e vendedores.
              </p>
              <div className="flex gap-2 mb-6">
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1.5 rounded">FLUTTER</span>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1.5 rounded">DART</span>
              </div>
              <a href="https://github.com/DevMobUFRJ/rango" target="_blank" rel="noreferrer" className="block text-center bg-slate-800 hover:bg-teal-600 py-3 rounded-lg transition-colors font-medium text-base">Ver Repositório</a>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 group hover:border-teal-400 transition-all">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Bomb size={28} /></div>
                <a href="/minado/index.html" target="_blank" className="text-slate-400 hover:text-white"><ExternalLink size={20}/></a>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-400">Minesweeper XP</h3>
              <p className="text-slate-400 text-base mb-6 leading-relaxed">
                Clone do Campo Minado clássico. Foco em lógica de algoritmos e manipulação de DOM com JavaScript puro.
              </p>
              <div className="flex gap-2 mb-6">
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1.5 rounded">JAVASCRIPT</span>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1.5 rounded">HTML/CSS</span>
              </div>
              <a href="/minado/index.html" target="_blank" className="block text-center bg-slate-800 hover:bg-teal-600 py-3 rounded-lg transition-colors font-medium text-base">Jogar Agora</a>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {SKILLS.map(s => (
              <span key={s} className="bg-slate-800 px-6 py-3 rounded-full border border-slate-700 text-slate-300 font-medium hover:border-teal-500 transition-colors text-base">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-20 text-center">Trajetória Profissional</h2>
        <div className="space-y-16">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className="pl-10 border-l-2 border-slate-800 relative group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-teal-500 group-hover:bg-teal-500 transition-all"></div>
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                <span className="text-teal-400 font-mono text-base font-bold bg-teal-500/10 px-4 py-1.5 rounded-full w-fit mt-2 md:mt-0">{job.period}</span>
              </div>
              <h4 className="text-slate-300 font-semibold mb-4 text-lg">{job.company}</h4>
              <p className="text-slate-400 leading-relaxed text-base">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-16 border-t border-slate-800 text-center text-slate-500 text-base">
        <p>© {new Date().getFullYear()} - {PERSONAL_INFO.name}</p>
        <p className="mt-2 font-mono">Senior Mobile Developer</p>
      </footer>
    </div>
  );
};

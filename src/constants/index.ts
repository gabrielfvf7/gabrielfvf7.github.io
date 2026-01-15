import type { ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: "Gabriel Felipe Vargas Ferreira",
  role: "Senior Mobile Developer",
  email: "gabrielfvf@outlook.com",
  github: "https://github.com/gabrielfvf7",
  linkedin: "https://www.linkedin.com/in/gabrielfvf/",
  summary: "Senior Mobile Developer especializado na criação de aplicativos móveis de alta qualidade e escaláveis utilizando React Native, TypeScript e tecnologias nativas. Experiência em aplicações financeiras, campanhas de referral, deeplinks e gamificação."
};

export const SKILLS = [
  "React Native", "Firebase", "Python", "A/B Testing", "Typescript", "Javascript", "Java", "Kotlin", "Flutter", "Dart", "React"
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Méliuz",
    role: "Senior Mobile Developer",
    period: "10/2021 - Atualmente", 
    description: "Desenvolvimento de aplicativo financeiro em React Native (Typescript). Atuação com referral, deeplinks, testes A/B, gamificação, Strapi e Firebase. Atuando também com instalação de bibliotecas externas, com código nativo e as vezes com backend e web." 
  },
  {
    company: "ProntLife",
    role: "Mobile Application Developer",
    period: "09/2019 - 10/2021", 
    description: "Desenvolvimento de app na área médica (React Native/Expo). Criação de protótipos em Kotlin para testar videochamadas e integração com dispositivos bluetooth. Responsável por publicação de atualizações via OTA." 
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
    description: "Manutenção e criação de funcionalidades para aplicativo Android nativo (Java e Kotlin) no setor financeiro. Responsável pela publicação de atualizações na Google Play Store." 
  }
];

export const DESKTOP_ICONS = [
  { id: 'about', label: 'Sobre', icon: '/icons/User Accounts.png' },
  { id: 'projects', label: 'Projetos', icon: '/icons/Freecell.png' },
  { id: 'experience', label: 'Experiência', icon: '/icons/Scheduled Tasks.png' },
  { id: 'skills', label: 'Skills', icon: '/icons/System Information.png' },
  { id: 'resume', label: 'Currículo', icon: '/icons/Notepad.png' },
  { id: 'minesweeper', label: 'Campo Minado', icon: '/icons/Minesweeper.png' },
  { id: 'paint', label: 'Paint', icon: '/icons/Paint.png' },
];

export const WINDOW_TITLES: Record<string, string> = {
  about: 'Sobre',
  projects: 'Projetos',
  experience: 'Experiência',
  skills: 'Skills',
  minesweeper: 'Minesweeper',
  paint: 'Paint',
};

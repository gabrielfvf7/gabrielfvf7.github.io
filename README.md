# Portfolio Gabriel Vargas

Portfolio pessoal em formato Windows XP com versão moderna alternativa.

## 🚀 Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS

## 📦 Instalação

```bash
npm install
```

## 🛠️ Desenvolvimento

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deploy no GitHub Pages

1. Build do projeto:
```bash
npm run build
```

2. Commit e push da pasta dist:
```bash
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

Ou simplesmente execute:
```bash
npm run deploy
```

## 📁 Estrutura do Projeto

```
src/
├── assets/
│   └── icons/          # Ícones do Windows XP
├── components/         # Componentes React
│   ├── Desktop/
│   ├── DesktopIcons/
│   ├── MinesweeperWindow/
│   ├── ModernPortfolio/
│   ├── PortfolioWindow/
│   ├── StartMenu/
│   ├── Taskbar/
│   └── TrashIcon/
├── constants/          # Constantes e dados
├── hooks/             # Custom hooks
├── types/             # TypeScript types
└── utils/             # Funções utilitárias

public/                # Assets públicos
docs/                  # Documentação
```

## ✨ Funcionalidades

- 🪟 Interface Windows XP autêntica
- 💼 Portfolio moderno alternativo
- 🎨 Troca dinâmica de temas
- 🎮 Campo Minado integrado (versão XP)
- 🔄 Minimizar/Maximizar janelas
- ⏰ Relógio funcional na taskbar
- 📊 Informações profissionais interativas

## 📝 Documentação Adicional

Veja a pasta [docs/](./docs/) para documentação detalhada sobre implementações e features do projeto.
```

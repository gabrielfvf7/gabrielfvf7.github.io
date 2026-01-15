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
│   ├── PaintWindow/    # Janela do Paint (JSPaint)
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
  └── jspaint/         # JSPaint - MS Paint clone
  └── documents/       # Documentos (currículo, etc)
docs/                  # Documentação
```

## ✨ Funcionalidades

- 🪟 Interface Windows XP autêntica
- 💼 Portfolio moderno alternativo
- 🎨 Troca dinâmica de temas
- 🎮 Campo Minado integrado (versão XP)
- 🖌️ Paint funcional (MS Paint clone)
- 🔄 Minimizar/Maximizar janelas
- ↔️ Arrastar janelas pela tela
- 📏 Redimensionar janelas pelas bordas e cantos (apenas janelas não maximizadas)
- ⏰ Relógio funcional na taskbar
- 📊 Informações profissionais interativas
- 📄 Visualizador de currículo em PDF

## 🎯 Créditos e Atribuições

Este projeto utiliza os seguintes recursos de terceiros:

- **[JSPaint](https://github.com/1j01/jspaint)** por Isaiah Odhner - Clone open-source do MS Paint clássico
  - Licença: MIT License
  - Usado para implementar a funcionalidade do Paint no portfolio

## 📝 Documentação Adicional

Veja a pasta [docs/](./docs/) para documentação detalhada sobre implementações e features do projeto.

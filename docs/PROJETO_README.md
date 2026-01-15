# Portfolio - Windows XP Style

Site de portfólio profissional com tema Windows XP e versão moderna.

## 🗂️ Estrutura do Projeto

```
src/
├── components/
│   ├── Desktop/
│   │   ├── Desktop.tsx
│   │   ├── Desktop.css
│   │   └── index.ts
│   ├── DesktopIcons/
│   │   ├── DesktopIcons.tsx
│   │   ├── DesktopIcons.css
│   │   └── index.ts
│   ├── MinesweeperWindow/
│   │   ├── MinesweeperWindow.tsx
│   │   ├── MinesweeperWindow.css
│   │   └── index.ts
│   ├── ModernPortfolio/
│   │   ├── ModernPortfolio.tsx
│   │   ├── ModernPortfolio.css
│   │   └── index.ts
│   ├── PortfolioWindow/
│   │   ├── PortfolioWindow.tsx
│   │   ├── PortfolioWindow.css
│   │   └── index.ts
│   ├── StartMenu/
│   │   ├── StartMenu.tsx
│   │   ├── StartMenu.css
│   │   └── index.ts
│   ├── Taskbar/
│   │   ├── Taskbar.tsx
│   │   ├── Taskbar.css
│   │   └── index.ts
│   ├── TrashIcon/
│   │   ├── TrashIcon.tsx
│   │   ├── TrashIcon.css
│   │   └── index.ts
│   └── index.ts
├── constants/
│   └── index.ts
├── hooks/
│   ├── useTheme.ts
│   ├── useTime.ts
│   ├── useWindowManager.ts
│   └── index.ts
├── types/
│   └── index.ts
├── utils/
│   └── minesweeperGame.ts
├── App.tsx
└── App.css
```

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 🎨 Personalização

Para personalizar as informações do portfólio, edite o arquivo `src/constants/index.ts`.

Você pode alterar:
- Informações pessoais
- Experiências profissionais
- Habilidades técnicas
- Projetos

## 📝 Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- CSS3 (com variáveis customizadas)
- Lucide React (ícones)

## 🎯 Referências

O design foi inspirado no Windows XP original e no projeto win32.run-main para garantir autenticidade visual e funcional.

## 📄 Licença

Desenvolvido por Gabriel Felipe Vargas Ferreira © 2026

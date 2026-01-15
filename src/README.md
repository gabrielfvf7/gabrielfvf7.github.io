# Estrutura do Projeto - Portfolio Windows XP

Este projeto foi organizado seguindo as melhores práticas de arquitetura React, separando responsabilidades em pastas específicas.

## Estrutura de Pastas

```
src/
├── components/         # Componentes reutilizáveis da interface
│   ├── Desktop.tsx            # Container principal do desktop
│   ├── DesktopIcons.tsx       # Ícones da área de trabalho
│   ├── PortfolioWindow.tsx    # Janela de portfólio com todas as seções
│   ├── StartMenu.tsx          # Menu Iniciar do Windows XP
│   ├── Taskbar.tsx            # Barra de tarefas
│   ├── TrashIcon.tsx          # Ícone da lixeira
│   └── index.ts               # Exportações centralizadas
│
├── constants/          # Dados estáticos e constantes
│   └── index.ts               # Info pessoal, skills, experiências, ícones
│
├── hooks/              # Custom hooks React
│   └── index.ts               # useWindowManager, useStartMenu, useTheme, useTime
│
├── types/              # Definições de tipos TypeScript
│   └── index.ts               # OpenWindow, ExperienceItem, Theme
│
├── App.tsx             # Componente principal (54 linhas)
├── App.css             # Estilos customizados
├── index.css           # Estilos globais + Tailwind
└── main.tsx            # Entry point da aplicação

```

## Componentes

### Desktop (`Desktop.tsx`)
Container principal que envolve toda a aplicação com o gradiente azul do Windows XP.

### DesktopIcons (`DesktopIcons.tsx`)
Renderiza os ícones da área de trabalho (Sobre, Projetos, Experiência, Skills) na lateral esquerda.
- Props: `onIconDoubleClick(tab: string)`

### PortfolioWindow (`PortfolioWindow.tsx`)
Janela principal do portfólio com 4 seções:
- **About**: Informações pessoais e contatos
- **Projects**: Projetos Rango e Minesweeper
- **Skills**: Tecnologias dominadas
- **Experience**: Trajetória profissional

Props: `window`, `index`, `onClose`

### StartMenu (`StartMenu.tsx`)
Menu Iniciar do Windows XP com:
- Itens de navegação (Sobre, Projetos, Experiência, Skills)
- Toggle de tema (XP/95)
- Acesso aos jogos

Props: `isOpen`, `onOpenWindow`, `onToggleTheme`, `theme`

### Taskbar (`Taskbar.tsx`)
Barra de tarefas com:
- Botão Iniciar
- Lista de janelas abertas
- Relógio do sistema

Props: `onStartMenuToggle`, `openWindows`, `onWindowClick`, `currentTime`

### TrashIcon (`TrashIcon.tsx`)
Ícone da lixeira no canto inferior direito.
- Props: `onDoubleClick()`

## Custom Hooks

### useWindowManager()
Gerencia abertura e fechamento de janelas.
- Returns: `{ openWindows, openWindow, closeWindow }`

### useStartMenu()
Controla estado do menu Iniciar.
- Returns: `{ startMenuOpen, toggleStartMenu }`

### useTheme()
Gerencia tema (XP/95).
- Returns: `{ theme, toggleTheme }`

### useTime()
Atualiza horário a cada segundo.
- Returns: `currentTime`

## Constantes

- **PERSONAL_INFO**: Dados pessoais (nome, role, email, github, linkedin, summary)
- **SKILLS**: Array com tecnologias
- **EXPERIENCE**: Array com histórico profissional
- **DESKTOP_ICONS**: Configuração dos ícones do desktop
- **WINDOW_TITLES**: Mapeamento de IDs para títulos

## Tipos TypeScript

### OpenWindow
```ts
{
  id: string;
  title: string;
  tab: string;
}
```

### ExperienceItem
```ts
{
  company: string;
  role: string;
  period: string;
  description: string;
}
```

### Theme
```ts
'xp' | '95'
```

## Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (ícones)

## Build

```bash
npm run build   # Build de produção
npm run dev     # Servidor de desenvolvimento
```

## Características

- ✅ Totalmente tipado com TypeScript
- ✅ Componentes modulares e reutilizáveis
- ✅ Custom hooks para lógica compartilhada
- ✅ Separação clara de responsabilidades
- ✅ Fácil manutenção e escalabilidade
- ✅ Estilo Windows XP autêntico

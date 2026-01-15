# Portfolio - Windows XP Style

Site de portfólio profissional com tema Windows XP e versão moderna.

## ✨ Funcionalidades

### Versão Windows XP
- 🖥️ Interface fiel ao Windows XP
- 🖱️ Ícones no desktop com seleção ao clicar (estilo XP)
- 📋 Menu Iniciar redesenhado com visual autêntico do XP
- 🪟 Janelas arrastáveis e redimensionáveis
- ⏰ Relógio na barra de tarefas
- 🎨 Botão "Iniciar" com cores corretas do Windows XP

### Versão Moderna
- 🌟 Landing page moderna e responsiva
- 📱 Design mobile-first
- 🎨 Gradientes e animações suaves
- 📧 Links para contato e redes sociais
- 🔄 Toggle para alternar entre versões

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
│   ├── StartMenu/
│   │   ├── StartMenu.tsx
│   │   ├── StartMenu.css
│   │   └── index.ts
│   ├── Taskbar/
│   │   ├── Taskbar.tsx
│   │   ├── Taskbar.css
│   │   └── index.ts
│   ├── PortfolioWindow/
│   │   ├── PortfolioWindow.tsx
│   │   ├── PortfolioWindow.css
│   │   └── index.ts
│   ├── TrashIcon/
│   │   ├── TrashIcon.tsx
│   │   ├── TrashIcon.css
│   │   └── index.ts
│   ├── ModernPortfolio/
│   │   ├── ModernPortfolio.tsx
│   │   ├── ModernPortfolio.css
│   │   └── index.ts
│   └── index.ts
├── constants/
│   └── index.ts
├── hooks/
│   └── index.ts
├── types/
│   └── index.ts
├── App.tsx
└── App.css
```

## 🎯 Correções Implementadas

### 1. Ícones do Desktop
- ✅ Agora selecionam com um clique (visual destacado)
- ✅ Duplo clique abre a janela
- ✅ Estado de seleção visual (fundo azul transparente + borda)

### 2. Botão Iniciar
- ✅ Cores corretas do Windows XP (gradiente verde)
- ✅ Ícone do Windows incluído
- ✅ Efeitos hover e active autênticos
- ✅ Fonte e estilo corretos

### 3. Menu Iniciar
- ✅ Tamanho apropriado (460px de largura)
- ✅ Layout em duas colunas (programas + sistema)
- ✅ Cabeçalho azul com informações do usuário
- ✅ Ícones com tamanho correto (32px principais, 24px sistema)
- ✅ Removido botão de tema Windows 95
- ✅ Removida opção "Desligar"
- ✅ Visual fiel ao Windows XP original

### 4. Organização do Projeto
- ✅ Cada componente em sua própria pasta
- ✅ Arquivos CSS separados por componente
- ✅ Índices de exportação para imports limpos
- ✅ Estrutura modular e escalável

### 5. Nova Funcionalidade
- ✅ Versão moderna do site (landing page profissional)
- ✅ Ícone no desktop "Versão Moderna" para alternar
- ✅ Botão na versão moderna para voltar ao XP
- ✅ Mesmas informações em ambas as versões

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

Para personalizar as informações do portfólio, edite o arquivo:
```
src/constants/index.ts
```

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

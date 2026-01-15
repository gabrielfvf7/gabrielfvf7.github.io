# Implementação do Paint (JSPaint)

## 📝 Descrição

Integração completa do JSPaint, um clone open-source do MS Paint clássico do Windows, ao portfolio Windows XP.

## 🎨 Sobre o JSPaint

- **Projeto Original:** https://github.com/1j01/jspaint
- **Autor:** Isaiah Odhner
- **Licença:** MIT
- **Website Demo:** https://jspaint.app

## 🏗️ Arquitetura da Implementação

### Estrutura de Arquivos

```
src/components/PaintWindow/
├── PaintWindow.tsx          # Componente principal
├── PaintWindow.css          # Estilos da janela
├── usePaintWindow.ts        # Hook com lógica de estado
└── index.ts                 # Exports

public/jspaint/              # Aplicação JSPaint completa
├── index.html
├── styles/
├── images/
└── ...                      # Arquivos do JSPaint
```

### Componentes

#### PaintWindow.tsx
```tsx
// Janela que renderiza o JSPaint via iframe
- Integração via iframe apontando para /jspaint/index.html
- Controles de janela (minimizar, maximizar, fechar)
- Suporte a drag and drop
- Sistema de z-index para prioridade de janelas
```

#### usePaintWindow.ts
```tsx
// Hook customizado com toda a lógica de estado
- Gerenciamento de estado (maximizado, posição)
- Integração com useDraggable para arrastar janela
- Controle de carregamento do iframe
- Funções de maximizar/minimizar/restaurar
```

## 🔧 Implementação Técnica

### 1. Integração via Iframe

O JSPaint é carregado como uma aplicação independente dentro de um iframe:

```tsx
<iframe
  ref={iframeRef}
  src="/jspaint/index.html"
  title="Paint"
  className="paint-iframe"
  onLoad={() => setIframeLoaded(true)}
/>
```

### 2. Aplicação de Tema

Após o carregamento do iframe, aplicamos o tema clássico:

```tsx
useEffect(() => {
  if (iframeLoaded && iframeRef.current?.contentWindow) {
    const contentWindow = iframeRef.current.contentWindow;
    
    setTimeout(() => {
      if ('set_theme' in contentWindow) {
        contentWindow.set_theme("classic.css");
      }
    }, 100);
  }
}, [iframeLoaded]);
```

### 3. Integração com o Sistema de Janelas

- **Desktop Icons:** Ícone do Paint adicionado ao desktop
- **Window Manager:** Paint registrado no sistema de gerenciamento de janelas
- **Taskbar:** Botão do Paint aparece na barra de tarefas quando aberto

## 🎯 Funcionalidades

### Funcionalidades do JSPaint

- ✏️ Ferramentas de desenho (lápis, pincel, aerógrafo)
- 🎨 Seletor de cores
- 📐 Formas geométricas (retângulo, elipse, linha)
- ✂️ Ferramentas de seleção e transformação
- 🔤 Ferramenta de texto
- 🎭 Suporte a transparência
- 💾 Salvar/Abrir imagens (download browser)
- ↩️ Desfazer/Refazer
- 🔍 Zoom in/out

### Funcionalidades da Integração

- 🪟 Janela redimensionável e arrastável
- ⬆️ Maximizar/Minimizar
- 📌 Z-index dinâmico (janela vem pra frente ao clicar)
- 🎨 Tema clássico do Windows aplicado automaticamente
- 📱 Responsivo ao tamanho da janela

## 💡 Decisões de Design

### Por que Iframe?

1. **Isolamento:** O JSPaint roda em seu próprio contexto, sem conflitos com o resto da aplicação
2. **Simplicidade:** Não requer integração profunda no bundle do React
3. **Manutenibilidade:** Fácil de atualizar copiando nova versão do JSPaint
4. **Performance:** Carregamento lazy quando a janela é aberta

### Limitações Conhecidas

- **Comunicação limitada:** Devido ao iframe, algumas integrações avançadas (como salvar no "sistema de arquivos virtual") não foram implementadas
- **Tema fixo:** O tema é aplicado programaticamente e não pode ser facilmente alternado
- **Responsividade:** O JSPaint tem tamanho mínimo que pode não ser ideal em telas muito pequenas

## 🔄 Processo de Atualização

Para atualizar o JSPaint para uma versão mais recente:

1. Baixe a versão mais recente do JSPaint
2. Substitua o conteúdo da pasta `public/jspaint/`
3. Teste a integração e verifique se o tema ainda funciona
4. Atualize esta documentação se houver mudanças

## 📚 Referências

- [JSPaint Repository](https://github.com/1j01/jspaint)
- [JSPaint Demo](https://jspaint.app)
- [Documentação Windows XP](https://docs.microsoft.com/en-us/previous-versions/windows/)

## 🙏 Créditos

Todo o mérito da implementação do Paint vai para Isaiah Odhner e contributors do projeto JSPaint. Esta integração apenas embute o trabalho incrível deles em um contexto de portfolio.

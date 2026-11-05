# SnowLands — site do TCC

Projeto inicial em React + Vite + Tailwind CSS + Framer Motion.

## Como executar

1. Instale o Node.js (versão LTS).
2. Extraia a pasta `snowlands`.
3. Abra a pasta no VS Code.
4. No terminal, execute:

```bash
npm install
npm run dev
```

5. Abra o endereço local mostrado pelo Vite (normalmente http://localhost:5173).

Para testar a versão de produção:

```bash
npm run build
npm run preview
```

## Onde trocar/adicionar imagens

Todas as imagens ficam em `public/images/`.

- `penguin.png`: personagem principal original enviado pelo grupo (já incluído).
- `penguin-with-sword-reference.png`: segunda imagem enviada, usada como referência visual (já incluída).
- `sword.png`: coloque aqui a imagem isolada da espada.
- `heart.png`: opcional, ícone de coração. Se não adicionar, o site usa um coração vetorial.
- `healing-item.png`: imagem isolada do artefato de cura.
- `team/integrante-1.jpg` até `integrante-4.jpg`: fotos dos quatro integrantes.

Os caminhos já estão configurados no `src/App.jsx`. Mantenha os nomes dos arquivos para aparecerem automaticamente.

## Onde editar os textos

Abra `src/App.jsx`:
- `team`: nomes, funções e descrições dos quatro integrantes.
- Componente `About`: história, gênero, plataforma e objetivo do jogo.

As seções de missão, propósito, impacto ambiental e potencial de mercado ficam em
`src/App.jsx`. Os conteúdos de impacto e de mercado são demonstrativos e não
representam funcionalidades ou resultados reais do jogo.

## Observação sobre a animação

A seção do personagem usa `useScroll` e `useTransform` do Framer Motion. O personagem começa à direita e vai para o centro conforme a rolagem. A espada, o coração e o artefato de cura têm movimento flutuante próprio e acompanham o deslocamento do personagem.

A espada deve ser fornecida como imagem separada (`sword.png`) para animar a saída das costas com precisão. O sprite enviado com espada foi preservado como referência, sem substituir o personagem principal original.

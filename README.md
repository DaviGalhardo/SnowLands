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


## Deploy

### Tecnologia e destino

Frontend React 19 + Vite 7, Tailwind CSS 4, Framer Motion e Lucide React.
O site está na raiz deste repositório. Não há backend, banco de dados ou React
Router. A navegação usa âncoras e a leitura de `window.location.pathname` para
exibir a página `download`.

- Public Path / Vite `base`: `/tecti/2026/gpec15/snowlands/`.
- React Router basename: não se aplica.
- Build: `npm run build`; saída: `dist/`.
- Apache: `public/.htaccess` é copiado para `dist/.htaccess` e encaminha somente
  `download` e `download/` para `index.html`. Arquivos físicos são preservados;
  recursos e páginas inexistentes continuam retornando 404.
- Node.js é usado apenas localmente. Nenhum processo Node é necessário na Hostinger.
- O domínio institucional não foi informado. Nos exemplos abaixo,
  `<dominio-institucional>` deve ser substituído pelo domínio real; não é um link pronto.

A base está em `vite.config.js`. Imagens, navegação e download em `src/App.jsx`
usam `import.meta.env.BASE_URL`. Os favicons do HTML são ajustados pelo próprio
Vite no build. Se o destino mudar, atualize a base e o `RewriteBase` do
`public/.htaccess`, gere novamente o build e confira os links.

### Preparação local

1. Abra no VS Code a pasta `SnowLands`, que contém `package.json` e `vite.config.js`.
2. Use Node.js 24.12 ou posterior da linha 24 para também atender à dependência
   opcional de Linux registrada no lockfile. Esta auditoria gerou o build no Windows
   com Node 24.11.1 e npm 11.13.0. O Vite instalado declara Node
   `^20.19.0 || >=22.12.0`; algumas dependências opcionais têm requisito maior.
3. Para uma instalação reproduzível a partir do lockfile, execute:

```bash
npm ci
npm run build
npm run preview -- --host 127.0.0.1
```

`npm install` também foi executado com sucesso nesta auditoria, sem alterar o
lockfile. Os scripts originais foram preservados e nenhuma dependência foi adicionada.

4. Abra `http://127.0.0.1:4173/tecti/2026/gpec15/snowlands/` (ou a porta indicada
   no terminal). Teste também `download` e `download/` nessa subpasta. Não abra
   `dist/index.html` por `file://`. Encerre o preview com Ctrl+C ao terminar.
5. Confira estilos, imagens, fontes, animações, menu móvel, âncoras e o botão
   **BAIXAR JOGO**. As fontes DM Sans e Press Start 2P continuam usando Google
   Fonts e dependem de acesso externo. Não há vídeos nem áudios referenciados no site.
6. Publique o **conteúdo de `dist/`**, e não a pasta `dist` como subdiretório.

O build exclui automaticamente da saída `_redirects` (regra de outra hospedagem)
e os três arquivos `COLOQUE_AQUI_*.txt`. Os originais permanecem em `public/`
para desenvolvimento. Imagens, textos e estilos não foram substituídos.

### Transferência pelo FileZilla

Use as credenciais já fornecidas pela instituição; não é necessário alterar
permissões ou configurações do servidor.

1. No painel local, abra `SnowLands/dist/`.
2. No painel remoto, abra o diretório já configurado pela instituição que corresponde
   à URL `/tecti/2026/gpec15/snowlands/`. O caminho físico/raiz mostrado pelo FTP
   pode ser diferente do caminho público; não presuma `public_html` nem crie
   diretórios duplicados se a conta já abrir na pasta do grupo.
3. Selecione `index.html`, `.htaccess`, `assets/`, `images/` e `downloads/`.
   Confirme que o arquivo oculto `.htaccess` está incluído.
4. Transfira em modo binário ou automático. Não envie `src/`, `node_modules/`,
   `.git/`, `.env`, README, configurações, lockfile ou arquivos temporários.
5. Aguarde a fila ficar vazia, confira a aba de transferências malsucedidas e
   confirme os nomes e tamanhos no painel remoto. Não sobrescreva pastas de outros grupos.
6. A demonstração já está no build: **não exige transferência separada**.

Estrutura esperada no diretório público:

```text
/tecti/2026/gpec15/snowlands/
├── index.html
├── .htaccess
├── assets/
├── images/
└── downloads/
    └── SnowLands.zip
```

### Demonstração e integridade

- Arquivo real: `SnowLands.zip` (extensão `.zip`).
- Origem: `public/downloads/SnowLands.zip`.
- Tamanho: **9.979.310 bytes** (aproximadamente 9,52 MiB).
- Saída: `dist/downloads/SnowLands.zip`; incluído no build: **SIM**.
- Transferência separada necessária: **NÃO**.
- Destino público: `/tecti/2026/gpec15/snowlands/downloads/SnowLands.zip`.
- URL esperada: `https://<dominio-institucional>/tecti/2026/gpec15/snowlands/downloads/SnowLands.zip`.
- Botão: `href={`${baseUrl}downloads/SnowLands.zip`}` em `src/App.jsx`, com
  `download="SnowLands.zip"`. Respeite exatamente maiúsculas e minúsculas.
- Nenhum executável do jogo foi aberto ou executado; o ZIP não foi modificado.

SHA-256 do arquivo original, da cópia no build e dos bytes baixados por HTTP local:

```text
3DB627B559D4B202A891E07648614D005B3238C0EDC85CEFBF941C6883229C0A
```

Depois do upload, abra a página `download`, clique em **BAIXAR JOGO** e confirme
que o resultado é um ZIP de 9.979.310 bytes, não uma página HTML. Compare o hash
no PowerShell (substitua o caminho pelo arquivo efetivamente baixado):

```powershell
Get-FileHash -LiteralPath 'CAMINHO_DO_ARQUIVO_BAIXADO/SnowLands.zip' -Algorithm SHA256
```

Se o arquivo for substituído por uma nova versão, gere o build novamente e
atualize o tamanho e o hash nesta documentação. Para uma versão futura grande
mantida fora do Git, documente explicitamente seu envio separado para `downloads/`;
este procedimento não é necessário para o ZIP atual.

### Verificações realizadas e pendências

Auditoria em 24/11/2026: **PRONTO COM PENDÊNCIAS de validação visual e pós-upload**.

- `npm install`: concluído; npm reportou zero vulnerabilidades.
- `npm run build`: concluído, com `index.html`, CSS, JavaScript, imagens, ZIP e `.htaccess`.
- Preview Vite em 127.0.0.1:4173 e Apache local isolado em 127.0.0.1:4174:
  página inicial, `download` e `download/` responderam HTTP 200.
- Todos os arquivos públicos do build (exceto `.htaccess`, que não deve ser
  servido ao visitante) foram obtidos por HTTP nos dois servidores e comparados
  byte a byte com a saída local.
- ZIP baixado por HTTP nos dois servidores: `application/zip`, tamanho e SHA-256
  iguais ao original. Integridade interna do ZIP verificada sem executar o jogo.
- Apache local: imagem, ZIP e página inexistentes responderam 404.
- Referências de imagens e download conferidas com comparação sensível a
  maiúsculas/minúsculas. Não foram encontrados caminhos locais Windows ou
  referências de produção a localhost no código do site.
- Validação em Linux real não realizada; paths foram conferidos, e o Apache
  testado é local no Windows.
- A autorização da ferramenta de controle do navegador expirou. Layout,
  responsividade, execução visual das animações, console, carregamento real de
  Google Fonts e clique do botão no navegador permanecem pendentes.
- Links externos de conteúdo foram preservados, sem validação de disponibilidade.
- O teste HTTP local não substitui o teste na Hostinger. Nenhum FTP foi acessado,
  nenhum deploy, commit ou push foi realizado.

### Testes após publicação

1. Abra `https://<dominio-institucional>/tecti/2026/gpec15/snowlands/`.
2. Confira estilos, favicons, fontes e todas as imagens, incluindo fotos da equipe.
3. Role a página e confira animações; não há vídeos no código atual.
4. Teste âncoras, navegação para download, retorno ao site e menu em tela pequena.
5. Atualize a página inicial e abra/atualize diretamente `download` e `download/`.
6. Clique em **BAIXAR JOGO**, confira tamanho e SHA-256 conforme acima.
7. Abra Console e Rede nas ferramentas do navegador; recarregue e procure erros
   JavaScript, respostas 404, recursos ausentes e falhas nas fontes externas.
8. Se `/download` falhar, confirme primeiro a transferência de `.htaccess`.
   Se o arquivo estiver presente e a regra não for aceita, registre o erro com a
   instituição; não altere permissões nem configurações da Hostinger.

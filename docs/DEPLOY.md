# Portfólio · deploy e edição

Este repositório (`thiagoambiel/thiagoambiel`) tem duas funções:

- `README.md` na raiz: aparece no perfil do GitHub.
- `site/`: o portfólio, um site estático (HTML, CSS e JS puros, sem build) publicado na Vercel.

## Estrutura

```
README.md                  perfil do GitHub
docs/DEPLOY.md             este guia
site/index.html            página única
site/404.html              página de erro
site/assets/css/style.css  estilos
site/assets/js/main.js     dados dos projetos + interações
site/assets/img/           figuras dos projetos (JPG/SVG)
site/assets/video/         exemplos do Neural Atlases (MP4, em loop)
site/favicon.svg, og.png   ícone e imagem de compartilhamento (1200×630); og.png também é o banner do README
site/robots.txt, sitemap.xml
site/vercel.json           cache, cabeçalhos de segurança, URLs limpas e regra para ignorar builds
```

## Criar o repositório

1. No GitHub, crie um repositório **público** chamado exatamente `thiagoambiel`. Repositório com o mesmo nome do usuário é o que faz o README aparecer no perfil.
2. Envie esta pasta (`thiagoambiel/`, que é a raiz do repositório):

```bash
git init -b main
git add .
git commit -m "Portfólio e README do perfil"
git remote add origin git@github.com:thiagoambiel/thiagoambiel.git
git push -u origin main
```

## Publicar na Vercel

1. Em vercel.com → *Add New → Project*, importe `thiagoambiel/thiagoambiel`.
2. **Root Directory: `site`**. Só essa pasta é publicada; o README e `docs/` não viram páginas.
3. *Framework Preset*: **Other**. Deixe build e output em branco.
4. Deploy.

## Domínio thiagoambiel.com.br

O site já está configurado para `https://thiagoambiel.com.br`: link canônico, `og:url`, `og:image` absoluta, `sitemap.xml` e os links do README.

1. Na Vercel, abra o projeto → *Settings → Domains* e adicione `thiagoambiel.com.br` e `www.thiagoambiel.com.br`. Escolha redirecionar o `www` para o domínio sem `www`.
2. No painel onde o domínio está registrado (Registro.br ou outro DNS), crie os registros que a Vercel mostrar. Normalmente são:
   - `A` em `@` apontando para o IP indicado pela Vercel;
   - `CNAME` em `www` apontando para o host indicado pela Vercel.

   Outra opção é trocar os servidores DNS do domínio para os da Vercel (`ns1.vercel-dns.com` e `ns2.vercel-dns.com`).
3. Espere a Vercel marcar o domínio como válido. O certificado HTTPS é emitido automaticamente.
4. Para conferir a prévia de compartilhamento, cole o link no [Post Inspector do LinkedIn](https://www.linkedin.com/post-inspector/).

`site/vercel.json` tem `ignoreCommand: git diff --quiet HEAD^ HEAD -- .`: commits que não mexem em `site/` (como editar só o README) não geram novo deploy.

**Pela CLI**, de dentro de `site/`:

```bash
cd site
npx vercel          # preview
npx vercel --prod   # produção
```

## Testar localmente

```bash
cd site
python3 -m http.server 8000
# abra http://localhost:8000
```

## Editar conteúdo

Tudo fica no topo de `site/assets/js/main.js`:

- `P`: projetos (nome, área, métrica, problema, solução, resultado).
- `ORDER` e `SHOW`: ordem da lista e quantos aparecem antes de "Mais trabalhos".
- `SRC`: links de fonte de cada projeto (código, artigo, demo, DOI).
- `PRESS`: matérias na imprensa.
- `IMG`, `VID`, `COL`: figuras, vídeos e cor de fundo de cada projeto.

Ao mudar projetos ou links no site, lembre de atualizar também a tabela do `README.md`.

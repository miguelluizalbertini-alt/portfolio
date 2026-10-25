# Portfólio — Miguel Albertini

Versão estática do código fornecido, sem WordPress, PHP, banco de dados ou etapa de build. Inclui todas as 11 imagens e os 9 vídeos locais. Mantém layout, animações de entrada, modal YouTube/MP4, Color Breakdown sincronizado, responsividade e contatos. Os textos do site permanecem no idioma original.

## Estrutura

- `index.html`: conteúdo e links.
- `assets/css/style.css`: layout e responsividade.
- `assets/js/main.js`: modal, mapa dos vídeos, comparador e animações.
- `assets/images/`: logo, retrato e thumbnails.
- `assets/videos/`: MP4.
- `.nojekyll`: publicação direta dos arquivos estáticos.
- `CNAME`: domínio `miguelalbertini.com.br`.

Os caminhos relativos funcionam tanto em um subdiretório de repositório como na raiz do domínio. Google Fonts e os vídeos incorporados do YouTube ainda usam internet. As mídias locais não dependem da instalação WordPress.

## Conferir no computador

Abra `index.html` no navegador. Para testar por HTTP, se tiver Python instalado, abra um terminal nesta pasta, execute `python -m http.server 8000` e visite `http://localhost:8000`. Confira cards, reprodução, fechamento por X/Escape/clique fora, slider Color Breakdown e largura de celular. O autoplay silencioso depende das políticas do navegador.

## 1. Criar repositório e subir arquivos

Recomendado: GitHub Desktop, pois vários vídeos excedem o limite de upload pelo navegador (25 MiB). Todos os arquivos deste pacote devem ficar abaixo do limite de 100 MiB por arquivo do Git. Não use Git LFS para este site.

1. Entre no GitHub e clique em **New repository**.
2. Nome sugerido: `portfolio`. Escolha **Public** para usar Pages no plano gratuito. Crie vazio, sem README automático.
3. No GitHub Desktop, entre na conta e escolha **File → Clone repository**, selecione o repositório criado e uma pasta local.
4. Extraia o ZIP e copie **o conteúdo** da pasta `portfolio-github-pages` para a pasta clonada. O `index.html` deve ficar na raiz, não dentro de outra pasta. Inclua `.nojekyll` e `CNAME`. Não envie o ZIP.
5. No Desktop, escreva `Adicionar portfolio estatico` no resumo, clique em **Commit to main**, depois **Push origin** (ou **Publish branch**, se exibido).
6. Confira no GitHub se `index.html` e `assets` estão na raiz.

Alternativa com Git, dentro da pasta extraída (substitua SEU-USUARIO):

```sh
git init
git add .
git commit -m "Adicionar portfolio estatico"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/portfolio.git
git push -u origin main
```

Não é necessário instalar Node.js, npm ou WordPress.

## 2. Habilitar GitHub Pages

No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**. Escolha **main** e **/(root)**; salve. Acompanhe a publicação em **Actions**.

Para testar primeiro em `https://SEU-USUARIO.github.io/portfolio/`, remova temporariamente `CNAME` do repositório e deixe **Custom domain** vazio. Restaure o arquivo na etapa seguinte. O pacote já inclui CNAME para quem vai conectar o domínio diretamente.

## 3. Conectar o domínio

Em **Settings → Pages → Custom domain**, informe `miguelalbertini.com.br` e salve **antes** de apontar o DNS. Confira que o arquivo CNAME contém apenas esse nome. Se o GitHub criar um commit, use **Fetch/Pull** no Desktop antes das próximas alterações.

## 4. Configurar DNS no Registro.br

Entre em [Registro.br](https://registro.br), selecione `miguelalbertini.com.br` e abra **DNS → Configurar zona DNS**, em modo **Avançado**. Se estiver em modo Básico, solicite a mudança e aguarde o prazo mostrado no painel.

Essas etapas valem quando o domínio usa os servidores DNS do Registro.br. Se o DNS estiver em outro provedor, edite a zona lá ou migre os registros existentes antes de escolher **Utilizar DNS do Registro.br**. Preserve registros de e-mail, como MX e TXT.

Adicione as entradas abaixo. Na raiz do Registro.br, deixe o campo **Nome** vazio; a tabela usa `(vazio)` apenas como indicação, não como texto a digitar.

| Tipo | Nome | Dados |
| --- | --- | --- |
| A | (vazio) | 185.199.108.153 |
| A | (vazio) | 185.199.109.153 |
| A | (vazio) | 185.199.110.153 |
| A | (vazio) | 185.199.111.153 |
| CNAME | www | SEU-USUARIO.github.io |

Substitua SEU-USUARIO pelo login real do GitHub. O CNAME de www não recebe `https://` nem `/portfolio`. Substitua registros antigos conflitantes de A/AAAA da raiz e de www; não apague outros serviços. Não crie CNAME na raiz nem wildcard.

Salve, aguarde propagação e volte a **Settings → Pages**. Quando o certificado estiver disponível, marque **Enforce HTTPS**. A propagação e a disponibilidade do HTTPS podem levar até 24 horas. Verifique tanto `https://miguelalbertini.com.br` como `https://www.miguelalbertini.com.br`.

## Manutenção

Edite conteúdo em `index.html`, aparência em `assets/css/style.css` e vídeos dos cards no objeto `portfolioAssets` de `assets/js/main.js`. Os dois vídeos do Color Breakdown são definidos no HTML; mantenha a mesma duração e alinhamento entre eles. Preserve letras maiúsculas/minúsculas dos nomes dos arquivos. Faça commit e push para atualizar o site.

Os vídeos `AUDIO-OK-REELS-ICP.mp4` e `Almondega_Web_1080p.mp4` foram recodificados em cópias H.264/AAC para caber no GitHub. Os originais da instalação local não foram alterados; os demais arquivos de mídia foram copiados. Não inclua os originais grandes no repositório. Para tráfego alto, considere hospedar vídeos em um serviço dedicado.

## Referências oficiais

- [Criar um site GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configurar a origem da publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Limites de arquivos no GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [Domínio personalizado e DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [DNS do Registro.br](https://registro.br/tecnologia/caracteristicas-tecnicas/)

Nenhuma publicação ou mudança de DNS foi feita durante a preparação deste pacote.

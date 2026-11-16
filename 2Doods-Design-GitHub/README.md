# Site institucional da 2Doods Design

Site institucional da 2Doods Design, com apresentação da equipe, serviços, projetos e canais de contato. O GitHub Pages publica os arquivos estáticos diretamente.

## Enviar os arquivos pelo navegador

1. Extraia `2Doods-Design-GitHub.zip` e abra a pasta extraída. Você deve ver `index.html`, `README.md`, `.nojekyll` e a pasta `assets/` no mesmo nível.
2. Abra seu repositório no GitHub. Na aba **Code**, selecione **Add file → Upload files**. Em um repositório vazio, use o link **uploading an existing file**.
3. Selecione tudo **dentro** da pasta extraída e arraste para a área de upload. Envie `assets/` como pasta, preservando suas subpastas. Na lista do GitHub, confira se `index.html` aparece na raiz do repositório.
4. Salve o envio em **Commit changes**. Se o repositório exigir uma pull request, conclua o merge na branch que será publicada.

[Guia do GitHub para enviar arquivos pelo navegador](https://docs.github.com/pt/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

## Publicar no GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch que recebeu os arquivos, geralmente `main`, escolha **/(root)** e clique em **Save**.
4. Quando a publicação terminar, abra o endereço exibido em **Settings → Pages**.

[Guia do GitHub para configurar a origem do Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Rodar a prévia local

Com Node.js instalado, abra o terminal na pasta do projeto e rode o comando:

```sh
node preview.mjs
```

Abra a [prévia local](http://127.0.0.1:4173/). Para rever a abertura, use uma nova janela anônima. Para ir direto a uma seção, use uma âncora como [Projetos](http://127.0.0.1:4173/#projetos).

## Editar o site

- `index.html` reúne textos, perfis, casos e contatos. As bios estão nos blocos `#reine`, `#diogo` e `#eduardo`.
- `site.css` controla o layout e a adaptação ao tamanho da tela. `intro.css` e `intro.js` controlam a abertura com o símbolo oficial v6.
- `assets/brand/` reúne os vetores da marca, as fontes Inter e a licença das fontes. `assets/portfolio/` contém as peças exibidas nos cards.
- `preview.mjs` serve a prévia local. `.nojekyll` sinaliza ao GitHub Pages que o site está pronto para ser servido como arquivos estáticos.

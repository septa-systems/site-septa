# Imagem de compartilhamento

`public/compartilhar.png` (1200x630) é a imagem que aparece na prévia do link no WhatsApp, Instagram, LinkedIn e Facebook. Ela não aparece dentro do site.

Para mudar: edite `compartilhar.html` (usa as fontes do `node_modules`) e gere o PNG de novo com o Edge:

```sh
msedge --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 \
  --virtual-time-budget=3000 --screenshot="public/compartilhar.png" \
  "file:///CAMINHO/site-septa/docs/projeto/compartilhar/compartilhar.html"
```

Depois de publicar, os apps guardam a prévia antiga por um tempo. Para atualizar, use o [Post Inspector do LinkedIn](https://www.linkedin.com/post-inspector/) ou o [Depurador do Facebook](https://developers.facebook.com/tools/debug/).

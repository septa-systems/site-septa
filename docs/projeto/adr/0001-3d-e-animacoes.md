# ADR 0001: 3D e animações com JavaScript no site da Septa

Status: proposta · Data: 24/11/2026

## Contexto

O `CLAUDE.md` do modelo-site pede para evitar JavaScript no navegador e ter nota 90+ no Lighthouse. O visual aprovado do site da Septa tem um logo em 3D (Three.js), uma rede de conexões no fundo (canvas), cartões que inclinam com o mouse e um painel que se endireita ao rolar. Isso só funciona com JavaScript.

O site da Septa é a vitrine do que a gente sabe fazer, então o efeito visual faz parte do produto.

## Decisão

Usar JavaScript **só** nessas 4 partes, com estas regras:

1. Three.js pelo `npm` (vai no build), importado só no `logo3d.ts`.
2. O 3D baixa **depois** que a página carregou (`requestIdleCallback`/evento `load`), para não atrasar o título.
3. O logo plano (SVG) aparece primeiro e fica se não houver WebGL.
4. Pixels limitados (`devicePixelRatio` até 2 no 3D e 1,5 na rede) e menos pontos no celular.
5. Tudo pausa fora da tela e com a aba em segundo plano.
6. Com "menos movimento" ligado, tudo anda mais devagar e sem flutuar (o PC do Tech lead vem assim do Windows).
7. O resto do site (FAQ, menu, seções) continua sem JS.

## O que sacrificamos

- Mais peso na página (Three.js tem por volta de 150 KB comprimido).
- Mais código para manter do que um site estático comum.
- Mais risco de não bater o Desempenho 90, por isso o CT09 é medido em todo PR.

## Alternativas consideradas

- **Só CSS 3D:** leve, mas não faz as esferas com luz nem o arrastar com inércia.
- **Vídeo ou GIF do logo girando:** sem JS, mas pesado, sem interação e borrado em tela grande.
- **Sem 3D:** mais simples, mas o Tech lead pediu o visual de tecnologia e aprovou o rascunho.

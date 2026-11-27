# ADR 0003: Títulos em Manrope

Status: aceita · Data: 27/11/2026 · Substitui a fonte dos títulos da [ADR 0002](0002-marca-do-site.md)

## Contexto

Uma revisão do visual sugeriu refinar o site (fonte, fundo, cartões, botões, cores). Montamos uma página para comparar três versões: o site atual, o site atual só com a fonte nova e a proposta completa. O Tech lead preferiu a versão do meio: tudo igual, só os títulos em Manrope.

## Decisão

- Títulos em **Manrope** (no lugar da Lexend), com os mesmos pesos de antes.
- Texto continua em **Inter**. O nome **SEPTA** do logo continua em **Outfit**.
- Cores, fundo, efeitos e textos continuam como na ADR 0002.
- A fonte fica no próprio site (`@fontsource-variable/manrope`), sem Google Fonts.

## O que sacrificamos

- Os PDFs e banners feitos com Lexend ficam diferentes do site até serem refeitos.
- O resto da proposta de refinamento (fundo mais leve, cartões e botões novos) fica de fora por enquanto. Se o time quiser, entra em outra ADR.

## Próximo passo

Atualizar a marca no manual (`septa-handbook`) e no `CLAUDE.md` dos modelos, em outro PR.

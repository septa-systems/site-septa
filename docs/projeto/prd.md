# PRD: Site da Septa Systems

Status: rascunho · Responsável: Tech lead · Data: 24/11/2026

> Base: o rascunho visual aprovado pelo Tech lead em 24/11/2026 (`docs/projeto/rascunho-visual.html`). O código do site segue esse visual e os textos dele.

## Problema

A Septa vende sites, sistemas e automações para pequenos negócios, mas **não tem site**. Quando um sócio aborda um cliente (funil de vendas, lista do Google Maps), o cliente não tem onde conferir quem somos, o que fazemos e como trabalhamos. Para uma empresa que vende site, não ter um passa pouca confiança.

## Como medir o sucesso

- **Contatos:** quantas conversas no WhatsApp começam com "Vim pelo site". É a mensagem pronta do formulário de contato.
- **Na venda:** o sócio de vendas manda o link na abordagem, e o cliente abre e responde.

**Meta de usabilidade:** "9 de 10 donos de pequeno negócio entendem o que a Septa faz e abrem o WhatsApp em até 30 segundos, pelo celular".

## Solução

Site institucional de **uma página longa** no `modelo-site` (Astro + Cloudflare), com visual de tecnologia: fundo escuro com rede de conexões, logo da Septa em 3D na abertura e um painel de sistema de exemplo.

1. **Topo:** logo e menu (Serviços, Sistemas, Como funciona, Portfólio, Sobre). Sem botão no canto.
2. **Abertura:** "O time de tecnologia do seu negócio.", botões "Fale com a gente" e "Conheça nossos serviços" e o logo em 3D (7 esferas) que gira e pode ser arrastado.
3. **Serviços:** 6 cartões (sites institucionais, landing pages, sistemas sob medida, automações, manutenção e suporte, "tem outra ideia?").
4. **Sistemas:** painel de exemplo (números do dia, gráfico da semana, origem dos clientes, próximos horários, mensagens automáticas), marcado como **dados fictícios**.
5. **Como funciona:** 4 passos (conversa, proposta, desenvolvimento, entrega e suporte).
6. **Portfólio:** o próprio site da Septa e espaços para os próximos projetos.
7. **Sobre nós:** "Somos 7, e o cliente fica no centro", missão e os 4 valores.
8. **Perguntas frequentes:** preço, prazo, suporte, "não entendo de tecnologia", atendimento a distância.
9. **Contato:** WhatsApp, e-mail, Instagram e um formulário que **monta a mensagem e abre o WhatsApp** (não guarda nada).
10. **Rodapé:** logo, links, política de privacidade e CNPJ (quando tiver).

## Usuários

| Papel                       | O que faz no site                               | Aparelho     |
| --------------------------- | ----------------------------------------------- | ------------ |
| Dono de pequeno negócio     | entende o que a Septa faz e chama no WhatsApp   | celular      |
| Cliente abordado pela Septa | confere se a empresa é séria depois da mensagem | celular      |
| Sócio da Septa (vendas)     | manda o link na abordagem e mostra o portfólio  | celular e PC |

## Glossário

| Termo              | Significado                                                       |
| ------------------ | ----------------------------------------------------------------- |
| Site institucional | Site com várias seções que apresenta a empresa                    |
| Landing page       | Página única para vender um produto ou campanha                   |
| Sistema sob medida | Programa feito para o jeito de trabalhar de um cliente            |
| Manutenção         | Plano mensal: site no ar, atualizado, com backup e ajustes        |
| Painel de exemplo  | Imagem de um sistema com dados fictícios, só para mostrar a ideia |

## Histórias de usuário

1. Como dono de negócio, quero entender em poucos segundos o que a Septa faz para saber se ela resolve meu problema.
2. Como dono de negócio, quero ver como seria um sistema para imaginar ele no meu negócio.
3. Como dono de negócio, quero saber quanto custa e quanto tempo leva antes de chamar.
4. Como dono de negócio, quero mandar uma mensagem sem precisar explicar tudo de novo no WhatsApp.
5. Como sócio de vendas, quero um link bonito e rápido para mandar na abordagem.

## Módulos

| Módulo                     | Recebe                                         | Devolve                                    |
| -------------------------- | ---------------------------------------------- | ------------------------------------------ |
| `src/config/site.ts`       | dados da Septa (contatos, menu, serviços, FAQ) | usado por todas as seções                  |
| Seções (`src/components/`) | dados do `site.ts`                             | HTML de cada seção                         |
| `Logo3D`                   | nada                                           | logo em 3D; sem WebGL, mostra o logo plano |
| `FormContato`              | nome, o que precisa, mensagem                  | abre o `wa.me` com a mensagem pronta       |

## Decisões de implementação

- Site **estático**: sem banco e sem login. O formulário **não envia nada para servidor**: monta o texto e abre o WhatsApp.
- Textos e dados num lugar só (`site.ts`). Trocar o WhatsApp ou um preço é mudar uma linha.
- Visual do rascunho aprovado: fundo `#01080A`, verde `#2DD4BF`, azul de apoio `#38BDF8`, **Lexend** nos títulos, **Inter** no texto e **Outfit** só no nome SEPTA do logo. Isso muda a marca do manual (ver ADR 0002 na arquitetura).
- 3D e animações com JavaScript, carregado só quando precisa (ver ADR 0001). Quem tem "menos movimento" ligado no aparelho vê tudo mais devagar, mas não parado.
- O que ainda não foi decidido aparece marcado no código (`PENDENTE`) e **não vai para o ar inventado** (CT06).

## Casos de teste

Site estático: os testes são a checagem do modelo (Prettier, `astro check`, build) mais estes, feitos à mão e no `/revisar-tela`.

| ID   | Cenário                          | Ação                       | Resultado esperado                                                      |
| ---- | -------------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| CT01 | Celular de 360 px                | Abrir o site               | Nada corta nem rola para o lado; o título e o botão aparecem sem rolar  |
| CT02 | Navegador sem WebGL              | Abrir o site               | No lugar do 3D aparece o logo plano; o resto funciona                   |
| CT03 | "Menos movimento" ligado         | Abrir o site               | Animações mais lentas, sem nada piscando ou flutuando                   |
| CT04 | Formulário de contato preenchido | Tocar em "Enviar mensagem" | Abre o `wa.me` com nome, serviço e texto, começando com "Vim pelo site" |
| CT05 | Formulário vazio                 | Tocar em "Enviar mensagem" | Avisa o campo que falta, não abre o WhatsApp                            |
| CT06 | Dado pendente (WhatsApp, preço)  | Rodar o build de produção  | Build falha enquanto houver `PENDENTE`, para nada inventado ir ao ar    |
| CT07 | Página que não existe            | Abrir `/xyz`               | Mostra a 404 com link para o início                                     |
| CT08 | Compartilhar o link no WhatsApp  | Colar o link               | Aparece a prévia com título, descrição e imagem                         |
| CT09 | Celular simples, 4G              | Lighthouse celular         | Desempenho ≥ 90 mesmo com o 3D                                          |

## Fora do escopo

- Cardápio digital ou qualquer produto próprio (tirado do site em 24/11/2026).
- Blog, área do cliente e login.
- Guardar contatos num banco ou mandar e-mail pelo formulário.
- Inglês.

## Dúvidas em aberto

Precisam de resposta antes de ir ao ar (não bloqueiam começar o código):

1. **WhatsApp** da Septa: qual número?
2. **Preço "a partir de"** no FAQ: a tabela (landing page R$ 790, institucional R$ 1.490) ainda vai para votação.
3. **Prazos** de entrega para o FAQ.
4. **Domínio:** comprar `septasystems.com.br`? E o e-mail `contato@septasystems.com.br` só existe depois disso; até lá, `contato.septasystems@gmail.com`.
5. **Instagram:** o `@septasystems` está confirmado?
6. **CNPJ:** só quando abrir a empresa; até lá o rodapé fica sem.

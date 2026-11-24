// Dados do site da Septa. Textos e contatos ficam só aqui.
//
// PENDENTE = ainda não decidido. Na tela aparece "a definir" e o build de
// produção (PRODUCAO=1) falha enquanto existir algum (CT06 do PRD).
export const PENDENTE = "PENDENTE";
export const ehPendente = (valor: string) => valor === PENDENTE;

export const SITE = {
  nome: "Septa Systems",
  slogan: "O time de tecnologia do seu negócio.",
  descricao:
    "Sites, sistemas e automações sob medida para pequenos negócios. Você cuida do negócio, a gente cuida da tecnologia.",
  url: "https://septasystems.com.br", // domínio ainda não comprado (PRD, dúvida 4)
  whatsapp: PENDENTE, // só números, com DDI e DDD. Ex.: 5515999999999
  whatsappVisivel: PENDENTE, // como aparece na tela. Ex.: (15) 99999-9999
  email: "contato.septasystems@gmail.com", // vira contato@septasystems.com.br com o domínio
  instagram: "septasystems", // confirmar o @ (PRD, dúvida 5)
  cnpj: PENDENTE,
};

export const linkWhatsApp = (mensagem: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const MENU = [
  { texto: "Serviços", href: "/#servicos" },
  { texto: "Sistemas", href: "/#sistemas" },
  { texto: "Como funciona", href: "/#como" },
  { texto: "Portfólio", href: "/#portfolio" },
  { texto: "Sobre", href: "/#sobre" },
];

export type NomeIcone =
  | "tela"
  | "blocos"
  | "codigo"
  | "raio"
  | "chave"
  | "mais"
  | "whatsapp"
  | "email"
  | "instagram"
  | "check"
  | "casa"
  | "agenda"
  | "pessoas"
  | "grafico"
  | "engrenagem"
  | "busca";

export const SERVICOS: { icone: NomeIcone; titulo: string; texto: string; tags: string[] }[] = [
  {
    icone: "tela",
    titulo: "Sites institucionais",
    texto:
      "O endereço da sua empresa na internet: quem vocês são, o que fazem e como falar com vocês.",
    tags: ["Celular e computador", "Aparece no Google"],
  },
  {
    icone: "blocos",
    titulo: "Landing pages",
    texto:
      "Uma página feita para vender um produto ou uma campanha, com um só objetivo: trazer contato.",
    tags: ["Campanhas", "Lançamentos"],
  },
  {
    icone: "codigo",
    titulo: "Sistemas sob medida",
    texto:
      "Quando nenhum programa pronto serve, a gente cria o sistema do jeito que o seu negócio funciona.",
    tags: ["Agendas", "Cadastros", "Painéis"],
  },
  {
    icone: "raio",
    titulo: "Automações",
    texto:
      "Tarefas repetidas que passam a acontecer sozinhas: lembretes, mensagens e planilhas que se atualizam.",
    tags: ["WhatsApp", "Planilhas", "Lembretes"],
  },
  {
    icone: "chave",
    titulo: "Manutenção e suporte",
    texto:
      "Seu site ou sistema sempre no ar, atualizado e seguro. Se der problema, você fala com a gente.",
    tags: ["Mensal", "Backup", "Ajustes"],
  },
  {
    icone: "mais",
    titulo: "Tem outra ideia?",
    texto:
      "Conta pra gente o que você precisa. Se dá para resolver com tecnologia, a gente monta um plano.",
    tags: ["Conversa sem compromisso"],
  },
];

export const PASSOS = [
  {
    titulo: "Conversa",
    texto: "Você conta como seu negócio funciona e o que está dando trabalho.",
  },
  { titulo: "Proposta", texto: "Mandamos o que vamos fazer, o prazo e o preço. Sem letra miúda." },
  {
    titulo: "Desenvolvimento",
    texto: "Você acompanha cada etapa e pode pedir ajustes no caminho.",
  },
  {
    titulo: "Entrega e suporte",
    texto: "Colocamos no ar, ensinamos a usar e continuamos por perto.",
  },
];

export const PROJETOS = [
  { titulo: "Site da Septa", tipo: "Site institucional · este site", vazio: false },
  { titulo: "Primeiro cliente", tipo: "Em breve", vazio: true },
  { titulo: "Segundo cliente", tipo: "Em breve", vazio: true },
];

export const VALORES = [
  { titulo: "Cliente no centro", texto: "Toda decisão começa com: isso ajuda o cliente?" },
  {
    titulo: "Simples primeiro",
    texto: "Se não dá para entender em um minuto, está complicado demais.",
  },
  { titulo: "Dono do que faz", texto: "Cada um responde pela sua parte, do começo ao fim." },
  { titulo: "Cuidado com os dados", texto: "Os dados do cliente são dele. A gente protege." },
];

// Preço e prazo do FAQ: PRD, dúvidas 2 e 3.
export const PRECO_SITE_A_PARTIR = PENDENTE; // ex.: "R$ 1.490"
export const PRAZO_SITE = PENDENTE; // ex.: "2 a 3 semanas"

export const SERVICOS_CONTATO = [
  "Site institucional",
  "Landing page",
  "Sistema sob medida",
  "Automação",
  "Manutenção",
  "Ainda não sei",
];

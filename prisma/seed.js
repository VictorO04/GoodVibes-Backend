import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = [
    {
      username: "Murilobmilan",
      email: "murilo.brustolin@gmail.com",
      password: "algumaCoisa",
      anonymous: true,
    },
    {
      username: "Victor",
      email: "victor.algo@gmail.com",
      password: "@senha123",
      anonymous: false,
    },
  ];

  const confession = [
  { message: "Você é meu sorriso preferido.", message_type: "Romantica", sender: 1, recipient: 87 },
  { message: "Sua amizade ilumina meus dias.", message_type: "Amizade", sender: 2, recipient: 14 },
  { message: "Acredite na sua força. Ela é maior do que você pensa.", message_type: "Motivacional", sender: 3, recipient: 55 },
  { message: "Prometo que tento ser sério, mas você complica.", message_type: "Comedia", sender: 4, recipient: 73 },
  { message: "Às vezes, o silêncio fala mais que palavras.", message_type: "Reflexiva", sender: 5, recipient: 12 },
  { message: "Meu coração te escolheu sem pedir permissão.", message_type: "Romantica", sender: 6, recipient: 42 },
  { message: "Obrigado por sempre estar ao meu lado.", message_type: "Amizade", sender: 7, recipient: 99 },
  { message: "Um passo por dia ainda é progresso.", message_type: "Motivacional", sender: 8, recipient: 35 },
  { message: "Eu ia te zoar, mas você faz isso sozinho.", message_type: "Comedia", sender: 9, recipient: 61 },
  { message: "O tempo cura tudo, basta respeitar seu ritmo.", message_type: "Reflexiva", sender: 10, recipient: 83 },
  { message: "Você trouxe cor ao meu mundo.", message_type: "Romantica", sender: 11, recipient: 68 },
  { message: "Ter você como amigo é um presente.", message_type: "Amizade", sender: 12, recipient: 4 },
  { message: "Continue, mesmo cansado. Você vai vencer.", message_type: "Motivacional", sender: 13, recipient: 76 },
  { message: "A culpa é sua se eu sorrio do nada.", message_type: "Comedia", sender: 14, recipient: 52 },
  { message: "Nem todo fim é realmente um fim.", message_type: "Reflexiva", sender: 15, recipient: 94 },
  { message: "Você é o detalhe que faz tudo valer a pena.", message_type: "Romantica", sender: 16, recipient: 27 },
  { message: "Sua amizade me deixa forte.", message_type: "Amizade", sender: 17, recipient: 88 },
  { message: "Nunca subestime sua própria evolução.", message_type: "Motivacional", sender: 18, recipient: 63 },
  { message: "Eu prometi não te irritar… falhei.", message_type: "Comedia", sender: 19, recipient: 21 },
  { message: "Respirar fundo é o primeiro passo para seguir.", message_type: "Reflexiva", sender: 20, recipient: 96 },
  { message: "Você faz meu coração dançar.", message_type: "Romantica", sender: 21, recipient: 11 },
  { message: "Amigos como você são raros.", message_type: "Amizade", sender: 22, recipient: 85 },
  { message: "Seja paciente com você mesmo.", message_type: "Motivacional", sender: 23, recipient: 38 },
  { message: "Meu talento é te fazer rir sem querer.", message_type: "Comedia", sender: 24, recipient: 90 },
  { message: "O universo sabe o que faz.", message_type: "Reflexiva", sender: 25, recipient: 47 },
  { message: "Você é minha melhor história.", message_type: "Romantica", sender: 26, recipient: 53 },
  { message: "Que bom que a vida me deu você.", message_type: "Amizade", sender: 27, recipient: 100 },
  { message: "O amanhã é construído agora.", message_type: "Motivacional", sender: 28, recipient: 32 },
  { message: "Eu sou normal… o mundo que é estranho.", message_type: "Comedia", sender: 29, recipient: 69 },
  { message: "Tudo fica mais claro quando aceitamos o que sentimos.", message_type: "Reflexiva", sender: 30, recipient: 16 },
  { message: "Com você, tudo tem mais cor.", message_type: "Romantica", sender: 31, recipient: 49 },
  { message: "Nossa amizade atravessa qualquer distância.", message_type: "Amizade", sender: 32, recipient: 8 },
  { message: "Você está mais perto do seu sonho do que imagina.", message_type: "Motivacional", sender: 33, recipient: 95 },
  { message: "Eu ia te mandar um abraço, mas fiquei com preguiça.", message_type: "Comedia", sender: 34, recipient: 39 },
  { message: "Às vezes, parar é evoluir.", message_type: "Reflexiva", sender: 35, recipient: 70 },
  { message: "Seu amor acende meu mundo.", message_type: "Romantica", sender: 36, recipient: 3 },
  { message: "Eu confio em você de olhos fechados.", message_type: "Amizade", sender: 37, recipient: 59 },
  { message: "Você tem a força que precisa, mesmo que não sinta.", message_type: "Motivacional", sender: 38, recipient: 19 },
  { message: "Se eu fosse normal, você não ia gostar de mim.", message_type: "Comedia", sender: 39, recipient: 44 },
  { message: "Tudo que vivemos nos transforma.", message_type: "Reflexiva", sender: 40, recipient: 2 },
  { message: "Você é meu abraço preferido.", message_type: "Romantica", sender: 41, recipient: 65 },
  { message: "Você torna a vida mais leve.", message_type: "Amizade", sender: 42, recipient: 25 },
  { message: "Cada esforço seu está te levando além.", message_type: "Motivacional", sender: 43, recipient: 80 },
  { message: "Eu tento ser adulto, mas falho diariamente.", message_type: "Comedia", sender: 44, recipient: 57 },
  { message: "No fundo, tudo se encaixa.", message_type: "Reflexiva", sender: 45, recipient: 13 },
  { message: "Eu te escolheria mil vezes.", message_type: "Romantica", sender: 46, recipient: 81 },
  { message: "Você me faz acreditar em laços verdadeiros.", message_type: "Amizade", sender: 47, recipient: 22 },
  { message: "O impossível é só o possível com medo.", message_type: "Motivacional", sender: 48, recipient: 62 },
  { message: "A vida é curta, mas eu sou mais.", message_type: "Comedia", sender: 49, recipient: 7 },
  { message: "Em cada mudança existe aprendizado.", message_type: "Reflexiva", sender: 50, recipient: 34 },
  { message: "Meu coração reconhece o seu.", message_type: "Romantica", sender: 51, recipient: 30 },
  { message: "Você é a amiga(o) que sempre pedi a Deus.", message_type: "Amizade", sender: 52, recipient: 72 },
  { message: "Seja gentil consigo mesmo durante o caminho.", message_type: "Motivacional", sender: 53, recipient: 18 },
  { message: "Tentando ser adulto nível: impossível.", message_type: "Comedia", sender: 54, recipient: 84 },
  { message: "Tudo tem seu tempo certo.", message_type: "Reflexiva", sender: 55, recipient: 26 },
  { message: "Você é a calmaria do meu caos.", message_type: "Romantica", sender: 56, recipient: 41 },
  { message: "Você merece o mundo todo.", message_type: "Amizade", sender: 57, recipient: 6 },
  { message: "Não pare. Você está evoluindo sem perceber.", message_type: "Motivacional", sender: 58, recipient: 89 },
  { message: "Eu juro que tento ser normal, mas falho.", message_type: "Comedia", sender: 59, recipient: 15 },
  { message: "A vida fala, basta ouvir.", message_type: "Reflexiva", sender: 60, recipient: 71 },
  { message: "Você é meu lar em forma de pessoa.", message_type: "Romantica", sender: 61, recipient: 36 },
  { message: "Obrigado por existir na minha vida.", message_type: "Amizade", sender: 62, recipient: 23 },
  { message: "Lembre-se: você é capaz.", message_type: "Motivacional", sender: 63, recipient: 91 },
  { message: "Se eu cair, me levanta? Não? Então fico no chão mesmo.", message_type: "Comedia", sender: 64, recipient: 54 },
  { message: "A resposta geralmente está dentro da gente.", message_type: "Reflexiva", sender: 65, recipient: 10 },
  { message: "Você é meu destino favorito.", message_type: "Romantica", sender: 66, recipient: 5 },
  { message: "Amigos como você fazem a vida valer.", message_type: "Amizade", sender: 67, recipient: 60 },
  { message: "Você está crescendo, mesmo nos dias difíceis.", message_type: "Motivacional", sender: 68, recipient: 40 },
  { message: "Prometo não te irritar… mentira!", message_type: "Comedia", sender: 69, recipient: 97 },
  { message: "Tudo que sentimos importa.", message_type: "Reflexiva", sender: 70, recipient: 17 },
  { message: "Eu me apaixono pelo seu jeito todo dia.", message_type: "Romantica", sender: 71, recipient: 93 },
  { message: "Você é meu porto seguro.", message_type: "Amizade", sender: 72, recipient: 1 },
  { message: "Não desista. O melhor está chegando.", message_type: "Motivacional", sender: 73, recipient: 66 },
  { message: "Eu nasci pra brilhar… pena que não brilhei hoje.", message_type: "Comedia", sender: 74, recipient: 50 },
  { message: "Nem tudo precisa de explicação.", message_type: "Reflexiva", sender: 75, recipient: 29 },
  { message: "Você é a parte boa da minha vida.", message_type: "Romantica", sender: 76, recipient: 9 },
  { message: "Sua amizade é meu abrigo.", message_type: "Amizade", sender: 77, recipient: 58 },
  { message: "Você é mais forte do que pensa.", message_type: "Motivacional", sender: 78, recipient: 92 },
  { message: "Eu tento ser calmo, mas a vida não deixa.", message_type: "Comedia", sender: 79, recipient: 28 },
  { message: "Aceitar também é coragem.", message_type: "Reflexiva", sender: 80, recipient: 48 },
  { message: "Seu amor me faz querer ser melhor.", message_type: "Romantica", sender: 81, recipient: 24 },
  { message: "Você é tão importante quanto imagina.", message_type: "Amizade", sender: 82, recipient: 98 },
  { message: "Continue acreditando. Vai valer a pena.", message_type: "Motivacional", sender: 83, recipient: 31 },
  { message: "Eu não funciono antes das 10h.", message_type: "Comedia", sender: 84, recipient: 67 },
  { message: "Quando aceitamos o presente, o futuro chega.", message_type: "Reflexiva", sender: 85, recipient: 79 },
  { message: "Você é meu amor para a vida toda.", message_type: "Romantica", sender: 86, recipient: 20 },
  { message: "Eu valorizo demais nossa amizade.", message_type: "Amizade", sender: 87, recipient: 64 },
  { message: "O esforço de hoje cria o amanhã.", message_type: "Motivacional", sender: 88, recipient: 51 },
  { message: "Eu queria ser fitness, mas a comida venceu.", message_type: "Comedia", sender: 89, recipient: 3 },
  { message: "Sempre existe algo bom no caminho.", message_type: "Reflexiva", sender: 90, recipient: 46 },
  { message: "Você é minha parte favorita do universo.", message_type: "Romantica", sender: 91, recipient: 75 },
  { message: "Sua amizade me faz crescer.", message_type: "Amizade", sender: 92, recipient: 43 },
  { message: "Nunca pare de acreditar em si mesmo.", message_type: "Motivacional", sender: 93, recipient: 82 },
  { message: "Eu sou especialista em fazer nada o dia inteiro.", message_type: "Comedia", sender: 94, recipient: 33 },
  { message: "A vida sempre encontra um jeito.", message_type: "Reflexiva", sender: 95, recipient: 56 },
  { message: "Meu coração sempre volta para você.", message_type: "Romantica", sender: 96, recipient: 45 },
  { message: "Você é o tipo de amigo que o mundo precisa.", message_type: "Amizade", sender: 97, recipient: 37 },
  { message: "Mesmo devagar, você está avançando.", message_type: "Motivacional", sender: 98, recipient: 74 },
  { message: "Eu tento ser sério, mas é impossível.", message_type: "Comedia", sender: 99, recipient: 86 },
  { message: "No fim, tudo faz sentido.", message_type: "Reflexiva", sender: 100, recipient: 18 }
];


  await prisma.users.createMany({ data: user });
  await prisma.confessions.createMany({data: confession});

  console.log("The seed worked very well 👍");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect(process.exit(1));
  });
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {

  //Dados que serão enviados para a tabela de confissões
    const confissoes = [
  { mensagem: "Às vezes fico sem saber por onde começar, mas sigo tentando com esperança.", tipoMensagem: "motivacional", remetenteId: 1, destinatarioId: 2 },
  { mensagem: "Você é a pessoa mais importante da minha vida!", tipoMensagem: "romantica", remetenteId: 2, destinatarioId: 3 },
  { mensagem: "Às vezes fico agitado, mas estou aprendendo a lidar com meus sentimentos.", tipoMensagem: "reflexiva", remetenteId: 3, destinatarioId: 4 },
  { mensagem: "Eu te considero muito, sabia?", tipoMensagem: "amizade", remetenteId: 4, destinatarioId: 5 },
  { mensagem: "Eu queria ter sido melhor, e estou me esforçando para isso.", tipoMensagem: "reflexiva", remetenteId: 5, destinatarioId: 6 },
  { mensagem: "Tenho receio de te perder porque você significa muito para mim.", tipoMensagem: "romantica", remetenteId: 6, destinatarioId: 7 },
  { mensagem: "Ainda estou tentando entender meus sentimentos para seguir em frente.", tipoMensagem: "reflexiva", remetenteId: 7, destinatarioId: 8 },
  { mensagem: "Meus sentimentos são confusos às vezes, mas são verdadeiros.", tipoMensagem: "reflexiva", remetenteId: 8, destinatarioId: 9 },
  { mensagem: "Você sempre será meu melhor amigo.", tipoMensagem: "amizade", remetenteId: 9, destinatarioId: 10 },
  { mensagem: "Tenho aprendido muito com meu passado e sigo evoluindo.", tipoMensagem: "reflexiva", remetenteId: 10, destinatarioId: 11 },

  { mensagem: "Eu sou grato por tudo o que você fez por mim.", tipoMensagem: "motivacional", remetenteId: 11, destinatarioId: 12 },
  { mensagem: "Preciso de um tempo para mim, mas te desejo sempre o melhor.", tipoMensagem: "reflexiva", remetenteId: 12, destinatarioId: 13 },
  { mensagem: "Eu te amo mais do que qualquer coisa.", tipoMensagem: "romantica", remetenteId: 13, destinatarioId: 14 },
  { mensagem: "Queria ter feito escolhas melhores, mas estou aprendendo com elas.", tipoMensagem: "reflexiva", remetenteId: 14, destinatarioId: 15 },
  { mensagem: "Às vezes me sinto só, mas sigo buscando força.", tipoMensagem: "motivacional", remetenteId: 15, destinatarioId: 16 },
  { mensagem: "Você foi a melhor coisa que me aconteceu.", tipoMensagem: "amizade", remetenteId: 16, destinatarioId: 17 },
  { mensagem: "Preciso reconstruir minha confiança aos poucos.", tipoMensagem: "reflexiva", remetenteId: 17, destinatarioId: 18 },
  { mensagem: "Quero que você saiba o quanto significa para mim.", tipoMensagem: "romantica", remetenteId: 18, destinatarioId: 19 },
  { mensagem: "Tenho saudade da nossa fase boa.", tipoMensagem: "reflexiva", remetenteId: 19, destinatarioId: 20 },
  { mensagem: "Algumas lembranças ainda doem, mas quero transformá-las em aprendizado.", tipoMensagem: "reflexiva", remetenteId: 20, destinatarioId: 21 },

  { mensagem: "Sinto muito, estou aprendendo a me expressar melhor.", tipoMensagem: "reflexiva", remetenteId: 21, destinatarioId: 22 },
  { mensagem: "Te amo, mesmo que às vezes fique indeciso.", tipoMensagem: "romantica", remetenteId: 22, destinatarioId: 23 },
  { mensagem: "Gostaria de ter valorizado mais cada momento.", tipoMensagem: "reflexiva", remetenteId: 23, destinatarioId: 24 },
  { mensagem: "Sinto falta de conversar com você.", tipoMensagem: "amizade", remetenteId: 24, destinatarioId: 25 },
  { mensagem: "Queria que tudo estivesse mais leve, e estou buscando isso.", tipoMensagem: "motivacional", remetenteId: 25, destinatarioId: 26 },
  { mensagem: "Você sempre foi muito importante para mim.", tipoMensagem: "amizade", remetenteId: 26, destinatarioId: 27 },
  { mensagem: "Às vezes me sinto preso, mas estou procurando soluções.", tipoMensagem: "motivacional", remetenteId: 27, destinatarioId: 28 },
  { mensagem: "Te amo, mesmo com a distância.", tipoMensagem: "romantica", remetenteId: 28, destinatarioId: 29 },
  { mensagem: "Preciso encontrar mais equilíbrio na minha vida.", tipoMensagem: "reflexiva", remetenteId: 29, destinatarioId: 30 },
  { mensagem: "Você é a única pessoa que realmente me entende.", tipoMensagem: "amizade", remetenteId: 30, destinatarioId: 31 },

  { mensagem: "Eu não queria te ferir, e estou buscando ser melhor.", tipoMensagem: "reflexiva", remetenteId: 31, destinatarioId: 32 },
  { mensagem: "Te amo mais a cada dia.", tipoMensagem: "romantica", remetenteId: 32, destinatarioId: 33 },
  { mensagem: "Ainda estou processando algumas coisas, mas sigo em frente.", tipoMensagem: "reflexiva", remetenteId: 33, destinatarioId: 34 },
  { mensagem: "Sinto saudade de nós dois.", tipoMensagem: "romantica", remetenteId: 34, destinatarioId: 35 },
  { mensagem: "Algumas coisas ainda me incomodam, mas estou trabalhando nisso.", tipoMensagem: "reflexiva", remetenteId: 35, destinatarioId: 36 },
  { mensagem: "Eu sempre estarei aqui para você.", tipoMensagem: "amizade", remetenteId: 36, destinatarioId: 37 },
  { mensagem: "Errei, mas estou transformando isso em aprendizado.", tipoMensagem: "reflexiva", remetenteId: 37, destinatarioId: 38 },
  { mensagem: "Estou entendendo agora como posso melhorar.", tipoMensagem: "reflexiva", remetenteId: 38, destinatarioId: 39 },
  { mensagem: "Não quero te perder, você é especial para mim.", tipoMensagem: "romantica", remetenteId: 39, destinatarioId: 40 },
  { mensagem: "Quero ser mais sincero comigo mesmo daqui para frente.", tipoMensagem: "reflexiva", remetenteId: 40, destinatarioId: 41 },

  // (PARTE 2 – CONTINUAÇÃO)
  { mensagem: "Você foi um grande amigo e sempre terá meu carinho.", tipoMensagem: "amizade", remetenteId: 41, destinatarioId: 42 },
  { mensagem: "Eu te amei como nunca amei ninguém.", tipoMensagem: "romantica", remetenteId: 42, destinatarioId: 43 },
  { mensagem: "Preciso de tempo para reconstruir confiança na vida.", tipoMensagem: "reflexiva", remetenteId: 43, destinatarioId: 44 },
  { mensagem: "Sinto muito por tudo.", tipoMensagem: "reflexiva", remetenteId: 44, destinatarioId: 45 },
  { mensagem: "Queria ter feito tantas coisas de forma diferente.", tipoMensagem: "reflexiva", remetenteId: 45, destinatarioId: 46 },
  { mensagem: "Às vezes me sinto meio perdido, mas sigo aprendendo.", tipoMensagem: "motivacional", remetenteId: 46, destinatarioId: 47 },
  { mensagem: "Sei que te magoei e estou trabalhando para evoluir.", tipoMensagem: "reflexiva", remetenteId: 47, destinatarioId: 48 },
  { mensagem: "Te amo, mesmo quando tudo parece confuso.", tipoMensagem: "romantica", remetenteId: 48, destinatarioId: 49 },
  { mensagem: "Dói sentir falta, mas isso mostra o quanto foi especial.", tipoMensagem: "reflexiva", remetenteId: 49, destinatarioId: 50 },
  { mensagem: "Queria que tudo fosse mais simples, e estou tentando tornar assim.", tipoMensagem: "motivacional", remetenteId: 50, destinatarioId: 51 },

  // (PARTE 3 – CONTINUAÇÃO)
  { mensagem: "Eu sempre estarei do seu lado.", tipoMensagem: "amizade", remetenteId: 51, destinatarioId: 52 },
  { mensagem: "Gostaria de mudar tantas coisas, e estou buscando essa mudança.", tipoMensagem: "reflexiva", remetenteId: 52, destinatarioId: 53 },
  { mensagem: "Sinto saudade e carinho por você.", tipoMensagem: "reflexiva", remetenteId: 53, destinatarioId: 54 },
  { mensagem: "Tenho muito a aprender sobre confiança e estou disposto.", tipoMensagem: "reflexiva", remetenteId: 54, destinatarioId: 55 },
  { mensagem: "Eu gostaria de expressar melhor meus sentimentos.", tipoMensagem: "reflexiva", remetenteId: 55, destinatarioId: 56 },
  { mensagem: "Te amo e quero fazer dar certo.", tipoMensagem: "romantica", remetenteId: 56, destinatarioId: 57 },
  { mensagem: "Sou muito grato por tudo que vivemos.", tipoMensagem: "motivacional", remetenteId: 57, destinatarioId: 58 },
  { mensagem: "Às vezes fico dividido, mas meu carinho por você é real.", tipoMensagem: "reflexiva", remetenteId: 58, destinatarioId: 59 },
  { mensagem: "Quero melhorar e fazer as coisas da forma certa.", tipoMensagem: "motivacional", remetenteId: 59, destinatarioId: 60 },
  { mensagem: "Tenho saudade do que fomos um dia.", tipoMensagem: "reflexiva", remetenteId: 60, destinatarioId: 61 },

  // (PARTE 4)
  { mensagem: "Eu não quero te perder, você é essencial para mim.", tipoMensagem: "romantica", remetenteId: 61, destinatarioId: 62 },
  { mensagem: "Preciso ser mais verdadeiro comigo mesmo e com os outros.", tipoMensagem: "reflexiva", remetenteId: 62, destinatarioId: 63 },
  { mensagem: "Às vezes é difícil lidar com tudo, mas estou me fortalecendo.", tipoMensagem: "motivacional", remetenteId: 63, destinatarioId: 64 },
  { mensagem: "Gostaria de voltar atrás, mas sigo aprendendo com tudo.", tipoMensagem: "reflexiva", remetenteId: 64, destinatarioId: 65 },
  { mensagem: "Sinto muito e quero evoluir com isso.", tipoMensagem: "reflexiva", remetenteId: 65, destinatarioId: 66 },
  { mensagem: "Sempre estarei ao seu lado.", tipoMensagem: "amizade", remetenteId: 66, destinatarioId: 67 },
  { mensagem: "Às vezes não sei o que fazer, mas sigo caminhando.", tipoMensagem: "motivacional", remetenteId: 67, destinatarioId: 68 },
  { mensagem: "Eu quero ser uma pessoa melhor para aqueles que amo.", tipoMensagem: "reflexiva", remetenteId: 68, destinatarioId: 69 },
  { mensagem: "Eu te amo profundamente.", tipoMensagem: "romantica", remetenteId: 69, destinatarioId: 70 },
  { mensagem: "Me arrependo de não ter dito antes o que eu sentia.", tipoMensagem: "reflexiva", remetenteId: 70, destinatarioId: 71 },

  // (PARTE 5)
  { mensagem: "Quero que você saiba que me importo de verdade.", tipoMensagem: "reflexiva", remetenteId: 71, destinatarioId: 72 },
  { mensagem: "Te amo e quero melhorar sempre.", tipoMensagem: "romantica", remetenteId: 72, destinatarioId: 73 },
  { mensagem: "Estou aprendendo a lidar com sentimentos difíceis.", tipoMensagem: "reflexiva", remetenteId: 73, destinatarioId: 74 },
  { mensagem: "Aprendi muito com o passado e sigo evoluindo.", tipoMensagem: "motivacional", remetenteId: 74, destinatarioId: 75 },
  { mensagem: "Queria ter mais tempo ao seu lado.", tipoMensagem: "romantica", remetenteId: 75, destinatarioId: 76 },
  { mensagem: "Eu te amo mais do que posso expressar.", tipoMensagem: "romantica", remetenteId: 76, destinatarioId: 77 },
  { mensagem: "Queria ter sido mais paciente, e estou melhorando isso.", tipoMensagem: "reflexiva", remetenteId: 77, destinatarioId: 78 },
  { mensagem: "Sinto saudade todos os dias.", tipoMensagem: "reflexiva", remetenteId: 78, destinatarioId: 79 },
  { mensagem: "Às vezes tudo pesa, mas sigo confiante de que vai melhorar.", tipoMensagem: "motivacional", remetenteId: 79, destinatarioId: 80 },
  { mensagem: "Sinto muito e quero evoluir como pessoa.", tipoMensagem: "reflexiva", remetenteId: 80, destinatarioId: 81 },

  // (PARTE FINAL)
  { mensagem: "Eu gostaria que tudo voltasse ao equilíbrio novamente.", tipoMensagem: "reflexiva", remetenteId: 81, destinatarioId: 82 },
  { mensagem: "Eu te amo, mesmo quando sinto que não percebe.", tipoMensagem: "romantica", remetenteId: 82, destinatarioId: 83 },
  { mensagem: "Você marcou minha vida e me transformou.", tipoMensagem: "reflexiva", remetenteId: 83, destinatarioId: 84 },
  { mensagem: "Só percebi tarde demais o quanto sentiria sua falta.", tipoMensagem: "reflexiva", remetenteId: 84, destinatarioId: 85 },
  { mensagem: "Errei, mas estou comprometido em evoluir.", tipoMensagem: "motivacional", remetenteId: 85, destinatarioId: 86 },
  { mensagem: "Ainda estou entendendo como me sentir melhor.", tipoMensagem: "reflexiva", remetenteId: 86, destinatarioId: 87 },
  { mensagem: "Eu te amo, mesmo que a vida tenha seguido caminhos diferentes.", tipoMensagem: "romantica", remetenteId: 87, destinatarioId: 88 },
  { mensagem: "Sou profundamente grato por tudo o que você fez por mim.", tipoMensagem: "motivacional", remetenteId: 88, destinatarioId: 89 },
  { mensagem: "Eu amo estar ao seu lado e sinto falta disso.", tipoMensagem: "romantica", remetenteId: 89, destinatarioId: 90 },
  { mensagem: "Quero melhorar continuamente meu jeito de amar e cuidar.", tipoMensagem: "reflexiva", remetenteId: 90, destinatarioId: 91 },

  { mensagem: "Te amo e sempre vou te amar.", tipoMensagem: "romantica", remetenteId: 91, destinatarioId: 92 },
  { mensagem: "Estou aprendendo com meus erros para ser uma pessoa melhor.", tipoMensagem: "motivacional", remetenteId: 92, destinatarioId: 93 },
  { mensagem: "Quero ser mais paciente e gentil daqui pra frente.", tipoMensagem: "reflexiva", remetenteId: 93, destinatarioId: 94 },
  { mensagem: "Estou entendendo melhor meus sentimentos e quero compartilhá-los.", tipoMensagem: "reflexiva", remetenteId: 94, destinatarioId: 95 },
  { mensagem: "Nunca mais quero cometer os mesmos erros, estou evoluindo.", tipoMensagem: "motivacional", remetenteId: 95, destinatarioId: 96 },
  { mensagem: "Quero que você seja feliz, onde quer que esteja.", tipoMensagem: "reflexiva", remetenteId: 96, destinatarioId: 97 },
  { mensagem: "Eu te amo mais do que qualquer coisa nesta vida.", tipoMensagem: "romantica", remetenteId: 97, destinatarioId: 98 },
  { mensagem: "Sinto sua falta e guardo com carinho tudo o que vivemos.", tipoMensagem: "reflexiva", remetenteId: 98, destinatarioId: 99 },
  { mensagem: "Sinto muito e quero fazer melhor daqui para frente.", tipoMensagem: "reflexiva", remetenteId: 99, destinatarioId: 100 },
  { mensagem: "Você foi e sempre será uma parte importante da minha vida.", tipoMensagem: "amizade", remetenteId: 100, destinatarioId: 1 },
];
    
    //Criação do hash da senha baseada nas senhas do seed
    const hashPassword = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    };

    //Dados que serão enviados para a tabela de usuários
    const usuarios = [
        { nomeUsuario: "ZincoMagico", email: "zincomagico1@gmail.com", senha: "Zinco123!" },
        { nomeUsuario: "FlavRanzinz", email: "flaviaranz2@outlook.com", senha: "Flavia2024@" },
        { nomeUsuario: "GigaPipoca", email: "gigapipoqueiro3@yahoo.com", senha: "PipocaGiga#" },
        { nomeUsuario: "AurelSofred", email: "aureliosof4@gmail.com", senha: "Aurelio!321" },
        { nomeUsuario: "LunaViajant", email: "luna.viaj5@outlook.com", senha: "LunaVoa2024" },
        { nomeUsuario: "JulietBizarr", email: "julietabiz6@gmail.com", senha: "Bizarra789@" },
        { nomeUsuario: "PipocIncrvl", email: "pipoquinhain7@gmail.com", senha: "Pipoca123!" },
        { nomeUsuario: "ZecaGaranh", email: "zeca.gar8@yahoo.com", senha: "Zeca2024#" },
        { nomeUsuario: "GritoLunar", email: "gritolunar9@gmail.com", senha: "Lunar!456" },
        { nomeUsuario: "BananaLoka", email: "bananaloka10@gmail.com", senha: "BananaLoka@" },
        { nomeUsuario: "MegaZangado", email: "megazang11@outlook.com", senha: "ZangaMega2024" },
        { nomeUsuario: "MestTartar", email: "mestretart12@gmail.com", senha: "TartaMestre!" },
        { nomeUsuario: "VagaRadnt", email: "vagalume13@yahoo.com", senha: "Vagalume!" },
        { nomeUsuario: "GuerrDraga", email: "draga.g14@gmail.com", senha: "Draga2024@" },
        { nomeUsuario: "ChicoChicl", email: "chicochi15@outlook.com", senha: "Chiclete2024" },
        { nomeUsuario: "KafkLouco", email: "kafkalouco16@gmail.com", senha: "Kafka@321" },
        { nomeUsuario: "VortTremid", email: "vortextrem17@gmail.com", senha: "Vortex##" },
        { nomeUsuario: "CrocSolar", email: "crocsolar18@yahoo.com", senha: "CrocodiloSun!" },
        { nomeUsuario: "PoetCabelud", email: "poetcabel19@gmail.com", senha: "Poetisa123@" },
        { nomeUsuario: "LadrEstrel", email: "ladraestre20@outlook.com", senha: "Estrela@@" },
        { nomeUsuario: "NuvemUivan", email: "nuvemuiv21@gmail.com", senha: "Uivo2024@" },
        { nomeUsuario: "ZeDoSaci", email: "zesaci22@gmail.com", senha: "Saci123!" },
        { nomeUsuario: "MariaFumac", email: "mfumaca23@outlook.com", senha: "Fumaca2024@" },
        { nomeUsuario: "VilaMaluca", email: "vilamaluca24@gmail.com", senha: "Maluca###" },
        { nomeUsuario: "ToquMidas", email: "toquemidas25@yahoo.com", senha: "Midas2024!" },
        { nomeUsuario: "JudasRevol", email: "judasrev26@gmail.com", senha: "Revolucao@" },
        { nomeUsuario: "SombraRelu", email: "sombra27@outlook.com", senha: "Reluz123!" },
        { nomeUsuario: "BichPregui", email: "preguica28@gmail.com", senha: "Pregui##" },
        { nomeUsuario: "PompmFlutua", email: "pompom29@gmail.com", senha: "Flutua@" },
        { nomeUsuario: "FocaVoador", email: "focavoad30@outlook.com", senha: "FocaVoa2024" },
        { nomeUsuario: "DonaCatap", email: "donacat31@gmail.com", senha: "Dona2024!" },
        { nomeUsuario: "ChavMestra", email: "chavemest32@yahoo.com", senha: "Chave@123" },
        { nomeUsuario: "CachFumant", email: "cachfum33@gmail.com", senha: "FumaDog@" },
        { nomeUsuario: "PocahLenda", email: "pocahlend34@gmail.com", senha: "Lenda2024!" },
        { nomeUsuario: "LadrSonhos", email: "ladrosonho35@gmail.com", senha: "Sonho@@@" },
        { nomeUsuario: "FocaSorris", email: "focasorr36@outlook.com", senha: "Sorriso!@" },
        { nomeUsuario: "SaciEnvolv", email: "sacienv37@gmail.com", senha: "Envolve2024" },
        { nomeUsuario: "EspelhQbrd", email: "espelho38@gmail.com", senha: "Quebra123@" },
        { nomeUsuario: "DrgnFlyHigh", email: "dragon39@yahoo.com", senha: "FlyHigh!" },
        { nomeUsuario: "MaripSorr", email: "maripsorr40@gmail.com", senha: "Mariposa2024@" },
        { nomeUsuario: "UrsinhZen", email: "ursinho41@outlook.com", senha: "ZenUrs@" },
        { nomeUsuario: "FeitPaz", email: "feitpaz42@gmail.com", senha: "PazPoder2024" },
        { nomeUsuario: "CachRaiv", email: "cachraiv43@gmail.com", senha: "RaivaDog!" },
        { nomeUsuario: "CurupVerm", email: "curupira44@gmail.com", senha: "Curup2024@" },
        { nomeUsuario: "GalinhFeliz", email: "galinhafel45@yahoo.com", senha: "Feliz@@@" },
        { nomeUsuario: "CobraDoMar", email: "cobramar46@gmail.com", senha: "Cobra2024!" },
        { nomeUsuario: "PirataLouc", email: "piratalou47@outlook.com", senha: "Pirata##" },
        { nomeUsuario: "VikingScan", email: "vikingscan48@gmail.com", senha: "Viking@321" },
        { nomeUsuario: "CactoDanç", email: "cactodanca49@gmail.com", senha: "Danca@@" },
        { nomeUsuario: "NinjaTosco", email: "ninjetos50@outlook.com", senha: "Ninja2024!" },
        { nomeUsuario: "TatuBolado", email: "tatubolado51@gmail.com", senha: "Tatu#321" },
        { nomeUsuario: "SapoCantor", email: "sapocant52@yahoo.com", senha: "CantaSapo@" },
        { nomeUsuario: "MofoBrilh", email: "mofobrilh53@gmail.com", senha: "Brilha!@" },
        { nomeUsuario: "GatoVeloz", email: "gatoveloz54@gmail.com", senha: "Veloz123#" },
        { nomeUsuario: "ChuvaRison", email: "chuvariso55@hotmail.com", senha: "Chuva@" },
        { nomeUsuario: "TrovFurios", email: "trovao56@gmail.com", senha: "Trovao2024" },
        { nomeUsuario: "PatoGuerre", email: "patoguerr57@outlook.com", senha: "PatoWar!" },
        { nomeUsuario: "ZumbiFofo", email: "zumbifofo58@gmail.com", senha: "FofoZumbi@" },
        { nomeUsuario: "MacacTurbo", email: "macacturbo59@yahoo.com", senha: "Turbo123!" },
        { nomeUsuario: "RatoSábio", email: "ratosabio60@gmail.com", senha: "Sabio2024@" },
        { nomeUsuario: "CircoMagia", email: "circomagia61@gmail.com", senha: "Magia321#" },
        { nomeUsuario: "PomboNinja", email: "pomboninja62@outlook.com", senha: "Pombo@@@" },
        { nomeUsuario: "CangVoador", email: "cangvoa63@gmail.com", senha: "Canguru2024" },
        { nomeUsuario: "FantGelado", email: "fantgel64@gmail.com", senha: "Gelado@321" },
        { nomeUsuario: "BruxVoadra", email: "bruxvoa65@yahoo.com", senha: "Bruxa@@" },
        { nomeUsuario: "MumiaDoida", email: "mumiadoida66@gmail.com", senha: "Mumia2024!" },
        { nomeUsuario: "EcoRuidoso", email: "ecoruid67@gmail.com", senha: "Eco2024@" },
        { nomeUsuario: "PanqDourad", email: "panqdour68@outlook.com", senha: "Panqueca@!" },
        { nomeUsuario: "FenixAzula", email: "fenix69@gmail.com", senha: "Fenix!@" },
        { nomeUsuario: "BotoRosado", email: "botorosado70@gmail.com", senha: "Boto2024@" },
        { nomeUsuario: "DragGelado", email: "drggelado71@yahoo.com", senha: "Gelado123!" },
        { nomeUsuario: "LoboGentil", email: "lobogentil72@gmail.com", senha: "Lobo@@" },
        { nomeUsuario: "VacaGalact", email: "vacagal73@outlook.com", senha: "Galactica2024" },
        { nomeUsuario: "FadaPerdida", email: "fadaperd74@gmail.com", senha: "FadaLost!" },
        { nomeUsuario: "CoelhNerd", email: "coelhnerd75@gmail.com", senha: "NerdCoelho123" },
        { nomeUsuario: "BoiSaltit", email: "boisalt76@gmail.com", senha: "SaltaBoi@" },
        { nomeUsuario: "JacarCorrer", email: "jacarcorr77@yahoo.com", senha: "CorreJaca!" },
        { nomeUsuario: "GirafFlash", email: "giraflash78@gmail.com", senha: "FlashGira@" },
        { nomeUsuario: "OuriçNinja", email: "ouricninja79@outlook.com", senha: "Ninja2024" },
        { nomeUsuario: "PinguRei", email: "pingurei80@gmail.com", senha: "ReiPingu@" },
        { nomeUsuario: "TucanLend", email: "tucanlend81@gmail.com", senha: "Lenda321!" },
        { nomeUsuario: "ArarDoida", email: "arardoida82@outlook.com", senha: "Doida2024@" },
        { nomeUsuario: "FuracDoido", email: "furacdoido83@gmail.com", senha: "Furacao!@" },
        { nomeUsuario: "CactoFeliz", email: "cactofeliz84@yahoo.com", senha: "Feliz@@!" },
        { nomeUsuario: "ChifrDour", email: "chifdour85@gmail.com", senha: "Dourado123" },
        { nomeUsuario: "LamaVoador", email: "lamavoad86@gmail.com", senha: "Lama@Voa" },
        { nomeUsuario: "GansRisonh", email: "gansoriso87@outlook.com", senha: "Riso2024@" },
        { nomeUsuario: "ZorroUrbn", email: "zorrou88@gmail.com", senha: "ZorroMan!" },
        { nomeUsuario: "CavlNebul", email: "cavlnebul89@gmail.com", senha: "Nebula123" },
        { nomeUsuario: "PavãoDoido", email: "pavaodoido90@yahoo.com", senha: "Pavao#@" },
        { nomeUsuario: "LeoaDancnt", email: "leoadanc91@gmail.com", senha: "Danca321@" },
        { nomeUsuario: "KoalSonol", email: "koalsono92@gmail.com", senha: "SonoKoala!" },
        { nomeUsuario: "TatuFeliz", email: "tatufeliz93@outlook.com", senha: "FelizTatu@" },
        { nomeUsuario: "SereiaTech", email: "sereiatech94@gmail.com", senha: "Tech@123" },
        { nomeUsuario: "FantArctic", email: "fantart95@gmail.com", senha: "Arctic!@" },
        { nomeUsuario: "GeloVoador", email: "gelovoad96@yahoo.com", senha: "VoaGelo321" },
        { nomeUsuario: "LetrFant", email: "letrfant97@gmail.com", senha: "LetraFanta@" },
        { nomeUsuario: "NuvmAzula", email: "nuvmazul98@gmail.com", senha: "Azul2024@" },
        { nomeUsuario: "VentoRoxo", email: "ventoroxo99@gmail.com", senha: "Vento!!!" },
        { nomeUsuario: "SolFurioso", email: "solfur100@outlook.com", senha: "Sol2024🔥" }
      ];      

    const usuariosComSenhaCriptografada = usuarios.map(usuario => ({
        nomeUsuario: usuario.nomeUsuario,
        email: usuario.email,
        senha: hashPassword(usuario.senha),
        anonimo: false,
      }));

    await prisma.usuario.createMany({
        data: usuariosComSenhaCriptografada
      });

    await prisma.confissao.createMany({
        data: confissoes
    });

console.log('Dados inseridos com sucesso!');
}   

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  

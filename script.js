let etapa = 0;
const telas = document.querySelectorAll(".tela");
const botoesProximo = document.querySelectorAll(".btn-proximo");

document.getElementById("botao-play").addEventListener("click", () => {
  proximaTela();
});

botoesProximo.forEach((botao) => {
  botao.addEventListener("click", () => {
    proximaTela();
  });
});

function proximaTela() {
  if (etapa < telas.length) {
    telas[etapa].classList.remove("ativa");
    etapa++;
    if (etapa < telas.length) {
      telas[etapa].classList.add("ativa");
    }
  }
}

// CRONÔMETRO
// A data de destino para o cronômetro é 26/12/26 às 08:00:00.
const destino = new Date("2026-12-26T08:00:00");
const contador = document.getElementById("contador");

function atualizarContador() {
  const agora = new Date();
  const diferenca = destino - agora;

  if (diferenca <= 0) {
    contador.innerHTML = "É HOJE! 💖";
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / 1000 / 60) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  contador.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

// Atualiza o contador a cada segundo.
setInterval(atualizarContador, 1000);
// Chama a função pela primeira vez para exibir o contador imediatamente.
atualizarContador();

const legenda = document.getElementById("legenda");
const audio = document.getElementById("player-musica");

// Definindo as legendas com seus tempos em segundos (agora ajustado para o primeiro item)
const legendas = [
  { tempo: 14.0, texto: "Busquei em tantos lugares" }, // A primeira legenda só aparecerá após 14 segundos de áudio
  { tempo: 20.0, texto: "A canção, a canção mais bela" }, // Ajustei este tempo também para ser 4 segundos depois do anterior, mantendo a diferença
  { tempo: 25.0, texto: "Para entoar" },
  { tempo: 30.0, texto: "Vivi tantas aventuras" },
  { tempo: 36.0, texto: "Para encontrar" },
  { tempo: 40.0, texto: "A cor perfeita" },
  { tempo: 44.0, texto: "Mas quando, eu te avistei" },
  { tempo: 51.0, texto: "Dúvidas não restaram" },

  { tempo: 59.0, texto: "Que minha canção é pra você" },
  { tempo: 63.0, texto: "Que minha história é com você" },
  { tempo: 67.0, texto: "Meu mundo já não tem cor sem você" },
  { tempo: 73.0, texto: "E eu canto, canto só por te amar" },
  { tempo: 76.0, texto: "Cada nota é pra te lembrar" },
  { tempo: 80.0, texto: "Que todo amor que há em mim é pra você" },

  { tempo: 88.0, texto: "E minha canção é pra você" },
  { tempo: 92.0, texto: "E minha história é com você" },
  { tempo: 95.0, texto: "Meu mundo já não tem cor sem você" },
  { tempo: 102.0, texto: "E eu canto, canto só por te amar" },
  { tempo: 107.0, texto: "Cada nota é pra te lembrar" },
  { tempo: 110.0, texto: "Que todo amor que há em mim é pra você" },

  { tempo: 120.0, texto: "Tem Amo ❤️" },
];

let indiceLegendaAtual = 0; // Controla qual legenda deve ser exibida

// Evento disparado repetidamente enquanto o áudio está tocando.
audio.addEventListener("timeupdate", () => {
  const tempoAtual = audio.currentTime; // Obtém o tempo atual da reprodução (com decimais)

  // Verifica se o tempo atual do áudio atingiu ou ultrapassou o tempo da próxima legenda.
  if (
    indiceLegendaAtual < legendas.length &&
    tempoAtual >= legendas[indiceLegendaAtual].tempo
  ) {
    legenda.innerText = legendas[indiceLegendaAtual].texto; // Exibe a legenda.
    indiceLegendaAtual++; // Avança para a próxima legenda.
  }

  // Se a música terminar, limpa a legenda e reseta o índice.
  if (audio.ended) {
    legenda.innerText = "";
    indiceLegendaAtual = 0;
  }
});

// Evento para lidar quando o usuário arrasta a barra de progresso da música.
audio.addEventListener("seeking", () => {
  const tempoAtual = audio.currentTime;
  indiceLegendaAtual = 0; // Reseta o índice.
  // Percorre as legendas para encontrar a que corresponde ao novo tempo.
  while (
    indiceLegendaAtual < legendas.length &&
    legendas[indiceLegendaAtual].tempo <= tempoAtual
  ) {
    indiceLegendaAtual++;
  }
  // Exibe a legenda anterior ou limpa se estiver no início.
  if (indiceLegendaAtual > 0) {
    legenda.innerText = legendas[indiceLegendaAtual - 1].texto;
  } else {
    legenda.innerText = "";
  }
});

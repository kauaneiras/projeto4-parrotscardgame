let quantidadecartas = 0;
let par = 0;
let div = [];
let img = ["brook", "chopper", "frank", "luffy", "Nami", "robin", "zoro"];
let cartas = [];
let carta1;
let carta2;
let cartaclicada;
let checkarcarta;
let pararcartas;
let partidas = 0;
let certo = 0;
let novapartida = "";
let contartempo = 0;
let contagem = 0;
let tempofinal = 0;
let jogosvencidos = 0;

//LOOP PERGUNTA NOVAMENTE SE O NUMERIO DE FOREM MENORES QUE 4, MEIORES QUE 15, OU IMPAR
while (quantidadecartas < 4 || quantidadecartas > 15 || par !== 0) {
  quantidadecartas = prompt("Quantas cartas você quer jogar?");
  quantidadecartas = parseInt(quantidadecartas);
  par = quantidadecartas % 2;
}

//COLOCAR IMAGENS NAS CARTAS
for (let i = 0; i < quantidadecartas / 2; i++) {
  cartas.push(img[i]);
  cartas.push(img[i]);
}
function comparador() {
return Math.random() - 0.5;
}
cartas.sort(comparador);

// CRIAR DIVs DAS IMAGENS
for (i = 0; i < quantidadecartas; i++) {
  div[i] = `<div class="unidade" data-cartabla = "${cartas[i]}" data-identifier="card">
                <div class="frente face virar">
                  <img src="img/${cartas[i]}.gif" data-identifier="front-face">
             </div>
            <div class="verso face" data-identifier="back-face">
                <img src="img/front.png">
            </div></div>`;
  addcartas = document.querySelector(".cartas");
  addcartas.innerHTML += div[i];
}
 //VIRAR CARTAS AO CLICAR
let todasascartas = document.querySelectorAll(".unidade");
function virarCarta() {
  console.log(partidas);
  if (pararcartas) {
    return false;
  }
  this.classList.add("virar");
  if (!carta1) {
    carta1 = this;
    carta1.classList.add("virar");
    return false;
  }
  carta2 = this;
  compararcartas();
}

todasascartas.forEach((carta) => carta.addEventListener("click", virarCarta));

function compararcartas() {
  checkarcarta = carta1.dataset.cartabla === carta2.dataset.cartabla;
  if (checkarcarta == false) {
    cartasDiferentes();
  } else {
    carta1.removeEventListener("click", virarCarta);
    carta2.removeEventListener("click", virarCarta);
    limparVariaveis();
    certo += 1;
  }
  finalizarpartida();
  jogosvencidos += 1;
}

function cartasDiferentes() {
  pararcartas = true;
  setTimeout(() => {
    carta1.classList.remove("virar");
    carta2.classList.remove("virar");
    pararcartas = false;
    limparVariaveis();}, 1000);
}

function limparVariaveis() {
  carta1 = null;
  carta2 = null;
}

function finalizarpartida() {
  setTimeout(() => {
    if (certo == parseInt(quantidadecartas) / 2) {
      tempofinal = contartempo.innerHTML;
      alert(
        "Você ganhou em " +
          jogosvencidos +
          " jogadas em " +
          contagem +
          " segundos!"
      );
      começarnovapartida();
    }
  }, 1000);
}

// JOGAR NOVAMENTE
function começarnovapartida() {
  setTimeout(() => {
    novapartida = prompt("Eai Pirata, vamos jogar novamente? (sim/não)");
    escolha();
  }, 1000);
}

function escolha() {
  if (novapartida === "sim") {
    window.location.reload();
  } else {
    alert("Poxa, desse jeito você não encontrará o One Piece");
  }
}

// TEMPO DA PARTIDA
function marcadortempo() {
  if (novapartida == "não") {
    contagem = contagem;
    contartempo.innerHTML = contagem + "s";
    return false;
  }
  contartempo = document.querySelector("time");
  contagem = contagem + 1;
  contartempo.innerHTML = contagem + "s";
}

setInterval(marcadortempo, 1000);

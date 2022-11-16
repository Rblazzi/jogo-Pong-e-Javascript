//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//velocidade da bolinha
let velocidadeXbolinha = 5;
let velocidadeYbolinha = 5;

//tamanho da raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false
let yRaqueteOponente = 150;
let xRaqueteOponente = 585;
let velocidadeYOponente; 

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura)
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXbolinha
  yBolinha += velocidadeYbolinha
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXbolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
      velocidadeYbolinha *= -1
  }
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
    if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento 
      && yBolinha - raio < yRaquete + raqueteAltura 
      && yBolinha + raio > yRaquete ) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {  
  colidiu = 
  collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}  
  
function movimentaRaqueteOponente() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
    if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  
  fill(color(255,140,0))
  rect(150, 10, 40, 20)
  fill(255);
  text(meusPontos, 170, 26);
  
  fill(color(255,140,0))
  rect(450, 10, 40, 20)
  fill(255);
  text(pontosDoOponente, 470, 26);
}
  
function marcaPonto() {
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

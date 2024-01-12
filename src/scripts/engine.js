const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelectorAll(".enemy"),
    timeLeft: document.querySelectorAll("#time-left"),
    score: document.querySelectorAll("#score"),
  },
  values: {
    timeId: null,
    gameVelocity: 1000,
  },
};

//Função que escolhe aleatoriamente qual quadrado terá a classe inimigo
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
}

//Função para mudar automaticamente a posição do inimigo
function moveEnemy() {
  state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

//Função para detectar o clique
/* function addListenerHitBox(){
  state.view.squares.forEach((square) => {
    if(square.id ===)
  })
} */

//Função de inicialização, para carregar algumas configurações iniciais
function initialize() {
  moveEnemy();
}

initialize();

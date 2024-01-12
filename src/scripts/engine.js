const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    timeId: null,
    gameVelocity: 1000, //Controla a velocidade de movimento do boneco
    hitPosition: 0, //Guarda o valor da posição onde clicou junto do inimigo
    result: 0,
    initialTime: 10,
    currentTime: 10,
  },

  actions: {
    // timeId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

//Função que faz a contagem regressiva
function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    /* state.values.result = 0;
    state.values.currentTime = 10; */
    resetGame();
  }
}

function resetGame() {
  state.values.result = 0;
  state.view.score.textContent = state.values.result;
  state.values.currentTime = state.values.initialTime;
  state.view.timeLeft.textContent = state.values.currentTime;
}

//Função para ter som quando acertar o Ralph
function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

//Função que escolhe aleatoriamente qual quadrado terá a classe inimigo
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

//Função para mudar automaticamente a posição do inimigo
function moveEnemy() {
  state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

//Função para detectar o clique
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

//Função de inicialização, para carregar algumas configurações iniciais
function initialize() {
  moveEnemy();
  addListenerHitBox();
}

initialize();

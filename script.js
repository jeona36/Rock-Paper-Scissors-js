document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});


document.querySelector('.reset-score-button').addEventListener('click', () => {
    showResetConfirmation();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
    }
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');

    } else if (event.key === 'Backspace') {
        showResetConfirmation();
    }
});
//pick whatever is saved in localStorage, if there is nothing then set score to zero.
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

/*if (!score) {
  score = {
      wins: 0,
      losses: 0,
      ties: 0,
  };
};*/

updateScore();


function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
};

function showResetConfirmation() {
    if (!score.wins && !score.losses && !score.ties) return;
    document.querySelector('.js-reset-confirmation-box').innerHTML = `
     <p>Reset score?</p>
     <button class="reset-yes">Yes</button> 
     <button class="reset-no">No</button>
  `;
    document.querySelector('.reset-yes').addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
        hideResult();
    });
    document.querySelector('.reset-no').addEventListener('click', () => {
        hideResetConfirmation();
    })
};

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation-box').innerHTML = '';
};

function hideResult(){
    document.querySelector('.js-result').innerHTML = "";
    document.querySelector('.js-moves').innerHTML = "";
};


function playGame(playerMove) {
    let computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose, haha!';
        } else if (computerMove === 'scissors') {
            result = 'You win, damn it!';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win, damn it!';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose, haha!';
        }

    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose, haha!';
        } else if (computerMove === 'paper') {
            result = 'You win, damn it!';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    if (result === 'You win, damn it!') {
        score.wins = score.wins + 1;
    } else if (result === 'You lose, haha!') {
        score.losses = score.losses + 1;
    } else if (result === 'Tie.') {
        score.ties = score.ties + 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    //console.log(`You picked ${playerMove}, Computer picked ${computerMove}, ${result}`);

    updateScore();

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="icon">
  VS
  <img src="images/${computerMove}-emoji.png" class="icon">
  Computer`;

};


function updateScore() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;
};

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber > 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
};
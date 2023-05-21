const startBtn = document.querySelector('#start-btn');
const startModal = document.querySelector('.game-start');
const playersInfo = document.querySelector('.profile-modal');
const modalInfoBack = document.querySelector('.modal-back');
const playBtn = document.querySelector('#submit');
const prompt = document.querySelector('.prompt');
const gameOverModal = document.querySelector('.game-over');
const resetBtn = document.querySelector('#reset-btn');
const player1score = document.querySelector('.score1');
const player2score = document.querySelector('.score2');
const roundOverModal = document.querySelector('.round-over');
const nextBtn = document.querySelector('#next-btn');


    //const squares = document.querySelectorAll('.squares');
let currentPlayer;
let players = [];




//retrieving player information from form

playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const player_one = document.querySelector('#player1');
    const player_two = document.querySelector('#player2');
    const markerSelect1 = document.querySelector('#marker1');
    const markerSelect2 = document.querySelector('#marker2');

    const boardName1 = document.querySelector('.player1');
    const boardName2 = document.querySelector('.player2');

    player1Name = player_one.value;
    player2Name = player_two.value;
    player1Marker = markerSelect1.value;
    player2Marker = markerSelect2.value;

    boardName1.textContent = player1Name;
    boardName2.textContent = player2Name;

    



    const firstPlayer = Player(player1Name, player1Marker);
    const secondPlayer = Player(player2Name, player2Marker);

    players = [firstPlayer, secondPlayer];

    currentPlayer = firstPlayer;  
    
   
    playersInfo.remove();
    modalInfoBack.remove();
    
    currentPlayer.playTurn();

});

function Player(name, marker) {
  return {
    name: name,
    marker: marker,
    score: 0,
    playTurn: function() {
      currentPlayer = this;

      // Add an event listener to each game board cell
      const squares = document.querySelectorAll('.squares');
      squares.forEach(function(square) {
        square.addEventListener('click', function() {
          if (square.textContent === '') {
            // Update the cell with the player's symbol
            square.textContent = currentPlayer.marker;
            console.log(`${currentPlayer.name} placed ${currentPlayer.marker}`);

            // Call a function to check for a win or a draw
            checkGameResult();

            // Switch to the next player's turn
            switchPlayer();
          } else {
            prompt.textContent = `Invalid Move. ${currentPlayer.name}, try again.`
          }
        });
      });
    }
  };
}





function checkGameResult(){
  const squares = document.querySelectorAll('.squares');

  //defining winning combinations
  const winningCombinations = [
    [0, 1, 2],   //rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],    //columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],    //diagonals
    [2, 4, 6]
  ];

  //checking each winning combination
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const squareA = squares[a];
    const squareB = squares[b];
    const squareC = squares[c];

    if (squareA.textContent !== '' && squareA.textContent === squareB.textContent && squareB.textContent === squareC.textContent) {
      console.log(`${currentPlayer.name} wins!`);
      updateScore();
      

      return;
    }

      // Check for a draw
    if (isBoardFull()) {
      console.log("It's a draw!");
    }
  }
}


function isBoardFull(){
  const squares = document.querySelectorAll('.squares');
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;
    }
  }
  return true;
}



 function switchPlayer(){
    
         if(currentPlayer === players[0]){
             currentPlayer = players[1];
              prompt.textContent = `${currentPlayer.name} your Move!`
         }else{
             currentPlayer = players[0];          
             prompt.textContent = `${currentPlayer.name} your Move!`
         }
 }
   
function updateScore(){
  currentPlayer.score++;
      if(currentPlayer === players[0]){
        player1score.textContent = currentPlayer.score;
        roundOverModal.style.display = 'grid';
      }else{
        player2score.textContent = currentPlayer.score; 
      };

}


startBtn.addEventListener('click', () =>{
    startModal.style.display = 'none';
    modalInfoBack.style.display = 'block'
    playersInfo.style.display = 'block';
});










// const displayController = (() => {
//      const playerOne_disp = document.querySelector('.player1');
//      const playerTwo_disp = document.querySelector('.player2');
//      const {getName} = Player(name,marker);

//      playerOne_disp.textContent = firstPlayer.getName();
//      playerTwo_disp.textContent = secondPlayer.getName();

//      return {playerOne_disp, playerTwo_disp};

//  })();

//  displayController.playerOne_disp();
//  displayController.playerTwo_disp();










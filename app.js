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
const announceRnd = document.querySelector('.announce-rnd');
const announceWinner = document.querySelector('.announce-winner');


    
let currentPlayer;
let players = [];




//retrieving player information from Form

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

    //both players created from the factory function
    const firstPlayer = Player(player1Name, player1Marker);
    const secondPlayer = Player(player2Name, player2Marker);

    //made an array for the players
    players = [firstPlayer, secondPlayer];

    currentPlayer = firstPlayer;  
    
   
    playersInfo.remove();
    modalInfoBack.remove();
    
    currentPlayer.playTurn();

});

//factory function to create the players with the game method function

function Player(name, marker) {
  return {
    name: name,
    marker: marker,
    score: 0,
    playTurn: () => {
      currentPlayer = this;

      // Add an event listener to each game board cell
      const squares = document.querySelectorAll('.squares');
      squares.forEach(function(square){
        square.addEventListener('click', function(){
          if (square.textContent === '') {
            // Update the cell with the player's symbol
            square.textContent = currentPlayer.marker;

            // Call a function to check for a win or a draw
            checkGameResult();

            // Switch to the next player's turn
            switchPlayer();
          } else {
            prompt.textContent = `Invalid Move. ${currentPlayer.name}, try again.`
          }
      })});
    
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
      roundOverModal.style.display = 'grid';
      announceRnd.textContent = `${currentPlayer.name} Wins!! Let's go again.`;
      nextBtn.textContent = 'Reset';

      updateScore();

      //check for game over based on scores

      if(isGameOver()){
        roundOverModal.style.display = 'none';
        gameOverModal.style.display = 'grid';
        announceWinner.textContent =`${currentPlayer.name} is the winner!! ❤️‍🔥`

     }
      

      return;
    }

      // Check for a draw
    if (isBoardFull()) {
      console.log("It's a draw!");
      roundOverModal.style.display = 'grid';
      announceRnd.textContent = `it's a draw!! Let's go again. 😐`;
      nextBtn.textContent = 'Reset';

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



function isGameOver(){
  if(currentPlayer.score === 5){
    return true;
  }else{
    return false
  }
  
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
        roundOverModal.style.display = 'grid'; 
      };

}



//added eventlisteners to the the various buttons

startBtn.addEventListener('click', () =>{
    startModal.style.display = 'none';
    modalInfoBack.style.display = 'block'
    playersInfo.style.display = 'block';
});



nextBtn.addEventListener('click', () =>{
  
  const squares = document.querySelectorAll('.squares');
  for(let i = 0; i < squares.length; i++){
    squares[i].textContent = '';
  }
  roundOverModal.style.display = 'none';

});

resetBtn.addEventListener('click', () =>{
  const squares = document.querySelectorAll('.squares');
  for(let i = 0; i < squares.length; i++){
    squares[i].textContent = '';
  }
  gameOverModal.style.display = 'none';
  player1score.textContent = 0;
  player2score.textContent = 0;

})



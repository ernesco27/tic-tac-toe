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
let isGameWon = false;




//retrieving player information from Form

playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const player_one = document.querySelector('#player1');
    const player_two = document.querySelector('#player2');
    const markerSelect1 = document.querySelector('#marker1');
    const markerSelect2 = document.querySelector('#marker2');
    const boardName1 = document.querySelector('.player1');
    const boardName2 = document.querySelector('.player2');
    const cpuSelect = document.querySelector('#checkbox');

    player1Name = player_one.value;
    player2Name = player_two.value;
    player1Marker = markerSelect1.value;
    player2Marker = markerSelect2.value;
    playAgainstComputer = cpuSelect.checked;

    
    

    //both players created from the factory function
     const firstPlayer = Player(player1Name, player1Marker);
    // players.push(firstPlayer);
    

    if(playAgainstComputer){
       secondPlayer = Player('CPU', player2Marker, true);
        boardName2.textContent = 'CPU';
        //players.push(secondPlayer);
        
        
    }else{
      secondPlayer = Player(player2Name, player2Marker);
      boardName2.textContent = player2Name;
      //players.push(secondPlayer);
      
    }

    boardName1.textContent = player1Name;
    

    //made an array for the players
    players = [firstPlayer,secondPlayer];

    currentPlayer = firstPlayer;  
    //console.log(secondPlayer);
    
   
    playersInfo.remove();
    modalInfoBack.remove();
    
    currentPlayer.playTurn();

});

//factory function to create the players with the game method function

function Player(name, marker, isComputer = false) {
  return {
    name: name,
    marker: marker,
    score: 0,
    isComputer: isComputer,
    playTurn: () => {
      currentPlayer = this;

      if(this.isComputer){
        computerPlay();
      }else{
         // Add an event listener to each game board cell
      const squares = document.querySelectorAll('.squares');
      squares.forEach(function(square){
        square.addEventListener('click', function(){
          if (square.textContent === '') {
            // Update the cell with the player's symbol
            square.textContent = currentPlayer.marker;
          }else {
                  prompt.textContent = `Invalid Move. ${currentPlayer.name}, try again.`
                }

            // Call a function to check for a win or a draw
            checkGameResult();

            if(!isGameWon){
                  // Switch to the next player's turn
                  switchPlayer();
                } 
            })
      })};

      }
    }
  };






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

      isGameWon = true;
    
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

      if (isBoardFull() && !isGameWon){
         console.log("It's a draw!");
        roundOverModal.style.display = 'grid';
        announceRnd.textContent = `it's a draw!! Let's go again. 😐`;
        nextBtn.textContent = 'Reset'
     }
  }
}


function checkGameResultAgainstComp(){
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

 
      isGameWon = true;
      
      updateScore();

      //check for game over based on scores

      if(isGameOver()){
        roundOverModal.style.display = 'none';
        gameOverModal.style.display = 'grid';
        announceWinner.textContent =`${currentPlayer.name} is the winner!! ❤️‍🔥`

     }

     return
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
  if(currentPlayer.score === 3){
    return true;
  }else{
    return false
  }
  
}


 function switchPlayer(){
    if(currentPlayer === players[0]){
        currentPlayer = players[1];
        setTimeout(()=>{
          prompt.textContent = `${currentPlayer.name} your Move!`
        }, 600)
         
    }else{
        currentPlayer = players[0]; 
        setTimeout(()=>{
          prompt.textContent = `${currentPlayer.name} your Move!`

        }, 600)         
       
    }

    if(currentPlayer.isComputer){
      setTimeout(() =>{
        computerPlay();
      }, 600)
      
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

function computerPlay(){
  const squares = document.querySelectorAll('.squares');
  const emptySquares = Array.from(squares).filter(square => square.textContent === '');

    if(emptySquares.length === 0 && isGameWon === false){
      console.log("It's a draw!");
      roundOverModal.style.display = 'grid';
      announceRnd.textContent = `it's a draw!! Let's go again. 😐`;
      nextBtn.textContent = 'Reset'
      return;
    }

   if(emptySquares.length > 0){
    const random = Math.floor(Math.random() * emptySquares.length);
    const chosenSquare = emptySquares[random];
    chosenSquare.textContent = currentPlayer.marker;

     // Call a function to check for a win or a draw
    checkGameResultAgainstComp();

    // Switch to the next player's turn
    if(!isGameWon){
        switchPlayer();
    } 

   }     
};




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
    isGameWon = false;
    currentPlayer = players[0];
    prompt.textContent = '';
    setTimeout(()=>{
          prompt.textContent = `${currentPlayer.name} your Move!`

        }, 600);
    
    

});

resetBtn.addEventListener('click', () =>{
  const squares = document.querySelectorAll('.squares');
  for(let i = 0; i < squares.length; i++){
    squares[i].textContent = '';
  }
  gameOverModal.style.display = 'none';
  player1score.textContent = 0;
  player2score.textContent = 0;
  isGameWon = false;
  players[0].score = 0;
  players[1].score = 0;
  prompt.textContent = '';

})



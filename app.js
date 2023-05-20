const startBtn = document.querySelector('#start-btn');
const startModal = document.querySelector('.game-start');
const playersInfo = document.querySelector('.profile-modal');
const modalInfoBack = document.querySelector('.modal-back');
const playBtn = document.querySelector('#submit');


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
    
    console.log(firstPlayer);
    console.log(player1Marker);
    console.log(player2Marker);
    console.log(currentPlayer);
   
    playersInfo.remove();
    modalInfoBack.remove();
    
    currentPlayer.playTurn();

    console.log(player1Marker);
    console.log(player2Marker);

});

function Player(name, marker) {
  return {
    name: name,
    marker: marker,
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
            console.log('Invalid move. Try again.');
          }
        });
      });
    }
  };
}



// const Player = (name, marker) =>{
//     this.name = name;
//     this.marker = marker;
    
//     const playTurn = () =>{
//         const currentPlayer = this;
//         const squares = document.querySelectorAll('.squares');
      
//         squares.forEach(square => square.addEventListener('click', () =>{
            
//             if(square.textContent === ''){
//                 square.textContent = currentPlayer.marker;
//                 console.log(`${currentPlayer.name} placed ${currentPlayer.marker}`);

//                 checkGameResult();
//                 switchPlayer();
                
//             }else{
//                 console.log('Invalid Move. Try again.')
//             }
//         })) 
//     }

//     return {name,marker,playTurn};

// };


// function switchPlayer() {
//   currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
// }



    
      



function checkGameResult(){

    }







 function switchPlayer(){
    const prompt = document.querySelector('.prompt');
         if(currentPlayer === players[0]){
             currentPlayer = players[1];
              prompt.textContent = `${currentPlayer.name} your Move!`
         }else{
             currentPlayer = players[0];          
             prompt.textContent = `${currentPlayer.name} your Move!`
         }
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










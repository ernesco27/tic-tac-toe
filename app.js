const startBtn = document.querySelector('#start-btn');
const startModal = document.querySelector('.game-start');
const playersInfo = document.querySelector('.profile-modal');
const modalInfoBack = document.querySelector('.modal-back');
const playBtn = document.querySelector('#submit');






startBtn.addEventListener('click', () =>{
    startModal.style.display = 'none';
    modalInfoBack.style.display = 'block'
    playersInfo.style.display = 'block';
});

playBtn.addEventListener('click', () =>{
    playersInfo.remove();
    modalInfoBack.remove();
})
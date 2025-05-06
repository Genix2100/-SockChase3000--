let level = 1;
let sock = document.getElementById('sock');
let alien = document.getElementById('alien');
let message = document.getElementById('message');
let levelText = document.getElementById('level');
let startBtn = document.getElementById('startBtn');
let menu = document.getElementById('menu');
let game = document.getElementById('game');

let sockX = sock.offsetLeft;
let sockY = sock.offsetTop;
let alienX = alien.offsetLeft;
let alienY = alien.offsetTop;
let gameInterval;
let alienSpeed = 3;
let alienDirection = 1;

startBtn.addEventListener('click', startGame);

function startGame() {
    menu.style.display = 'none';
    game.style.display = 'block';
    levelText.innerText = level;
    document.addEventListener('keydown', moveSock);
    gameInterval = setInterval(gameLoop, 20);
}

function moveSock(event) {
    if (event.key === 'w') sockY -= 5;
    if (event.key === 'a') sockX -= 5;
    if (event.key === 's') sockY += 5;
    if (event.key === 'd') sockX += 5;

    sock.style.left = sockX + 'px';
    sock.style.top = sockY + 'px';
}

function gameLoop() {
    moveAlien();
    checkCollision();
    randomTrumpPopUp();
}

function moveAlien() {
    alienY += alienSpeed * alienDirection;
    if (alienY <= 0 || alienY >= 360) alienDirection *= -1;
    alien.style.top = alienY + 'px';
}

function checkCollision() {
    if (Math.abs(sockX - alienX) < 50 && Math.abs(sockY - alienY) < 50) {
        level++;
        levelText.innerText = level;
        resetAlienPosition();
        showMessage("You caught the alien! Moving to level " + level);
        if (level > 100) {
            clearInterval(gameInterval);
            showMessage("You completed the game! 🎉");
        }
    }
}

function resetAlienPosition() {
    alienX = Math.random() * 500;
    alienY = Math.random() * 300;
    alien.style.left = alienX + 'px';
    alien.style.top = alienY + 'px';
}

function showMessage(text) {
    message.innerText = text;
    message.style.visibility = 'visible';
    setTimeout(() => message.style.visibility = 'hidden', 2000);
}

function randomTrumpPopUp() {
    if (Math.random() < 0.05) {
        setTimeout(() => alert('Trump: "You are doing great!" 🇺🇸'), 30000);
    }
}

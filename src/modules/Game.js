const {Player, Computer} = require('./Player');
const Ship = require('./Ship');

function Game () {
    const player = new Player();
    const computer = new Computer();

    const ship = new Ship(3, true);
    const ship2 = new Ship(5, false);

    player.gameboard.placeShip(ship2, 5, 2);
    computer.gameboard.placeShip(ship, 0, 0);

    runGame(player, computer);
}

function runGame (player, computer) {
    const playerContainer = document.getElementById('playerBoard');
    const computerContainer = document.getElementById('computerBoard');
    const gameOver = document.getElementById('gameOver');
    const overlay = document.querySelector('.overlay');
    const restart = document.querySelector('.restart');
    let gameEnded = false;
    const ship = new Ship(3, true);
    const ship2 = new Ship(5, false);

    playerContainer.innerHTML = '';
    computerContainer.innerHTML = '';

    renderBoard(playerContainer, player);
    renderBoard(computerContainer, computer);

    const playerMove = (e) => {
        if (gameEnded) {
            return;
        }

        const cell = e.target;
        
        const hit = player.attack(computer.gameboard, cell.id[0], cell.id[1]);

        if (hit) {
            renderBoard (computerContainer, computer);

            if (endGame()) {
                gameEnded = true;
                return;
            }

            computer.makeRandomAttack(player.gameboard);
        
            renderBoard (playerContainer, player);
            
            if (endGame()) {
                gameEnded = true;
                return;
            }
        }
    }

    const endGame = () => {
        const win = document.querySelector('.win');

        if (computer.gameboard.allShipsSunk()) {
            computerContainer.removeEventListener('click', playerMove);
            win.innerText = 'You Win!';
            gameOver.classList.add('active');
            overlay.classList.add('active');
            return true;
        } else if (player.gameboard.allShipsSunk()) {
            computerContainer.removeEventListener('click', playerMove);
            win.innerText = 'You Lose!';
            gameOver.classList.add('active');
            overlay.classList.add('active');
            return true;
        }

        return false;
    }

    computerContainer.addEventListener('click', playerMove);
}

function renderBoard (container, player) {
    container.innerHTML = '';

    for (let x = 0; x < 10; x++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        for (let y = 0; y < 10; y++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            const ship = player.gameboard.grid[x][y];
            
            if (ship && ship.isHit(x, y)) {
                cell.classList.add('hit');
            } else if (player.gameboard.grid[x][y] === null &&
                player.gameboard.missedAttacks.some(attack => attack.row == x && attack.col == y)) {
                cell.classList.add('miss');
            }

            cell.setAttribute('id', `${x}${y}`);

            row.appendChild(cell);
        }
    }
}

module.exports = Game;
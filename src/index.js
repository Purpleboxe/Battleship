const {Player, Computer} = require('./modules/Player');
const Ship = require('./modules/Ship');

function renderGameboards (player, computer) {
    const playerContainer = document.getElementById('playerBoard');
    const computerContainer = document.getElementById('computerBoard');

    playerContainer.innerHTML = '';
    computerContainer.innerHTML = '';

    renderBoard(playerContainer, player, false, computer);
    renderBoard(computerContainer, computer, true, player);
}

function renderBoard (container, player, computer, enemy) {
    for (let x = 0; x < 10; x++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        for (let y = 0; y < 10; y++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (computer) {
                cell.addEventListener('click', () => {
                    player.attack(enemy.gameboard, x, y);
                    cellHit(player, x, y, cell);
                });
            }

            row.appendChild(cell);
        }
    }
}

function cellHit (player, row, col, cell) {
    const ship = player.gameboard.grid[row][col];

    if (ship !== null && !ship.isHit(row, col)) {
        cell.classList.add('hit');
    }
}

const player = new Player();
const computer = new Computer();

const ship = new Ship(3, true);

computer.gameboard.placeShip(ship, 0, 0);

renderGameboards(player, computer);
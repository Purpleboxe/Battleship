/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const Player = require('./Player');
const Computer = require('./Computer');

function placeShips(player, computer) {
  const placeShip = document.getElementById('placeShip');
  const placeBoard = document.getElementById('placeBoard');
  const overlay = document.querySelector('.overlay');
  const rotateBtn = document.querySelector('.rotate');

  let isVertical = false;

  rotateBtn.onclick = () => { isVertical = !isVertical; };

  const handleCellClick = (x, y) => {
    if (player.currentShip) {
      player.currentShip.isVertical = isVertical;
      const placed = player.gameboard.placeShip(player.currentShip, x, y);

      if (placed) {
        const clickedCell = document.getElementById(`${x}${y}`);
        clickedCell.classList.add('placed');

        if (!isVertical) {
          for (let i = 0; i < player.currentShip.length; i += 1) {
            const cell2 = document.getElementById(`${x}${y + i}`);
            if (cell2) {
              cell2.classList.add('placed');
            }
          }
        } else {
          for (let i = 0; i < player.currentShip.length; i += 1) {
            const cell2 = document.getElementById(`${x + i}${y}`);
            if (cell2) {
              cell2.classList.add('placed');
            }
          }
        }

        player.nextShipToPlace();
        if (!player.currentShip) {
          computer.placeShipsRandomly();
          runGame(player, computer);
          placeShip.classList.remove('active');
          overlay.classList.remove('active');
        }
      }
    }
  };

  const updatePreview = (x, y, mouseover) => {
    const cell = document.getElementById(`${x}${y}`);
    if (mouseover) {
      cell.classList.add('active');
      if (player.currentShip) {
        if (!isVertical) {
          for (let i = 0; i < player.currentShip.length; i += 1) {
            const cell2 = document.getElementById(`${x}${y + i}`);
            if (cell2) {
              cell2.classList.add('active');
            }
          }
        } else {
          for (let i = 0; i < player.currentShip.length; i += 1) {
            const cell2 = document.getElementById(`${x + i}${y}`);
            if (cell2) {
              cell2.classList.add('active');
            }
          }
        }
      }
    } else {
      cell.classList.remove('active');
      if (!player.currentShip) {
        return;
      }
      for (let i = 0; i <= player.currentShip.length; i += 1) {
        const cell2 = document.getElementById(`${x}${y + i}`);
        const cell3 = document.getElementById(`${x + i}${y}`);
        if (cell2) {
          cell2.classList.remove('active');
        }
        if (cell3) {
          cell3.classList.remove('active');
        }
      }
    }
  };

  const renderPlaceBoard = () => {
    for (let x = 0; x < 10; x += 1) {
      const row = document.createElement('div');
      row.classList.add('row');
      placeBoard.appendChild(row);
      for (let y = 0; y < 10; y += 1) {
        const cell = document.createElement('div');
        cell.classList.add('preview');
        cell.setAttribute('id', `${x}${y}`);
        // eslint-disable-next-line no-loop-func
        cell.addEventListener('click', () => handleCellClick(x, y));
        cell.addEventListener('mouseover', () => updatePreview(x, y, true));
        cell.addEventListener('mouseout', () => updatePreview(x, y, false));
        row.appendChild(cell);
      }
    }
  };

  placeShip.classList.add('active');
  overlay.classList.add('active');

  placeBoard.innerHTML = '';
  renderPlaceBoard();
}

function Game() {
  const player = new Player();
  const computer = new Computer();

  placeShips(player, computer);
}

function renderBoard(container, player, show) {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';

  for (let x = 0; x < 10; x += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);

    for (let y = 0; y < 10; y += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const ship = player.gameboard.grid[x][y];

      if (ship && ship.isSunk()) {
        cell.classList.add('sunk');
      } else if (ship && ship.isHit(x, y)) {
        cell.classList.add('hit');
      } else if (player.gameboard.grid[x][y] === null
                    && player.gameboard.missedAttacks
                      // eslint-disable-next-line eqeqeq
                      .some((attack) => attack.row == x && attack.col == y)) {
        cell.classList.add('miss');
      } else if (ship && show) {
        cell.classList.add('show');
      }

      cell.setAttribute('id', `${x}${y}`);

      row.appendChild(cell);
    }
  }
}

function runGame(player, computer) {
  const playerContainer = document.getElementById('playerBoard');
  const computerContainer = document.getElementById('computerBoard');
  const gameOver = document.getElementById('gameOver');
  const overlay = document.querySelector('.overlay');
  const restart = document.querySelector('.restart');
  let gameEnded = false;

  playerContainer.innerHTML = '';
  computerContainer.innerHTML = '';

  renderBoard(playerContainer, player, true);
  renderBoard(computerContainer, computer);

  const endGame = () => {
    const verdict = document.querySelector('.verdict');

    const resetGame = () => {
      gameOver.classList.remove('active');
      overlay.classList.remove('active');
      playerContainer.innerHTML = '';
      computerContainer.innerHTML = '';

      Game();
    };

    if (computer.gameboard.allShipsSunk()) {
      verdict.innerText = 'You Win!';
      verdict.classList.remove('win', 'lose');
      verdict.classList.add('win');
      gameOver.classList.add('active');
      overlay.classList.add('active');
      restart.addEventListener('click', resetGame);
      return true;
    } if (player.gameboard.allShipsSunk()) {
      verdict.innerText = 'You Lose!';
      verdict.classList.remove('win', 'lose');
      verdict.classList.add('lose');
      gameOver.classList.add('active');
      overlay.classList.add('active');
      restart.addEventListener('click', resetGame);
      return true;
    }

    return false;
  };

  const playerMove = (e) => {
    if (gameEnded) {
      return;
    }

    const cell = e.target;

    const hit = player.attack(computer.gameboard, cell.id[0], cell.id[1]);

    if (hit) {
      renderBoard(computerContainer, computer);

      if (endGame()) {
        gameEnded = true;
        return;
      }

      computer.makeRandomAttack(player.gameboard);

      renderBoard(playerContainer, player, true);

      if (endGame()) {
        gameEnded = true;
      }
    }
  };

  computerContainer.addEventListener('click', playerMove);
}

module.exports = Game;

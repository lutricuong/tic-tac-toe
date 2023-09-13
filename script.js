const player = (name, sign) => {
    return {name, sign};
}
const gameboard = (() => {
    const buttonPickPlayer = document.querySelector('.player-pick');
    const playerDialog = document.querySelector('.player-dialog');
    const playerForm = document.querySelector('.player-form');
    const player1name = document.querySelector('#player1-name');
    const player2name = document.querySelector('#player2-name');
    const player1sign = document.getElementsByName('sign');
    const buttonConfirmPlayer = document.querySelector('.player-confirm');
    const display = document.querySelector('.display');
    const playerCurrent = document.querySelector('.player-current');
    const player1boardName = document.querySelector('.player1-board-name');
    const player2boardName = document.querySelector('.player2-board-name');
    const player1boardPoint = document.querySelector('.player1-board-point');
    const player2boardPoint = document.querySelector('.player2-board-point');
    const tiePoint = document.querySelector('.tie-point');
    let player1;
    let player2;

    const showDialog = () => {
        playerForm.reset();
        playerDialog.showModal();
    }

    const closeDialog = (e) => {
        e.preventDefault();
        gameplay.reset();
        player1 = player(player1name.value, getSignPlayer1());
        player2 = player(player2name.value, getSignPlayer2());
        showDisplay();
        playerDialog.close();
    }

    const getSignPlayer1 = () => {
        for (i = 0; i < player1sign.length; i++) {
            if (player1sign[i].checked)
            return player1sign[i].value;
        }
    }

    const getSignPlayer2 = () => {
        if (getSignPlayer1() == 'X') {
            return 'O';
        }
        else return 'X';
    }

    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    const showDisplay = () => {
        if (player1.sign == 'X') {
            playerCurrent.textContent = player1.name + ' (' + player1.sign + ')' + ' turn';
        }
        else playerCurrent.textContent = player2.name + ' (' + player2.sign + ')' + ' turn';
        player1boardName.textContent = player1.name + ' (' + player1.sign + ')';
        player2boardName.textContent = player2.name + ' (' + player2.sign + ')';
        player1boardPoint.textContent = '0';
        player2boardPoint.textContent = '0';
        tiePoint.textContent = '0';
        display.style.display = "grid";
    }
    buttonPickPlayer.addEventListener('click', showDialog);
    buttonConfirmPlayer.addEventListener('click', closeDialog);

    return {buttonConfirmPlayer, playerCurrent, player1boardPoint, player2boardPoint, tiePoint, getPlayer1, getPlayer2}
})();

const gameplay = (() => {
    const buttonRestart = document.querySelector('.restart');
    const tics = Array.from(document.querySelectorAll('.tic'));
    const logic = new Array;
    let player1;
    let player2;
    let round = 0;

    const reset = () => {
        tics.forEach((tic) => tic.textContent = "");
        for(let i=0;i<9;i++) {
            logic.pop();
        }
        round = 0;
        return round;
    }

    const displaySign = (tic) => {
        player1 = gameboard.getPlayer1();
        player2 = gameboard.getPlayer2();
        if (tic.textContent == '' && player1.sign == 'X') {
            if (round % 2 == 0) {
                    gameboard.playerCurrent.textContent = player2.name + ' (' + player2.sign + ')' + ' turn';
                    tic.textContent = 'X';
                    logic[tics.indexOf(tic)] = player1.sign;
                }
            else {
                gameboard.playerCurrent.textContent = player1.name + ' (' + player1.sign + ')' + ' turn';
                tic.textContent = 'O';
                logic[tics.indexOf(tic)] = player2.sign;
            }
            round++;
        }
        else if (tic.textContent == '' && player2.sign == 'X') {
            if (round % 2 == 1) {
                    gameboard.playerCurrent.textContent = player1.name + ' (' + player1.sign + ')' + ' turn';
                    tic.textContent = 'X';
                    logic[tics.indexOf(tic)] = player2.sign;
                }
            else {
                gameboard.playerCurrent.textContent = player2.name + ' (' + player2.sign + ')' + ' turn';
                tic.textContent = 'O';
                logic[tics.indexOf(tic)] = player1.sign;
            }
            round++;
        }
        if (logic[0] == player1.sign && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == player1.sign && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == player1.sign && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == player1.sign && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == player1.sign && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == player1.sign && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == player1.sign && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == player1.sign && logic[2] == logic[4] && logic[4] == logic[6]) {
            gameboard.player1boardPoint.textContent = Number(gameboard.player1boardPoint.textContent) + 1;
            gameboard.playerCurrent.textContent = player1.name + ' (' + player1.sign + ')' + ' has won';
            reset();
        }
        else if (logic[0] == player2.sign && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == player2.sign && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == player2.sign && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == player2.sign && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == player2.sign && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == player2.sign && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == player2.sign && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == player2.sign && logic[2] == logic[4] && logic[4] == logic[6]) {
            gameboard.player2boardPoint.textContent = Number(gameboard.player2boardPoint.textContent) + 1;
            gameboard.playerCurrent.textContent = player2.name + ' (' + player2.sign + ')' + ' has won';
            reset();
        }
        else if (round === 9) {
            gameboard.tiePoint.textContent = Number(gameboard.tiePoint.textContent) + 1;
            gameboard.playerCurrent.textContent = 'It\'s a draw!';
            reset();
        }
    }

    const restart = () => {
        if (player1.sign == 'X') {
            gameboard.playerCurrent.textContent = player1.name + ' (' + player1.sign + ')' + ' turn';
        }
        else gameboard.playerCurrent.textContent = player2.name + ' (' + player2.sign + ')' + ' turn';
        reset();
    }

    tics.forEach((tic) => tic.addEventListener('click', displaySign.bind(tics, tic)));
    buttonRestart.addEventListener('click', restart);
    return {reset};
})();


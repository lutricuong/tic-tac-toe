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

    const displayPlayerCurrentFisrt = () => {
        if (player1.sign == 'X') {
            playerCurrent.textContent = player1.name + ' (' + player1.sign + ')' + ' turn';
        }
        else playerCurrent.textContent = player2.name + ' (' + player2.sign + ')' + ' turn';
    }

    const showDisplay = () => {
        displayPlayerCurrentFisrt();
        player1boardName.textContent = player1.name + ' (' + player1.sign + ')';
        player2boardName.textContent = player2.name + ' (' + player2.sign + ')';
        player1boardPoint.textContent = '0';
        player2boardPoint.textContent = '0';
        tiePoint.textContent = '0';
        display.style.display = "grid";
    }
    buttonPickPlayer.addEventListener('click', showDialog);
    buttonConfirmPlayer.addEventListener('click', closeDialog);

    return {buttonConfirmPlayer, playerCurrent, player1boardPoint, player2boardPoint, tiePoint, getPlayer1, getPlayer2, displayPlayerCurrentFisrt}
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
    }

    const play = (tic) => {
        player1 = gameboard.getPlayer1();
        player2 = gameboard.getPlayer2();
        if (tic.textContent == '' && player1.sign == 'X') {
            if (round % 2 == 0) {
                getSignDisplay(tic, player1, player2);
                }
            else {
                getSignDisplay(tic, player2, player1);
            }
            round++;
        }
        else if (tic.textContent == '' && player2.sign == 'X') {
            if (round % 2 == 0) {
                getSignDisplay(tic, player2, player1);
                }
            else {
                getSignDisplay(tic, player1, player2);
            }
            round++;
        }

        if (checkWinner(tics.indexOf(tic), player1)) {
            getPoint(gameboard.player1boardPoint, player1);
            reset();
        }
        else if (checkWinner(tics.indexOf(tic), player2)) {
            getPoint(gameboard.player2boardPoint, player2);
            reset();
        }
        else if (round === 9) {
            gameboard.tiePoint.textContent = Number(gameboard.tiePoint.textContent) + 1;
            gameboard.playerCurrent.textContent = 'It\'s a draw!';
            reset();
        }
    }

    const getSignDisplay = (tic, player1, player2) => {
        gameboard.playerCurrent.textContent = player2.name + ' (' + player2.sign + ')' + ' turn';
        tic.textContent = player1.sign;
        logic[tics.indexOf(tic)] = player1.sign;
    }

    const getPoint = (playerboardPoint, player) => {
        playerboardPoint.textContent = Number(playerboardPoint.textContent) + 1;
        gameboard.playerCurrent.textContent = player.name + ' (' + player.sign + ')' + ' has won';
    }

    const checkWinner = (index, player) => {
        const winCondition = [
            [0, 1, 2], [3, 4, 5], [6, 7 ,8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        return winCondition.filter((condition1) => condition1.includes(index))
            .some((condition2) => condition2.every((condition3) => logic[condition3] === player.sign));
    }

    const restart = () => {
        gameboard.displayPlayerCurrentFisrt();
        reset();
    }

    tics.forEach((tic) => tic.addEventListener('click', play.bind(tics, tic)));
    buttonRestart.addEventListener('click', restart);
    return {reset};
})();


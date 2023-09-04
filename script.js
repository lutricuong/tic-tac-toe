const player = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {
    const playerDialog = document.querySelector('.player-dialog');
    const playerForm = document.querySelector('form');
    const player1name = document.querySelector('#player1-name');
    const player2name = document.querySelector('#player2-name');
    const player1marker = document.getElementsByName('marker');
    const buttonPickPlayer = document.querySelector('.player-pick');
    const buttonConfirmPlayer = document.querySelector('.player-confirm');
    const gameplay = document.querySelector('.gameplay');
    const tics = Array.from(document.querySelectorAll('.tic'));
    const board = document.querySelector('.board');
    const player1boardName = document.querySelector('.player1-board-name');
    const player2boardName = document.querySelector('.player2-board-name');
    const player1boardPoint = document.querySelector('.player1-board-point');
    const player2boardPoint = document.querySelector('.player2-board-point');
    const tiePoint = document.querySelector('.tie-point');
    const count = [];
    const logic = [];
    let player1;
    let player2;

    const showDialog = () => {
        playerForm.reset();
        playerDialog.showModal();
    }
    const closeDialog = (e) => {
        e.preventDefault();
        player1 = player(player1name.value, chooseMarker());
        if (player1.marker == 'X') {
            player2 = player(player2name.value, 'O');
        }
        else player2 = player(player2name.value, 'X');
        player1boardName.textContent = player1name.value;
        player2boardName.textContent = player2name.value;
        player1boardPoint.textContent = '0';
        player2boardPoint.textContent = '0';
        tiePoint.textContent = '0';
        playerDialog.close();
        showGameplay();
    }
    const showGameplay = () => {
        gameplay.style.display = "grid";
    }
    const chooseMarker = () => {
        for (i = 0; i < player1marker.length; i++) {
            if (player1marker[i].checked)
            return player1marker[i].value;
        }
    }
    const displayMarker = (tic) => {
        if (count.length == 0 || count.length == 2 ||
            count.length == 4 || count.length == 6 ||
            count.length == 8) {
                tic.textContent = "X";
                logic[tics.indexOf(tic)] = player1;
                count.push(player1);
            }
        else {
            tic.textContent = "O";
            logic[tics.indexOf(tic)] = player2;
            count.push(player2);
        }
        console.log(logic);
        if (logic[0] == player1 && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == player1 && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == player1 && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == player1 && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == player1 && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == player1 && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == player1 && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == player1 && logic[2] == logic[4] && logic[4] == logic[6]) {
            board.textContent = "cuong win";
        }
        if (logic[0] == player2 && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == player2 && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == player2 && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == player2 && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == player2 && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == player2 && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == player2 && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == player2 && logic[2] == logic[4] && logic[4] == logic[6]) {
            board.textContent = "enemy win";
        }
    }

    buttonPickPlayer.addEventListener('click', showDialog);
    buttonConfirmPlayer.addEventListener('click', closeDialog);
    tics.forEach((tic) => tic.addEventListener('click', displayMarker.bind(tics, tic)));
    
    return {showDialog, closeDialog, tics};
})();


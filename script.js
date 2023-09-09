const player = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {
    const buttonPickPlayer = document.querySelector('.player-pick');
    const playerDialog = document.querySelector('.player-dialog');
    const playerForm = document.querySelector('.player-form');
    const player1name = document.querySelector('#player1-name');
    const player2name = document.querySelector('#player2-name');
    const player1marker = document.getElementsByName('marker');
    const buttonConfirmPlayer = document.querySelector('.player-confirm');
    const gameplay = document.querySelector('.gameplay');
    const playerCurrent = document.querySelector('.player-current');
    const tics = Array.from(document.querySelectorAll('.tic'));
    const player1boardName = document.querySelector('.player1-board-name');
    const player2boardName = document.querySelector('.player2-board-name');
    const player1boardPoint = document.querySelector('.player1-board-point');
    const player2boardPoint = document.querySelector('.player2-board-point');
    const tiePoint = document.querySelector('.tie-point');

    let count = [];
    let logic = [];
    let player1;
    let player2;

    const showDialog = () => {
        playerForm.reset();
        playerDialog.showModal();
    }
    const chooseMarker = () => {
        for (i = 0; i < player1marker.length; i++) {
            if (player1marker[i].checked)
            return player1marker[i].value;
        }
    }
    const resetBoard = () => {
        tics.forEach((tic) => tic.textContent = "");
        logic = [];
        count = [];
    }
    const closeDialog = (e) => {
        e.preventDefault();
        player1 = player(player1name.value, chooseMarker());
        if (player1.marker == 'X') {
            player2 = player(player2name.value, 'O');
            playerCurrent.textContent = player1.name + ' (' + player1.marker + ')' + ' turn';
        }
        else {
            player2 = player(player2name.value, 'X');
            playerCurrent.textContent = player2.name + ' (' + player2.marker + ')' + ' turn';
        }
        player1boardName.textContent = player1name.value + ' (' + player1.marker + ')';
        player2boardName.textContent = player2name.value + ' (' + player2.marker + ')';
        player1boardPoint.textContent = '0';
        player2boardPoint.textContent = '0';
        tiePoint.textContent = '0';
        gameplay.style.display = "grid";
        resetBoard();
        playerDialog.close();
    }
    const displayMarker = (tic) => {
        if (tic.textContent == '' && player1.marker == 'X') {
            if (count.length == 0 || count.length == 2 ||
                count.length == 4 || count.length == 6 ||
                count.length == 8) {
                    playerCurrent.textContent = player2.name + ' (' + player2.marker + ')' + ' turn';
                    tic.textContent = 'X';
                    logic[tics.indexOf(tic)] = player1;
                    count.push(player1);
                }
            else {
                playerCurrent.textContent = player1.name + ' (' + player1.marker + ')' + ' turn';
                tic.textContent = 'O';
                logic[tics.indexOf(tic)] = player2;
                count.push(player2);
            }
        }
        else if (tic.textContent == '' && player1.marker == 'O') {
            if (count.length == 0 || count.length == 2 ||
                count.length == 4 || count.length == 6 ||
                count.length == 8) {
                    playerCurrent.textContent = player1.name + ' (' + player1.marker + ')' + ' turn';
                    tic.textContent = 'X';
                    logic[tics.indexOf(tic)] = player2;
                    count.push(player2);
                }
            else {
                playerCurrent.textContent = player2.name + ' (' + player2.marker + ')' + ' turn';
                tic.textContent = 'O';
                logic[tics.indexOf(tic)] = player1;
                count.push(player1);
            }
        }
        if (logic[0] == player1 && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == player1 && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == player1 && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == player1 && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == player1 && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == player1 && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == player1 && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == player1 && logic[2] == logic[4] && logic[4] == logic[6]) {
            player1boardPoint.textContent = Number(player1boardPoint.textContent) + 1;
            playerCurrent.textContent = player1.name + ' (' + player1.marker + ')' + ' has won';
            resetBoard();
        }
        else if (logic[0] == player2 && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == player2 && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == player2 && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == player2 && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == player2 && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == player2 && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == player2 && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == player2 && logic[2] == logic[4] && logic[4] == logic[6]) {
            player2boardPoint.textContent = Number(player2boardPoint.textContent) + 1;
            playerCurrent.textContent = player2.name + ' (' + player2.marker + ')' + ' has won';
            resetBoard();
        }
        else if (!(logic[0] == undefined || logic[1] == undefined || logic[2] == undefined ||
            logic[3] == undefined || logic[4] == undefined || logic[5] == undefined ||
            logic[6] == undefined || logic[7] == undefined || logic[8] == undefined)) {
            tiePoint.textContent = Number(tiePoint.textContent) + 1;
            playerCurrent.textContent = 'It\'s a draw!';
            resetBoard();
        }
    }

    buttonPickPlayer.addEventListener('click', showDialog);
    buttonConfirmPlayer.addEventListener('click', closeDialog);
    tics.forEach((tic) => tic.addEventListener('click', displayMarker.bind(tics, tic)));
    
    return {};
})();


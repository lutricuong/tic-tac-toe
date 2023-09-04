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
    let player1;
    let player2;
    const chooseMarker = () => {
        for (i = 0; i < player1marker.length; i++) {
            if (player1marker[i].checked)
            return player1marker[i].value;
        }
    }
    const showDialog = () => {
        playerForm.reset();
        playerDialog.showModal();
    }
    const closeDialog = (e) => {
        e.preventDefault();
        player1 = player(player1name.value, chooseMarker());
        player2 = player(player2name.value, 'O');
        playerDialog.close();
    }

    buttonPickPlayer.addEventListener('click', showDialog);
    buttonConfirmPlayer.addEventListener('click', closeDialog)
    const tics = Array.from(document.querySelectorAll('.tic'));
    const winner = document.querySelector('.winner');
    const count = [];
    const logic = [];
    const displayMarker = (tic) => {
        if (count.length == 0 || count.length == 2 ||
            count.length == 4 || count.length == 6 ||
            count.length == 8) {
                tic.textContent = "X"
                logic[tics.indexOf(tic)] = player1;
                count.push(player1);
            }
        else {
            tic.textContent = "O"
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
            winner.textContent = "cuong win";
        }
        if (logic[0] == player2 && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == player2 && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == player2 && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == player2 && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == player2 && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == player2 && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == player2 && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == player2 && logic[2] == logic[4] && logic[4] == logic[6]) {
            winner.textContent = "enemy win";
        }
    }
    const gameplay = tics.forEach((tic) => tic.addEventListener('click', displayMarker.bind(tics, tic)));
    return {showDialog, closeDialog, gameplay};
})();


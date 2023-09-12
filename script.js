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


    const showDialog = () => {
        playerForm.reset();
        playerDialog.showModal();
    }

    const closeDialog = (e) => {
        e.preventDefault();
        gameplay.reset(gameplay.tics(), gameplay.logic(), gameplay.count());
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
    const player1 = () => player(player1name.value, getSignPlayer1());
    const player2 = () => player(player2name.value, getSignPlayer2());
    const showDisplay = () => {
        if (player1().sign == 'X') {
            playerCurrent.textContent = player1().name + ' (' + player1().sign + ')' + ' turn';
        }
        else playerCurrent.textContent = player2().name + ' (' + player2().sign + ')' + ' turn';
        player1boardName.textContent = player1().name + ' (' + player1().sign + ')';
        player2boardName.textContent = player2().name + ' (' + player2().sign + ')';
        player1boardPoint.textContent = '0';
        player2boardPoint.textContent = '0';
        tiePoint.textContent = '0';
        display.style.display = "grid";
    }
    buttonPickPlayer.addEventListener('click', showDialog);
    buttonConfirmPlayer.addEventListener('click', closeDialog);

    return {buttonConfirmPlayer, playerCurrent, player1boardPoint, player2boardPoint, tiePoint, player1, player2}
})();

const gameplay = (() => {
    const _tics = Array.from(document.querySelectorAll('.tic'));
    const _count = new Array;
    const _logic = new Array;
    const buttonRestart = document.querySelector('.restart');
    const tics = () => _tics;
    const count = () => _count;
    const logic = () => _logic;

    const reset = (tics, logic, count) => {
        tics.forEach((tic) => tic.textContent = "");
        for(let i=0;i<9;i++) {
            logic.pop();
        }
        for(let i=0;i<9;i++) {
            count.pop();
        }
    }

    const displaySign = (tic) => {
        if (tic.textContent == '' && gameboard.player1().sign == 'X') {
            if (_count.length == 0 || _count.length == 2 ||
                _count.length == 4 || _count.length == 6 ||
                _count.length == 8) {
                    gameboard.playerCurrent.textContent = gameboard.player2().name + ' (' + gameboard.player2().sign + ')' + ' turn';
                    tic.textContent = 'X';
                    _logic[_tics.indexOf(tic)] = gameboard.player1().sign;
                    _count.push(gameboard.player1());
                }
            else {
                gameboard.playerCurrent.textContent = gameboard.player1().name + ' (' + gameboard.player1().sign + ')' + ' turn';
                tic.textContent = 'O';
                _logic[_tics.indexOf(tic)] = gameboard.player2().sign;
                _count.push(gameboard.player2());
            }
        }
        else if (tic.textContent == '' && gameboard.player2().sign == 'X') {
            if (_count.length == 0 || _count.length == 2 ||
                _count.length == 4 || _count.length == 6 ||
                _count.length == 8) {
                    gameboard.playerCurrent.textContent = gameboard.player1().name + ' (' + gameboard.player1().sign + ')' + ' turn';
                    tic.textContent = 'X';
                    _logic[_tics.indexOf(tic)] = gameboard.player2().sign;
                    _count.push(gameboard.player2());
                }
            else {
                gameboard.playerCurrent.textContent = gameboard.player2().name + ' (' + gameboard.player2().sign + ')' + ' turn';
                tic.textContent = 'O';
                _logic[_tics.indexOf(tic)] = gameboard.player1().sign;
                _count.push(gameboard.player1());
            }
        }
        if (_logic[0] == gameboard.player1().sign && _logic[0] == _logic[1] && _logic[1] == _logic[2] ||
            _logic[3] == gameboard.player1().sign && _logic[3] == _logic[4] && _logic[4] == _logic[5] ||
            _logic[6] == gameboard.player1().sign && _logic[6] == _logic[7] && _logic[7] == _logic[8] ||
            _logic[0] == gameboard.player1().sign && _logic[0] == _logic[3] && _logic[3] == _logic[6] ||
            _logic[1] == gameboard.player1().sign && _logic[1] == _logic[4] && _logic[4] == _logic[7] ||
            _logic[2] == gameboard.player1().sign && _logic[2] == _logic[5] && _logic[5] == _logic[8] ||
            _logic[0] == gameboard.player1().sign && _logic[0] == _logic[4] && _logic[4] == _logic[8] ||
            _logic[2] == gameboard.player1().sign && _logic[2] == _logic[4] && _logic[4] == _logic[6]) {
            gameboard.player1boardPoint.textContent = Number(gameboard.player1boardPoint.textContent) + 1;
            gameboard.playerCurrent.textContent = gameboard.player1().name + ' (' + gameboard.player1().sign + ')' + ' has won';
            reset(_tics, _logic, _count);
        }
        else if (_logic[0] == gameboard.player2().sign && _logic[0] == _logic[1] && _logic[1] == _logic[2] ||
            _logic[3] == gameboard.player2().sign && _logic[3] == _logic[4] && _logic[4] == _logic[5] ||
            _logic[6] == gameboard.player2().sign && _logic[6] == _logic[7] && _logic[7] == _logic[8] ||
            _logic[0] == gameboard.player2().sign && _logic[0] == _logic[3] && _logic[3] == _logic[6] ||
            _logic[1] == gameboard.player2().sign && _logic[1] == _logic[4] && _logic[4] == _logic[7] ||
            _logic[2] == gameboard.player2().sign && _logic[2] == _logic[5] && _logic[5] == _logic[8] ||
            _logic[0] == gameboard.player2().sign && _logic[0] == _logic[4] && _logic[4] == _logic[8] ||
            _logic[2] == gameboard.player2().sign && _logic[2] == _logic[4] && _logic[4] == _logic[6]) {
            gameboard.player2boardPoint.textContent = Number(gameboard.player2boardPoint.textContent) + 1;
            gameboard.playerCurrent.textContent = gameboard.player2().name + ' (' + gameboard.player2().sign + ')' + ' has won';
            reset(_tics, _logic, _count);
        }
        else if (!(_logic[0] == undefined || _logic[1] == undefined || _logic[2] == undefined ||
            _logic[3] == undefined || _logic[4] == undefined || _logic[5] == undefined ||
            _logic[6] == undefined || _logic[7] == undefined || _logic[8] == undefined)) {
            gameboard.tiePoint.textContent = Number(gameboard.tiePoint.textContent) + 1;
            gameboard.playerCurrent.textContent = 'It\'s a draw!';
            reset(_tics, _logic, _count);
        }
    }

    _tics.forEach((tic) => tic.addEventListener('click', displaySign.bind(_tics, tic)));
    buttonRestart.addEventListener('click',() => reset(_tics, _logic, _count));
    return {reset, tics, count, logic};
})();


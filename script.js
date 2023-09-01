const player = (name, marker) => {
    return {name, marker};
}
const cuong = player('cuong','X');
const enemy = player('enemy','O');
const tic = Array.from(document.querySelectorAll('.tic'));
const gameBoard = [];

tic.forEach((tac) => tac.addEventListener('click',() => {
    if (gameBoard.length == 0 || gameBoard.length == 2 ||
        gameBoard.length == 4 || gameBoard.length == 6 ||
        gameBoard.length == 8) {
            tac.textContent = "X"
            gameBoard[tic.indexOf(tac)] = cuong;
            console.log(tic.indexOf(tac));
            console.log(gameBoard.length);
        }
    else {
        tac.textContent = "O"
        gameBoard[tic.indexOf(tac)] = enemy;
        console.log(tic.indexOf(tac));
        console.log(gameBoard.length);

    }
    console.log(gameBoard);
}))

const player = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {
    const cuong = player('cuong','X');
    const enemy = player('enemy','O');
    const tics = Array.from(document.querySelectorAll('.tic'));
    const count = [];
    const logic = [];
    const displayMarker = (tic) => {
        if (count.length == 0 || count.length == 2 ||
            count.length == 4 || count.length == 6 ||
            count.length == 8) {
                tic.textContent = "X"
                logic[tics.indexOf(tic)] = cuong;
                count.push(cuong);
                console.log(logic);
            }
        else {
            tic.textContent = "O"
            logic[gameBoard.tics.indexOf(tic)] = enemy;
            count.push(enemy);
        }
    }
    return {tics, displayMarker};
})();

gameBoard.tics.forEach((tic) => tic.addEventListener('click', gameBoard.displayMarker.bind(gameBoard.tics, tic)));

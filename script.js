const player = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {
    const cuong = player('cuong','X');
    const enemy = player('enemy','O');
    const tics = Array.from(document.querySelectorAll('.tic'));
    const winner = document.querySelector('.winner');
    const count = [];
    const logic = [];
    const displayMarker = (tic) => {
        if (count.length == 0 || count.length == 2 ||
            count.length == 4 || count.length == 6 ||
            count.length == 8) {
                tic.textContent = "X"
                logic[tics.indexOf(tic)] = cuong;
                count.push(cuong);
            }
        else {
            tic.textContent = "O"
            logic[tics.indexOf(tic)] = enemy;
            count.push(enemy);
        }
        console.log(logic);
        if (logic[0] == cuong && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == cuong && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == cuong && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == cuong && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == cuong && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == cuong && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == cuong && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == cuong && logic[2] == logic[4] && logic[4] == logic[6]) {
            winner.textContent = "cuong win";
        }
        if (logic[0] == enemy && logic[0] == logic[1] && logic[1] == logic[2] ||
            logic[3] == enemy && logic[3] == logic[4] && logic[4] == logic[5] ||
            logic[6] == enemy && logic[6] == logic[7] && logic[7] == logic[8] ||
            logic[0] == enemy && logic[0] == logic[3] && logic[3] == logic[6] ||
            logic[1] == enemy && logic[1] == logic[4] && logic[4] == logic[7] ||
            logic[2] == enemy && logic[2] == logic[5] && logic[5] == logic[8] ||
            logic[0] == enemy && logic[0] == logic[4] && logic[4] == logic[8] ||
            logic[2] == enemy && logic[2] == logic[4] && logic[4] == logic[6]) {
            winner.textContent = "enemy win";
        }
    }
    const gameplay = tics.forEach((tic) => tic.addEventListener('click', displayMarker.bind(tics, tic)));
    return {gameplay};
})();


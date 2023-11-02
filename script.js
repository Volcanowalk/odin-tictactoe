const gameboard = (function() {
    const array = ['', '', '', '', '', '','', '', ''];
    let player = 'player1'
    let turn = 0

    const addMarker = (index, marker) => {
        array[index] = marker
    }

    const calculateWin = () => {
        //Check row
        for(let i = 0; i < 9; i += 3){
            if(array[i] === 'X' || array[i] === 'O'){
                if(array[i] === array[i+1] && array[i+1] === array[i+2]) {
                    return true
                }
            }
        }

        //Check column
        for(let i = 0; i < 3; i++) {
            if(array[i] === 'X' || array[i] === 'O'){
                if(array[i] === array[i+3] && array[i+3] === array[i+6]) {
                    return true
                }
            }
        }

        //Check diagonals
        if(array[0] === 'X' || array[0] === 'O'){
            if(array[0] === array[4] && array[4] === array[8]) {
                return true
            }
        }

        if(array[2] === 'X' || array[2] === 'O'){
            if(array[2] === array[4] && array[4] === array[6]) {
                return true
            }
        }
    }

    return { addMarker, calculateWin, player }
})()

function createPlayer(name, marker) {
    return { name, marker }
}

document.addEventListener('DOMContentLoaded', function() {

    let player1 = createPlayer('player1', 'X')
    let player2 = createPlayer('player2', 'O')

    const boardCells = document.querySelectorAll('.board-cell')
    const dialog = document.querySelector('dialog')
    const dialog_text = document.querySelector('dialog p')

    boardCells.forEach((boardCell) => {
        boardCell.addEventListener('click', () => {
            if(boardCell.textContent != 'X' && boardCell.textContent != 'O') {
                //Current Marker
                const player_current = gameboard.player === 'player1' ? player1 : player2
                //Mark on the board
                boardCell.textContent = player_current.marker
                //Add to array
                gameboard.addMarker(boardCell.dataset.arrayIndex, player_current.marker)
                //Switch player
                gameboard.player = gameboard.player === 'player1' ? 'player2' : 'player1'
                //Calculate if a row is completed
                if(gameboard.calculateWin()){
                    dialog_text.textContent = `${player_current.name} has won!`
                    dialog.showModal()
                }
            } else {
                alert('Cannot perform action!')
            }
        })
    })
})
const gameboard = (function() {
    const array = ['', '', '', '', '', '','', '', ''];
    let player = ""
    let turn = 0

    const addMarker = (index, marker) => {
        array[index] = marker
    }

    const removeMarker = (index) => {
       array[index] = ''
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

    return { addMarker, calculateWin, removeMarker, player, turn }
})()

function createPlayer(name, marker) {
    return { name, marker }
}

document.addEventListener('DOMContentLoaded', function() {

    const boardCells = document.querySelectorAll('.board-cell')
    const dialog = document.querySelector('.dialog-restart')
    const dialog_text = document.querySelector('.dialog-restart p')
    const btnRestart = document.querySelector('.btnRestart')
    const dialog_start = document.querySelector('.dialog-start')
    const btnStart = document.querySelector('.btnStart')
    const displayPlayer = document.querySelector('.display-current-player')
    let player1Name, player2Name, player1, player2;

    dialog_start.showModal()

    btnStart.addEventListener('click', () => {
	player1Name = document.querySelector('.player1-name').value
        player2Name = document.querySelector('.player2-name').value

	player1 = createPlayer(player1Name, 'X')
	player2 = createPlayer(player2Name, 'O')
        gameboard.player = player1.name
        displayPlayer.textContent = player1.name

	dialog_start.close()
    })

    boardCells.forEach((boardCell) => {
        boardCell.addEventListener('click', () => {
            if(boardCell.textContent != 'X' && boardCell.textContent != 'O') {
                //Current Marker
                const player_current = gameboard.player === player1.name ? player1 : player2
                //Mark on the board
                boardCell.textContent = player_current.marker
                //Add to array
                gameboard.addMarker(boardCell.dataset.arrayIndex, player_current.marker)
                //Switch player
                gameboard.player = gameboard.player === player1.name ? player2.name : player1.name
                displayPlayer.textContent = gameboard.player
		//Turn passes
		gameboard.turn += 1;
		console.log(gameboard.turn)
                //Calculate if a row is completed
                if(gameboard.calculateWin()){
                    dialog_text.textContent = `${player_current.name} has won!`
                    dialog.showModal()
                } else if (!gameboard.calculateWin() && gameboard.turn === 9) {
			dialog_text.textContent = "Tie!"
			dialog.showModal()
		}
            } else {
                alert('That tile has already been played!')
            }
        })
    })

    btnRestart.addEventListener('click', () => {
		boardCells.forEach((boardCell) => {
			boardCell.textContent = ''
			gameboard.removeMarker(boardCell.dataset.arrayIndex)
			gameboard.player = player1.name
		})
		gameboard.turn = 0
		dialog.close()
	})
})
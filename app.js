const gameBoard = ((player) => {
    game = ["", "", "", "", "", "", "", "", ""];
    moves = 0;
    const displayboard = () => {
        return (
            game.forEach((mark, index) => {
                console.log(mark, index);
            }));
    }
    //TODO: WIN/TIE ABILITY
    const go = ((index) => {

        function turnHandler() {
            return player = player === 'X' ? 'O' : 'X';
        }
        if (game[index] != "") {
            console.log("You already selected this area");
        }
        else if (player === "X") {
            game[index] = "X";
            moves++;
            turnHandler();
        } else if (player === "O") {
            game[index] = "O";
            moves++;
            turnHandler();
        }
        winType();
    })
    const playerHandler = () => {
        return (`${player === "X" ? "X" : "O"}`)
    }
    const clearBoard = () => {
        game = ["", "", "", "", "", "", "", "", ""]
    }


    return { game, displayboard, go, moves, playerHandler, clearBoard };


});


const playing = gameBoard("X");
playing.go(4);

playing.go(5);
playing.go(2);
playing.go(1);
playing.displayboard();
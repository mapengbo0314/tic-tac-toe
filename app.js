const gameBoard = player => {
    let game = ["", "", "", "", "", "", "", "", ""];
    let moves = 0;
    let winner = false;
    localStorage.setItem('game', 'moves', 'winner');
    // const displayboard = () => {
    //     return (
    //         game.forEach((mark, index) => {
    //             console.log(mark, index);
    //         }));
    // }
    //TODO: WIN/TIE ABILITY
    const winType = () => {
        //if no winner selected and its move 9, tie the game
        // game0 + game 1 + game 2, for 3 and do this 3x
        // game 0 + game 3 + game 6, map 1
        //148 and 246
        //Horizontal win
        function horizWin() {
            let n = 0;
            for (var i = 0; i < 3; i++) {
                if (
                    game[n] + game[n + 1] + game[n + 2] === "XXX" ||
                    game[n] + game[n + 1] + game[n + 2] === "OOO"
                ) {
                    console.log("we have a Horizontal winner, its player " + game[n]);
                    document.getElementById("texts").innerHTML =
                        "<a>we have a WINNER, its player " +
                        game[n] +
                        "</a>" +
                        "<img class = 'pic' src = 'victory1.gif'></img>";
                    winner = true;
                }
                n = n + 3;
            }
        }
        //Vertical Win
        function vertWin() {
            game
                .map((value, index) => {
                    if (
                        game[index] + game[index + 3] + game[index + 6] === "XXX" ||
                        game[index] + game[index + 3] + game[index + 6] === "OOO"
                    ) {
                        console.log(
                            "we have a Vertical winner, it's player " + game[index]
                        );
                        document.getElementById("texts").innerHTML =
                            "<a>we have a WINNER, it's player " +
                            game[index] +
                            "</a>" +
                            "<img class = 'pic' src = 'victory1.gif'></img>";
                        winner = true;
                    }
                })
                .filter((value, index) => index < 3); // filter isn't really needed? maybe?
        }
        function diagWin() {
            if (
                game[0] + game[4] + game[8] === "XXX" ||
                game[0] + game[4] + game[8] === "OOO" ||
                game[2] + game[4] + game[6] === "XXX" ||
                game[2] + game[4] + game[6] === "OOO"
            ) {
                console.log("we have a DIAGonal winner, it's player " + game[4]);
                document.getElementById("texts").innerHTML =
                    "<a>we have a WINNER, it's player " +
                    game[4] +
                    "</a>" +
                    "<img class = 'pic' src = 'victory1.gif'></img>";
                winner = true;
            }
        }
        if (winner === false) {
            horizWin();
            vertWin();
            diagWin();
        }
        if (winner === false && moves === 9) {
            console.log("no winners! It's a Tie");
            document.getElementById("texts").innerHTML =
                "<a>no winners! It's a Tie</a>";
        }
        if (winner === true) {
            moves = null;
        }
        return { winner };
    };

    const go = index => {
        //winner toggler
        function turnHandler() {
            player === "X"
                ? (document.getElementById("texts").innerHTML = "It's O's Turn")
                : (document.getElementById("texts").innerHTML = "It's X's Turn");
            return (player = player === "X" ? "O" : "X");
        }
        //------Keeps happening after trying to clear it bug, on Concludes + Selected
        if (winType().winner === true || moves >= 9) {
            console.log("This game ended")
            return ("The Game has already concluded!"); //wtf, that was the only fix? by having a return function?
        } else {
            if (game[index] != "") {
                console.log("You already selected this area");
                console.log(game[index]);
            } else if (player === "X") {
                game[index] = "X";
                moves++;
                turnHandler();
            } else if (player === "O") {
                game[index] = "O";
                moves++;
                turnHandler();
            }
            winType();
        }
    };

    //-------------Render UI functions-----------------
    const rendering = () => {
        let divsqu = document.getElementsByClassName("square");
        game.map((val, index) => {
            divsqu[index].innerHTML = val;
        });
        if (winType().winner === true) {
            game.map((val, index) => {
                divsqu[index].innerHTML = "<img src = 'victory1.gif'></img>";
            })
        }
    };

    return { game, go, moves, rendering };
};
//-----Addeventlistener for UI Updates!--------
function eventClicker(games) {
    let divsqu = document.getElementsByClassName("square");
    for (let i = 0; i < divsqu.length; i++) {
        divsqu[i].addEventListener("click", function () {
            games.go(i);
            games.rendering();
        });
    }
}
function init() {
    if (document.getElementById("ttt").style.display === "block") {
        return (alert("the game has already begun!"));
    }
    document.getElementById("start").innerHTML = "Game has begun";
    document.getElementById("ttt").style.display = "block";
    document.getElementById("texts").innerHTML = "It's X's Turn";
    const game = gameBoard("X");
    eventClicker(game);
    game.rendering();
    return { game };
}
function clearing() {
    document.getElementById("start").innerHTML = "Board Cleared";
    document.getElementById("ttt").style.display = "none";
    document.getElementById("texts").innerHTML = "";


    //render when u have the chance
}

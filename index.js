const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui empty 
    boxes.forEach((box,index) =>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing,initialise box with css properties again
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `current Player -  ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `current Player - ${currentPlayer}`;
}

function checkGameOver(){
        let answer = "";

    winningPositions.forEach((position) =>{
        // all 3 boxes should be non-empty and exactly in values
        if ( (gameGrid[position[0]] !== "" || gameGrid[1] !== "" || gameGrid[position[2]] !== "")
              && (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                   
                   //check if winner is X
                   if(gameGrid[position[0]] == "X")
                       answer = "X";
                    else
                        answer = "0";

                        //disable pointer events
                        boxes.forEach((box) =>{
                            box.style.pointerEvents = "none";
                        })

                        //now we know X/O is a winner;
                        boxes[position[0]].classList.add("win");
                        boxes[position[1]].classList.add("win");
                        boxes[position[2]].classList.add("win");
            } 
        
    
    });
     
    // it means we have winner
    if(answer != ""){
        gameInfo.innerText = `Winneer Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;

    }
    //  let's when there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });
    
    //board is filled,Game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleCLick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap karo turn ko 
        swapTurn();
        // check koi jit toh nahi gaya
        checkGameOver();
    }
}


boxes.forEach((box,index) => {
    box.addEventListener("click",() =>{
        handleCLick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
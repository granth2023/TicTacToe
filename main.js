const COLOR_LOOKUP = {
    'null': 'black',
    '1': 'red',
    '-1': 'blue'
};
//the game revolves around 2 players, and their choices are represented. there is also the yet to be chosen. this is before and after and there are two options for after. 

const winnerCombo = [
    [0, 1, 2], 
    [0, 3, 6],
    [0, 4, 8], 
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 4, 5], 
    [6, 7, 8],
    [2, 4, 6]
];

//how the game is won. this is the tic tac toe 8 options for winning. each of the numbers represent a square on the grid. its 3x3. 

let board, turn, winner;

//there is the board. there is a turn and there is a winner. where are we playing. who gets to play and who is the winner. 

const message = document.querySelector('h1');
const startBtn = document.querySelector('button');

//the qselec grabs elements from our html in this case our h1 and then button. now in html h1 is a whole lot of nothing so interesting ot play around with that. it is taking these elements and storing them in these variable for javascript. is code backwards? 

document.getElementById('board').addEventListener('click', handleMove);
startBtn.addEventListener('click', initialize);

//this is selecting everything with the ID board, which holds the 9 different squares and adds an event listener so when you click it, a value is given which in this case is a handleMove function. we do the same for start button except instead of handleMove it is simply initilaize. so we have to now define these funcitons, why are they allowed to be established before the rest? 

initialize();

//estbalish the function intilaitez,e i suppose we are doing this one first because it is simpler and gets it out of the way? 

function initialize(){
    board = new Array(9).fill(null);
    turn =1;
    winner=null;
    render();
}

//so this is saying the function intiatilize is an object that when clicked, returns these key values which is a null board, a null winner and creates a turn for red. which has bene previously valued at 1. it is then calling the render function at the end. 

function handleMove(evt) {
    const idx= parseInt(evt.target.id.replace('sq-', ''));
    if (
        isNaN(idx) || 
        board[idx] ||
         winner
    ) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}
//so we have handlemove which takes the parameter of an event. why? because each time an element on the baord is clicked, this function is started. how do we know what the parameter is? we then have a new variable called idx which is storing the function of getting an integer with the parameter of event target and replacing anything with the id 'sq' and if there is no number associated with this click, then the funciton is NAN, but if its the board then it's -- i do not understand this one. if you click on not a square, nothing will happne, if you click on the board and there is a value already which is board idx because idx is storing the replacement fucntion of parse int which is taking a square nad replacing it with the representation, so if that has already been don or if we have a winner just returns without anything.

//but if none of these are true, then we update the board idx to be whoseever turn it was, we flip the turn by changing the 1 to negative 1 or vice verse. we run the get winner function and render this all. why render? what is render? is that for html and java?

function getWinner() {
    for(let i =0; i <winnerCombo.length; i++) {
        if(Math.abs(board[winnerCombo[i][0]] + board[winnerCombo[i][1]]+ board[winnerCombo[i][2]]) === 3)
        return board[winnerCombo[i][0]];
    } if (board.includes(null)) return null 
        return 'T';
    }

//now we have to determine when there is a get winner. so this is goingt o run every time we click? now, when it does run, it will be going through or looping through the winnercombo such that if math.abs which is getting an positive integer and saying if there is a -- what is the board thing i get that if --okay so it is saying basically to check whether the selected board pieces are in line iwth the winning combo and basically saying if -- if 3 pieces have been selected it adds up to three as long as the 3 selections are part of a winner combo and returns it otherwise if there is a null then return null other wise return tie. 


function render() {
    renderBoard();
    renderMessage();
    startBtn.disabled = !winner;
}

function renderBoard(){
    board.forEach(function(sqVal, idx){
        const squareEl = document.getElementById(`sq-${idx}`);
        squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];
        squareEl.className =!sqVal ? 'avail' : '';

    });
}

function renderMessage(){
    if (winner === 'T') {
        message.innerHTML = 'No winner, play again';
    } else if (winner){
        message.innerHTML = `You win <span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner].toUpperCase()}</span>!`;
    }else {
        message.innerHTML = `<span style="color:${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s Turn`;
    }
}


//you have a tic tac toe game. which means the board is 3 by 3. there are two players. each turn a player choose an open square. when a square is chosen you cannot erase or choose that square anymore. when you have 3 in a row you win, if all squares are chosen and there is not 3 in a row, you have a tie and start again. 

// a game begins. player 1, red, chooses a square. then the turn is flipped over to blue and back and forth. 

//so first establish the colors: either black which is not chosen or null and then plyaer 1 or 2 is red or blue 

//we also have the winning combinations

//so the pieces is the elements is the board, the turn and the winner
//on the board, we take turn until there is a winner

//so there is an empty board, turns are taken between two players, ultiamtely there is a winner
//we want the board to record everytime a turn is taken. this is an event listener. this is on click. 
// and you want to remember that move. 
//so you need that move to then be recorded to fill up a specific place on the baord. then you need the turn to switch to the otherperson. 
//this iwll keep going until the board is full. 
//we need a get winner function to then do the work of determing if there is a winner so this is comparing the chosieds made ont he baord add up to the winning combo. 
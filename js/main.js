'use strict'

var TIMER_FREQ = 100;
var MINE = 'M';
/*
o Beginner (4 * 4 with 2 MINES)
o Medium (8 * 8 with 12 MINES)
o Expert (12 * 12 with 30 MINES)
*/
var gGameLevels = [
    { level: 'beginners', size: 4, minesCount: 2 },
    { level: 'mmedium', size: 8, minesCount: 12 },
    { level: 'expert', size: 12, minesCount: 30 }
]
var gChosenLevel = 0;

var gNextId;
var gBoard;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gGameStart;
var gGameInterval;

function initGame() {
    initGameGlobals();
    gBoard = buildBoard();
}

function initGameGlobals() {
    gGameStart = null;
    gNextId = 1;
    gGameInterval = null;
}

function buildBoard() {
    // console.log('gGameLevels:', gGameLevels);
    // Get Matrix size by lavel
    var size = gGameLevels[gChosenLevel].size;

    // Build the board
    var board = craeteBoard(size);
    console.table(board);

    // Set mines at random locations
    setMines(board);
    renderBoard(board);

    // Call setMinesNegsCount()
    setMinesNegsCount(board);
    renderBoard(board);

    // Return the created board
    return board;
}

function craeteBoard(boradSize) {
    // Create the Matrix
    var board = [];

    for (var i = 0; i < boradSize; i++) {
        board[i] = [];
        for (var j = 0; j < boradSize; j++) {
            // Fill cell as an object
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };

            // Add created cell to The game board
            board[i][j] = cell;
        }
    }
    return board;
}

// Render the board to an HTML table
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i, j })
            // console.log('cellClass:', cellClass);            

            /*
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            */

            var cellInnerHTML = '';

            if (currCell.isShown) {
                cellClass += ' shown';
                if (currCell.minesAroundCount > 0) cellInnerHTML += getCellImg(currCell.minesAroundCount);
            }
            if (currCell.isMarked) {
                cellClass += ' marked';
            }

            strHTML += `\t<td class="cell ${cellClass}" onclick="cellClicked(this,${i},${j})">\n
            ${cellInnerHTML}\t</td>\n`;
        }
        strHTML += '</tr>\n';
    }

    // console.log('strHTML is:');
    // console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function getCellImg(imgName) {
    return `<img src="images/${imgName}.png">`;
}

function setMines(board) {
    // Place 2 mines manually when each cell’s isShown set to true. 
    board[3][2].isMine = true;
    board[0][3].isMine = true;
    console.log('board[3][2]:', board[3][2]);
    console.log('board[0][3]:', board[0][3]);
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board);

        }
    }

}

// catch right click
function onKeyClicked(event) {
    if (event.srcElement.classList.length > 1) {
        var classArgs = event.srcElement.classList[1].split('-');
        var i = classArgs[1];
        var j = classArgs[2];
        cellClicked(event.srcElement, i, j, true);
    }
}

function cellClicked(elCell, i, j, isRightClick = false) {
    // console.log('elCell:', elCell, '\ni:', i, 'j:', j);

    // 2. Implement that clicking a cell with “number” reveals the number of this cell
    // if isRightClick => marked
    if (isRightClick) {
        gBoard[i][j].isMarked = true;
        // elCell.classList.add('marked');
        gGame.markedCount++;
    } else { // else => shown
        gBoard[i][j].isShown = true;
        // elCell.classList.add('shown');
        gGame.shownCount++;
    }
    renderBoard(gBoard);
    /*
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    };
    */

}
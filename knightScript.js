const knight = {
    moveNodeTree: null,
    currentPosition: [0, 0],
    currentDestination: [],

    setCurrentPosition(positionArr) {
        if (positionArr.length === 2 && Number.isInteger(positionArr[0]) && Number.isInteger(positionArr[1]) && withinGameBoard(positionArr)) {
            this.currentPosition = positionArr;
            this.moveNodeTree = new moveNode;
        } else {
            console.log('Error: current position no an array of 2 numbers between 0 and 8');
        }
    },
    setCurrentDestination(positionArr) {
        if (positionArr.length === 2 && Number.isInteger(positionArr[0]) && Number.isInteger(positionArr[1]) && withinGameBoard(positionArr)) {
            this.currentDestination = positionArr;
        } else {
            console.log('Error: current position no an array of 2 numbers between 0 and 8');
        }
    }

}

class moveNode {
    constructor(parentNode = null, currentPosition = knight.currentPosition) {
        this.currentPosition = currentPosition;
        this.possibleMoves = getPotentialMoves(currentPosition);;
        this.nextMoves = [];
        this.parentNode = parentNode;

    }
}

function withinGameBoard(potentialMove) {
    if (potentialMove[0] <= 8 && potentialMove[0] >= 0 && potentialMove[1] <= 8 && potentialMove[1] >= 0) {
        return true;
    } else
        return false;
}

function getPotentialMoves(currentPosition) {
    let potentialMovesArr = [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1],]; //array of potential changes to current position to get all possible moves
    let potentialMoves = [];
    potentialMovesArr.forEach(potentialMove => {
        let possibleMove = [currentPosition[0] + potentialMove[0], currentPosition[1] + potentialMove[1]];
        if (withinGameBoard(possibleMove)) {
            potentialMoves.push(possibleMove);   //if possible move is within gameboard, adds it to the knights potential moves array
        }

    })
    return potentialMoves;
}

function makeMoveChildren(currentMoveNode) {
    currentMoveNode.possibleMoves.forEach(possibleMove => {
        currentMoveNode.nextMoves.push(new moveNode(currentMoveNode, possibleMove));
    })
}

function checkPosition(currentPosition) {
    if (currentPosition[0] === knight.currentDestination[0]
        && currentPosition[1] === knight.currentDestination[1]) {
        return true;
    } else
        return false;
};

function makeMoves() {
    let currentMove = knight.moveNodeTree;
    if (currentMove == null) {
        console.log('Error: no move tree');
        return;
    };
    let queue = [currentMove];
    let returnedArr = [];
    while (queue.length != 0) {
        if (checkPosition(queue[0].currentPosition)) {
            return showMoves(queue[0]);
        } else {
            makeMoveChildren(queue[0])
            queue[0].nextMoves.forEach(move => {
                queue.push(move);
            })

            queue.shift();
        }
    }
}

function showMoves(currentNode) {
    if (currentNode.parentNode == null) {
        return currentNode.currentPosition;
    }
    return `${showMoves(currentNode.parentNode)} ${currentNode.currentPosition}`
}

knight.setCurrentPosition([1, 7])
knight.setCurrentDestination([8, 4])
console.log(makeMoves());
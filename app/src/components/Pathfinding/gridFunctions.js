export function defineGrid(startRow, startColumn, endRow, endColumn) {
    let grid = [];
    for(let r=0; r<18; r++){
        let row = [];
        for(let c=0; c<40; c++){
            row.push(createNode(r, c, startRow, startColumn, endRow, endColumn));
        }
        grid.push(row);
    }
    return grid;
}

export function createNode(row, col, startRow, startColumn, endRow, endColumn) {
    return {
        row,
        col,
        isStart: (row === startRow && col === startColumn),
        isFinish: (row === endRow && col === endColumn),
        distance: Infinity,
        isVisited: false,
        isWall: false,
        weight: 1,
        previousNode: null,
    };
};

export function getNewGridWithWallToggled(row, col, grid, setGrid){
    const newGrid = grid.slice();
    var node;
    try{
    node = newGrid[row][col];
    }
    catch(error){
        return;
    }
    const newNode = {
        weight: 1,
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
};
export function getNewGridWithWeight(row, col, grid, setGrid){
    const newGrid = grid.slice();
    var node;
    try{
    node = newGrid[row][col];
    }
    catch(error){
        return;
    }
    const newNode = {
        ...node,
        weight: 2,
    };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
}



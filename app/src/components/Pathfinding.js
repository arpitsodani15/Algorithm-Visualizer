import React, { useState, useEffect } from 'react';
import Node from './Node';
import './Pathfinding.css'
import HeaderPathfinding from './HeaderPathfinding';
import { dijkstra, getNodesInShortestPathOrder } from './Algorithms/dijkstra';
const start = [9, 10];
const end = [9, 30];

function Pathfinding() {
    // states
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [createWall, setCreateWall] = useState(false);
    const [createWeight, setCreateWeight] = useState(false);
    const [startRow, setStartRow] = useState(start[0]);
    const [startColumn, setStartColumn] = useState(start[1]);
    const [endRow, setEndRow] = useState(end[0]);
    const [endColumn, setEndColumn] = useState(end[1]);
    const [changingStart, setChangingStart] = useState(false);
    const [changingEnd, setChangingEnd] = useState(false);
  
    useEffect(() => {
        const grid = defineGrid();
        setGrid(grid);
    }, []);
    
    const handleMouseDown = (row, col) =>{
        if(startRow === row && startColumn === col){
            setChangingStart(true);
            setChangingEnd(false);
            return;
        }
        else if(endRow === row && endColumn === col){
            setChangingEnd(true);
            setChangingStart(false);
            return;
        }
        else if(createWall){
            getNewGridWithWallToggled(row, col);
            setMouseIsPressed(true);
        }
        else if(createWeight){
            getNewGridWithWeight(row, col);
            setMouseIsPressed(true);
        }
    };

    const handleMouseEnter = (row, col) =>{
        
        if(grid === [])
            return;
        if(mouseIsPressed){
            if(createWall)
                getNewGridWithWallToggled(row, col);
            else if(createWeight)
                getNewGridWithWeight(row, col)
        }
        else if(changingStart){
            setChangingEnd(false);
            document.getElementById(`node-${startRow}-${startColumn}`).className = 'node';
            document.getElementById(`node-${startRow}-${startColumn}`).isStart = false;
            setStartColumn(col);
            setStartRow(row);
            document.getElementById(`node-${row}-${col}`).className = 'node node-start';
            document.getElementById(`node-${row}-${col}`).isStart = true;
        }
        else if(changingEnd) {
            setChangingStart(false);
            document.getElementById(`node-${endRow}-${endColumn}`).className = 'node';
            document.getElementById(`node-${endRow}-${endColumn}`).isFinish = false;
            setEndColumn(col);
            setEndRow(row);
            document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
            document.getElementById(`node-${row}-${col}`).isFinish = true;
        }
        else if(!mouseIsPressed) return;
    };

    const handleMouseUp = () =>{
        setMouseIsPressed(false);
        setChangingEnd(false);
        setChangingStart(false);
    };

    const handleClear = () => {
        setGrid(defineGrid());
        for (let i=0; i<grid.length; i++) {
            for(let j=0; j<grid[i].length; j++) {
                setTimeout(() => {
                    const node = grid[i][j];
                        if(node.isStart){
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
                        }
                        else if(node.isFinish){
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
                        }
                        else{
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                        }
                    }, 0 );
            }
        }
        
    }

    const handleWall = (wallValue) => {
        if(wallValue === "Stop"){
            setCreateWall(false);
            setMouseIsPressed(false);
        }
        else if(wallValue === "Wall"){
            setCreateWall(true);
        }
    }
    const handleWeight = (weightValue) => {
        if(weightValue === "Weight"){
            setCreateWeight(false);
            setMouseIsPressed(false);
        }
        else if(weightValue === "Weight"){
            setCreateWeight(true);
        }
    }

    const defineGrid = () => {
        let grid = [];
        for(let r=0; r<18; r++){
            let row = [];
            for(let c=0; c<40; c++){
                row.push(createNode(r, c));
            }
            grid.push(row);
        }
        return grid;
    };

    const createNode = (row, col) =>{
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

    const getNewGridWithWallToggled = (row, col) => {
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
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        setGrid(newGrid);
    };
    const getNewGridWithWeight = (row, col) =>{
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

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        setCreateWall(false);
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            console.log(i);
            if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 5 * i);
            return;
            }
            setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
            }, 5 * i);
        }
        
    };
    
    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 25 * i);
        }
    }

    const visualizeDijkstra = () => {
        const newGrid = grid.slice();
        const startNode = newGrid[startRow][startColumn];
        const finishNode = newGrid[endRow][endColumn];
        const visitedNodesInOrder = dijkstra(newGrid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        //console.log(visitedNodesInOrder[visitedNodesInOrder.length - 1]);
    };

    // const handleDragStart = (row, col) => {
    //     if(mouseIsPressed || createWall){
    //         return;
    //     }
    //     if(row === STARTROW && col === STARTCOL){
            
    //     }
    //     else if(row === ENDROW && col === ENDCOL){
            
    //     }
    // }

    return (
        
        <div onClick={() => handleMouseUp()} onMouseUp={() => handleMouseUp()}>
            <HeaderPathfinding 
                onVisualize = {() => visualizeDijkstra()}
                onClear = {() => handleClear()} 
                onWall = {(wallValue) => handleWall(wallValue)}
                onWeight = {(weightValue) => handleWeight(weightValue)}
                onMouseUp={() => handleMouseUp()}
            />
            {/* <button onClick={() => visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button> */}
            <div className="grid" onMouseUp={() => handleMouseUp()}>
                {grid.map((row, rowIdx) => {
                    return (
                        <div className="row" key = {rowIdx} onMouseUp={() => handleMouseUp()}>
                            {row.map((node, nodeIdx) => {
                                return (
                                    <Node 
                                        key = {nodeIdx}
                                        col = {node.col}
                                        row = {node.row}
                                        isStart = {node.isStart}
                                        isFinish = {node.isFinish}
                                        isWall = {node.isWall} 
                                        weight = {node.weight}
                                        mouseIsPressed={mouseIsPressed}
                                        // onDragStart = {(row, col) => handleDragStart(row, col)}
                                        onMouseDown={(row, col) => handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                        onMouseUp ={() => handleMouseUp()}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );

}

export default Pathfinding

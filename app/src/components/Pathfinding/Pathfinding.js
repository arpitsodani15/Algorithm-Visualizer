import React, { useState, useEffect } from 'react';
import Node from './Node';
import './Pathfinding.css'
import HeaderPathfinding from './HeaderPathfinding';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/dijkstra';
import { defineGrid, getNewGridWithWallToggled, getNewGridWithWeight } from './gridFunctions';
const start = [9, 10];
const end = [9, 30];

function Pathfinding({algo}) {
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
        const grid = defineGrid(startRow, startColumn, endRow, endColumn);
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
            getNewGridWithWallToggled(row, col, grid, setGrid);
            setMouseIsPressed(true);
        }
        else if(createWeight){
            getNewGridWithWeight(row, col, grid, setGrid);
            setMouseIsPressed(true);
        }
    };
    
    const handleMouseEnter = (row, col) =>{
        if(grid === [])
            return;
        if(mouseIsPressed){
            if(createWall)
                getNewGridWithWallToggled(row, col, grid, setGrid);
            else if(createWeight){
                if((row!==startRow || col!==startColumn) && (row!==endRow || col!==endColumn))
                    getNewGridWithWeight(row, col, grid, setGrid)
            }
        }
        else if(changingStart){
            setChangingEnd(false);
            document.getElementById(`node-${startRow}-${startColumn}`).className = 'node';
            grid[startRow][startColumn].isStart = false;
            setStartColumn(col);
            setStartRow(row);
            document.getElementById(`node-${row}-${col}`).className = 'node node-start';
            grid[row][col].isStart = true;
        }
        else if(changingEnd) {
            setChangingStart(false);
            document.getElementById(`node-${endRow}-${endColumn}`).className = 'node';
            grid[endRow][endColumn].isEnd = false;
            setEndColumn(col);
            setEndRow(row);
            document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
            grid[row][col].isEnd = false;
        }
        else if(!mouseIsPressed) return;
    };

    const handleMouseUp = () =>{
        setMouseIsPressed(false);
        setChangingEnd(false);
        setChangingStart(false);
    };
    
    const handleClear = () => {
        setGrid(defineGrid(startRow, startColumn, endRow, endColumn));
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
        setGrid(defineGrid(startRow, startColumn, endRow, endColumn));
    }

    const handleWall = (wallValue) => {
        if(wallValue === "Stop"){
            setCreateWall(false);
            setMouseIsPressed(false);
        }
        else if(wallValue === "Wall"){
            setCreateWall(true);
            setCreateWeight(false);
        }
    }
    const handleWeight = (weightValue) => {
        if(weightValue === "Stop"){
            setCreateWeight(false);
            setMouseIsPressed(false);
        }
        else if(weightValue === "Weight"){
            setCreateWeight(true);
            setCreateWall(false);
        }
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
            if(node.weight===1){
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
            }
            }, 5 * i);
        }
        
    };
    
    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            if(node.weight > 1){
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node weight-node-visited';
            }
            else
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
    };

    return (
        
        <div onClick={() => handleMouseUp()} onMouseUp={() => handleMouseUp()}>
            <HeaderPathfinding 
                onVisualize = {() => visualizeDijkstra()}
                onClear = {() => handleClear()} 
                onWall = {(wallValue) => handleWall(wallValue)}
                onWeight = {(weightValue) => handleWeight(weightValue)}
                onMouseUp={() => handleMouseUp()}
                algo={algo}
            />
            
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

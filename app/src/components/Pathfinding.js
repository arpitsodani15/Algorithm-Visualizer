import React, { useState, useEffect } from 'react';
import Node from './Node';
import './Pathfinding.css'
import HeaderPathfinding from './HeaderPathfinding';
import { dijkstra, getNodesInShortestPathOrder } from './Algorithms/dijkstra';

const STARTROW = 10;
const STARTCOL = 15;
const ENDROW = 10;
const ENDCOL = 35;

function Pathfinding() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [createWall, setCreateWall] = useState(false);

    useEffect(() => {
        const grid = defineGrid();
        setGrid(grid);
    }, []);
    
    const handleMouseDown = (row, col) =>{
        if(!createWall)
            return;
        getNewGridWithWallToggled(row, col);
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row, col) =>{
        if(!mouseIsPressed) return;
        if(grid === [])
            return;
        getNewGridWithWallToggled(row, col);
    };

    const handleMouseUp = () =>{
        setMouseIsPressed(false);
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

    const handleWall = () => {
        if(createWall){
            setCreateWall(false);
            setMouseIsPressed(false);
        }
        else{
            setCreateWall(true);
        }
    }

    const defineGrid = () => {
        let grid = [];
        for(let r=0; r<20; r++){
            let row = [];
            for(let c=0; c<50; c++){
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
            isStart: (row === STARTROW && col === STARTCOL),
            isFinish: (row === ENDROW && col === ENDCOL),
            distance: Infinity,
            isVisited: false,
            isWall: false,
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
        const startNode = newGrid[STARTROW][STARTCOL];
        const finishNode = newGrid[ENDROW][ENDCOL];
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
                onWall = {() => handleWall()}
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

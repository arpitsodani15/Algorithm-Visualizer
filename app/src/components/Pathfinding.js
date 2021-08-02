import React, { useState, useEffect } from 'react';
import Node from './Pathfinding Visualizer/Node';
import './Pathfinding.css'
import HeaderPathfinding from './Pathfinding Visualizer/HeaderPathfinding';

const STARTROW = 10;
const STARTCOL = 15;
const ENDROW = 10;
const ENDCOL = 35;



function Pathfinding() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    useEffect(() => {
        const grid = defineGrid();
        setGrid(grid);
    }, []);
    
    const handleMouseDown = (row, col) =>{
        getNewGridWithWallToggled(grid, row, col);
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row, col) =>{
        if(!mouseIsPressed) return;
        if(grid === [])
            return;
        getNewGridWithWallToggled(grid, row, col);
    };

    const handleMouseUp = () =>{
        setMouseIsPressed(false);
    };

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

    const getNewGridWithWallToggled = (grid, row, col) => {
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

    return (
        
        <div>
            <HeaderPathfinding />
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div className="row" key = {rowIdx}>
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

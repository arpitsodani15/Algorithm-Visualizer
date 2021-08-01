import React, { useState, useEffect } from 'react';
import Node from './Pathfinding Visualizer/Node';
import './Pathfinding.css'

const STARTROW = 10;
const STARTCOL = 15;
const ENDROW = 10;
const ENDCOL = 35;


function Pathfinding() {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const grid = defineGrid();
        setGrid(grid);
    });
    
    const defineGrid = () => {
        let grid = [];
        for(let r=0; r<20; r++){
            let row = [];
            for(let c=0; c<50; c++){
                row.push(createNode(c, r));
            }
            grid.push(row);
        }
        return grid;
    };

    const createNode = (col, row) =>{
        return {
            col,
            row,
            isStart: (row == STARTROW && col == STARTCOL),
            isFinish: (row == ENDROW && col == ENDCOL),
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        };
    };

    return (
        <div>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key = {rowIdx}>
                            {row.map((node, nodeIdx) => {
                                return (
                                    <Node 
                                        key = {nodeIdx}
                                        col = {node.col}
                                        row = {node.row}
                                        isStart = {node.isStart}
                                        isFinish = {node.isFinish}
                                        isWall = {node.isWall}
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

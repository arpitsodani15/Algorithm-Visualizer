import React from 'react'
import './Node.css'

function Node(props) {
    const extraClassName = props.isFinish
    ? 'node-finish'
    : props.isStart
    ? 'node-start'
    : props.isWall
    ? 'node-wall'
    : '';

    return (
        <div
        id={`node-${props.row}-${props.col}`}
        className={`node ${extraClassName}`}
        // onMouseDown={() => onMouseDown(row, col)}
        // onMouseEnter={() => onMouseEnter(row, col)}
        // onMouseUp={() => onMouseUp()}
        >

        </div>
    )
}

export default Node

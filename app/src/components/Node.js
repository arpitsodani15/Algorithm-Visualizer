import React from 'react'
import './Node.css'

function Node(props) {
    const extraClassName = props.isFinish
    ? 'node-finish'
    : props.isStart
    ? 'node-start'
    : props.isWall
    ? 'node-wall'
    : (props.weight > 1)
    ? 'node-weight' : '';
    // const weight = (props.weight > 1) ? 'node-weight' : '';
    return (
        <div
            id={`node-${props.row}-${props.col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => {props.onMouseDown(props.row, props.col)}}
            onMouseEnter={() => {props.onMouseEnter(props.row, props.col)}}
            onMouseUp={() => {props.onMouseUp()}}
        >

        </div>
    )
}

export default Node

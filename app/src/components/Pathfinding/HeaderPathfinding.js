import React, { useState, useEffect } from 'react';

import "./HeaderPathfinding.css";
import Button from '@material-ui/core/Button';
import './Node.css'


function HeaderPathfinding(props) {
    const [wallValue, setWallValue] = useState("Wall");
    const [weightValue, setWeightValue] = useState("Weight")
    
    function handleClickWall(wallValue){
        if(wallValue === "Wall"){
            setWallValue("Stop");
            setWeightValue("Weight");
        }
        else{
            setWallValue("Wall");
        }
        props.onWall(wallValue);
    }
    function handleClickWeight(weightValue){
        if(weightValue === "Weight"){
            setWeightValue("Stop");
            setWallValue("Wall");
        }
        else{
            setWeightValue("Weight");
        }
        props.onWeight(weightValue);
    }
    
    return (
        <div onMouseUp={() => props.onMouseUp()} >
            <h3 onMouseUp={() => props.onMouseUp()} >{`${props.algo}`}</h3>
            <div className="button">
                <Button variant="contained" color="secondary"
                    onClick = {() => props.onVisualize()} onMouseUp={() => props.onMouseUp()} >Visualize</Button>
                <Button variant="contained" color="secondary" 
                    onClick = {() => props.onClear()} onMouseUp={() => props.onMouseUp()} >Clear</Button>
                <Button id="wall" variant="contained" color="secondary" 
                    onClick = {() => handleClickWall(wallValue)} onMouseUp={() => props.onMouseUp()} >{`${wallValue}`}</Button>
                <Button variant="contained" color="secondary"
                    onClick = {() => handleClickWeight(weightValue)} 
                    disabled={props.algo==="BFS"} onMouseUp={() => props.onMouseUp()} >{`${weightValue}`}</Button>
            </div>
        </div>
        
    )
}

export default HeaderPathfinding

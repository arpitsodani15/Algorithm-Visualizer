import React, { useState, useEffect } from 'react';

import "./HeaderPathfinding.css";
import Button from '@material-ui/core/Button';
import './Node.css'

//import { IconButton } from '@material-ui/core';


function HeaderPathfinding(props) {
    const [wallValue, setWallValue] = useState("Wall");
    const [weightValue, setWeightValue] = useState("Weight")

    function handleClickWall(wallValue){
        if(wallValue === "Wall"){
            setWallValue("Stop");
            // document.getElementById("wall").color = "";
            // document.getElementById("wall").style.backgroundColor = "black";
        }
        else{
            setWallValue("Wall");
            // document.getElementById("wall").color = "secondary";
            // document.getElementById("wall").className = "";
        }
        props.onWall(wallValue);
    }
    function handleClickWeight(weightValue){
        if(weightValue === "Weight"){
            setWeightValue("Stop");
            // document.getElementById("wall").color = "";
            // document.getElementById("wall").style.backgroundColor = "black";
        }
        else{
            setWeightValue("Weight");
            // document.getElementById("wall").color = "secondary";
            // document.getElementById("wall").className = "";
        }
        props.onWeight(weightValue);
    }
    
    return (
       
        <div className="button">
            <h2>Path Finding Visualizer</h2>
            <p>Dijkstra's Algorithm</p>
            <Button variant="contained" color="secondary"
                onClick = {() => props.onVisualize()}>Visualize</Button>
            <Button variant="contained" color="secondary" 
                onClick = {() => props.onClear()}>Clear</Button>
            <Button id="wall" variant="contained" color="secondary" 
                onClick = {() => handleClickWall(wallValue)}>{`${wallValue}`}</Button>
            <Button variant="contained" color="secondary"
                onClick = {() => handleClickWeight(weightValue)}>{`${weightValue}`}</Button>
        </div>
    )
}

export default HeaderPathfinding

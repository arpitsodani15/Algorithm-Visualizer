import React, { useState, useEffect } from 'react';

import "./HeaderPathfinding.css";
import Button from '@material-ui/core/Button';
import './Node.css'

//import { IconButton } from '@material-ui/core';


function HeaderPathfinding(props) {
    const [wallValue, setWallValue] = useState("Wall");


    const wall = () =>{
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
    }
    const handleClickWall = () => {
        props.onWall();
        wall();
    }
    
    return (
        <div className="button">
            <Button variant="contained" color="secondary"
                onClick = {() => props.onVisualize()}>Visualize</Button>
            <Button variant="contained" color="secondary" 
                onClick = {() => props.onClear()}>Clear</Button>
            <Button id="wall" variant="contained" color="secondary" 
                onClick = {() => handleClickWall()}>{`${wallValue}`}</Button>
            <Button variant="contained" color="secondary">Weights</Button>
        </div>
    )
}

export default HeaderPathfinding

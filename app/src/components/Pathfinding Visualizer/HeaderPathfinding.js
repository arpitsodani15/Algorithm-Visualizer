import React from 'react';
import "./HeaderPathfinding.css";
import Button from '@material-ui/core/Button';
//import { IconButton } from '@material-ui/core';


function HeaderPathfinding() {
    return (
        <div className="button">
            <Button variant="contained" color="secondary">Visualize</Button>
            <Button variant="contained" color="secondary">Clear</Button>
            <Button variant="contained" color="secondary">Wall</Button>
            <Button variant="contained" color="secondary">Weights</Button>
            <Button variant="contained" color="secondary">Speed</Button>
        </div>
    )
}

export default HeaderPathfinding

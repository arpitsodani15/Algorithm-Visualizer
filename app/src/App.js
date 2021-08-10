import './App.css';
import Pathfinding from './components/Pathfinding';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';

function App() {
  const[algo,setalgo] = useState("");
  return (
    <div className="App" >
        <h2>Algorithm Visualizer</h2>
       <div className="button">
            <Button variant="contained" color="secondary"
                onClick = {() => setalgo("BFS")} className ={``} >BFS</Button>
            <Button variant="contained" color="secondary" 
                onClick = {() => setalgo("dijkstra") } className ={``} >DIJKSTRA</Button>
            <Button variant="contained" color="secondary"
                 onClick = {() => setalgo("sorting") } className ={``} >SORTING</Button>
        </div>
        {(algo === "BFS") ? (<Pathfinding />) : (algo === "dijkstra") ? (<Pathfinding />) : (<p>Hello</p>)}
        
    </div>
  );
}

export default App;
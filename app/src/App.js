import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Pathfinding from './components/Pathfinding/Pathfinding';
import Sorting from './components/Sorting/Sorting';

function App() {
  const[algo, setalgo] = useState("Home");
  return (
    <div className="App" >
        <Header setalgo = {setalgo}/>
        {(algo === "Home") ? (<Home setalgo = {setalgo} />) : (algo === "BFS") ? (<Pathfinding algo={algo} />) 
        : (algo === "Dijkstra") ? (<Pathfinding algo={algo} />) 
        : (algo === "Sorting") ? (<Sorting />) 
        : (<Home setalgo = {setalgo} />)}
    </div>
  );
}

export default App;
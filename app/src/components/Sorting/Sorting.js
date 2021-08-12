import React, { useState, useEffect } from 'react';
import {getMergeSortAnimations} from '../Algorithms/sortingAlgorithms.js';
import "./Sorting.css";
import Button from '@material-ui/core/Button';

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}

const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

function Sorting() {
    const [array, setArray] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);

    function resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
          array.push(randomIntFromInterval(5, 500));
        }
        setArray(array);
    }
    
    function mergeSort() {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } 
            else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    
    function quickSort() {
    }
    
    function heapSort() {
    }
    
    function bubbleSort() {
    }
    
    return (
        <div className="array-container">
            {array.map((value, idx) => (
            <div
                className="array-bar"
                key={idx}
                style={{
                    height: `${value}px`,
                    backgroundColor: PRIMARY_COLOR,
                }}></div>
            ))}
            <div className="button-container">
                <Button variant="contained" color="secondary" onClick={() => resetArray()}>Generate New Array</Button>
                <Button variant="contained" color="secondary" onClick={() => mergeSort()}>Merge Sort</Button>
                <Button variant="contained" color="secondary" onClick={() => quickSort()}>Quick Sort</Button>
                <Button variant="contained" color="secondary" onClick={() => heapSort()}>Heap Sort</Button>
                <Button variant="contained" color="secondary" onClick={() => bubbleSort()}>Bubble Sort</Button>
            </div>
        </div>
    )
}

export default Sorting

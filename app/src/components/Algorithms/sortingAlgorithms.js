const swap = (arr, left, right, animations) =>  {
  animations.push([left, right]);
  animations.push([left, right]);
  animations.push([left, arr[right], right, arr[left]]);
  const temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp;
}


// Merge Sort
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations,) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}


// Bubble Sort
export function getBubbleSortAnimations(array) {
  const animations = [];
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < ( array.length - i -1 ); j++){
      animations.push([j, j+1]);
      animations.push([j, j+1]);
      if(array[j] > array[j+1]){
        animations.push([j, array[j+1], j+1, array[j]]);
        var temp = array[j];
        array[j] = array[j + 1];
        array[j+1] = temp;
      }
      else{
        animations.push([j, array[j]]);
      }
    }
  }
  return animations;
}



// Insertion Sort
export function getInsertionSortAnimations(array) 
{ 
  const animations = [];
  const n = array.length;
  
  for (let i = 1; i < n; i++) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; j--) {
        swap(array, j, j - 1, animations);
    }
  }
  return animations;
} 




//Quicksort
const partitionHigh = (arr, low, high, animations) => {
  //Pick the first element as pivot
  let pivot = arr[high];
  let i = low;
  
  //Partition the array into two parts using the pivot
  for(let j = low; j < high; j++){
    if(arr[j] <= pivot){      
      swap(arr, i, j, animations);
      i++;
    }
  }
  swap(arr, i, high, animations);
  //Return the pivot index
  return i;
}

export function getQuickSortAnimations(arr){
  //Stack for storing start and end index
  const animations = [];
  let stack = [];
  
  //Get the start and end index
  let start = 0;
  let end = arr.length - 1;
  
  //Push start and end index in the stack
  stack.push({x: start, y: end});
  
  //Iterate the stack
  while(stack.length){
    //Get the start and end from the stack
    const { x, y } = stack.shift();
    
    //Partition the array along the pivot
    const PI = partitionHigh(arr, x, y, animations);
    
    //Push sub array with less elements than pivot into the stack
    if(PI - 1 > x){
      stack.push({x: x, y: PI - 1});
    }
    
    //Push sub array with greater elements than pivot into the stack
    if(PI + 1 < y){
      stack.push({x: PI + 1, y: y});
    }
  }
}
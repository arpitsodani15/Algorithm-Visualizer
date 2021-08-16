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

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations,
) {
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

export function getInsertionSortAnimations(array) 
{ 
  const animations = [];
  const n = array.length;
  let i, key, j; 
  for (i = 1; i < n; i++){ 
    key = array[i]; 
    j = i - 1;
    /* Move elements of arr[0..i-1], that are 
    greater than key, to one position ahead 
    of their current position */
    while (j >= 0 && array[j] > key){ 
      animations.push([j, j+1]);
      animations.push([j, j+1]); 
      animations.push([j+1, array[j], j, array[j+1]]); 
      array[j + 1] = array[j]; 
      j = j - 1; 
    }
    if(i!=n-1){ 
      animations.push([i, j+1]);
      animations.push([i, j+1]);
      animations.push([i, array[j+1], j+1, key]);
    }
    else{
      while (j >= 0 && array[j] > key){ 
        animations.push([j, j+1]);
        animations.push([j, j+1]); 
        animations.push([j+1, array[j], j, array[j+1]]); 
        array[j + 1] = array[j]; 
        j = j - 1; 
      }
    }
    
    array[j + 1] = key; 
  } 
  return animations;
} 


const swap = (arr, left, right) =>  {
  const temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp;
}

const partitionHigh = (arr, low, high, animations) => {
  //Pick the first element as pivot
  let pivot = arr[high];
  let i = low;
  
  //Partition the array into two parts using the pivot
  for(let j = low; j < high; j++){
    animations.push([j, high]);
    animations.push([j, high]);
    if(arr[j] <= pivot){      
      animations.push([j, pivot, high, arr[j]]);
      swap(arr, i, j);
      i++;
    }
  }
  
  swap(arr, i, high);
  
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
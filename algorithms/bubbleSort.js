const innerBubbleLoop = async(array, length, n=0) => {
    if (n === length){
        return
    }
    else {
        if(array[n] > array[n + 1]){
            swap(array, n, n+1)
            await slowRender(1)
        }
        n+=1
        return innerBubbleLoop(array, length, n)
    }
}

const outerBubbleLoop = async(array, length, n=0) => {
    if (n === length){
        return
    }
    else {
        await innerBubbleLoop(array, length - n - 1)
        n+=1
        return outerBubbleLoop(array, length, n)
    }
}

const bubble_sort = () =>{
    outerBubbleLoop(globalArray, globalArray.length)
}

let bubbleSort = document.getElementById("bubbleSort")
bubbleSort.addEventListener("click", bubble_sort)

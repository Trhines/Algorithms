const innerInsertLoop = async (arr, key, j) => {
    console.log(j)
    if( j >= 0 && key < arr[j]){
        arr[j+1] = arr[j]
        await slowRender(1)
        j -= 1
        return innerInsertLoop(arr, key, j)
    }
    return j 
}

const outerInsertLoop = async (arr, length, i=1) => {
    if(i === length) return
    let key = arr[i]
    let j = i-1
    let l = await innerInsertLoop(arr, key, j)
    arr[l + 1] = key
    await slowRender(1)  
    i+=1
    return outerInsertLoop(arr, length, i)
}

const insert_sort = () => {
    outerInsertLoop(globalArray, globalArray.length)
}

let insertSort = document.getElementById("insertSort")
insertSort.addEventListener("click", insert_sort)
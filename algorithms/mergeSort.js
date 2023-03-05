//this sort uses creates a array of tupples form global array, (index, value)
//uses the range of indexes in each array to choose which
//indexes to update in the global array for rendering

const updateArray = async(arr, low, high) => {
    let i = low
    let j = 0
    while(i < high+1){
        globalArray[i] = arr[j].n
        i++
        j++
    }
    await slowRender(100)
    return true
}

const findIdxRange = async(arr) => {
    let high = arr[arr.length-1].idx
    let low = arr[0].idx
    for(i = 0; i<arr.length; i++){
        if(arr[i].idx > high){
            high = arr[i].idx
        }
        if(arr[i].idx < low){
            low = arr[i].idx
        }
    }
    return { high, low }
}


const joinLists = async(arr, left, right, compare) => {
    let i = 0
    let j = 0
    let k = 0

    while(true){
        if(await compare(left[i].n, right[j].n)){
            arr[k] = left[i]
            i++
        }
        else{
            arr[k] = right[j]
            j++
        }
        k++
        if(i == left.length || j == right.length){
            break
        }
    }

    while(i < left.length){
        arr[k] = left[i]
        i++
        k++
    }
    while(j < right.length){
        arr[k] = right[j]
        j++
        k++
    }
    let { high, low } = await findIdxRange(arr)
    await updateArray(arr, low, high)
    return arr
}

const split = async(arr, m) => {
    if(arr.length == 0) return {left: [], right:[]}
    if(arr.length == 1) return {left: arr, right:[]}
    return {left: arr.slice(0, m), right: arr.slice(m)}
}
  
const mergeSort = async(arr, compare = (x, y) => {return x < y }) => {
    if(arr.length <= 1){return arr}
    let m = Math.floor(arr.length/2)
    let {left, right} = await split(arr, m)
    return joinLists(arr, await mergeSort(left, compare), await mergeSort(right, compare), compare)
}

const merge_sort = () => {
    let tupple = globalArray.map((n, idx)=>{return {n, idx}})
    mergeSort(tupple)
}

let mergeSortBtn = document.getElementById("mergeSort")
mergeSortBtn.addEventListener("click", merge_sort)
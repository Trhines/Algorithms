let body = document.getElementById("body")
let bubbleSort = document.getElementById("bubbleSort")
let newArr = document.getElementById("newArray")
let arrayContainer = document.getElementById("arrayContainer")
let logBtn = document.getElementById('log')
let fullWidth = window.innerWidth
let fullHeight = parseInt(getComputedStyle(arrayContainer).height.split("p")[0])
let globalArray = []
let globalArrayLength = 100

console.log(fullHeight)

const createArrayElement = (int) => {
    let el = document.createElement("div")
    el.setAttribute('id', 'arrayElement')
    el.style.width = `${fullWidth/globalArrayLength}px`
    el.style.height = `${int}px`
    return el
}

const createAllElements = async(array) => {

    let arr = []
    for(let i=0; i<array.length; i++){
        let newEl = await createArrayElement(array[i])
        arr.push(newEl)
    }
    return arr
}

const createArray = () => {
  let arr = []
  for(let i=0; i<globalArrayLength; i++){
      let randomInt = Math.floor(Math.random()*fullHeight)
      arr.push(randomInt)    
  }
  globalArray = arr
}

const renderData = async() => {
    let elements = await createAllElements(globalArray)
    await arrayContainer.replaceChildren(...elements)
}

const initArray = () => {
    createArray()
    renderData()
}

const log = () => {
    console.log(globalArray)
}


const slowRender = (ms) => {
    return new Promise(resolve => setTimeout(()=>{
        renderData()
        resolve()
    }, ms));
}

const swap = async(array, i, j) => {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

const innerLoop = async(array, length, n=0) => {
    if (n === length){
        return
    }
    else {
        if(array[n] > array[n + 1]){
            swap(array, n, n+1)
            await slowRender(10)
        }
        n+=1
        return innerLoop(array, length, n)
    }
}

const outerLoop = async(array, length, n=0) => {
    if (n === length){
        return
    }
    else {
        await innerLoop(array, length - n - 1)
        n+=1
        return outerLoop(array, length, n)
    }
}

const bubble_sort = () =>{
    outerLoop(globalArray, globalArray.length)
}
   

newArr.addEventListener("click", initArray);
logBtn.addEventListener("click", log)
bubbleSort.addEventListener("click", bubble_sort)

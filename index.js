let body = document.getElementById("body")
let newArr = document.getElementById("newArray")
let arrayContainer = document.getElementById("arrayContainer")
let logBtn = document.getElementById('log')
let fullWidth = window.innerWidth
let fullHeight = parseInt(getComputedStyle(arrayContainer).height.split("p")[0])
let globalArray = []
let globalArrayLength = 150

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

newArr.addEventListener("click", initArray);
logBtn.addEventListener("click", log)


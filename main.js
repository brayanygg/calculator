//← ÷ × − + =

let screen = document.querySelector('.calculator-screen')
let calculatorButtons = document.querySelector('.calculator-buttons')

let symbols = [];
let numbers = [];
let numberConformation = ""
let screenBuffer = ""
let dot = false
let priorityOperation = false

function clear() {
    symbols = []
    numbers = []
    numberConformation = ""
    screenBuffer = ""
    dot = false

}

function refreshScreen() {

    if(screenBuffer === "") {
        screen.innerText = "0"
    }else{
        screen.innerText = screenBuffer
    }
    
}

function process(value) {

    if (isNaN(value)) {

        handleSymbols(value)
    }
    else {

       handleNumbers(value)
    }
}

function resultOperation() {

    console.log(`Numbers: ${numbers}, Symbols: ${symbols}`)
    let result = 0

    if(priorityOperation) {

        console.log("multi");
        for(let i = 0; i < symbols.length; i++) {
            if(symbols[i] === "×") {
                
                result = (Number(numbers[i]) * Number(numbers[i + 1]))
                numbers.splice(i,2,result.toFixed(2)) 
                symbols.splice(i,1)
                i--

            }else if(symbols[i] === "÷") {

                result = (Number(numbers[i]) / Number(numbers[i + 1]))
                numbers.splice(i,2, result.toFixed(2))
                symbols.splice(i,1)
                i--
            }
        }
        priorityOperation = false
        resultOperation()
        
    }else if(symbols.length >= 1 ){
        console.log("sum");

        for(let i = 0; i < symbols.length; i++){

            
            if(symbols[i] === "+"){

                result = (Number(numbers[i]) + Number(numbers[i + 1]))
                numbers.splice(i,2,result.toFixed(2)) 
                symbols.splice(i,1)
                i--
            }else if(symbols[i] === "−"){
                
                result = (Number(numbers[i]) - Number(numbers[i + 1]))
                numbers.splice(i,2, result.toFixed(2))
                symbols.splice(i,1)
                i--
            }
        }
    }

    if(numbers.length === 1){

        screenBuffer = String(numbers[0])
    }else{
        throw new Error(`system of operations has failed`)
    }

    refreshScreen()
}

function handleSymbols (symbol) {
    switch(symbol) {
        case "AC":
            
            clear()
            refreshScreen()
            
            break;
        case "←":
            
            if (screenBuffer.length != 0) {

                if(screenBuffer.length === 1) {

                    clear()

                }else{

                    let lastSymbol = screenBuffer.slice(-1)

                    if (isNaN(lastSymbol) && lastSymbol != ".") {

                        symbols.pop()
                    }else {
                        if(numberConformation.length === 0) {

                            numberConformation = numbers.pop()
                        }

                        if(lastSymbol == ".") {
                            dot = false
                        }

                        numberConformation = numberConformation.slice(0,numberConformation.length - 1)
                    }

                    screenBuffer = screenBuffer.slice(0,screenBuffer.length - 1)
                }

                refreshScreen()
            }

            break;
        case ".":
            if (!isNaN(screenBuffer[screenBuffer.length-1]) && !dot) {
                screenBuffer += symbol
                numberConformation += symbol
                dot = true
            }
            
            refreshScreen()
            break;

        case "×":
        case "÷":
        case "+":
        case "−":
            handleMathSymbols(symbol)
            break;

        case "=" :

        if(numberConformation.length > 0) {

            numbers.push(numberConformation)
        }
            resultOperation()

        break;
        
        default:
            throw new Error(`Unespected symbol: '${symbol}'`);
    }
}

function handleMathSymbols(symbol) {
    
    if(screenBuffer.length === 0) {
        return 0
    }

    let lastValue = screenBuffer[screenBuffer.length-1]
    
    if(isNaN(lastValue) && lastValue != ".") {
        
        screenBuffer = screenBuffer.slice(0,screenBuffer.length - 1)
        symbols.pop()
    }else if(lastValue === ".") {
        screenBuffer = screenBuffer.slice(0,screenBuffer.length - 1)
    }
    
    if(symbol === "÷" || symbol === "×") {
        priorityOperation = true
    }

    symbols.push(symbol)
    screenBuffer += symbol
    refreshScreen()

}

function handleNumbers(number) {

    let lastValue = screenBuffer[screenBuffer.length-1]

    if(isNaN(lastValue) && numberConformation.length > 0 && lastValue != ".") {

        if(numberConformation[numberConformation.length-1] === ".") {

            numberConformation = numberConformation.slice(0,numberConformation.length - 1)
        }

        numbers.push(numberConformation)
        numberConformation = ""
        dot = false
    }

    numberConformation += number
    screenBuffer += number

    refreshScreen()
    
}

calculatorButtons.addEventListener("click", (e) => {

    if(e.target.innerText.length <= 2){

        process(e.target.innerText)
    }
    
})
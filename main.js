//← ÷ × − + =

let screen = document.querySelector('.calculator-screen')
let calculatorButtons = document.querySelector('.calculator-buttons')

let symbols = [];
let numbers = [];
let numberConformation = ""
let screenBuffer = ""
let dot = false

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

    symbols.push(symbol)
    screenBuffer += symbol
    refreshScreen()
    console.log(`symbols: ${symbols}`);

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
        console.log(`numbers: ${numbers}`);
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
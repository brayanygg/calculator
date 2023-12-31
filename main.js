//← ÷ × − + =

let screen = document.querySelector('.calculator-screen')
let calculatorButtons = document.querySelector('.calculator-buttons')

let symbols = [];
let numbers = [];
let numberConformation = ""
let screenBuffer = ""
let lastValue = ""

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
            
            symbols = []
            numbers = []
            numberConformation = ""

            screenBuffer = ""
            refreshScreen()
            
            break;
        case "←":
            
            if (screenBuffer.length != 0) {

                if(screenBuffer.length === 1) {

                    screenBuffer = ""

                }else{
                    
                    screenBuffer = screenBuffer.slice(0,screenBuffer.length -1)
                }

                refreshScreen()
            }

            break;
        case ".":
            
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
    
    symbols.push(symbol)
    screenBuffer += symbol
    refreshScreen()
    lastValue = symbol
    console.log(`symbols: ${symbols}`);

}

function handleNumbers(number) {

    if(isNaN(lastValue)) {
        numbers.push(numberConformation)
        numberConformation = ""
        console.log(`numbers: ${numbers}`);
    }

    numberConformation += number
    screenBuffer += number

    refreshScreen()
    lastValue = number
    
}

function refreshScreen() {

    if(screenBuffer === "") {
        screen.innerText = "0"
    }else{
        screen.innerText = screenBuffer
    }
    
}

calculatorButtons.addEventListener("click", (e) => {

    if(e.target.innerText.length <= 2){

        process(e.target.innerText)
    }
    
})
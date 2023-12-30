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
            screenBuffer = ""
            screen.innerText = "0"
            
            break;
        case "←":
            
            if (screenBuffer.length != 0) {
                if(isNaN(lastValue)) {
                    
                    symbols.pop()
                    lastValue = numbers[numbers.length-1]
                }else {

                    numbers.pop()
                    lastValue = symbols[symbols.length-1]
                }
                screenBuffer = screenBuffer.slice(0, screenBuffer.length-1)
                screen.innerText = screenBuffer

  
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
    screen.innerText = screenBuffer
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
    screen.innerText = screenBuffer
    lastValue = number
    
}

calculatorButtons.addEventListener("click", (e) => {

    if(e.target.innerText.length <= 2){

        process(e.target.innerText)
    }
    
})
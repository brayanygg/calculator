//← ÷ × − + =

let screen = document.querySelector('.calculator-screen')
let calculatorButtons = document.querySelector('.calculator-buttons')

let symbols = [];
let numbers = [];
let numberConformation = ""
let screenBuffer = ""

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

                    numberConformation = numberConformation.slice(0,numberConformation.length - 1)
                    numbers = []
                    screenBuffer = ""

                }else{

                    if (isNaN(screenBuffer.slice(-1))) {
                        symbols.pop()
                    }else {
                        if(numberConformation.length === 0) {

                            numberConformation = numbers.pop()
                        }
                        numberConformation = numberConformation.slice(0,numberConformation.length - 1)
                    }

                    screenBuffer = screenBuffer.slice(0,screenBuffer.length - 1)
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

    let lastValue = screenBuffer[screenBuffer.length-1]
    
    if(isNaN(lastValue)) {
        
        screenBuffer = screenBuffer.slice(0,screenBuffer.length - 1)
        symbols.pop()
    }

    symbols.push(symbol)
    screenBuffer += symbol
    refreshScreen()
    console.log(`symbols: ${symbols}`);

}

function handleNumbers(number) {

    let lastValue = screenBuffer[screenBuffer.length-1]

    if(isNaN(lastValue) && numberConformation.length > 0) {

        numbers.push(numberConformation)
        numberConformation = ""
        console.log(`numbers: ${numbers}`);
    }

    numberConformation += number
    screenBuffer += number

    refreshScreen()
    
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
const BUTTON = document.querySelectorAll("button")
const SCREEN = document.querySelector("p")

let election;
let screenInfo = []

function printNumbers(digit) {

    let show = ""
    if (Number(digit) || digit === "0") {
        screenInfo.push(digit)
    } else if (digit === "." && digit != screenInfo[screenInfo.length - 1]) {
        screenInfo.push(digit)
    }
        
    for (const key in screenInfo) {
        show += screenInfo[key]
    }

    SCREEN.innerHTML = show
}
function addSimbol(simb) {
    if(Number(screenInfo[screenInfo.length - 1]) || screenInfo[screenInfo.length - 1] === "0") {
        let showSimbol = ""

        screenInfo.push(simb)

        for (const i of screenInfo) {
            showSimbol += i
        }
    
        SCREEN.innerHTML = showSimbol
    }else if(simb != screenInfo[screenInfo.length - 1]) {
        screenInfo.pop()
        addSimbol(simb)
    }
}

function result() {

    if(!Number(screenInfo[screenInfo.length - 1]) || !screenInfo[screenInfo.length - 1] === "0" ) { 
        screenInfo.pop() 
    }  

    let operation = "";
    for (const i of screenInfo) {
        operation += i
    }
    SCREEN.innerHTML = eval(operation).toFixed(2)
}

function process(element) {
    switch (element) {
        case "AC":
            screenInfo = []
            SCREEN.innerHTML = 0
            break;
        case "Del":
            
            screenInfo.pop()
            screenInfo.length != 0 ? printNumbers(element) : SCREEN.innerHTML = 0;
            break;

        case "=":
            result()
            break

        case "/":
            case "*":
                case "-":
                    case "+":
                        addSimbol(element)
                        break;
        default:
            printNumbers(element)
            break;
    }
}

BUTTON.forEach(button => {
    button.addEventListener("click", () => {
        election = button.textContent
        process(election)
    })
});

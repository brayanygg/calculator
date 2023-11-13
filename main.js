const BUTTON = document.querySelectorAll("button")
const SCREEN = document.querySelector("p")

let election;
let numbers = [];
let number = []
let show

function printNumbers(digit) {
    show = ""
    if (Number(digit) || digit === "0") {
        number.push(digit)
    }
        
    for (const key in number) {
        show += number[key]
    }
    SCREEN.innerHTML = show
}
function addSimbol(simb) {
    let showSimbol = show
    showSimbol += simb
    SCREEN.innerHTML = showSimbol
}

function process(element) {
    switch (element) {
        case "AC":
            numbers = []
            number = []
            SCREEN.innerHTML = 0
            break;
        case "Del":
            number.pop()
            number.length != 0 ? printNumbers(element) : SCREEN.innerHTML = 0;
            break;

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


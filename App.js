let buttons = document.getElementById("button-container");

const calculator = (input) =>{
    let display = 0;
    let storage = 0;
    let runningTab = 0;
    let operand;

    //Change background color onClick
    buttons.addEventListener("click", function (event) {
        let original = event.target.style.backgroundColor;
        event.target.style.backgroundColor = "#686868";
        setTimeout(function (){
            event.target.style.backgroundColor = original;          
          }, 100);
    });
    
    buttons.addEventListener("click", function (event) {
        let val = event.target.innerText;
        //If Number
        if (!isNaN(parseInt(val))){
            enterNumbers(val);
        }
        else {            
            //If Operand
            switch(val){
                case "C": 
                    storage = 0;
                    runningTab = 0;
                    display = 0;
                    break;
                case "B":
                    display += "";
                    display = display.split("");
                    display.pop();
                    display = display.join("");
                    storage = Number(display);
                    break;
                case "=": 
                    storage = operand(runningTab, storage); 
                    display = storage;
                    operand = null;
                    break;
                default :
                // console.log("hit default")
                    if (operand){
                        runningTab = operand(runningTab, storage);
                    } else {
                        runningTab = storage;
                    }
                    storage = 0;
                    if (val === "+"){
                        operand = addNumbers;
                    }
                    if (val === "-"){
                        operand = subtractNumbers;
                    }   
                    if (val === "/"){
                        operand = divideNumbers;
                    }
                    if (val === "x"){
                        operand = multiplyNumbers;
                    }
                    display = runningTab;
                    break;                       
            }
        }

        // console.log(val);
        updateDisplay(display);
    })

    const enterNumbers = (val)=>{
            // console.log('hit number', typeof (parseInt("val")), val);
            //First number non-zero
            if (val !== "0" && storage === 0){
                storage = val;
            } 
            //first number zero
            else if (val === "0" && storage === 0){} 
            //not first number
            else {
                storage += val;
            }
            display = storage;
    }
    
    let addNumbers = (x, y) => (Number(x)+Number(y));
    let subtractNumbers = (x, y)=>(x-y);
    let divideNumbers = (x, y) =>(x / y);
    let multiplyNumbers = (x, y) =>(x * y);


}
const updateDisplay = (input) => {
    let display = document.getElementById("display");
    display.innerHTML = `${input}`;
}

calculator();

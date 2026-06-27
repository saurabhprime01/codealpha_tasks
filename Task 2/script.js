/*JS code */
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        if(value === "C"){
            display.value = "";
        }

        else if(value === "⌫"){
            display.value = display.value.slice(0,-1);
        }

        else if(value === "="){

            try{
                display.value = eval(display.value);
            }
            catch{
                display.value = "Error";
            }

        }

        else{
            display.value += value;
        }

    });

});

/* Keyboard Support */

document.addEventListener("keydown",(e)=>{

    const key = e.key;

    if(
        (key >= "0" && key <= "9") ||
        ["+","-","*","/",".","%"].includes(key)
    ){
        display.value += key;
    }

    if(key === "Enter"){
        try{
            display.value = eval(display.value);
        }
        catch{
            display.value = "Error";
        }
    }

    if(key === "Backspace"){
        display.value = display.value.slice(0,-1);
    }

    if(key === "Escape"){
        display.value = "";
    }

});

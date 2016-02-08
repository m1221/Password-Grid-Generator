/*  TODO
 * DONE 1. finish makeRadioButtons function by making it append html input buttons
 * 2. finish generateCharacters. it should generate an array 10 elements long
 * 3. make generate grid add the actual divs to the html page
 * 4. style the boxes
 */

(function(){
    //wut
    // charOptions does not have a length property
    // but querySelector("form") does
    var gridChar = ["A","B","C","D","E","F","G","H","I/J","K","L","M",
                   "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        
    var charOptions = {
        "Standard Characters": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "Standard + Number": "1234567890",
        "Standard + Number + Special": "!@#$%^&*()-_"
    };
    
    /* Helper Functions
     *
     */
    function generateCharacters(){
        //Math.
    }
    
    function checkSelection(){
        var form = document.querySelector("form");
        for (var i = 0; i < form.length; i++){
            if (form[i].checked == true){
                return form[i].value;
            }
        }
    }
    /* Main Functions
     *
     */
     
    function makeRadioButtons(){
        var form = document.querySelector("form"),
            radio,
            radioText = document.createElement("span");
            
        
        for (key in charOptions){
            radio = document.createElement("input");
            radioText = document.createElement("label");
            
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "group");
            radio.setAttribute("id", key);
            radioText.setAttribute("for", key);
            radioText.innerHTML = key + "</br>";
            
            form.appendChild(radio);
            form.appendChild(radioText);
            
        }
        form[0].setAttribute("checked", "checked");
    }
    
    function generateGrid(){
        var characters = checkSelection();
        
        var grid = {};
        
        gridChar.forEach(function(key){
            grid[key] = generateCharacters();
        });
    }
    
    function printGrid(){}
    
    /*
     *
     */
     
    makeRadioButtons();
    
    document.getElementById("genButton").addEventListener("click", generateGrid);
    document.getElementById("printButton").addEventListener("click", printGrid);
})();
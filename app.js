/*  TODO
 * DONE 1. finish makeRadioButtons function by making it append html input buttons
 * DONE 2. make basic generateCharacters. it should generate an array 10 elements long
 * DONE 3. make generate grid add the actual divs to the html page
 * 4. style the boxes
 * 5. make generateGrid button remove previous grids
 */

(function(){
    //wut
    // charOptions does not have a length property
    // but querySelector("form") does
    var display;
    var displayOuter = document.getElementById("outer-grid");
    var displayCSS = new String("<link href='style.css' rel='stylesheet' type='text/css'>");
    var gridChar = ["A","B","C","D","E","F","G","H","I/J","K","L","M",
                   "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        
    var charOptions = {
        "Standard Characters": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "Standard + Number": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        "Standard + Number + Special": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_"
    };
    
    /* Helper Functions
     *
     */
    function generateCharacters(characters){
        var array = [],
            numCols = 5,
            numRows = 2,
            temp,
            nonce;
        for (var i = 0; i < numRows; i++){
            temp = "";
            for (var k = 0; k < numCols; k++){
                nonce = characters[Math.round(Math.random()*(characters.length-1))];
                temp += (nonce + " ");
            }
            array.push(temp);
        }
        return array;
    }
    
    function checkSelection(){
        var form = document.querySelector("form");
        for (var i = 0; i < form.length; i++){
            if (form[i].checked == true){
                return form[i].id;
            }
        }
    }
    
    function addToGrid(grid){
        function makeBox(key){
            content = "<span class='box-title'>" + key + "</span>";
        
            grid[key].forEach(function(elem){
                content += "<div class='box-row'>";
                content += elem + "</div>"; 
            });
        
            box = document.createElement("div");
            box.setAttribute("class", "grid-box");
            box.innerHTML = content;
            row.appendChild(box);
        }
    
        display = document.getElementById("grid");
        
        while (display.firstChild){
            display.removeChild(display.firstChild);
        }
        
        var row = document.createElement("div");
            row.setAttribute("class", "grid-row");
            
        var box, content;
        
        var squareRoot = Math.floor(Math.sqrt(gridChar.length));
        var colCount = 0;

        gridChar.forEach(function(key){
            if (colCount < squareRoot -1){
                makeBox(key, grid);
                colCount ++;
            } else {
                makeBox(key);
                display.appendChild(row);
                row = document.createElement("div");
                row.setAttribute("class", "grid-row");
                colCount = 0;
            }
        });
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
        var characters = charOptions[checkSelection()];
        
        var grid = {};
        
        gridChar.forEach(function(key){
            grid[key] = generateCharacters(characters);
        });
        addToGrid(grid);
    }
    
    function printGrid(){
        window.frames["print_frame"].document.body.innerHTML = displayCSS + displayOuter.innerHTML;
        // call stack trick to make sure print_frame gets styled in time.
        window.setTimeout(function(){
            window.frames["print_frame"].window.focus();
            window.frames["print_frame"].window.print();
        },50);
        
    }
    
    /*
     *
     */
     
    makeRadioButtons();
    
    document.getElementById("genButton").addEventListener("click", generateGrid);
    document.getElementById("printButton").addEventListener("click", printGrid);
})();
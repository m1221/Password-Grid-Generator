(function(){
    // Set up variables
    var display;
    // displayOuter and displayCSS are used for the print functionality
    var displayOuter = document.getElementById("outer-grid");
    var displayCSS = new String("<link href='style.css' rel='stylesheet' type='text/css'>");
    /* gridChar is an array containing the 'primary' characters
     * of the grid. the grid is 5x5
     */
    var gridChar = ["A","B","C","D","E","F","G","H","I/J","K","L","M",
                   "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        
    var charOptions = {
        "Standard Characters": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "Standard + Number": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        "Standard + Number + Special": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_"
    };
    
    // Set up helper Functions
    function generateCharacters(characters){
        /* generateCharacters is called in generateGrid().
         * It takes a single parameter 'characters' (a string value)
         * comprising the possible string values to will be produced
         * and from them generates sequences of randomly created 
         * string values and returns those values in an array
         */
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
        /* checkSelection checks which bubble was selected
         * at the time the user clicks on "Generate Grid"
         * and returns the name of that bubble. This name
         * should correspond to one of the keys in charOptions.
         */
        var form = document.querySelector("form");
        for (var i = 0; i < form.length; i++){
            if (form[i].checked == true){
                return form[i].id;
            }
        }
    }
    
    function addToGrid(grid){
        /* addToGrid is called in generateGrid. It is the 'workhorse' of
         * the function.
         */
         
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
    
    
        // if there is a previous grid, remove it
        display = document.getElementById("grid");
        
        while (display.firstChild){
            display.removeChild(display.firstChild);
        }
        
        
        // set up variables to be used during grid construction
        var box, content,
        squareRoot = Math.floor(Math.sqrt(gridChar.length)),
        colCount = 0;
        
        // create the first row if the grid
        var row = document.createElement("div");
            row.setAttribute("class", "grid-row");
            
        // iterate through each box-to-be in the grid and make each one
        gridChar.forEach(function(key){
            // if this condition is true, keep working on the same row
            if (colCount < squareRoot -1){
                makeBox(key, grid);
                colCount ++;
            } else {
                makeBox(key);
                display.appendChild(row);
                
                // create subsequent rows of the grid
                row = document.createElement("div");
                row.setAttribute("class", "grid-row");
                colCount = 0;
            }
        });
    }
    
    // Main Functions
     
    function makeRadioButtons(){
        /* makeRadioButtons generates the radio buttons to be used
         * by the user from the charOptions object
         */
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
        /* generateGrid is called when a user clicks on the "Generate Grid"
         * button. It creates a 5x5 grid on the HTML page.
         */
        var characters = charOptions[checkSelection()];
        
        var grid = {};
        
        gridChar.forEach(function(key){
            grid[key] = generateCharacters(characters);
        });
        addToGrid(grid);
    }
    
    function printGrid(){
        /* printGrid is called when a user clicks on the "Print Grid"
         * button. it opens a print options for the user. Only the grid
         * will be printed.
         */
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
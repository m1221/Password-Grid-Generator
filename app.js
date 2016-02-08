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
            nonce;
        for (var i = 0; i < 10; i++){
            nonce = characters[Math.round(Math.random()*(characters.length-1))];
            array.push(nonce);
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
        var display = document.getElementById("grid");
        
        var row = document.createElement("div");
            row.setAttribute("class", "grid-row");
            
        var box, content;
        
        var squareRoot = Math.floor(Math.sqrt(gridChar.length));
        var colCount = 0;
        

        gridChar.forEach(function(key){
            if (colCount < squareRoot){
                content = "<span class='box-title'>" + key;
                content += "</span> <div class='box-row'>";
                content += grid[key].slice(0,5) + "</div>";
                content += "<div class='box-row'>";
                content += grid[key].slice(5,10) + "</div>";
                
                box = document.createElement("div");
                box.setAttribute("class", "grid-box");
                box.innerHTML = content;
                row.appendChild(box);
                colCount ++;
            } else {
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
    
    function printGrid(){}
    
    /*
     *
     */
     
    makeRadioButtons();
    
    document.getElementById("genButton").addEventListener("click", generateGrid);
    document.getElementById("printButton").addEventListener("click", printGrid);
})();
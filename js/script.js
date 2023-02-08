// add a dynamic header
let versionNum = "1.723dd";
document.getElementById("header").innerHTML = "Welcome to my website! " + versionNum;


    // Get a reference to a button element on the page
`var button = document.getElementById("mySelect");

    // Add a click event listener to the button
button.addEventListener("click", function() {
    // Code to be executed when the button is clicked
    alert("Button was clicked!");
    });
`
document.getElementById("mySelect").addEventListener("change", runFruit);

document.getElementById("testButton").onclick = function() {
    runTestButton();
    alert("Button was clicked!");
  };
  

function changeColor() {
    var color = document.getElementById("color").value;
    document.body.style.background = color;
}

function resetColor() {
    var resetValue = "lightblue"
    document.body.style.background = resetValue;
}


function runFruit() {
    var fruitValue = document.getElementById("mySelect").value;
    console.log("fruit ran" , fruitValue);

}

function runTestButton() {
    console.log("testButton")
    
}
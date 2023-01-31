// add a dynamic header
let versionNum = "1.70";
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


function changeColor() {
    var color = document.getElementById("color").value;
    document.body.style.background = color;
}

function resetColor() {
    var resetValue = "lightblue"
    document.body.style.background = resetValue;
}


function runFruit() {
    console.log("fruit ran");

}
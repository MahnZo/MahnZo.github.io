// add a dynamic header
let versionNum = "1.0";
document.getElementById("header").innerHTML = "Welcome to my website! " + versionNum;


// Get a reference to a button element on the page
var button = document.getElementById("myButton");

// Add a click event listener to the button
button.addEventListener("click", function() {
  // Code to be executed when the button is clicked
  alert("Button was clicked!");
});

var versionNum = "1.0"

function changeColor() {
  var color = document.getElementById("color").value;
  document.body.style.background = color;
}

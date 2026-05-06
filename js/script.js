// add a dynamic header
let versionNum = "1.01";
document.getElementById("header").innerHTML = "Welcome to my website! V." + versionNum;

document.getElementById("mySelect").addEventListener("change", runFruit);

document.getElementById("testButton").onclick = function() {
    runTestButton();

    var now = new Date();
    var dateString = now.toLocaleString();

    alert("Button was clicked!!!!!!!" + dateString);
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

if (typeof module !== "undefined") {
    module.exports = { changeColor, resetColor, runFruit, runTestButton };
}
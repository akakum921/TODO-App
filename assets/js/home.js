
var color = ["red", "orange", "green", "maroon", "pink", "violet"];



document.getElementById("add").onclick = function () {
    var randColor = color[Math.floor(Math.random() * color.length)];
    document.getElementById("task-category").style.backgroundColor = randColor;
}
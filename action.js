var y;
var sentiment;
var pesos;
var ml5;

sentiment = ml5.sentiment("movieReviews", "modelReady");
console.log(sentiment);

function tohappy() {
    var x = document.getElementById("happy").value
    var y = x.split(" ");
    console.log(y); {
        return y;
    } 
}

function place() {
pesos = document.getElementById("happy");
document.getElementById("insert").innerHTML = pesos.value;
console.log(pesos);
}




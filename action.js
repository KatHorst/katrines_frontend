let text;
let sentiment;
let pesos;

sentiment = ml5.sentiment("movieReviews");
console.log('ml5 version:', ml5.version);

function tohappy() {
    let split_text = document.getElementById("happy").value;
    const prediction = sentiment.predict(split_text);
    text = split_text.split(" ");
    console.log(text); 
    console.log(prediction);
}

function place() {
    pesos = document.getElementById("happy");
    document.getElementById("insert").innerHTML = pesos.value;
    console.log(pesos);
}




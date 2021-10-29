let text;
let sentiment;
let pesos;

sentiment = ml5.sentiment("movieReviews");
console.log('ml5 version:', ml5.version);

function tohappy() {
    let split_text = document.getElementById("happy").value;
    let prediction = sentiment.predict(split_text);
    text = split_text.split(" ");
    console.log(text);
    console.log(prediction);
    for (let i = 0; i < text.length; i++) {
        prediction = sentiment.predict(text[i]);
        console.log(prediction);
        if (prediction > 0.5) {
            console.log("Good word :)")
        } else if (prediction < 0.5) {
            console.log("Bad word :'(");
        } else {
            console.log("Unpredicted outcome");
        }
    }
}

function place() {
    pesos = document.getElementById("happy");
    document.getElementById("insert").innerHTML = pesos.value;
    console.log(pesos);
}




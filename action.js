let text;
let sentiment;
let pesos;

//AHHH DET HER ER EN ANDEN VERSION


sentiment = ml5.sentiment("movieReviews");
console.log('ml5 version:', ml5.version);

function tohappy() {
    let split_text = document.getElementById("happy").value;
    let prediction = sentiment.predict(split_text);
    text = split_text.split(" ");
    console.log(text);
    console.log(prediction);
    if (prediction.score < 0.5) {
        for (let i = 0; i < text.length; i++) {
            prediction = sentiment.predict(text[i]);
            console.log(prediction.score);
            if (prediction.score > 0.5) {
                console.log("Good word :)")
            } else if (prediction.score < 0.5) {
                console.log(text[i], "is a bad word :'(");
            } else {
                console.log("Unpredicted outcome");
            }
        }
    }
}
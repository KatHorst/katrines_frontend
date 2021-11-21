const sentiment = ml5.sentiment("movieReviews");
console.log('ml5 version:', ml5.version);

function stringToArray(text) {
    return text.split(" ");
}

function arrayToString(text) {
    let newText = text.join(" ");
    return newText = newText.charAt(0).toUpperCase() + newText.slice(1);
}

function addElementToPage(text) {
    const para = document.createElement("p");
    const node = document.createTextNode(text);
    para.appendChild(node);

    const element = document.getElementById("newPara");
    element.appendChild(para);
}

<<<<<<< HEAD
function toHappy(strOfWordsToReplace) {

    //arrOfWords.... should be text and become a string instead of an array
    let text = document.getElementById("happy").value;
    //let text = strOfWordsToReplace;
=======
function toHappy(strToBeReplaced) {

    //needs to be an argument 
    //let text = document.getElementById("happy").value;
    let text = strToBeReplaced;
>>>>>>> 392a786e4bc1bfd28d79f605e9d6771c7e8086b4

    let prediction = sentiment.predict(text);
    let split_text = stringToArray(text);
    let replaced_split_text = split_text;
    let happySentence;
    console.log(text);
    console.log(prediction);

    let sensitivity = parseFloat(document.getElementById("number").value);

    if (Number.isNaN(sensitivity)) {
        sensitivity = 0.5;
        console.log(sensitivity);
    }

    if (prediction.score < sensitivity) {
        for (let i = 0; i < split_text.length; i++) {
            prediction = sentiment.predict(split_text[i]);
            console.log(prediction.score);
            if (prediction.score > sensitivity) {
                console.log(split_text[i], "Good word :)")
            } else if (prediction.score <= sensitivity) {
                console.log(split_text[i], "is a bad word :'(");

                let apiData = {
                    url: 'https://dictionaryapi.com/api/v3/references/thesaurus/json/',
                    word: split_text[i].toLowerCase(),
                    key: '?key=71bc53b3-250e-4d40-9e89-11f3712c4100',
                }
                
                let {url, word, key} = apiData;
                let apiUrl = `${url}${word}${key}`

                //fetching(apiUrl);

                fetch(apiUrl)
                    .then( (data) => data.json())
                    .then(console.log("this shit"))
                    .then( (word) => createSentence(word, replaced_split_text, i, split_text.length))
                
            } else {
                console.log("Unpredicted outcome");
            }
        }
    }
    console.log("A SECOND HAPPY SENTENCE", happySentence);
}

function createSentence(data, arrOfWords, iteration, noOfIterations) {
    let randomWord = chooseWord(data);
    if ((randomWord  >= 0 && !isNaN(randomWord) == true)) {

        console.log("Picked word number: " + (randomWord + 1) + " out of " + data[0].meta.ants[0].length + " possible.");
        console.log("The opposite is: " + data[0].meta.ants[0][randomWord]);

        arrOfWords[iteration] = (data[0].meta.ants[0][randomWord]);

        console.log(arrOfWords)

        happySentence = arrayToString(arrOfWords);

        console.log("A HAPPY SENTENCE", happySentence);

        //because of fetch being async it is run at the very end
        //which leads us to have to need to check when to add the 
        //new sentence. WHICH DOESNT MATTER CUS WERE NOT ADDING SENTENCES ONLY REPLACING
        if (iteration === (noOfIterations - 1)){
            addElementToPage(happySentence);
            return happySentence;
        }
    }
}

function chooseWord(data, word) {
    if (data[0].meta.ants[0] !== undefined) {
        let numberOfWords;
        numberOfWords = data[0].meta.ants[0].length;
        //console.log("The original word was: " + word + "\nAnd this is the length of the array for this word: " + data[0].meta.ants[0].length);
        if (data[0].meta.ants[0].length >= 1) {
            let randomWord = Math.floor(Math.random() * numberOfWords)
            return randomWord
        } 
    } else {
        //input code if word is not in array
        console.log("There are no antonyms for this word.");
    }
}

function getAllElements() {
    let allParagraphs = document.getElementsByTagName("p");
<<<<<<< HEAD
    let allH1 = document.getElementsByTagName("h1");
    let allH2 = document.getElementsByTagName("h2");
    let allH3 = document.getElementsByTagName("h3");
    let allH4 = document.getElementsByTagName("h4");
    let allH5 = document.getElementsByTagName("h5");
=======
>>>>>>> 392a786e4bc1bfd28d79f605e9d6771c7e8086b4

    console.log(allParagraphs.length);

    for (let [key, value] of Object.entries(allParagraphs)) {
        console.log(`${key}: ${value}`);
<<<<<<< HEAD
        if (value == '[object HTMLParagraphElement]' || value == '[object HTMLHeadingElement]' || value == '[object HTMLInputElement]') {
            console.log("A P or TITLE ELEMENT HAS BEEN FOUND");
            console.log(value.innerHTML);
            value.innerHTML = toHappy(value.innerHTML);
            //value.value = "THIS HAS ALSO NOW CHANGED";
=======
        if (value == '[object HTMLParagraphElement]') {
            value.innerHTML = toHappy(value.innerHTML);
>>>>>>> 392a786e4bc1bfd28d79f605e9d6771c7e8086b4
        } else {
            console.log("nah");
        }
    }
}

async function fetching(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json()
    console.log(data);
}
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

function toHappy(allParagraphs) {

    //needs to be an argument 
    //let text = document.getElementById("happy").value;
    //allParagraphs[0].innerHTML = "THIS IS A TEST";

    
    let sensitivity = parseFloat(document.getElementById("number").value);
    
    if (Number.isNaN(sensitivity)) {
        sensitivity = 0.5;
    }
    
    for (let j = 0; j < allParagraphs.length; j++) {
        let text = allParagraphs[j].innerHTML;
        
        let prediction = sentiment.predict(text);
        let split_text = stringToArray(text);
        let replaced_split_text = split_text;

        if (prediction.score > sensitivity) {
            console.log("The sentence is positive")
        } else if (prediction.score <= sensitivity) {
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

                    fetching(apiUrl, replaced_split_text, i, split_text.length, allParagraphs, j);

                    /*fetch(apiUrl)
                        .then( (data) => data.json())
                        .then(console.log("this shit"))
                        .then( (word) => createSentence(word, replaced_split_text, i, split_text.length))*/
                    
                } else {
                    console.log("Unpredicted outcome");
                }
            }
        }
    }
}

function createSentence(data, arrOfWords, iteration, noOfIterations, allParagraphs, j) {
    let randomWord = chooseWord(data);
    let happySentence;
    console.log(typeof randomWord);
    if ((randomWord  >= 0 && !isNaN(randomWord) == true)) {

        console.log("Picked word number: " + (randomWord + 1) + " out of " + data[0].meta.ants[0].length + " possible.");
        console.log("The opposite is: " + data[0].meta.ants[0][randomWord]);

        arrOfWords[iteration] = (data[0].meta.ants[0][randomWord]);

        console.log(arrOfWords)

        happySentence = arrayToString(arrOfWords);

        console.log("A HAPPY SENTENCE", happySentence);

        //because of fetch being async it is ran at the very end
        //which leads us to have to need to check when to add the 
        //new sentence. WHICH DOESNT MATTER CUS WERE NOT ADDING SENTENCES ONLY REPLACING
        if (iteration === (noOfIterations - 1)){
            //addElementToPage(happySentence);
            allParagraphs[j].innerHTML = happySentence;
            return 0;
        }
    } else {

        arrOfWords[iteration] = randomWord;
        happySentence = arrayToString(arrOfWords);

        if (iteration === (noOfIterations - 1)) {
            allParagraphs[j].innerHTML = happySentence;
            return 0
        }
    }
}

function chooseWord(data) {
    if (data[0].meta.ants[0] !== undefined) {
        let numberOfWords = data[0].meta.ants[0].length;
        //console.log("The original word was: " + word + "\nAnd this is the length of the array for this word: " + data[0].meta.ants[0].length);
        if (data[0].meta.ants[0].length >= 1) {
            let randomWord = Math.floor(Math.random() * numberOfWords)
            return randomWord
        } 
    } else {
        console.log("There are no antonyms for this word.");
        return data[0].meta.id;
    }
}

function getAllElements() {
    let allParagraphs = document.getElementsByTagName("p");
    toHappy(allParagraphs);
}

async function fetching(apiUrl, arrOfWords, iteration, noOfIterations, allParagraphs, j) {
    const response = await fetch(apiUrl);
    const data = await response.json()
    createSentence(data, arrOfWords, iteration, noOfIterations, allParagraphs, j)
}
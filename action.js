const sentiment = ml5.sentiment("movieReviews");
console.log('ml5 version:', ml5.version);

function textToArray(text) {
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

function toHappy(strToBeReplaced) {

    //needs to be an argument 
    //let text = document.getElementById("happy").value;
    let text = strToBeReplaced;


    let prediction = sentiment.predict(text);
    let split_text = textToArray(text);
    let replaced_split_text = split_text;
    let happySentence;
    console.log(text);
    console.log(prediction);
    if (prediction.score < 0.7) {
        for (let i = 0; i < split_text.length; i++) {
            prediction = sentiment.predict(split_text[i]);
            console.log(prediction.score);
            if (prediction.score > 0.6) {
                console.log(split_text[i], "Good word :)")
            } else if (prediction.score < 0.6) {
                console.log(split_text[i], "is a bad word :'(");

                let apiData = {
                    url: 'https://dictionaryapi.com/api/v3/references/thesaurus/json/',
                    word: split_text[i].toLowerCase(),
                    key: '?key=71bc53b3-250e-4d40-9e89-11f3712c4100',
                }
                
                let {url, word, key} = apiData;
                let apiUrl = `${url}${word}${key}`
            
                fetch(apiUrl)
                    .then( (data) => data.json())
                    .then( (word) => createFile(word))
                
                function createFile(data) {
                    let randomWord = chooseWord(data, word);
                    if (randomWord >= 0) {
                        console.log("Picked word number: " + (randomWord + 1) + " out of " + data[0].meta.ants[0].length + " possible.");
                        console.log("The opposite is: " + data[0].meta.ants[0][randomWord]);
                        replaced_split_text[i] = (data[0].meta.ants[0][randomWord]);
                        console.log(replaced_split_text)

                        happySentence = arrayToString(replaced_split_text);
                        console.log("A HAPPY SENTENCE", happySentence);
                        console.log(split_text.length);

                        //because of fetch being async it is run at the very end
                        //which leads us to have to need to check when to add the 
                        //new sentence. WHICH DOESNT MATTER CUS WERE NOT ADDING SENTENCES ONLY REPLACING
                        /*if (i === (split_text.length - 1)){
                            addElementToPage(happySentence);
                            return 0;
                        }*/
                    }
                }
            } else {
                console.log("Unpredicted outcome");
            }
        }
    }
    console.log("A SECOND HAPPY SENTENCE", happySentence);
}

function place(inWord) {

    const apiData = {
        url: 'https://dictionaryapi.com/api/v3/references/thesaurus/json/',
        word: inWord,
        key: '?key=71bc53b3-250e-4d40-9e89-11f3712c4100',
    }
    
    const {url, word, key} = apiData;
    const apiUrl = `${url}${word}${key}`

    fetch(apiUrl)
        .then( (data) => data.json())
        .then( (word) => createFile(word))

    const createFile = (data) => {
        let parsed = JSON.stringify(data, null, 4);

    const randomWord = chooseWord(data, word);
    if (randomWord >= 0) {
        console.log("Picked word number: " + (randomWord + 1) + " out of " + data[0].meta.ants[0].length + " possible.");
        console.log("The opposite is: " + data[0].meta.ants[0][randomWord]);
        return(data[0].meta.ants[0][randomWord]);
    }}
}

function chooseWord(data, word) {
    console.log("The original word was: " + word + "\nAnd this is the length of the array for this word: " + data[0].meta.ants[0].length);
    if (data[0].meta.ants[0].length >= 1) {
        let numberOfWords = data[0].meta.ants[0].length;
        let randomWord = Math.floor(Math.random() * numberOfWords)
        return randomWord
    } else {
        console.log(data[0].meta.ants[0].length);
        console.log("There are no antonyms for this word.");
    }
}

function getAllElements() {
    let allParagraphs = document.getElementsByTagName("p");

    console.log(allParagraphs.length);

    for (let [key, value] of Object.entries(allParagraphs)) {
        console.log(`${key}: ${value}`);
        if (value == '[object HTMLParagraphElement]' || value == '[object HTMLHeadingElement]') {
            value.innerHTML = toHappy(value.innerHTML);
            
        } else {
            console.log("nah");
        }
    }
}
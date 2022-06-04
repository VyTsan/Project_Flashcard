const cardNameEng = document.querySelector('.card__face--front .name');
const cardNameVie = document.querySelector('.card__face--back .text');
const cardImg = document.querySelector('.card__img');

function randNum() {
    return Math.floor(Math.random() * cards.length);
}

function resetCount() {
    countIndex = 0;
    for (let i = 0; i < cards.length; i++) markIndex[i] = 0;
}

function setImgURL(card, fileExtension = 'jpg') {
    let nameLink = card.nameEng.replace(' ', '_');
    card.imgURL = `./assets/images/${nameLink}.${fileExtension}`;
    // console.log(card, fileExtension);
}

function showImg(card) {
    setImgURL(card);
    let img = new Image();
    img.src = card.imgURL;  
    img.onload = function() {
        if (this.width > 0) 
        {
            console.log("img exists", img.src);
            img.alt = card.nameEng;
        }
    }
    
    img.onerror = function() {
        setImgURL(card, 'jpeg')
        img.src = card.imgURL;
    }
    
    img.className = 'card__img img-fluid';
    document.body.querySelector('.card__img-wrapper').appendChild(img);
}

function checkImg(card) {
    console.log([cardImg]);
    // console.log(cardImg.offsetHeight + 'px');
    if (cardImg.offsetHeight === 0) 
    {
        // console.log(card);
        // console.log(card.imgURL);
        setImgURL(card, 'jpeg');
        return false;
    }
    return true;
}

function showCard(indexCard) {
    let card = cards[indexCard];
    // console.log(card);
    cardNameEng.innerText = card.nameEng;
    cardNameVie.innerText = card.nameVie;
    phoneticEle.innerText = card.phonetic;
    speakEle.setAttribute('src', card.audioURL);
    // cardImg.setAttribute('src', card.imgURL);

    if (!card.audioURL) 
        document.querySelector('.audio-btn').classList.add('btn-disabled');
    
    showImg(card);
    
    // setTimeout(() => {
    //     // console.log(cardImg.offsetHeight + 'px');
    //     if (!checkImg(card)) cardImg.setAttribute('src', card.imgURL);
    //     cardImg.setAttribute('alt', card.nameEng);
    // }, 300);
}

function resetCard() {
    cardNameEng.innerText = '';
    cardNameVie.innerText = '';
    // cardImg.setAttribute('src', '');
    // cardImg.setAttribute('alt', '');
    document.querySelector('.card__img-wrapper').innerHTML = '';
    phoneticEle.innerText = '';
    speakEle.setAttribute('src', '');
    document.querySelector('.audio-btn').classList.remove('btn-disabled');
}



const dictionaryAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const phoneticEle = document.querySelector('.phonetic');
const speakEle = document.getElementById('speak');


function getCardsData(indexCard, resolve) {
    let card = cards[indexCard];
    let nameLink = card.nameEng.replace(' ', '%20');

    fetch(`${dictionaryAPI}${nameLink}`)
        .then(response => response.json())
        .then(data => {
            // console.log(`${dictionaryAPI}${nameLink}`);
            // console.log(data);
            let phoneticText = '', audioSrc = '';
            if (data[0]?.phonetic) phoneticText = data[0].phonetic;
            else 
            {
                for (let i = 0; i<data[0].phonetics.length; i++)
                {
                    // console.log(data[0].phonetics[i].text);
                    if (data[0].phonetics[i]?.text) 
                    {
                        phoneticText = data[0].phonetics[i].text;
                        break;
                    }
                }
            }

            for (let i = 0; i<data[0].phonetics.length; i++)
            {
                if (data[0].phonetics[i]?.audio) 
                {
                    // console.log(data[0].phonetics[i]?.audio);
                    audioSrc = data[0].phonetics[i].audio;
                    break;
                }
            }

            card.phonetic = phoneticText;
            card.audioURL = audioSrc;
            // console.log(audioSrc, phoneticText);
        })
        .then(() => {
            setImgURL(card);
        })
        .then(() => {
            if (indexCard === cards.length-1) resolve();
        })
}

let countIndex = 0;
let markIndex = [];

let start = new Promise(resolve => {
    for (let i = 0; i < cards.length; i++) 
        getCardsData(i, resolve);
})

start  
    .then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let loadingModal = document.querySelector('.loading__modal');
                loadingModal.style.display = 'none';
                resolve();
            }, 1700);
        })
    })
    .then(() => {
        // console.log(cards);
        resetCount();
        let num = randNum();
        // console.log(num + 'index');
        countIndex++;
        markIndex[num]++;
        return num;
    })
    .then(numStart => {
        showCard(numStart);
    });



const changeCardBtn = document.querySelector('.btn.change-card');

changeCardBtn.addEventListener('click', function() {
    let loadingModal = document.querySelector('.loading__modal');
    if (cardEle.classList.contains('is-flipped')) 
    {
        cardEle.classList.remove('is-flipped');
    }
    else loadingModal.style.display = 'block';

    
    resetCard();
    setTimeout(() => {
        loadingModal.style.display = 'none';
    }, 300);
    setTimeout(() => {

        let temp = randNum();
        while (markIndex[temp]>=1) temp = randNum();
        // console.log(temp, "temp nà");
        showCard(temp);

        markIndex[temp]++;
        countIndex++;

        if (countIndex === cards.length) resetCount();
    }, 300);
})

function playSound() {
    let btn = document.querySelector('.audio-btn');
    if (!btn.classList.contains('btn-disabled')) speakEle.play();
}


// Update JS

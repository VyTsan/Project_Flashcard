const cardNameEng = document.querySelector('.card__face--front .name');
const cardNameVie = document.querySelector('.card__face--back .text');
const cardImg = document.querySelector('.card__img');

function randNum() {
    return Math.floor(Math.random() * cards.length);
}

function checkNumUsed(num) {
    
}


function checkImg(card) {
    if (cardImg.offsetHeight === 0) 
    {
        console.log(card.imgURL);
        setImgURL(card, 'jpeg');
        return false;
    }
    return true;
}

function showImg(card) {
    cardImg.setAttribute('src', card.imgURL);
    cardImg.setAttribute('alt', card.nameEng);
}

function showCard(indexCard) {
    let card = cards[indexCard];
    console.log(card);
    cardNameEng.innerText = card.nameEng;
    cardNameVie.innerText = card.nameVie;
    phoneticEle.innerText = card.phonetic;
    speakEle.setAttribute('src', card.audioURL);
    cardImg.setAttribute('src', card.imgURL);

    if (!card.audioURL) 
        document.querySelector('.audio-btn').classList.add('btn-disabled');

    setTimeout(() => {
        console.log(cardImg.offsetHeight + 'hahaha');
        if (!checkImg(card)) showImg(card);
    }, 1000);
}

function resetCard() {
    cardNameEng.innerText = '';
    cardNameVie.innerText = '';
    cardImg.setAttribute('src', '');
    cardImg.setAttribute('alt', '');
    phoneticEle.innerText = '';
    speakEle.setAttribute('src', '');
    document.querySelector('.audio-btn').classList.remove('btn-disabled');
}

const changeCardBtn = document.querySelector('.btn.change-card');

changeCardBtn.addEventListener('click', function() {
    if (cardEle.className.indexOf('is-flipped') >= 0) cardEle.classList.remove('is-flipped');
    setTimeout(() => {
        resetCard();

        // while (true)
        // {
            temp = randNum();
        //     if (checkNumUsed(temp)) break;
        // }
        if (numStart < cards.length-1) numStart++;
        else numStart = 0;
        showCard(numStart);
    }, 300);
})

function playSound() {
    let btn = document.querySelector('.audio-btn');
    if (!btn.classList.contains('btn-disabled')) speakEle.play();
}


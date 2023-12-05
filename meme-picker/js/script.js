import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const modalTitle = document.getElementById('modal-title');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

memeModalCloseBtn.addEventListener('mouseover', changeToSolid);

memeModalCloseBtn.addEventListener('mouseleave', changeToRegular)

document.addEventListener('click', closeModal);

emotionRadios.addEventListener('change', highlightCheckedOption);

getImageBtn.addEventListener('click', renderCat);

function changeToSolid(e) {
    e.target.classList.remove('fa-regular');
    e.target.classList.add('fa-solid');
}

function changeToRegular(e) {
    e.target.classList.add('fa-regular');
    e.target.classList.remove('fa-solid');
}

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio');

    for (const radio of radios) {
        radio.classList.remove('highlight');
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

function closeModal(e) {
    if (e.target.matches('#meme-modal-close-btn') || e.target.matches('#meme-picker-container')) {
        memeModal.style.display = 'none';
    }
}

function renderCat() {
    const catsArray = getMatchingCatsArray();
    const caption = catsArray[1];

    let imageElement = '';
    for (const cat of catsArray[0]) {
        imageElement += `<img class="cat-img" src="./images/${cat.image}" alt="${cat.alt}">`;
    }

    memeModalInner.innerHTML = imageElement;
    modalTitle.textContent = `#${caption}`;

    memeModal.style.display = 'flex';
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();

    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomNumber];
    }
}

function getMatchingCatsArray() {
    const selectedRadio = document.querySelector('input[type="radio"]:checked');
    const isGif = gifsOnlyOption.checked;
    let selectedEmotion = "";

    if (selectedRadio) {
        selectedEmotion = selectedRadio.value;

        const matchingCatsArray = catsData.filter(cat => {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
            }

            return cat.emotionTags.includes(selectedEmotion);
        });

        return [matchingCatsArray, selectedEmotion];
    }
}

function getEmotionsArray(cats) {
    let emotionsArray = [];

    cats.forEach((cat) => {
        for (const emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    });
    return emotionsArray;
}

function renderEmotionsRadios(cats) {
    let radioItems = ``;
    const emotions = getEmotionsArray(cats)

    emotions.forEach(emotion => {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" value="${emotion}" name="choice-radios">
            </div>
        `;
    });

    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData)
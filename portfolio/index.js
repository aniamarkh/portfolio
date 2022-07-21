let theme = 'dark';
let lang = 'en';

// theme

const themeSwitcher = document.querySelector('.theme-switch');

function changeTheme() {
    theme === 'dark' ? theme = 'light' : theme = 'dark';
    document.body.classList.toggle("light-theme");
}

themeSwitcher.addEventListener("click", changeTheme);


// language

import i18Obj from './translate.js';
const langRu = document.querySelector('.lang-ru');
const langEn = document.querySelector('.lang-en');
const navLink = document.querySelectorAll('.nav-link');

function getTranslate(lang) {
    const langAtb = document.querySelectorAll('[data-i18n]');
    const transInp = document.querySelectorAll('.input');

    langAtb.forEach((el) => {
        el.textContent = i18Obj[lang][el.dataset.i18n]
    });

    transInp.forEach((el) => {
        el.placeholder = i18Obj[lang][el.dataset.i18n]
    })
};

langRu.addEventListener('click', () => {
    getTranslate('ru'),
        langRu.classList.add('lang-text--active'),
        langEn.classList.remove('lang-text--active'),
        document.querySelector('.nav-list').classList.add('nav-list--ru'),
        lang = 'ru'
});

langEn.addEventListener('click', () => {
    getTranslate('en'),
        langEn.classList.add('lang-text--active'),
        langRu.classList.remove('lang-text--active'),
        document.querySelector('.nav-list').classList.remove('nav-list--ru'),
        lang = 'en'
});

// open menu & hamburger/cross

const hamburger = document.querySelector('.hamburger');

function toggleMenu() {
    hamburger.classList.toggle('cross');
    document.getElementById('menu').classList.toggle('open');
}

hamburger.addEventListener('click', toggleMenu);

const Links = document.querySelectorAll('.link');
Links.forEach((el) => el.addEventListener('click', closeMenu));


function closeMenu(event) {
    if (event.target.classList.contains('link')) {
        document.getElementById('menu').classList.remove('open');
        document.getElementById('hamburger').classList.remove('cross');
    }
};

// season change

const portfolioBtnList = document.querySelector('.portfolio-buttons');
const portfolioImgList = document.querySelectorAll('.portfolio-photo');

function changePortfolio(event) {
    document.querySelectorAll('.portfolio-button').forEach(el => el.classList.remove('on'));
    event.target.classList.add('on');

    const season = event.target.dataset.season;
    switch (season) {
        case 'winter': portfolioImgList.forEach((img, index) => img.src = `./assets/img/winter/${index + 1}.jpg`); break;
        case 'spring': portfolioImgList.forEach((img, index) => img.src = `./assets/img/spring/${index + 1}.jpg`); break;
        case 'summer': portfolioImgList.forEach((img, index) => img.src = `./assets/img/summer/${index + 1}.jpg`); break;
        case 'autumn': portfolioImgList.forEach((img, index) => img.src = `./assets/img/autumn/${index + 1}.jpg`); break;
    }
}

portfolioBtnList.addEventListener('click', changePortfolio);

// local storage

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    lang = localStorage.getItem('lang');
    getTranslate(lang);
    if (lang == 'en') {
        langEn.classList.add('lang-text--active'),
            langRu.classList.remove('lang-text--active'),
            document.querySelector('.nav-list').classList.remove('nav-list--ru')
    } else if (lang = 'ru') {
        langRu.classList.add('lang-text--active'),
            langEn.classList.remove('lang-text--active'),
            document.querySelector('.nav-list').classList.add('nav-list--ru')
    }

    theme = localStorage.getItem('theme');
    if (theme == 'light') {
        document.body.classList.add("light-theme");
    }
    if (theme == 'dark') {
        document.body.classList.remove("light-theme");
    }
}

window.addEventListener('load', getLocalStorage);

// animation

const buttonsArr = document.querySelectorAll('.ripple');

buttonsArr.forEach((el, i) => (el.addEventListener('click', function (e) {

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = el.offsetY + 'px'
    circle.style.left = el.offsetX + 'px'

    this.appendChild(circle)

    setTimeout(() => circle.remove(), 500)
})))


// video-player

const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const toggle = player.querySelector('.play-btn');
const controls = player.querySelector('.controls')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-filled')
const volume = player.querySelector('.volume-icon');
const playIcon = player.querySelector('.play-icon');
const volumeLevel = player.querySelector('.color-line');
const volumeRange = player.querySelector('.player-slider');

function togglePlay() {
    if (video.paused) {
        toggle.style.display = 'none';
        controls.style.display = 'flex';
        video.play();
    } else {
        toggle.style.display = 'block';
        video.pause();
    }
}

function updateButton() {
    if (video.paused) {
        playIcon.classList.remove('pause');
        playIcon.classList.add('play');
    } else {
        playIcon.classList.remove('play');
        playIcon.classList.add('pause');
    }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
playIcon.addEventListener('click', updateButton);
playIcon.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

function timeUpdate() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
}

function changeTime(e) {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
}

video.addEventListener('timeupdate', timeUpdate);
progress.addEventListener('click', changeTime);

function muteSound() {
    if (video.muted) {
        video.muted = false;
        volume.classList.remove('mute');
        volume.classList.add('volume-icon');

    } else {
        video.muted = true;
        volume.classList.remove('volume-icon');
        volume.classList.add('mute');
    }
}

volume.addEventListener('click', muteSound);

function rangeUpdate() {
    video[this.name] = this.value / 100;
}

function soundLineUpdate() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #BDAE82 0%,
      #BDAE82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 0%)`;
}


volumeLevel.addEventListener('input', soundLineUpdate);
volumeRange.addEventListener('change', rangeUpdate);
volumeRange.addEventListener('mousemove', rangeUpdate);

console.log(`
Oценка за задание: 85 баллов
1. Смена изображений в секции portfolio +25
2. Перевод страницы на два языка +25
3. Переключение светлой и тёмной темы (выбрана светлая тема #2) +25
4. Доп. функционал: выбранный пользователем язык отображения страницы и выбранная тема сохраняются при перезагрузке страницы +5
5. Доп. функционал: сложные эффекты для кнопок при наведении и/или клике +5
`);
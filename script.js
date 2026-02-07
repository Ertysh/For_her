const mainTitle = document.getElementById('mainTitle');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainCard = document.getElementById('mainCard');
const pageBody = document.getElementById('pageBody');

let noClicks = 0;
let storyPhase = "VALENTINE"; // Може бути: VALENTINE або END_STORY

// Функція для рандомного переміщення кнопки по всьому екрану
function moveNoButton() {
    noBtn.style.position = 'fixed';
    
    // Робимо відступи від країв екрану
    const padding = 100;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    
    const randomX = Math.random() * maxX + (padding / 2);
    const randomY = Math.random() * maxY + (padding / 2);
    
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Повернення кнопки в центр картки
function resetNoButton() {
    noBtn.style.position = 'static';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
}

noBtn.addEventListener('click', () => {
    if (storyPhase === "VALENTINE") {
        noClicks++;
        
        if (noClicks < 4) {
            moveNoButton();
        } else {
            // ФАЗА 2: Ультиматум
            storyPhase = "END_STORY";
            mainTitle.innerText = "Do you really want to end our story?";
            resetNoButton();
            noBtn.style.background = "#2b2d42"; // Робимо кнопку темнішою
        }
    } else if (storyPhase === "END_STORY") {
        // Якщо натиснула "Ні" на питання про кінець історії
        // Повертаємо до початку
        storyPhase = "VALENTINE";
        noClicks = 0;
        mainTitle.innerText = "Will you be my Valentine?";
        noBtn.style.background = "#8e9aaf";
        resetNoButton();
    }
});

yesBtn.addEventListener('click', () => {
    if (storyPhase === "VALENTINE") {
        // Перемога!
        mainCard.innerHTML = `
            <div class="heart-icon">❤️</div>
            <h1>Happy Valentine's Day, Alya!</h1>
            <p>You've made me the happiest person! ✨</p>
        `;
        pageBody.style.background = "#ffccd5";
    } else if (storyPhase === "END_STORY") {
        // Сумний фінал
        mainTitle.innerText = "Our story has ended... 💔";
        document.getElementById('btnGroup').style.display = 'none';
        pageBody.classList.add('sad-ending');
        document.querySelector('.heart-icon').innerText = '🌑';
    }
});

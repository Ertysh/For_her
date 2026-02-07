const mainTitle = document.getElementById('mainTitle');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainCard = document.getElementById('mainCard');
const pageBody = document.getElementById('pageBody');
const icon = document.getElementById('icon');

let noClicks = 0;
let currentState = "PHASE_1"; // PHASE_1, PHASE_2, PHASE_3

function moveNoButton() {
    noBtn.style.position = 'fixed';
    const padding = 100;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    noBtn.style.left = `${Math.random() * maxX + padding/2}px`;
    noBtn.style.top = `${Math.random() * maxY + padding/2}px`;
}

function resetButtons() {
    noBtn.style.position = 'static';
    noBtn.style.background = "#8e9aaf";
    noClicks = 0;
}

// ЛОГІКА КНОПКИ "YES"
yesBtn.addEventListener('click', () => {
    if (currentState === "PHASE_1") {
        // Перехід до "Чи хочеш продовжити спілкування?"
        currentState = "PHASE_2";
        mainTitle.innerText = "Do you want to continue our communication?";
        resetButtons();
    } 
    else if (currentState === "PHASE_2") {
        // ФІНАЛ: ВІТАННЯ
        mainCard.innerHTML = `
            <div class="heart-icon">🌹</div>
            <h1>Happy Valentine's Day, Alya! ❤️</h1>
            <p>You've made the best choice!</p>
        `;
        pageBody.style.background = "#ffccd5";
    }
    else if (currentState === "PHASE_3") {
        // ФІНАЛ: КІНЕЦЬ ІСТОРІЇ
        mainTitle.innerText = "Our story has ended... 💔";
        document.getElementById('btnGroup').style.display = 'none';
        pageBody.classList.add('sad-mode');
        icon.innerText = "🌑";
    }
});

// ЛОГІКА КНОПКИ "NO"
noBtn.addEventListener('click', () => {
    if (currentState === "PHASE_1") {
        noClicks++;
        if (noClicks < 4) {
            moveNoButton();
        } else {
            // Перехід до "Чи хочеш закінчити?"
            currentState = "PHASE_3";
            mainTitle.innerText = "Do you want to end our story?";
            resetButtons();
            noBtn.style.background = "#2b2d42"; 
        }
    } 
    else if (currentState === "PHASE_2") {
        // З "Продовжити спілкування" на "Закінчити історію"
        currentState = "PHASE_3";
        mainTitle.innerText = "Do you want to end our story?";
        noBtn.style.background = "#2b2d42";
    }
    else if (currentState === "PHASE_3") {
        // Повернення на початок
        currentState = "PHASE_1";
        mainTitle.innerText = "Will you be my Valentine?";
        resetButtons();
    }
});

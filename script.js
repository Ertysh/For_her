const mainTitle = document.getElementById('mainTitle');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const knight = document.getElementById('knight');
const princess = document.getElementById('princess');
const pageBody = document.getElementById('pageBody');
const effectContainer = document.getElementById('effectContainer');
const mainIcon = document.getElementById('mainIcon');

let noClickCount = 0;
let currentState = "VALENTINE";
let effectsInterval; // Змінна для зберігання таймера ефектів

// Функція для створення однієї частинки в заданих координатах
function spawnEffect(type, x, y) {
    const item = document.createElement('div');
    item.innerText = type;
    item.className = 'floating-item';
    
    // Додаємо трохи рандому, щоб вони не вилітали одною лінією
    const randomOffset = (Math.random() - 0.5) * 40; 
    item.style.left = (x + randomOffset) + 'px';
    item.style.top = y + 'px';
    
    // Випадковий розмір та швидкість для реалізму
    const randomScale = 0.8 + Math.random() * 0.7;
    item.style.fontSize = (28 * randomScale) + 'px';
    item.style.animationDuration = (3 + Math.random() * 2) + 's';

    effectContainer.appendChild(item);
    setTimeout(() => item.remove(), 5000);
}

// НОВА ФУНКЦІЯ: Спавн ефектів від ОБОХ персонажів
function spawnFromBothCharacters(type) {
    const kRect = knight.getBoundingClientRect();
    const pRect = princess.getBoundingClientRect();

    // Знаходимо центр кожного персонажа (приблизно груди/голова)
    const kX = kRect.left + kRect.width / 2;
    const kY = kRect.top + kRect.height / 3;
    
    const pX = pRect.left + pRect.width / 2;
    const pY = pRect.top + pRect.height / 3;

    spawnEffect(type, kX, kY);
    spawnEffect(type, pX, pY);
}


function startEffects(type) {
    // Очищаємо попередній таймер, якщо він був
    clearInterval(effectsInterval);
    // Запускаємо новий
    effectsInterval = setInterval(() => {
        spawnFromBothCharacters(type);
    }, 400); // Частота появи
}

function stopEffects() {
    clearInterval(effectsInterval);
}

// --- ЛОГІКА КНОПОК (Залишилася схожою) ---

function escapeNoButton() {
    noBtn.style.position = 'fixed';
    const padding = 120;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    noBtn.style.left = `${Math.random() * maxX + padding/2}px`;
    noBtn.style.top = `${Math.random() * maxY + padding/2}px`;
}

function resetUI(cardTitle, buttonColor) {
    noBtn.style.position = 'static';
    noBtn.style.background = buttonColor;
    mainTitle.innerText = cardTitle;
    noClickCount = 0;
    stopEffects(); // Зупиняємо ефекти при зміні стану
}

noBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        noClickCount++;
        if (noClickCount < 4) {
            escapeNoButton();
        } else {
            currentState = "END_STORY";
            mainTitle.innerText = "Do you really want to end our story?";
            noBtn.style.position = 'static';
            noBtn.style.background = "linear-gradient(135deg, #343a40, #495057)";
        }
    } else if (currentState === "COMMUNICATION" || currentState === "END_STORY") {
        currentState = "VALENTINE";
        resetUI("Will you be my Valentine?", "linear-gradient(135deg, #6c757d, #aab2bd)");
    }
});

yesBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        currentState = "COMMUNICATION";
        mainTitle.innerText = "Do you want to continue our communication?";
        resetUI(mainTitle.innerText, "linear-gradient(135deg, #6c757d, #aab2bd)");
    } 
    else if (currentState === "COMMUNICATION") {
        // ПЕРЕМОГА
        mainTitle.innerHTML = "Happy Valentine's Day,<br>Alya! ❤️";
        mainIcon.innerText = "🌹✨";
        document.getElementById('btnGroup').style.display = 'none';
        knight.classList.add('approach-knight');
        princess.classList.add('approach-princess');
        startEffects('❤️'); // Сердечка від обох
    }
    else if (currentState === "END_STORY") {
        // КІНЕЦЬ
        mainTitle.innerText = "Our story has ended... 💔";
        mainIcon.innerText = "🌑";
        document.getElementById('btnGroup').style.display = 'none';
        pageBody.classList.add('sad-mode');
        princess.classList.add('princess-leave');
        startEffects('🎵'); // Ноти від обох (але принцеса тікає, тому ноти будуть за нею тягнутися)
    }
});


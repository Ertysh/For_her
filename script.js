const mainTitle = document.getElementById('mainTitle');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const knight = document.getElementById('knight');
const princess = document.getElementById('princess');
const pageBody = document.getElementById('pageBody');
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');

let noClickCount = 0;
let currentState = "VALENTINE";
let musicStarted = false;

// Керування звуком
muteBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        muteBtn.innerText = "🔊";
    } else {
        bgMusic.pause();
        muteBtn.innerText = "🔇";
    }
});

// Автозапуск при першому кліку на сторінці (вимога браузерів)
document.body.addEventListener('click', () => {
    if(!musicStarted) {
        bgMusic.play();
        musicStarted = true;
    }
}, { once: true });

function spawnParticles(type) {
    const kRect = knight.getBoundingClientRect();
    const pRect = princess.getBoundingClientRect();

    [kRect, pRect].forEach(rect => {
        for(let i = 0; i < 2; i++) { // Створюємо по 2 частинки за раз
            const item = document.createElement('div');
            item.innerText = type;
            item.className = 'floating-item';
            
            // Рандомні параметри для анімації в CSS
            item.style.setProperty('--random-x', (Math.random() * 200 - 100) + 'px');
            item.style.setProperty('--random-deg', (Math.random() * 360) + 'deg');
            
            item.style.left = (rect.left + rect.width / 2) + 'px';
            item.style.top = (rect.top + rect.height / 3) + 'px';
            
            document.getElementById('effectContainer').appendChild(item);
            setTimeout(() => item.remove(), 4000);
        }
    });
}

let effectInterval;

function toggleEffects(type, start) {
    if (start) {
        effectInterval = setInterval(() => spawnParticles(type), 500);
    } else {
        clearInterval(effectInterval);
    }
}

// Логіка кнопок
yesBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        currentState = "COMMUNICATION";
        mainTitle.innerText = "Do you want to continue our communication?";
    } else if (currentState === "COMMUNICATION") {
        mainTitle.innerHTML = "Happy Valentine's Day,<br>Alya! ❤️";
        document.getElementById('btnGroup').style.display = 'none';
        knight.classList.add('approach-knight');
        princess.classList.add('approach-princess');
        toggleEffects('❤️', true);
    } else if (currentState === "END_STORY") {
        mainTitle.innerText = "Our story has ended... 💔";
        document.getElementById('btnGroup').style.display = 'none';
        pageBody.style.filter = "grayscale(100%) brightness(0.5)";
        princess.classList.add('princess-leave');
        toggleEffects('🎵', true);
    }
});

noBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        noClickCount++;
        if (noClickCount < 4) {
            noBtn.style.position = 'fixed';
            noBtn.style.left = Math.random() * 80 + '%';
            noBtn.style.top = Math.random() * 80 + '%';
        } else {
            currentState = "END_STORY";
            mainTitle.innerText = "Do you really want to end our story?";
            noBtn.style.position = 'static';
            noBtn.style.background = "#212529";
        }
    } else {
        currentState = "VALENTINE";
        mainTitle.innerText = "Will you be my Valentine?";
        noBtn.style.position = 'static';
        noBtn.style.background = "linear-gradient(135deg, #495057, #6c757d)";
    }
});



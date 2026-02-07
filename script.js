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

// Запуск музики при першому кліку/тапі (для обходу блокування браузером)
function startMusic() {
    bgMusic.play().catch(() => {
        console.log("Waiting for user interaction to play music");
    });
}

document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });

muteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Щоб не спрацював клік по body
    if (bgMusic.paused) {
        bgMusic.play();
        muteBtn.innerText = "🔊";
    } else {
        bgMusic.pause();
        muteBtn.innerText = "🔇";
    }
});

function spawnParticles(type) {
    const kRect = knight.getBoundingClientRect();
    const pRect = princess.getBoundingClientRect();

    [kRect, pRect].forEach(rect => {
        const item = document.createElement('div');
        item.innerText = type;
        item.className = 'floating-item';
        item.style.left = (rect.left + rect.width / 2) + 'px';
        item.style.top = (rect.top + rect.height / 3) + 'px';
        document.getElementById('effectContainer').appendChild(item);
        setTimeout(() => item.remove(), 4000);
    });
}

let effectInterval;

// Логіка кнопок
yesBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        currentState = "COMMUNICATION";
        mainTitle.innerText = "Do you want to continue our communication?";
    } else if (currentState === "COMMUNICATION") {
        mainTitle.innerHTML = "Happy Valentine's Day, Alya! ❤️";
        document.getElementById('btnGroup').style.display = 'none';
        knight.classList.add('approach-knight');
        princess.classList.add('approach-princess');
        effectInterval = setInterval(() => spawnParticles('❤️'), 600);
    } else if (currentState === "END_STORY") {
        mainTitle.innerText = "Our story has ended... 💔";
        document.getElementById('btnGroup').style.display = 'none';
        pageBody.style.filter = "grayscale(100%) brightness(0.4)";
        princess.style.display = "none"; // Принцеса уходить
        effectInterval = setInterval(() => spawnParticles('🎵'), 600);
    }
});

noBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        noClickCount++;
        if (noClickCount < 4) {
            noBtn.style.position = 'fixed';
            noBtn.style.left = (Math.random() * 70 + 5) + '%';
            noBtn.style.top = (Math.random() * 70 + 5) + '%';
        } else {
            currentState = "END_STORY";
            mainTitle.innerText = "Do you really want to end our story?";
            noBtn.style.position = 'static';
        }
    } else {
        currentState = "VALENTINE";
        mainTitle.innerText = "Will you be my Valentine?";
        noBtn.style.position = 'static';
    }
});



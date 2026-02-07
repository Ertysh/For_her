const mainTitle = document.getElementById('mainTitle');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const knight = document.getElementById('knight');
const princess = document.getElementById('princess');
const pageBody = document.getElementById('pageBody');
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
const effectContainer = document.getElementById('effectContainer');

let noClickCount = 0;
let currentState = "VALENTINE";
let effectInterval = null;

function createParticle(type, x, y) {
    const p = document.createElement('div');
    p.innerText = type;
    p.className = 'floating-item';
    p.style.setProperty('--rx', (Math.random() * 200 - 100) + 'px');
    p.style.setProperty('--rd', (Math.random() * 360) + 'deg');
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    effectContainer.appendChild(p);
    setTimeout(() => p.remove(), 3500);
}

function startGlobalEffects(type) {
    if (effectInterval) clearInterval(effectInterval);
    effectInterval = setInterval(() => {
        const kRect = knight.getBoundingClientRect();
        createParticle(type, kRect.left + kRect.width/2, kRect.top + 50);
        if (princess.style.display !== "none" && !princess.classList.contains('princess-leave')) {
            const pRect = princess.getBoundingClientRect();
            createParticle(type, pRect.left + pRect.width/2, pRect.top + 50);
        }
    }, 500);
}

document.addEventListener('click', () => { bgMusic.play().catch(() => {}); }, { once: true });

muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgMusic.paused) { bgMusic.play(); muteBtn.innerText = "🔊"; }
    else { bgMusic.pause(); muteBtn.innerText = "🔇"; }
});

yesBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        currentState = "COMMUNICATION";
        mainTitle.innerText = "Do you want to continue our communication?";
        noBtn.style.position = 'static';
        noClickCount = 0;
    } 
    else if (currentState === "COMMUNICATION") {
        mainTitle.innerHTML = "Happy Valentine's Day,<br>Alya! ❤️";
        document.getElementById('btnGroup').style.display = 'none';
        knight.classList.add('approach-knight');
        princess.classList.add('approach-princess');
        startGlobalEffects('❤️');
    }
    else if (currentState === "END_STORY") {
        mainTitle.innerText = "Our story has ended... 💔";
        document.getElementById('btnGroup').style.display = 'none';
        pageBody.style.filter = "grayscale(100%) brightness(0.4)";
        princess.classList.add('princess-leave');
        setTimeout(() => { princess.style.display = "none"; }, 2000);
        startGlobalEffects('🎵');
    }
});

noBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        noClickCount++;
        if (noClickCount < 4) {
            noBtn.style.position = 'fixed';
            // Змінено діапазон: тепер кнопка втікає значно далі
            noBtn.style.left = (Math.random() * 85 + 5) + '%'; 
            noBtn.style.top = (Math.random() * 85 + 5) + '%';
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
        if (effectInterval) clearInterval(effectInterval);
    }
});




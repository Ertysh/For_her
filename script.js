const mainTitle = document.getElementById('mainTitle');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const knight = document.getElementById('knight');
const princess = document.getElementById('princess');
const pageBody = document.getElementById('pageBody');
const effectContainer = document.getElementById('effectContainer');

let noClicks = 0;
let currentState = "VALENTINE";

function spawnEffect(type, x, y) {
    const item = document.createElement('div');
    item.innerText = type;
    item.className = type === '❤️' ? 'floating-item' : 'floating-item note-circle';
    item.style.left = x + 'px';
    item.style.top = y + 'px';
    effectContainer.appendChild(item);
    setTimeout(() => item.remove(), 2500);
}

function startHearts() {
    setInterval(() => {
        const rect = knight.getBoundingClientRect();
        spawnEffect('❤️', rect.left + 75, rect.top);
    }, 400);
}

function startNotes() {
    setInterval(() => {
        const rect = knight.getBoundingClientRect();
        spawnEffect('🎵', rect.left + 75, rect.top + 50);
    }, 500);
}

noBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        noClicks++;
        if (noClicks < 4) {
            noBtn.style.position = 'fixed';
            noBtn.style.left = Math.random() * 80 + '%';
            noBtn.style.top = Math.random() * 80 + '%';
        } else {
            currentState = "END_STORY";
            mainTitle.innerText = "Do you really want to end our story?";
            noBtn.style.position = 'static';
        }
    } else if (currentState === "COMMUNICATION" || currentState === "END_STORY") {
        currentState = "VALENTINE";
        mainTitle.innerText = "Will you be my Valentine?";
    }
});

yesBtn.addEventListener('click', () => {
    if (currentState === "VALENTINE") {
        currentState = "COMMUNICATION";
        mainTitle.innerText = "Do you want to continue our communication?";
    } 
    else if (currentState === "COMMUNICATION") {
        // Перемога
        mainTitle.innerText = "Happy Valentine's Day, Alya! ❤️";
        document.getElementById('btnGroup').style.display = 'none';
        knight.classList.add('approach-knight');
        princess.classList.add('approach-princess');
        startHearts();
    }
    else if (currentState === "END_STORY") {
        // Кінець історії
        mainTitle.innerText = "Our story has ended... 💔";
        document.getElementById('btnGroup').style.display = 'none';
        pageBody.classList.add('sad-mode');
        princess.classList.add('princess-leave');
        startNotes();
    }
});

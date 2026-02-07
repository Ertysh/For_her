const question = document.getElementById('question');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

let noAttempts = 0;
let currentStage = "VALENTINE"; // Етапи: VALENTINE -> END_STORY -> RESTORE -> FINAL

// Функція переміщення кнопки
function runAway() {
    // Обчислюємо випадкові координати в межах вікна
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    
    noAttempts++;

    // Якщо вона намагалася натиснути "No" 5 разів
    if (noAttempts >= 5 && currentStage === "VALENTINE") {
        currentStage = "END_STORY";
        question.innerText = "Do you want to end our story?";
        resetNoButton(); // Повертаємо кнопку в центр для чесного вибору
    }
}

// Повернення кнопки на місце, щоб вона могла натиснути "Yes" або "No"
function resetNoButton() {
    noBtn.style.position = "static";
    noBtn.style.left = "auto";
    noBtn.style.top = "auto";
}

// Обробка подій для кнопки "No"
noBtn.addEventListener('mouseover', () => {
    if (currentStage === "VALENTINE") runAway();
});

noBtn.addEventListener('click', () => {
    if (currentStage === "VALENTINE") {
        runAway();
    } else {
        // Якщо вона натиснула "No" на етапах після валентинки
        alert("Wrong choice! Try again 😉");
    }
});

// Обробка кнопки "Yes"
yesBtn.addEventListener('click', () => {
    if (currentStage === "VALENTINE") {
        showFinal();
    } 
    else if (currentStage === "END_STORY") {
        currentStage = "RESTORE";
        question.innerText = "Do you want to restore communication?";
    } 
    else if (currentStage === "RESTORE") {
        showFinal();
    }
});

function showFinal() {
    document.getElementById('card').innerHTML = `
        <h1 style="font-size: 2.5rem;">Happy Valentine's Day, Alya! ❤️</h1>
        <p style="font-size: 1.2rem; color: #666;">You've made the right choice!</p>
        <div style="font-size: 4rem; margin-top: 20px;">✨💖🌸</div>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    const startBtn = document.querySelector('.start-btn');
    
    startBtn.addEventListener('click', () => {
        // Inicia a música
        audio.play().then(() => {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.classList.add('playing');
        });
        
        // Anima a transição
        introScreen.classList.add('fade-out');
        mainContent.style.display = 'block';
        mainContent.classList.add('fade-in');
        
        // Remove a tela inicial após a animação
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1000);
    });
});

const messages = [
    "Mantenha seu pensamento positivo, pois ele se transformará em suas palavras.",
    "A paz interior é o maior tesouro que podemos conquistar.",
    "Cada momento é uma nova oportunidade de recomeçar.",
    "O silêncio é uma prece poderosa.",
    "Seja a mudança que você deseja ver no mundo.",
    "A verdadeira sabedoria está em reconhecer a própria ignorância.",
    "O amor é a força mais poderosa do universo.",
    "Cultive a paciência, pois ela é a chave de muitas portas.",
    "Na simplicidade encontramos a verdadeira felicidade.",
    "Perdoar é libertar a alma de um peso desnecessário."
];

function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

function updateMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = getRandomMessage();
}

// Atualiza a mensagem quando o botão é clicado
document.getElementById('newMessage').addEventListener('click', updateMessage);

// Atualiza a primeira mensagem quando o conteúdo principal for exibido
document.addEventListener('DOMContentLoaded', () => {
    updateMessage();
});

// Adicione no final do arquivo
function createParticles() {
    const container = document.querySelector('body');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        container.appendChild(particle);
        
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
        `;
    }
}

createParticles();

// Controles de áudio
const audio = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Define volume inicial
audio.volume = 0.3;

// Play/Pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playBtn.classList.add('playing');
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.classList.remove('playing');
    }
});

// Stop
stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.classList.remove('playing');
});

// Mute
muteBtn.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        audio.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    muteBtn.classList.toggle('active');
});

// Volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
    if (audio.volume === 0) {
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
});

// Atualiza ícone de volume quando o áudio termina
audio.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.classList.remove('playing');
});

// Registro do Service Worker (adicione no final do arquivo)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registrado com sucesso:', registration.scope);
            })
            .catch(error => {
                console.log('Falha ao registrar o ServiceWorker:', error);
            });
    });
} 
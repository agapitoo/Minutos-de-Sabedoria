document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    const startBtn = document.querySelector('.start-btn');
    const messageElement = document.getElementById('message');
    
    // Inicializações
    updateMessage();
    createParticles();
    
    // Event Listeners
    startBtn.addEventListener('click', handleStart);
    document.getElementById('newMessage').addEventListener('click', () => updateMessage());
    
    async function handleStart() {
        startBtn.disabled = true;
        
        introScreen.classList.add('fade-out');
        
        setTimeout(async () => {
            introScreen.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.style.opacity = '0';
            
            try {
                await audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playBtn.classList.add('playing');
                mainContent.classList.add('fade-in');
            } catch (error) {
                console.log('Erro ao reproduzir áudio:', error);
            } finally {
                startBtn.disabled = false;
            }
        }, 800);
    }
    
    function updateMessage() {
        messageElement.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
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

// Controles de áudio
const audio = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
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

// Volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

// Atualiza ícone quando o áudio termina
audio.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.classList.remove('playing');
});

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Previne o comportamento padrão
    e.preventDefault();
    // Guarda o evento para usar depois
    deferredPrompt = e;
    // Mostra o botão de instalação
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    // Mostra o prompt de instalação
    deferredPrompt.prompt();
    
    // Espera pela escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Limpa o evento salvo
    deferredPrompt = null;
    
    // Esconde o botão de instalação
    installBtn.style.display = 'none';
});

// Esconde o botão se o app já estiver instalado
window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
    console.log('PWA was installed');
}); 
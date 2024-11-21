if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('./sw.js', {
                scope: '/Minutos-de-Sabedoria/'
            });
            console.log('ServiceWorker registrado com sucesso:', registration.scope);
        } catch (error) {
            console.error('Erro SW:', error);
        }
    });
}

// Adicione logs para debug
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt disparado');
    window.deferredPrompt = e;
}); 
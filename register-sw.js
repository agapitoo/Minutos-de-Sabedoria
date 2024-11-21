if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('./sw.js');
            console.log('ServiceWorker registrado com sucesso:', registration.scope);
            
            // Apenas registra o evento, sem preventDefault()
            window.addEventListener('beforeinstallprompt', (e) => {
                // Armazena o evento caso precise usar depois
                window.deferredPrompt = e;
            });
            
        } catch (error) {
            console.error('Falha ao registrar ServiceWorker:', error);
        }
    });
} 
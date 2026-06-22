const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// Применяем тёмную тему
tg.setHeaderColor('#0f0f23');
tg.setBackgroundColor('#0f0f23');

// Haptic feedback при кликах
document.querySelectorAll('button, .glass-card').forEach(el => {
    el.addEventListener('click', () => {
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    });
});
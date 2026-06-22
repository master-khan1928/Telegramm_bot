// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// Применяем цвета темы Telegram
tg.setHeaderColor(tg.themeParams.bg_color);
tg.setBackgroundColor(tg.themeParams.bg_color);

// Настройка MainButton (опционально)
tg.MainButton.setText("Готово");
tg.MainButton.onClick(() => {
    tg.close();
});
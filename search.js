class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.clearBtn = document.getElementById('clearBtn');
        this.init();
    }
    
    init() {
        // Очистка поиска
        this.clearBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.clearBtn.classList.remove('visible');
            this.searchInput.focus();
        });
        
        // Показ/скрытие кнопки очистки
        this.searchInput.addEventListener('input', (e) => {
            this.clearBtn.classList.toggle('visible', e.target.value.length > 0);
            
            // Debounce поиск
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                if (e.target.value.length > 0) {
                    this.performSearch(e.target.value);
                }
            }, 400);
        });
        
        // Enter
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(this.searchInput.value);
            }
        });
    }
    
    async performSearch(query) {
        if (!query.trim()) return;
        
        // Переходим в каталог
        router.navigateTo('catalog');
        
        // Haptic
        if (window.Telegram?.WebApp?.HapticFeedback) {
            Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        }
        
        // Здесь твой API запрос
        console.log('Поиск:', query);
    }
}

const searchEngine = new SearchEngine();
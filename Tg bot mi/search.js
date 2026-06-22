class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.init();
    }
    
    init() {
        // Поиск по кнопке
        this.searchBtn.addEventListener('click', () => this.performSearch());
        
        // Поиск по Enter
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        // Живой поиск (debounce)
        let timeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (e.target.value.length > 2) {
                    this.performSearch(e.target.value);
                }
            }, 500);
        });
    }
    
    async performSearch(query = this.searchInput.value) {
        if (!query.trim()) return;
        
        // Показываем загрузку
        this.searchBtn.textContent = '⏳';
        
        try {
            // Здесь твой API или логика поиска
            const results = await this.fetchResults(query);
            this.displayResults(results);
            
            // Автоматически переходим в каталог при поиске
            router.navigateTo('catalog');
            
        } catch (error) {
            console.error('Ошибка поиска:', error);
        } finally {
            this.searchBtn.textContent = 'Найти';
        }
    }
    
    async fetchResults(query) {
        // Пример запроса к API
        // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        // return await response.json();
        
        // Заглушка для демо
        return [
            { id: 1, title: `Результат по "${query}"`, description: 'Описание...' },
            { id: 2, title: 'Ещё один результат', description: '...' }
        ];
    }
    
    displayResults(results) {
        const container = document.getElementById('catalogItems');
        container.innerHTML = results.map(item => `
            <div class="item-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `).join('');
    }
}

const searchEngine = new SearchEngine();
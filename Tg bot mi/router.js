class Router {
    constructor() {
        this.currentTab = 'home';
        this.init();
    }
    
    init() {
        // Обработчики кликов по боковой панели
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.navigateTo(tab);
            });
        });
    }
    
    navigateTo(tabName) {
        // Убираем active со всех вкладок и кнопок
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        
        // Активируем нужную
        document.getElementById(`tab-${tabName}`)?.classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
        
        this.currentTab = tabName;
        
        // Можно добавить анимацию или загрузку данных
        if (tabName === 'catalog') {
            loadCatalog();
        }
    }
}

const router = new Router();
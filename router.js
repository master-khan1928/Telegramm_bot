class Router {
    constructor() {
        this.currentTab = 'home';
        this.init();
    }
    
    init() {
        // Desktop sidebar
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.navigateTo(tab);
            });
        });
        
        // Mobile nav
        document.querySelectorAll('.mob-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.navigateTo(tab);
            });
        });
    }
    
    navigateTo(tabName) {
        // Убираем active
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.mob-item').forEach(b => b.classList.remove('active'));
        
        // Активируем нужное
        document.getElementById(`tab-${tabName}`)?.classList.add('active');
        document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(el => el.classList.add('active'));
        
        this.currentTab = tabName;
        
        // Haptic
        if (window.Telegram?.WebApp?.HapticFeedback) {
            Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        }
    }
}

const router = new Router();
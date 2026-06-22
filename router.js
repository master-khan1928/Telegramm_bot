class Router {
    constructor() {
        this.currentTab = 'home';
        this.init();
    }
    
    init() {
        // Desktop sidebar
        document.querySelectorAll('.sidebar-glass .nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.navigateTo(tab);
            });
        });
        
        // Mobile nav
        document.querySelectorAll('.mobile-nav .mob-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                if (tab === 'cart') return; // Cart handled separately
                this.navigateTo(tab);
            });
        });
    }
    
    navigateTo(tabName) {
        if (tabName === 'profile') {
            showProfile();
        }
        
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.sidebar-glass .nav-item').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.mobile-nav .mob-item').forEach(b => b.classList.remove('active'));
        
        document.getElementById(`tab-${tabName}`)?.classList.add('active');
        document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(el => el.classList.add('active'));
        
        this.currentTab = tabName;
        
        if (window.Telegram?.WebApp?.HapticFeedback) {
            Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        }
    }
}

const router = new Router();
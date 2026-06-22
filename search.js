class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.clearBtn = document.getElementById('clearBtn');
        this.init();
    }
    
    init() {
        this.clearBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.clearBtn.classList.remove('visible');
            renderCatalog(products);
            this.searchInput.focus();
        });
        
        this.searchInput.addEventListener('input', (e) => {
            this.clearBtn.classList.toggle('visible', e.target.value.length > 0);
            
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                const query = e.target.value.toLowerCase();
                if (query.length > 0) {
                    const filtered = products.filter(p => 
                        p.title.toLowerCase().includes(query) || 
                        p.desc.toLowerCase().includes(query) ||
                        p.category.toLowerCase().includes(query)
                    );
                    renderCatalog(filtered);
                    router.navigateTo('catalog');
                } else {
                    renderCatalog(products);
                }
            }, 300);
        });
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = this.searchInput.value.toLowerCase();
                const filtered = products.filter(p => 
                    p.title.toLowerCase().includes(query) || 
                    p.desc.toLowerCase().includes(query)
                );
                renderCatalog(filtered);
                router.navigateTo('catalog');
            }
        });
    }
}

const searchEngine = new SearchEngine();
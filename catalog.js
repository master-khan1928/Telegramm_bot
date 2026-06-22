const products = [
    {
        id: 1,
        icon: '📱',
        title: 'SMM Мастер 2026',
        desc: 'Полный курс по продвижению в соцсетях',
        price: 49,
        category: 'smm',
        badge: 'Топ'
    },
    {
        id: 2,
        icon: '🔍',
        title: 'SEO Продвинутый',
        desc: 'Техническая оптимизация и ссылки',
        price: 59,
        category: 'seo',
        badge: 'Новинка'
    },
    {
        id: 3,
        icon: '✍️',
        title: 'Копирайтинг Pro',
        desc: 'Продающие тексты и storytelling',
        price: 39,
        category: 'content',
        badge: 'Хит'
    },
    {
        id: 4,
        icon: '🎯',
        title: 'Target Ads Expert',
        desc: 'Настройка рекламы ВК, FB, TikTok',
        price: 69,
        category: 'ads',
        badge: null
    },
    {
        id: 5,
        icon: '📊',
        title: 'Google Analytics 4',
        desc: 'Веб-аналитика и отчёты',
        price: 45,
        category: 'analytics',
        badge: 'Топ'
    },
    {
        id: 6,
        icon: '📧',
        title: 'Email Marketing',
        desc: 'Автоворонки и рассылки',
        price: 35,
        category: 'email',
        badge: null
    },
    {
        id: 7,
        icon: '🎨',
        title: 'Canva Дизайнер',
        desc: 'Графика для маркетолога',
        price: 29,
        category: 'content',
        badge: 'Новинка'
    },
    {
        id: 8,
        icon: '🤖',
        title: 'AI в Маркетинге',
        desc: 'ChatGPT, Midjourney для бизнеса',
        price: 79,
        category: 'ads',
        badge: '🔥'
    },
    {
        id: 9,
        icon: '💼',
        title: 'Стратегия бренда',
        desc: 'Позиционирование и айдентика',
        price: 89,
        category: 'smm',
        badge: 'Премиум'
    }
];

function renderCatalog(items = products) {
    const container = document.getElementById('catalogItems');
    container.innerHTML = items.map(p => `
        <div class="glass-card item" data-id="${p.id}">
            <div class="item-image">${p.icon}</div>
            <div class="item-info">
                <h3>${p.title} ${p.badge ? `<span class="item-badge">${p.badge}</span>` : ''}</h3>
                <p>${p.desc}</p>
            </div>
            <div class="item-price">$${p.price}</div>
            <div class="item-actions">
                <button class="item-btn btn-cart" onclick="addToCart(${p.id})">
                    🛒 В корзину
                </button>
                <button class="item-btn btn-fav" onclick="toggleFav(${p.id})" id="fav-${p.id}">
                    ❤️
                </button>
            </div>
        </div>
    `).join('');
}

function renderDeals() {
    const deals = products.filter(p => p.badge === '🔥' || p.price < 40);
    const container = document.getElementById('dealsItems');
    container.innerHTML = deals.map(p => `
        <div class="glass-card item">
            <div class="item-image">${p.icon}</div>
            <div class="item-info">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>
            <div class="item-price" style="color:#22c55e">$${p.price}</div>
            <div class="item-actions">
                <button class="item-btn btn-cart" onclick="addToCart(${p.id})">🛒 В корзину</button>
                <button class="item-btn btn-fav" onclick="toggleFav(${p.id})" id="fav-deal-${p.id}">❤️</button>
            </div>
        </div>
    `).join('');
}

// Категории на главной
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const cat = card.dataset.cat;
        const filtered = products.filter(p => p.category === cat);
        renderCatalog(filtered);
        router.navigateTo('catalog');
        showToast(`Категория: ${card.querySelector('span').textContent}`);
    });
});

// Быстрые кнопки
document.querySelectorAll('.clickable').forEach(card => {
    card.addEventListener('click', () => {
        const action = card.dataset.action;
        let filtered = products;
        if (action === 'new') filtered = products.filter(p => p.badge === 'Новинка');
        if (action === 'top') filtered = products.filter(p => p.badge === 'Топ');
        if (action === 'hit') filtered = products.filter(p => p.badge === 'Хит');
        renderCatalog(filtered);
        router.navigateTo('catalog');
        showToast(action === 'new' ? 'Новинки' : action === 'top' ? 'Топ курсы' : 'Хиты продаж');
    });
});

// Инициализация
renderCatalog();
renderDeals();
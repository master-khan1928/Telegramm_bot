let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = total;
    badge.classList.toggle('hidden', total === 0);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    showToast(`${product.title} добавлен в корзину`);
    
    if (window.Telegram?.WebApp?.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        renderCart();
    }
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
        totalEl.textContent = '$0';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    totalEl.textContent = `$${total}`;
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-img">${item.icon}</div>
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>$${item.price}</p>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑</button>
        </div>
    `).join('');
}

function toggleFav(productId) {
    const idx = favorites.indexOf(productId);
    if (idx > -1) {
        favorites.splice(idx, 1);
        showToast('Удалено из избранного');
    } else {
        favorites.push(productId);
        showToast('Добавлено в избранное');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavButtons();
    renderFavorites();
}

function updateFavButtons() {
    document.querySelectorAll('.btn-fav').forEach(btn => {
        const id = parseInt(btn.closest('.item')?.dataset.id);
        if (favorites.includes(id)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function renderFavorites() {
    const container = document.getElementById('favoritesItems');
    const favProducts = products.filter(p => favorites.includes(p.id));
    
    if (favProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">❤️</div>
                <h3>Пока пусто</h3>
                <p>Добавляй курсы в избранное</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = favProducts.map(p => `
        <div class="glass-card item">
            <div class="item-image">${p.icon}</div>
            <div class="item-info">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>
            <div class="item-price">$${p.price}</div>
            <div class="item-actions">
                <button class="item-btn btn-cart" onclick="addToCart(${p.id})">🛒 В корзину</button>
                <button class="item-btn btn-fav active" onclick="toggleFav(${p.id})">❤️</button>
            </div>
        </div>
    `).join('');
}

// Menu
document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('menuOverlay').classList.add('active');
    document.getElementById('menuBtn').classList.add('active');
});

document.getElementById('menuClose').addEventListener('click', closeMenu);
document.getElementById('menuOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeMenu();
});

function closeMenu() {
    document.getElementById('menuOverlay').classList.remove('active');
    document.getElementById('menuBtn').classList.remove('active');
}

// Cart overlay
document.getElementById('cartBtn').addEventListener('click', () => {
    renderCart();
    document.getElementById('cartOverlay').classList.add('active');
});

document.getElementById('cartClose').addEventListener('click', () => {
    document.getElementById('cartOverlay').classList.remove('active');
});

document.getElementById('cartOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        document.getElementById('cartOverlay').classList.remove('active');
    }
});

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Корзина пуста');
        return;
    }
    
    // Создаём заказ
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
        id: 'ORD-' + Date.now(),
        date: new Date().toLocaleDateString('ru'),
        items: cart.map(i => i.title).join(', '),
        total: cart.reduce((s, i) => s + i.price * i.qty, 0),
        status: 'completed'
    };
    orders.unshift(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    cart = [];
    saveCart();
    renderCart();
    renderOrders();
    document.getElementById('cartOverlay').classList.remove('active');
    showToast('Заказ оформлен! 🎉');
    router.navigateTo('orders');
});

function renderOrders() {
    const container = document.getElementById('ordersList');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>Пока нет заказов</h3>
                <p>Сделай первый шаг к росту!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = orders.map(o => `
        <div class="glass-card order-card">
            <div class="order-header">
                <span class="order-id">${o.id}</span>
                <span class="order-status status-completed">✓ Выполнен</span>
            </div>
            <div class="order-items">${o.items}</div>
            <div class="order-total">$${o.total}</div>
        </div>
    `).join('');
}

// Toast
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Mobile cart tab
document.querySelectorAll('.mob-item').forEach(btn => {
    if (btn.dataset.tab === 'cart') {
        btn.addEventListener('click', () => {
            renderCart();
            document.getElementById('cartOverlay').classList.add('active');
        });
    }
});

// Init
updateCartBadge();
renderOrders();
renderFavorites();
updateFavButtons();
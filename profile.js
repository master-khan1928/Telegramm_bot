let currentUser = JSON.parse(localStorage.getItem('user') || 'null');

function updateProfileStats() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    document.getElementById('statCourses').textContent = '0';
    document.getElementById('statOrders').textContent = orders.length;
    document.getElementById('statFav').textContent = favs.length;
}

function showProfile() {
    if (currentUser) {
        document.getElementById('profileLogin').classList.add('hidden');
        document.getElementById('profileView').classList.remove('hidden');
        
        document.getElementById('profileName').textContent = currentUser.name || currentUser.username;
        document.getElementById('profileUsername').textContent = '@' + currentUser.username;
        
        if (currentUser.avatar) {
            document.getElementById('profileAvatar').innerHTML = `<img src="${currentUser.avatar}" alt="avatar">`;
        } else {
            document.getElementById('profileAvatar').textContent = '👤';
        }
        
        document.getElementById('editNickname').value = currentUser.username || '';
        document.getElementById('editName').value = currentUser.name || '';
        document.getElementById('editBio').value = currentUser.bio || '';
        
        updateProfileStats();
    } else {
        document.getElementById('profileLogin').classList.remove('hidden');
        document.getElementById('profileView').classList.add('hidden');
    }
}

// Login
document.getElementById('loginBtn').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showToast('Заполните все поля');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        showToast('Добро пожаловать, ' + user.name + '!');
        showProfile();
    } else {
        showToast('Неверный логин или пароль');
    }
});

// Register
document.getElementById('registerBtn').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showToast('Заполните все поля');
        return;
    }
    
    if (password.length < 4) {
        showToast('Пароль минимум 4 символа');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
        showToast('Такой ник уже занят');
        return;
    }
    
    const newUser = {
        username,
        password,
        name: username,
        bio: '',
        avatar: null
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    currentUser = newUser;
    
    showToast('Аккаунт создан!');
    showProfile();
});

// Avatar upload
document.getElementById('avatarEdit').addEventListener('click', () => {
    document.getElementById('avatarInput').click();
});

document.getElementById('avatarInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        if (currentUser) {
            currentUser.avatar = event.target.result;
            localStorage.setItem('user', JSON.stringify(currentUser));
            
            // Update in users array too
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const idx = users.findIndex(u => u.username === currentUser.username);
            if (idx > -1) {
                users[idx].avatar = event.target.result;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            document.getElementById('profileAvatar').innerHTML = `<img src="${event.target.result}" alt="avatar">`;
            showToast('Аватар обновлён!');
        }
    };
    reader.readAsDataURL(file);
});

// Save profile
document.getElementById('saveProfileBtn').addEventListener('click', () => {
    if (!currentUser) return;
    
    const newNickname = document.getElementById('editNickname').value.trim();
    const newName = document.getElementById('editName').value.trim();
    const newBio = document.getElementById('editBio').value.trim();
    
    if (newNickname && newNickname !== currentUser.username) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.username === newNickname && u.username !== currentUser.username)) {
            showToast('Этот ник уже занят');
            return;
        }
        
        // Update username in all places
        const oldUsername = currentUser.username;
        currentUser.username = newNickname;
        
        const idx = users.findIndex(u => u.username === oldUsername);
        if (idx > -1) {
            users[idx].username = newNickname;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    
    currentUser.name = newName || currentUser.username;
    currentUser.bio = newBio;
    
    localStorage.setItem('user', JSON.stringify(currentUser));
    
    // Update users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.username === currentUser.username);
    if (idx > -1) {
        users[idx] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    showToast('Профиль сохранён!');
    showProfile();
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('user');
    showToast('Вы вышли из аккаунта');
    showProfile();
});

// Init
showProfile();
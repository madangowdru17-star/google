let currentConfig = null;
let isAuthenticated = false;

function encrypt(text, key = 'HEXPROXY2026') {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result);
}

function decrypt(encoded, key = 'HEXPROXY2026') {
    const text = atob(encoded);
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('errorMessage');

    if (!username || !password) {
        errorEl.textContent = 'Please enter both username and password';
        errorEl.style.display = 'block';
        return;
    }

    const encrypted = encrypt(JSON.stringify({ username, password }));
    sessionStorage.setItem('auth', encrypted);
    authenticate(username, password);
}

function authenticate(username, password) {
    const auth = btoa(`${username}:${password}`);
    
    fetch('/admin-api?action=get', {
        headers: {
            'Authorization': `Basic ${auth}`
        }
    })
    .then(response => {
        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }
        return response.json();
    })
    .then(config => {
        currentConfig = config;
        isAuthenticated = true;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadDashboard(config);
        showToast('Access granted successfully', 'success');
    })
    .catch(error => {
        document.getElementById('errorMessage').textContent = error.message || 'Invalid credentials';
        document.getElementById('errorMessage').style.display = 'block';
        sessionStorage.removeItem('auth');
    });
}

function logout() {
    sessionStorage.removeItem('auth');
    isAuthenticated = false;
    currentConfig = null;
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('errorMessage').style.display = 'none';
    showToast('Signed out successfully', 'info');
}

function loadDashboard(config) {
    // Update status cards
    updateToggle('maintenanceStatus', config.maintenance, document.querySelector('.status-grid .status-card .toggle-switch'));
    updateToggle('ffMaintenanceStatus', config.freefire_maintenance, document.querySelectorAll('.status-grid .status-card .toggle-switch')[1]);
    updateToggle('ffMaxMaintenanceStatus', config.freefire_max_maintenance, document.querySelectorAll('.status-grid .status-card .toggle-switch')[2]);
    updateToggle('updateStatus', config.update_available, document.querySelectorAll('.status-grid .status-card .toggle-switch')[3]);

    // Global settings
    document.getElementById('maintenanceMessage').value = config.maintenance_message || '';
    document.getElementById('telegramLink').value = config.telegram_link || '';
    document.getElementById('getKeyLink').value = config.get_key_link || '';
    document.getElementById('masterKey').value = config.master_key || '';

    // Render buttons
    renderButtons('ffButtons', config.freefire_buttons);
    renderButtons('ffMaxButtons', config.freefire_max_buttons);
    renderButtons('rootLibs', config.root_libs);
}

function renderButtons(containerId, buttons) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    buttons.forEach((btn, index) => {
        const div = document.createElement('div');
        div.className = 'button-item';
        div.innerHTML = `
            <div class="info">
                <div class="name">${escapeHtml(btn.name)}</div>
                <div class="id">${escapeHtml(btn.id)}</div>
            </div>
            <div class="button-controls">
                <input type="text" value="${escapeHtml(btn.url || '')}" placeholder="URL" data-index="${index}" data-container="${containerId}">
                <span class="toggle-label ${btn.enabled ? 'active' : ''}">${btn.enabled ? 'On' : 'Off'}</span>
                <div class="mini-toggle ${btn.enabled ? 'active' : ''}" onclick="toggleButton(this, '${containerId}', ${index}, 'enabled')">
                    <div class="mini-slider"></div>
                </div>
                <span class="toggle-label ${btn.maintenance ? 'active' : ''}">${btn.maintenance ? 'Maint' : 'Active'}</span>
                <div class="mini-toggle ${btn.maintenance ? 'active' : ''}" onclick="toggleButton(this, '${containerId}', ${index}, 'maintenance')">
                    <div class="mini-slider"></div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateToggle(labelId, value, toggleElement) {
    const statusEl = document.getElementById(labelId);
    if (statusEl) {
        statusEl.textContent = value ? 'Active' : 'Off';
        statusEl.className = 'status-value ' + (value ? 'active' : 'inactive');
    }
    if (toggleElement) {
        if (value) {
            toggleElement.classList.add('active');
        } else {
            toggleElement.classList.remove('active');
        }
    }
}

function toggleMaintenance() {
    const toggle = document.querySelector('.status-grid .status-card .toggle-switch');
    const current = currentConfig.maintenance;
    currentConfig.maintenance = !current;
    updateToggle('maintenanceStatus', currentConfig.maintenance, toggle);
    showToast(`Global maintenance ${currentConfig.maintenance ? 'activated' : 'deactivated'}`, 'info');
}

function toggleFFMaintenance() {
    const toggles = document.querySelectorAll('.status-grid .status-card .toggle-switch');
    const current = currentConfig.freefire_maintenance;
    currentConfig.freefire_maintenance = !current;
    updateToggle('ffMaintenanceStatus', currentConfig.freefire_maintenance, toggles[1]);
    showToast(`FreeFire maintenance ${currentConfig.freefire_maintenance ? 'activated' : 'deactivated'}`, 'info');
}

function toggleFFMaxMaintenance() {
    const toggles = document.querySelectorAll('.status-grid .status-card .toggle-switch');
    const current = currentConfig.freefire_max_maintenance;
    currentConfig.freefire_max_maintenance = !current;
    updateToggle('ffMaxMaintenanceStatus', currentConfig.freefire_max_maintenance, toggles[2]);
    showToast(`FreeFire MAX maintenance ${currentConfig.freefire_max_maintenance ? 'activated' : 'deactivated'}`, 'info');
}

function toggleUpdate() {
    const toggles = document.querySelectorAll('.status-grid .status-card .toggle-switch');
    const current = currentConfig.update_available;
    currentConfig.update_available = !current;
    updateToggle('updateStatus', currentConfig.update_available, toggles[3]);
    showToast(`Update ${currentConfig.update_available ? 'enabled' : 'disabled'}`, 'info');
}

function toggleButton(element, containerId, index, property) {
    const isActive = element.classList.contains('active');
    element.classList.toggle('active');
    
    const label = element.parentElement.querySelector('.toggle-label');
    if (label) {
        label.textContent = !isActive ? (property === 'enabled' ? 'On' : 'Maint') : (property === 'enabled' ? 'Off' : 'Active');
        label.classList.toggle('active');
    }
    
    let buttons;
    if (containerId === 'ffButtons') buttons = currentConfig.freefire_buttons;
    else if (containerId === 'ffMaxButtons') buttons = currentConfig.freefire_max_buttons;
    else if (containerId === 'rootLibs') buttons = currentConfig.root_libs;
    
    if (buttons && buttons[index]) {
        buttons[index][property] = !isActive;
        showToast(`${buttons[index].name}: ${property} ${!isActive ? 'enabled' : 'disabled'}`, 'info');
    }
}

function saveAll() {
    const config = JSON.parse(JSON.stringify(currentConfig));
    
    // Update global settings
    config.maintenance_message = document.getElementById('maintenanceMessage').value;
    config.telegram_link = document.getElementById('telegramLink').value;
    config.get_key_link = document.getElementById('getKeyLink').value;
    config.master_key = document.getElementById('masterKey').value;

    // Collect button URLs
    document.querySelectorAll('.button-item').forEach(item => {
        const urlInput = item.querySelector('input[type="text"]');
        if (urlInput) {
            const index = parseInt(urlInput.dataset.index);
            const containerId = urlInput.dataset.container;
            
            let buttons;
            if (containerId === 'ffButtons') buttons = config.freefire_buttons;
            else if (containerId === 'ffMaxButtons') buttons = config.freefire_max_buttons;
            else if (containerId === 'rootLibs') buttons = config.root_libs;
            
            if (buttons && buttons[index]) {
                buttons[index].url = urlInput.value;
            }
        }
    });

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const auth = btoa(`${username}:${password}`);

    const saveBtn = document.querySelector('.save-btn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    fetch('/admin-api?action=update', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('All changes saved successfully', 'success');
            currentConfig = config;
        } else {
            showToast('Error: ' + (data.error || 'Unknown error'), 'error');
        }
    })
    .catch(error => {
        showToast('Error saving: ' + error.message, 'error');
    })
    .finally(() => {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
            </svg>
            Save All Changes
        `;
    });
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.style.display = 'block';
    
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.display = 'none';
    }, 4000);
}

// Check for existing session
document.addEventListener('DOMContentLoaded', () => {
    const authData = sessionStorage.getItem('auth');
    if (authData) {
        try {
            const decrypted = decrypt(authData);
            const { username, password } = JSON.parse(decrypted);
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
            authenticate(username, password);
        } catch (e) {
            sessionStorage.removeItem('auth');
        }
    }
});
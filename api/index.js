const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

function loadConfig() {
    try {
        const data = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return getDefaultConfig();
    }
}

function getDefaultConfig() {
    return {
        maintenance: false,
        freefire_maintenance: false,
        freefire_max_maintenance: false,
        master_key: "HEXPROXY999",
        master_key_expiry: "2026-12-31T23:59:59.000000",
        login_name: "HEX PROXY XOS V6",
        app_name: "HEX PROXY XOS V6",
        maintenance_message: "We are performing scheduled maintenance. Please join our Telegram for updates.",
        telegram_link: "https://t.me/+_s4OBzblpi0zNzE1",
        get_key_link: "https://t.me/+_s4OBzblpi0zNzE1",
        logo_url: "https://i.ibb.co/Wpcb6Ydy/IMG-20260313-030403-360.jpg",
        shizuku_logo_url: "https://i.ibb.co/JRjy2ZpC/20260808-044938.png",
        freefire_logo_url: "https://i.ibb.co/nsqT2bjJ/Garena-Free-Fire-Icon.jpg",
        freefire_max_logo_url: "https://i.ibb.co/Wv5pthbL/unnamed.webp",
        api_base_url: "https://key-system-production-1bc5.up.railway.app",
        update_available: false,
        update_version: "2.1.0",
        update_changelog: "- Fixed AimBot\n- Added new features\n- Performance improvements",
        update_url: "https://github.com/madangowdru17-star/Apk/raw/refs/heads/main/generated_sign.apk",
        assets_version: "9.9",
        assets: [
            {
                name: "bg.mp4",
                url: "https://github.com/madangowdru17-star/Assistant/raw/refs/heads/main/bg.mp4"
            }
        ],
        freefire_buttons: [
            {
                id: "ff_drag",
                name: "Chest HS 95%-Sensi",
                url: "https://raw.githubusercontent.com/madangowdru17-star/Assistant/refs/heads/main/localconfig.json",
                enabled: true,
                maintenance: false
            },
            {
                id: "ff_antenna",
                name: "DRAG HS + ANITENA SPEED 2x",
                url: "https://raw.githubusercontent.com/madangowdru17-star/DARG-HS-1000/refs/heads/main/localconfig.json",
                enabled: false,
                maintenance: true
            },
            {
                id: "ff_headshot",
                name: "HEADSHOT 99%",
                url: "https://raw.githubusercontent.com/madangowdru17-star/Assistant/refs/heads/main/localconfig.json",
                enabled: false,
                maintenance: false
            },
            {
                id: "ff_aimbot",
                name: "AIMBOT PRO",
                url: "https://raw.githubusercontent.com/madangowdru17-star/Assistant/refs/heads/main/localconfig.json",
                enabled: false,
                maintenance: false
            },
            {
                id: "ff_wallhack",
                name: "WALLHACK XRAY",
                url: "https://raw.githubusercontent.com/madangowdru17-star/Assistant/refs/heads/main/localconfig.json",
                enabled: false,
                maintenance: false
            },
            {
                id: "ff_esp",
                name: "ESP PLAYER",
                url: "https://raw.githubusercontent.com/madangowdru17-star/Assistant/refs/heads/main/localconfig.json",
                enabled: false,
                maintenance: false
            }
        ],
        freefire_max_buttons: [
            {
                id: "max_drag_safe",
                name: "DRAG HS 85% SAFE",
                url: "https://raw.githubusercontent.com/madangowdru17-star/HS-ANTENA/refs/heads/main/localconfig.json",
                enabled: true,
                maintenance: false
            },
            {
                id: "max_nick",
                name: "NICK HS 95%",
                url: "",
                enabled: true,
                maintenance: false
            },
            {
                id: "max_body",
                name: "BODY HS 99%",
                url: "",
                enabled: true,
                maintenance: false
            },
            {
                id: "max_aimbot",
                name: "AIMBOT MAX",
                url: "",
                enabled: true,
                maintenance: false
            },
            {
                id: "max_wallhack",
                name: "WALLHACK MAX",
                url: "",
                enabled: true,
                maintenance: false
            },
            {
                id: "max_esp",
                name: "ESP MAX",
                url: "",
                enabled: true,
                maintenance: false
            }
        ],
        root_libs: [
            {
                id: "root_max64",
                name: "FF MAX 64-BIT",
                url: "https://github.com/madangowdru17-star/Assistant/raw/refs/heads/main/libcrashlytics_arm64.so",
                lib_path: "lib/arm64-v8a/libcrashlytics.so",
                arch: "arm64",
                enabled: true,
                maintenance: false
            },
            {
                id: "root_max32",
                name: "FF MAX 32-BIT",
                url: "https://github.com/madangowdru17-star/Assistant/raw/refs/heads/main/libcrashlytics_arm.so",
                lib_path: "lib/armeabi-v7a/libcrashlytics.so",
                arch: "arm",
                enabled: true,
                maintenance: false
            },
            {
                id: "root_aimbot",
                name: "AIMBOT MODULE",
                url: "https://github.com/madangowdru17-star/Assistant/raw/refs/heads/main/libaimbot.so",
                lib_path: "lib/arm64-v8a/libaimbot.so",
                arch: "arm64",
                enabled: true,
                maintenance: false
            },
            {
                id: "root_esp",
                name: "ESP MODULE",
                url: "https://github.com/madangowdru17-star/Assistant/raw/refs/heads/main/libesp.so",
                lib_path: "lib/arm64-v8a/libesp.so",
                arch: "arm64",
                enabled: true,
                maintenance: false
            },
            {
                id: "root_headshot",
                name: "HEADSHOT MODULE",
                url: "https://github.com/madangowdru17-star/Assistant/raw/refs/heads/main/libheadshot.so",
                lib_path: "lib/arm64-v8a/libheadshot.so",
                arch: "arm64",
                enabled: true,
                maintenance: false
            },
            {
                id: "root_wallhack",
                name: "WALLHACK MODULE",
                url: "https://github.com/madangowdru17-star/Assistant/raw/refs/heads/main/libwallhack.so",
                lib_path: "lib/arm64-v8a/libwallhack.so",
                arch: "arm64",
                enabled: true,
                maintenance: false
            }
        ]
    };
}

module.exports = async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    
    if (pathname === '/admin') {
        const adminHtml = fs.readFileSync(path.join(__dirname, 'admin.html'), 'utf8');
        res.setHeader('Content-Type', 'text/html');
        return res.send(adminHtml);
    }

    if (pathname === '/admin-api') {
        const authHeader = req.headers.authorization;
        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'hexproxy2026';
        
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Admin Panel"');
            return res.json({ error: 'Unauthorized' });
        }

        const base64 = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64, 'base64').toString('utf8');
        const [user, pass] = credentials.split(':');

        if (user !== username || pass !== password) {
            res.statusCode = 401;
            return res.json({ error: 'Invalid credentials' });
        }

        const action = req.query.action;
        const config = loadConfig();

        if (action === 'get') {
            return res.json(config);
        }

        if (action === 'update' && req.method === 'POST') {
            try {
                const body = JSON.parse(req.body);
                const newConfig = JSON.parse(JSON.stringify(config));
                
                if (body.maintenance !== undefined) newConfig.maintenance = body.maintenance;
                if (body.freefire_maintenance !== undefined) newConfig.freefire_maintenance = body.freefire_maintenance;
                if (body.freefire_max_maintenance !== undefined) newConfig.freefire_max_maintenance = body.freefire_max_maintenance;
                if (body.maintenance_message) newConfig.maintenance_message = body.maintenance_message;
                if (body.telegram_link) newConfig.telegram_link = body.telegram_link;
                if (body.get_key_link) newConfig.get_key_link = body.get_key_link;
                if (body.master_key) newConfig.master_key = body.master_key;
                if (body.update_available !== undefined) newConfig.update_available = body.update_available;
                
                if (body.freefire_buttons) {
                    body.freefire_buttons.forEach(updatedBtn => {
                        const index = newConfig.freefire_buttons.findIndex(b => b.id === updatedBtn.id);
                        if (index !== -1) {
                            newConfig.freefire_buttons[index] = { ...newConfig.freefire_buttons[index], ...updatedBtn };
                        }
                    });
                }

                if (body.freefire_max_buttons) {
                    body.freefire_max_buttons.forEach(updatedBtn => {
                        const index = newConfig.freefire_max_buttons.findIndex(b => b.id === updatedBtn.id);
                        if (index !== -1) {
                            newConfig.freefire_max_buttons[index] = { ...newConfig.freefire_max_buttons[index], ...updatedBtn };
                        }
                    });
                }

                if (body.root_libs) {
                    body.root_libs.forEach(updatedLib => {
                        const index = newConfig.root_libs.findIndex(l => l.id === updatedLib.id);
                        if (index !== -1) {
                            newConfig.root_libs[index] = { ...newConfig.root_libs[index], ...updatedLib };
                        }
                    });
                }

                fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
                return res.json({ success: true, message: 'Configuration updated successfully' });
            } catch (error) {
                return res.status(400).json({ error: 'Invalid update data', details: error.message });
            }
        }

        return res.status(400).json({ error: 'Invalid action' });
    }

    if (pathname === '/api') {
        const config = loadConfig();
        return res.json(config);
    }

    res.statusCode = 404;
    res.json({ error: 'Not found' });
};
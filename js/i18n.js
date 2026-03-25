(function() {
    const savedLang = localStorage.getItem('language') || 'en';
    
    async function loadTranslations() {
        try {
            const [enRes, xhRes] = await Promise.all([
                fetch('/locales/en.json'),
                fetch('/locales/xh.json')
            ]);
            
            const en = await enRes.json();
            const xh = await xhRes.json();
            
            i18next.init({
                lng: savedLang,
                fallbackLng: 'en',
                resources: {
                    en: { translation: en },
                    xh: { translation: xh }
                }
            }, () => {
                updateUI();
                setupToggle();
            });
        } catch (err) {
            console.error('Failed to load translations:', err);
        }
    }
    
    function t(key) {
        if (i18next && i18next.isInitialized) {
            return i18next.t(key);
        }
        return key;
    }
    
    function updateUI() {
        const lang = i18next?.language || savedLang;
        const btn = document.getElementById('lang-toggle');
        if (btn) {
            if (lang === 'xh') {
                btn.classList.add('xh');
            } else {
                btn.classList.remove('xh');
            }
        }
        document.documentElement.lang = lang;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                el.textContent = t(key);
            }
        });
    }
    
    function setupToggle() {
        const btn = document.getElementById('lang-toggle');
        if (!btn) return;
        
        btn.onclick = function() {
            const currentLang = i18next?.language || savedLang;
            const newLang = currentLang === 'en' ? 'xh' : 'en';
            i18next.changeLanguage(newLang);
            localStorage.setItem('language', newLang);
            updateUI();
            window.location.reload();
        };
    }
    
    function init() {
        loadTranslations().then(() => {
            setupToggle();
            updateUI();
        });
    }
    
    if (typeof i18next !== 'undefined') {
        init();
    } else {
        window.addEventListener('load', init);
    }
    
    window.i18n = {
        t: t,
        getLanguage: () => i18next?.language || savedLang,
        changeLanguage: (lang) => {
            if (i18next) {
                i18next.changeLanguage(lang);
                localStorage.setItem('language', lang);
                updateUI();
                window.location.reload();
            }
        }
    };
})();

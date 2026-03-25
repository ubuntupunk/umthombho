(function() {
    const savedLang = localStorage.getItem('language') || 'en';
    console.log('i18n init, savedLang:', savedLang);
    
    async function loadTranslations() {
        try {
            const [enRes, xhRes] = await Promise.all([
                fetch('/locales/en.json'),
                fetch('/locales/xh.json')
            ]);
            
            const en = await enRes.json();
            const xh = await xhRes.json();
            console.log('Loaded translations, en keys:', Object.keys(en).slice(0, 5));
            
            i18next.init({
                lng: savedLang,
                fallbackLng: 'en',
                resources: {
                    en: { translation: en },
                    xh: { translation: xh }
                }
            }, () => {
                console.log('i18next initialized, language:', i18next.language);
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
        console.log('updateUI, lang:', lang);
        const btn = document.getElementById('lang-toggle');
        console.log('lang-toggle found:', !!btn);
        if (btn) {
            btn.classList.toggle('xh', lang === 'xh');
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
        if (!btn) {
            console.log('setupToggle: btn not found');
            return;
        }
        
        btn.addEventListener('click', () => {
            const currentLang = i18next?.language || savedLang;
            const newLang = currentLang === 'en' ? 'xh' : 'en';
            console.log('Toggle clicked, switching from', currentLang, 'to', newLang);
            i18next.changeLanguage(newLang);
            localStorage.setItem('language', newLang);
            updateUI();
            window.location.reload();
        });
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
        console.log('i18next not defined yet, waiting for load');
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

(function() {
    const savedLang = localStorage.getItem('language') || 'en';
    
    async function loadTranslations() {
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
        });
        
        updateUI();
        setupToggle();
    }
    
    function t(key) {
        return i18next.t(key);
    }
    
    function updateUI() {
        const lang = i18next.language;
        document.getElementById('lang-toggle').classList.toggle('xh', lang === 'xh');
        document.documentElement.lang = lang;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });
    }
    
    function setupToggle() {
        const btn = document.getElementById('lang-toggle');
        btn.addEventListener('click', () => {
            const newLang = i18next.language === 'en' ? 'xh' : 'en';
            i18next.changeLanguage(newLang);
            localStorage.setItem('language', newLang);
            updateUI();
            window.location.reload();
        });
    }
    
    if (typeof i18next !== 'undefined') {
        loadTranslations();
    } else {
        window.addEventListener('load', loadTranslations);
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

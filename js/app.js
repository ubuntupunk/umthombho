(function() {
    const app = document.getElementById('app');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    function t(key) {
        if (typeof i18next !== 'undefined' && i18next.isInitialized) {
            return i18next.t(key);
        }
        if (window.i18n && window.i18n.t) {
            return window.i18n.t(key);
        }
        return key;
    }

    function waitForI18n(callback) {
        const check = () => {
            if (typeof i18next !== 'undefined' && i18next.isInitialized) {
                callback();
            } else {
                setTimeout(check, 50);
            }
        };
        check();
    }

    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.href && e.target.href.startsWith(window.location.origin)) {
            e.preventDefault();
            const path = e.target.href.replace(window.location.origin, '');
            history.pushState(null, '', path);
            handleRoute();
        }
    });

    let blogPosts = [];

    async function loadBlogData() {
        try {
            const response = await fetch('/journal-data.json');
            blogPosts = await response.json();
        } catch (error) {
            console.error('Failed to load blog posts:', error);
            blogPosts = [];
        }
    }

    loadBlogData();

    const routes = {
        '/': renderHome,
        '/mission': renderMission,
        '/governance': renderGovernance,
        '/biography': renderBiography,
        '/contact': renderContact,
        '/journal': renderBlogList,
        '/journal/:slug': renderBlogPost
    };

    function renderHome() {
        return `
            <div class="hero" style="background-image: url('images/photo1.webp'); background-color: var(--primary);">
                <div class="hero-content">
                    <h1>${t('hero.title')}</h1>
                    <p>${t('hero.subtitle')}</p>
                    <a href="/contact" class="btn">${t('hero.cta')}</a>
                </div>
            </div>
            <section class="section">
                <div class="container">
                    <h2 class="section-title">${t('mission.title')}</h2>
                    <div class="mission">
                        <p>${t('hero.missionText')}</p>
                    </div>
                </div>
            </section>
            <section class="section section-alt">
                <div class="container">
                    <h2 class="section-title">${t('services.title')}</h2>
                    <div class="services-grid">
                        <div class="service-card">
                            <img src="images/meal.webp" alt="Daily Meals" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-bottom: 1rem;">
                            <h3>${t('services.dailyMeals.title')}</h3>
                            <p>${t('services.dailyMeals.desc')}</p>
                        </div>
                        <div class="service-card">
                            <img src="images/child.webp" alt="Children" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-bottom: 1rem;">
                            <h3>${t('services.children.title')}</h3>
                            <p>${t('services.children.desc')}</p>
                        </div>
                        <div class="service-card">
                            <img src="images/elder.webp" alt="Elderly" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-bottom: 1rem;">
                            <h3>${t('services.elderly.title')}</h3>
                            <p>${t('services.elderly.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function renderMission() {
        return `
            <div class="page">
                <section class="section">
                    <div class="container">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <img src="images/logo.webp" alt="Awomi Umthombho" style="max-width: 200px; height: auto;">
                        </div>
                        <h2 class="section-title">${t('mission.title')}</h2>
                        <div class="mission-content" style="max-width: 800px; margin: 0 auto;">
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">${t('mission.intro')}</p>
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">${t('mission.funding')}</p>
                            
                            <h3 style="color: var(--primary); margin: 2rem 0 1rem;">${t('mission.problemTitle')}</h3>
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">${t('mission.problem')}</p>
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">${t('mission.solution')}</p>
                            
                            <div style="margin-top: 2rem; padding: 1.5rem; background: white; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                                <p style="font-weight: 600; margin-bottom: 0.5rem;">${t('mission.downloadBusinessProfile')}</p>
                                <a href="docs/Awomi Umthombho Feeding Scheme business profle.docx" class="btn" download>${t('mission.downloadButton')}</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    function renderGovernance() {
        return `
            <div class="page">
                <section class="section">
                    <div class="container">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <img src="images/logo.webp" alt="Awomi Umthombho" style="max-width: 200px; height: auto;">
                        </div>
                        <h2 class="section-title">${t('governance.title')}</h2>
                        <div class="governance-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; max-width: 800px; margin: 0 auto;">
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">${t('governance.chairperson')}</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Geoffrey Masixole Ralarala</p>
                            </div>
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">${t('governance.treasurer')}</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Mzwamadoda Mlando</p>
                            </div>
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">${t('governance.secretary')}</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Kenneth Ngece</p>
                            </div>
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">${t('governance.operations')}</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Lolly</p>
                            </div>
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">${t('governance.volunteer')}</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Thanda</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    function renderBiography() {
        return `
            <div class="page">
                <section class="section">
                    <div class="container">
                        <div class="bio-content">
                            <div class="bio-image">
                                <img src="images/photo2.webp" alt="Founder of Awomi Umthombho" loading="lazy" width="400" height="500" style="background: var(--secondary);">
                            </div>
                            <div class="bio-text">
                                <h2>${t('biography.title')}</h2>
                                <h3 style="color: var(--accent); margin-bottom: 1rem;">${t('biography.founder')}</h3>
                                <p>${t('biography.role')}</p>
                                <p style="margin-top: 1.5rem;">${t('biography.story')}</p>
                                <p>${t('biography.community')}</p>
                                <p>${t('biography.continuation')}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    function renderContact() {
        return `
            <div class="page">
                <section class="section">
                    <div class="container">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <img src="images/logo.webp" alt="Awomi Umthombho" style="max-width: 200px; height: auto;">
                        </div>
                        <h2 class="section-title">${t('contact.title')}</h2>
                        <div class="contact-grid">
                            <div class="contact-form">
                                <div class="form-success" id="formSuccess">${t('contact.form.success')}</div>
                                <form id="contactForm" action="mailto:masxoleralarala@gmail.com" method="post" enctype="text/plain">
                                    <div class="form-group">
                                        <label for="name">${t('contact.form.name')}</label>
                                        <input type="text" id="name" name="name" required>
                                        <span class="error">Please enter your name</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">${t('contact.form.email')}</label>
                                        <input type="email" id="email" name="email" required>
                                        <span class="error">Please enter a valid email</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="message">${t('contact.form.message')}</label>
                                        <textarea id="message" name="message" required></textarea>
                                        <span class="error">Please enter your message</span>
                                    </div>
                                    <button type="submit" class="btn">${t('contact.form.submit')}</button>
                                </form>
                            </div>
                            <div class="contact-info">
                                <div class="info-card">
                                    <h3>${t('contact.info.title')}</h3>
                                    <p>${t('contact.info.address').replace('\n', '<br>')}</p>
                                    <p style="margin-top: 1rem;"><a href="mailto:masxoleralarala@gmail.com">masxoleralarala@gmail.com</a></p>
                                </div>
                                <div class="info-card">
                                    <h3>${t('contact.info.location')}</h3>
                                    <div class="map-container">
                                        <iframe 
                                            src="https://www.openstreetmap.org/export/embed.html?bbox=18.63%2C-34.05%2C18.65%2C-34.03&amp;layer=mapnik&amp;marker=-34.046%2C18.641"
                                            loading="lazy">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    function renderBlogList() {
        if (blogPosts.length === 0) {
            return `
                <div class="page">
                    <section class="section">
                        <div class="container">
                            <h2 class="section-title">Journal</h2>
                            <p>No journal entries yet.</p>
                        </div>
                    </section>
                </div>
            `;
        }
        return `
            <div class="page">
                <section class="section">
                    <div class="container">
                        <h2 class="section-title">Journal</h2>
                        <div class="blog-list">
                            ${blogPosts.map(post => `
                                <article class="blog-preview">
                                    ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
                                    <h2><a href="/journal/${post.slug}">${post.title}</a></h2>
                                    <time>${new Date(post.date).toLocaleDateString()}</time>
                                    <p>${post.description}</p>
                                </article>
                            `).join('')}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    function renderBlogPost(slug) {
        const post = blogPosts.find(p => p.slug === slug);
        if (!post) {
            return `
                <div class="page">
                    <section class="section">
                        <div class="container">
                            <h1>Post not found</h1>
                        </div>
                    </section>
                </div>
            `;
        }
        return `
            <div class="page">
                <section class="section">
                    <div class="container">
                        <article class="blog-post">
                            <h1>${post.title}</h1>
                            <time>${new Date(post.date).toLocaleDateString()}</time>
                            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
                            <div class="content">${post.html}</div>
                        </article>
                    </div>
                </section>
            </div>
        `;
    }

    function handleRoute() {
        const path = window.location.pathname || '/';
        
        let route = routes[path];
        let param = null;
        
        if (!route) {
            for (const [routePath, handler] of Object.entries(routes)) {
                if (routePath.includes(':')) {
                    const colonIndex = routePath.indexOf(':');
                    const routeBase = routePath.substring(0, colonIndex);
                    if (path.startsWith(routeBase)) {
                        param = path.substring(routeBase.length);
                        route = handler;
                        break;
                    }
                }
            }
        }
        
        if (!route) {
            route = routes['/'];
        }
        
        app.innerHTML = route(param);
        
        const basePath = param ? path.substring(0, path.length - param.length) : path;
        updateNav(basePath);
        updateStaticTranslations();
        
        if (basePath === '/contact') {
            initContactForm();
        }
        
        window.scrollTo(0, 0);
    }

    function updateStaticTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });
        
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            const savedLang = localStorage.getItem('language') || 'en';
            langBtn.classList.toggle('xh', savedLang === 'xh');
        }
    }

    function updateNav(path) {
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            }
            const i18nKey = link.getAttribute('data-i18n');
            if (i18nKey) {
                link.textContent = t(i18nKey);
            }
        });
    }

    function initContactForm() {
        const form = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const formGroups = form.querySelectorAll('.form-group');
            
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                if (!input.value.trim()) {
                    group.classList.add('error');
                    isValid = false;
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    group.classList.add('error');
                    isValid = false;
                } else {
                    group.classList.remove('error');
                }
            });
            
            if (isValid) {
                formSuccess.classList.add('show');
                form.reset();
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            } else {
                e.preventDefault();
            }
        });
        
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.closest('.form-group').classList.remove('error');
            });
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    window.addEventListener('popstate', handleRoute);
    
    function init() {
        waitForI18n(() => {
            handleRoute();
        });
    }
    
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
})();

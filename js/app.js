(function() {
    const app = document.getElementById('app');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    let blogPosts = [];

    async function loadBlogData() {
        try {
            const response = await fetch('/blog-data.json');
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
        '/blog': renderBlogList,
        '/blog/:slug': renderBlogPost
    };

    function renderHome() {
        return `
            <div class="hero" style="background-image: url('images/photo1.webp')">
                <div class="hero-content">
                    <h1>Nourishing Lives, Building Community</h1>
                    <p>Awomi Umthombho Feeding Scheme is dedicated to providing nutritious meals to those in need in Mandela Park, Khayelitsha.</p>
                    <a href="#/contact" class="btn">Get Involved</a>
                </div>
            </div>
            <section class="section">
                <div class="container">
                    <h2 class="section-title">Our Mission</h2>
                    <div class="mission">
                        <p>To combat hunger and malnutrition in our community by providing balanced, nutritious meals to children, families, and elderly residents. We believe that no one should go to bed hungry, and that good nutrition is the foundation for a healthy, productive life.</p>
                    </div>
                </div>
            </section>
            <section class="section section-alt">
                <div class="container">
                    <h2 class="section-title">What We Do</h2>
                    <div class="services-grid">
                        <div class="service-card">
                            <img src="images/meal.webp" alt="Daily Meals" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-bottom: 1rem;">
                            <h3>Daily Meals</h3>
                            <p>Providing hundreds of nutritious meals daily to community members in need.</p>
                        </div>
                        <div class="service-card">
                            <img src="images/child.webp" alt="Children" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-bottom: 1rem;">
                            <h3>Children's Program</h3>
                            <p>Ensuring children receive proper nutrition for healthy growth and development.</p>
                        </div>
                        <div class="service-card">
                            <img src="images/elder.webp" alt="Elderly" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-bottom: 1rem;">
                            <h3>Elderly Support</h3>
                            <p>Delivering meals to elderly residents who may have limited access to food.</p>
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
                        <h2 class="section-title">Our Mission</h2>
                        <div class="mission-content" style="max-width: 800px; margin: 0 auto;">
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">AWOMI UMTHOMBO Feeding Scheme is a Cape Town, Khayelitsha-based non-profit organisation established to combat food insecurity. The organisation operates a community feeding program providing daily meals to vulnerable individuals.</p>
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">The project seeks funding, partnerships, and donations to sustain operations and expand its impact.</p>
                            
                            <h3 style="color: var(--primary); margin: 2rem 0 1rem;">Problem Statement</h3>
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Food insecurity remains a critical issue in South Africa. Many households in Cape Town struggle with unemployment and poverty, resulting in children going to school hungry and families lacking access to basic nutrition.</p>
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">The feeding scheme aims to alleviate hunger while improving health, dignity, and social stability.</p>
                            
                            <div style="margin-top: 2rem; padding: 1.5rem; background: white; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                                <p style="font-weight: 600; margin-bottom: 0.5rem;">Download our business profile</p>
                                <a href="docs/Awomi Umthombho Feeding Scheme business profle.docx" class="btn" download>Download Doc</a>
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
                        <h2 class="section-title">Governance Structure</h2>
                        <div class="governance-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; max-width: 800px; margin: 0 auto;">
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">Chairperson</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Geoffrey Masixole Ralarala</p>
                            </div>
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">Treasurer</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Mzwamadoda Mlando</p>
                            </div>
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">Secretary</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Kenneth Ngece</p>
                            </div>
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">Operations Manager</h3>
                                <p style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">Lolly</p>
                            </div>
                            <div class="governance-card" style="background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                                <h3 style="color: var(--primary); font-size: 1.25rem;">Volunteer Coordinator</h3>
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
                                <img src="images/photo2.webp" alt="Founder of Awomi Umthombho">
                            </div>
                            <div class="bio-text">
                                <h2>Our Founder</h2>
                                <h3 style="color: var(--accent); margin-bottom: 1rem;">Geoffrey Masixole Ralarala</h3>
                                <p>Founder & Director</p>
                                <p style="margin-top: 1.5rem;">Awomi Umthombho was founded with a simple belief: that every person deserves access to nutritious food. What started as a small initiative to feed a handful of neighbors has grown into a community pillar serving hundreds of meals each day.</p>
                                <p>Our founder, deeply rooted in the Mandela Park community, recognized that hunger was not just an individual problem but a community challenge that required collective action. Through dedication, compassion, and unwavering commitment, the feeding scheme has become a beacon of hope for many families.</p>
                                <p>We continue to expand our reach while maintaining our core mission: nourishing bodies, feeding souls, and building a stronger, more resilient community.</p>
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
                        <h2 class="section-title">Contact Us</h2>
                        <div class="contact-grid">
                            <div class="contact-form">
                                <div class="form-success" id="formSuccess">Thank you! Your email client should open to send the message.</div>
                                <form id="contactForm" action="mailto:masxoleralarala@gmail.com" method="post" enctype="text/plain">
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <input type="text" id="name" name="name" required>
                                        <span class="error">Please enter your name</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" name="email" required>
                                        <span class="error">Please enter a valid email</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="message">Message</label>
                                        <textarea id="message" name="message" required></textarea>
                                        <span class="error">Please enter your message</span>
                                    </div>
                                    <button type="submit" class="btn">Send Message</button>
                                </form>
                            </div>
                            <div class="contact-info">
                                <div class="info-card">
                                    <h3>Contact Us</h3>
                                    <p>22 035 Lambede Crescent<br>Mandela Park<br>Khayelitsha 7784</p>
                                    <p style="margin-top: 1rem;"><a href="mailto:masxoleralarala@gmail.com">masxoleralarala@gmail.com</a></p>
                                </div>
                                <div class="info-card">
                                    <h3>Our Location</h3>
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
                            <h2 class="section-title">Blog</h2>
                            <p>No blog posts yet.</p>
                        </div>
                    </section>
                </div>
            `;
        }
        return `
            <div class="page">
                <section class="section">
                    <div class="container">
                        <h2 class="section-title">Blog</h2>
                        <div class="blog-list">
                            ${blogPosts.map(post => `
                                <article class="blog-preview">
                                    ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
                                    <h2><a href="#/blog/${post.slug}">${post.title}</a></h2>
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
        const hash = window.location.hash.slice(1) || '/';
        
        if (hash.startsWith('invite_token=')) {
            return;
        }
        
        let route = routes[hash];
        let param = null;
        
        if (!route) {
            for (const [path, handler] of Object.entries(routes)) {
                if (path.includes(':')) {
                    const colonIndex = path.indexOf(':');
                    const routeBase = path.substring(0, colonIndex);
                    if (hash.startsWith(routeBase)) {
                        param = hash.substring(routeBase.length);
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
        
        const baseHash = param ? hash.substring(0, hash.length - param.length) : hash;
        updateNav(baseHash);
        
        if (baseHash === '/contact') {
            initContactForm();
        }
        
        window.scrollTo(0, 0);
    }

    function updateNav(hash) {
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + hash) {
                link.classList.add('active');
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

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);
})();

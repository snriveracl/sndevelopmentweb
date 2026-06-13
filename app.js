(function(){
      function qs(sel, ctx){ return (ctx||document).querySelector(sel); }
      function qsa(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)); }

      const modal = qs('#screenshotModal');
      const imgEl = qs('#screenshotImage');
      const prevBtn = qs('#prevScreenshot');
      const nextBtn = qs('#nextScreenshot');
      const closeBtn = qs('#closeScreenshot');

      let currentList = [];
      let currentIndex = 0;

      function openModal(list, startIndex){
        currentList = list || [];
        currentIndex = Math.max(0, Math.min(startIndex||0, currentList.length-1));
        imgEl.src = currentList[currentIndex] || '';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
      }

      function closeModal(){
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden','true');
        imgEl.src = '';
        document.body.style.overflow = '';
      }

      function showIndex(i){
        if(!currentList.length) return;
        currentIndex = (i + currentList.length) % currentList.length;
        imgEl.src = currentList[currentIndex];
      }

      // Delegate clicks on any .btn-outline with data-images
      document.addEventListener('click', function(e){
        const btn = e.target.closest('.btn-outline[data-images]');
        if(!btn) return;
        e.preventDefault();
        const raw = btn.getAttribute('data-images') || '';
        const list = raw.split(',').map(s=>s.trim()).filter(Boolean);
        if(!list.length) return;
        openModal(list, 0);
      });

      prevBtn.addEventListener('click', function(){ showIndex(currentIndex-1); });
      nextBtn.addEventListener('click', function(){ showIndex(currentIndex+1); });
      closeBtn.addEventListener('click', closeModal);

      // close when clicking outside the panel
      modal.addEventListener('click', function(e){
        if(e.target === modal) closeModal();
      });

      // keyboard nav
      document.addEventListener('keydown', function(e){
        if(modal.classList.contains('active')){
          if(e.key === 'Escape') closeModal();
          if(e.key === 'ArrowLeft') showIndex(currentIndex-1);
          if(e.key === 'ArrowRight') showIndex(currentIndex+1);
        }
      });
    })();

    const documentationContent = {
      title: 'SN Phone OS 26',
      summary: 'Official setup notes, configuration references, and workflow tips for SN Phone OS 26.',
      heroTitle: 'SN Phone OS 26 Documentation',
      heroText: 'Set up the phone, connect your server resources, and tune the experience for your roleplay community.',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          body: 'SN Phone OS 26 is a modern FiveM phone resource focused on fast roleplay workflows, polished app navigation, and clean integration points for server owners.',
          list: [
            'Responsive phone interface inspired by modern mobile operating systems.',
            'Core apps for contacts, calls, messages, banking hooks, and server utilities.',
            'Config-first setup so features can be enabled, disabled, or renamed without editing core files.'
          ]
        },
        {
          id: 'installation',
          title: 'Installation',
          body: 'Place the resource in your server resources folder, add it to your server start order, then configure the framework and database settings before restart.',
          list: [
            'Drag sn-phone into your resources folder.',
            'Add ensure sn-phone after your framework, inventory, and database resources.',
            'Import the SQL file if your package includes one.',
            'Restart the server and check the console for missing dependencies.'
          ],
          code: 'ensure oxmysql\nensure qb-core\nensure sn-phone'
        },
        {
          id: 'configuration',
          title: 'Configuration',
          body: 'Most server-specific behavior should be edited from the config file. Update labels, enabled apps, framework mode, item names, and command permissions there.',
          code: "Config = {\n  Framework = 'qb',\n  Locale = 'en',\n  PhoneItem = 'phone',\n  EnableBanking = true,\n  EnableDispatch = true,\n  Debug = false\n}"
        },
        {
          id: 'apps',
          title: 'Apps',
          body: 'Apps can be enabled per server style. Keep only the tools your community actually uses so the phone stays fast and easy to navigate.',
          list: [
            'Messages and calls for player communication.',
            'Contacts for saved numbers and quick actions.',
            'Banking integrations for balances and transfers.',
            'Custom app slots for future server-specific systems.'
          ]
        },
        {
          id: 'support',
          title: 'Support',
          body: 'For support, prepare your server console errors, framework version, dependency list, and a short explanation of what you expected to happen.',
          list: [
            'Confirm all dependencies start before sn-phone.',
            'Test with Debug enabled only while troubleshooting.',
            'Share screenshots or console logs when opening a ticket.'
          ]
        }
      ]
    };

    const tebexConfig = {
      publicToken: '11bzo-d17911297d5f27208d2a2a048a2c86ba742f9ab2',
      packageId: 7390265,
      pendingBasketKey: 'sn_tebex_pending_basket'
    };

// Initialize variables
    const navbar = document.getElementById('navbar');
    const mobileDropdown = document.getElementById('mobileDropdown');
    let lastScrollY = 0;
    let docsRendered = false;
    let activeScrollFrame = null;

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Theme toggle
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }

    // Mobile menu
    function toggleMobileMenu() {
      mobileDropdown.classList.toggle('active');
    }

    function closeMobileMenu() {
      mobileDropdown.classList.remove('active');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileDropdown.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Page navigation
    function updateNavState(activeHash) {
      document.querySelectorAll('a.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === activeHash);
      });
    }

    function prefersReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function smoothScrollTo(targetY, duration = 900) {
      if (activeScrollFrame) {
        cancelAnimationFrame(activeScrollFrame);
      }

      const startY = window.pageYOffset;
      const distance = targetY - startY;

      if (prefersReducedMotion() || Math.abs(distance) < 8) {
        window.scrollTo(0, targetY);
        return Promise.resolve();
      }

      const startTime = performance.now();

      return new Promise(resolve => {
        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);

          window.scrollTo(0, startY + distance * eased);

          if (progress < 1) {
            activeScrollFrame = requestAnimationFrame(step);
          } else {
            activeScrollFrame = null;
            resolve();
          }
        }

        activeScrollFrame = requestAnimationFrame(step);
      });
    }

    function getScrollTargetPosition(target, offset = 100) {
      return Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - offset);
    }

    function setPageLoader(active, text = 'Opening') {
      const loader = document.getElementById('pageLoader');
      if (!loader) return;

      loader.querySelector('.page-loader-text').textContent = text;
      loader.classList.toggle('active', active);
      loader.setAttribute('aria-hidden', active ? 'false' : 'true');
    }

    async function tebexRequest(path, options = {}) {
      const response = await fetch(`https://headless.tebex.io/api${path}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...options.headers
        },
        ...options
      });

      const text = await response.text();
      const payload = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new Error(payload?.detail || payload?.title || 'Tebex request failed');
      }

      return payload;
    }

    function getTebexReturnUrl(type) {
      const url = new URL(window.location.href);
      url.searchParams.set('tebex', type);
      url.hash = 'scripts';
      return url.toString();
    }

    function getCheckoutUrl(basket) {
      const links = basket?.data?.links || basket?.links;

      if (Array.isArray(links)) {
        const checkoutLink = links.find(link => link.rel === 'checkout' || link.name === 'checkout');
        if (checkoutLink?.href || checkoutLink?.url) {
          return checkoutLink.href || checkoutLink.url;
        }
      }

      if (links?.checkout) {
        return links.checkout;
      }

      const ident = basket?.data?.ident || basket?.ident;
      return ident ? `https://pay.tebex.io/${ident}` : null;
    }

    function savePendingBasket(ident) {
      localStorage.setItem(tebexConfig.pendingBasketKey, JSON.stringify({
        ident,
        packageId: tebexConfig.packageId,
        createdAt: Date.now()
      }));
    }

    function readPendingBasket() {
      try {
        const pending = JSON.parse(localStorage.getItem(tebexConfig.pendingBasketKey));
        if (!pending?.ident || pending.packageId !== tebexConfig.packageId) return null;

        const maxAge = 1000 * 60 * 30;
        if (Date.now() - pending.createdAt > maxAge) {
          localStorage.removeItem(tebexConfig.pendingBasketKey);
          return null;
        }

        return pending;
      } catch {
        return null;
      }
    }

    function clearPendingBasket() {
      localStorage.removeItem(tebexConfig.pendingBasketKey);
    }

    async function addPackageAndOpenCheckout(basketIdent) {
      setPageLoader(true, 'Adding SN Phone');

      await tebexRequest(`/baskets/${basketIdent}/packages`, {
        method: 'POST',
        body: JSON.stringify({
          package_id: String(tebexConfig.packageId),
          quantity: 1
        })
      });

      setPageLoader(true, 'Opening checkout');
      const basket = await tebexRequest(`/accounts/${tebexConfig.publicToken}/baskets/${basketIdent}`);
      const checkoutUrl = getCheckoutUrl(basket);

      if (!checkoutUrl) {
        throw new Error('Tebex did not return a checkout URL');
      }

      clearPendingBasket();
      window.location.href = checkoutUrl;
    }

    async function startTebexCheckout() {
      if (!window.location.protocol.startsWith('http')) {
        alert('Para completar el checkout de Tebex, primero publica la web en una URL http/https.');
        return;
      }

      try {
        setPageLoader(true, 'Preparing checkout');

        const basket = await tebexRequest(`/accounts/${tebexConfig.publicToken}/baskets`, {
          method: 'POST',
          body: JSON.stringify({
            complete_url: getTebexReturnUrl('complete'),
            cancel_url: getTebexReturnUrl('cancel'),
            complete_auto_redirect: true
          })
        });

        const basketIdent = basket?.data?.ident;
        if (!basketIdent) {
          throw new Error('Tebex did not return a basket identifier');
        }

        savePendingBasket(basketIdent);

        setPageLoader(true, 'Opening FiveM login');
        const authReturnUrl = encodeURIComponent(getTebexReturnUrl('auth-return'));
        const auth = await tebexRequest(`/accounts/${tebexConfig.publicToken}/baskets/${basketIdent}/auth?returnUrl=${authReturnUrl}`, {
          method: 'GET'
        });

        const authLink = auth?.value?.[0]?.url || auth?.data?.[0]?.url;
        if (authLink) {
          window.location.href = authLink;
          return;
        }

        await addPackageAndOpenCheckout(basketIdent);
      } catch (error) {
        setPageLoader(false);
        console.error(error);
        alert(`No se pudo iniciar el checkout: ${error.message}`);
      }
    }

    async function handleTebexReturn() {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tebex') !== 'auth-return') return;

      const pending = readPendingBasket();
      if (!pending) return;

      try {
        await addPackageAndOpenCheckout(pending.ident);
      } catch (error) {
        setPageLoader(false);
        console.error(error);
        alert(`No se pudo continuar el checkout: ${error.message}`);
      }
    }

    function showSubPage(pageName, hash = `#${pageName}`) {
      const mainPage = document.getElementById('mainPage');
      const subPages = document.querySelectorAll('.sub-page');
      const targetPage = document.getElementById(pageName + 'Page');

      if (!targetPage) return;

      if (pageName === 'docs') {
        renderDocumentation();
        setPageLoader(true, 'Opening documentation');
      }
      
      mainPage.classList.add('hidden');
      subPages.forEach(page => page.classList.remove('active'));
      
      setTimeout(() => {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
        if (window.location.hash !== hash) {
          history.pushState(null, '', hash);
        }
        if (hash === '#docs' || hash.startsWith('#docs-')) {
          updateNavState('#docs');
        }
      }, pageName === 'docs' ? 320 : 100);

      if (pageName === 'docs') {
        setTimeout(() => setPageLoader(false), 720);
      }
    }

    function showMainPage(hash = '') {
      const mainPage = document.getElementById('mainPage');
      const subPages = document.querySelectorAll('.sub-page');
      
      subPages.forEach(page => page.classList.remove('active'));
      
      setTimeout(() => {
        mainPage.classList.remove('hidden');
        if (!hash) {
          smoothScrollTo(0, 650);
        }
        if (hash && window.location.hash !== hash) {
          history.pushState(null, '', hash);
        }
      }, 100);
    }

    function renderDocumentation() {
      if (docsRendered) return;

      const title = document.getElementById('docsTitle');
      const summary = document.getElementById('docsSummary');
      const nav = document.getElementById('docsNav');
      const content = document.getElementById('docsContent');

      if (!title || !summary || !nav || !content) return;

      title.textContent = documentationContent.title;
      summary.textContent = documentationContent.summary;

      const hero = document.createElement('section');
      hero.className = 'docs-hero';

      const heroTitle = document.createElement('h2');
      heroTitle.textContent = documentationContent.heroTitle;

      const heroText = document.createElement('p');
      heroText.textContent = documentationContent.heroText;

      hero.append(heroTitle, heroText);
      content.appendChild(hero);

      documentationContent.sections.forEach((section, index) => {
        const navLink = document.createElement('a');
        navLink.href = `#docs-${section.id}`;
        navLink.textContent = section.title;
        if (index === 0) {
          navLink.classList.add('active');
        }
        nav.appendChild(navLink);

        const article = document.createElement('section');
        article.className = 'docs-section';
        article.id = `docs-${section.id}`;

        const heading = document.createElement('h3');
        heading.textContent = section.title;
        article.appendChild(heading);

        if (section.body) {
          const paragraph = document.createElement('p');
          paragraph.textContent = section.body;
          article.appendChild(paragraph);
        }

        if (section.list?.length) {
          const list = document.createElement('ul');
          section.list.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
          });
          article.appendChild(list);
        }

        if (section.code) {
          const pre = document.createElement('pre');
          pre.className = 'docs-code';
          const code = document.createElement('code');
          code.textContent = section.code;
          pre.appendChild(code);
          article.appendChild(pre);
        }

        content.appendChild(article);
      });

      docsRendered = true;
    }

    function openHashTarget(hash) {
      if (!hash) return;

      if (hash === '#docs' || hash.startsWith('#docs-')) {
        showSubPage('docs', hash);
        updateNavState('#docs');

        if (hash.startsWith('#docs-')) {
          setTimeout(() => {
            const target = document.querySelector(hash);
            document.querySelectorAll('.docs-nav a').forEach(navLink => {
              navLink.classList.toggle('active', navLink.getAttribute('href') === hash);
            });
            if (target) {
              smoothScrollTo(getScrollTargetPosition(target, 118), 850);
            }
          }, 760);
        }
      }
    }

    function initEventHandlers() {
      const themeToggle = document.querySelector('.theme-toggle');
      const mobileMenuButton = document.querySelector('.nav-mobile-btn');

      themeToggle?.addEventListener('click', toggleTheme);
      mobileMenuButton?.addEventListener('click', toggleMobileMenu);

      document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });

      document.querySelectorAll('[data-sub-page]').forEach(button => {
        button.addEventListener('click', () => showSubPage(button.dataset.subPage));
      });

      document.querySelectorAll('[data-main-page]').forEach(button => {
        button.addEventListener('click', () => showMainPage());
      });

      document.querySelectorAll('[data-tebex-buy]').forEach(button => {
        button.addEventListener('click', startTebexCheckout);
      });

      document.getElementById('docsNav')?.addEventListener('click', event => {
        const link = event.target.closest('a[href^="#docs-"]');
        if (!link) return;

        event.preventDefault();
        const hash = link.getAttribute('href');
        const target = document.querySelector(hash);

        document.querySelectorAll('.docs-nav a').forEach(navLink => {
          navLink.classList.toggle('active', navLink === link);
        });

        if (window.location.hash !== hash) {
          history.pushState(null, '', hash);
        }

        if (target) {
          smoothScrollTo(getScrollTargetPosition(target, 118), 850);
        }
      });

      document.querySelectorAll('[data-hide-on-error]').forEach(image => {
        image.addEventListener('error', () => {
          image.style.display = 'none';
        });
      });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScrollY = window.scrollY;
    });

    // Scroll reveal
    function initScrollReveal() {
      const reveals = document.querySelectorAll('.reveal');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      reveals.forEach(reveal => observer.observe(reveal));
    }

    // Animated counters
    function animateCounters() {
      const counters = document.querySelectorAll('.stat-number');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();
            
            function updateCounter(currentTime) {
              const elapsed = currentTime - start;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(easeOut * target);
              
              counter.textContent = current.toLocaleString();
              
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target.toLocaleString() + '+';
              }
            }
            
            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(counter => observer.observe(counter));
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();

        if (href === '#docs' || href.startsWith('#docs-')) {
          openHashTarget(href);
          closeMobileMenu();
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          const scrollToTarget = () => {
            closeMobileMenu();
            const targetPosition = getScrollTargetPosition(target, 100);
            const distance = Math.abs(window.pageYOffset - targetPosition);
            const duration = Math.min(1200, Math.max(720, distance * 0.55));
            smoothScrollTo(targetPosition, duration);
            if (window.location.hash !== href) {
              history.pushState(null, '', href);
            }
          };

          if (document.getElementById('mainPage').classList.contains('hidden')) {
            showMainPage(href);
            setTimeout(scrollToTarget, 160);
          } else {
            scrollToTarget();
          }
        }
      });
    });

    // Navigation active link (highlight current section)
    function initNavActive() {
      const navLinks = document.querySelectorAll('a.nav-link');
      const sections = [];

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const section = document.querySelector(href);
          if (section) sections.push(section);

          // click sets active immediately
          link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          });
        }
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(l => {
              if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
              else l.classList.remove('active');
            });
          }
        });
      }, { threshold: 0.55 });

      sections.forEach(s => observer.observe(s));

      // initial active based on hash or viewport
      if (window.location.hash) {
        const id = window.location.hash.replace('#','');
        navLinks.forEach(l => {
          if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
          else l.classList.remove('active');
        });
      } else {
        // pick first visible
        for (const s of sections) {
          const rect = s.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.25) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`a.nav-link[href="#${s.id}"]`);
            if (link) link.classList.add('active');
            break;
          }
        }
      }
    }

    initEventHandlers();

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      animateCounters();
      initNavActive();
      openHashTarget(window.location.hash);
      handleTebexReturn();
    });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;

      if (hash === '#docs' || hash.startsWith('#docs-')) {
        openHashTarget(hash);
        return;
      }

      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        const goToSection = () => {
          smoothScrollTo(getScrollTargetPosition(target, 100), 850);
        };

        if (document.getElementById('mainPage').classList.contains('hidden')) {
          showMainPage(hash);
          setTimeout(goToSection, 180);
        } else {
          goToSection();
        }
      }
    });

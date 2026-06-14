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

    const tebexConfig = {
      publicToken: '11bzo-d17911297d5f27208d2a2a048a2c86ba742f9ab2',
      webstoreUrl: 'https://sn-development-store.tebex.io',
      pendingBasketKey: 'sn_tebex_pending_basket',
      authedBasketKey: 'sn_tebex_authed_basket'
    };

    const supportFormConfig = {
      endpointUrl: 'https://small-snow-0640sn-support-form.riverayangelcracks.workers.dev/',
      discordTicketUrl: 'https://discord.gg/Z9mhaCbPvR'
    };

    const products = [
      {
        id: 'sn-phone',
        tebexPackageId: 7390265,
        name: 'SN Phone OS 26',
        version: 'v1.0',
        label: 'Phone',
        shortDescription: 'A modern in-game phone for FiveM with apps, contacts, messaging, calls, banking hooks, and a clean OS 26 inspired interface built for roleplay servers.',
        description: 'SN Phone OS 26 brings a polished mobile experience to FiveM servers, with clean app navigation, roleplay-friendly communication flows, and configuration-first setup for server owners.',
        image: 'img/snphone.png',
        fallbackPrice: '$0.00',
        price: null,
        currency: 'USD',
        tags: ['Messages & Calls', 'App System', 'Roleplay Ready'],
        frameworks: ['ESX', 'QBCore', 'Standalone'],
        rating: { stars: 5, count: 0 },
        youtubeId: '',
        media: [
          { type: 'image', src: 'img/snphone.png', thumb: 'img/snphone.png', alt: 'SN Phone OS 26 preview' },
          { type: 'youtube', youtubeId: '', thumb: 'img/snphone.png', alt: 'SN Phone OS 26 video preview' }
        ],
        requirements: [
          'FiveM server with recent artifacts.',
          'ESX, QBCore, or standalone configuration.',
          'oxmysql if your setup uses database-backed apps.'
        ],
        resmon: {
          idle: '0.01ms',
          active: '0.03ms',
          server: '0.00ms',
          memory: '375.00KiB'
        },
        docs: {
          summary: 'Official setup notes, configuration references, and workflow tips for SN Phone OS 26.',
          heroTitle: 'SN Phone OS 26 Documentation',
          heroText: 'Set up the phone, connect your server resources, and tune the experience for your roleplay community.',
          sections: [
            {
              id: 'install',
              title: 'Install',
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
              id: 'personalization',
              title: 'Personalization',
              body: 'Most server-specific behavior should be edited from the config file. Update labels, enabled apps, framework mode, item names, and command permissions there.',
              code: "Config = {\n  Framework = 'qb',\n  Locale = 'en',\n  PhoneItem = 'phone',\n  EnableBanking = true,\n  EnableDispatch = true,\n  Debug = false\n}"
            },
            {
              id: 'integrations',
              title: 'Integrations',
              body: 'Enable only the integrations your server uses so the phone stays fast and easy to maintain.',
              list: [
                'Banking hooks for balances and transfers.',
                'Dispatch hooks for emergency or job alerts.',
                'Custom app slots for server-specific systems.'
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
        }
      },
      {
        id: 'sn-dispatch',
        tebexPackageId: 7229725,
        name: 'SN Dispatch',
        version: 'Example',
        label: 'Dispatch',
        shortDescription: 'A clean dispatch system example for FiveM teams, with alert flows, framework hooks, and configurable jobs.',
        description: 'SN Dispatch is an example product card so you can see how another script will look in the store. Replace the media, package ID, and docs with your real product when ready.',
        image: 'img/image-asset.jpg',
        fallbackPrice: '$12.00',
        price: null,
        currency: 'USD',
        tags: ['Alerts', 'Jobs', 'Configurable'],
        frameworks: ['ESX', 'QBCore'],
        rating: { stars: 5, count: 0 },
        youtubeId: '',
        media: [
          { type: 'image', src: 'img/image-asset.jpg', thumb: 'img/image-asset.jpg', alt: 'SN Dispatch preview' },
          { type: 'youtube', youtubeId: '', thumb: 'img/image-asset.jpg', alt: 'SN Dispatch video preview' }
        ],
        requirements: [
          'FiveM server with ESX or QBCore.',
          'Configured police, EMS, or custom job names.',
          'Notification or phone dispatch integration if used.'
        ],
        resmon: {
          idle: '0.00ms',
          active: '0.02ms',
          server: '0.00ms',
          memory: '220.00KiB'
        },
        docs: {
          summary: 'Example documentation structure for a second product.',
          heroTitle: 'SN Dispatch Documentation',
          heroText: 'Use this structure for install notes, personalization options, and framework integrations.',
          sections: [
            {
              id: 'install',
              title: 'Install',
              body: 'Add the dispatch resource after your framework and notification dependencies.',
              code: 'ensure qb-core\nensure sn-dispatch'
            },
            {
              id: 'personalization',
              title: 'Personalization',
              body: 'Edit job names, alert labels, blip colors, and permissions from the config file.'
            },
            {
              id: 'integrations',
              title: 'Integrations',
              body: 'Connect alerts to your phone, MDT, or emergency job resources.',
              list: [
                'Phone notification events.',
                'Police and EMS job filters.',
                'Optional custom webhook logs.'
              ]
            }
          ]
        }
      }
    ];

// Initialize variables
    const navbar = document.getElementById('navbar');
    const mobileDropdown = document.getElementById('mobileDropdown');
    let lastScrollY = 0;
    let currentDocsProductId = null;
    let currentProductId = products[0]?.id || null;
    let currentProductMediaIndex = 0;
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

    function showSiteDialog(options = {}) {
      const dialog = document.getElementById('siteDialog');
      const kicker = document.getElementById('siteDialogKicker');
      const title = document.getElementById('siteDialogTitle');
      const message = document.getElementById('siteDialogMessage');
      const confirm = document.getElementById('siteDialogConfirm');
      const cancel = document.getElementById('siteDialogCancel');

      if (!dialog || !title || !message || !confirm || !cancel) {
        console.warn(options.message || options.title || 'SN Development');
        return;
      }

      kicker.textContent = options.kicker || 'SN Development';
      title.textContent = options.title || 'Notice';
      message.textContent = options.message || '';
      confirm.textContent = options.confirmText || 'OK';
      cancel.textContent = options.cancelText || 'Cancel';
      cancel.style.display = options.cancelText ? 'inline-flex' : 'none';

      confirm.onclick = () => {
        closeSiteDialog();
        if (typeof options.onConfirm === 'function') options.onConfirm();
      };

      cancel.onclick = closeSiteDialog;
      dialog.classList.add('active');
      dialog.setAttribute('aria-hidden', 'false');
      document.body.classList.add('dialog-open');
    }

    function closeSiteDialog() {
      const dialog = document.getElementById('siteDialog');
      if (!dialog) return;
      dialog.classList.remove('active');
      dialog.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('dialog-open');
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

    function findUrlDeep(value, matcher) {
      if (!value) return null;

      if (typeof value === 'string') {
        return matcher(value) ? value : null;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          const found = findUrlDeep(item, matcher);
          if (found) return found;
        }
        return null;
      }

      if (typeof value === 'object') {
        for (const item of Object.values(value)) {
          const found = findUrlDeep(item, matcher);
          if (found) return found;
        }
      }

      return null;
    }

    function getProduct(productId) {
      return products.find(product => product.id === productId) || products[0];
    }

    function getProductByPackage(packageId) {
      return products.find(product => String(product.tebexPackageId) === String(packageId));
    }

    function formatPrice(product) {
      if (!product) return '';
      if (product.price !== null && product.price !== undefined && product.price !== '') {
        const amount = Number(product.price);
        const currency = product.currency || 'USD';

        if (!Number.isNaN(amount)) {
          try {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency
            }).format(amount);
          } catch {
            return `$${amount.toFixed(2)}`;
          }
        }

        return String(product.price);
      }

      return product.fallbackPrice || 'View price';
    }

    function getProductHash(productId) {
      return `#product-${productId}`;
    }

    function getDocsHash(productId, sectionId = '') {
      return sectionId ? `#docs-${productId}-${sectionId}` : `#docs-${productId}`;
    }

    function parseDocsHash(hash) {
      if (!hash || hash === '#docs') {
        return { productId: products[0]?.id, sectionId: '' };
      }

      const clean = hash.replace('#docs-', '');
      const product = products
        .slice()
        .sort((a, b) => b.id.length - a.id.length)
        .find(item => clean === item.id || clean.startsWith(`${item.id}-`));

      if (!product) {
        return { productId: products[0]?.id, sectionId: '' };
      }

      return {
        productId: product.id,
        sectionId: clean === product.id ? '' : clean.slice(product.id.length + 1)
      };
    }

    function savePendingBasket(ident, productId, continueCheckout = false) {
      const product = getProduct(productId);
      localStorage.setItem(tebexConfig.pendingBasketKey, JSON.stringify({
        ident,
        productId: product.id,
        packageId: product.tebexPackageId,
        continueCheckout,
        createdAt: Date.now()
      }));
    }

    function readPendingBasket() {
      try {
        const pending = JSON.parse(localStorage.getItem(tebexConfig.pendingBasketKey));
        if (!pending?.ident || !getProductByPackage(pending.packageId)) return null;

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

    function saveAuthedBasket(ident, productId) {
      const product = getProduct(productId);
      localStorage.setItem(tebexConfig.authedBasketKey, JSON.stringify({
        ident,
        productId: product.id,
        packageId: product.tebexPackageId,
        createdAt: Date.now()
      }));
    }

    function readAuthedBasket(productId) {
      try {
        const basket = JSON.parse(localStorage.getItem(tebexConfig.authedBasketKey));
        const product = getProduct(productId || basket?.productId);
        if (!basket?.ident || String(basket.packageId) !== String(product.tebexPackageId)) return null;

        const maxAge = 1000 * 60 * 30;
        if (Date.now() - basket.createdAt > maxAge) {
          localStorage.removeItem(tebexConfig.authedBasketKey);
          return null;
        }

        return basket;
      } catch {
        return null;
      }
    }

    function clearAuthedBasket() {
      localStorage.removeItem(tebexConfig.authedBasketKey);
    }

    async function createTebexBasket() {
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

      return basketIdent;
    }

    async function openFiveMLogin(continueCheckout = false, productId = currentProductId) {
      const product = getProduct(productId);

      if (!window.location.protocol.startsWith('http')) {
        showSiteDialog({
          title: 'Publish required',
          message: 'Para iniciar sesion con FiveM, primero publica la web en una URL http/https.'
        });
        return;
      }

      try {
        setPageLoader(true, 'Opening FiveM login');

        const basketIdent = await createTebexBasket();
        savePendingBasket(basketIdent, product.id, continueCheckout);

        const authReturnUrl = encodeURIComponent(getTebexReturnUrl('auth-return'));
        const auth = await tebexRequest(`/accounts/${tebexConfig.publicToken}/baskets/${basketIdent}/auth?returnUrl=${authReturnUrl}`, {
          method: 'GET'
        });

        const authLink = findUrlDeep(auth, value => value.includes('ident.tebex.io') || value.includes('/authenticate/handle'));
        if (!authLink) {
          console.log('Tebex auth response:', auth);
          throw new Error('Tebex did not return a FiveM login URL');
        }

        window.location.href = authLink;
      } catch (error) {
        setPageLoader(false);
        console.error(error);
        showSiteDialog({
          title: 'FiveM login unavailable',
          message: `No se pudo abrir el login integrado de FiveM: ${error.message}`,
          confirmText: 'Open Tebex',
          cancelText: 'Close',
          onConfirm: () => openOfficialTebexPackage(product.id)
        });
      }
    }

    function openOfficialTebexPackage(productId = currentProductId) {
      const product = getProduct(productId);
      const packageUrl = `${tebexConfig.webstoreUrl}/package/${product.tebexPackageId}`;
      clearPendingBasket();
      clearAuthedBasket();
      setPageLoader(true, 'Opening Tebex');
      window.location.href = packageUrl;
    }

    async function addPackageAndOpenCheckout(basketIdent, productId = currentProductId) {
      const product = getProduct(productId);
      setPageLoader(true, `Adding ${product.name}`);

      try {
        await tebexRequest(`/baskets/${basketIdent}/packages`, {
          method: 'POST',
          body: JSON.stringify({
            package_id: String(product.tebexPackageId),
            quantity: 1
          })
        });
      } catch (error) {
        if (error.message.toLowerCase().includes('login')) {
          clearAuthedBasket();
          await openFiveMLogin(true, product.id);
          return;
        }

        throw error;
      }

      setPageLoader(true, 'Opening checkout');
      const basket = await tebexRequest(`/accounts/${tebexConfig.publicToken}/baskets/${basketIdent}`);
      const checkoutUrl = getCheckoutUrl(basket);

      if (!checkoutUrl) {
        throw new Error('Tebex did not return a checkout URL');
      }

      clearPendingBasket();
      clearAuthedBasket();
      window.location.href = checkoutUrl;
    }

    async function startTebexCheckout(productId = currentProductId) {
      const product = getProduct(productId);
      const authedBasket = readAuthedBasket(product.id);

      if (!authedBasket) {
        await openFiveMLogin(true, product.id);
        return;
      }

      try {
        await addPackageAndOpenCheckout(authedBasket.ident, product.id);
      } catch (error) {
        setPageLoader(false);
        console.error(error);
        showSiteDialog({
          title: 'Checkout unavailable',
          message: `No se pudo iniciar el checkout integrado: ${error.message}`,
          confirmText: 'Open Tebex',
          cancelText: 'Close',
          onConfirm: () => openOfficialTebexPackage(product.id)
        });
      }
    }

    async function handleTebexReturn() {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tebex') !== 'auth-return') return;

      const pending = readPendingBasket();
      if (!pending) return;

      try {
        clearPendingBasket();
        saveAuthedBasket(pending.ident, pending.productId);

        if (pending.continueCheckout) {
          await addPackageAndOpenCheckout(pending.ident, pending.productId);
          return;
        }

        setPageLoader(false);
        showSiteDialog({
          title: 'FiveM connected',
          message: 'Sesion de FiveM conectada. Ahora puedes pulsar Buy Now para continuar.'
        });
      } catch (error) {
        setPageLoader(false);
        console.error(error);
        showSiteDialog({
          title: 'Checkout could not continue',
          message: `No se pudo continuar el checkout: ${error.message}`
        });
      }
    }

    function getSupportFormPayload(form) {
      const data = new FormData(form);
      return {
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        discord: String(data.get('discord') || '').trim(),
        product: String(data.get('product') || '').trim(),
        requestType: String(data.get('requestType') || '').trim(),
        message: String(data.get('message') || '').trim(),
        website: String(data.get('website') || '').trim(),
        pageUrl: window.location.href,
        submittedAt: new Date().toISOString()
      };
    }

    async function handleSupportFormSubmit(event) {
      event.preventDefault();

      const form = event.currentTarget;
      const submitButton = form.querySelector('button[type="submit"]');
      const payload = getSupportFormPayload(form);

      if (payload.website) return;

      if (!payload.name || !payload.email || !payload.requestType || !payload.message) {
        showSiteDialog({
          title: 'Missing information',
          message: 'Please complete name, email, request type, and message before sending.'
        });
        return;
      }

      if (!supportFormConfig.endpointUrl) {
        showSiteDialog({
          title: 'Form endpoint not configured',
          message: 'The form is ready, but it needs a secure backend URL before it can send messages to Discord. Open a Discord ticket for now.',
          confirmText: 'Open Discord',
          cancelText: 'Close',
          onConfirm: () => window.open(supportFormConfig.discordTicketUrl, '_blank', 'noopener,noreferrer')
        });
        return;
      }

      try {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        const response = await fetch(supportFormConfig.endpointUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('The support request could not be sent');
        }

        form.reset();
        showSiteDialog({
          title: 'Message sent',
          message: 'Your request was sent successfully. We will review it and reply through Discord or email.'
        });
      } catch (error) {
        console.error(error);
        showSiteDialog({
          title: 'Message not sent',
          message: 'The form could not send the request right now. Please open a Discord ticket and include the same information.'
        });
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    }

    function renderProducts() {
      const list = document.getElementById('productsList');
      if (!list) return;

      list.innerHTML = products.map((product, index) => {
        const tags = product.tags.map((tag, tagIndex) => {
          const classes = ['script-tag-green', 'script-tag-orange', 'script-tag-purple', 'script-tag-blue'];
          return `<span class="${classes[tagIndex % classes.length]}">${tag}</span>`;
        }).join('');

        return `
          <article class="script-item reveal reveal-delay-${Math.min(index + 1, 4)}">
            <div class="script-item-inner">
              <div class="script-content">
                <div class="script-heading-row">
                  <span class="script-label script-tag-blue">${product.label}</span>
                  <span class="script-price">${formatPrice(product)}</span>
                </div>
                <h3>${product.name} - ${product.version}</h3>
                <p>${product.shortDescription}</p>
                <div class="script-meta">${tags}</div>
                <div class="script-actions">
                  <button class="btn-outline" type="button" data-product-details="${product.id}">Details</button>
                  <button class="btn-primary" type="button" data-tebex-buy data-product-id="${product.id}">Buy Now</button>
                  <button class="btn-outline" type="button" data-product-docs="${product.id}">Documentation</button>
                </div>
              </div>
              <button class="script-preview script-preview-phone product-preview-button" type="button" data-product-details="${product.id}" aria-label="Open ${product.name} details">
                <img src="${product.image}" alt="${product.name} preview">
              </button>
            </div>
          </article>
        `;
      }).join('');

      initScrollReveal();
    }

    async function loadProductPrices() {
      try {
        const payload = await tebexRequest(`/accounts/${tebexConfig.publicToken}/packages`);
        const packages = payload?.data || payload || [];

        if (!Array.isArray(packages)) return;

        packages.forEach(item => {
          const product = getProductByPackage(item.id);
          if (!product) return;

          product.price = item.total_price ?? item.base_price ?? item.price ?? product.price;
          product.currency = item.currency || product.currency || 'USD';
          if (item.name) product.tebexName = item.name;
          if (item.image && product.imageFromTebex) product.image = item.image;
        });

        renderProducts();
        if (currentProductId && document.getElementById('productPage')?.classList.contains('active')) {
          renderProductDetail(currentProductId);
        }
      } catch (error) {
        console.warn('Could not load Tebex prices:', error);
      }
    }

    function getMediaEmbed(media) {
      if (!media) return '';

      if (media.type === 'youtube') {
        const id = media.youtubeId || media.src;
        if (!id) {
          return `
            <div class="product-video-placeholder">
              <img src="${media.thumb || 'img/image-asset.jpg'}" alt="${media.alt || 'Video preview'}">
              <div>
                <span>Video preview</span>
                <strong>Add a YouTube ID in app.js</strong>
              </div>
            </div>
          `;
        }

        return `
          <div class="product-video-frame">
            <iframe
              src="https://www.youtube.com/embed/${id}"
              title="${media.alt || 'Product video'}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
        `;
      }

      return `<img src="${media.src}" alt="${media.alt || 'Product preview'}">`;
    }

    function renderProductDetail(productId) {
      const product = getProduct(productId);
      const detail = document.getElementById('productDetail');
      if (!detail || !product) return;

      currentProductId = product.id;
      const media = product.media?.length ? product.media : [{ type: 'image', src: product.image, thumb: product.image, alt: product.name }];
      currentProductMediaIndex = Math.min(currentProductMediaIndex, media.length - 1);
      const activeMedia = media[currentProductMediaIndex] || media[0];
      const frameworkPills = product.frameworks.map(item => `<span>${item}</span>`).join('');
      const rating = `${'*'.repeat(product.rating?.stars || 5)} (${product.rating?.count || 0})`;
      const requirements = product.requirements.map(item => `<li>${item}</li>`).join('');

      detail.innerHTML = `
        <div class="product-detail-grid">
          <section class="product-media-column">
            <div class="product-main-media">
              ${getMediaEmbed(activeMedia)}
            </div>
            <div class="product-thumbs" aria-label="${product.name} media">
              ${media.map((item, index) => `
                <button type="button" class="${index === currentProductMediaIndex ? 'active' : ''}" data-product-media="${index}">
                  <img src="${item.thumb || item.src || product.image}" alt="${item.alt || product.name}">
                  ${item.type === 'youtube' ? '<span class="media-play">Play</span>' : ''}
                </button>
              `).join('')}
            </div>
          </section>

          <aside class="product-detail-side">
            <button class="product-back" type="button" data-main-page data-scroll-target="#scripts">Back to store</button>
            <h1>${product.name}</h1>
            <div class="product-rating">${rating}</div>
            <div class="product-frameworks">${frameworkPills}</div>
            <p class="product-detail-price">${formatPrice(product)}</p>
            <div class="product-buy-stack">
              <button class="btn-outline product-login-btn" type="button" data-tebex-login data-product-id="${product.id}">Connect FiveM</button>
              <button class="btn-primary product-buy-btn" type="button" data-tebex-buy data-product-id="${product.id}">Buy Now</button>
            </div>

            <div class="product-info-list">
              <details open>
                <summary>Description</summary>
                <p>${product.description}</p>
              </details>
              <details>
                <summary>Requirements</summary>
                <ul>${requirements}</ul>
              </details>
              <div class="product-doc-card">
                <span>Documentation</span>
                <button class="btn-outline" type="button" data-product-docs="${product.id}">Open Documentation</button>
              </div>
              <div class="product-resmon">
                <span>Resmon</span>
                <div class="resmon-grid">
                  <div><strong>${product.resmon.idle}</strong><small>Idle client</small></div>
                  <div><strong>${product.resmon.server}</strong><small>Server load</small></div>
                  <div><strong>${product.resmon.memory}</strong><small>Client memory</small></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      `;
    }

    function showSubPage(pageName, hash = `#${pageName}`, options = {}) {
      const mainPage = document.getElementById('mainPage');
      const subPages = document.querySelectorAll('.sub-page');
      const targetPage = document.getElementById(pageName + 'Page');

      if (!targetPage) return;

      if (pageName === 'docs') {
        renderDocumentation(options.productId || products[0]?.id);
        setPageLoader(true, 'Opening documentation');
      }

      if (pageName === 'product') {
        renderProductDetail(options.productId || currentProductId || products[0]?.id);
        setPageLoader(true, 'Opening details');
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
      }, (pageName === 'docs' || pageName === 'product') ? 320 : 100);

      if (pageName === 'docs' || pageName === 'product') {
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

    function renderDocumentation(productId = products[0]?.id) {
      const product = getProduct(productId);
      if (!product) return;
      if (currentDocsProductId === product.id) return;

      const title = document.getElementById('docsTitle');
      const summary = document.getElementById('docsSummary');
      const nav = document.getElementById('docsNav');
      const content = document.getElementById('docsContent');

      if (!title || !summary || !nav || !content) return;

      currentDocsProductId = product.id;
      title.textContent = product.name;
      summary.textContent = product.docs.summary;
      nav.innerHTML = '';
      content.innerHTML = '';

      const hero = document.createElement('section');
      hero.className = 'docs-hero';

      const heroTitle = document.createElement('h2');
      heroTitle.textContent = product.docs.heroTitle;

      const heroText = document.createElement('p');
      heroText.textContent = product.docs.heroText;

      hero.append(heroTitle, heroText);
      content.appendChild(hero);

      const selector = document.createElement('div');
      selector.className = 'docs-product-switcher';
      products.forEach(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = item.name;
        button.classList.toggle('active', item.id === product.id);
        button.dataset.productDocs = item.id;
        selector.appendChild(button);
      });
      nav.appendChild(selector);

      product.docs.sections.forEach((section, index) => {
        const navLink = document.createElement('a');
        navLink.href = getDocsHash(product.id, section.id);
        navLink.textContent = section.title;
        if (index === 0) {
          navLink.classList.add('active');
        }
        nav.appendChild(navLink);

        const article = document.createElement('section');
        article.className = 'docs-section';
        article.id = `docs-${product.id}-${section.id}`;

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
    }

    function openHashTarget(hash) {
      if (!hash) return;

      if (hash === '#docs' || hash.startsWith('#docs-')) {
        const docsTarget = parseDocsHash(hash);
        showSubPage('docs', hash, { productId: docsTarget.productId });
        updateNavState('#docs');

        if (docsTarget.sectionId) {
          setTimeout(() => {
            const sectionHash = getDocsHash(docsTarget.productId, docsTarget.sectionId);
            const target = document.querySelector(sectionHash);
            document.querySelectorAll('.docs-nav a').forEach(navLink => {
              navLink.classList.toggle('active', navLink.getAttribute('href') === sectionHash);
            });
            if (target) {
              smoothScrollTo(getScrollTargetPosition(target, 118), 850);
            }
          }, 760);
        }

        return;
      }

      if (hash.startsWith('#product-')) {
        const productId = hash.replace('#product-', '');
        const product = getProduct(productId);
        if (currentProductId !== product.id) currentProductMediaIndex = 0;
        showSubPage('product', getProductHash(product.id), { productId: product.id });
        updateNavState('#scripts');
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

      document.getElementById('supportForm')?.addEventListener('submit', handleSupportFormSubmit);

      document.addEventListener('click', event => {
        const subPageButton = event.target.closest('[data-sub-page]');
        if (subPageButton) {
          showSubPage(subPageButton.dataset.subPage);
          return;
        }

        const mainPageButton = event.target.closest('[data-main-page]');
        if (mainPageButton) {
          const targetHash = mainPageButton.dataset.scrollTarget || '';
          showMainPage(targetHash);
          if (targetHash) {
            setTimeout(() => {
              const target = document.querySelector(targetHash);
              if (target) smoothScrollTo(getScrollTargetPosition(target, 100), 700);
            }, 180);
          }
          return;
        }

        const detailButton = event.target.closest('[data-product-details]');
        if (detailButton) {
          const product = getProduct(detailButton.dataset.productDetails);
          if (currentProductId !== product.id) currentProductMediaIndex = 0;
          openHashTarget(getProductHash(product.id));
          return;
        }

        const docsButton = event.target.closest('[data-product-docs]');
        if (docsButton) {
          const product = getProduct(docsButton.dataset.productDocs);
          openHashTarget(getDocsHash(product.id));
          return;
        }

        const mediaButton = event.target.closest('[data-product-media]');
        if (mediaButton) {
          currentProductMediaIndex = Number(mediaButton.dataset.productMedia) || 0;
          renderProductDetail(currentProductId);
          return;
        }

        const buyButton = event.target.closest('[data-tebex-buy]');
        if (buyButton) {
          startTebexCheckout(buyButton.dataset.productId || currentProductId);
          return;
        }

        const loginButton = event.target.closest('[data-tebex-login]');
        if (loginButton) {
          openFiveMLogin(false, loginButton.dataset.productId || currentProductId);
        }
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

      document.getElementById('siteDialog')?.addEventListener('click', event => {
        if (event.target.id === 'siteDialog') closeSiteDialog();
      });

      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeSiteDialog();
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

        if (href === '#docs' || href.startsWith('#docs-') || href.startsWith('#product-')) {
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
      renderProducts();
      initScrollReveal();
      animateCounters();
      initNavActive();
      openHashTarget(window.location.hash);
      handleTebexReturn();
      loadProductPrices();
    });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;

      if (hash === '#docs' || hash.startsWith('#docs-') || hash.startsWith('#product-')) {
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

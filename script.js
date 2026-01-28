// script.js - CLEAN VERSION

document.addEventListener('DOMContentLoaded', () => {
    // Show production popup on page load
    showProductionPopup();

    /* ====================================================
       EDIT GUIDE
       - PROJECTS: edit the `PROJECTS` array in the CONFIG section below
       - EPAT_CERTIFICATES: edit the `EPAT_CERTIFICATES` array to change certificate list
       - Visual tweaks: edit `style.css`
       ==================================================== */
    
    // --- 1. CONFIGURATION DATA ---
    const SKILLS = [
        { symbol: "PYTHON", basePrice: 9.8, up: true },
        { symbol: "C++", basePrice: 9.2, up: true },
        { symbol: "PYTORCH", basePrice: 8.9, up: true },
        { symbol: "TENSORFLOW", basePrice: 8.5, up: true },
        { symbol: "SQL", basePrice: 9.0, up: true },
        { symbol: "HADOOP", basePrice: 8.2, up: true },
        { symbol: "MATHS", basePrice: 8.7, up: true },
        { symbol: "FINANCE", basePrice: 8.8, up: true },
        { symbol: "EXCEL", basePrice: 9.9, up: true },
        { symbol: "JAVA", basePrice: 8.5, up: true },
        { symbol: "HTML", basePrice: 9.5, up: true },
    ];

    /* --- PROJECTS (EDIT HERE) ---
       Each project is an object with fields: title, type, description, tech (array), stats (object), links (object), top (boolean).
       Edit or add projects here to change the Project portfolio. */
    const PROJECTS = [
        {
            title: "Market Microstructure Analyzer",
            type: "HFT SYSTEM",
            description: "Real-time order book reconstruction and visualization engine. Detects iceberg orders and liquidity imbalances using statistical arbitrage signals.",
            tech: ["C++", "Python", "WebSocket"],
            stats: { "Latency": "< 10ms", "Throughput": "50k msg/s", "Status": "LIVE" },
                links: { code: "https://github.com", live: "https://example.com", youtube: "https://www.youtube.com/@narayanrakhecha2376" },
            top: true
        },
        {
            title: "Options Volatility Surface",
            type: "DERIVATIVES",
            description: "Volatility Smile modeling engine for SPY options. Uses Black-Scholes and Brent's method to calculate implied volatility, fits Cubic Spline curves to detect mispricings, and executes mean-reversion trades via Straddle/Butterfly spreads. Includes synthetic backtest engine simulating 5+ years of market data with automated kink detection.",
            tech: ["Python", "NumPy", "Pandas", "SciPy", "Matplotlib", "yfinance"],
            stats: { "Backtest Period": "5Y+", "Curve Fit": "Cubic Spline", "Status": "BETA" },
                links: { code: "https://github.com/GodSpeedn/Trading-options-using-volatility-smile-", live: "https://colab.research.google.com/drive/1uTI3Wsf5MtzCgs1FKkPKpRBwNfRFPICW?authuser=2", youtube: "https://www.youtube.com/@narayanrakhecha2376" },
            top: true
        },
        {
            title: "Trading Markets using Futures OI",
            type: "QUANT STRATEGY",
            description: "Backtests a strategy that trades spot assets based on price trends confirmed by Futures Open Interest (OI) momentum. Combines SMA crossovers on spot price with OI filters to generate signals. Entry/exit rules use price, OI, and expiry logic. Reveals the importance of regime filtering and risk management in quant trading.",
            tech: ["Python", "Pandas", "Matplotlib"],
            stats: { "Total Trades": "231", "Win Ratio": "~0.35", "Status": "BACKTESTED" },
                links: { code: "https://github.com/GodSpeedn/Trading-in-spot-market-using-futures-data-", live: "https://colab.research.google.com/drive/183f2AR2L9sDpznVUHFpxQ-8seFJIDdvf?authuser=2", youtube: "https://www.youtube.com/@narayanrakhecha2376" },
            top: true
        },
        {
            title: "DeFi Liquidity Aggregator",
            type: "BLOCKCHAIN",
            description: "Smart contract interface aggregating liquidity across Uniswap, Sushiswap, and Curve to find optimal token swap routes with minimal slippage.",
            tech: ["Solidity", "Ethers.js", "GraphQ"],
            stats: { "Gas Saved": "15%", "TVL": "$40k", "Status": "DEPLOYED" },
                links: { code: "https://github.com", live: "https://example.com", youtube: "https://www.youtube.com/@narayanrakhecha2376" },
            top: false
        },
        {
            title: "Sentiment Analysis Engine",
            type: "NLP / DATA",
            description: "Pipelines scraping Twitter and Reddit financial discussions to generate sentiment scores for meme-stocks and correlating them with volume spikes.",
            tech: ["Python", "NLTK", "Kafka"],
            stats: { "Accuracy": "82%", "Sources": "4", "Status": "OFFLINE" },
                links: { code: "https://github.com", live: "https://example.com", youtube: "https://www.youtube.com/@narayanrakhecha2376" },
            top: false
        },
        {
            title: "Portfolio Optimizer V2",
            type: "QUANT",
            description: "Mean-variance optimization engine using Monte Carlo simulations to construct efficient frontiers for diversified asset baskets.",
            tech: ["R", "Shiny", "C++"],
            stats: { "Assets": "500+", "Speed": "2ms", "Status": "ARCHIVE" },
                links: { code: "https://github.com", live: "https://example.com", youtube: "https://www.youtube.com/@narayanrakhecha2376" },
            top: false
        }
    ];

    /* --- EPAT CERTIFICATES (EDIT HERE) ---
       Update this array to change which certificates appear in the EPAT card.
       Keep each item as a simple string. Example:
         'EPAT Certificate — Algorithmic Trading'
       ------------------------------------------ */
    const EPAT_CERTIFICATES = [
        'EPAT Certificate — Algorithmic Trading',
        'Algorithmic Strategies & Execution — Distinction',
        'Capstone: Live Market-Making Project'
    ];


    // --- 2. INITIALIZATION ---
    if (typeof lucide !== 'undefined') lucide.createIcons();

    
    // --- 3. CORE FEATURES ---

    // A. Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if(cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
        
        // Hover state
        const target = e.target;
        const isClickable = window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'BUTTON' || target.tagName === 'A';
        if (isClickable && cursor) {
            cursor.classList.add('hovering');
        } else if (cursor) {
            cursor.classList.remove('hovering');
        }
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        if(cursorTrail) {
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
        }
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // B. Clock
    function updateClock() {
        const clockEl = document.getElementById('clock');
        if (!clockEl) return;
        
        const now = new Date();
        const options = { timeZone: 'Australia/Sydney', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        clockEl.innerText = now.toLocaleTimeString('en-US', options);
    }
    setInterval(updateClock, 1000);
    updateClock();

    // C. Ticker
    const tickerContent = document.getElementById('ticker-content');
    if (tickerContent) {
        const mixedSkills = [...SKILLS].sort(() => Math.random() - 0.5);
        
        function renderTicker() {
            // Duplicate list 3 times for smooth scroll
            const displayList = [...mixedSkills, ...mixedSkills, ...mixedSkills];
            const html = displayList.map(skill => {
                const fluctuation = (Math.random() * 0.1) - 0.05; 
                let price = Math.max(0.1, Math.min(10.0, skill.basePrice + fluctuation)).toFixed(2);
                const colorClass = skill.up ? 'text-green' : 'text-red';
                const arrow = skill.up ? '▲' : '▼';
                
                return `<div class="ticker-item"><span class="text-bold">${skill.symbol}</span><span class="${colorClass} ml-2">${arrow} ${price}%</span></div>`;
            }).join('');
            tickerContent.innerHTML = html;
        }
        renderTicker();
        setInterval(renderTicker, 3000);
    }

    // D. Chart.js
    const canvas = document.getElementById('marketChart');
    if (canvas && typeof Chart !== 'undefined') {
        const ctx = canvas.getContext('2d');
        const marketChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array(50).fill(''),
                datasets: [{
                    data: Array(50).fill(100).map(() => 100 + Math.random() * 10),
                    borderColor: '#22c55e',
                    borderWidth: 2,
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(34, 197, 94, 0.2)');
                        gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false, min: 80, max: 120 } },
                animation: { duration: 0 }
            }
        });

        setInterval(() => {
            const currentData = marketChart.data.datasets[0].data;
            const newVal = currentData[currentData.length - 1] + (Math.random() * 2) - 1;
            currentData.push(newVal);
            currentData.shift();
            marketChart.update('none');
            
            const priceEl = document.getElementById('live-price');
            if(priceEl) {
                priceEl.innerText = newVal.toFixed(2);
                priceEl.className = newVal > currentData[currentData.length - 2] ? 'text-green' : 'text-red';
            }
        }, 100);
    }

    // E. Project Filter
    const projectsContainer = document.getElementById('projects-container');
    const projectsMarquee = document.getElementById('projects-marquee');
    const marqueeTrack = document.getElementById('marquee-track');
    const btnTop = document.getElementById('btn-top');
    const btnAll = document.getElementById('btn-all');

    window.filterProjects = function(type) {
        if (type === 'TOP') {
            if(btnTop) btnTop.classList.add('active');
            if(btnAll) btnAll.classList.remove('active');
            if(projectsContainer) projectsContainer.classList.remove('hidden');
            if(projectsMarquee) projectsMarquee.classList.add('hidden');
            
            // Render Grid
            if(projectsContainer) {
                projectsContainer.innerHTML = PROJECTS.filter(p => p.top).map(p => createProjectCard(p)).join('');
            }
        } else {
            if(btnTop) btnTop.classList.remove('active');
            if(btnAll) btnAll.classList.add('active');
            if(projectsContainer) projectsContainer.classList.add('hidden');
            if(projectsMarquee) projectsMarquee.classList.remove('hidden');
            
            // Render Marquee
            if(marqueeTrack) {
                const allProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];
                marqueeTrack.innerHTML = allProjects.map(p => createProjectCard(p, true)).join('');
            }
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // createProjectCard: renders a single project object into HTML
    // To change displayed projects, edit the `PROJECTS` array at the top of this file.
    function createProjectCard(proj, isCompact = false) {
        const techStack = proj.tech.slice(0, isCompact ? 2 : 3).map(t => `<span class="tech-tag">#${t}</span>`).join('');
        const randomPnL = (Math.random() * 100).toFixed(2);
        
        return `
            <div class="project-card ${isCompact ? 'compact-card' : ''}" onclick="window.openProjectModal(event, ${PROJECTS.indexOf(proj)})">
                <div class="card-indicator">● RUNNING</div>
                <div class="pnl-overlay">
                    <span class="stat-label">SIMULATED PnL</span>
                    <span class="text-green font-bold">+${randomPnL} USD</span>
                </div>
                <div class="proj-header">
                    <div class="proj-icon"><i data-lucide="cpu" class="icon-sm"></i></div>
                    ${!isCompact ? `<div class="proj-type">${proj.type}</div>` : ''}
                </div>
                <h3>${proj.title}</h3>
                <p class="proj-desc">${proj.description}</p>
                ${!isCompact ? `<div class="proj-stats">${Object.entries(proj.stats).map(([k, v]) => `<div class="stat-group"><span class="stat-label">${k.toUpperCase()}</span><span class="stat-val">${v}</span></div>`).join('')}</div>` : ''}
                <div class="proj-footer">
                    <div class="tech-stack">${techStack}</div>
                    <div class="proj-links"><a href="${proj.links.code}" class="proj-link" onclick="event.stopPropagation();"><i data-lucide="github" class="icon-sm"></i></a></div>
                </div>
            </div>`;
    }

    // Initialize Projects
    window.filterProjects('TOP');

    // F. Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const menuText = document.getElementById('menu-text');
    let isMenuOpen = false;

    window.toggleMobileMenu = function() {
        isMenuOpen = !isMenuOpen;
        if(mobileMenu) mobileMenu.classList.toggle('open', isMenuOpen);
        if(menuText) menuText.innerText = isMenuOpen ? 'CLOSE' : 'MENU';
    }

    window.scrollToSection = function(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            if (isMenuOpen) toggleMobileMenu();
        }
    }

    // G. Project Detail Modal
    let currentMarqueeScroll = 0;
    
    window.openProjectModal = function(event, projIndex) {
        event.preventDefault();
        event.stopPropagation();
        
        const proj = PROJECTS[projIndex];
        const modal = document.getElementById('project-detail-modal');
        
        if (!modal) return;
        
        // Populate modal with project details
        const titleEl = document.getElementById('project-modal-title');
        const typeEl = document.getElementById('project-modal-type');
        const descEl = document.getElementById('project-modal-desc');
        const statsEl = document.getElementById('project-modal-stats');
        const techEl = document.getElementById('project-modal-tech');
        const codeLink = document.getElementById('project-link-code');
        const liveLink = document.getElementById('project-link-live');
        const youtubeLink = document.getElementById('project-link-youtube');
        
        titleEl.innerText = proj.title;
        typeEl.innerText = proj.type;
        descEl.innerText = proj.description;
        
        // Populate stats
        statsEl.innerHTML = Object.entries(proj.stats).map(([k, v]) => 
            `<div class="stat-group"><span class="stat-label">${k.toUpperCase()}</span><span class="stat-val">${v}</span></div>`
        ).join('');
        
        // Populate tech stack
        techEl.innerHTML = proj.tech.map(t => `<span class="tech-tag">#${t}</span>`).join('');
        
        // Set links
        codeLink.href = proj.links.code;
        codeLink.style.display = proj.links.code !== '#' ? 'flex' : 'none';
        
        liveLink.href = proj.links.live;
        liveLink.style.display = proj.links.live !== '#' ? 'flex' : 'none';
        
        youtubeLink.href = proj.links.youtube || '#';
        youtubeLink.style.display = proj.links.youtube && proj.links.youtube !== '#' ? 'flex' : 'none';
        
        // Show modal
        modal.classList.remove('hidden');
        modal.classList.add('open');
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    
    window.closeProjectModal = function() {
        const modal = document.getElementById('project-detail-modal');
        if (modal) {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 280);
        }
    }
    
    // Modal close button and overlay
    const projectModal = document.getElementById('project-detail-modal');
    const projectModalClose = document.getElementById('project-modal-close');
    const projectModalOverlay = document.getElementById('project-modal-overlay');
    
    if (projectModalClose) {
        projectModalClose.addEventListener('click', window.closeProjectModal);
    }
    
    if (projectModalOverlay) {
        projectModalOverlay.addEventListener('click', window.closeProjectModal);
    }
    
    // H. Marquee Navigation (Archive view)
    const marqueeTrackNav = document.getElementById('marquee-track');
    const marqueeNext = document.getElementById('marquee-next');
    const marqueePrev = document.getElementById('marquee-prev');
    let marqueeAutoPlayTimeout;
    
    const resumeMarqueeAutoplay = () => {
        if (marqueeTrackNav) {
            marqueeTrackNav.style.animation = 'marquee-cards 40s linear infinite';
            currentMarqueeScroll = 0;
            marqueeTrackNav.style.transform = 'translateX(0)';
        }
    };
    
    if (marqueeNext && marqueeTrackNav) {
        marqueeNext.addEventListener('click', () => {
            currentMarqueeScroll += 340; // Card width + gap
            marqueeTrackNav.style.transform = `translateX(-${currentMarqueeScroll}px)`;
            marqueeTrackNav.style.animation = 'none';
            
            // Clear existing timeout and set new one
            clearTimeout(marqueeAutoPlayTimeout);
            marqueeAutoPlayTimeout = setTimeout(resumeMarqueeAutoplay, 3000); // Resume after 3 seconds
        });
    }
    
    if (marqueePrev && marqueeTrackNav) {
        marqueePrev.addEventListener('click', () => {
            currentMarqueeScroll = Math.max(0, currentMarqueeScroll - 340);
            marqueeTrackNav.style.transform = `translateX(-${currentMarqueeScroll}px)`;
            marqueeTrackNav.style.animation = 'none';
            
            // Clear existing timeout and set new one
            clearTimeout(marqueeAutoPlayTimeout);
            marqueeAutoPlayTimeout = setTimeout(resumeMarqueeAutoplay, 3000); // Resume after 3 seconds
        });
    }

    /* --- 4. EPAT DROPDOWN (THE FIX) ---
       This in-card dropdown renders the EPAT certificates listed in `EPAT_CERTIFICATES`.
       Edit `EPAT_CERTIFICATES` at the top of the file to change displayed items.
       NOTE: A modal block exists in `index.html`, but it is optional and not required by this logic.
       -------------------------------------------- */
    const epatToggle = document.getElementById('epat-toggle');
    const epatPanel = document.getElementById('epat-panel');
    const certList = epatPanel ? epatPanel.querySelector('.cert-list') : null;

    // 1. Populate the list
    if (certList && typeof EPAT_CERTIFICATES !== 'undefined') {
        certList.innerHTML = EPAT_CERTIFICATES.map(c => `<li>${c}</li>`).join('');
    }

    // 2. Add Click Listener
    if (epatToggle && epatPanel) {
        // EPAT ready — debug logs can be removed in production
        console.log("EPAT System: Ready"); // Debug (safe to delete)

        epatToggle.addEventListener('click', (e) => {
            // Prevent any other click effects
            e.preventDefault();
            e.stopPropagation();
            
            console.log("EPAT Clicked"); // Debug log

            // Toggle Open State
            const isOpening = !epatPanel.classList.contains('open');
            
            epatPanel.classList.toggle('open');
            epatToggle.classList.toggle('open');
            epatToggle.classList.remove('pulsing'); // Stop animation on first click

            // Animate Height manually to ensure smooth transition
            if (isOpening) {
                epatPanel.style.maxHeight = epatPanel.scrollHeight + "px";
            } else {
                epatPanel.style.maxHeight = "0px";
            }
        });
    } else {
        console.error("EPAT Error: Toggle button or Panel not found in HTML");
    }

});

// Production Popup Functions
function showProductionPopup() {
    const popup = document.getElementById('production-popup');
    if (popup) {
        popup.classList.remove('hidden');
    }
}

function closeProductionPopup() {
    const popup = document.getElementById('production-popup');
    if (popup) {
        popup.classList.add('hidden');
    }
}
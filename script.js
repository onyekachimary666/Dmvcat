/* ===================================
   $DMVCAT Website JavaScript
   Modern functionality
   =================================== */

(function() {
    'use strict';

    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const walletConnectBtn = document.getElementById('wallet-connect');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopBtn = document.getElementById('back-to-top');
    const contractAddress = document.getElementById('contract-address');
    const copyButton = document.getElementById('copy-button');
    const copyCaShort = document.getElementById('copy-ca-short');

    // ==================================
    // Theme Toggle (Dark/Light Mode)
    // ==================================
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon animation
        themeToggle.classList.add('toggled');
        setTimeout(() => themeToggle.classList.remove('toggled'), 300);
        
        // Update DexScreener iframe theme if loaded
        if (window.updateDexScreenerTheme) {
            window.updateDexScreenerTheme();
        }
        
        // Update tokenomics chart theme
        if (window.initTokenomicsChart) {
            window.initTokenomicsChart();
        }
    }

    if (themeToggle) {
        initTheme();
        themeToggle.addEventListener('click', toggleTheme);
    }

    // ==================================
    // Mobile Navigation Toggle
    // ==================================
    function toggleNav() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('open');
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==================================
    // Wallet Connection (Placeholder for Web3)
    // ==================================
    function connectWallet() {
        // Check for Solana wallet provider
        if (window.solana && window.solana.isPhantom) {
            // Phantom wallet detected
            window.solana.connect({ onlyIfTrusted: false })
                .then(({ publicKey }) => {
                    alert(`Connected: ${publicKey.toBase58()}`);
                    walletConnectBtn.innerHTML = `<span class="wallet-text">${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-4)}</span>`;
                })
                .catch(err => {
                    console.error('Wallet connection failed:', err);
                    alert('Connection cancelled or failed');
                });
        } else {
            // No wallet found - open Phantom install
            alert('Phantom wallet not found. Please install Phantom to connect.');
            window.open('https://phantom.app/', '_blank');
        }
    }

    if (walletConnectBtn) {
        walletConnectBtn.addEventListener('click', connectWallet);
    }

    // ==================================
    // Back to Top Button
    // ==================================
    function initBackToTop() {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (backToTopBtn) {
        initBackToTop();
    }

    // ==================================
    // Copy to Clipboard
    // ==================================
    async function copyToClipboard(text, element) {
        try {
            await navigator.clipboard.writeText(text);
            
            // Visual feedback
            element.classList.add('copied');
            
            // Reset after 2 seconds
            setTimeout(() => {
                element.classList.remove('copied');
            }, 2000);
            
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            
            // Fallback for older browsers
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                
                document.execCommand('copy');
                element.classList.add('copied');
                setTimeout(() => element.classList.remove('copied'), 2000);
                return true;
            } catch (fallbackErr) {
                console.error('Fallback copy failed:', fallbackErr);
                return false;
            } finally {
                if (textArea && textArea.parentNode) {
                    document.body.removeChild(textArea);
                }
            }
        }
    }

    function setupCopyButtons() {
        const copyButtons = [
            { buttonId: 'copy-button' },
            { buttonId: 'copy-ca-short' }
        ];

        copyButtons.forEach(({ buttonId }) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const text = contractAddress.textContent.trim();
                    if (text && !text.includes('TBD') && !text.includes('Will be updated')) {
                        await copyToClipboard(text, button);
                    }
                });

                // Keyboard accessibility
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        button.click();
                    }
                });
            }
        });
    }

    // ==================================
    // Intersection Observer for Animations
    // ==================================
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections for fade-in animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    // ==================================
    // Initialize on DOM Ready
    // ==================================
    document.addEventListener('DOMContentLoaded', function() {
        setupCopyButtons();
        initAnimations();
        
        // Check and load DexScreener widget if contract is available
        checkAndLoadDexScreener();
        
        // Initialize tokenomics chart
        if (document.getElementById('tokenomicsChart')) {
            window.initTokenomicsChart();
        }
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Ensure external links have proper security attributes
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            if (!link.getAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
                const currentRel = link.getAttribute('rel') || '';
                link.setAttribute('rel', currentRel + ' noopener noreferrer');
            }
        });
        
        // FAQ keyboard accessibility
        document.querySelectorAll('.faq-item summary').forEach(summary => {
            summary.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    summary.click();
                }
            });
        });
        
        // Hero section animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
    });

    // ==================================
    // DexScreener Widget Loader
    // ==================================
    window.loadDexScreenerWidget = function(pairAddress) {
        const container = document.getElementById('chart-container');
        const embedContainer = document.getElementById('dexscreener-embed');
        
        if (container && embedContainer && pairAddress) {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            
            embedContainer.innerHTML = `
                <iframe
                    id="dexscreener-iframe"
                    src="https://dexscreener.com/solana/${pairAddress}?embed=1&theme=${currentTheme}&trades=0&info=0"
                    style="width: 100%; height: 600px; border: 0; border-radius: 12px;"
                    title="DexScreener Trading Chart for $DMVCAT"
                    allow="clipboard-write"
                    loading="lazy"
                ></iframe>
            `;
            
            // Hide placeholder when chart loads
            container.style.display = 'none';
            embedContainer.style.display = 'block';
        }
    };

    // Update DexScreener theme when site theme changes
    window.updateDexScreenerTheme = function() {
        const iframe = document.getElementById('dexscreener-iframe');
        if (iframe) {
            const currentSrc = iframe.src;
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newSrc = currentSrc.replace(/theme=(dark|light)/, `theme=${currentTheme}`);
            
            if (currentSrc !== newSrc) {
                iframe.src = newSrc;
            }
        }
    };

    // Auto-load DexScreener if contract address is set
    function checkAndLoadDexScreener() {
        const contractText = contractAddress?.textContent.trim();
        
        // Check if valid Solana address (base58, typically 32-44 chars)
        if (contractText &&
            !contractText.includes('TBD') &&
            !contractText.includes('Will be updated') &&
            contractText.length >= 32) {
            
            // Try to load with the contract address as pair address
            // Note: In production, you may want to use a specific pair address
            // that corresponds to the liquidity pool (e.g., DMVCAT-SOL pair)
            window.loadDexScreenerWidget(contractText);
        }
    }

    // Tokenomics Chart (Canvas)
    window.initTokenomicsChart = function() {
        const canvas = document.getElementById('tokenomicsChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Responsive canvas
        function resizeCanvas() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = 200;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Draw simple pie chart simulation
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        
        const colors = isDark ? ['#ff5b45', '#4caf50', '#2196f3', '#9c27b0'] : ['#ff5b45', '#8bc34a', '#03a9f4', '#9c27b0'];
        
        // Draw sectors
        const values = [50, 25, 15, 10]; // Example distribution
        const total = values.reduce((a, b) => a + b, 0);
        let startAngle = -Math.PI / 2;
        
        ctx.clearRect(0, 0, width, height);
        
        values.forEach(value => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[values.indexOf(value)];
            ctx.fill();
            
            startAngle += sliceAngle;
        });
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
        ctx.fillStyle = isDark ? '#1a1d23' : '#ffffff';
        ctx.fill();
        
        // Draw text
        ctx.fillStyle = isDark ? '#e3e8ef' : '#1c231f';
        ctx.font = 'bold 20px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('500M', centerX, centerY);
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillText('Total Supply', centerX, centerY + 20);
    };

})();

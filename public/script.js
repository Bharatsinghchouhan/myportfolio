// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.skill-progress');
const attributeBars = document.querySelectorAll('.attr-fill');
const contactForm = document.querySelector('.contact-form');
const ctaButton = document.querySelector('.cta-button');
const terminalOutput = document.querySelector('.terminal-output');

// Loading Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
});

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Scroll-based Navigation Active State
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Skill Bar Animations
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
            bar.style.width = targetWidth + '%';
        }
    });
};

// Attribute Bar Animations
const animateAttributeBars = () => {
    attributeBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
            bar.style.width = targetWidth + '%';
        }
    });
};

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 500);
            }
            
            // Animate attribute bars when about section is visible
            if (entry.target.id === 'about') {
                setTimeout(animateAttributeBars, 500);
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typing Effect for Hero Subtitle
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Particle System Enhancement
const createParticles = () => {
    const particleSystem = document.querySelector('.particle-system');
    if (particleSystem) {
        // Create additional floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #ff0040;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${10 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                opacity: ${0.3 + Math.random() * 0.7};
            `;
            particleSystem.appendChild(particle);
        }
    }
};

// Initialize particles
createParticles();

// CTA Button Click Handler
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Terminal Command Simulation
const terminalCommands = [
    'Initializing secure connection...',
    'Establishing encrypted channel...',
    'Loading contact protocols...',
    'System ready for transmission...',
    'Awaiting your message...'
];

const simulateTerminalOutput = () => {
    if (terminalOutput) {
        terminalOutput.innerHTML = '';
        
        terminalCommands.forEach((command, index) => {
            setTimeout(() => {
                const outputLine = document.createElement('div');
                outputLine.className = 'output-line';
                outputLine.innerHTML = `
                    <span class="prompt">$</span>
                    <span class="command">${command}</span>
                `;
                terminalOutput.appendChild(outputLine);
            }, index * 800);
        });
    }
};

// Contact Form Handler
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>TRANSMISSION COMPLETE</span>';
            
            // Add success message to terminal
            const successLine = document.createElement('div');
            successLine.className = 'output-line';
            successLine.innerHTML = `
                <span class="prompt">$</span>
                <span class="command" style="color: #00ff00;">Message transmitted successfully!</span>
            `;
            terminalOutput.appendChild(successLine);
            
            // Reset form
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 2000);
    });
}

// Project Card Hover Effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Action Button Handlers
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.textContent.toLowerCase();
        
        // Simulate different actions
        if (action === 'view') {
            // Add glow effect
            btn.style.boxShadow = '0 0 20px #ff0040';
            setTimeout(() => {
                btn.style.boxShadow = '';
            }, 300);
        } else if (action === 'code') {
            // Add different glow
            btn.style.boxShadow = '0 0 20px #00ff00';
            setTimeout(() => {
                btn.style.boxShadow = '';
            }, 300);
        }
    });
});

// Enhanced Button Hover Effects
const addButtonEffects = () => {
    const buttons = document.querySelectorAll('button, .nav-link, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
};

// Initialize button effects
addButtonEffects();

// Glitch Effect for Title
const glitchEffect = () => {
    const glowText = document.querySelector('.glow-text');
    if (glowText) {
        setInterval(() => {
            glowText.style.textShadow = `
                0 0 20px #ff0040,
                0 0 30px #ff0040,
                0 0 40px #ff0040,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px #ff0040
            `;
            
            setTimeout(() => {
                glowText.style.textShadow = '0 0 20px #ff0040';
            }, 100);
        }, 3000 + Math.random() * 2000);
    }
};

// Initialize glitch effect
glitchEffect();

// Simulate terminal on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        simulateTerminalOutput();
    }, 4000);
});

// Add scroll parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.grid-overlay, .particle-system');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced form input effects
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Status dot animation
const statusDot = document.querySelector('.status-dot');
if (statusDot) {
    setInterval(() => {
        statusDot.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px #00ff00`;
    }, 2000);
}

// Dynamic quest rewards animation
const rewards = document.querySelectorAll('.reward');
rewards.forEach((reward, index) => {
    reward.addEventListener('mouseenter', () => {
        reward.style.transform = 'scale(1.1) rotate(5deg)';
        reward.style.boxShadow = '0 0 15px #ff0040';
    });
    
    reward.addEventListener('mouseleave', () => {
        reward.style.transform = 'scale(1) rotate(0deg)';
        reward.style.boxShadow = '';
    });
});

// Loading progress simulation
const loadingProgress = document.querySelector('.loading-progress');
if (loadingProgress) {
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
}

// Console styling for developer mode
console.log('%c🎮 GAMING PORTFOLIO LOADED 🎮', 'color: #ff0040; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ff0040;');
console.log('%cBharat Singh Chouhan - Full Stack Developer', 'color: #ffffff; font-size: 14px;');
console.log('%cLevel: 99 | EXP: ∞ | Rank: Expert', 'color: #ff0040; font-size: 12px;');
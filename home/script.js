// Home page specific JavaScript

// Cursor trail effect for Alexander Dial's portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Only apply cursor effect to sections with the cursor-effect class
    const cursorCanvas = document.getElementById('cursor-canvas');
    
    if (!cursorCanvas) return;
    
    const ctx = cursorCanvas.getContext('2d');
    const cursor = {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0
    };
    
    // Trail particles array
    const particles = [];
    const particleCount = 15;
    const colors = [
        '#3b82f6', // blue
        '#10b981', // green
        '#8b5cf6', // purple
        '#f59e0b', // amber
        '#ef4444'  // red
    ];
    
    // Resize canvas to match section size
    function resizeCanvas() {
        const section = cursorCanvas.parentElement;
        cursorCanvas.width = section.offsetWidth;
        cursorCanvas.height = section.offsetHeight;
    }
    
    // Initialize canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Track cursor position
    document.addEventListener('mousemove', function(e) {
        const rect = cursorCanvas.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        const scrollY = window.scrollY;
        
        // Only track cursor if it's within the section with the effect
        if (scrollY >= sectionTop && scrollY <= sectionBottom) {
            cursor.x = e.clientX - rect.left;
            cursor.y = e.clientY - rect.top + (scrollY - sectionTop);
            
            // Add new particles when mouse moves
            if (Math.abs(cursor.x - cursor.lastX) > 5 || Math.abs(cursor.y - cursor.lastY) > 5) {
                addParticle(cursor.x, cursor.y);
                cursor.lastX = cursor.x;
                cursor.lastY = cursor.y;
            }
        }
    });
    
    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 15 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.life = 100;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size = Math.max(0, this.size - 0.2);
            this.life -= 1;
        }
        
        draw() {
            ctx.globalAlpha = this.life / 100;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Add a new particle
    function addParticle(x, y) {
        if (particles.length < particleCount) {
            particles.push(new Particle(x, y));
        } else {
            // Replace oldest particle
            particles.shift();
            particles.push(new Particle(x, y));
        }
    }
    
    // Animation loop
    function animate() {
        // Clear the canvas completely instead of using semi-transparent fill
        ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Remove dead particles
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
});

// Navigation active state based on current URL
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    // Get current path
    const currentPath = window.location.pathname;
    
    // Set active link based on current path
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('border-primary');
        
        // Add active class to current path link
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('border-primary');
        }
    });
});

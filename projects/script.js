// Projects page specific JavaScript

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

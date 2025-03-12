// Contact page specific JavaScript

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

// Update current time
function updateTime() {
    const now = new Date();
    const options = { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true
    };
    const timeString = now.toLocaleTimeString('en-US', options);
    
    // Get timezone offset in hours
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = Math.abs(offsetMinutes / 60);
    const offsetSign = offsetMinutes <= 0 ? '+' : '-';
    
    document.getElementById('time-value').textContent = 
        `${timeString} (EST ${offsetSign}${offsetHours})`;
}

// Update time immediately and then every second
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 1000);
});

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contact-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('form-status');
        const statusMessage = document.getElementById('status-message');
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        try {
            // Show loading state
            formStatus.classList.remove('hidden');
            statusMessage.textContent = 'Sending message...';
            statusMessage.className = 'py-2 px-4 rounded-lg inline-block bg-blue-100 text-blue-800';
            
            // Send form data to server
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Show success message
                statusMessage.textContent = 'Message sent successfully!';
                statusMessage.className = 'py-2 px-4 rounded-lg inline-block bg-green-100 text-green-800';
                
                // Reset form
                document.getElementById('contact-form').reset();
            } else {
                // Show error message
                statusMessage.textContent = data.message || 'Failed to send message. Please try again.';
                statusMessage.className = 'py-2 px-4 rounded-lg inline-block bg-red-100 text-red-800';
            }
        } catch (error) {
            // Show error message
            statusMessage.textContent = 'An error occurred. Please try again later.';
            statusMessage.className = 'py-2 px-4 rounded-lg inline-block bg-red-100 text-red-800';
            console.error('Error:', error);
        }
    });
});

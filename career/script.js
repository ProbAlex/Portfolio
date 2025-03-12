// Career page specific JavaScript

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

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch the career timeline data
        const response = await fetch('../assets/career.json');
        const careerData = await response.json();
        
        // Create the timeline
        createTimeline(careerData);
    } catch (error) {
        console.error('Error loading career timeline:', error);
        document.getElementById('timeline-content').innerHTML = 
            '<p class="text-center text-red-500 py-10">Error loading timeline data. Please try again later.</p>';
    }
});

function createTimeline(data) {
    // Clear loading message
    const timelineContainer = document.getElementById('timeline-content');
    timelineContainer.innerHTML = '';
    
    const nodes = Object.entries(data);
    
    // Sort nodes by date (year and month)
    nodes.sort((a, b) => {
        const dateA = new Date(a[1].year, a[1].month - 1);
        const dateB = new Date(b[1].year, b[1].month - 1);
        return dateA - dateB;
    });
    
    // Month names for formatting
    const monthNames = [
        "January", "February", "March", "April", 
        "May", "June", "July", "August", 
        "September", "October", "November", "December"
    ];
    
    // Calculate time differences for spacing
    const firstDate = new Date(nodes[0][1].year, nodes[0][1].month - 1);
    const lastDate = new Date(nodes[nodes.length - 1][1].year, nodes[nodes.length - 1][1].month - 1);
    const totalMonths = (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + 
                       (lastDate.getMonth() - firstDate.getMonth());
    
    // Create timeline items
    nodes.forEach((node, index) => {
        const [nodeName, nodeData] = node;
        
        // Create timeline item element
        const itemElement = document.createElement('div');
        itemElement.className = 'timeline-item';
        
        // Calculate months since first node for proportional spacing
        const currentDate = new Date(nodeData.year, nodeData.month - 1);
        const monthsSinceFirst = (currentDate.getFullYear() - firstDate.getFullYear()) * 12 + 
                                (currentDate.getMonth() - firstDate.getMonth());
        
        // Format date
        const formattedDate = `${monthNames[nodeData.month - 1]} ${nodeData.year}`;
        
        // Create item content
        itemElement.innerHTML = `
            <div class="timeline-dot" ${nodeData.click_url ? 
                `onclick="window.open('${nodeData.click_url}', '_blank')"` : ''}>
                <div class="timeline-dot-inner"></div>
            </div>
            <div class="timeline-content">
                ${nodeData.click_url ? 
                    `<h3 class="timeline-title" onclick="window.open('${nodeData.click_url}', '_blank')">${nodeName}</h3>` : 
                    `<h3 class="timeline-title">${nodeName}</h3>`
                }
                <div class="timeline-date">${formattedDate}</div>
            </div>
        `;
        
        timelineContainer.appendChild(itemElement);
    });
}

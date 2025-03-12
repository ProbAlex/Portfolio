// Skills page specific JavaScript

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
        // Fetch skills data
        const response = await fetch('../assets/skills.json');
        if (!response.ok) {
            throw new Error('Failed to load skills data');
        }
        const skillsData = await response.json();
        
        // Clear loading indicator
        document.getElementById('skills-content').innerHTML = '';
        
        // Process each section
        Object.entries(skillsData).forEach(([sectionTitle, skills]) => {
            const sectionElement = createSkillSection(sectionTitle, skills);
            document.getElementById('skills-content').appendChild(sectionElement);
        });
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('skills-content').innerHTML = `
            <div class="text-center py-8">
                <p class="text-red-500">Error loading skills data. Please try again later.</p>
            </div>
        `;
    }
});

function createSkillSection(title, skills) {
    const section = document.createElement('div');
    section.className = 'mb-12';
    
    // Create section title
    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'text-2xl font-bold mb-6 text-center md:text-left';
    sectionTitle.textContent = title;
    section.appendChild(sectionTitle);
    
    // Create scrollable container for skill cards
    const container = document.createElement('div');
    container.className = 'skills-container';
    
    // Create flex container for cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'flex space-x-6 pb-4 px-2';
    
    // Add skill cards
    skills.forEach(skill => {
        const card = createSkillCard(skill);
        cardsContainer.appendChild(card);
    });
    
    container.appendChild(cardsContainer);
    section.appendChild(container);
    
    return section;
}

function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-card bg-white p-5 rounded-lg shadow-lg';
    card.style.borderColor = skill.outline_color;
    card.style.borderWidth = '2px';
    card.style.borderStyle = 'solid';
    
    // Header with logo and title
    const header = document.createElement('div');
    header.className = 'flex items-center mb-4';
    
    const logoCircle = document.createElement('div');
    logoCircle.className = 'logo-circle mr-3';
    
    const logo = document.createElement('img');
    logo.src = skill.box_image;
    logo.alt = `${skill.box_title} logo`;
    logoCircle.appendChild(logo);
    
    const title = document.createElement('h4');
    title.className = 'text-lg font-bold';
    title.textContent = skill.box_title;
    
    header.appendChild(logoCircle);
    header.appendChild(title);
    card.appendChild(header);
    
    // Proficiency bar
    const proficiencyContainer = document.createElement('div');
    proficiencyContainer.className = 'mb-6';
    
    const proficiencyLabel = document.createElement('p');
    proficiencyLabel.className = 'text-sm text-gray-600 mb-2';
    proficiencyLabel.textContent = 'Proficiency';
    
    const proficiencyBar = document.createElement('div');
    proficiencyBar.className = 'proficiency-bar';
    
    const proficiencyIndicator = document.createElement('div');
    proficiencyIndicator.className = 'proficiency-indicator';
    // Position indicator based on proficiency (1-10 scale)
    const position = (skill.proficiency - 1) / 9 * 100;
    proficiencyIndicator.style.left = `${position}%`;
    
    proficiencyBar.appendChild(proficiencyIndicator);
    
    const proficiencyValue = document.createElement('p');
    proficiencyValue.className = 'text-right text-sm mt-1';
    proficiencyValue.textContent = skill.proficiency.toFixed(1) + '/10';
    
    proficiencyContainer.appendChild(proficiencyLabel);
    proficiencyContainer.appendChild(proficiencyBar);
    proficiencyContainer.appendChild(proficiencyValue);
    card.appendChild(proficiencyContainer);
    
    // Frameworks section (if any)
    if (skill.frameworks && skill.frameworks.length > 0) {
        const frameworksContainer = document.createElement('div');
        frameworksContainer.className = 'mt-4';
        
        const frameworksHeader = document.createElement('div');
        frameworksHeader.className = 'frameworks-header flex justify-between items-center text-gray-500 text-sm cursor-pointer p-2 rounded';
        frameworksHeader.innerHTML = `
            <span>Frameworks</span>
            <i class="fas fa-chevron-down toggle-frameworks"></i>
        `;
        
        // Make the entire header clickable
        frameworksHeader.addEventListener('click', function() {
            const frameworksList = this.nextElementSibling;
            frameworksList.classList.toggle('active');
            this.querySelector('.toggle-frameworks').classList.toggle('active');
        });
        
        const frameworksList = document.createElement('div');
        frameworksList.className = 'frameworks-list mt-2 pl-2';
        
        skill.frameworks.forEach(framework => {
            const frameworkItem = document.createElement('div');
            frameworkItem.className = 'flex items-center justify-between py-2 border-b border-gray-100';
            
            const frameworkInfo = document.createElement('div');
            frameworkInfo.className = 'flex items-center';
            
            const frameworkLogo = document.createElement('div');
            frameworkLogo.className = 'framework-logo mr-2';
            
            const frameworkLogoImg = document.createElement('img');
            frameworkLogoImg.src = framework.image;
            frameworkLogoImg.alt = `${framework.title} logo`;
            frameworkLogo.appendChild(frameworkLogoImg);
            
            const frameworkTitle = document.createElement('span');
            frameworkTitle.className = 'text-sm';
            frameworkTitle.textContent = framework.title;
            
            frameworkInfo.appendChild(frameworkLogo);
            frameworkInfo.appendChild(frameworkTitle);
            
            // Enhanced confidence gauge
            const confidenceGauge = createEnhancedConfidenceGauge(framework.confidence);
            
            frameworkItem.appendChild(frameworkInfo);
            frameworkItem.appendChild(confidenceGauge);
            frameworksList.appendChild(frameworkItem);
        });
        
        frameworksContainer.appendChild(frameworksHeader);
        frameworksContainer.appendChild(frameworksList);
        card.appendChild(frameworksContainer);
    }
    
    return card;
}

function createEnhancedConfidenceGauge(confidence) {
    const gaugeContainer = document.createElement('div');
    gaugeContainer.className = 'confidence-gauge';
    
    const gaugeBackground = document.createElement('div');
    gaugeBackground.className = 'gauge-background';
    
    const gaugeFill = document.createElement('div');
    gaugeFill.className = 'gauge-fill';
    
    // Calculate rotation based on confidence (1-10 scale)
    // 0 confidence = -90deg (left), 10 confidence = 90deg (right)
    const rotation = -90 + (confidence - 1) / 9 * 180;
    gaugeFill.style.transform = `rotate(${rotation}deg)`;
    
    // Create a custom colored gauge fill based on the confidence value
    // This ensures the color at the needle position matches the confidence level
    let needleColor;
    if (confidence < 4) {
        needleColor = '#ef4444'; // Red for low confidence
    } else if (confidence < 7) {
        needleColor = '#f59e0b'; // Amber for medium confidence
    } else {
        needleColor = '#10b981'; // Green for high confidence
    }
    
    const gaugeCenter = document.createElement('div');
    gaugeCenter.className = 'gauge-center';
    
    const gaugeNeedle = document.createElement('div');
    gaugeNeedle.className = 'gauge-needle';
    gaugeNeedle.style.transform = `rotate(${rotation}deg)`;
    gaugeNeedle.style.backgroundColor = needleColor;
    
    gaugeContainer.appendChild(gaugeBackground);
    gaugeContainer.appendChild(gaugeFill);
    gaugeContainer.appendChild(gaugeCenter);
    gaugeContainer.appendChild(gaugeNeedle);
    
    // Add tooltip with numeric value
    gaugeContainer.title = `Confidence: ${confidence.toFixed(1)}/10`;
    
    // Add animation on hover
    gaugeContainer.addEventListener('mouseenter', function() {
        gaugeNeedle.style.transform = `rotate(${rotation + 10}deg)`;
        setTimeout(() => {
            gaugeNeedle.style.transform = `rotate(${rotation}deg)`;
        }, 300);
    });
    
    return gaugeContainer;
}

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

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Projects page loaded, attempting to fetch data...');
    
    try {
        // Try different path formats to handle various deployment scenarios
        const paths = [
            '/assets/projects.json',           // Absolute path from domain root
            './assets/projects.json',          // Relative to current directory
            '../assets/projects.json',         // Up one directory
            'https://alexalex.net/assets/projects.json' // Fully qualified URL
        ];
        
        console.log('Attempting to fetch projects data from multiple possible paths...');
        let response = null;
        let fetchError = null;
        
        // Try each path until one works
        for (const path of paths) {
            try {
                console.log(`Trying path: ${path}`);
                // Add a timeout to the fetch request
                const fetchPromise = fetch(path);
                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error(`Fetch timeout for ${path}`)), 5000)
                );
                
                response = await Promise.race([fetchPromise, timeoutPromise]);
                
                if (response.ok) {
                    console.log(`Successfully fetched from ${path}`);
                    break; // Exit the loop if successful
                } else {
                    console.warn(`Failed to fetch from ${path}: ${response.status} ${response.statusText}`);
                    fetchError = new Error(`Failed to load projects data from ${path}: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.warn(`Error fetching from ${path}:`, error);
                fetchError = error;
                // Continue to the next path
            }
        }
        
        // If all paths failed, throw the last error
        if (!response || !response.ok) {
            console.error('All fetch attempts failed');
            throw fetchError || new Error('Failed to load projects data from any path');
        }
        
        if (!response.ok) {
            console.error(`Failed to load projects data: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to load projects data: ${response.status} ${response.statusText}`);
        }
        
        console.log('Projects data fetched successfully, parsing JSON...');
        const projectsData = await response.json();
        console.log('Projects data parsed:', projectsData);
        
        // Clear loading indicator
        document.getElementById('projects-content').innerHTML = '';
        
        // Process each section
        console.log('Processing project sections...');
        Object.entries(projectsData).forEach(([sectionTitle, projects]) => {
            console.log(`Creating section: ${sectionTitle} with ${projects.length} projects`);
            const sectionElement = createProjectSection(sectionTitle, projects);
            document.getElementById('projects-content').appendChild(sectionElement);
        });

        // Fetch GitHub data for each project
        console.log('Fetching GitHub data for projects...');
        await fetchGitHubData();
        console.log('All GitHub data fetched successfully');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-content').innerHTML = `
            <div class="text-center py-8">
                <p class="text-red-500">Error loading projects data: ${error.message}</p>
                <p class="mt-2 text-gray-600">Try refreshing the page or check the console for more details.</p>
            </div>
        `;
    }
});

function createProjectSection(title, projects) {
    const section = document.createElement('div');
    section.className = 'mb-12';
    
    // Create section title
    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'text-2xl font-bold mb-6 text-center md:text-left';
    sectionTitle.textContent = title;
    section.appendChild(sectionTitle);
    
    // Create scrollable container for project cards
    const container = document.createElement('div');
    container.className = 'projects-container';
    
    // Create flex container for cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'flex space-x-6 pb-4 px-2';
    
    // Add project cards
    projects.forEach(project => {
        const card = createProjectCard(project);
        cardsContainer.appendChild(card);
    });
    
    container.appendChild(cardsContainer);
    section.appendChild(container);
    
    return section;
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card bg-white p-5 rounded-lg shadow-lg';
    card.dataset.repo = project.repo; // Store repo URL for later GitHub API calls
    
    // Header with title and GitHub stats
    const header = document.createElement('div');
    header.className = 'project-header';
    
    const title = document.createElement('h4');
    title.className = 'project-title';
    title.textContent = project.box_title;
    
    const stats = document.createElement('div');
    stats.className = 'project-stats';
    
    if (project.github) {
        // Stars count (will be populated later)
        const starsElement = document.createElement('div');
        starsElement.className = 'stat-item stars-count';
        starsElement.innerHTML = `<i class="fas fa-star text-yellow-400"></i> <span>-</span>`;
        
        // Forks count (will be populated later)
        const forksElement = document.createElement('div');
        forksElement.className = 'stat-item forks-count';
        forksElement.innerHTML = `<i class="fas fa-code-branch text-gray-500"></i> <span>-</span>`;
        
        stats.appendChild(starsElement);
        stats.appendChild(forksElement);
    }
    
    header.appendChild(title);
    header.appendChild(stats);
    card.appendChild(header);
    
    // Description
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;
    card.appendChild(description);
    
    // Languages (will be populated later)
    const languages = document.createElement('div');
    languages.className = 'project-languages';
    if (project.github) {
        languages.innerHTML = '<div class="text-sm text-gray-500">Loading languages...</div>';
    }
    card.appendChild(languages);
    
    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'project-buttons';
    
    // Live button (conditional)
    if (project.live) {
        const liveButton = document.createElement('a');
        liveButton.href = project.deployment_link;
        liveButton.target = '_blank';
        liveButton.className = 'btn-live';
        liveButton.innerHTML = `
            <div class="recording-icon"></div>
            <span>Live</span>
        `;
        
        // If there's a releases button, make live take up 2/3 width and download 1/3
        if (project.github && project.releases) {
            // Set live button to take 2/3 width
            liveButton.style.width = '66%';
            buttonsContainer.appendChild(liveButton);
            
            // Download button takes 1/3 width
            const downloadButton = document.createElement('a');
            downloadButton.className = 'btn-download';
            downloadButton.style.width = '33%';
            downloadButton.innerHTML = `<i class="fas fa-download"></i>`;
            downloadButton.dataset.repo = project.repo;
            // The actual link will be set when we fetch GitHub data
            
            buttonsContainer.appendChild(downloadButton);
        } else {
            // If no releases, make live button take full width
            liveButton.style.width = '100%';
            buttonsContainer.appendChild(liveButton);
        }
    } else if (project.github && project.releases) {
        // Only download button, make it full width
        const downloadButton = document.createElement('a');
        downloadButton.className = 'btn-download';
        downloadButton.style.width = '100%';
        downloadButton.innerHTML = `<i class="fas fa-download"></i>`;
        downloadButton.dataset.repo = project.repo;
        // The actual link will be set when we fetch GitHub data
        
        buttonsContainer.appendChild(downloadButton);
    }
    
    card.appendChild(buttonsContainer);
    
    // GitHub button (conditional)
    if (project.github) {
        const githubContainer = document.createElement('div');
        githubContainer.className = 'mt-3';
        
        const githubButton = document.createElement('a');
        githubButton.href = project.repo;
        githubButton.target = '_blank';
        githubButton.className = 'btn-github';
        githubButton.innerHTML = `
            <i class="fab fa-github"></i>
            <span>View Repository</span>
        `;
        
        githubContainer.appendChild(githubButton);
        card.appendChild(githubContainer);
    }
    
    return card;
}

// Helper function to set question marks for failed GitHub data requests
function setQuestionMarks(card) {
    // Update stars count
    const starsElement = card.querySelector('.stars-count span');
    if (starsElement) {
        starsElement.textContent = '?';
    }
    
    // Update forks count
    const forksElement = card.querySelector('.forks-count span');
    if (forksElement) {
        forksElement.textContent = '?';
    }
}

async function fetchGitHubData() {
    const cards = document.querySelectorAll('.project-card[data-repo]');
    
    for (const card of cards) {
        const repoUrl = card.dataset.repo;
        if (!repoUrl) continue;
        
        // Extract owner and repo name from GitHub URL
        const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) continue;
        
        const owner = match[1];
        const repo = match[2];
        
        try {
            // Fetch repo data with timeout
            let repoData = null;
            try {
                const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                if (repoResponse.ok) {
                    repoData = await repoResponse.json();
                    
                    // Update stars count
                    const starsElement = card.querySelector('.stars-count span');
                    if (starsElement) {
                        starsElement.textContent = repoData.stargazers_count;
                    }
                    
                    // Update forks count
                    const forksElement = card.querySelector('.forks-count span');
                    if (forksElement) {
                        forksElement.textContent = repoData.forks_count;
                    }
                    
                    // Update description if available and not already set
                    if (repoData.description) {
                        const descriptionElement = card.querySelector('.project-description');
                        if (descriptionElement && descriptionElement.textContent.trim() === '') {
                            descriptionElement.textContent = repoData.description;
                        }
                    }
                } else {
                    // Set ? for failed requests
                    setQuestionMarks(card);
                }
            } catch (error) {
                console.error(`Error fetching repo data for ${repoUrl}:`, error);
                setQuestionMarks(card);
            }
            
            // Fetch languages
            try {
                const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
                if (languagesResponse.ok) {
                    const languagesData = await languagesResponse.json();
                    const languagesElement = card.querySelector('.project-languages');
                    
                    if (languagesElement) {
                        languagesElement.innerHTML = '';
                        
                        // Language color mapping
                        const languageColors = {
                            JavaScript: '#f1e05a',
                            TypeScript: '#3178c6',
                            HTML: '#e34c26',
                            CSS: '#563d7c',
                            Python: '#3572A5',
                            Java: '#b07219',
                            PHP: '#4F5D95',
                            Ruby: '#701516',
                            Go: '#00ADD8',
                            Rust: '#dea584',
                            C: '#555555',
                            'C++': '#f34b7d',
                            'C#': '#178600',
                            Swift: '#ffac45',
                            Kotlin: '#A97BFF',
                            Dart: '#00B4AB',
                            Shell: '#89e051',
                            PowerShell: '#012456',
                            // Add more languages as needed
                        };
                        
                        Object.keys(languagesData).forEach(language => {
                            const tag = document.createElement('span');
                            tag.className = 'language-tag';
                            tag.textContent = `#${language}`;
                            
                            // Set background color based on language
                            const bgColor = languageColors[language] || '#6b7280';
                            tag.style.backgroundColor = bgColor;
                            
                            // Set text color based on background brightness
                            const r = parseInt(bgColor.slice(1, 3), 16);
                            const g = parseInt(bgColor.slice(3, 5), 16);
                            const b = parseInt(bgColor.slice(5, 7), 16);
                            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                            tag.style.color = brightness > 128 ? '#000000' : '#ffffff';
                            
                            languagesElement.appendChild(tag);
                        });
                    }
                } else {
                    // Set placeholder for languages
                    const languagesElement = card.querySelector('.project-languages');
                    if (languagesElement) {
                        languagesElement.innerHTML = '<div class="text-sm text-gray-500">Languages unavailable</div>';
                    }
                }
            } catch (error) {
                console.error(`Error fetching languages for ${repoUrl}:`, error);
                const languagesElement = card.querySelector('.project-languages');
                if (languagesElement) {
                    languagesElement.innerHTML = '<div class="text-sm text-gray-500">Languages unavailable</div>';
                }
            }
            
            // Fetch releases if needed
            if (card.querySelector('.btn-download')) {
                try {
                    const releasesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
                    if (releasesResponse.ok) {
                        const releaseData = await releasesResponse.json();
                        const downloadButton = card.querySelector('.btn-download');
                        
                        if (downloadButton && releaseData.assets && releaseData.assets.length > 0) {
                            downloadButton.href = releaseData.assets[0].browser_download_url;
                            downloadButton.title = `Download ${releaseData.name || 'latest release'}`;
                        }
                    } else {
                        // Handle failed release fetch
                        const downloadButton = card.querySelector('.btn-download');
                        if (downloadButton) {
                            downloadButton.href = '#';
                            downloadButton.title = 'Download unavailable';
                            downloadButton.classList.add('opacity-50');
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching releases for ${repoUrl}:`, error);
                    const downloadButton = card.querySelector('.btn-download');
                    if (downloadButton) {
                        downloadButton.href = '#';
                        downloadButton.title = 'Download unavailable';
                        downloadButton.classList.add('opacity-50');
                    }
                }
            }
            
        } catch (error) {
            console.error(`Error fetching GitHub data for ${repoUrl}:`, error);
            setQuestionMarks(card);
        }
    }
}

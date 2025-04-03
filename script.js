document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('#navbar ul');
    
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navUl.classList.remove('active');
        });
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'white';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Load projects from database
    loadProjects();
});

// Function to load projects from database
async function loadProjects() {
    try {
        const response = await fetch('get_projects.php');
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('projects-container');
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demo_url}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                        <a href="${project.code_url}" target="_blank"><i class="fab fa-github"></i> View Code</a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}
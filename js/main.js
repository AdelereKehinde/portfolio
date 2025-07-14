document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Hamburger Menu
    const menuIcon = document.querySelector('.menu-icon');
    const menuContent = document.querySelector('.menu-content');

    menuIcon.addEventListener('click', function() {
        this.classList.toggle('active');
        menuContent.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu-content nav ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuIcon.classList.remove('active');
            menuContent.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-left, .animate-right, .animate-up, .animate-down, .animate-zoom, .animate-rotate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationClass = Array.from(element.classList).find(cls => cls.startsWith('animate-'));
                element.style.opacity = '1';
                element.style.animation = `${animationClass} 1s ease forwards`;
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    const animateSkillBars = function() {
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionPosition < windowHeight - 200) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    };

    window.addEventListener('scroll', animateSkillBars);

    // Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-stats');
    let animated = false;
    
    const animateStats = function() {
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionPosition < windowHeight - 200 && !animated) {
            animated = true;
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        clearInterval(counter);
                        stat.textContent = target + '+';
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    };

    window.addEventListener('scroll', animateStats);

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Load projects dynamically
    const projectsContainer = document.querySelector('.projects-container');
    
    const projects = [
        {
            title: 'Data Selling website',
            description: 'A full-featured online store with payment integration, product management, and user accounts.',
            image: 'images/projects/ecommerce3.jpeg',
            tags: ['Javascript', 'Tailwind', 'Html'],
            category: 'frontend',
            liveLink: '#',
            codeLink: '#'
        },

        {
            title: 'E-commerce Platform',
            description: 'A full-featured online store with payment integration, product management, and user accounts.',
            image: 'images/projects/download.jpeg',
            tags: ['Flask', 'Html', 'Css', 'Javascript'],
            category: 'fullstack',
            liveLink: '#',
            codeLink: 'https://github.com/AdelereKehinde/Stationery-shop-'
        },
        {
            title: 'Jamb CBT Desktop App',
            description: 'A productivity application for easy jamb Pre-exam  with User authentication functionality and exam window.',
            image: 'images/projects/ecommerce4.jpeg',
            tags: ['Tkinter', 'Fastapi','SQLALchemy'],
            category: 'fullstack',
            liveLink: '#',
            codeLink: '#'
        },
        {
            title: 'RESTful API Service',
            description: 'A scalable backend service with authentication, data validation, and documentation.',
            image: 'images/projects/images.jpeg',
            tags: ['Node.js', 'Express', 'JWT', 'Swagger'],
            category: 'backend',
            liveLink: '#',
            codeLink: '#'
        },
        {
            title: 'Social Media Dashboard',
            description: 'Analytics dashboard for social media metrics with real-time updates and data visualization.',
            image: 'images/projects/blog.jpeg',
            tags: ['React', 'Chart.js', 'Socket.io'],
            category: 'frontend',
            liveLink: '#',
            codeLink: '#'
        },
        {
            title: 'Educational Hub',
            description: 'Cross-platform website application for school administrations and enrol students.',
            image: 'images/projects/edu.jpeg',
            tags: ['Typescript', 'Bootstrap', 'Html'],
            category: 'Frontend',
            liveLink: 'https://royaleduhub.netfly.app',
            codeLink: 'https://github.com/AdelereKehinde/Edu-hub'
        },
        {
            title: 'A Programmer Portfolio website',
            description: 'A Fullstack programmer Portfolio website containing about him and projects created by him.',
            image: 'images/projects/port.jpeg',
            tags: ['Javascript', 'Html', 'Css'],
            category: 'frontend',
            liveLink: 'https://devvoyagerportfolio.netfly.app',
            codeLink: 'https://github.com/AdelereKehinde/portfolio'
        },
        {
            title: 'An advanced Todo list',
            description: 'A full-featured Todos done in my freetime.',
            image: 'images/projects/todos.jpeg',
            tags: ['Javascript', 'css', 'html'],
            category: 'frontend',
            liveLink: '#',
            codeLink: 'https://github.com/AdelereKehinde/Flask-Todo-List'
        },
        {
            title: 'A calculator',
            description: 'A professional advanced calculator that covers all the features of a scientific Calculator.',
            image: 'images/projects/calc.png',
            tags: ['Javascript', 'Css', 'html'],
            category: 'frontend',
            liveLink: '#',
            codeLink: 'https://github/AdelereKehinde/Caculator2'
        },
        {
            title: 'E-commerce Platform',
            description: 'A full-featured online store with payment integration, product management, and user accounts.',
            image: 'images/projects/eommerce2.png',
            tags: ['Django', 'Css', 'Html', 'Javascript', 'Sqlite3', ],
            category: 'fullstack',
            liveLink: '#',
            codeLink: 'https://github/AdelereKehinde/jumiaclone-'
        },
        {
            title: 'AI Chatbot',
            description: 'A Powerful Ai chatbot an api from Chatgpt',
            image: 'images/projects/chatbot.jpeg',
            tags: [ 'Css', 'Html', 'Javascript', 'Apis', ],
            category: 'fullstack',
            liveLink: 'Chatgpt.com',
            codeLink: '#'
        },
        {
            title: 'A Racing Game ',
            description: 'A Very Comprehensive Racing Game , Monkey run',
            image: 'images/projects/race.jpeg',
            tags: [ 'Css', 'Html', 'Javascript' ],
            category: 'frontend',
            liveLink: '#',
            codeLink: 'https://github/AdelereKehinde/Monkey-run'
        },
        {
            title: 'A  Ecommerce Shopping store ',
            description: 'A Very Comprehensive Shopping store that covers full authentication a CRUD  features and more',
            image: 'images/projects/ecommerce3.jpeg',
            tags: [ 'Css', 'Html', 'Javascript' , 'Django'],
            category: 'fullstack',
            liveLink: '#',
            codeLink: 'https://github/AdelereKehinde/pyshop'
        },
        {
            title: 'An Advanced dictionary app',
            description: 'A Very Comprehensive Dictionary app for schools',
            image: 'images/projects/dc.jpeg',
            tags: [ 'Css', 'Html', 'Javascript' ],
            category: 'frontend',
            liveLink: '#',
            codeLink: 'https://github/AdelereKehinde'
        },
        {
            title: 'A Blog site',
            description: 'A Very Comprehensive and advanced Blog post app thst covers a CRUD features',
            image: 'images/projects/blog.jpeg',
            tags: [ 'Css', 'Html', 'Javascript' , 'Django'],
            category: 'fullstack',
            liveLink: '#',
            codeLink: 'https://github/AdelereKehinde/Blog-Post'
        },
        

    ];
    
    function loadProjects() {
        projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = `project-item ${project.category}`;
            
            projectItem.innerHTML = `
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
                        <a href="${project.liveLink}" target="_blank">Live Demo</a>
                        <a href="${project.codeLink}" target="_blank">View Code</a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectItem);
        });
    }
    
    loadProjects();

    // Fetch GitHub repositories
    const reposContainer = document.getElementById('github-repos');
    
    async function fetchGitHubRepos() {
        try {
            const response = await fetch('https://api.github.com/users/AdelereKehinde/repos?sort=updated&per_page=6');
            const repos = await response.json();
            
            if (repos.message && repos.message.includes('API rate limit exceeded')) {
                reposContainer.innerHTML = '<p>GitHub API rate limit exceeded. Please try again later.</p>';
                return;
            }
            
            reposContainer.innerHTML = '';
            
            repos.forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.className = 'repo-item';
                
                repoItem.innerHTML = `
                    <h4>${repo.name}</h4>
                    <p>${repo.description || 'No description available'}</p>
                    <div class="repo-stats">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span><i class="fas fa-eye"></i> ${repo.watchers_count}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="btn btn-primary" style="margin-top: 1rem;">View Repository</a>
                `;
                
                reposContainer.appendChild(repoItem);
            });
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            reposContainer.innerHTML = '<p>Unable to load GitHub repositories at this time.</p>';
        }
    }
    
    fetchGitHubRepos();

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.className = 'success';
        formMessage.style.display = 'block';
        
        // Reset form
        this.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input').value;
        
        // Simulate subscription
        alert(`Thank you for subscribing with ${email}! You'll receive updates on my latest projects.`);
        this.reset();
    });

    // Initialize animations on page load
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('animate-left');
        document.querySelector('.hero-image').classList.add('animate-right');
    }, 500);
});


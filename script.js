document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.getElementById('navbar').prepend(menuToggle);
    
    const navList = document.querySelector('#navbar ul');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#navbar ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.backgroundColor = 'var(--secondary-color)';
            navbar.style.padding = '15px 0';
        }
    });

    // Show/hide more info in education section
    document.querySelectorAll('.btn-more').forEach(button => {
        button.addEventListener('click', function() {
            const moreInfo = this.nextElementSibling;
            moreInfo.classList.toggle('show');
            
            if (moreInfo.classList.contains('show')) {
                this.textContent = 'Hide Courses';
            } else {
                this.textContent = 'Show Courses';
            }
        });
    });

    // Animate skill bars
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const level = item.getAttribute('data-level');
            const skillLevel = item.querySelector('.skill-level');
            skillLevel.style.width = level + '%';
        });
    }
    
    // Only animate when skills section is in view
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);

    // Project modals
    document.querySelectorAll('.btn-demo').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.nextElementSibling;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.project-modal').style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.project-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            alert('There was a problem sending your message. Please try again later.');
            console.error('Error:', error);
        });
    });

    // Name animation on load
    const animatedName = document.querySelector('.animated-name');
    setTimeout(() => {
        animatedName.style.animation = 'none';
        setTimeout(() => {
            animatedName.style.animation = 'fadeIn 1.5s ease-in-out';
        }, 10);
    }, 1500);
});

document.addEventListener('DOMContentLoaded', function() {
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
        });
    });

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.project-modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.project-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
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

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload
    const form = e.target;
    const formData = new FormData(form);
  
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Message sent successfully!");
          form.reset(); // Clear form
        } else {
          throw new Error("Failed to send message");
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
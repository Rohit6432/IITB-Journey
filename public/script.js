document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Guestbook form submission
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        
        if (name && message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `
                <h4>${name}</h4>
                <p>${message}</p>
                <small>${new Date().toLocaleString()}</small>
            `;
            
            messagesContainer.prepend(messageElement);
            messageForm.reset();
            
            // Store in local storage
            const messages = JSON.parse(localStorage.getItem('guestbookMessages') || []);
            messages.unshift({ name, message, date: new Date().toISOString() });
            localStorage.setItem('guestbookMessages', JSON.stringify(messages));
        }
    });
    
    // Load messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem('guestbookMessages') || []);
    storedMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <h4>${msg.name}</h4>
            <p>${msg.message}</p>
            <small>${new Date(msg.date).toLocaleString()}</small>
        `;
        messagesContainer.appendChild(messageElement);
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimeline() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Initial check
    checkTimeline();
    
    // Check on scroll
    window.addEventListener('scroll', checkTimeline);
});

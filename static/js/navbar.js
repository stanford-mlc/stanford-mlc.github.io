// Navbar functionality and animations
(function() {
  'use strict';

  // Set active navigation tab based on current page
  function setActiveNavTab() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
      const link = tab.querySelector('a');
      const href = link.getAttribute('href');
      
      // Remove active class from all tabs
      tab.classList.remove('active');
      
      // Add active class to current page tab
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        tab.classList.add('active');
      }
    });
  }

  // Enhanced navbar interactions
  function initNavbarInteractions() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
      const link = tab.querySelector('a');
      
      // Add click animation
      link.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // Add ripple animation CSS
  function addRippleStyles() {
    if (!document.getElementById('navbar-ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'navbar-ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    setActiveNavTab();
    initNavbarInteractions();
    addRippleStyles();
  });
})();
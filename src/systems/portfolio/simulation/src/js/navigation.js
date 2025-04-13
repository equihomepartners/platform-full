// Simple navigation handling
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop();
  
  navLinks.forEach(link => {
    // Set active class based on current page
    if (link.getAttribute('href') === currentPage) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
    
    // Add click event listener
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Get the parent tabs container to only affect tabs in the same group
      const parentContainer = this.closest('.tabs');
      const isSubTab = parentContainer.classList.contains('sub-tabs');
      
      // Get all tabs in the same container
      const siblingTabs = parentContainer.querySelectorAll('.tab');
      
      // Remove active class from all sibling tabs
      siblingTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      if (isSubTab) {
        // Handle sub-tabs
        const subTabId = this.getAttribute('data-subtab');
        const subTabContents = document.querySelectorAll('.subtab-content');
        
        // Hide all sub-tab contents
        subTabContents.forEach(c => c.classList.remove('active'));
        
        // Show the selected sub-tab content
        document.getElementById(`${subTabId}-content`).classList.add('active');
      } else {
        // Handle main tabs
        const tabId = this.getAttribute('data-tab');
        const mainTabContents = document.querySelectorAll('.tab-content');
        
        // Hide all main tab contents
        mainTabContents.forEach(c => c.classList.remove('active'));
        
        // Show the selected main tab content
        document.getElementById(`${tabId}-tab`).classList.add('active');
      }
    });
  });
});

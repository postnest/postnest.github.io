document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.privacy-sidebar-item');
    const sections = [];
    
    // Get all sections
    sidebarItems.forEach(item => {
        const sectionId = item.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            sections.push({
                id: sectionId,
                element: section,
                sidebarItem: item
            });
        }
    });
    
    // Add click event to sidebar items
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Smooth scroll to section
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Update active sidebar item on scroll
    function updateActiveSection() {
        // Get current scroll position
        const scrollPosition = window.scrollY + 100; // Adding offset for better UX
        
        // Find the section that is currently in view
        let currentSection = sections[0];
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.element.offsetTop;
            const nextSection = sections[i + 1];
            
            // If this is the last section or we're above the next section
            if (!nextSection || scrollPosition < nextSection.element.offsetTop) {
                if (scrollPosition >= sectionTop) {
                    currentSection = section;
                    break;
                }
            }
        }
        
        // Update active class
        if (currentSection) {
            sidebarItems.forEach(item => {
                item.classList.remove('active');
            });
            
            currentSection.sidebarItem.classList.add('active');
            
            // Ensure active item is visible in sidebar (auto-scroll)
            const sidebar = document.querySelector('.privacy-sidebar');
            const activeItem = currentSection.sidebarItem;
            
            if (sidebar && activeItem) {
                const itemTop = activeItem.offsetTop;
                const itemHeight = activeItem.offsetHeight;
                const sidebarTop = sidebar.scrollTop;
                const sidebarHeight = sidebar.offsetHeight;
                
                // If active item is not fully visible
                if (itemTop < sidebarTop || itemTop + itemHeight > sidebarTop + sidebarHeight) {
                    sidebar.scrollTop = itemTop - (sidebarHeight / 2) + (itemHeight / 2);
                }
            }
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial update
    updateActiveSection();
});

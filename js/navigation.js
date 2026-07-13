// Standard Navigation für alle Seiten
// Wird automatisch in alle HTML-Seiten eingebunden

const pages = [
    { name: "Startseite", url: "index.html" },
    { name: "Kinderlieder-Videos", url: "kinderlieder.html" },
    { name: "Sternenfotos", url: "sternenfotos.html" },
    { name: "Feedback", url: "feedback.html" },
    { name: "Hinweise", url: "hinweise.html" }
];

// Aktuelle Seite ermitteln
function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
}

// Navigation generieren
function generateNavigation() {
    const navContainer = document.getElementById('sidebar-nav');
    if (!navContainer) return;

    const currentPage = getCurrentPage();
    
    pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = page.url;
        a.textContent = page.name;
        
        // Aktive Seite markieren
        if (currentPage === page.url) {
            a.classList.add('active');
        }
        
        li.appendChild(a);
        navContainer.appendChild(li);
    });
}

// Mobile Navigation toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
}

// Close sidebar when clicking on overlay
function closeSidebarOnOverlayClick() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
}

// Close sidebar when clicking on a nav link (mobile)
function closeSidebarOnNavClick() {
    const navLinks = document.querySelectorAll('#sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    generateNavigation();
    closeSidebarOnOverlayClick();
    closeSidebarOnNavClick();
});

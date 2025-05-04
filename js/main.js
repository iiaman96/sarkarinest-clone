// Sample job data - This would typically come from an API
const jobsData = [
    {
        id: 1,
        title: "UPSC Civil Services 2024",
        lastDate: "2024-01-15",
        description: "Applications are invited for Civil Services Examination 2024. Candidates must be graduates.",
        category: "UPSC",
        important: true,
        views: 15420
    },
    {
        id: 2,
        title: "SSC CGL 2023-24",
        lastDate: "2023-12-30",
        description: "Combined Graduate Level Examination for various posts. Age limit: 18-32 years.",
        category: "SSC",
        important: true,
        views: 12350
    },
    {
        id: 3,
        title: "IBPS PO 2024",
        lastDate: "2024-02-10",
        description: "Recruitment for Probationary Officers in various banks. Graduate in any discipline.",
        category: "Banking",
        important: true,
        views: 9840
    }
];

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Function to format view count
function formatViews(views) {
    if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'k';
    }
    return views;
}

// Function to create job cards
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card bg-white p-4 rounded-lg shadow animate-fadeIn';
    
    card.innerHTML = `
        <div class="flex justify-between items-start">
            <h3 class="text-lg font-bold text-blue-700">${job.title}</h3>
            ${job.important ? '<span class="important-tag">Important</span>' : ''}
        </div>
        <div class="job-meta flex gap-4 mt-2">
            <span class="flex items-center">
                <i class="far fa-calendar-alt mr-1"></i>
                Last Date: ${formatDate(job.lastDate)}
            </span>
            <span class="flex items-center">
                <i class="far fa-eye mr-1"></i>
                ${formatViews(job.views)} views
            </span>
        </div>
        <p class="job-description mt-2 text-gray-600">${job.description}</p>
        <div class="mt-4 flex justify-between items-center">
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">${job.category}</span>
            <a href="#" class="custom-button">View Details</a>
        </div>
    `;
    
    return card;
}

// Function to populate job listings
function populateJobListings() {
    const jobListingsContainer = document.getElementById('jobListings');
    if (!jobListingsContainer) return;

    jobsData.forEach(job => {
        const jobCard = createJobCard(job);
        jobListingsContainer.appendChild(jobCard);
    });
}

// Function to handle mobile navigation
function handleMobileNav() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    });

    elements.forEach(element => observer.observe(element));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateJobListings();
    handleMobileNav();
    handleScrollAnimations();
});

// Handle search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const jobCards = document.querySelectorAll('.job-card');

        jobCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.job-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

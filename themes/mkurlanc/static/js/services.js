document.addEventListener('DOMContentLoaded', function() {
    console.log('Services.js loaded');
    
    // Parse the services data if it's a string
    if (typeof window.servicesData === 'string') {
        try {
            window.servicesData = JSON.parse(window.servicesData);
            console.log('Services data parsed successfully');
        } catch (e) {
            console.error('Error parsing services data:', e);
        }
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('serviceModal');
    if (modal) {
        console.log('Modal element found');
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    } else {
        console.log('Modal element not found');
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

function openModal(title) {
    console.log('Opening modal for:', title);
    if (!window.servicesData) {
        console.log('Services data not found');
        return;
    }
    
    console.log('Services data:', window.servicesData);
    
    const service = window.servicesData.find(s => s.title === title);
    if (!service) {
        console.log('Service not found:', title);
        return;
    }

    document.getElementById('modalTitle').textContent = service.title;
    const content = document.getElementById('modalContent');
    
    // Format the content with proper HTML structure
    const formattedContent = service.full_description_long
        .split('\n\n')
        .map(paragraph => {
            const trimmedParagraph = paragraph.trim();
            
            // Check if this is a section header (ends with ':')
            if (trimmedParagraph.endsWith(':')) {
                return `<h4 class="font-playfair text-xl font-medium mt-6 mb-4">${trimmedParagraph}</h4>`;
            }
            
            // Check if this is a bullet point list
            if (trimmedParagraph.includes('•')) {
                const items = trimmedParagraph
                    .split('•')
                    .filter(item => item.trim())
                    .map(item => `<li class="text-gray-700">${item.trim()}</li>`)
                    .join('\n');
                return `<ul class="list-disc pl-6 mb-4 space-y-2">${items}</ul>`;
            }
            
            // Regular paragraph
            return `<p class="text-gray-700 mb-4">${trimmedParagraph}</p>`;
        })
        .join('\n');

    content.innerHTML = formattedContent;
    
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    console.log('Modal opened');
}

function closeModal() {
    console.log('Closing modal');
    const modal = document.getElementById('serviceModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
} 
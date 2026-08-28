const textElement = document.getElementById("typing-text");
const services = ["Weddings", "Pre-Weddings", "Baby Photo Shoots", "Birthdays", "Anniversaries"];
let serviceIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentService = services[serviceIndex];
    
    if (isDeleting) {
        // Erasing
        textElement.textContent = currentService.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing
        textElement.textContent = currentService.substring(0, charIndex + 1);
        charIndex++;
    }

    // Speed logic
    let typeSpeed = isDeleting ? 50 : 100;

    // If word is completely typed
    if (!isDeleting && charIndex === currentService.length) {
        typeSpeed = 2000; // Pause at the end of the word
        isDeleting = true;
    } 
    // If word is completely erased
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        serviceIndex = (serviceIndex + 1) % services.length; // Move to next word
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the animation when page loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});

// ==========================================
// 1. SILK FADE IMAGE SLIDER (Left Side)
// ==========================================
function startSilkSlider() {
    const images = document.querySelectorAll('.image-slider-mask .slider-img');
    if(images.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        // Remove active from current
        images[currentIndex].classList.remove('active');
        
        // Move to next, loop back to start if at the end
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active to new
        images[currentIndex].classList.add('active');
    }, 4000); // Fades every 4 seconds
}

// ==========================================
// 2. 3D CARD FLIPPER (Right Side Stack)
// ==========================================
function startCardStackFlipper() {
    const stack = document.getElementById('wedding-stack');
    if(!stack) return;
    
    const cards = Array.from(stack.querySelectorAll('.stack-card'));
    let isHovering = false;

    // Pause flipping if user places mouse on the stack (so they can read the DP overlay)
    stack.addEventListener('mouseenter', () => isHovering = true);
    stack.addEventListener('mouseleave', () => isHovering = false);

    setInterval(() => {
        if (isHovering) return; // Don't flip while reading

        // Logic: Shift data-pos values by 1
        cards.forEach(card => {
            let currentPos = parseInt(card.getAttribute('data-pos'));
            let newPos = currentPos - 1;
            
            // If it was at the front (0), send it to the back
            if (newPos < 0) {
                newPos = cards.length - 1;
            }
            
            card.setAttribute('data-pos', newPos);
        });
    }, 3000); // Flips every 3 seconds
}

// ==========================================
// 3. MODAL POPUP LOGIC
// ==========================================
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevents background scrolling
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto'; // Restores scrolling
}

// Close modal if user clicks anywhere outside the white box
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

// Initialize everything on load
document.addEventListener("DOMContentLoaded", () => {
    // Keep your typing animation call here if it's already there
    startSilkSlider();
    startCardStackFlipper();
});

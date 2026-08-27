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

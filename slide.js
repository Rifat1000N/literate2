document.addEventListener("DOMContentLoaded", function () {
    // Select all slides
    const slides = document.querySelectorAll('.slide');

    // Exit early if no slides found
    if (slides.length === 0) {
        console.warn('⚠️ No elements with class "slide" found. Slider will not work.');
        return;
    }

    let currentSlide = 0;

    // Show first slide
    slides[currentSlide].classList.add('active');

    // Auto-slide every 5 seconds
    setInterval(() => {
        // Hide current slide
        slides[currentSlide].classList.remove('active');

        // Go to next slide (loop back to 0 if at end)
        currentSlide = (currentSlide + 1) % slides.length;

        // Show next slide
        slides[currentSlide].classList.add('active');
    }, 5000);
});
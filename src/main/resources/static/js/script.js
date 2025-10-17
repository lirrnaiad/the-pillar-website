const navDots = document.querySelectorAll('.nav-dot');
const slider = document.querySelector('.featured-grid');

navDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide);
        const offset = slideIndex * -50;

        slider.style.transform = `translateX(${offset}%)`;

        document.querySelector('.nav-dot.active').classList.remove('active');
        dot.classList.add('active');
    });
});
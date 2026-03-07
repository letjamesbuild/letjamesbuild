const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach((element) => fadeObserver.observe(element));

const heroButton = document.querySelector('.book-call-hero');
const stickyCta = document.querySelector('.sticky-cta');

const stickyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    stickyCta.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
    stickyCta.style.opacity = entry.isIntersecting ? '0' : '1';
  });
}, {
  threshold: 0
});

stickyCta.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
stickyObserver.observe(heroButton);

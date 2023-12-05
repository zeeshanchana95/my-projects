const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const last3Posts = [...document.querySelectorAll('article.last-three')];

last3Posts.forEach(post => {
    post.style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('post')) {
        if (window.location.protocol === 'https:') {
            window.location.href = 'https://adex-badr18.github.io/scrimba-frontend/learning-journal/post-view.html';
        } else if (window.location.protocol === 'http:') {
            window.location.href = '/learning-journal/post-view.html';
        }
    } else if (e.target.classList.contains('fa-bars')) {
        mobileMenu.classList.toggle('hidden');

        mobileMenuBtn.style.display = 'none';
        closeMenuBtn.style.display = 'block';

    } else if (e.target.classList.contains('fa-xmark')) {
        mobileMenu.classList.toggle('hidden');

        mobileMenuBtn.style.display = 'block';
        closeMenuBtn.style.display = 'none';
    } else if (e.target.classList.contains('logo-wrapper')) {
        if (window.location.protocol === 'https:') {
            window.location.href = 'https://adex-badr18.github.io/scrimba-frontend/learning-journal/index.html';
        } else if (window.location.protocol === 'http:') {
            window.location.href = '/learning-journal/index.html';
        }
    } else if (e.target.classList.contains('view-more-link')) {
        const viewMore = document.querySelector('a.view-more-link');

        e.preventDefault();

        if (last3Posts[0].style.display === 'none') {
            last3Posts.forEach(post => {
                post.style.display = 'grid';
            });

            viewMore.textContent = 'View less';
        } else {
            last3Posts.forEach(post => {
                post.style.display = 'none';
            });

            viewMore.textContent = 'View more';
        }
    }
}) 



// https://adex-badr18.github.io/learning-journal/post-view.html
// http://127.0.0.1:5500/learning-journal/index.html
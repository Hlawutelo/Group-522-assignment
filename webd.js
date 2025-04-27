// Smooth heading and blog post animation
document.addEventListener("DOMContentLoaded", function() {
    // Animate heading
    const heading = document.querySelector('.smooth-heading');
    if (heading) {
        setTimeout(() => {
            heading.classList.add('visible');
        }, 200);
    }
    // Animate blog posts
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach((post, i) => {
        setTimeout(() => {
            post.classList.add('visible');
        }, 400 + i * 200);
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    // Load theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
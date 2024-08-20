document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');

    if (userName && userEmail) {
        document.title = `${userName} - ScrribleSphere`
        document.querySelector('.user-page .cont').innerHTML = `
            <div><i class="fa-solid fa-user"></i>${userName}</div>
            <div><i class="fa-solid fa-envelope"></i>${userEmail}</div>
            <div id="blogs">Loading blogs...</div>
        `;
        fetchBlogs(userName);
    } else {
        document.querySelector('.user-page .cont').innerHTML = `
            <div>No user data found!</div>
            <a href="/login.html" style="text-decoration: none; color: blue">LogIn</a>
        `;
    }
});

function fetchBlogs(authorName) {
    fetch("/blog/getblogs")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const blogsContainer = document.getElementById('blogs');
            if (data.length > 0) {
                blogsContainer.innerHTML = `
                    <h4>Published Blogs:</h4>
                    <ul>
                        ${data.map(blog => `<p><a href="blog.html?slug=${encodeURIComponent(blog.slug)}">${blog.title} &#8599;</a></p>`).join('')}
                    </ul>
                `;
            } else {
                blogsContainer.innerHTML = 'No Blogs Published!';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('blogs').innerHTML = 'Error loading blogs';
        });
}
async function findBlog(slug) {
    try {
        const response = await fetch('/blog/getBlogs');
        const blogs = await response.json();
        // console.log(blogs);
        const blog = blogs.find(b => b.slug === slug);
        if (blog) {
            // console.log(blog);
            document.title = `${blog.title}`
            document.getElementById('container').innerHTML = `
                <div class="title"><h2>${blog.title}</h2></div>
            <div class="des">${blog.description}</div>
            <div class="auth-sec">
                <div><i class="fa-solid fa-user"></i><span>${blog.author}</span></div>
                <div class="sec-2">
                    <div>${new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })}</div>
                    <div><i class="fa-regular fa-heart"></i><span>${blog.likes}</span></div>
                    <div><i class="fa-solid fa-link"></i></div>
                </div>
            </div>
            <div class="cover-img"><img src="${blog.coverUrl}" alt="coverImage" /></div>
            <div class="cont">${blog.content}</div>
            <div class="cat-container">
            ${blog.category.map(cat=>`
                <span class="box-1">${cat}</span>`).join(' ')
            }
            </div>
            `;
        } else {
            console.log('Blog not found');
        }
    }
    catch (err) {
        console.error('Error: ' + err);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    findBlog(slug)
})
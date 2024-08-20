function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    let truncatedText = text.substring(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');

    if (lastSpaceIndex === -1) {
        return truncatedText + '...';
    }
    return text.substring(0, lastSpaceIndex) + '...';
}

async function fetchBlogs(src) {
    try {
        const response = await fetch('/blog/getblogs');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blogs = await response.json();
        const container = document.getElementById('blogs-container');
        let slicedBlogs;

        if (src === 1) {
            slicedBlogs = blogs.slice(0, 2);
        } else {
            slicedBlogs = blogs;
        }

        container.innerHTML = slicedBlogs.map(blog => {
            const defaultThumbnailUrl = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360';
            const thumbnailUrl = blog.thumbnailUrl || defaultThumbnailUrl;

            return `
                <a href="blog.html?slug=${encodeURIComponent(blog.slug)}">
                    <div class="container">
                        <div class="sec-1">
                            <div class="line-1">
                                <i class="fa-solid fa-user"></i><span>${blog.author}</span>
                            </div>
                            <div><h5>${blog.title}</h5></div>
                            <div>${truncateText(blog.description, 100)}</div>
                            <div class="line-4">
                                <div>${new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</div>
                                <div><i class="fa-regular fa-heart"></i><span>${blog.likes}</span></div>
                                <div><i class="fa-solid fa-link"></i></div>
                            </div>
                        </div>
                        <div class="sec-2">
                            <img class="short_img" src="${thumbnailUrl}" alt="thumbnailImage">
                        </div>
                    </div>
                </a>`;
        }).join('');
    } catch (err) {
        console.error('Error fetching blogs:', err);
    }
}

// function category() {
//     let category = ['gym', 'travel', 'AWS', 'fitness', 'creativity', 'tech', 'coding', 'cp', 'spirituality', 'Node js', 'backend', 'flutter'];
//     const catContainer = document.getElementById('cat')
//     catContainer.innerHTML = category.map(cat => `
//             <span class="box-1">${cat}</span>
//         `).join('')
// }

document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;
    console.log('Current path:', path);
    const src = path === '/' ? 1 : 0;
    fetchBlogs(src);
    // category();
});
import Blog from '../model/blog.js'
import slugify from 'slugify'

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        return res.status(200).json(blogs)
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ mssg: "Internal server error!" })
    }
}

export const createBlog = async (req, res) => {
    try {
        const { title, author, description, content, category, coverUrl, thumbnailUrl } = req.body
        if (!title || !author || !description || !content) {
            return res.status(400).json({ mssg: "Please fill in all the required fields!" })
        }
        const slug = slugify(title, {
            lower: true,
            strict: true
        });
        const blogUrl = `http://localhost:3000/blog/${slug}`
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            return res.status(400).json({ mssg: "A blog with this title already exists." });
        }
        const categories = category
            .split(',')
            .map(cat => cat.trim())
            .filter(cat => cat.length > 0);
        if (categories.length === 0) {
            return res.status(400).json({ mssg: "At least one category is required!" })
        }

        const newBlog = new Blog({
            title,
            author,
            description,
            content,
            category: categories,
            slug,
            blogUrl,
            coverUrl,
            thumbnailUrl
        })
        await newBlog.save()

        return res.status(201).json({ mssg: "Blog created successfully!", slug })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ mssg: "Internal server error" })
    }
}

// export const likeBlog = async (req, res) => {
//     try {
//         const { slug } = req.params
//         const blog = await Blog.findOne({ slug })
//         if (!blog) {
//             return res.status(404).json({ msg: "Blog not found" });
//         }
//         blog.likes += 1;
//         await blog.save();
//         return res.status(200).json(blog);
//     } catch (error) {
//         console.log("Error: " + error)
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// }
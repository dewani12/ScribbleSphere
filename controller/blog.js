import Blog from '../model/blog.js'

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        return res.status(200).json(blogs)
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({mssg: "Internal server error!"})
    }
}

export const createBlogs = async (req, res) => {
    try {
        const newBlog = await new Blog(req.body)
        await newBlog.save()

        return res.status(201).json({mssg: "Blog created!"})
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({mssg: "Internal server error"})
    }
}

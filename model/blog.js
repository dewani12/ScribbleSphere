import mongoose, {Schema} from "mongoose";

const blogSchema = mongoose.Schema({
    id: Schema.Types.ObjectId,
    title: String,
    author: String,
    description: String,
    category: [String],
    imgUrl: String,
    content: String,
    likes: Number,
    blogUrl: String
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
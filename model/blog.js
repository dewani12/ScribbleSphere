import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: [String], 
        default: [] 
    },
    imgUrl: { 
        type: String
    },
    content: { 
        type: String, 
        required: true 
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    blogUrl: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

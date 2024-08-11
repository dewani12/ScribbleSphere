import mongoose,{Schema} from "mongoose";

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
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

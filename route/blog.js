import express from 'express'
import {getBlogs, createBlog} from '../controller/blog.js'

const router = express.Router()

router.get('/getblogs', getBlogs)
router.post('/createblog', createBlog)

export default router
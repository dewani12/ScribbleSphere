import express from 'express'
import {getBlogs, createBlogs} from '../controller/blog.js'

const router = express.Router()

router.get('/getblogs', getBlogs)
router.get('/createblogs', createBlogs)

export default router
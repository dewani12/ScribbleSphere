import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import userRoute from './route/user.js'
import blogRoute from './route/blog.js'
import cors from 'cors'

import { requireAuth } from './middleware/auth.js'

const app = express()

dotenv.config()
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve('public')));

const PORT = process.env.PORT
const URI = process.env.MONGODB_URI

//connect to mongoDB
try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('connected to mongoDB')
} catch (error) {
  console.log('Error: ' + error)
}

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.get('/create-blog', requireAuth, (req, res) => {
  res.sendFile(path.resolve('public/create-blog.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
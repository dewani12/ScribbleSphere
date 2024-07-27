import express from 'express'
import dotenv from 'dotenv' 
import mongoose from 'mongoose'

import userRoute from './route/user.js'
import blogRoute from './route/blog.js'

const app = express()

app.use(express.json())
dotenv.config()

const PORT = process.env.PORT
const URI = process.env.MONGODB_URI

//connect to mongoDB
try {
    mongoose.connect(URI)
    console.log('connected to mongoDB')
} catch (error) {
    console.log('Error: ' + error)
}

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
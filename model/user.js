import mongoose from 'mongoose'
import pkg from 'validator'

const {isEmail} = pkg

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: isEmail
    },
    password: {
        type: String,
        required:true,
        minlength: 6
    }
})

const User = mongoose.model('User', userSchema)

export default User
import mongoose from 'mongoose'
import pkg from 'validator'

const {isEmail} = pkg

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter a fullname']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,  'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

const User = mongoose.model('User', userSchema)

export default User
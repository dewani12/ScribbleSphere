import User from '../model/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// const handleErrors = (err) => {
//     console.log(err.message, err.code)
// }

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => { 
    return jwt.sign({ id },process.env.SECRET_KEY_JWT, {
        expiresIn: maxAge
    })
}

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body

        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({ mssg: "User already exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword
        })

        await createdUser.save()

        const token = createToken(createdUser._id)
        res.cookie('jwt', token, {maxAge: maxAge * 1000})

        return res.status(201).json({ mssg: "User created!" , user: createdUser._id})
    } catch (error) {
        // handleErrors(error)
        console.log("Error: " + error)
        return res.status(500).json("Internal server error")
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ mssg: "Invalid credentials!" })
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ mssg: "Invalid credentials!" })
        } else {
            const token = createToken(user._id)
            res.cookie('jwt', token, {maxAge: maxAge * 1000})
            return res.status(200).json({ mssg: "User logged in!" })
        }
    } catch (error) {
        // handleErrors(error)
        console.log("Error: " + error)
        return res.status(500).json({ mssg: "Internal server error" })
    }
}





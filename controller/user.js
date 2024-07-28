import User from '../model/user.js'
import bcrypt from 'bcryptjs'

// const handleErrors = (err) => {
//     console.log(err.message, err.code)
// }

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
        return res.status(201).json({ mssg: "User created!" })
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
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!user || !passwordMatch) {
            return res.status(400).json({ mssg: "Invalid credentials!" })
        } else {
            return res.status(200).json({ mssg: "User logged in!" })
        }
    } catch (error) {
        // handleErrors(error)
        console.log("Error: " + error)
        return res.status(500).json({ mssg: "Internal server error" })
    }
}





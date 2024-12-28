import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY_JWT, (err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.status(401).redirect('/login.html')
            }else{
                // console.log(decodedToken)
                next()
            }
        })
    }else{
        res.status(401).redirect('/login.html')
    }
}
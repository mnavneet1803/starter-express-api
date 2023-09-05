const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")

const verifyToken = async (req,res,next)=>{

    let token = req.headers['token']
    
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token, authConfig.secret,
        (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).send({
                    message: "Unauthorized!"
                })
            }
          else{
         
            // userType = decoded.userType
            req.phone = decoded.phone
            console.log(">>>>>>>",req.phone)
            // console.log("userType",userType)
            next()
          }
        })
}

module.exports = {
    verifyToken:verifyToken
}
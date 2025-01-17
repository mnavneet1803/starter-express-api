const bcrypt = require("bcryptjs")
const User=require("../models/user.model")
const jwt = require('jsonwebtoken')
const config = require("../configs/auth.config")

exports.signup = async (req,res)=>{
    const userObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        company_name: req.body.company_name,
        password: bcrypt.hashSync(req.body.password, 10),
        confirm_password: bcrypt.hashSync(req.body.confirm_password, 10),
        phone: req.body.phone,
        address: req.body.address,
        bussiness_type:req.body.bussiness_type
    }
    try {
        let userData = await User.find({ phone: userObj.phone })
        if(userData.length){
            res.send({
                status:0,
                message:"phone number already exist"
            })
        return
        }
        const data = await User.create(userObj)
        let token = jwt.sign({phone: data.phone }, config.secret, {
            expiresIn: 86400 // 24 hours
        })
        console.log("user created successful",data.phone)
        res.status(200).send({
            status:1,
            "message": "user created successful",
            accessToken:token,
            data:data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            "message": "Some internal error occured"
        })
        
    }
}

exports.signin= async (req,res)=>{ 
    const users = await User.find({ phone: req.body.phone })
   if (users.length==0) {
        res.status(400).send({
            status:0,
            message: "Failed! Userid doesn't exist!"
        })
        return
    }
   if (!bcrypt.compareSync(req.body.password, users[0].password)) {
        console.log("Condition met")
        res.status(401).send({
            status:0,
            message: "Invalid Password!"
        })
        return
    }
    let token = jwt.sign({phone: users[0].phone }, config.secret, {
        expiresIn: 86400 // 24 hours
    })
    
    res.status(200).send({
        status:1,
        "message":"sign in successfully",
        name:users[0].first_name,
        phone:users[0].phone,
        accessToken:token
    })
    
    return
}
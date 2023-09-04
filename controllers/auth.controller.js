const bcrypt = require("bcryptjs")
const User=require("../models/user.model")

exports.signup = async (req,res)=>{
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        company_name: req.body.company_name,
        password: bcrypt.hashSync(req.body.password, 10),
        confirm_password: bcrypt.hashSync(req.body.confirm_password, 10),
        phone: req.body.phone,
        address: req.body.address
    }
    try {
        const data = await User.create(user)
        res.status(200).send({
            "message": "user created successful",
            data:data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            "message": "Some internal error occured"
        })
        
    }
}
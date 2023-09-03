const express = require('express')
const app = express()

app.use(express.json());

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('you are at home page')
})

app.post("/signup",(req,res)=>{
    console.log(req.body)
    res.send({
        status:true,
        message:"signed up successfully",
        data:req.body
    })
})
app.listen(process.env.PORT || 3000)
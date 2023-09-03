const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dbConfig = require("./config/db.config")
app.use(express.json());
  

mongoose.connect(dbConfig.DB_URL)



const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"))
db.once("open", () => {
    console.log("Connected to Mongo DB")
    
})


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
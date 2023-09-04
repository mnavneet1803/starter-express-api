const express = require('express')
const app = express()
const mongoose = require("mongoose");
app.use(express.json());


const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://navneet:Navneet@cluster0.dky5xsn.mongodb.net/", {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  connectDB()

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('you are at home page')
})
let authRouter = require('./routes/auth.route')
authRouter(app)

app.listen(process.env.PORT || 3000)
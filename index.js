const express = require('express')
const app = express()
const mongoose = require("mongoose");
const path = require('path')
app.use(express.json());

app.use((req, res, next) => {

  console.log('Request received:', req.method, req.url);
  next();
});

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

  app.use("/public", express.static(path.join(__dirname, "public")));
  app.use("/images", express.static(path.join(__dirname, "images")));

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('you are at home page ' +process.env.PORT )
})
let authRouter = require('./routes/auth.route')
authRouter(app)
let productRouter = require('./routes/product.route')
productRouter(app)

app.listen(process.env.PORT || 3000,()=>{
  console.log("server is running  : ",process.env.PORT)}
          )

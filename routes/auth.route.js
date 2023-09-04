
const authController =require("../controllers/auth.controller")
module.exports = function authRouter(app) {
    app.post("/auth/signup",authController.signup)
    app.post("/auth/signin",authController.signin)
}
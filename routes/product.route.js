const middleware = require("../middleware/verify.token")
const productController =require("../controllers/product.controller")
module.exports = function authRouter(app) {
    app.post("/save/product",[middleware.verifyToken],productController.saveProduct)
    app.post("/get/product",[middleware.verifyToken],productController.findProduct)
    app.post("/delete/product",[middleware.verifyToken],productController.deleteProduct)
    app.post("/update/product",[middleware.verifyToken],productController.updateProduct)
    app.get("/get/products/done",[middleware.verifyToken],productController.findDoneProducts)
    app.get("/get/products/pending",[middleware.verifyToken],productController.findPendingProducts)
    app.get("/get/products/close",[middleware.verifyToken],productController.findcloseProducts)
    app.get("/export/products/pending",[middleware.verifyToken],productController.exportProduct)

}
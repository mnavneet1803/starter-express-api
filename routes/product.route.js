const middleware = require("../middleware/verify.token")
const productController =require("../controllers/product.controller")
module.exports = function authRouter(app) {
    app.post("/save/product",[middleware.verifyToken],productController.saveProduct)
    app.post("/get/product",[middleware.verifyToken],productController.findProduct)
    app.post("/delete/product",[middleware.verifyToken],productController.deleteProduct)
    app.post("/update/product",[middleware.verifyToken],productController.updateProduct)
    app.post("/change/status",[middleware.verifyToken],productController.changeStatus)
    app.post("/get/all/products",[middleware.verifyToken],productController.findAllProducts)
    app.get("/get/products/count",[middleware.verifyToken],productController.findProductsCount)
    app.get("/export/products/pending",[middleware.verifyToken],productController.exportProduct)
}
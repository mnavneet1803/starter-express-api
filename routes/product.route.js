const middleware = require("../middleware/verify.token")
const productController =require("../controllers/product.controller")
var multer = require("multer")
const fs = require('fs')
var mime = require("mime");
const path = require('path')


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log(file.fieldname);
//       var destFolder = 'images/';
//       if (!fs.existsSync(destFolder + file.fieldname)) {
//         fs.mkdirSync(destFolder + file.fieldname);
//       }
//       cb(null, destFolder);
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.fieldname + "/" + Date.now() + "." + "jpg"
//       );
//     },
//   });



    const storage = multer.diskStorage({ 
      destination: (req, file, cb) => {
        var destFolder = 'images';
        if (!fs.existsSync(destFolder )) {
          fs.mkdirSync(destFolder );
        }
        cb(null, destFolder) },
       filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)) }
       })
        const upload = multer({ storage: storage, limits: { fileSize: '1000000' }, 
        fileFilter: (req, file, cb) => { const fileTypes = /jpeg|jpg|png|gif/ 
        const mimeType = fileTypes.test(file.mimetype) 
        const extname = fileTypes.test(path.extname(file.originalname)) 
        if(mimeType && extname) { 
          return cb(null, true) } 
          cb('Give proper files formate to upload') 
        } }).single('image')

  
module.exports = function authRouter(app) {
    app.post("/save/image",upload,productController.saveImage)
    app.post("/save/product",[middleware.verifyToken],productController.saveProduct)
    app.post("/get/product",[middleware.verifyToken],productController.findProduct)
    app.post("/delete/product",[middleware.verifyToken],productController.deleteProduct)
    app.post("/update/product",[middleware.verifyToken],productController.updateProduct)
    app.post("/change/status",[middleware.verifyToken],productController.changeStatus)
    app.post("/get/all/products",[middleware.verifyToken],productController.findAllProducts)
    app.get("/get/products/count",[middleware.verifyToken],productController.findProductsCount)
    app.get("/export/products/pending",[middleware.verifyToken],productController.exportProduct)
}

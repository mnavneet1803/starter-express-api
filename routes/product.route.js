const middleware = require("../middleware/verify.token")
const productController =require("../controllers/product.controller")
var multer = require("multer")
const fs = require('@cyclic.sh/s3fs')(S3_BUCKET_NAME, {
   AWS_REGION:'us-east-1' ,
   AWS_ACCESS_KEY_ID:'ASIA6GKMLSLURJSARWME',
   AWS_SECRET_ACCESS_KEY:'3rE5auM48vYk2u0eR8X+DzUL7DJ4X7PkgSJuxa+p',
   AWS_SESSION_TOKEN:'IQoJb3JpZ2luX2VjEMf//////////wEaCmFwLXNvdXRoLTEiSDBGAiEA7+G7ePcXxfUJ7z/8ZXahaNstokXBV8DWQgBIkJd741sCIQC0xoAg8eYhaqtKLfGEFsq1uYutGFxFemGwwWrTHHNqyiq1AgjA//////////8BEAAaDDk3NTY1NDU4OTE2MSIMovnWLnlv1H2moFxMKokCWDm/xsVm5gYlv+kqvF5PyHly3eD7rx5OybTZBu8ah2KMTzCM4P6hqxJVr2VkogHkLs+DCViCR0EtwW7b2nfbavPjsTy2A1poF3vEHgbucZvZnJVB+uoENOpFUpJKRad67hEykWQ9azRnYZsQU71mKIeBnd+55QZcgO3Rj1SkggxyHMDUGAlc5rOPQdrGlyX00r2vyVPCyBc0coYzLX4MbCL/EwsaI8cOQy5GUnyPzuopo7R85Kvi/FJ3UiY0SOEP3TBJQJzANU9NJs2mVok66+Gp4jsI8KPIMYbVLBLQe+vFMs8ngw2s5iJTpbdJID0o5ZQQDG9IdQgeVx7IYn/ZTpLIX2csN+FqeTDDzNuoBjqcAZUkNyzfESJR59F75cRmTwPkQjAZsNMxI4W3ZOno/8WcdHklKkyBsy7X+0uBQIQ5jbD2Yxy0GRFrF3pbG9VCWjAYykfKNRvhjLGmk2NAcn2dpcVxebU57ftszvbYGo/i7YlXfzX22U3UPL+Xq0yvdRT7tnnwPodHAL3NKKyz2/IvfC/cwTbyMn2AO5KQTS5DLGmOAlGycekN+lsKCg=='
})
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
        var destFolder = process.env.CYCLIC_BUCKET_NAME;
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

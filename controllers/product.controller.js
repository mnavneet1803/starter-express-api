const Product = require("../models/product.model")
const excelJS = require("exceljs");
const path = require('path')

exports.saveProduct = async (req, res) => {
    const productObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        product_name: req.body.product_name,
        phone: req.body.phone,
        user_phone: req.phone,
        date: req.body.date,
        deal: req.body.deal
    }
    try {
        const data = await Product.create(productObj)
        console.log("product created successful")
        res.status(200).send({
            "message": "product created successful",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            "message": "Some internal error occured"
        })

    }
}

exports.findDoneProducts = async (req, res) => {
    let data = await Product.find({ user_phone: req.phone, deal: "done" })
    res.send({
        status: 1,
        data: data
    })
}

exports.findPendingProducts = async (req, res) => {
    let data = await Product.find({ user_phone: req.phone, deal: "pending" })
    res.send({
        status: 1,
        data: data
    })
}
exports.findcloseProducts = async (req, res) => {
    let data = await Product.find({ user_phone: req.phone, deal: "close" })
    res.send({
        status: 1,
        data: data
    })
}

exports.updateProduct = async (req, res) => {
    let id = { "_id": req.body.id }
    let data = await Product.findOneAndUpdate(id, req.body)
    res.send({
        status: 1,
        data: data
    })
}

exports.findProduct = async (req, res) => {
    let data = await Product.findOne({ "_id": req.body.id })
    res.send({
        status: 1,
        data: data
    })
}


exports.deleteProduct = async (req, res) => {
    let data = await Product.findOne({ "_id": req.body.id })
    console.log("data");

    if (data) {
        console.log("hello", data);
        data = await Product.deleteOne({ "_id": req.body.id })
    }
    else {
        res.status(400).send({
            status: 0,
            message: "data not found"
        })
    }
    res.send({
        status: 1,
        message: "deleted successfully"
    })
}



exports.exportProduct = async (req, res) => {
    let Data = await Product.find({ user_phone: req.phone, deal: "pending" }).select('first_name last_name product_name phone deal date')

    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("My Users"); // New Worksheet

    const outputFolder = path.resolve(__dirname, '../public/uploads');
    const excelFileName = `${Math.floor(Math.random() * 10000000000)}.xlsx`;
    const excelFilePath = `${outputFolder}/${excelFileName}`;
    // Column for data in excel. key must match data key
    worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "First Name", key: "first_name", width: 15 },
        { header: "Last Name", key: "last_name", width: 15 },
        { header: "Product Name", key: "product_name", width: 15 },
        { header: "Phone", key: "phone", width: 15 },
        { header: "Deal", key: "deal", width: 15 },
        { header: "Date", key: "date", width: 15 },
    ];
    // Looping through User data
    let counter = 1;
    Data.forEach((data) => {
        data.s_no = counter;
        worksheet.addRow(data); // Add data in worksheet
        counter++;
    });
    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });
    try {
        const data = await workbook.xlsx.writeFile(`${excelFilePath}`)
            .then(() => {
                res.send({
                    status: "success",
                    message: "file successfully downloaded",
                    path: `public/uploads/${excelFileName}`,
                });
            });
    } catch (err) {
        res.send({
            status: "error",
            message: "Something went wrong",
        });
    }
};


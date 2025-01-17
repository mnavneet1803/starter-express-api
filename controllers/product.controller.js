const Product = require("../models/product.model")
const excelJS = require("exceljs");
const fs = require('fs');
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

exports.findAllProducts = async (req, res) => {
    let deal
    if(req.body.deal==0){
        deal="pending"
    }else if(req.body.deal==1){
        deal = "done"
    }else{
        deal = "close"
    }

    let data = await Product.find({ user_phone: req.phone, deal: deal })
    res.send({
        status: 1,
        data: data
    })
}
exports.findProductsCount = async (req, res) => {
    let doneCount = await Product.find({ user_phone: req.phone, deal: "done" })
    let pendingCount = await Product.find({ user_phone: req.phone, deal: "pending" })
    let closeCount = await Product.find({ user_phone: req.phone, deal: "close" })
console.log(doneCount.length);
    res.send({
        status: 1,
        doneCount:doneCount.length,
        pendingCount:pendingCount.length,
        closeCount:closeCount.length
    })
}

exports.updateProduct = async (req, res) => {
    let id = { "_id": req.body.id }
    let data = await Product.findOneAndUpdate(id, req.body)
    res.send({
        status: 1,
        message:"data updated successfully",
        data: data
    })
}

exports.changeStatus = async (req, res) => {
    let id = { "_id": req.body.id }
    let data = await Product.findOneAndUpdate(id, req.body)
    res.send({
        status: 1,
        message:"data updated successfully",
        data: data
    })
}


exports.findProduct = async (req, res) => {
    let data = await Product.findOne({ "_id": req.body.id })
    res.send({
        status: 1,
        message:"data got successfully",
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

exports.saveImage = async (req,res)=>{

        console.log(req.file);
        res.send(req.file)
}



exports.exportProduct = async (req, res) => {
    // let Data = await Product.find({ user_phone: req.phone, deal: "pending" }).select('first_name last_name product_name phone deal date')

    // const workbook = new excelJS.Workbook();  // Create a new workbook
    // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet

    // const outputFolder = ('/public/uploads');
    // const excelFileName = `${Math.floor(Math.random() * 10000000000)}.xlsx`;
    // const excelFilePath = `${outputFolder}/${excelFileName}`;
    // console.log(excelFilePath);
    // res.send({
    //     status :0,
    //     message:"this api is not workin now"
    // })
    // return
    // // Column for data in excel. key must match data key
    // worksheet.columns = [
    //     { header: "S no.", key: "s_no", width: 10 },
    //     { header: "First Name", key: "first_name", width: 15 },
    //     { header: "Last Name", key: "last_name", width: 15 },
    //     { header: "Product Name", key: "product_name", width: 15 },
    //     { header: "Phone", key: "phone", width: 15 },
    //     { header: "Deal", key: "deal", width: 15 },
    //     { header: "Date", key: "date", width: 15 },
    // ];
    // // Looping through User data
    // let counter = 1;
    // Data.forEach((data) => {
    //     data.s_no = counter;
    //     worksheet.addRow(data); // Add data in worksheet
    //     counter++;
    // });
    // // Making first line in excel bold
    // worksheet.getRow(1).eachCell((cell) => {
    //     cell.font = { bold: true };
    // });
    // try {
    //     const data = await workbook.xlsx.writeFile(`${excelFilePath}`)
    //         .then(() => {
    //             res.send({
    //                 status: "success",
    //                 message: "file successfully downloaded",
    //                 path: `public/uploads/${excelFileName}`,
    //             });
    //         });
    // } catch (err) {
    //     res.send({
    //         status: "error",
    //         message: "Something went wrong",
    //     });
    // }
    res.send({
        status:true
    })
return
let Data = await Product.find({ user_phone: req.phone, deal: "done" }).select('first_name last_name product_name phone deal date');

const outputFolder = './public/uploads';
const excelFileName = `${Math.floor(Math.random() * 10000000000)}.xlsx`;
const excelFilePath = `${outputFolder}/${excelFileName}`;

console.log(excelFilePath);

// Create an array to hold the data in the desired format for Excel
const formattedDataForExcel = Data.map((data, index) => ({
    s_no: index + 1,
    first_name: data.first_name,
    last_name: data.last_name,
    product_name: data.product_name,
    phone: data.phone,
    deal: data.deal,
    date: data.date
}));

// Create an Excel workbook and worksheet
const workbook = new excelJS.Workbook();
const worksheet = workbook.addWorksheet("My Users");

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

// Add data to the Excel worksheet
formattedDataForExcel.forEach((data) => {
    worksheet.addRow(data);
});

// Making first line in excel bold
worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
});

try {
    // Write data to CSV file
    const csvContent = formattedDataForExcel.map(data => Object.values(data).join(','));
    const csvFilePath = `${outputFolder}/${excelFileName.replace('.xlsx', '.csv')}`;
    fs.writeFileSync(csvFilePath, `${Object.keys(formattedDataForExcel[0]).join(',')}\n${csvContent.join('\n')}`);

    // Write data to Excel file
    await workbook.xlsx.writeFile(excelFilePath);
    
    res.send({
        status: "success",
        message: "Files successfully generated and downloaded",
        excelFilePath: `public/uploads/${excelFileName}`,
        csvFilePath: `public/uploads/${excelFileName.replace('.xlsx', '.csv')}`
    });
} catch (err) {
    res.send({
        status: "error",
        message: "Something went wrong",
    });
}

};




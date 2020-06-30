const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');
const multer = require('multer');
const auth = require('../../midleware/auth');
var fname;
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads');

    },
    filename: function (req, file, cb) {
        const ffname = new Date().getTime() + '_' + file.originalname;
        fname = ffname;
        cb(null, fname);

        console.log();

    }

});
const upload = multer({ storage: storage }).single('file');



router.post('/aprove', (req, res) => {
    console.log("hit post");
    Product.updateOne({ _id: req.body.id }, { Aproved: true }).then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
});



router.get('/notaprove', (req, res) => { //localhost:5000/api/products
    console.log("hit get");
    Product.find({ Aproved: false })
        .then(product => res.json(product))

});


router.post('/', (req, res) => {
    var path;
    // console.log(req.file);
    upload(req, res, function (err) {

        path = req.file.path;
        // if(err){
        //     res.json({error_code:1, error_desc:err});
        //     return;
        // }
        // res.json({error_code:0,error_desc:null});
        // console.log("hit add image................................................................");
        //res.json({success:true});
        //console.log("hit post request..............................................")

        //console.log(req.body.productName);
        var m_ID = 0;
        //{},{product_ID:1, _id:0}
        //.sort({product_ID:-1}).limit(1)

        Product.find({}, { product_ID: 1, _id: 0 }).sort({ product_ID: -1 }).limit(1).then(
            p_ID => {
                //console.log(p_ID[0].product_ID);
                try {
                    m_ID = p_ID[0].product_ID;
                }
                catch (err) {
                    console.log(err);
                }



                m_ID++;
                console.log(path);

                // console.log(".........................................................................");
                // console.log(m_ID);
                // console.log(".........................................................................");
                const nproduct = new Product({
                    product_ID: m_ID,
                    Product_Name: req.body.productName,
                    Product_Discription: req.body.productDiscriptio,
                    Product_Brand: req.body.brand,
                    Product_Price: req.body.productPrice,
                    Image: path

                });
                //console.log(nproduct);
                nproduct.save().then(products => res.json(products));
                //console.log(res);
            }
        );

    })




    //
    //
});





router.delete('/:id', (req, res) => {
    //console.log(req.params.id);
    Product.findById(req.params.id)
        .then(products => products.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});






module.exports = router;
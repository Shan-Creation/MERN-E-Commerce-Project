const express = require('express');
const router = express.Router();

const Baner = require('../../models/MainBaner');
const Counter = require('../../models/Counters');
const multer = require('multer');
const auth = require('../../midleware/auth');
var fname;
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './baners');

    },
    filename: function (req, file, cb) {
        const ffname = new Date().getTime() + '_' + file.originalname;
        fname = ffname;
        cb(null, fname);

        console.log();

    }

});
const upload = multer({ storage: storage }).single('file');







router.get('/', (req, res) => { //localhost:5000/api/products


    console.log("hit baner");
    Baner.find()
        .then(baner => res.json(baner))

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

        Baner.find({}, { baner_ID: 1, _id: 0 }).sort({ baner_ID: -1 }).limit(1).then(
            p_ID => {
                //console.log(p_ID[0].product_ID);
                try {
                    m_ID = p_ID[0].baner_ID;
                }
                catch (err) {
                    console.log(err);
                }



                m_ID++;
                console.log(path);
                console.log(path.replace(/\\/g, "/"));
                path = path.replace(/\\/g, "/")

                // console.log(".........................................................................");
                // console.log(m_ID);
                // console.log(".........................................................................");
                const nBaner = new Baner({
                    baner_ID: m_ID,
                    baner_Name: req.body.banerName,
                    Image: path

                });
                //console.log(nproduct);
                nBaner.save().then(baner => res.json(baner));
                //console.log(res);
            }
        );

    })




    //
    //
});

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Baner.findById(req.params.id)
        .then(baner => baner.remove().then(() => res.json({ success: true, id: req.params.id })))
        .catch(err => res.status(404).json({ success: false }));
});






module.exports = router;
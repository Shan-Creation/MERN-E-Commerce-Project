
const multer = require('multer');
const Img = require ('../../models/uploadModel');
// const path = require ('path');
// const ejs = require('ejs');
const express = require('express');
const router =  express.Router();
var fname;
const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null,'./uploads');

    },
    filename:function(req,file,cb){
        const ffname=new Date().getTime()+'_'+ file.originalname;
        fname = ffname;
        cb(null, fname);
        console.log(fname);
        const nimg = new Img({
            PImageName:fname
        });
        nimg.save();
    }
    
});
const upload = multer({storage:storage}).single('file');


// const storage = multer.diskStorage({
//     destination:'./public/uploads/'
// });

router.post('/',function(req,res){
    upload(req,res,function(err){
        // if(err){
        //     res.json({error_code:1, error_desc:err});
        //     return;
        // }
        // res.json({error_code:0,error_desc:null});

    })

    console.log("hit add image................................................................");
    res.json({success:true});
    });

// router.post('/', function(req, res){
//     upload(req, res,);
// });

    module.exports = router;
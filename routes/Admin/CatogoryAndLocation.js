//import Cat from '../../models/Catogery';
//import Location from '../../models/Location';
const catogery = require('../../models/Catogery');
const Location = require('../../models/Location');
const express = require('express');
const router = express.Router();
//const adminAuth = require('../../midleware/adminAuth');

router.post('/catogery', (req, res) => {

    var m_ID = 0;
    //{},{product_ID:1, _id:0}
    //.sort({product_ID:-1}).limit(1)

    catogery.find({}, { Catogery_ID: 1, _id: 0 }).sort({ Catogery_ID: -1 }).limit(1).then(
        C_ID => {
            //console.log(p_ID[0].product_ID);
            try {
                m_ID = C_ID[0].Catogery_ID;
            }
            catch (err) {
                console.log(err);
            }



            m_ID++;

            const nCatogory = new catogery({
                Catogery_ID: m_ID,
                CatogeryName: req.body.catogeryName,
                Discription: req.body.catogeryDiscriptio,

            });
            //console.log(nproduct);
            nCatogory.save().then(catogery => res.json(catogery));
            //console.log(res);
        }
    );

})

router.post('/location', (req, res) => {

    var m_ID = 0;
    //{},{product_ID:1, _id:0}
    //.sort({product_ID:-1}).limit(1)

    Location.find({}, { Location_ID: 1, _id: 0 }).sort({ Location_ID: -1 }).limit(1).then(
        C_ID => {
            //console.log(p_ID[0].product_ID);
            try {
                m_ID = C_ID[0].Location_ID;
            }
            catch (err) {
                console.log(err);
            }



            m_ID++;

            const nLocation = new Location({
                Location_ID: m_ID,
                LocationName: req.body.locationName,
                Discription: req.body.locationDiscription,

            });
            //console.log(nproduct);
            nLocation.save().then(location => res.json(location));
            //console.log(res);
        }
    );

})

router.get('/location', (req, res) => { //localhost:5000/api/products
    console.log("hit get location");
    Location.find()
        .then(location => res.json(location))

});




module.exports = router;
const express = require('express');
const router = express.Router();

const Contact = require('../../models/contact');
const multer = require('multer');
const auth = require('../../midleware/auth');
var fname;








router.get('/', (req, res) => { //localhost:5000/api/products
    console.log("hit contact");
    Contact.find({ viewed: false })
        .then(contact => res.json(contact))

});


router.post('/', (req, res) => {
    const { Name, Email, Phone, Title, message, } = req.body;
    console.log(req.body);
    const newContact = new Contact({

        Name,
        Email,
        Title,
        Phone,
        message

    });
    newContact.save().then(contact => res.json(contact));
    //console.log(res);
});






router.delete('/:id', (req, res) => {
    //console.log(req.params.id);
    Contact.findById(req.params.id)
        .then(contact => contact.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});






module.exports = router;
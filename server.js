const express = require('express'); //It is the server framework 

const mongoose = require('mongoose'); // It is an elegant mongodb
const config = require('config'); //Mongodb Require

//const bodyParser = require('body-parser');

//const prod = require('./routes/api/products');

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("db conected..."))
    .catch(err => console.log(err));// function (err){ console.log(err);}

app.use('/api/products', require('./routes/api/products'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/uploads', require('./routes/api/uploads'));
app.use('/api/auth', require('./routes/api/auth'));

app.use('/admin/product', require('./routes/Admin/AdminProduct'));
app.use('/admin/register', require('./routes/Admin/AdminRegister'));
app.use('/admin/auth', require('./routes/Admin/adminAuth'));
app.use('/admin/cl', require('./routes/Admin/CatogoryAndLocation'));
app.use('/admin/baner', require('./routes/Admin/Baner'));

app.use('/api/contact', require('./routes/api/Contact'));


app.use('/uploads', express.static('uploads'));
app.use('/baners', express.static('baners'));
app.use('/UserProfile', express.static('userprofile'));

app.use('/counter', require('./routes/api/count'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`))

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const User = require('./models/user');


const app = express();
const port =3000;


mongoose.connect('mongodb://localhost:27017/project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});



app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/second', function (req, res) {
    res.render('second');
});
app.get('/third', function (req, res) {
    res.render('third');
});
app.get('/userexist', function (req, res) {
    res.render('userexist');
});

app.get('/sent', function (req, res) {
    res.render('msg');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.post('/contact', async(req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(user){
            res.redirect('http://localhost:3000/userexist');
        }
        else{const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        res.redirect('http://localhost:3000/sent')}
    }catch(error){
        console.error('Error saving user:', error);
        res.status(500).send('Error registering user');
    }
});



app.listen(port, () => {
    console.log(`Server is running on port :${port}`);
});
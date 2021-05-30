const express = require('express');
const {request} = require('express')
const hbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const {env} = require('process')
require('dotenv').config();

const app = express();

const transporter = nodemailer.createTransport({
    host: 'smtpgmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });
  transporter.verify().then(()=>{
    console.log('Listo para enviar correo!');
});

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: false
}));

app.engine('.hbs' , hbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/nosotros', (req, res)=>{
    res.render('nosotros')
})

app.get('/productos', (req, res)=>{
    res.render('productos')
})

app.get('/especializados', (req, res)=>{
    res.render('especializados')
})

app.get('/contactos', (req, res)=>{
    res.render('contactos')
})

app.post('/contactos',async(req,res)=>{
 await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to: process.env.MAIL_USER, // list of receivers
    subject: `${req.body.name}`, // Subject line
    html: `<h1>${req.body.fullname}</h1>
    <h1>${req.body.email}</h1>
    <h1>${req.body.telefono}</h1>
    <h1>Solicita la siguiente informacion</h1>
    <h1>${req.body.asunto}</h1>` // html body
  });
    res.redirect('contactos');
})

app.get('/menu', (req, res)=>{
    res.render('menu')
})


app.listen(PORT, ()=>{
    console.log(`Server at http://localhost:${PORT}`);
})
  

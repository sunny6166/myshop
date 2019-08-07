require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
//const favicon      = require('serve-favicon');
//const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
var multer = require('multer');

// WHEN INTRODUCING USERS DO THIS:
// INSTALL THESE DEPENDENCIES: passport-local, passport, bcryptjs, express-session
// AND UN-COMMENT OUT FOLLOWING LINES:

// const session       = require('express-session');
// const passport      = require('passport');

// require('./configs/passport');

// IF YOU STILL DIDN'T, GO TO 'configs/passport.js' AND UN-COMMENT OUT THE WHOLE FILE

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true})
    .then(()=> {
        console.log("connected to mongo")
    })
    .catch((err)=> {
        console.log("not connected to mognod", err)
    })


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Express View engine setup
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/uploads', express.static('uploads'));
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// file upload:
app.use(cors())
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})
var upload = multer({ storage: storage }).single('file')
app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});


// USE passport.initialize() and passport.session() HERE:





// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(cors({
  origin: ["http://localhost:3000", "localhost:3000"],
  credentials: true,
}))

// ROUTES MIDDLEWARE STARTS HERE:

const index = require('./routes/index');
app.use('/', index);
app.use('/api',require('./routes/product'));
app.use('/api/auth',require('./routes/auth'));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('./frontend/build'));
  app.use((req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "./public/index.html");
  });
}


app.listen(process.env.PORT,()=>{
  console.log("listening")
})

module.exports = app;
const express =  require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// user for session cookie and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

// Reading from post request
app.use(express.urlencoded());

// Setting up the cookie parser
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);


// Extract style and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// using middlware for session for encryption and decryption
// 2. mongo store is used to store the session 
app.use(session({
    // Name of Cookie
    name:'Codeial',
    // key used for encoding
    // ToDo change the secret before deployment in production mode
    secret:'blahsomething',
    // when the user is not logged in we dont want to extra data in cookie so it is false
    saveUninitialized:false,
    // when user is logged in we dont want to save the same data in cookie again and again
    resave:false,
    // for how long the cookie will be valid
    cookie:{
        maxAge:(1000*60*10)
    },
    // even if the server will be restart the authenticated user will remain authenticated
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://127.0.0.1/codeial_developement_passportjs',
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

// Whenever any request is comming then this middleware is called and user will be set in locals
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));
// app.use('/users',require('./routes/users'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})
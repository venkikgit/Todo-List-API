const app = require('./app');
const dotenv = require('dotenv');

const databaseConnect = require('./config/mongoose');
dotenv.config({path: './.env'});

const cookieParser = require('cookie-parser');
const session = require('express-session');


// passport strategy
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
// app.use(cors());
app.use(cookieParser());
app.use(session({
    name:'todoAPI',
    // TODO change the secret before deployment in production 
    secret: 'blahblah',
    saveUninitialized:false,  //Whenever there is a request that the session is not iniatilized i.e user is not logged in i.e identity is not established
    resave: false, //Identity is established and we don't need to rewrite the chnages
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: process.env.DATABASE,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
        
}));
// passport configuration
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// handling uncaught exceptions
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting dow the server due to uncaughtException`);
    process.exit(1);
})

// console.log(YT);

databaseConnect();

const server = app.listen(process.env.PORT,()=>{
    console.log('Server is running on Port Number',`${process.env.PORT}`);
});
// Unahandled promise rejections

process.on("unhandledRejection",err=>{
    console.log(`Error :${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})

const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const session = require('express-session');

const bodyParser = require('body-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('./config/database')
const app = express();
const PORT = 7050

require('dotenv').config()

require('./config/passport')(passport);

// BODY PARSER
app.use(bodyParser.json()); // use this instead
app.use(bodyParser.urlencoded({
    extended: true
}));


// MONGOOSE
mongoose.connect(config.uri)
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Database has been connected.')
})

// STATIC FILES
app.use(express.static('public'));
app.use(express.static('uploads'));

// VIEWS - JADE
app.set('view engine', 'jade');
app.set('/views', './views');

// CONNECT FLASH
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// SESSION
const store = new MongoDBStore({
    uri: config.uri,
    collection: 'sessions'
});



app.use(session({
    secret: 'Tier Data Limited',
    resave: true,
    saveUninitialized: true,
    store: store
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());


// ROUTES
const auth = require('./routes/authentication');
const account = require('./routes/account');

app.use("/", auth)
app.use('/account', account);


// cronjobs
const events = require('./cron/events');

setInterval(()=>{
events()
},60000)


app.listen(PORT, () => {
    console.log('App is running on port ' + PORT)
})



// functions
         

// let array = ['Andrew', 'Kibe'];

// array.map((x,index)=>{
//     console.log(x,index)
// })

// const name = array.filter((x)=>{
//     return x === 'Andrew'
// })
// console.log(name)

// async function
// Promises

// function A()
// {
// let array = ['Andrew', 'Kibe'];

// array.map((x,index)=>{
//     console.log(x,index)
// })

// const name = array.filter((x)=>{
//     return x === 'Andrew'
// })
// console.log(name)
// }
// function B()
// {
//     console.log('my name is Andrew')

// }
// async function C()
// {
//     await A();
//     B();

// }
// C()


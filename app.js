const express = require('express');
const path = require('path');
const dotenv = require('dotenv') //virtual environment
const exphbs  = require('express-handlebars');
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./database/connection');

// Initialize express
const app = new express();

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./services/passport')(passport)

// Initialize DB
connectDB()

// Template engine (handlebars)
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)


//static folder
app.use(express.static(path.join(__dirname, 'public')))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/courseEntries', require('./routes/courseEntries'))







const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running on port ${PORT}`));

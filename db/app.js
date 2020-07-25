const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(cookieParser());
const cors = require('cors');
app.use(cors());
app.options('*', cors());
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//middleware for JSON data
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 15000;
// this is deprecated:
// app.use(expressValidator());
// var checkAuth = (req, res, next) => {
//   console.log("Checking authentication");
//   if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
//     req.user = null;
//   } else {
//     var token = req.cookies.nToken;
//     var decodedToken = jwt.decode(token, { complete: true }) || {};
//     req.user = decodedToken.payload;
//   }
//   next();
// };
// app.use(checkAuth);


const User = require('./models/user.js');
const users = require('./controllers/users.js')(app);
const Comment = require('./models/comment.js');
const comments = require('./controllers/comments.js')(app);
const Session = require('./models/session.js');
const sessions = require('./controllers/sessions.js')(app);
app.use(express.static('Public'));
//heroku database.
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/db'), { useNewUrlParser: true });
//views middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen(port);
module.exports = app;

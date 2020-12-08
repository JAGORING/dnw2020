const express = require('express');
const path = require('path');
const morgan = require('morgan');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const connect = require('./schemas');
var ejs = require("ejs");

// render
const writeRouter = require('./routes/bindex');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const clothesRouter = require('./routes/clothes');
var bindexRouter = require('./routes/bindex');

dotenv.config();

const app = express();

//ejs 이중이 뭐가 진짜일까 ㅎㅎ;

// 이렇게만 하면 ejs 문법이 적용되고 랜더링이 맛이가고

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine("ejs", ejs.renderFile);

// 애를 추가하면 ejs 문법이 날라감 
// nunjucks.configure('views', {
//   express: app,
//   watch: true,
// });




// server
app.set('port', process.env.PORT || 3000);




connect();
app.use(morgan('dev'));


//css
app.use('/js', express.static(__dirname + '/assets/js')); // redirect bootstrap JS
app.use('/sass', express.static(__dirname + '/assets/sass'));
app.use('/webfonts', express.static(__dirname + '/assets/webfonts'));
app.use('/css', express.static(__dirname + '/assets/css')); // redirect CSS bootstrap
app.use('/images', express.static(__dirname + '/images'));

//login
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));




// cookise

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//render use
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/bindex', bindexRouter);
app.use('/clothes', clothesRouter);
app.use('/write', writeRouter);



// error

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

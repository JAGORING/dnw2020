const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');

const connect = require('./schemas');

dotenv.config();
const indexRouter = require('./routes/index');
//const loginRouter = require('./routes/login');
//const signupRouter = require('./routes/signup');
//const singleRouter = require('./routes/single');


const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

connect();

app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/assets/js')); // redirect bootstrap JS
app.use('/sass', express.static(__dirname + '/assets/sass'));
app.use('/webfonts', express.static(__dirname + '/assets/webfonts'));
app.use('/css', express.static(__dirname + '/assets/css')); // redirect CSS bootstrap
app.use('/images', express.static(__dirname + '/images'));
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

app.use('/', indexRouter);
//app.use('/login', loginRouter);
//app.use('/signup', signupRouter);
//app.use('/single', singleRouter);


app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});


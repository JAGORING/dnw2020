const express = require('express');
const path = require('path');

const app = express();

app.use('/js', express.static(__dirname + '/assets/js')); // redirect bootstrap JS
app.use('/sass', express.static(__dirname + '/assets/sass'));
app.use('/webfonts', express.static(__dirname + '/assets/webfonts'));
app.use('/css', express.static(__dirname + '/assets/css')); // redirect CSS bootstrap
app.use('/images', express.static(__dirname + '/images'));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.html'));
});

  
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

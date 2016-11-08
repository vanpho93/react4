var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//github.com/vanpho93
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

server.listen(3000);

app.get('/', function(req, res){
  res.render('trangchu');
});

io.on('connection', function(socket){
  console.log('New user connected');
});

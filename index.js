var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uploader = require('./uploader.js')('avatar');
var session = require('express-session');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});
//github.com/vanpho93
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(session(
  {
    secret: 'djagh263%asdb23',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2*60*60*1000
    }
  }
));

app.post('/xulydangnhap', parser, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  require('./db.js').checkSignIn(username, function(err, result){
    if(err){
      res.send('0'); //Loi truy van
    }else{
      if(result.rowCount == 1){
        if(password == require('./crypto').decrypt(result.rows[0].password)){
          res.send('2'); //Dang nhap thanh cong
          req.session.daDangNhap = true;
        }else{
          res.send('3'); //Sai mat khau
        }
      }else{
        res.send('1'); //Khong ton tai username
      }
    }
  });
});

server.listen(3000);

app.get('/', function(req, res){
  res.render('trangchu');
});

app.post('/uploadNew',parser, function(req, res){
  console.log('da vao day roi');
  upload(req, res, function(err){
    if(err){
      res.send('LOI')
    }else{
      res.send('Thanh cong')
    }
  });
});

app.get('/dangky', function(req, res){
  res.render('dangky');
});

app.post('/xulydangky', parser, function(req, res){
  uploader(req, res, function(err){
    if(err){
      res.send('Loi upload');
    }else{
      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      var hinh = req.file.filename;

      require('./db.js').insertNewUser(username, password, hinh, email,
        function(err){
          res.send('Username da ton tai')
        },
        function(result){
          res.send('Thanh cong');
        }
      )
    }
  });
});

io.on('connection', function(socket){
  console.log('New user connected');
});

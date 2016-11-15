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
    cookie:{
      maxAge: 1000000
    }
  }
));

app.use(function (req, res, next) {
  if(req.session.a == undefined){
    req.session.a = 0;
  }else{
    req.session.a ++;
  }
  next();
})

app.post('/xulydangnhap', parser, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  require('./db.js').checkSignIn(username, function(err, result){
    if(err){
      res.send('0'); //Loi truy van
    }else{
      if(result.rowCount == 1){
        if(password == require('./crypto').decrypt(result.rows[0].password)){
          req.session.daDangNhap = true;
          res.send('2'); //Dang nhap thanh cong
          console.log('dang nhap thanh cong');
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
  if(req.session.daDangNhap == undefined){
    req.session.daDangNhap = false;
  }
  res.render('trangchu', {daDangNhap: req.session.daDangNhap});
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

app.get('/muave', function(req, res){
  req.session.daMuaVe = true;
  res.send('Ban da mua ve')
});

app.get('/vaorap', function(req, res){
  if(req.session.daMuaVe){
    res.send('welcome')
  }else{
    res.send('Hay mua ve')
  }
});

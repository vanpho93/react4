var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uploader = require('./uploader.js')('avatar');

var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});
//github.com/vanpho93
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

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
          res.send(result);
        }
      )
    }
  });
});

io.on('connection', function(socket){
  console.log('New user connected');

  socket.on('USER_DANG_NHAP', function(data){
    var username = data.username;
    var password = data.password;

    require('./db.js').checkSignIn(username, function(err, result){
      if(err){
        socket.emit('XAC_NHAN_DANG_NHAP', 0); //Loi truy van
      }else{
        if(result.rowCount == 1){
          if(password == require('./crypto').decrypt(result.rows[0].password)){
            socket.emit('XAC_NHAN_DANG_NHAP', 2);
          }else{
            socket.emit('XAC_NHAN_DANG_NHAP', 3);
          }
        }else{
          socket.emit('XAC_NHAN_DANG_NHAP', 1); //Khong ton tai username
        }
      }
    });
  });
});

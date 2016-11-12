var pg = require('pg');
var crypto = require('./crypto.js');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  database: 'CHATREALTIME',
  max: 1000
};
var pool = new pg.Pool(config);

function query(sql, cb){
  pool.connect(function(err, client, done){
    if(err){
      done();
      console.log('LOI KET NOI: ' + err);
    }else{
      client.query(sql, function(err, result){
        done();
        cb(err, result);
      });
    }
  });
}

//query(`SELECT * FROM "User"`, cb);

function insertNewUser(username, password, image, email, cbFail, cbSuccess){
  var sql = `INSERT INTO "User"("username", "password", "image", "email")
  VALUES ('${username}','${crypto.encrypt(password)}','${image}','${email}')`;
  query(sql, function(err, result){
    if(err){
      cbFail(err);
    }else{
      cbSuccess(result);
    }
  });
}

// insertNewUser('phcdhcddcd', '123', '2.png', 'asdjfa', function(e){
//   console.log(e);
// },function(err, result){
//   if(err){
//     console.log('Khong thanh cong');
//   }else{
//     console.log(result);
//     console.log('Thanh cong');
//   }
// });

function checkSignIn(username, cb){
  var sql = `SELECT * FROM "User" WHERE "username" = '${username}'`;
  query(sql, function(err, result){
    cb(err, result);
  });
}
// function checkSignIn(username, password, cb){
//   var sql = `SELECT * FROM "User" WHERE "username" = '${username}'`;
//   query(sql, function(err, result){
//     if(result.rowCount == 0){
//       console.log('Khong ton tai user');
//     }else{
//       if(crypto.decrypt(result.rows[0].password) == password){
//         console.log('Thanh cong');
//       }else{
//         console.log('Sai mat khau');
//       }
//     }
//   });


module.exports = {
  insertNewUser: insertNewUser,
  checkSignIn: checkSignIn
}

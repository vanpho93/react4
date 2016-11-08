var pg = require('pg');
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

function insertNewUser(username, password, image, email, cb){
  var sql = `INSERT INTO "User"("username", "password", "image", "email")
  VALUES ('${username}','${password}','${image}','${email}')`;
  query(sql, cb);
}

insertNewUser('pho12', '123', '2.png', 'asdjfa', function(err, result){
  if(err){
    console.log('Khong thanh cong');
  }else{
    console.log(result);
    console.log('Thanh cong');
  }
});

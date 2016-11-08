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
        if(err){
          console.log('LOI TRUY VAN ' + err);
        }else{
          return cb(result);
        }
      });
    }
  });
}

//query(`SELECT * FROM "User"`, cb);

var username = 'vanpho93';
var password = '12345';
var sql = `INSERT INTO "User"("username", "password")
           VALUES ('${username}', '${password}')`
console.log(sql);

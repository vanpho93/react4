var multer = require('multer');
var storage = multer.diskStorage(
  {
    destination(req, file, cb){
      cb(null, 'public/images/');
    },
    filename(req, file, cb){
      cb(null, Date.now() + file.originalname);
    }
  }
);
function getUploader(fielname){
  return multer({storage: storage}).single(fielname);
}
module.exports = getUploader;

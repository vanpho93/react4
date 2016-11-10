function a(c){
  var b;
  setTimeout(function(){
    b = 5;
    return c(b);
  }, 500);
}
function b(){
  for(var i = 0; i < 10000000000; i++){

  }
}

b();

a(function(b){
  console.log(b);
});

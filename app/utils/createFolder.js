let fs = require('fs');


module.exports = function (name,sub = null,category = null) {
  let dir;
  if(sub== true){
    if(category!=null){
        dir = `./videos/${category}/${name}`;
    }else{
        dir = `./videos/${name}`;
    }

  }else{
    dir = `./${name}`;

  }

  if (fs.existsSync(dir)) {
    return 1;
  } 
  if (!fs.existsSync(dir)){

    fs.mkdirSync(dir,function(err){
      if(err){
      console.log("ERROR! Can't make the directory! \n");
      }

    });
    fs.mkdirSync(`${dir}/tmp`,function(err){
      if(err){
      console.log("ERROR! Can't make the directory! \n");
      }

    });
  }
  return 0;
}

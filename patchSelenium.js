let fs = require('fs');
let readline = require('readline');

fs.readFile('node_modules/selenium-webdriver/lib/webdriver.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace("setParameter('text', keys)", "setParameter('text', keys.then(keys => keys.join('')))");

  fs.writeFile('node_modules/selenium-webdriver/lib/webdriver.js', result, 'utf8', function (err) {
       if (err) return console.log(err);
    });

    console.log('...Patched...');

});

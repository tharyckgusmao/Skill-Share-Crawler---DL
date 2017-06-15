let fs = require('fs'),
    http = require('http'),
    httpProxy = require('http-proxy');


module.exports = function (logging) {
  let logFile = fs.createWriteStream('./requests.log');

  return function (request, response) {
    if (logging) {
      logFile.write(JSON.stringify(request.headers, true, 2));
    }
    request.continue();
  }
}

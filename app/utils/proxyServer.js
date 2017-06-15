let Proxy = require('browsermob-proxy').Proxy;


module.exports = proxyServer = ()=>{

  proxy = new Proxy({
    port: 10800
  });

  proxy.start(10803,(err)=>{



  });



  return proxy;

}

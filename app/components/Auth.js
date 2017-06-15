let clear = require('clear');
figlet = require('figlet'),
CLI  = require('clui'),
chalk = require('chalk'),
inquirer = require('inquirer'),
webdriver = require('selenium-webdriver'),
fs = require('fs'),
cookieComponent = require('../utils/cookie'),
routes = require('../utils/apiRoutes'),
request = require('request'),
Spinner = CLI.Spinner,
By = webdriver.By,
until = webdriver.until
firefox = require('selenium-webdriver/firefox');

module.exports = Login = (cb)=> {






  let getLoginCredentials = (callback) =>{

    let questions = [
      {
        name: 'username',
        type: 'input',
        message:   chalk.white.bold('Enter your Skill Share e-mail address:'),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message:   chalk.white.bold('Enter your Skill Share password:'),
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password';
          }
        }
      }
    ];

    inquirer.prompt(questions).then((credentials)=>{callback(credentials)});
  }

  getLoginCredentials((credentials)=>{
    let status = new Spinner(chalk.red.bold('Please wait, launching Browser, please resolve the captcha and click sign-ip for continue and wait...'));
    status.start();

    // let profile = new firefox.Profile("./firefoxprofile/d8c394rw.crawler");
    let profile = new firefox.Profile();
    // profile.addExtension('./harexporttrigger-0.5.0-beta.10.xpi');
    // profile.addExtension('./harexporttrigger-hack.xpi');
    // profile.setPreference('extensions.netmonitor.har.enableAutomation', true);
    // profile.setPreference('extensions.netmonitor.har.contentAPIToken', 'dev');
    // profile.setPreference('extensions.netmonitor.har.autoConnect', true);
    //
    // profile.setPreference("network.proxy.type", 1);
    // profile.setPreference("network.proxy.http", '127.0.0.1');
    // profile.setPreference("network.proxy.http_port", 10803);
    // profile.setPreference("network.proxy.ssl",  '127.0.0.1');
    // profile.setPreference("network.proxy.ssl_port", 10803);
    // profile.setPreference("network.proxy.ftp",  '127.0.0.1');
    // profile.setPreference("network.proxy.ftp_port", 10803);
    // profile.setPreference("network.proxy.socks",  '127.0.0.1');
    // profile.setPreference("network.proxy.socks_port", 10803);
    //

    profile.acceptUntrustedCerts(true);
    profile.assumeUntrustedCertIssuer(true);


    //
    //
    let options = new firefox.Options().setProfile(profile);

    let driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();



    driver.get(routes.login);
    driver.manage().timeouts().pageLoadTimeout;






    let modaLogin = driver.wait(until.elementLocated(By.css("a[data-ss-restrict='login']")),1200000).click();
    let form = driver.wait(until.elementLocated(By.className("login-form")),1200000);
    let usernameInput = driver.wait(until.elementLocated(By.name("LoginForm[email]")),1200000).sendKeys(credentials.username);
    let passwordInput  = driver.wait(until.elementLocated(By.name("LoginForm[password]")),1200000).sendKeys(credentials.password);
    let checkBox  = driver.wait(until.elementLocated(By.name("LoginForm[rememberMe]")),1200000).click();
    //
    // let recaptcha = driver.findElement(By.className("recaptcha-checkbox-checkmark")).then((webElement)=>{
    //   webElement.click();
    // }, function(err) {
    //   if (err.state && err.state === 'no such element') {
    //     chalk.red.bold('Not Found Recaptcha');
    //   }
    // });


    let loginPass = driver.wait(until.elementLocated(By.className("user-photo")),1200000).then(()=>{
      status.stop();

        chalk.red.bold('Please wait ...');


      driver.get(routes.home).then(()=>{

        driver.manage().getCookies().then((res)=>{
          let cookie = new cookieComponent;
          cookie.cookie = res;
          global.Cookie = cookie;
          cb();

          driver.quit()
          // let getHarLogScript =
          //
          // `
          // let callback = arguments[arguments.length - 1];
          // window.HarEntriesPromise = ()=>{
          //   alert('wait');
          //   window.HAR.triggerExport({
          //     token: 'dev',
          //     getData: true,
          //     jsonp: false,
          //   }).then(function(result) {
          //     let har = JSON.parse(result.data);
          //     window.HarEntries=har.log.entries;
          //     alert('Getting PK');
          //   });}
          //
          //   window.HarEntriesPromise();
          //   `;

          // proxy.startHAR(10803, 'http://127.0.0.1:10803',true,true,false, function (err, resp) {
          // });


          // driver.get(routes.pk).then(()=>{

            // driver.executeAsyncScript(function(){
            //   let callback = arguments[arguments.length - 1];
            //
            //
            //
            //
            //   Promise.all([HAR.triggerExport({
            //     token: 'dev',
            //     getData: true,
            //     jsonp: false,
            //   })]).then(function(values) {
            //     window.entries=values;
            //     callback;
            //   });
            //
            //
            // }).then(()=>{


            // driver.executeScript("return window.HarEntries").then((res)=>{

            // setTimeout(()=>{
            //
            //
            //
            //   let pk;
            //   // proxy.getHAR(10803, function(err, resp) {
            //   //
            //   //       let obj = JSON.parse(resp);
            //   //
            //   //       obj.log.entries.forEach((el,key)=>{
            //   //
            //   //         if(el.request.url.indexOf("https://edge.api.brightcove.com")>-1){
            //   //
            //   //           el.request.headers.forEach((el,key)=>{
            //   //             if(el.name == "Accept"){
            //   //               pk = el.value.split('=')[1];
            //   //               console.log(pk);
            //   //
            //   //             }
            //   //           })
            //   //
            //   //
            //   //         }
            //   //
            //   //       })
            //   //
            //   //
            //   // });
            //
            // },5000)

            // });

            // });
          // });




        });


      });





    });





  })


}

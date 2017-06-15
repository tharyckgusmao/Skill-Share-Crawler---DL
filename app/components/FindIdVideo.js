let clear = require('clear');
figlet = require('figlet'),
CLI  = require('clui'),
chalk = require('chalk'),
inquirer = require('inquirer'),
routes = require('../utils/apiRoutes'),
createFolder = require('../utils/createFolder'),
request = require('request'),
Line = CLI.Line,
Progress = CLI.Progress;

let DlPerId = require('./DlPerId');

module.exports = FindIdVideo = (fn)=>{

  let statuses, statusTimer;

  let getId = (callback)=>{
    let questions =
    {
      name: 'idVideo',
      type: 'input',
      message:   chalk.green.bold('Enter ID video Skill Share:'),
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter Id for Video';
        }
      }
    }
    inquirer.prompt(questions).then((resp)=>{callback(resp,logData)});
  }


  let getDataId = (data,callback)=>{

    let options = {
      url: `${routes.getPerId}${data.idVideo}`,
      headers: {
        'Accept': `application/vnd.skillshare.class+json;,version=0.8`,
        'User-Agent': 'Skillshare/4.1.1; Android 5.1.1',
        'Host': 'api.skillshare.com',
        'Cookie': global.Cookie.serializeCookie()
      },
    };



    request(options, (error, response, body) =>{

      callback(body);

    })



  }

  let logData = (data)=>{
    DlPerId(JSON.parse(`${data}`),null,fn);
  }



  getId(getDataId);





}

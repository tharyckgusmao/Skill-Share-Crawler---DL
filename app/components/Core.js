let clear = require('clear');
figlet = require('figlet'),
CLI  = require('clui'),
chalk = require('chalk'),
inquirer = require('inquirer'),
routes = require('../utils/apiRoutes'),
request = require('request'),
Spinner = CLI.Spinner;


let FindIdVideo = require('./FindIdVideo');
let GetAllVideos = require('./GetAllVideos');


module.exports = Core = () =>{

  clear();
  console.log(
    chalk.red.bold(
      figlet.textSync('Skill Share DL', { horizontalLayout: 'full' })
    )
  );

  let coreOptions = (callback)=>{
    let questions =
    {
      name: 'Select Options',
      message:  chalk.white.bold('What do you want to do ?'),
      type: 'list',
      choices: [
        '1 - Download Videos per ID', '2 - Download all Videos per Classes','3 - exit'
      ],
      filter: function (str){
        return str.toLowerCase();
      }
    }


    inquirer.prompt(questions).then((resp)=>{callback(resp)});


  }

  let validateOptions = (resp)=>{

    let options = parseInt(resp['Select Options'].replace(' ','').slice('-')[0]);

    switch (options) {
      case 1:

      FindIdVideo(()=>{
        coreOptions(validateOptions);
      });
      break;

      case 2:
      GetAllVideos(()=>{
        coreOptions(validateOptions);
      });
      break;

      case 3:
      process.exit();
      break;
      default:

    }

  }


  coreOptions(validateOptions);




}

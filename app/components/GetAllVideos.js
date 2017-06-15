let clear = require('clear');
figlet = require('figlet'),
chalk = require('chalk'),
inquirer = require('inquirer'),
routes = require('../utils/apiRoutes'),
createFolder = require('../utils/createFolder'),
request = require('request'),
eachOfSeries = require('async/eachOfSeries');

let category = require('../utils/classesCategory');
let DlPerId = require('./DlPerId');


module.exports = GetAllVideos = (fn)=>{


  let setClasses = (callback)=>{
    let questions =
    {
      name: 'classes',
      type: 'checkbox',
      message: chalk.green.bold(`Select Classes Download Skill Share:    ${chalk.red.bold('!! RED COLOR GLOBAL CATEGORY')}`),
      choices: category,
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please Select one Choice';
        }
      }
    }
    inquirer.prompt(questions).then((resp)=>{callback(resp)});
  }

  let getClasses = (resp,callback)=>{


    let categoryVideo;

    eachOfSeries(resp.classes, (el,key, cb) =>{

      categoryVideo = el;

      // let options = {
      //   url: encodeURI(`${routes.listClasses}?q=${category}&page=1`),
      //   headers: {
      //     'User-Agent': 'Skillshare/4.1.0; Android 5.1.1',
      //     'Host': 'api.skillshare.com'
      //   },
      // };
      //
      //
      // request(options, (error, response, body) =>{

      // let data = JSON.parse(body);
      // let sliceLastPage = data._links.last_page.href.split('=').slice(-1);
      // let lastLink = /^\d+$/.test(sliceLastPage) == false ? 1: parseInt(sliceLastPage);
      //

      let arrayTmp = new Array(150).join('0').split('');

      eachOfSeries(arrayTmp, (el,key, cb2) =>{

       // if(key == 4){
       //   cb2();
        //}else{



          let optionsClasses = {
            url: encodeURI(`${routes.listClasses}?tagSlug=${categoryVideo.replace(' ','-').replace('/','-').toLowerCase()}&seeAll=1&verticalListOnly=1&sort=rating&page=${key+1}`),
            headers: {
              'User-Agent': 'Skillshare/4.1.0; Android 5.1.1',
              'Host': 'api.skillshare.com'
            },
          };

          request(optionsClasses, (error, response, body) =>{
            let dataClasses = JSON.parse(body);

            if(dataClasses.spaces[0].next_page_url == null){
              cb();
            }



            let classes = dataClasses.spaces[0].blocks;



            eachOfSeries(classes, (el,key, cb3) =>{


              console.log(chalk.red.bold(`Downloading  ${key} ... ${categoryVideo}-${el.items[0].title}`))

              let optionsId = {
                url: `${routes.getPerId}${el.items[0].sku}`,
                headers: {
                  'Accept' : 'application/vnd.skillshare.class+json;,version=0.8',
                  'User-Agent': 'Skillshare/4.1.1; Android 5.1.1',
                  'Host': 'api.skillshare.com',
                  'Cookie': global.Cookie.serializeCookie()
                },
              };
              request(optionsId, (error, response, body) =>{

                let dataClass = JSON.parse(`${body}`);

                DlPerId(dataClass,categoryVideo,cb3);

              })






            }, (err, results)=> {

              cb2();

            });



          })
           // };
        }, (err, results)=> {

          cb();

        });

        // });



    }, (err, results)=> {
      console.log('complete');
    });



  }


  setClasses(getClasses);


}

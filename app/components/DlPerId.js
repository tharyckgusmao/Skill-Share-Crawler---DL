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

module.exports = DlPerId = (data,sub=null,fn)=>{

  let statuses, statusTimer, titleVideo=data.title, isexist;

  let dlPerId = ()=>{
    isexist = 0;
    createFolder('videos');
    if(sub!=null){

      createFolder(sub.replace(/[^a-zA-Z0-9 ]/g,""),true);
      isexist=createFolder(data.title.replace(/[^a-zA-Z0-9 ]/g,""),true,sub.replace(/[^a-zA-Z0-9 ]/g,""));
   

      
    }else{
      isexist=createFolder(data.title.replace(/[^a-zA-Z0-9 ]/g,""),true);
    }

    let links = data._embedded.units._embedded.units[0]._embedded.sessions._embedded.sessions;

    statuses = new Array(links.length).join('0').split('').map(parseFloat);

    statusTimer = setInterval(drawProgress, 100);


    let promises = links.map((el,key)=>{

      return new Promise((resolve, reject)=> {

        if(isexist){
          resolve(key);
        }

        let hashVideo = el.video_hashed_id.split(':')[1];
        let title = el.title;


        let options = {
          url: `${routes.videoDl}${hashVideo}`,
          headers: {
            'Accept': `application/json;pk=${routes.pk}`,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
            'Origin': 'https://www.skillshare.com'
          }
        };

        request(options, (error, response, bd) =>{

          if(!isexist){
          let sources = JSON.parse(`${bd}`);
          
          

          
          if(sub!=null){
            fs.writeFileSync(`./videos/${sub.replace(/[^a-zA-Z0-9 ]/g,"")}/${data.title.replace(/[^a-zA-Z0-9 ]/g,"")}/tmp/` + el.title.replace(/[^a-zA-Z0-9 ]/g,"") + '.json',bd,'utf8');

          }else{
            fs.writeFileSync(`./videos/${data.title.replace(/[^a-zA-Z0-9 ]/g,"")}/tmp/` + el.title.replace(/[^a-zA-Z0-9 ]/g,"") + '.json',bd,'utf8');

          }


          // console.log(chalk.red.bold(`Downloading Video ${key+1} :`));


          let received_bytes = 0;
          let total_bytes = 0;
          let out;

          if(sub!=null){
           out = fs.createWriteStream(`./videos/${sub.replace(/[^a-zA-Z0-9 ]/g,"")}/${data.title.replace(/[^a-zA-Z0-9 ]/g,"")}/${key}-${el.title.replace(/[^a-zA-Z0-9 ]/g,"")}.mp4`);
         }else{
           out = fs.createWriteStream(`./videos/${data.title.replace(/[^a-zA-Z0-9 ]/g,"")}/${key}-${el.title.replace(/[^a-zA-Z0-9 ]/g,"")}.mp4`);
         }


          let rqVideo = request.get(sources.sources[1].src);

          rqVideo.pipe(out);

          rqVideo.on('response',  ( data )=> {
            total_bytes = parseInt(data.headers['content-length' ]);
          });

          rqVideo.on("data", (chunk)=> {

            received_bytes += chunk.length;
            let percentage = (received_bytes * 100) / total_bytes;
            statuses[key] = percentage;


          });

          rqVideo.on("end", () =>{
            resolve(key);
          });






        }
        else{
          resolve(key);
        }
        })

      })

    });

    Promise.all(promises)
    .then((res) =>{
      clearInterval(statusTimer);
      console.log('Complete');
      setTimeout(()=>{
        clear();
        return fn();
      },500)

    })
    .catch(console.error);
  }



  let drawProgress = () =>{
    clear();
    var blankLine = new Line().fill().output();

    var headers = new Line()
    .padding(2)
    .column(`Video ${titleVideo}`, 40)
    .column('Progress', 10)
    .fill()
    .output();

    blankLine.output();

    for(let index in statuses) {
      var thisProgressBar = new Progress(20);

      var websiteLine = new Line()
      .padding(2)
      .column('Video #' + index, 20)
      .column(thisProgressBar.update(statuses[index], 100), 40)
      .fill()
      .output();
    }

    blankLine.output();
  }


  dlPerId();





}

let clear = require('clear');
let figlet = require('figlet');
let CLI  = require('clui');
let chalk = require('chalk');
let inquirer = require('inquirer');
let Spinner  = CLI.Spinner;

let Auth = require('./components/Auth');
let Core = require('./components/Core');
let ProxyServer = require('./utils/proxyServer');

clear();
console.log(
  chalk.red.bold(
    figlet.textSync('Skill Share DL', { horizontalLayout: 'full' })
  )
);


// let proxy = ProxyServer();

Auth(Core);


// Core();

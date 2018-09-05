let clear = require("clear");
let figlet = require("figlet");
let CLI = require("clui");
let chalk = require("chalk");
let inquirer = require("inquirer");
let Spinner = CLI.Spinner;

let Auth = require("./components/Auth");
let ManualAuth = require("./components/ManualAuth");
let Menu = require("./components/Menu");
let Core = require("./components/Core");
let ProxyServer = require("./utils/proxyServer");

clear();
console.log(
  chalk.red.bold(
    figlet.textSync("Skill Share DL", { horizontalLayout: "full" })
  )
);

// let proxy = ProxyServer();

Menu(option => {
  if (option == 1) {
    Auth(Core);
  } else {
    ManualAuth(Core);
  }
});

// Core();

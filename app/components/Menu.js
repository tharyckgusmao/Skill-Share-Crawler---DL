let clear = require("clear");
(figlet = require("figlet")),
  (CLI = require("clui")),
  (chalk = require("chalk")),
  (inquirer = require("inquirer")),
  (request = require("request")),
  (Spinner = CLI.Spinner);

module.exports = Menu = cb => {
  clear();

  let menuOptions = callback => {
    let questions = {
      name: "Select Options",
      message: chalk.white.bold("What do you want to do ?"),
      type: "list",
      choices: ["1 - Automatically Auth", "2 - Manual Auth", "3 - exit"],
      filter: function(str) {
        return str.toLowerCase();
      }
    };

    inquirer.prompt(questions).then(resp => {
      callback(resp);
    });
  };

  let validateOptions = resp => {
    let options = parseInt(
      resp["Select Options"].replace(" ", "").slice("-")[0]
    );

    cb(options);
  };

  menuOptions(validateOptions);
};

let clear = require("clear"),
  figlet = require("figlet"),
  CLI = require("clui"),
  chalk = require("chalk"),
  inquirer = require("inquirer"),
  request = require("request"),
  cookieComponent = require("../utils/cookie"),
  Spinner = CLI.Spinner;

module.exports = ManualAuth = cb => {
  let getCookies = callback => {
    let questions = [
      {
        name: "cookie",
        type: "input",
        message: chalk.white.bold(
          "Enter your Cookies check this issue https://github.com/tharyckgusmao/Skill-Share-Crawler---DL/issues/22 : "
        ),
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Required Cookies";
          }
        }
      }
    ];

    inquirer.prompt(questions).then(cookies => {
      callback(cookies);
    });
  };

  getCookies(cookie => {
    let cook = new cookieComponent();

    cook.cookie = cookie.cookie.replace(/"/g, "");
    cookie.provided = true;
    global.Cookie = cook;
    cb();
  });
};

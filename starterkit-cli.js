#!/usr/bin/env node
const path = require('path')
const Repository = require('git-cli').Repository
const fs = require('fs')
const Program = require('commander')
const Promise = require('bluebird')
const cmd = require('node-cmd')
const inquirer = require('inquirer')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const figlet = require('figlet')


module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd())
  },
  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory()
    } catch (err) {
      return false
    }
  }
}


const spinner = new Spinner(chalk.bold.magenta('install %s'))
spinner.setSpinnerString(18)

const welcome = () => {
  console.log(
    chalk.yellow(
      figlet.textSync('Angular Rails Starterkit', { horizontalLayout: 'full' })
    )
  )
}

const error = (err) => {
  spinner.stop()
  console.log(chalk.bold.red(err))
  process.exit(-1)
}

const beforeInstall = () => {
  cmd.get('ls client',
    (err, data, stderr) => {
      if (!data) {
        install()
      } else {
        console.log(chalk.bold.red('Cilent folder already exist\r\n'))
        const questions = [{
          name: 'option',
          type: 'list',
          message: 'Are you sure wont rewrite client folder',
          choices: [ 'yes', 'not']
        }]

        inquirer.prompt(questions).then(function (answers) {
        	if (answers.option === 'yes') {
            cmd.get('rm -rf client', install)
          } else {
            process.exit(1)
          }
        })
      }
    }
  )
}

const afterInstall = () => {
  console.log(chalk.blue('Installing packages for tooling via npm.'))
  cmd.get('cd client/; npm i',
    (err, data, stderr) => {
      if (err) {
        error(err)
      } else {
        spinner.stop()
        console.log(data)
        console.log(chalk.green('Successfuly generated'))
      }
  })
}

const install = () => {
  Repository.clone('https://github.com/igorbezsmertnyi/starterkit-content', 'client')
   .then(repo => {
     spinner.start()
     console.log(chalk.blue('Successfully initialized git.'))
     afterInstall()
   })
   .catch(err => error(err))
}

const herokuProcfiles = () => {
  fs.writeFile("./Procfile", "web: bundle exec rails server -p $PORT", (err) => {
    if (err) error(err)
    console.log(chalk.green('Procfile - created'))
  })

  fs.writeFile("./Procfile.prod", "angular-assets: sh -c 'cd client/ ; ng build'", (err) => {
    if (err) error(err)
    console.log(chalk.green('Procfile.prod - created'))
  })

  fs.writeFile("./Procfile.dev", "angular-assets: sh -c 'cd client/ ; ng build --dev --watch'\r\nrails-server: rails s -p 3000", (err) => {
    if (err) error(err)
    console.log(chalk.green('Procfile.dev - created'))
  })
}

Program
  .option('-g, --generate', 'Generate files')
  .option('-h, --help', 'Help')
  .parse(process.argv)

if (Program.generate) {
  welcome()
  console.log(chalk.bold.magenta('Generate files'))
  beforeInstall()
  herokuProcfiles()
}

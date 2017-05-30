#!/usr/bin/env node
const path = require('path')
const Repository = require('git-cli').Repository
const fs = require('fs')
const Program = require('commander')

const install = () => {
  return Repository.clone('https://github.com/igorbezsmertnyi/angular-2-rails-starterkit', 'client')
                   .then(repo => console.log(repo))
                   .catch(e => console.log(e))
}

Program
  .option('-i, --install [name]', 'Instalation')
  .option('-H, --heroku', 'Heroku deployment')
  .parse(process.argv)

if (Program.install) {
  console.log('install %s app', Program.install)
  install()
}
if (Program.heroku) console.log('heroku')

#!/usr/bin/env node

const program = require('commander');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const clear = require('clear');
var pjson = require('./package.json');

async function execute(command, clearBeforePrint = false) {
  if (!command) return;

  const {
    stdout,
    stderr
  } = await exec(command);

  clear();
  console.log(stdout);
  console.error(stderr);
}

program
  .version(pjson.version)
  .usage('[options] <cmd>')
  .option('-t, --wait [value]', 'Wait for milliseconds', parseInt)
  .option('-c, --cmd <value>', 'The command')
  .action((command, cmd) => {
    const {
      cmd: theCommand = command,
      wait = 1000
    } = cmd;

    setInterval(() => execute(theCommand, true), wait);
  })
  .parse(process.argv);
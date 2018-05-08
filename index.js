#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const clear = require('clear');

async function execute(command, clearBeforePrint = false) {
  if(!command) return;

  const { stdout, stderr } = await exec(command);

  clear();
  console.log(stdout);
  console.error(stderr);
}

program
  .version('0.1.0')
  .usage('[options] <cmd>')
  .option('-t, --wait [value]', 'Wait for milliseconds', parseInt)
  .option('-c, --cmd <value>', 'The command')
  .action((theCommand, cmd) => {
    theCommand = cmd.cmd || theCommand;
    const wait = cmd.wait;
    if(wait) {
      setInterval(() => execute(theCommand, true), wait);
    } else {
      execute(theCommand);
    }
  })
  .parse(process.argv);


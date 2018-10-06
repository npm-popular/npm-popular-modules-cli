#!/usr/bin/env node

"use strict";

const fs = require("fs");
const ora = require("ora");
const npmPopular = require("npm-popular-modules");

const spinner = ora("Fetching from npmjs.com...");
spinner.start();

const args = process.argv.slice(2);

(async () => {
  try {
    const list = await npmPopular();
    spinner.stop();

    for (const nm of list) {
      console.log(
        `${nm.name} => ${nm.url} => ${nm.homepage} => ${nm.github}`
      );
    }

    if (args.includes("-s")) writeToFile(list);
  } catch (e) {
    spinner.stop();
    throw TypeError("Cannot fetch data from npmjs.com");
  }
})();

const writeToFile = list => {
  const output = fs.createWriteStream("Popular");

  output.write("# The most popular node modules in npmjs.com.\n\n");
  for (const nm of list) {
    output.write(`${nm.name} => ${nm.url} => ${nm.homepage} => ${nm.github}\n`);
  }
  output.end("\n# Generated by npm-popular-modules-cli.\n");

  console.log("Write into Popular successfully.");
};

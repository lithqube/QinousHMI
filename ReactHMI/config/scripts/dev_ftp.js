/**
 * EXPERIMENTAL
 * Runs webpack in watch mode, uploads `build/` folder after each
 * change to server using FTP.
 */

// TODO handle connection error

const chalk = require("chalk");
const webpack = require('webpack');
const config = require('../webpack.dev.js');
const fs = require("vinyl-fs");
const FTPConnection = require("vinyl-ftp");
const rimraf = require("rimraf");
const uploadConfig = require("./../deployment").development;
const logWebpackStats = require("./logWebpackStats");

// Setup FTP connection to upload target
const conn = new FTPConnection({
  host: uploadConfig.host,
  user: uploadConfig.user,
  password: uploadConfig.password,
  //debug: info => console.log(info)
});

// Upload `build/` folder, except source-maps
function upload() {
  process.stdout.write(`Uploading.. `)
  const dest = conn.dest(uploadConfig.path);
  dest.on("end", () => {
    console.log("done.");
  });
  dest.on("error", error => {
    console.log(chalk.red("Error while uploading via FTP:"));
    console.log(error);
  });
  fs.src(["./build/**/!(*.map)"], { buffer: false })
    .pipe(dest);
}

// Setup bundling
const compiler = webpack(config);

// Before each compilation/bundling starts
compiler.plugin("compile", () => {
  process.stdout.write(`Compiling.. `)
  rimraf.sync("./build");
});

// Bundle and start watching for changes
compiler.watch({}, (err, stats) => {
  // Called after each compilation/bundling update
  const hasErrors = stats.hasErrors();
  const hasWarnings = stats.hasWarnings();
  if (!hasErrors && !hasWarnings) {
    console.log("done.");
    upload();
    return;
  }
  logWebpackStats(stats);
});

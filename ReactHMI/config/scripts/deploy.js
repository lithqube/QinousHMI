/**
 * EXPERIMENTAL
 * Uploads everything in folder `build/` except source-maps (.map) to webMI server using FTP.
 */
const fs = require("vinyl-fs");
const chalk = require("chalk");
const FTPConnection = require("vinyl-ftp");
const config = require("./../deployment.js").development;

const conn = new FTPConnection({
    host: config.host,
    user: config.user,
    password: config.password
});

const dest = conn.dest(config.path);
dest.on("end", () => {
    console.log(chalk.green("Deployed successfully."));
});
dest.on("error", error => {
    console.log(chalk.red("Error while uploading via FTP:"));
    console.log(error);
});

chalk.green("Deploying..");
fs.src(["./build/**/!(*.map)"], { buffer: false })
    .pipe(dest);

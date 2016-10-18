/**
 * EXPERIMENTAL
 * Uploads everything in folder `build/` except source-maps (.map) to webMI server using FTP.
 */
const Transformer = require("stream").Transform;
const fs = require("vinyl-fs");
const chalk = require("chalk");
const FTPConnection = require("vinyl-ftp");
const config = require("./../deployment.js").development;

// Setup FTP Connection
const conn = new FTPConnection({
    host: config.host,
    user: config.user,
    password: config.password
});

// Setup an FTP stream writer we can use with vinyl-fs
const ftp = conn.dest(config.path);
ftp.on("end", () => {
    console.log("DONE");
    console.log(chalk.green("Deployed successfully."));
});

ftp.on("error", error => {
    console.log(chalk.red("Error while uploading via FTP:"));
    console.log(error);
});

/**
 * Setup a custom transformer for all our file postprocessing needs:
 * - For every not compressed file, check if there is a compressed version of it. If yes,
 *   use the compressed version using the name of the original version.
 */
class VinylFileRenamer extends Transformer {
    constructor() {
        super({ objectMode: true });
        this.files = new Map();
    }

    _transform(chunk, encoding, cb) {
        // Buffer all file handles, don't pass along immediately
        // because we want to start processing the list of files
        // when we know about all of them.
        const path = chunk.path;
        this.files.set(path, chunk);
        cb();
    }

    _flush(cb) {
        // Filter all buffered file handles, pass them along
        this.files.forEach((file, path) => {
            if (path.endsWith(".gz")) {
                const originalName = path.substr(0, path.length - 3);
                // Take the name of the original file.
                file.path = originalName;
                // Remove the original file
                this.files.delete(originalName);
            }
        });
        this.files.forEach(file => this.push(file));
    }
}
const fileRenamer = new VinylFileRenamer();

console.log(chalk.green(`Deploying to ${config.host}${config.path} ..`));

fs.src(["./build/**/!(*.map)"], { buffer: false })
    .pipe(fileRenamer)
    .pipe(ftp);

// Simplified declaration for require to be used as hints to Webpack
// e.g. const myImage = require("./resources/image.jpg")
declare var require: {
    (path: string): string
}
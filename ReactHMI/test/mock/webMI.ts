// Setup a mock of Bachmann's webMI before importing our wrapper at model/WebMI.
// Bachmann's webMI writes itself to a globally available "window".
global["window"] = { 
    webMI: {
        data : {}
    } 
}

export const mockedWebMI = global["window"].webMI;

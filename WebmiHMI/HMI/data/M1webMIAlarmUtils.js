var translations;

// loading the translations file
// check if we are in a browser first, else the file is executed from the commandline
if (typeof window != 'undefined') {
    var request = new XMLHttpRequest();   
    request.open("GET", "/alarmtexts.json", true);
    request.send(null);
    request.onreadystatechange = function () {       
        if (request.readyState === 4 && request.status === 200) {
            translations = JSON.parse(request.responseText);
        }
    }
}

function setTranslations(someTranslations) {
    translations = someTranslations;
}


/*
 * create an array of headers for a table based on an array of headerdefinitions, parameters
 * (weMI.query) and the total width of the table
 */
function createHeaders(displayParameters, headerDefinitions, tableWidth) {
    var headers = [];
    var sumWidth = 0;

    for (var i = 0; i < headerDefinitions.length; i++) {
        var headerDefinition = headerDefinitions[i];
        // only create a header if the column is visible
        if (displayParameters[headerDefinition.name + "Show"] == "true") {
            var header = {
                "sortable": true,
                "resizable": false,
                "eventList": [],
                "fontsize": 14,
                "width": headerDefinition.width
            };
            header.name = headerDefinition.displayText;
            var newWidth = Number(displayParameters[headerDefinition.name + "Width"]);
            if (newWidth > 0) {
                header.width = newWidth;
            }
            sumWidth += header.width;
            headers.push(header);
        } else {
            headerDefinitions[i].visible = false;
        }
    }

    //adjust the pixels proportional to tableWidth
    var sumCalculatedWith = 0;
    var currentColumn = 0;

    var scalingFactor = tableWidth / sumWidth;

    for (; currentColumn < headers.length; currentColumn++) {
        // adjust the width of the column proportionally to the width of the table
        headers[currentColumn].width = Math.round(headers[currentColumn].width * scalingFactor);
        // keep track of the sum of the calculated widths
        sumCalculatedWith += headers[currentColumn].width;       
    }
    // adjust the width of the last visible column by the rounding errors
    headers[currentColumn - 1].width -= sumCalculatedWith - tableWidth;
    return headers;
}



function translateString(obj, attribute, locale) {
    var text = obj[attribute];    
    // check if the attribute to be translated is a string    
    if (typeof text === "string") {
        // retrieve the translation for the defined locale         
        if (translations != undefined && translations[text] != undefined && translations[text][locale] != undefined) {
            text = translations[text][locale];
        }
    } else {
        // attribute to be translated was not a string, but presumably a list of translations
        text = obj[attribute][locale];
    }
    try {
        return webMI.sprintf(text, obj);
    } catch (err) {
        console.error(attribute + ": " + text + "\n error: " + err);
        return text;
    }
}

    // defining patterns
    var replaceChars = {
        // Day
        d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },      
        j: function() { return this.getDate(); },        
        N: function() { return (this.getDay() == 0 ? 7 : this.getDay()); },
        S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
        w: function() { return this.getDay(); },
        z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, // Fixed now
        // Week
        W: function() {
            var target = new Date(this.valueOf());
            var dayNr = (this.getDay() + 6) % 7;
            target.setDate(target.getDate() - dayNr + 3);
            var firstThursday = target.valueOf();
            target.setMonth(0, 1);
            if (target.getDay() !== 4) {
                target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
            }
            return 1 + Math.ceil((firstThursday - target) / 604800000);
        },
        // Month       
        m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },     
        n: function() { return this.getMonth() + 1; },
        t: function() {
            var year = this.getFullYear(), nextMonth = this.getMonth() + 1;
            if (nextMonth === 12) {
                year = year++;
                nextMonth = 0;
            }
            return new Date(year, nextMonth, 0).getDate();
        },
        // Year
        L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
        o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
        Y: function() { return this.getFullYear(); },
        y: function() { return ('' + this.getFullYear()).substr(2); },
        // Time
        a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
        A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
        B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
        g: function() { return this.getHours() % 12 || 12; },
        G: function() { return this.getHours(); },
        h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
        H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
        i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
        s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
        u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ?
    '0' : '')) + m; },                      
    };

    // Simulates PHP's date function
    Date.prototype.format = function(format) {
        var date = this;
        return format.replace(/(\\?)(.)/g, function(_, esc, chr) {
            return (esc === '' && replaceChars[chr]) ? replaceChars[chr].call(date) : chr;
        });
    };


// make the methods visible for node.js modules for testing
if (typeof exports != 'undefined') {   
    exports.translateString = translateString;
    exports.createHeaders = createHeaders;
    exports.setTranslations = setTranslations;    
}
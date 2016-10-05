var displaysJSON = function(){

var displaysJS; 

var displaysRequest;

function _load() {
    
	if (window.XMLHttpRequest) {
		displaysRequest = new XMLHttpRequest(); // Mozilla, Safari, Opera
	} else if (window.ActiveXObject) {
		try {
			displaysRequest = new ActiveXObject('Msxml2.XMLHTTP'); // IE 5
		} catch (e) {
			try {
				displaysRequest = new ActiveXObject('Microsoft.XMLHTTP'); // IE 6
			} catch (e) {}
		}
	}
	
	if (!displaysRequest) {
		console.log("failed creating XMLHTTP");
		return false;
	} else {
		if(webMI) {
			displaysRequest.open("get", webMI.display.getURLPrefix() + "displays.js", true);
		} else {
			console.log("webmi not found - using /en/svg/displays.js");
			displaysRequest.open("get", "/en/svg/displays.js", true);
		}
		displaysRequest.onreadystatechange = function(){
			if(displaysRequest.readyState == 4) {
					if (displaysRequest.status == 200) {
						displaysJS = JSON.parse(displaysRequest.responseText);
					} else {
						console.log("Error: " + displaysRequest.status);
					}
			}
		};
		displaysRequest.send();
	}
}

function _getDisplayCode(displayName)
{
	return _searchDisplayCode(displayName, displaysJS.menu)
}

function _searchDisplayCode(displayName, tree)
{
	var displayCode;
	for(var itm in tree)
	{
		if(tree[itm].identifier == displayName)
			return tree[itm].display;
		else if(tree[itm].sub)
		{
			displayCode = _searchDisplayCode(displayName, tree[itm].sub);
            // if a displayCode has been found, exit the loop, else the displayCode 
            // will be overwritten if the next itm has a sub 
            if (displayCode != undefined) {
                return displayCode;
            }
		}
	}
	return displayCode;
}

return{
	getDisplayCode: _getDisplayCode,
	load : _load
}
	
}();

displaysJSON.load();
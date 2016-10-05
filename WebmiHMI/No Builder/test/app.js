"use strict";

/**
 * EXPERIMENTAL SPIKE
 * 
 * Testing webMI independent of atvis builder.
 * Do not use this for anything!
 */

function defaultIconUrlForType(type) {
    switch(type) {
		case TYPE_PV:
		case TYPE_PV_GROUP:
			return "solar.svg";
		case TYPE_CONSUMER:
		case TYPE_CONSUMER_GROUP:
			return "consumer.svg";
		case TYPE_GRID:
			return "grid.svg";
		case TYPE_BATTERY:
		case TYPE_BATTERY_GROUP:
			return "battery.svg";
		case TYPE_DIESEL:
		case TYPE_DIESEL_GROUP:
			return "genset.svg";
		case TYPE_SAMSUNG_RACK:
			return "samsung_rack.svg";
		default:
			return "";
	}
}

function loadSystemTree() {
    // create a new empty component tree
	
	console.log("NB: loading system tree")
	
    var systemDataDP = "/"+SYSTEM_TASK+"/"+getDataDP(TYPE_SYSTEM);
    var systemConfigDP = "/"+SYSTEM_TASK+"/"+getConfigDP(TYPE_SYSTEM);
    var alarmInfo = getStdAlarmInfo(systemDataDP, TYPE_SYSTEM);
    var systemTree = new ComponentTreeNode(
        "System", 
        "", 
        TYPE_SYSTEM, 
        -1, 
        SYSTEM_TASK, 
        "",
        systemConfigDP,
        systemDataDP, 
        alarmInfo.DP_List, 
        alarmInfo.Masks); // the root node
    var currentNode = systemTree;

    addVirtualItemsToTree(systemTree, SYSTEM_TASK);

    // find the external items
    var externalTaskList = [];
    addExternalItemsToTree(systemTree, SYSTEM_TASK, externalTaskList);
    
    return systemTree;
}

function addNavItem(iconURL) {
    var html = '<div class="nav-item"><img src="icons/' + iconURL + '"/></div>';
    var navElement = document.getElementById("main-nav");
    navElement.insertAdjacentHTML("beforeend", html);
}

function startUpdatingFooter(systemTree, footerElement) {
    var titles = [];
    var datapoints = [];
    var units =  [];
    var configs = getFooterConfig(systemTree);
    configs.forEach(function(config) {
        titles.push(config.title);
        datapoints.push(config.dp);
        units.push(config.unit);         
    });
    
    // Subscribe 
    webMI.data.subscribeBlock(datapoints, function(results){
        var params = results.map(function(result, i) {
            var value = result.value !== undefined ? result.value.toFixed(1) : "?";      
            return titles[i] + ": " + value + " " + units[i];
        });        
        var html = "<div class='params'>" + params.join(" | ") + "</div>";
        footerElement.innerHTML = html;
    });
}

var systemTree = loadSystemTree();

// addNavItem("battery.svg");
// addNavItem("grid.svg");

setTimeout(function() {
    systemTree.subComponentList.forEach(function(component) {
       var iconURL = defaultIconUrlForType(component.Type);
       addNavItem(iconURL);
    });
    
    var footerEl = document.getElementsByTagName("footer")[0];
    startUpdatingFooter(systemTree, footerEl);
}, 1500);

console.log(systemTree);


// ------------------------------------------------------------------------------------------


var chartData = {
    overview : 
        {    chartTitle : "Overview",
            contents:    
                [    
                    {    recorder: "CONSGRP_LIVE", 
                        channels: ["Q_SYS/.ConsumerGroupData.Live.TotalPower_kW"],
                        titles: ["Consumption"],
                        units: ["kW"]
                    },
                    {    recorder: "BATTGRP_LIVE", 
                        channels: ["Q_SYS/.BatteryGroupData.AvailableSOC"],
                        titles: ["SOC"],
                        units: ["%"]
                    }        
                ]
        },
    tabs: 
        [        
            {    chartTitle : "System",
                contents:    
                    [    
                        {    recorder: "SYS_LIVE", 
                            channels: [
                                        "Q_SYS/.SystemData.GridFrequency",
                                        "Q_SYS/.SystemData.GridVoltage",
                                        "Q_SYS/.SystemData.ConventionalGen.Loading",
                                        "Q_SYS/.SystemData.DispatchableGen.Loading",
                                        "Q_SYS/.SystemData.RenewableGen.Loading",
                                        "Q_SYS/.SystemData.TotalSurplus.Loading",
                                        "Q_SYS/.SystemData.VariableGen.Loading"],
                            titles: ["Frequency",
                                        "Voltage",
                                        "Conventional",
                                        "Dispatchable",
                                        "Renewable",
                                        "Surplus",
                                        "Variable"
                                    ],
                            units: ["Hz","V","kW","kW","kW","kW","kW"]
                        },                                    
                        {    recorder: "SYS_STAT", 
                            channels: [
                                        "Q_SYS/.SystemData.AlarmWord",
                                        "Q_SYS/.SystemData.FaultedSubs",
                                        "Q_SYS/.SystemData.ControlStatus.ControlPlace",],
                            titles: ["Alarms",
                                        "Faulted Components",
                                        "Control Place"                                        
                                    ],
                            units: ["","",""]
                        }
                    ]
            },
            {    chartTitle : "Diesel",
                contents:    
                    [    
                        {    recorder: "DSLGRP_LIVE", 
                            channels: [
                                        "Q_SYS/.DieselGroupData.Live.TotalPower_kW",
                                        "Q_SYS/.DieselGroupData.Live.ReactivePower_kvar",
                                        "Q_SYS/.DieselGroupData.Live.ApparentPower_kVA",
                                        "Q_SYS/.DieselGroupData.Live.Voltage_LL",
                                        "Q_SYS/.DieselGroupData.Live.Frequency_Hz",
                                        "Q_SYS/.DieselGroupData.Live.OnlineCapacity_kW"
                                    ],
                            titles: [
                                        "Power",
                                        "Reactive",
                                        "Apparent",
                                        "Voltage",
                                        "Frequency",
                                        "Online Capacity"
                                    ],
                            units: [
                                        "kW",
                                        "kvar",
                                        "kVA",
                                        "V",
                                        "Hz",
                                        "kW"
                                    ]
                        }
                    ]
            }

        ]

}








var queryCallback = function(set){

    return  function(e) {
        console.log("incoming e", e);
                var indexStart = e[0].idxstart; 
                var indexEnd   = e[0].idxend;
                console.log("Got indexes "+indexStart+" to "+indexEnd+" for channels", set.channels);
            
                // single read over querytime function
                if (indexStart == undefined){
                    console.log("No samples!")
                } else {
                    Scope.readIndex(set.recorder, set.channels, indexStart, indexEnd, false, readIndexCallback(set))
                }
            }
}

var readIndexCallback = function(set){

    return function(g) {  

                    var channels = set.channels;
                    console.log("Callback with", g);
                    var data = g[0];
                    console.log("got some data: ",data);

                    for (var k=0; k<channels.length; k++){

                        var channel_data = data[channels[k]];
                        console.log("adding channelData: ",channel_data);

                        // TODO adjust UTC time for local time at device

                        //var series = highchart.addSeries({type: 'spline', name: set.titles[k], data: channel_data});
                        //setInterval(getLatestData(channels[k], series), 3000);

                    }
                }
}


var getLatestData = function(channel, series){
    return function(){
        //console.log("reading ",channel);
        webMI.data.read("/"+channel, dataCallback(series));
    }
}

var dataCallback = function(series){

    return  function(e){
                            //console.log("DATA CALLBACK!",e);
                            series.addPoint([new Date().getTime()-2*60*60*1000, e.value]);        
                            // TODO adjust browser time for local time at device
                        }

}


//console.log("%%%%%%%%%%Got recorders and channels%%%%%%%%%%%%%%%%%%%%%", f);
var overviewChart = chartData.overview;

// assume channelNames are the same as datapoints

for (var j=0; j<overviewChart.contents.length; j++){
    var recorderName = overviewChart.contents[j].recorder;
    console.log("Looking up recorder indexes", recorderName);
    Scope.querylookup(recorderName, new Date().getTime() - 60 * 1000 * 60, new Date().getTime(), queryCallback(overviewChart.contents[j]));
}
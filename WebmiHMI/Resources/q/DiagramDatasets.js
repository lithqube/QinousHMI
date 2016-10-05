
/******************************DATASETS*****************/
var DownsampleThreshold = 2400;

var ChartData = [];

function getDiagramData(node) {

	for (var i=0; i<ChartData.length; i++){

		if (ChartData[i].type = node.Type) {

			return ChartData[i];
			
		}

	}

}

ChartData.push({
	type: TYPE_SYSTEM,
	frontspec : {
		yaxes : [{ // axes definition is supplied in the trigger -- part of the the entire package.	
			labels: {
				format: '{value}',
			},
			title: {
				text: 'kW'
			},
			opposite: true
		}],
		data: [{
			recorder: "FAST",
			series: [{
				name: "Power",
				DP: ".ConsumerGroupData.Live.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
				type: 'spline',
				yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
				data: [],
				tooltip: {
					valueDecimals: 2
				}
			}]
		}]
	},
	tabs: [{ 
		title: "Overview", 
		spec: {
			yaxes : [{ // axes definition is supplied in the trigger -- part of the the entire package.	
				labels: {
					format: '{value}',
				},
				title: {
					text: 'Hz, kW, kvar, %'
				},
				opposite: true
				
			}, { // Secondary yAxis
				gridLineWidth: 0,
				labels: {
					format: '{value}'
				},
				title: {
					text: 'V'
				}		
			}],
			data: [{
				recorder: "FAST",
				series: [{
					name: "Voltage",
					DP: ".SystemData.GridVoltage", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				},
				{
					name: "Frequency",
					DP: ".SystemData.GridFrequency", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
				},
				{
					name: "Consumption",
					DP: ".ConsumerGroupData.Live.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				},
				{
					name: "Battery",
					DP: ".BatteryGroupData.Live.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				},
				{
					name: "PV",
					DP: ".PVGroupData.Live.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				},
				{
					name: "Grid Import",
					DP: ".GridData.Live.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				},
				{
					name: "Diesel",
					DP: ".DieselGroupData.Live.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				}
				]
			},{
				recorder: "SLOW",
				series: [{
					name: "SOC",
					DP: ".BatteryGroupData.AvailableSOC", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				}]
			}]
		}
	}]
});

ChartData.push({
	type: TYPE_BATTERY,
	frontspec : {
		yaxes : [{ // axes definition is supplied in the trigger -- part of the the entire package.	
			labels: {
				format: '{value}',
			},
			title: {
				text: 'kW'
			},
			opposite: true
		}],
		data: [{
			recorder: "FAST",
			series: [{
				name: "Power",
				DP: ".Converter.AC.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
				type: 'spline',
				yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
				data: [],
				tooltip: {
					valueDecimals: 2
				}
			}]
		}]
	},
	tabs: [{ 
		title: "Overview",
		spec : {
			yaxes : [{ // axes definition is supplied in the trigger -- part of the the entire package.	
				labels: {
					format: '{value}',
				},
				title: {
					text: 'Hz, kW, kvar, %'
				},
				opposite: true
				
			}, { // Secondary yAxis
				gridLineWidth: 0,
				labels: {
					format: '{value}'
				},
				title: {
					text: 'V'
				}		
			}],
			data: [{	
				recorder: "FAST", // a list of Scope recorder, and the associated series definitions is supplied via trigger
				series: [{
					name: "Total Power",
					DP: ".Converter.AC.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
	
				},{
					name: "DC Voltage",
					DP: ".Converter.DCVoltage",
					type: 'spline',
					yAxis: 1,                
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				},{
					name: "Frequency",
					DP: ".Converter.AC.Frequency_Hz",
					type: 'spline',
					yAxis: 0,                
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
				},{
					name: "Reactive Power",
					DP: ".Converter.AC.ReactivePower_kvar",
					type: 'spline',
					yAxis: 0,                
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
				}]
			},{	
				recorder: "SLOW",
				series: [{
					name: "Available SOC",
					DP: ".Battery.AvailableSOC",
					type: 'spline',
					yAxis: 0,                
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
				}]
			}]
		}
	}]
});

ChartData.push({
	type: TYPE_PV,
	frontspec : {
		yaxes : [{ // axes definition is supplied in the trigger -- part of the the entire package.	
			labels: {
				format: '{value}',
			},
			title: {
				text: 'kW'
			},
			opposite: true
		}],
		data: [{
			recorder: "FAST",
			series: [{
				name: "Power",
				DP: ".Live.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
				type: 'spline',
				yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
				data: [],
				tooltip: {
					valueDecimals: 2
				}
			}]
		}]
	},
	tabs: [{ 
		title: "Overview",
		spec : {
			yaxes : [{ // axes definition is supplied in the trigger -- part of the the entire package.	
				labels: {
					format: '{value}',
				},
				title: {
					text: 'Hz, kW, kvar'
				},
				opposite: true
				
			}, { // Secondary yAxis
				gridLineWidth: 0,
				labels: {
					format: '{value}'
				},
				title: {
					text: 'V'
				}		
			}],
			data: [{	
				recorder: "FAST", // a list of Scope recorder, and the associated series definitions is supplied via trigger
				series: [{
					name: "AC Power",
					DP: ".Live.TotalPower_kW", // the datapoint is added to the series object, but regardless, each series array for each recorder can be added directly to the initialization of the high chart
					type: 'spline',
					yAxis: 0,				// axis corresponds to the axes that were delivered in this package           
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
	
				},{
					name: "DC Power",
					DP: ".DCPower",
					type: 'spline',
					yAxis: 1,                
					data: [],
					tooltip: {
						valueDecimals: 1
					},
					downsample: { threshold: DownsampleThreshold }
				},{
					name: "Frequency",
					DP: ".Live.Frequency_Hz",
					type: 'spline',
					yAxis: 0,                
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
				},{
					name: "Voltage",
					DP: ".Live.Voltage_LL",
					type: 'spline',
					yAxis: 0,                
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
				},{
					name: "Reactive Power",
					DP: ".Live.ReactivePower_kvar",
					type: 'spline',
					yAxis: 0,                
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
				},{
					name: "Power Limitation",
					DP: ".ControlStatus.ActivePowerLimit_kW",
					type: 'spline',
					yAxis: 0,                
					data: [],
					tooltip: {
						valueDecimals: 2
					},
					downsample: { threshold: DownsampleThreshold }
				}]
			}]
		}
	}]
});
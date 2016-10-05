var project = {"languages":{"de":"Deutsch","en":"English"},"extensions":{"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Move":[function(base,webMI,window,document,self){
// This Quick Dynamic moves the applied graphical element in X- and/or Y-direction depending on the value of the defined node and the ranged defined by "minValue" and "maxValue", i.e. the
// range defined by "minValue" and "maxValue" will be translated to the range defined by "startPositionX" and "stopPositionX" and/or to the range defined by "startPositionY" and
// "stopPositionY".
// The movement in X-direction will only be done if both "startPositionX" and "stopPositionX" are defined.
// The movement in Y-direction will only be done if both "startPositionY" and "stopPositionY" are defined.
// e.g.: the defined range of the value from 0 (=minValue) to 100 (=maxValue) will be translated to 0 (=startPositionX) to 10 (=stopPositionX) pixels in X-direction
// Parameters:
//	nodeId:			this node triggers this Quick Dynamic
//	minValue:		lower bound of the range where the node's value should lie in
//	maxValue:		upper bound of the range where the node's value should lie in
//	startPositionX:	start position for X-direction where "minValue" will be translated to
//	stopPositionX:	stop position for X-direction where "maxValue" will be translated to
//	startPositionY:	start position for Y-direction where "minValue" will be translated to
//	stopPositionY:	stop position for Y-direction where "maxValue" will be translated to

webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;
	if (base.startPositionX != "" && base.stopPositionX != "") {
		webMI.gfx.setMoveX(base.id, webMI.translate(value, base.minValue, base.maxValue, base.startPositionX, base.stopPositionX));
	}
	if (base.startPositionY != "" && base.stopPositionY != "") {
		webMI.gfx.setMoveY(base.id, webMI.translate(value, base.minValue, base.maxValue, base.startPositionY, base.stopPositionY));
	}
});
},{"minValue":"0","maxValue":"100","startPositionX":"0","stopPositionX":"500"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Scale":[function(base,webMI,window,document,self){
// This Quick Dynamic scales the applied graphical element in X- and/or Y-direction depending on the value of the defined node and the ranged defined by "minValue" and "maxValue", i.e. the
// range defined by "minValue" and "maxValue" will be translated to the range defined by "startScaleX" and "stopScaleX" and/or to the range defined by "startScaleY" and
// "stopScaleY".
// The scale in X-direction will only be done if both "startScaleX" and "stopScaleX" are defined.
// The scale in Y-direction will only be done if both "startScaleY" and "stopScaleY" are defined.
// e.g.: the defined range of the value from 0 (=minValue) to 100 (=maxValue) will be translated to 0 (=startScaleX) to 10 (=stopScaleX) in X-direction
// Parameters:
//	nodeId:			this node triggers this Quick Dynamic
//	minValue:		lower bound of the range where the node's value should lie in
//	maxValue:		upper bound of the range where the node's value should lie in
//	startScaleX:	start position for X-direction where "minValue" will be translated to
//	stopScaleX:		stop position for X-direction where "maxValue" will be translated to
//	startScaleY:	start position for Y-direction where "minValue" will be translated to
//	stopScaleY:		stop position for Y-direction where "maxValue" will be translated to

webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;

	if (base.startScaleX != "" && base.stopScaleX != "") {
		webMI.gfx.setScaleX(base.id, webMI.translate(value, base.minValue, base.maxValue, base.startScaleX / 100, base.stopScaleX / 100));
	}
	if (base.startScaleY != "" && base.stopScaleY != "") {
		webMI.gfx.setScaleY(base.id, webMI.translate(value, base.minValue, base.maxValue, base.startScaleY / 100, base.stopScaleY / 100));
	}
});
},{"nodeId":"","minValue":"0","maxValue":"100","startScaleX":"","stopScaleX":"","startScaleY":"0","stopScaleY":"1"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Table":[function(base,webMI,window,document,self){
/*
 atvise table widget http://www.atvise.com/

 Copyright (C) 2008-2010 Certec EDV GmbH. All Rights Reserved.
 $Rev: 4122 $

 WARNING: This software program is protected by copyright law
 and international treaties. Unauthorized reproduction or
 distribution of this program, or any portion of it, may result
 in severe civil and criminal penalties, and will be prosecuted
 to the maximum extent possible under the law

 May only be used with explicit written authorization by Certec
*/

/**
 * The AtviseTable Class.
 * @class
 * @param {Object} tableElement An SVG Group element.
*/
function AtviseTable(tableElement) {
	var hasVML = !(document.implementation && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
	var hasSVG = (document.implementation && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));

	if (tableElement != undefined && typeof tableElement == "object" && (hasVML || hasSVG)) {
		this.tableElement = tableElement;
		this.tableElement.dataProvider =		null;
		this.tableElement.headerRects =			[];
		this.tableElement.headerTexts =			[];
		this.tableElement.headerObjects =		[];
		this.tableElement.maskingFunctions =	[];
		this.tableElement.headersOutside =		0;
		this.tableElement.firstHeaderOutside =	-1;
		this.tableElement.cellRects =			[];
		this.tableElement.cellTexts =			[];
		this.tableElement.cellTextContents =	[];
		this.tableElement.sortingArrow =		null;
		this.tableElement.scrollRowOffset =		0;
		this.tableElement.scrollColOffset =		0;
		this.tableElement.selectedRow =			-1;
		this.tableElement.selectedColumn =		-1;
		this.configuration =					{};
		this.scrollbar =						{};
		this.statusbar =						{};
		this.style =							{};
		this.styleEven =						{};
		this.styleOdd =							{};
		this.hasVML =							hasVML;
		this.hasSVG =							hasSVG;
		this.isMobile =							false; //(navigator.userAgent && /iPad|iPhone|Opera Mobi/.test(navigator.userAgent));
	}
}

/*  ***********************************************************
	********** atvise table widget PUBLIC FUNCTIONS **********
	*********************************************************** */

/**
 * Adds a column to the AtviseTable.
 * @param {Number} [position] Position of the column.
*/
AtviseTable.prototype.addColumn = function(position) {
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var style = this.style;
	var column = (position!=undefined)?position:(configuration.columnCount+1);
	column--; // array starts with 0, user types in +1
	var createRows = (arguments[1]!=undefined)?arguments[1]:true;
	var textOffsetY = configuration.rowHeight - ((configuration.rowHeight/2)-(style.fontSize/2)) - 2;

	var startY;
	if(column==0)startY=0;
	else startY=parseInt(webMI.gfx.getY(tableElement.headerRects[column-1]));

	var startX;
	if(column==0)startX=0; //configuration.tableWidth;
	else startX=parseInt(webMI.gfx.getX(tableElement.headerRects[column-1]))+parseInt(webMI.gfx.getWidth(tableElement.headerRects[column-1]));

	//creates header cell&text
	if (tableElement.headerObjects[column]!=undefined) {
		this._setProperties(tableElement.headerObjects[column],style.header);
	}
	var name = (tableElement.headerObjects[column]!=undefined && tableElement.headerObjects[column].name)?tableElement.headerObjects[column].name:"";
	var width = (tableElement.headerObjects[column]!=undefined && tableElement.headerObjects[column].width)?tableElement.headerObjects[column].width:style.header.width;
	var fill = (tableElement.headerObjects[column]!=undefined && tableElement.headerObjects[column].fill)?tableElement.headerObjects[column].fill:style.header.fill;
	var fontFamily = (tableElement.headerObjects[column]!=undefined && tableElement.headerObjects[column].fontFamily)?tableElement.headerObjects[column].fontFamily:style.header.fontFamily;
	var fontSize = (tableElement.headerObjects[column]!=undefined && tableElement.headerObjects[column].fontSize)?tableElement.headerObjects[column].fontSize:style.header.fontSize;
	var fontColor = (tableElement.headerObjects[column]!=undefined && tableElement.headerObjects[column].fontColor)?tableElement.headerObjects[column].fontColor:style.header.fontColor;
	var stroke = (tableElement.headerObjects[column]!=undefined && tableElement.headerObjects[column].stroke)?tableElement.headerObjects[column].stroke:style.stroke;
	var strokeWidth = (tableElement.headerObjects[column]!=undefined && tableElement.headerObjects[column].strokeWidth)?tableElement.headerObjects[column].strokeWidth:style.strokeWidth;
	var headerRect = webMI.gfx.addRect({width:width,height:configuration.rowHeight,x:startX,y:startY,fill:fill,stroke:stroke,strokeWidth:strokeWidth}, tableElement);
	headerRect.column = column;
	headerRect.originalColor = fill;
	headerRect.setAttribute("atv:table-header-rect","true");
	var headerText = null;
	if (this.hasVML) {
		headerText = webMI.gfx.addText({x:startX+style.textOffsetX,y:startY+textOffsetY,fontFamily:fontFamily,fill:fontColor,fontSize:fontSize,text:name},tableElement);
	} else {
		headerText = webMI.gfx.addText({x:startX+style.textOffsetX,y:startY+textOffsetY,fontFamily:fontFamily,fill:fontColor,fontSize:fontSize,text:name},tableElement);
//		headerText = webMI.gfx.addText({x:startX+width/2,y:startY+textOffsetY,fontFamily:fontFamily,fill:fontColor,fontSize:fontSize,text:name,textAnchor:"middle"},tableElement);
	}
	headerText.setAttribute("atv:table-header-text","true");

	// if there already exists an element at the position insert the new elements before it
	var overwrite = (tableElement.headerRects[column] == undefined);
	tableElement.headerRects = this._arrayInsertElement(tableElement.headerRects, column, headerRect, overwrite);
	tableElement.headerTexts = this._arrayInsertElement(tableElement.headerTexts, column, headerText, overwrite);
	// creates content cells
	if(configuration.rowCount==0) {
		configuration.tableHeight=configuration.rowHeight;
	} else if(createRows) {
		var y=startY+configuration.rowHeight;
		var x=startX;
		//draws as many cells as there are rows
		for (var row=0; row<configuration.rowCount; row++){
			// sets color for odd and even rows
			var cellStyle = this._cellStyle((row%2==0));
			this._createCell(column,row,x,y,cellStyle,false);
			y+=configuration.rowHeight;
			if(column==0) {
				configuration.tableHeight+=configuration.rowHeight;
			}
		}
	}
	configuration.columnCount++;
	configuration.tableWidth= (parseFloat(configuration.tableWidth)) + parseFloat(style.header.width);	//updates tableWidth
	this._calcHeadersOutside();
	this._drawScrollBars();
};
/**
 * Adds a row at the end of the table.
 * @param {Boolean} updateTable Indicates if the table shall be updated after the row was added.
*/
AtviseTable.prototype.addRow = function(updateTable){
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var style = this.style;
	updateTable = (updateTable != undefined) ? updateTable : true;
	if(configuration.columnCount>0) {
		// only add a row if it doesnt exceed the display size
		var calculatedDisplayHeight = (configuration.displayHeight-this.statusbar.height);
		if (this.scrollbar.barBottom!=undefined) {
			calculatedDisplayHeight-=this.configuration.scrollbarSize;
		}
		if (configuration.tableHeight + configuration.rowHeight < calculatedDisplayHeight) {
			var x=parseInt(webMI.gfx.getX(tableElement.headerRects[0]));
			var y;

			if(configuration.rowCount==0)y=configuration.rowHeight;
			else y=parseInt(webMI.gfx.getY(tableElement.cellRects[0][configuration.rowCount-1]))+configuration.rowHeight;
			var cellStyle = this._cellStyle((configuration.rowCount%2 == 0));
			//creates as many cells as there are columns
			for (var col=0;col<configuration.columnCount;col++){
				this._createCell(col,configuration.rowCount,x,y,cellStyle,false);
				x+=parseFloat(tableElement.headerObjects[col].width);
			}
			configuration.tableHeight+=configuration.rowHeight;
			configuration.rowCount++;
		}
	}
	if (updateTable) {
		this._setDataExtract();
	}
};
/**
 * Returns the current configuration Object of the table.
 * @type {Object} configurationObject
*/
AtviseTable.prototype.configuration = function() {
	return this.configuration;
};
/**
 * Returns the current headers and filtered data array of the table in CSV format.
 * @type {String} headersAndDataAsCSV
*/
AtviseTable.prototype.dataExportCSV = function(separator) {
	var csv = "";
	var separator = separator ? separator : ",";

	//header export
	if(this.tableElement.headerObjects.length > 0) {
		for(var i in this.tableElement.headerObjects) {
			if(this.tableElement.headerObjects[i].name.toString().search(separator) > -1)
				csv += "\"" + this.tableElement.headerObjects[i].name.toString().replace(/\"/, "\"\"") + "\"" + separator;
			else
				csv += this.tableElement.headerObjects[i].name.toString() + separator;
		}
		csv = csv.substr(0, csv.lastIndexOf(separator)) + "\n";
	}

	//data export
	var data = this.dataProvider().dataArray;

	if(this.dataProvider().dataFiltered.length > 0)
		data = this.dataProvider().dataFiltered;

	if(data.length > 0) {
		for(row in data) {
			for(column in data[row]) {
				if(data[row][column].text != undefined) {
					var maskedElement = (typeof this.tableElement.maskingFunctions[column] === "undefined") ?
						data[row][column].text.toString() :
						this.tableElement.maskingFunctions[column]( data[row][column].text.toString() );
					if(maskedElement.search(separator) > - 1)
						csv += "\"" + maskedElement.replace(/\"/, "\"\"") + "\"" + separator;
					else
						csv += maskedElement + separator;
				}
			}
			csv = csv.substr(0, csv.lastIndexOf(separator)) + "\n";
		}
	}
	return csv;
};
/**
 * Returns the data provider of the table.
 * @type {Object} dataProvider AtviseDataProvider
*/
AtviseTable.prototype.dataProvider = function() {
	return this.tableElement.dataProvider;
};
/**
 * Returns all header objects of the table.
 * @type {Array} headerObjects
*/
AtviseTable.prototype.headers = function() {
	return this.tableElement.headerObjects;
};
/**
 * Removes all columns of the table.
 * @param {Boolean} deleteCells Indicates if only the headers should be deleted or all content cells too.
*/
AtviseTable.prototype.removeAllColumns = function(deleteCells){
	var j=this.configuration.columnCount;
	for(var i=j;i>=1;i--){
		this.removeColumn(i,deleteCells,false,false);
	}
	// if there are no more columns, there can't exist more rows
	this.configuration.rowCount = 0;
	this.configuration.tableHeight = 0;
};
/**
 * Removes a column from the table.
 * @param {Number} colNr Column index.
 * @param {Boolean} deleteCells Indicates if only the header should be deleted or all content cells too.
 * @param {Boolean} deleteHeader Indicates if the headerObject should be deleted too, or only the rectangle and text element.
 * @param {Boolean} deleteData Indicates if the data at the column should be deleted too.
*/
AtviseTable.prototype.removeColumn = function(colNr, deleteCells, deleteHeader, deleteData) {
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var col = (colNr>0)?colNr-1:0;	// array starts with 0...
	deleteCells = (deleteCells == undefined) ? false : deleteCells;
	deleteHeader = (deleteHeader == undefined) ? false : deleteHeader;
	deleteData = (deleteData == undefined) ? false : deleteData;

	if (col<configuration.columnCount && col>-1) {
		// rearrange all cells following the column position
		if (deleteCells) {
			for (var row=(configuration.rowCount-1); row>-1; row--) {
				for (var i=(configuration.columnCount-1); i>col; i--) {
					if (tableElement.cellRects[i-1][row]) {
						var preX = parseFloat(webMI.gfx.getX(tableElement.cellRects[i-1][row]));
						webMI.gfx.setX(tableElement.cellRects[i][row],preX);
						webMI.gfx.setX(tableElement.cellTexts[i][row],preX + this.style.textOffsetX);
					}
				}
				tableElement.removeChild(tableElement.cellRects[col][row]);
				tableElement.removeChild(tableElement.cellTexts[col][row]);
			}
			tableElement.cellRects.splice(col,1);
			tableElement.cellTexts.splice(col,1);
			tableElement.cellTextContents.splice(col,1);

			// rearrange all headers following the column position
			for (var i=(tableElement.headerRects.length-1); i>col; i--) {
				if (tableElement.headerRects[i-1]) {
					var preX = parseFloat(webMI.gfx.getX(tableElement.headerRects[i-1]));
					webMI.gfx.setX(tableElement.headerRects[i],preX);
					webMI.gfx.setX(tableElement.headerTexts[i],preX+(parseFloat(webMI.gfx.getWidth(tableElement.headerRects[i])/2)));
				}
			}
		}
		configuration.tableWidth-=parseFloat(webMI.gfx.getWidth(tableElement.headerRects[col]));
		tableElement.removeChild(tableElement.headerRects[col]);
		tableElement.removeChild(tableElement.headerTexts[col]);
		tableElement.headerRects.splice(col,1);
		tableElement.headerTexts.splice(col,1);
		configuration.columnCount--;

		if(deleteData) {
			this.dataProvider().removeColumn(colNr);
		}
		if(deleteHeader) {
			tableElement.headerObjects.splice(col,1);
		}
	}
	this._calcHeadersOutside();
	// only set the table data if cells have been removed
	if (deleteCells && deleteData) {
		this._setDataExtract();
	}
};
/**
 * Removes all rows from the table.
*/
AtviseTable.prototype.removeAllRows = function(deleteData, updateTable) {
	var deleteData = (deleteData == undefined) ? false : deleteData;
	updateTable = (updateTable == undefined) ? false : updateTable;
	var j=this.configuration.rowCount;
	for(var i=j;i>=1;i--){
		this.removeRow(i,deleteData,false);
	}
	if (updateTable) {
		this._setDataExtract();
	}
};
/**
 * Removes a row from the table.
 * @param {Number} rowNr Row index.
 * @param {Boolean} deleteData Indicates if the data at the row should be deleted too.
 * @param {Boolean} [updateTable] Indicates if the table should be updated after removing the row.
*/
AtviseTable.prototype.removeRow = function(rowNr,deleteData,updateTable) {
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var updateTable = (updateTable != undefined) ? updateTable : true;
	if (rowNr<=configuration.rowCount && rowNr>0) {	//only if rowNr is valid
		if(deleteData) {
			this.dataProvider().removeRow(rowNr, updateTable);
		}
		for (var col=0;col<configuration.columnCount;col++){	//removes as many cells from the row as there are columns
			tableElement.removeChild(tableElement.cellRects[col][configuration.rowCount-1]);
			tableElement.removeChild(tableElement.cellTexts[col][configuration.rowCount-1]);
			tableElement.cellRects[col].splice(configuration.rowCount-1,1);
			tableElement.cellTexts[col].splice(configuration.rowCount-1,1);
		}
		configuration.rowCount--;					//decrements total number of rows
		configuration.tableHeight-=configuration.rowHeight;		//updates the table height
	}
	if (updateTable) {
		this._setDataExtract();
	}
};
/**
 * Returns the selected column number of the table (human format).
 * @type {Number} colNr
*/
AtviseTable.prototype.selectedColumn = function() {
	return (this.tableElement.selectedColumn>-1)?this.tableElement.selectedColumn+1:undefined;
};
/**
 * Returns the selected data of the table.
 * @type {Array} data
*/
AtviseTable.prototype.selectedData = function() {
	function unique(arrayInstance) {
		var r = new Array();
		o:for(var i = 0, n = arrayInstance.length; i < n; i++) {
			for(var x = 0, y = r.length; x < y; x++) {
				if(r[x]==arrayInstance[i]) {
					continue o;
				}
			}
			r[r.length] = arrayInstance[i];
		}
		return r;
	}
	var data = [];
	var dataRow = this.dataProvider().dataRow((this.tableElement.selectedRow+1));
	var dataColumn = this.dataProvider().dataColumn((this.tableElement.selectedColumn+1));
	for (var i in dataRow) {
		data.push(dataRow[i]);
	}
	for (var i in dataColumn) {
		data.push(dataColumn[i]);
	}
	return unique(data);
};
/**
 * Returns the selected data column of the current data of the table.
 * @type {Array} dataColumn
*/
AtviseTable.prototype.selectedDataColumn = function() {
	return this.dataProvider().dataColumn((this.tableElement.selectedColumn+1));
};
/**
 * Returns the selected data row of the current data of the table.
 * @type {Array} dataRow
*/
AtviseTable.prototype.selectedDataRow = function() {
	return this.dataProvider().dataRow((this.tableElement.selectedRow+1));
};
/**
 * Returns the selected row number of the table (human format).
 * @type {Number} rowNr
*/
AtviseTable.prototype.selectedRow = function() {
	return (this.tableElement.selectedRow>-1)?this.tableElement.selectedRow+1+this.tableElement.scrollRowOffset:undefined;
};
/**
 * Sets the configuration of the table.
 * @param {Object} newConfiguration Configuration object.
*/
AtviseTable.prototype.setConfiguration = function(newConfiguration) {
	var selectRowOld = this.configuration.selectRow;
	var selectColumnOld = this.configuration.selectColumn;
	this.configuration = this._setProperties(this.configuration, newConfiguration, true);
	this.scrollbar.buttonHeight=this.configuration.scrollbarSize;
	this.scrollbar.buttonWidth=this.configuration.scrollbarSize;
	this.scrollbar.barBottomHeight=this.configuration.scrollbarSize;
	this.scrollbar.barSideWidth=this.configuration.scrollbarSize;
	this.scrollbar.barGripHeight=this.configuration.scrollbarSize;
	this.scrollbar.barGripWidth=this.configuration.scrollbarSize;
	if (((selectRowOld != this.configuration.selectRow) && this.configuration.selectRow) || ((selectColumnOld != this.configuration.selectColumn) && this.configuration.selectColumn)) {
		for (var i=0; i<this.configuration.columnCount; i++) {
			for (var j=0; j<this.configuration.rowCount; j++) {
				webMI.addEvent(this.tableElement.cellRects[i][j],"click",this._associateObjWithEvent(this,"_selectCell",[this.tableElement.cellRects[i][j]]));
				webMI.addEvent(this.tableElement.cellTexts[i][j],"click",this._associateObjWithEvent(this,"_selectCell",[this.tableElement.cellRects[i][j]]));
			}
		}
	}
	this.statusbar.height = this.configuration.rowHeight;
	if (!this.configuration.drawStatusBar) {
		this._undrawStatusBar();
	}
};
/**
 * Attaches an data provider to the table.
 * @param {Object} dataProvider A data provider of type AtviseDataProvider
*/
AtviseTable.prototype.setDataProvider = function(source, config) {
	if (config == undefined) {
		var statusbarHeight = (this.configuration.drawStatusBar)?this.statusbar.height:0;
		var rows = Math.floor((this.configuration.displayHeight-statusbarHeight-this.configuration.rowHeight) / this.configuration.rowHeight);
		config = {maxResults: rows};
	}
	config.sortedByColumn = this.configuration.sortedByColumn;
	config.sortingUp = this.configuration.sortingUp;
	this.tableElement.dataProvider = new AtviseDataProvider(source, config);
	this.tableElement.dataProvider.subscribe(this._associateObjWithEvent(this,"_setDataExtract",[]));
};
/**
 * Sets/Adds a header object to the table.
 * @param {Object} header Header object.
 * @param {Number} column Column index.
 * @param {Boolean} overwrite Indicates if the the header shall be overwritten.
*/
AtviseTable.prototype.setHeader = function(header, column, overwrite) {
	// decrement, because array index is starting with 0
	column--;
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var style = this.style;

	var headerRects = tableElement.headerRects;
	var headerTexts = tableElement.headerTexts;
	this._addHeader(header, column, overwrite);
	var headerObjects = tableElement.headerObjects;

	var insert = (column < configuration.columnCount && !overwrite);

	// check if there are more/less columns than headers
	if (headerObjects.length > configuration.columnCount && configuration.autoResize) {
		for (var i=(configuration.columnCount+1); i<(headerObjects.length+1); i++) {
			this.addColumn(i);
		}
	} else if (headerObjects.length < configuration.columnCount && configuration.autoResize ) {
		for (var i=headerObjects.length; i<configuration.columnCount; i++) {
			this.removeColumn(i, true, true, false);
		}
	}
	// update the column according to the headerObject data
	if (column < configuration.columnCount) {
		this._updateHeader(column);
	}
	// if inserting, also reset all headers following the inserted header
	if (insert) {
		for (var i=(column+1); i<configuration.columnCount; i++) {
			this._updateHeader(i);
		}
	}

	var calculatedTableWidth = 0;
	for (var i=0; i<tableElement.headerRects.length; i++) {
		calculatedTableWidth += parseFloat(webMI.gfx.getWidth(tableElement.headerRects[i]));
	}
	configuration.tableWidth = calculatedTableWidth;
	this._calcHeadersOutside();
	this._drawScrollBars();
	if (this.configuration.drawStatusBar) {
		this._drawStatusBar();
	}
	this._drawSortingArrow();
};
/**
 * Sets/Adds an array of header objects to the table.
 * @param {Boolean} overwrite Indicates if the header objects shall be overwritten.
*/
AtviseTable.prototype.setHeaders = function(headers) {
	var overwrite = (arguments[1])?arguments[1]:true;
	if (overwrite && this.configuration.autoResize) {
		this.removeAllColumns(true);
	}
	if (headers.length < this.configuration.columnCount) {
		for (var i=this.configuration.columnCount; i>headers.length; i--) {
			this.removeColumn(i, true, true, false);
		}
	}
	for (var i=0; i<(headers.length); i++) {
		var column = i+1;
		this.setHeader(headers[i], column, overwrite);
	}
};
/**
 * Sets/Adds an array of masking functions to the table.
 * @param {Array}: maskingFunctions: [{columnNumber: 1, <OR columnName: columnName,> mask: function(){...}},...]
*/
AtviseTable.prototype.setMaskingFunctions = function(maskingFunctions){
	this.tableElement.maskingFunctions = new Array(this.tableElement.headerTexts.length);

	for (var i = 0; i < maskingFunctions.length; i++){
		var mask;
		if (maskingFunctions[i].hasOwnProperty("maskFunction")){
			mask = maskingFunctions[i].maskFunction;
		} else if (maskingFunctions[i].maskName == "dateMS"){
			mask = function(timestamp){
				if (timestamp == null || timestamp == "")
					return "";
				var date = new Date(parseInt(timestamp, 10));
				return webMI.sprintf("%d-%02d-%02d %02d:%02d:%02d.%03d", date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
			};
		} else if (maskingFunctions[i].maskName == "date"){
			mask = function(timestamp){
				if (timestamp == null || timestamp == "")
					return "";
				var date = new Date(parseInt(timestamp, 10));
				return webMI.sprintf("%d-%02d-%02d %02d:%02d:%02d", date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
			};
		} else
			mask = function(){return ""};

		if (maskingFunctions[i].hasOwnProperty("columnName")){
			var found = false;
			for (var j = 0; j < this.configuration.columnCount; j++){
				if (this.tableElement.headerObjects[j].name == maskingFunctions[i]["columnName"]){
					this.tableElement.maskingFunctions[j] = mask;
					found = true;
				}
			}
			if (!found)
				console.warn("Table: Please make sure that the column named: " + maskingFunctions[i]["columnName"] + " exists.");
		} else if (maskingFunctions[i].columnNumber < this.tableElement.maskingFunctions.length)
			this.tableElement.maskingFunctions[maskingFunctions[i].columnNumber] = maskingFunctions[i].mask;
		else if (maskingFunctions[i].columnNumber >= this.tableElement.maskingFunctions.length)
			console.warn("Table: Please note, the column number of the masking function is larger than the amount of existing columns.");
	}
};
/**
 * Sets the scrollbar object of the table.
 * @param {Object} scrollbar Scrollbar object.
*/
AtviseTable.prototype.setScrollbar = function(scrollbar) {
	this._setProperties(this.scrollbar, scrollbar, true);
};
/**
 * Sets the statusbar object of the table.
 * @param {Object} statusbar Statusbar object.
*/
AtviseTable.prototype.setStatusbar = function(statusbar) {
	this._setProperties(this.statusbar, statusbar, true);
	if (this.configuration.drawStatusBar) {
		this._drawStatusBar();
	}
};
/**
 * Sets the style object of the table.
 * @param {Object} style Style object.
*/
AtviseTable.prototype.setStyle = function(style) {
	this._setProperties(this.style, style, true);
};
/**
 * Sets the style object for even rows of the table.
 * @param {Object} style Style object.
*/
AtviseTable.prototype.setStyleEven = function(style) {
	this._setProperties(this.styleEven, style, true);
	var data = this.dataProvider().data;
	if (data.length > 0) {
		for (var i=0; i<data.length; i++) {
			if (i%2==0) {
				this.dataProvider().setRowStyle((i+1), this.styleEven);
			}
		}
	}
};
/**
 * Sets the style object for odd rows of the table.
 * @param {Object} style Style object.
*/
AtviseTable.prototype.setStyleOdd = function(style) {
	this._setProperties(this.styleOdd, style, true);
	var data = this.dataProvider().data;
	if (data.length > 0) {
		for (var i=0; i<data.length; i++) {
			if (i%2==0) {
				this.dataProvider().setRowStyle((i+1), this.styleOdd);
			}
		}
	}
};

/*  ***********************************************************
	********** atvise table widget PRIVATE FUNCTIONS **********
	*********************************************************** */

// TODO: missing documentation
AtviseTable.prototype._addHeader = function(headerObject) {
	if (!headerObject) return;
	var headerObjects = this.tableElement.headerObjects;
	headerObject = this._setProperties(headerObject, {name:"Header_"+headerObjects.length,width:"140",fill:"#FFFFFF",highlight: {fill: "#EEF1F2", selected:"#EEF1F2"},fontFamily:"Open Sans",fontSize:"16",fontColor:"#00ABE5", sortable:true, resizable:true, cursor: "pointer"}, false);
	if (headerObjects.length > 0) {
		var position = headerObjects.length;
		var overwrite = false;
		if(arguments.length>1) {
			if (typeof arguments[1] == "number") {
				position = arguments[1];
			} else {
				return;
			}
			if (typeof arguments[2] == "boolean") {
				overwrite = arguments[2];
			} else {
				return;
			}
		}
		// position lies within the existing array of header objects
		headerObjects = this._arrayInsertElement(headerObjects, position, headerObject, overwrite);
	} else {
		headerObjects.push(headerObject);
	}
	this.tableElement.headerObjects = headerObjects;
};

// TODO: missing documentation
AtviseTable.prototype._arrayInsertElement = function(arrayInstance, position, newElement, overwrite) {
	if (arrayInstance.length > 0) {
		if (overwrite) {
			arrayInstance[position] = newElement;
		} else {
			var a = arrayInstance.slice();
			var b = a.splice(position,a.length);
			a[position] = newElement;
			arrayInstance = a.concat(b);
		}
	} else {
		arrayInstance.push(newElement);
	}
	return arrayInstance;
};
// TODO: missing documentation
AtviseTable.prototype._arrayRemoveElement = function(arrayInstance, position) {
	if (arrayInstance.length > 0) {
		if (arrayInstance[position] != undefined) {
			arrayInstance.splice(position, 1);
		}
	}
	return arrayInstance;
};
// TODO: missing documentation
// associates an object with a method (usually called to access the atviseTable with "this" from an child element - e.g. header mousedown)
AtviseTable.prototype._associateObjWithEvent = function(obj, methodName, myArguments){
    return (function(e){
        e = e||window.event;
        return obj[methodName](e, myArguments);
    });
};
// TODO: missing documentation
AtviseTable.prototype._calcHeadersOutside = function() {
	var headersOutside = 0;
	var visible = true;
	var firstOutside = -1;

	for (var i=0; i<this.tableElement.headerRects.length; i++) {
		var headerX = parseFloat(webMI.gfx.getX(this.tableElement.headerRects[i]));
		var headerW = parseFloat(webMI.gfx.getWidth(this.tableElement.headerRects[i]));

		if((headerX+headerW)>this.configuration.displayWidth) {
			if (headersOutside == 0) {
				firstOutside = i;
			}
			headersOutside++;
			visible = false;
		}
		webMI.gfx.setVisible(this.tableElement.headerRects[i],visible);
		webMI.gfx.setVisible(this.tableElement.headerTexts[i],visible);
	}
	if (firstOutside > -1) {
		for (var i=firstOutside; i<this.tableElement.cellRects.length; i++) {
			for (var j=0; j<this.tableElement.cellRects[i].length; j++) {
				if (this.tableElement.cellRects[i][j] != undefined) {
					webMI.gfx.setVisible(this.tableElement.cellRects[i][j], visible);
				}
			}
		}
	}

	this.tableElement.firstHeaderOutside = firstOutside;
	this.tableElement.headersOutside = headersOutside;
};
// TODO: missing documentation
AtviseTable.prototype._cellStyle = function(even) {
	return (even)?this.styleEven:this.styleOdd;
};
// TODO: missing documentation
AtviseTable.prototype._checkArray = function(arrayToCheck, idx1, idx2) {
	if (arrayToCheck == undefined) {
		arrayToCheck = [];
	}
	if (idx1 != undefined) {
		if (arrayToCheck[idx1] == undefined) {
			arrayToCheck[idx1] = [];
		}
	}
	if (idx2 != undefined) {
		if (arrayToCheck[idx1][idx2] == undefined) {
			arrayToCheck[idx1][idx2] = [];
		}
	}
};
// TODO: missing documentation
AtviseTable.prototype._createCell = function(col,row,x,y,cellStyle){
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var style = this.style;

	var cellRects = tableElement.cellRects;
	var cellTexts = tableElement.cellTexts;
	var cellTextContents = tableElement.cellTextContents;
	var textOffsetY = configuration.rowHeight - ((configuration.rowHeight/2)-(style.fontSize/2)) - 2;

	this._checkArray(cellRects,col,row);
	this._checkArray(cellTexts,col,row);
	this._checkArray(cellTextContents,col,row);

	//default text and style of the cell
	var fill = cellStyle.fill;
	var fontFamily = cellStyle.fontFamily;
	var fontSize = cellStyle.fontSize;
	var fontColor = cellStyle.fontColor;
	var stroke = cellStyle.stroke;
	var strokeWidth = cellStyle.strokeWidth;
	var dataObj = (this.dataProvider() != null) ? this.dataProvider().dataObject((row+1), (col+1)) : undefined;
	if (dataObj != undefined) {
		cellTextContents[col][row] = dataObj.text;
		if (dataObj.fill!=undefined) {
			fill = dataObj.fill;
		}
		if (dataObj.fontColor!=undefined) {
			fontColor = dataObj.fontColor;
		}
		if (dataObj.fontSize!=undefined) {
			fontSize = dataObj.fontSize;
		}
		if (dataObj.fontFamily!=undefined) {
			fontFamily = dataObj.fontFamily;
		}
		if (dataObj.stroke!=undefined) {
			stroke = dataObj.stroke;
		}
		if (dataObj.strokeWidth!=undefined) {
			strokeWidth = dataObj.strokeWidth;
		}
	} else {
		cellTextContents[col][row]="";
	}

	var visible = true;
	if (this.tableElement.firstHeaderOutside > -1 && col >= this.tableElement.firstHeaderOutside) {
		visible = false;
	}

	// creates cell rectangle
	cellRects[col][row]= webMI.gfx.addRect({width:webMI.gfx.getWidth(tableElement.headerRects[col]),height:configuration.rowHeight,x:x,y:y,fill:fill,stroke:stroke,strokeWidth:strokeWidth,visible:visible},tableElement);
	cellRects[col][row].column=col;
	cellRects[col][row].row=row;
	cellRects[col][row].originalColor=fill;
	cellRects[col][row].setAttribute("atv:table-body-rect","true");
	var maskedElement = (typeof this.tableElement.maskingFunctions[col] === "undefined") ?
		this.tableElement.cellTextContents[col][row] :
		this.tableElement.maskingFunctions[col]( this.tableElement.cellTextContents[col][row] );
	cellTexts[col][row] = webMI.gfx.addText({x:x+style.textOffsetX,y:y+textOffsetY,fontFamily:fontFamily,fill:fontColor,fontSize:fontSize,text:maskedElement,visible:visible},tableElement);
	cellTexts[col][row].column=col;
	cellTexts[col][row].row=row;
	cellTexts[col][row].setAttribute("atv:table-body-text","true");

	if (configuration.highlightCells || configuration.selectRow || configuration.selectColumn) {
		webMI.addEvent(cellRects[col][row],"mouseover",this._associateObjWithEvent(this,"_highlightCell",[cellRects[col][row], true]));
		webMI.addEvent(cellRects[col][row],"mouseout",this._associateObjWithEvent(this,"_highlightCell",[cellRects[col][row], false]));
		webMI.addEvent(cellTexts[col][row],"mouseover",this._associateObjWithEvent(this,"_highlightCell",[cellRects[col][row], true]));
		webMI.addEvent(cellTexts[col][row],"mouseout",this._associateObjWithEvent(this,"_highlightCell",[cellRects[col][row], false]));
		if (configuration.selectRow || configuration.selectColumn) {
			webMI.addEvent(cellRects[col][row],"click",this._associateObjWithEvent(this,"_selectCell",[cellRects[col][row]]));
			webMI.addEvent(cellTexts[col][row],"click",this._associateObjWithEvent(this,"_selectCell",[cellRects[col][row]]));
		}
	}
};
// TODO: missing documentation
AtviseTable.prototype._createPredefinedTable = function() {
	var oldAutoResize = this.configuration.autoResize;
	this.setConfiguration({autoResize:true});
	var headerRects = [];
	var headerTexts = [];
	var rects = [];
	var texts = [];
	var data = [];
	var childsToRemove = [];

	for (var i in this.tableElement.childNodes) {
		var childEle = this.tableElement.childNodes[i];
		if (childEle.attributes != undefined) {
			if (this.hasSVG && childEle.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-header-rect") == "true") {
				headerRects.push(childEle);
			} else if (this.hasVML && childEle.getAttribute("atv:table-header-rect") == "true") {
				headerRects.push(childEle);
			} else if (this.hasSVG && childEle.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-header-text") == "true") {
				headerTexts.push(childEle);
			} else if (this.hasVML && childEle.getAttribute("atv:table-header-text") == "true") {
				headerTexts.push(childEle);
			} else if (this.hasSVG && childEle.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-body-rect") == "true") {
				rects.push(childEle);
			} else if (this.hasVML && childEle.getAttribute("atv:table-body-rect") == "true") {
				rects.push(childEle);
			} else if (this.hasSVG && childEle.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-body-text") == "true") {
				texts.push(childEle);
			} else if (this.hasVML && childEle.getAttribute("atv:table-body-text") == "true") {
				texts.push(childEle);
			}  else {
				childsToRemove.push(childEle);
			}
		}
	}
	// remove all non-table childs

	var i = childsToRemove.length-1;
	while (i > -1) {
		this.tableElement.removeChild(childsToRemove[i]);
		i--;
	}
	if (headerRects.length < 1) {
		// there were no child elements defined for creating a table
		this.setConfiguration({autoResize:oldAutoResize});
		this._createTable();
		return;
	}
	// read headers
	var startX = 0;
	for (var i=0; i<headerRects.length; i++) {
		var name = webMI.gfx.getText(headerTexts[i]);
		var fontColor = webMI.gfx.getFill(headerTexts[i]);
		var fontSize = webMI.gfx.getFontSize(headerTexts[i]);
		var fontFamily = webMI.gfx.getFontFamily(headerTexts[i]);
		var width = Math.floor(parseFloat(webMI.gfx.getWidth(headerRects[i])));
		var fill = webMI.gfx.getFill(headerRects[i]);
		var stroke = webMI.gfx.getStroke(headerRects[i]);
		var strokeWidth = webMI.gfx.getStrokeWidth(headerRects[i]);
		this._addHeader({name: name, width: width, fill: fill, fontColor: fontColor, fontSize:fontSize, fontFamily:fontFamily, stroke:stroke, strokeWidth:strokeWidth, sortable: true, resizable: true, eventList: []});
		this._checkArray(this.tableElement.headerRects,i);
		this._checkArray(this.tableElement.headerTexts,i);
		this.tableElement.headerRects[i] = headerRects[i];
		this.tableElement.headerRects[i].column = i;
		this.tableElement.headerRects[i].originalColor = fill;
		this.tableElement.headerTexts[i] = headerTexts[i];
		webMI.gfx.setX(this.tableElement.headerRects[i], startX);
		webMI.gfx.setX(this.tableElement.headerTexts[i], startX + (width/2));
		fontSize = (fontSize == undefined)?this.style.header.fontSize:fontSize;
		var textOffsetY = this.configuration.rowHeight - ((this.configuration.rowHeight/2)-(fontSize/2)) - 2;
		webMI.gfx.setY(this.tableElement.headerRects[i],0);
		webMI.gfx.setY(this.tableElement.headerTexts[i],0+textOffsetY);
//		this.tableElement.headerTexts[i].setAttribute("text-anchor","middle");
		webMI.gfx.setWidth(this.tableElement.headerRects[i], width);
		webMI.gfx.setHeight(this.tableElement.headerRects[i], this.configuration.rowHeight);
		startX += width;
		this.configuration.tableWidth += width;
		this._updateHeader(i);
	}

	this.setConfiguration({columnCount:this.tableElement.headerRects.length});
	// read data and cells
	if (rects.length == texts.length) {
		var idx = 0;
		var width = 0;
		var startX = 0;
		var startY = this.configuration.rowHeight;
		for (var i=0; i<rects.length; i++) {
			if (i != 0 && (i % this.configuration.columnCount) == 0) {
				this.configuration.rowCount++;
				startY += this.configuration.rowHeight;
				idx = 0;
				startX = 0;
			}
			this._checkArray(data,this.configuration.rowCount,idx);
			this._checkArray(this.tableElement.cellRects,idx,this.configuration.rowCount);
			this._checkArray(this.tableElement.cellTexts,idx,this.configuration.rowCount);
			this._checkArray(this.tableElement.cellTextContents,idx,this.configuration.rowCount);

			var text = webMI.gfx.getText(texts[i]);
			var fill = webMI.gfx.getFill(rects[i]);
			var fontColor = webMI.gfx.getFill(texts[i]);
			var fontSize = webMI.gfx.getFontSize(texts[i]);
			var fontFamily = webMI.gfx.getFontFamily(texts[i]);
			var stroke = webMI.gfx.getStroke(rects[i]);
			var strokeWidth = webMI.gfx.getStrokeWidth(rects[i]);
			// Fill cells of table
			data[this.configuration.rowCount][idx] = {text:text, fill:fill, fontColor: fontColor, fontSize:fontSize, fontFamily:fontFamily, stroke: stroke, strokeWidth:strokeWidth};
			this.tableElement.cellRects[idx][this.configuration.rowCount] = rects[i];
			this.tableElement.cellTexts[idx][this.configuration.rowCount] = texts[i];
			this.tableElement.cellTextContents[idx][this.configuration.rowCount] = text;

			this.tableElement.cellRects[idx][this.configuration.rowCount].column=idx;
			this.tableElement.cellRects[idx][this.configuration.rowCount].row=this.configuration.rowCount;
			this.tableElement.cellRects[idx][this.configuration.rowCount].originalColor=fill;

			if (this.configuration.highlightCells || this.configuration.selectRow || this.configuration.selectColumn) {
				webMI.addEvent(this.tableElement.cellRects[idx][this.configuration.rowCount],"mouseover",this._associateObjWithEvent(this,"_highlightCell",[this.tableElement.cellRects[idx][this.configuration.rowCount], true]));
				webMI.addEvent(this.tableElement.cellRects[idx][this.configuration.rowCount],"mouseout",this._associateObjWithEvent(this,"_highlightCell",[this.tableElement.cellRects[idx][this.configuration.rowCount], false]));
				webMI.addEvent(this.tableElement.cellTexts[idx][this.configuration.rowCount],"mouseover",this._associateObjWithEvent(this,"_highlightCell",[this.tableElement.cellRects[idx][this.configuration.rowCount], true]));
				webMI.addEvent(this.tableElement.cellTexts[idx][this.configuration.rowCount],"mouseout",this._associateObjWithEvent(this,"_highlightCell",[this.tableElement.cellRects[idx][this.configuration.rowCount], false]));
				if (this.configuration.selectRow || this.configuration.selectColumn) {
					webMI.addEvent(cellRects[col][row],"click",this._associateObjWithEvent(this,"_selectCell",[cellRects[col][row]]));
					webMI.addEvent(cellTexts[col][row],"click",this._associateObjWithEvent(this,"_selectCell",[cellRects[col][row]]));
				}
			}

			var width = parseFloat(this.tableElement.headerObjects[idx].width);
			webMI.gfx.setX(this.tableElement.cellRects[idx][this.configuration.rowCount], startX);
			webMI.gfx.setX(this.tableElement.cellTexts[idx][this.configuration.rowCount], startX + this.style.textOffsetX);
			webMI.gfx.setWidth(this.tableElement.cellRects[idx][this.configuration.rowCount],width);
			fontSize = (fontSize == undefined)?this.style.fontSize:fontSize;
			var textOffsetY = this.configuration.rowHeight - ((this.configuration.rowHeight/2)-(fontSize/2)) - 2;
			webMI.gfx.setY(this.tableElement.cellRects[idx][this.configuration.rowCount], startY);
			webMI.gfx.setY(this.tableElement.cellTexts[idx][this.configuration.rowCount], startY + textOffsetY);
			startX += width;
			idx++;
		}
		this.configuration.rowCount++;
		this.setDataProvider({data: data});
	}
	this.setConfiguration({autoResize:false});
};
// TODO: missing documentation
AtviseTable.prototype._createTable = function() {
	// if the tableElement has no predefined cells then create as many as there is space
	var cols = Math.floor(((this.configuration.displayWidth-this.configuration.scrollbarSize) / this.style.header.width));
	var statusbarHeight = (this.configuration.drawStatusBar)?this.statusbar.height:0;
	var rows = Math.floor((this.configuration.displayHeight-statusbarHeight-this.configuration.rowHeight) / this.configuration.rowHeight);
	this.setConfiguration({rowCount: rows});
	for (var i=1; i<(cols+1); i++) {
		this.addColumn(i);
	}
};
// TODO: missing documentation
AtviseTable.prototype._drag = function(e, arguments) {
	var moveX = arguments[0];
	var moveY = arguments[1];

	//var origX = element.offsetLeft, origY = element.offsetTop;
	var deltaX = 10;
	var deltaY = 10; //startX - origX, deltaY = startY - origY;

	if (document.addEventListener) {  // DOM Level 2 event model
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    }
    else if (document.attachEvent) {  // IE 5+ Event Model
        element.setCapture();
        element.attachEvent("onmousemove", moveHandler);
        element.attachEvent("onmouseup", upHandler);
        // Treat loss of mouse capture as a mouseup event
        element.attachEvent("onlosecapture", upHandler);
    }
    else {  // IE 4 Event Model
        var oldmovehandler = document.onmousemove; // used by upHandler()
        var olduphandler = document.onmouseup;
        document.onmousemove = moveHandler;
        document.onmouseup = upHandler;
    }

	if(e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;

	if(e.preventDefault) e.preventDefault();
	else e.returnValue = false;

	function moveHandler(e) {
		if (!e) e = window.event;
		var startX = parseFloat(webMI.gfx.getX(element));
		var startY = parseFloat(webMI.gfx.getY(element));
		//cnsole.log(startX + "    " + startY);
		if(moveX) {
			webMI.gfx.setX(element, (startX + deltaX));
		}
		if(moveY) {
			webMI.gfx.setY(element, (startY + deltaY));
		}

		if(e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
	}

	function upHandler(e) {
		if (!e) e = window.event;
		if (document.removeEventListener) {  // DOM event model
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        }
        else if (document.detachEvent) {  // IE 5+ Event Model
            element.detachEvent("onlosecapture", upHandler);
            element.detachEvent("onmouseup", upHandler);
            element.detachEvent("onmousemove", moveHandler);
            element.releaseCapture();
        }
        else {  // IE 4 Event Model
            document.onmouseup = olduphandler;
            document.onmousemove = oldmovehandler;
        }
		if(e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
	}
};
// TODO: missing documentation
AtviseTable.prototype._drawScrollBars = function() {
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var lastItemIndex = (this.dataProvider() != null) ? this.dataProvider().lastItemIndex() : null;
	this._undrawScrollBars();
	if (tableElement && lastItemIndex != null && configuration.columnCount > 0 && configuration.rowCount > 0) {
		var scrollbar = this.scrollbar;
		var statusbar = this.statusbar;
		var maxRows = Math.floor((this.configuration.displayHeight-statusbar.height-this.configuration.rowHeight) / this.configuration.rowHeight);
		var drawSide = (lastItemIndex+2) > maxRows;
		var maxOffset = (lastItemIndex+2) - configuration.rowCount;
		if (tableElement.scrollRowOffset > maxOffset && maxOffset > -1) {
			tableElement.scrollRowOffset = maxOffset;
		}
		var drawBottom = configuration.tableWidth > configuration.displayWidth;
		var xBottom=parseInt(webMI.gfx.getX(tableElement.cellRects[tableElement.scrollColOffset][tableElement.cellRects[0].length-1]));
		var yBottom=0;

		if(configuration.rowCount==0) {
			yBottom=configuration.rowHeight;
		} else {
			yBottom=parseInt(webMI.gfx.getY(tableElement.cellRects[0][tableElement.cellRects[0].length-1]))+configuration.rowHeight;
			// scrollbar size plus table height exceed the displayHeight
			if ((yBottom + configuration.rowHeight + configuration.scrollbarSize) > configuration.displayHeight) {
				this.removeRow(tableElement.cellRects[0].length-1,false,false);
			}
		}
		var xSide=configuration.tableWidth;
		var ySide=parseInt(webMI.gfx.getY(tableElement.headerRects[0]));

		if (this.tableElement.headersOutside > 0) {
			for (var i=this.tableElement.firstHeaderOutside; i<this.configuration.columnCount; i++) {
				if (this.tableElement.headerRects[i] != undefined) {
					xSide -= parseFloat(webMI.gfx.getWidth(this.tableElement.headerRects[i]));
				}
			}
		}

		if (drawBottom && xSide > configuration.displayWidth) {
			xSide = configuration.displayWidth - ((drawSide)?scrollbar.barSideWidth:0);
		} else if(drawSide) {
			xSide = (configuration.tableWidth+scrollbar.barSideWidth>configuration.displayWidth)?configuration.displayWidth-scrollbar.barSideWidth:configuration.tableWidth;
		}
		if(drawSide && drawBottom) {
			scrollbar.barDecoRect=webMI.gfx.addRect({width:scrollbar.buttonWidth,height:scrollbar.buttonHeight,x:xSide,y:yBottom,fill:"#eeeeee",stroke:"#000000",strokeWidth:1}, tableElement);
		}
		// coordinates for arrows
		var x1,x2,x3,x4,y1,y2,y3,y4;

		//barBottom
		if(drawBottom) {
			scrollbar.barBottom=webMI.gfx.addRect({width:xSide,height:scrollbar.barBottomHeight,x:xBottom,y:yBottom,fill:scrollbar.barFill,stroke:scrollbar.barStroke,strokeWidth:scrollbar.barStrokeWidth}, tableElement);
			scrollbar.buttonLeft=webMI.gfx.addRect({width:scrollbar.buttonWidth,height:scrollbar.buttonHeight,x:xBottom,y:yBottom,fill:scrollbar.buttonFill,stroke:scrollbar.buttonStroke,strokeWidth:scrollbar.buttonStrokeWidth}, tableElement);
			scrollbar.buttonRight=webMI.gfx.addRect({width:scrollbar.buttonWidth,height:scrollbar.buttonHeight,x:xSide-scrollbar.buttonWidth,y:yBottom,fill:scrollbar.buttonFill,stroke:scrollbar.buttonStroke,strokeWidth:scrollbar.buttonStrokeWidth}, tableElement);
			var overflowX = configuration.tableWidth - configuration.displayWidth;
			var sliderWidth =  xSide-(2*scrollbar.buttonWidth);
			scrollbar.barGripWidth = sliderWidth - overflowX;
			scrollbar.barBottomGrip=webMI.gfx.addRect({width:scrollbar.barGripWidth,height:scrollbar.barBottomHeight,x:xBottom+scrollbar.buttonWidth,y:yBottom,fill:scrollbar.barGripFill,stroke:scrollbar.buttonStroke,strokeWidth:scrollbar.buttonStrokeWidth}, tableElement);
			var gripXoffset = ((sliderWidth-scrollbar.barGripWidth)/tableElement.headersOutside)*tableElement.scrollColOffset;
			webMI.gfx.setMoveX(scrollbar.barBottomGrip,gripXoffset);
			webMI.addEvent(scrollbar.buttonLeft,"click",this._associateObjWithEvent(this,"_scroll",["left"]));
			webMI.addEvent(scrollbar.buttonRight,"click",this._associateObjWithEvent(this,"_scroll",["right"]));
			/* TODO: activate _drag Event when _drag function works
				webMI.addEvent(scrollbar.barBottomGrip,"mousedown",function(e) {
				_drag(e, scrollbar.barBottomGrip, [true,false]);
			});*/
			//draws arrow for buttonRight
			x1=parseInt(webMI.gfx.getX(scrollbar.buttonRight))+scrollbar.buttonWidth/3;
			y1=parseInt(webMI.gfx.getY(scrollbar.buttonRight))+scrollbar.buttonHeight/3;
			x2=x1+scrollbar.buttonWidth/3;
			y2=y1+scrollbar.buttonHeight/6;
			x3=x1;
			y3=y2+scrollbar.buttonHeight/6;
			x4=x1;
			y4=y1;
			scrollbar.buttonRightArrow=webMI.gfx.addPolyline({fill:"#00ABE5",points:[{x:x1,y:y1},{x:x2,y:y2},{x:x3,y:y3},{x:x4,y:y4}],stroke:"#000000",strokeWidth:0},tableElement);
			//draws arrow for buttonLeft
			x1=parseInt(webMI.gfx.getX(scrollbar.buttonLeft))+2*scrollbar.buttonWidth/3;
			y1=parseInt(webMI.gfx.getY(scrollbar.buttonLeft))+scrollbar.buttonHeight/3;
			x2=x1;
			y2=y1+scrollbar.buttonHeight/3;
			x3=x1-scrollbar.buttonWidth/3;
			y3=y2-scrollbar.buttonHeight/6;
			x4=x1;
			y4=y1;
			scrollbar.buttonLeftArrow=webMI.gfx.addPolyline({fill:"#00ABE5",points:[{x:x1,y:y1},{x:x2,y:y2},{x:x3,y:y3},{x:x4,y:y4}],stroke:"#000000",strokeWidth:0},tableElement);
			//events for buttons
			webMI.addEvent(scrollbar.buttonRightArrow,"click", this._associateObjWithEvent(this,"_scroll",["right"]));
			webMI.addEvent(scrollbar.buttonLeftArrow,"click", this._associateObjWithEvent(this,"_scroll",["left"]));
		}
		if(drawSide) {
			var barSideHeight = configuration.tableHeight-(4*scrollbar.buttonHeight)+configuration.rowHeight;
			scrollbar.barSide=webMI.gfx.addRect({width:scrollbar.barSideWidth,height:barSideHeight,x:xSide,y:ySide+(2*scrollbar.buttonHeight),fill:scrollbar.barFill,stroke:scrollbar.barStroke,strokeWidth:scrollbar.barStrokeWidth}, tableElement);
			scrollbar.buttonUp=webMI.gfx.addRect({width:scrollbar.buttonWidth,height:scrollbar.buttonHeight,x:xSide,y:ySide+scrollbar.buttonHeight,fill:scrollbar.buttonFill,stroke:scrollbar.buttonStroke,strokeWidth:scrollbar.buttonStrokeWidth}, tableElement);
			scrollbar.buttonUpPage=webMI.gfx.addRect({width:scrollbar.buttonWidth,height:scrollbar.buttonHeight,x:xSide,y:ySide,fill:scrollbar.buttonFill,stroke:scrollbar.buttonStroke,strokeWidth:scrollbar.buttonStrokeWidth}, tableElement);
			scrollbar.buttonDown=webMI.gfx.addRect({width:scrollbar.buttonWidth,height:scrollbar.buttonHeight,x:xSide,y:ySide+(2*scrollbar.buttonHeight)+barSideHeight,fill:scrollbar.buttonFill,stroke:scrollbar.buttonStroke,strokeWidth:scrollbar.buttonStrokeWidth}, tableElement);
			scrollbar.buttonDownPage=webMI.gfx.addRect({width:scrollbar.buttonWidth,height:scrollbar.buttonHeight,x:xSide,y:ySide+(3*scrollbar.buttonHeight)+barSideHeight,fill:scrollbar.buttonFill,stroke:scrollbar.buttonStroke,strokeWidth:scrollbar.buttonStrokeWidth}, tableElement);
			scrollbar.barGripHeight = barSideHeight / ((lastItemIndex+1) - (configuration.rowCount-1));
			scrollbar.barSideGrip=webMI.gfx.addRect({width:scrollbar.barSideWidth,height:scrollbar.barGripHeight,x:xSide,y:(ySide+(2*scrollbar.buttonHeight))+((tableElement.scrollRowOffset)*scrollbar.barGripHeight),fill:scrollbar.barGripFill,stroke:scrollbar.buttonStroke,strokeWidth:scrollbar.buttonStrokeWidth}, tableElement);
			//TODO: activate when position detection works (webMI2)... webMI.addEvent(scrollbar.barSide,"mousedown",this._associateObjWithEvent(this,"_scroll",["pos"]));
			webMI.addEvent(scrollbar.buttonUp,"click",this._associateObjWithEvent(this,"_scroll",["up",1]));
			webMI.addEvent(scrollbar.buttonUpPage,"click",this._associateObjWithEvent(this,"_scroll",["up",configuration.rowCount]));
			webMI.addEvent(scrollbar.buttonDown,"click",this._associateObjWithEvent(this,"_scroll",["down",1]));
			webMI.addEvent(scrollbar.buttonDownPage,"click",this._associateObjWithEvent(this,"_scroll",["down",configuration.rowCount]));
			/* TODO: activate _drag Event when _drag function works
			webMI.addEvent(scrollbar.barSideGrip,"mousedown",this._associateObjWithEvent(this,"_drag",[false,true]));
			*/
			//draws arrow for buttonUp
			x1=parseInt(webMI.gfx.getX(scrollbar.buttonUp))+scrollbar.buttonWidth/3;
			y1=parseInt(webMI.gfx.getY(scrollbar.buttonUp))+2*scrollbar.buttonHeight/3;
			x2=x1+scrollbar.buttonWidth/6;
			y2=y1-scrollbar.buttonHeight/3;
			x3=x1+scrollbar.buttonWidth/3;
			y3=y1;
			x4=x1;
			y4=y1;
			scrollbar.buttonUpArrow=webMI.gfx.addPolyline({fill:"#00ABE5",points:[{x:x1,y:y1},{x:x2,y:y2},{x:x3,y:y3},{x:x4,y:y4}],stroke:"#000000",strokeWidth:0},tableElement);
			var factor = 4;
			scrollbar.buttonUpPageArrow=webMI.gfx.addPolyline({fill:"#00ABE5",points:[{x:x1,y:(y1-scrollbar.buttonHeight)-factor},{x:x2,y:(y2-scrollbar.buttonHeight)-factor},{x:x3,y:(y3-scrollbar.buttonHeight)-factor},{x:x4,y:(y4-scrollbar.buttonHeight)-factor},{x:x1,y:(y1-scrollbar.buttonHeight)+factor},{x:x2,y:(y2-scrollbar.buttonHeight)+factor},{x:x3,y:(y3-scrollbar.buttonHeight)+factor},{x:x4,y:(y4-scrollbar.buttonHeight)+factor}],stroke:"#000000",strokeWidth:0},tableElement);
			//draws arrow for buttonDown
			x1=parseInt(webMI.gfx.getX(scrollbar.buttonDown))+scrollbar.buttonWidth/3;
			y1=parseInt(webMI.gfx.getY(scrollbar.buttonDown))+scrollbar.buttonHeight/3;
			x2=x1+scrollbar.buttonWidth/3;
			y2=y1;
			x3=x2-scrollbar.buttonWidth/6;
			y3=y1+scrollbar.buttonHeight/3;
			x4=x1;
			y4=y1;
			scrollbar.buttonDownArrow=webMI.gfx.addPolyline({fill:"#00ABE5",points:[{x:x1,y:y1},{x:x2,y:y2},{x:x3,y:y3},{x:x4,y:y4}],stroke:"#000000",strokeWidth:0},tableElement);
			scrollbar.buttonDownPageArrow=webMI.gfx.addPolyline({fill:"#00ABE5",points:[{x:x1,y:(y1+scrollbar.buttonHeight)-factor},{x:x2,y:(y2+scrollbar.buttonHeight)-factor},{x:x3,y:(y3+scrollbar.buttonHeight)-factor},{x:x4,y:(y4+scrollbar.buttonHeight)-factor},{x:x1,y:(y1+scrollbar.buttonHeight)+factor},{x:x2,y:(y2+scrollbar.buttonHeight)+factor},{x:x3,y:(y3+scrollbar.buttonHeight)+factor},{x:x4,y:(y4+scrollbar.buttonHeight)+factor}],stroke:"#000000",strokeWidth:0},tableElement);
			//events for buttons
			webMI.addEvent(scrollbar.buttonUpArrow,"click", this._associateObjWithEvent(this,"_scroll", ["up",1]));
			webMI.addEvent(scrollbar.buttonUpPageArrow,"click", this._associateObjWithEvent(this,"_scroll", ["up",configuration.rowCount]));
			webMI.addEvent(scrollbar.buttonDownArrow,"click", this._associateObjWithEvent(this,"_scroll",["down",1]));
			webMI.addEvent(scrollbar.buttonDownPageArrow,"click", this._associateObjWithEvent(this,"_scroll",["down",configuration.rowCount]));
		}
	}
	if (this.configuration.drawStatusBar) {
		this._drawStatusBar();
	}
};
// TODO: missing documentation
AtviseTable.prototype._drawSortingArrow = function(){
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	if (tableElement.headerRects.length > 0 && tableElement.headerRects[configuration.sortedByColumn] != undefined) {
		var x1=parseInt(webMI.gfx.getX(tableElement.headerRects[configuration.sortedByColumn]))+parseInt(webMI.gfx.getWidth(tableElement.headerRects[configuration.sortedByColumn]))-10;
		var y1=parseInt(webMI.gfx.getY(tableElement.headerRects[configuration.sortedByColumn]))+parseInt(webMI.gfx.getHeight(tableElement.headerRects[configuration.sortedByColumn]))/2 - 5;
			var x2=x1-10;
		var y2;
		if(configuration.sortingUp)y2=y1-10;
		else y2=y1+10;
		var x3=x2-10;
		var y3=y1;
		var x4=x1;
		var y4=y1;
		if(configuration.sortingUp){y1+=10;y2+=10;y3+=10;y4+=10;}
		this._undrawSortingArrow();

		tableElement.sortingArrow =	webMI.gfx.addPolyline({fill:"#A4A7AA",points:[{x:x1,y:y1},{x:x2,y:y2},{x:x3,y:y3},{x:x4,y:y4}],stroke:"#000000",strokeWidth:0},tableElement);

		if (tableElement.headerObjects[configuration.sortedByColumn] != undefined && tableElement.headerObjects[configuration.sortedByColumn].sortable) {
			webMI.addEvent(tableElement.sortingArrow,"click",this._associateObjWithEvent(this,"_sort",[configuration.sortedByColumn]));
		}
	}
};
// TODO: missing documentation
AtviseTable.prototype._drawStatusBar = function() {
	this._undrawStatusBar();
	var tableElement = this.tableElement;
	var statusbar = this.statusbar;
	var configuration = this.configuration;
	var style = this.style;
	var scrollbar = this.scrollbar;
	var x=(tableElement.cellRects[tableElement.scrollColOffset] != undefined && tableElement.cellRects[tableElement.scrollColOffset].length>0)?parseInt(webMI.gfx.getX(tableElement.cellRects[tableElement.scrollColOffset][tableElement.cellRects[tableElement.scrollColOffset].length-1])):0;
	var y=0;
	if(scrollbar.barBottom!=undefined) {
		y=parseFloat(webMI.gfx.getY(scrollbar.barBottom))+scrollbar.barBottomHeight;
	} else if (tableElement.cellRects.length > 0 && tableElement.cellRects[0].length > 0) {
		y=parseFloat(webMI.gfx.getY(tableElement.cellRects[0][tableElement.cellRects[0].length-1])) + configuration.rowHeight;
	} else {
		y=configuration.rowHeight;
	}
	var xWidth = configuration.tableWidth;
	if (scrollbar.barSide!=undefined && configuration.tableWidth + scrollbar.barSideWidth > configuration.displayWidth) {
		xWidth = configuration.displayWidth - scrollbar.barSideWidth;
	}
	// subtract all invisible cells
	if (this.tableElement.headersOutside > 0 && (scrollbar.barSide==undefined || scrollbar.barSide == null)) {
		for (var i=this.tableElement.firstHeaderOutside; i<this.configuration.columnCount; i++) {
			if(this.tableElement.headerRects[i]!=undefined) {
				var width = parseFloat(webMI.gfx.getWidth(this.tableElement.headerRects[i]));
				xWidth -= width;
			}
		}
	}
	var textOffsetY = statusbar.height -((statusbar.height/2)-(statusbar.fontSize/2)) - 2;
	var rowOffset = this.tableElement.scrollRowOffset;
	var lastItemIndex = (this.dataProvider() != null) ? this.dataProvider().lastItemIndex() + 1 : null;
	var rowOffsetEnd = (rowOffset+this.configuration.rowCount);
	if (rowOffsetEnd > lastItemIndex) {
		rowOffsetEnd = lastItemIndex;
	}
	var labelAmountText = (lastItemIndex != null && lastItemIndex > 0) ? "Data: " + (this.tableElement.scrollRowOffset+1) + " - " + rowOffsetEnd + " of " + lastItemIndex : "Data: 0";
	if (statusbar.bar==undefined) {
		statusbar.bar=webMI.gfx.addRect({width:xWidth,height:statusbar.height,x:x,y:y,fill:statusbar.fill,stroke:statusbar.stroke,strokeWidth:statusbar.strokeWidth}, tableElement);
		statusbar.label=webMI.gfx.addText({x:x+style.textOffsetX,y:y+textOffsetY,fontFamily:statusbar.fontFamily,fill:statusbar.fontColor,fontSize:statusbar.fontSize,text:labelAmountText},tableElement);
		var errorText="";
		statusbar.error=webMI.gfx.addText({x:xWidth/2,y:y+textOffsetY,fontFamily:statusbar.fontFamily,fill:statusbar.fontColor,fontSize:statusbar.fontSize,text:errorText},tableElement);
	} else {
		webMI.gfx.setY(statusbar.bar,y);
		webMI.gfx.setY(statusbar.label,y+textOffsetY);
		webMI.gfx.setY(statusbar.error,y+textOffsetY);
		webMI.gfx.setText(statusbar.label, labelAmountText);
		webMI.gfx.setWidth(statusbar.bar,xWidth);
	}
};
// TODO: missing documentation
AtviseTable.prototype._highlightCell = function(e, myArguments) {
	function highlightCell(tableElement, dataProvider, elem, fill) {
		if (elem != undefined && fill != undefined) {
			if (!highlight) {
				if (elem.row != undefined && elem.column != undefined) {
					var dataObj = dataProvider.dataObject((elem.row+1), (elem.column+1));
					if (dataObj != undefined && dataObj.fill != undefined ) {
						fill = dataObj.fill;
					}
				} else {
					if (tableElement.headerObjects[elem.column] != undefined && tableElement.headerObjects[elem.column].fill != undefined) {
						fill = tableElement.headerObjects[elem.column].fill;
					}
				}
			}
			webMI.gfx.setFill(elem,fill);
		}
	}
	function getCellFill(tableElement, dataProvider, elem) {
		if(elem != undefined) {
			var fill = elem.originalColor;
			var dataObj = dataProvider.dataObject((elem.row+1), (elem.column+1));
			if (dataObj != undefined && dataObj.fill != undefined) {
				fill = dataObj.fill;
			}
			return fill;
		}
	}


	var dataProvider = this.dataProvider();
	var elem = (myArguments[0])?myArguments[0]:null;

	var highlight = (myArguments[1])?myArguments[1]:false;
	var fill = (highlight)?this.style.highlight.fill:getCellFill(this.tableElement, dataProvider, elem);


	if ((elem.row != this.tableElement.selectedRow) && (elem.column != this.tableElement.selectedColumn)) {
		highlightCell(this.tableElement, dataProvider, elem,fill);
		if (this.configuration.selectRow && elem.row != undefined) {
			if (elem.row != this.tableElement.selectedRow) {
				for (var i=0; i<this.configuration.columnCount; i++) {
					if (i != this.tableElement.selectedColumn) {
						highlightCell(this.tableElement,this.tableElement.cellRects[i][elem.row], (highlight)?fill:getCellFill(this.tableElement, this.tableElement.cellRects[i][elem.row]));
					}
				}
			}
		}
		if(this.configuration.selectColumn && elem.column != undefined) {
			if (elem.column != this.tableElement.selectedColumn) {
				for (var i=0; i<this.configuration.rowCount; i++) {
					if (i != this.tableElement.selectedRow) {
						highlightCell(this.tableElement,this.tableElement.cellRects[elem.column][i], (highlight)?fill:getCellFill(this.tableElement, this.tableElement.cellRects[elem.column][i]));
					}
				}
			}
		}
	}
};
// TODO: missing documentation
AtviseTable.prototype._init = function(config) {
	var displayWidth = 1280;
	var displayHeight = 1024;
	if (this.hasVML && this.tableElement.getAttribute("atv:table-width") != undefined) {
		displayWidth = parseFloat(this.tableElement.getAttribute("atv:table-width"));
	} else if (this.hasSVG && this.tableElement.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-width") != undefined && this.tableElement.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-width") != "") {
		displayWidth = parseFloat(this.tableElement.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-width"));
	}
	if (this.hasVML && this.tableElement.getAttribute("atv:table-height") != undefined) {
		displayHeight = parseFloat(this.tableElement.getAttribute("atv:table-height"));
	} else if (this.hasSVG && this.tableElement.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-height") != undefined && this.tableElement.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-height") != "") {
		displayHeight = parseFloat(this.tableElement.getAttributeNS("http://webmi.atvise.com/2007/svgext","table-height"));
	}

//	this._setProperties(this.configuration, {displayWidth:parseFloat(displayWidth), displayHeight:parseFloat(displayHeight), rowHeight: 25, rowCount: 0, columnCount: 0, tableHeight: 0, tableWidth: 0, sortable: true, sortingUp: false, sortedByColumn: 0, scrollbarSize: 25, drawStatusBar: true, highlightCells: true, selectRow:false, selectColumn:false, autoResize: false, selectFixed: false});
	this._setProperties(config, {displayWidth:parseFloat(displayWidth), displayHeight:parseFloat(displayHeight), rowHeight: 25, rowCount: 0, columnCount: 0, tableHeight: 0, tableWidth: 0, sortable: true, sortingUp: false, sortedByColumn: 0, scrollbarSize: 25, drawStatusBar: true, highlightCells: true, selectRow:false, selectColumn:false, autoResize: false, selectFixed: false});
	this.configuration = config;
	this._setProperties(this.style, {header: {width: 140, fill: "#FFFFFF", fontFamily: "Open Sans", fontSize: 20, fontColor: "#00ABE5", stroke: "#4A5055", strokeWidth:0, sortable: true, resizable: true, cursor: "pointer"}, highlight: {fill: "#EEF1F2", selected:"#EEF1F2"}, stroke: "#FFFFFF", strokeWidth: 0, fontFamily: "Open Sans", fontSize: 14, fontColor: "#4A5055", cursor: "default", linkColor: "#00ABE5", linkCursor: "pointer", textOffsetX: 5});

	this._setProperties(this.styleEven, this.style);
	this._setProperties(this.styleOdd, this.style);
	this.styleEven.fill = "#FFFFFF";
	this.styleOdd.fill = "#FFFFFF";
	var size = this.configuration.scrollbarSize;
	this._setProperties(this.scrollbar, {buttonHeight: size, buttonWidth: size, barSideWidth: size, barFill: "#FFFFFF", barStroke: "#FFFFFF", strokeWidth:0, buttonFill: "#EEF1F2", buttonStroke: "#FFFFFF", buttonStrokeWidth:0, barGripFill: "#EEF1F2", barGripHeight: size, barGripWidth: size});
	this._setProperties(this.statusbar, {height:this.configuration.rowHeight, fill:"#FFFFFF", stroke:"#EEF1F2", strokeWidth:1, fontFamily:"Open Sans", fontSize:12, fontColor:"#00ABE5"});
	this.setDataProvider({data: []});
	// if the tableElement is predefined then load the children
	if (this.tableElement.childNodes.length > 0) {
		this._createPredefinedTable();
	} else {
		this._createTable();
	}
	if (this.configuration.drawStatusBar) {
		this._drawStatusBar();
	}
};
// TODO: missing documentation
AtviseTable.prototype._mouseDownEdit = function(e, myArguments) {
	var tableElement = this.tableElement;
	var elem = (myArguments[0]!=undefined)?myArguments[0]:null;
	var column = (myArguments[1]!=undefined)?myArguments[1]:null;
	var row = (myArguments[2]!=undefined)?myArguments[2]:null;
	var editFunction = (myArguments[3]!=undefined)?myArguments[3]:null;
	if (elem && column != undefined && row != undefined) {
		var inputRect=webMI.gfx.addRect({width:webMI.gfx.getWidth(elem),height:webMI.gfx.getHeight(elem),x:webMI.gfx.getX(elem),y:webMI.gfx.getY(elem),fill:"none",stroke:"#0000FF",strokeWidth:3}, tableElement);
		var isPanel = navigator.userAgent.indexOf("WebKitWinCE") != -1;
		if (isPanel) {
			// TODO: open keyboard correctly if is panel
//			webMI.display.openWindow({display:"SYSTEM.DISPLAYS.touchpanel_demo.elements.keyboard.keyboard",extern:false,height:211,menubar:false,modal:false,movable:true,resizable:false,scrollbars:false,status:false,title:"",toolbar:false,width:528,x:0,y:100,query:webMI.query});
		} else {
			var input = prompt("User input for " + tableElement.cellTextContents[column][row] + ":", "");	//input prompt in Browser
			if(input) {
				if (editFunction != null) {
					var srcText = tableElement.cellTextContents[column][row];
					myArguments[3] = srcText;
					editFunction(e, myArguments, input);
				} else {
					this._setCellContent(e, row, column, true, { text: input });
				}
			}
		}
		tableElement.removeChild(inputRect);
	}
};
// TODO: missing documentation
AtviseTable.prototype._mouseDownEditHeader = function(e, myArguments) {
	var tableElement = this.tableElement;
	var elem = (myArguments[0]!=undefined)?myArguments[0]:null;
	var column = (myArguments[1]!=undefined)?myArguments[1]:null;
	if (elem != null && column > -1) {
		var inputRect=webMI.gfx.addRect({width:webMI.gfx.getWidth(elem),height:webMI.gfx.getHeight(elem),x:webMI.gfx.getX(elem),y:webMI.gfx.getY(elem),fill:"none",stroke:"#0000FF",strokeWidth:1}, tableElement);
		var isPanel = navigator.userAgent.indexOf("WebKitWinCE") != -1;
		if (isPanel) {
			// TODO: open keyboard correctly if is panel
			//webMI.display.openWindow({display:"SYSTEM.DISPLAYS.touchpanel_demo.elements.keyboard.keyboard",extern:false,height:211,menubar:false,modal:false,movable:true,resizable:false,scrollbars:false,status:false,title:"",toolbar:false,width:528,x:0,y:100,query:webMI.query});
		} else {
			var input = prompt("Edit header width: ",webMI.gfx.getWidth(elem));	//input prompt in Browser
			if(input) {
				var newWidth = parseFloat(input);
				tableElement.headerObjects[column].width = newWidth;
				this.setHeader(tableElement.headerObjects[column],(column+1),true);
			}
		}
		tableElement.removeChild(inputRect);
	}
};
// TODO: missing documentation
AtviseTable.prototype._scroll = function(e, myArguments){
	var scrollDirection = myArguments[0];
	var scrollbar = this.scrollbar;
	var scrollOffset = parseFloat(myArguments[1]);
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var doScroll = true;
	function moveGrid(tableElement, scrollbar, right, configuration) {
		var multiplicator=(right)?-1:1;
		var calc = (right)?0:-1;
		var	preWidth = parseFloat(tableElement.headerObjects[tableElement.scrollColOffset+calc].width);
		tableElement.scrollColOffset=tableElement.scrollColOffset+(-1*multiplicator);
		for (var i=0; i<tableElement.headerRects.length; ++i) {
			if (i==(tableElement.scrollColOffset) && tableElement.sortingArrow != null) {
				var moveOffset = 0;
				for (var offset=0; offset<tableElement.scrollColOffset; ++offset) {
					moveOffset += parseFloat(tableElement.headerObjects[offset].width);
				}
				var visible = (configuration.sortedByColumn > 1) || (-1) * moveOffset >= 0;
				webMI.gfx.setMoveX(tableElement.sortingArrow,(-1)*moveOffset);
				webMI.gfx.setVisible(tableElement.sortingArrow, visible);
			}
			var oldXrect = parseFloat(webMI.gfx.getX(tableElement.headerRects[i]));
			var oldXtext = parseFloat(webMI.gfx.getX(tableElement.headerTexts[i]));
			webMI.gfx.setX(tableElement.headerRects[i],oldXrect+(multiplicator*preWidth));
			webMI.gfx.setX(tableElement.headerTexts[i],oldXtext+(multiplicator*preWidth));
			var width = parseFloat(webMI.gfx.getWidth(tableElement.headerRects[i]));
			var visible = ((oldXrect+(multiplicator*preWidth) + width) < configuration.displayWidth && (oldXrect+(multiplicator*preWidth) + width) > 0);
			webMI.gfx.setVisible(tableElement.headerRects[i],visible);
			webMI.gfx.setVisible(tableElement.headerTexts[i],visible);
			for (var j=0; j<tableElement.cellRects[i].length; ++j) {
				oldXtext = parseFloat(webMI.gfx.getX(tableElement.cellTexts[i][j]));
				webMI.gfx.setX(tableElement.cellRects[i][j],oldXrect+(multiplicator*preWidth));
				webMI.gfx.setX(tableElement.cellTexts[i][j],oldXtext+(multiplicator*preWidth));
				var width = parseFloat(webMI.gfx.getWidth(tableElement.cellRects[i][j]));
				var visible = ((oldXrect+(multiplicator*preWidth) + width) < configuration.displayWidth && (oldXrect+(multiplicator*preWidth) + width) > 0);
				webMI.gfx.setVisible(tableElement.cellRects[i][j],visible);
				webMI.gfx.setVisible(tableElement.cellTexts[i][j],visible);
			}
		}
		var bottomWidth = parseFloat(webMI.gfx.getWidth(scrollbar.barBottom)) - (2*scrollbar.buttonWidth);
		webMI.gfx.setMoveX(scrollbar.barBottomGrip,((bottomWidth-scrollbar.barGripWidth)/tableElement.headersOutside)*tableElement.scrollColOffset);
	}
	switch(scrollDirection){
		case "right" :
			doScroll=false;
			var lastHeaderX = parseFloat(webMI.gfx.getX(tableElement.headerRects[tableElement.headerRects.length-1]));
			var lastHeaderWidth = parseFloat(tableElement.headerObjects[tableElement.headerObjects.length-1].width);
			var lastHeaderPos = lastHeaderX + lastHeaderWidth;
			if ((lastHeaderPos > configuration.displayWidth) && (configuration.tableWidth > configuration.displayWidth)) {
				moveGrid(tableElement,scrollbar,true,configuration);
			}
			break;
		case "left":
			doScroll=false;
			if (tableElement.scrollColOffset > 0) {
				moveGrid(tableElement,scrollbar,false,configuration);
			}
			break;
		case "up":
			if (tableElement.scrollRowOffset > 0) {
				tableElement.scrollRowOffset = tableElement.scrollRowOffset - scrollOffset;
				if(tableElement.scrollRowOffset < 0) {
					tableElement.scrollRowOffset = 0;
				}
				this.dataProvider().previous(scrollOffset);
				webMI.gfx.setMoveY(this.scrollbar.barSideGrip,tableElement.scrollRowOffset*this.scrollbar.barGripHeight);
			} else { doScroll=false; }
			break;
		case "down":
			 var downStep = scrollOffset;
			 var lastItemIndex = this.dataProvider().lastItemIndex() + 1;
			 if ((tableElement.scrollRowOffset + configuration.rowCount) < lastItemIndex) {
				tableElement.scrollRowOffset = tableElement.scrollRowOffset + scrollOffset;
				if(tableElement.scrollRowOffset + configuration.rowCount > lastItemIndex) {
					downStep = lastItemIndex - tableElement.scrollRowOffset;
					tableElement.scrollRowOffset = lastItemIndex - configuration.rowCount;
				}
				this.dataProvider().next(downStep);
				webMI.gfx.setMoveY(this.scrollbar.barSideGrip, tableElement.scrollRowOffset*this.scrollbar.barGripHeight);
			} else { doScroll=false; }
			break;
		case "pos":
			// TODO: determine offset (SVG coordinates needed -> webMI 2.0)
			break;
		default: alert("???_scroll???"); break;
	}
	if (doScroll) {
		this._setDataExtract();
	}
};
// TODO: missing documentation
AtviseTable.prototype._selectCell = function(e, myArguments) {
	function getCellFill(dataProvider, elem) {
		var originalFill = elem.originalColor;
		var dataObj = (dataProvider != null) ? dataProvider.dataObject((elem.row+1), (elem.column+1)) : undefined;
		if (dataObj != undefined && dataObj.fill != undefined ) {
			originalFill = dataObj.fill;
		}
		return originalFill;
	}
	var dataProvider = this.dataProvider();
	var sameRow = false;
	var sameColumn = false;
	var selectedFill = this.style.highlight.selected;
	var elem = myArguments[0];
	if (elem != undefined && elem.row != undefined && elem.column != undefined) {
		if (elem.row != this.tableElement.selectedRow || elem.column != this.tableElement.selectedColumn) {
			webMI.gfx.setFill(elem,selectedFill);
		} else {
			webMI.gfx.setFill(elem,getCellFill(dataProvider, elem));
		}
		if (this.configuration.selectRow) {
			// unhighlight selected cells
			if (this.tableElement.selectedRow > -1 && elem.row != this.tableElement.selectedRow) {
				for (var i=0; i<this.configuration.columnCount; i++) {
					if (i != this.tableElement.selectedColumn) {
						webMI.gfx.setFill(this.tableElement.cellRects[i][this.tableElement.selectedRow],getCellFill(dataProvider, this.tableElement.cellRects[i][this.tableElement.selectedRow]));
					}
				}
			}
			if (elem.row != this.tableElement.selectedRow) {
				// highlight new cells
				for (var i=0; i<this.configuration.columnCount; i++) {
					webMI.gfx.setFill(this.tableElement.cellRects[i][elem.row],selectedFill);
				}
				this.tableElement.selectedRow = elem.row;
			} else {
				sameRow = true;
			}
		}
		if (this.configuration.selectColumn) {
			// unhighlight selected cells
			if (this.tableElement.selectedColumn > -1 && elem.column != this.tableElement.selectedColumn) {
				for (var i=0; i<this.configuration.rowCount; i++) {
					if (i != this.tableElement.selectedRow) {
						webMI.gfx.setFill(this.tableElement.cellRects[this.tableElement.selectedColumn][i],getCellFill(dataProvider, this.tableElement.cellRects[this.tableElement.selectedColumn][i]));
					}
				}
			}
			if (elem.column != this.tableElement.selectedColumn) {
				// highlight new cells
				for (var i=0; i<this.configuration.rowCount; i++) {
					webMI.gfx.setFill(this.tableElement.cellRects[elem.column][i],selectedFill);
				}
				this.tableElement.selectedColumn = elem.column;
			} else {
				sameColumn = true;
			}
		}
		if ((sameRow && sameColumn) && (this.configuration.selectRow && this.configuration.selectColumn)) {
			if (!this.configuration.selectFixed) {
				// unhighlight all selected cells & rows
				for (var i=0; i<this.configuration.rowCount; i++) {
					webMI.gfx.setFill(this.tableElement.cellRects[elem.column][i],getCellFill(dataProvider, this.tableElement.cellRects[elem.column][i]));
				}
				for (var i=0; i<this.configuration.columnCount; i++) {
					webMI.gfx.setFill(this.tableElement.cellRects[i][elem.row],getCellFill(dataProvider, this.tableElement.cellRects[i][elem.row]));
				}
				this.tableElement.selectedRow = -1;
				this.tableElement.selectedColumn = -1;
			}
		} else if (sameRow && this.configuration.selectRow && !this.configuration.selectColumn) {
			if (!this.configuration.selectFixed) {
				for (var i=0; i<this.configuration.columnCount; i++) {
					webMI.gfx.setFill(this.tableElement.cellRects[i][elem.row],getCellFill(dataProvider, this.tableElement.cellRects[i][elem.row]));
				}
				this.tableElement.selectedRow = -1;
			}
		} else if (sameColumn && this.configuration.selectColumn && !this.configuration.selectRow) {
			if (!this.configuration.selectFixed) {
				for (var i=0; i<this.configuration.rowCount; i++) {
					webMI.gfx.setFill(this.tableElement.cellRects[elem.column][i],getCellFill(dataProvider, this.tableElement.cellRects[elem.column][i]));
				}
				this.tableElement.selectedColumn = -1;
			}
		}
	}
};
// TODO: missing documentation
AtviseTable.prototype._setCellContent = function(e, rowNr, colNr, overwrite, dataObj){
	var tableElement = this.tableElement;
	var style = this._cellStyle((rowNr%2==0));
	var newValue = (dataObj != undefined) ? String(dataObj.text) : "";
	var fill = style.fill;
	var fontColor = style.fontColor;
	var fontSize = style.fontSize;
	var fontFamily = style.fontFamily;
	var stroke = style.stroke;
	var strokeWidth = style.strokeWidth;
	var cursor = style.cursor;

	// remove cell if it already has an event attached (workaround, because removeEvent doesnt work)
	if (tableElement.cellRects[colNr][rowNr].hasEvent != undefined) {
		var x = parseFloat(webMI.gfx.getX(tableElement.cellRects[colNr][rowNr]));
		var y = parseFloat(webMI.gfx.getY(tableElement.cellRects[colNr][rowNr]));
		tableElement.removeChild(tableElement.cellRects[colNr][rowNr]);
		tableElement.removeChild(tableElement.cellTexts[colNr][rowNr]);
		tableElement.cellRects[colNr][rowNr] = null;
		tableElement.cellTexts[colNr][rowNr] = null;
		tableElement.cellTextContents[colNr][rowNr] = null;
		var cellStyle = this._cellStyle((rowNr%2==0));
		cellStyle.fill = fill;
		this._createCell(colNr,rowNr,x,y,cellStyle);
	}
	if (tableElement.cellTexts[colNr][rowNr]!=undefined) {
		tableElement.cellTextContents[colNr][rowNr]=newValue;
		var maskedElement = (typeof tableElement.maskingFunctions[colNr] === "undefined") ?
			tableElement.cellTextContents[colNr][rowNr] :
			tableElement.maskingFunctions[colNr]( tableElement.cellTextContents[colNr][rowNr] );

		webMI.gfx.setText(tableElement.cellTexts[colNr][rowNr],maskedElement);
		webMI.gfx.setFill(tableElement.cellTexts[colNr][rowNr],style.fontColor);
		if (dataObj != undefined) {
			// update styling
			if (dataObj.fontSize != undefined) {
				fontSize = dataObj.fontSize;
			}
			webMI.gfx.setFontSize(tableElement.cellTexts[colNr][rowNr], fontSize);
			if (dataObj.fontFamily != undefined) {
				fontFamily = dataObj.fontFamily;
			}
			webMI.gfx.setFontFamily(tableElement.cellTexts[colNr][rowNr], fontFamily);
			if (dataObj.fontColor != undefined) {
				fontColor = dataObj.fontColor;
			}
			webMI.gfx.setFill(tableElement.cellTexts[colNr][rowNr], fontColor);
			if (dataObj.stroke != undefined) {
				stroke = dataObj.stroke;
			}
			webMI.gfx.setStroke(tableElement.cellRects[colNr][rowNr], stroke);
			if (dataObj.strokeWidth != undefined) {
				strokeWidth = dataObj.strokeWidth;
			}
			webMI.gfx.setStrokeWidth(tableElement.cellRects[colNr][rowNr], strokeWidth);
			if (dataObj.cursor != undefined) {
				cursor = dataObj.cursor;
			}
			if (dataObj.fill != undefined) {
				fill = dataObj.fill;
			}
			webMI.gfx.setFill(tableElement.cellRects[colNr][rowNr], fill);
			tableElement.cellRects[colNr][rowNr].setAttribute("cursor", cursor);
			tableElement.cellTexts[colNr][rowNr].setAttribute("cursor", cursor);
			// update events
			var editFunction = null;
			if (dataObj.eventList && dataObj.eventList.length > 0) {
				for (var eventObjEntry in dataObj.eventList) {
					var eventObj = dataObj.eventList[eventObjEntry];
					if (eventObj.name != "edit") {
						webMI.addEvent(tableElement.cellRects[colNr][rowNr], eventObj.name, eventObj.fn);
						webMI.addEvent(tableElement.cellTexts[colNr][rowNr], eventObj.name, eventObj.fn);
					} else {
						editFunction = eventObj.fn;
					}
				}
				tableElement.cellRects[colNr][rowNr].hasEvent=true;
			}
			if(dataObj.editable || editFunction != null) {
				webMI.addEvent(tableElement.cellRects[colNr][rowNr],"click",this._associateObjWithEvent(this,"_mouseDownEdit",[tableElement.cellRects[colNr][rowNr], colNr, rowNr, editFunction]));
				webMI.addEvent(tableElement.cellTexts[colNr][rowNr],"click",this._associateObjWithEvent(this,"_mouseDownEdit",[tableElement.cellRects[colNr][rowNr], colNr, rowNr, editFunction]));
			}
			if ((dataObj.eventList && dataObj.eventList.length > 0) || dataObj.editable) {
				var linkColor = (dataObj.fontColor)?dataObj.fontColor:style.linkColor;
				var linkCursor = (dataObj.cursor)?dataObj.cursor:style.linkCursor;
				webMI.gfx.setFill(tableElement.cellTexts[colNr][rowNr], linkColor);
				tableElement.cellRects[colNr][rowNr].setAttribute("cursor", linkCursor);
				tableElement.cellTexts[colNr][rowNr].setAttribute("cursor", linkCursor);
				tableElement.cellRects[colNr][rowNr].hasEvent=true;
			}
			if (overwrite) {
				dataObj.text = newValue;
				this.dataProvider().setDataObject(rowNr, colNr, dataObj);
			}
		}
	}
};
// TODO: missing documentation
AtviseTable.prototype._setDataExtract = function(dataExtract) {
	var data = (dataExtract == undefined) ? this.dataProvider().data() : dataExtract;
	var configuration = this.configuration;
	var lastItemIndex = (this.dataProvider().lastItemIndex())+1;
	if (this.tableElement.scrollRowOffset >= lastItemIndex) {
		this.tableElement.scrollRowOffset = 0;
	}
	if (data != undefined) {
		var rowCount = configuration.rowCount;
		var columnCount = configuration.columnCount;
		// adjust rows, if table requires autoResize
		if (configuration.autoResize) {
			if (rowCount < lastItemIndex) {
				for (var i=rowCount; i<lastItemIndex; i++) {
					this.addRow(false);
				}
			} else if (lastItemIndex < rowCount && lastItemIndex != -1) {
				this.tableElement.scrollRowOffset = 0;
				var offset = lastItemIndex;
				for (var i=rowCount; i>offset; i--) {
					this.removeRow(i,false,false);
				}
			}

			// adjust columns, if table requires autoResize
			if (data[0] != undefined) {
				if (columnCount < data[0].length) {
					for (var i=(columnCount+1); i<(data[0].length+1); i++) {
						this.addColumn(i);
					}
				} else if (data[0].length < columnCount) {
					this.tableElement.scrollColOffset = 0;
					var offset = data[0].length;
					for (var i=columnCount; i>offset; i--) {
						this.removeColumn(i);
					}
				}
			}
			rowCount = configuration.rowCount;
			columnCount = configuration.columnCount;
		}

		if (lastItemIndex < rowCount && lastItemIndex != -1) {
			for (var i=lastItemIndex; i<rowCount; i++) {
				for (var j=0; j<columnCount; j++) {
					this._setCellContent(null, i, j, false, null);
				}
			}
		}
		var rowOffset = 0;
		var rowOffsetEnd = rowCount;
		if (rowOffsetEnd > lastItemIndex) {
			rowOffsetEnd = lastItemIndex;
		}

		var colOffset = 0;
		var colOffsetEnd = (colOffset+(configuration.columnCount));
		var rowNr = 0, colNr = 0;
		for (var i=rowOffset; i<rowOffsetEnd; i++) {
			for (var j=colOffset; j<colOffsetEnd; j++) {
				var dataObj = data[i] ? data[i][j] : { text: "" };
				this._setCellContent(null, rowNr, colNr, false, dataObj);
				++colNr;
			}
			++rowNr;
			colNr = 0;
		}
	}
	this._drawScrollBars();
};
// TODO: missing documentation
AtviseTable.prototype._setProperties = function(obj, properties) {
	var overwrite = (arguments[2])?arguments[2]:false;
	if (typeof obj == "object") {
		for (var i in properties) {
			if(obj[i] == undefined || overwrite) {
				if (typeof obj[i] == "object") {
					this._setProperties(obj[i], properties[i], overwrite);
				} else {
					obj[i] = properties[i];
				}
			}
		}
	}
	return obj;
};
// TODO: missing documentation
AtviseTable.prototype._sort = function(e, myArguments){
	var col = myArguments[0];
	var dontInvert = myArguments[1];
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var data = this.dataProvider().data();
	if (configuration.sortable) {
		if(configuration.sortedByColumn!=col) configuration.sortingUp=false;	// if new column was chosen to sort by
		if(!dontInvert) {
			configuration.sortingUp=!configuration.sortingUp;
		}
		configuration.sortedByColumn=col;			//remembers by which column the table was sorted the last time
		this.dataProvider().sort(col, configuration.sortingUp);
		this.tableElement.selectedRow = -1;
		this.tableElement.selectedColumn = -1;
		this._drawSortingArrow();
	}
};
// TODO: missing documentation
AtviseTable.prototype._undrawAll = function(){
	while(this.tableElement.hasChildNodes()){
		this.tableElement.removeChild(this.tableElement.lastChild);
	}
};
// TODO: missing documentation
AtviseTable.prototype._undrawScrollBars = function(){
	var tableElement = this.tableElement;
	function removeElementAndSetNull(parent,child) {
		if(parent != null && child != null) {
			try {
				parent.removeChild(child);
			} catch(e) {}
		}
		return null;
	}
	var scrollbar = this.scrollbar;
	if(scrollbar != undefined) {
		scrollbar.barDecoRect = removeElementAndSetNull(tableElement,scrollbar.barDecoRect);
		scrollbar.barSide = removeElementAndSetNull(tableElement,scrollbar.barSide);
		scrollbar.barSideGrip =  removeElementAndSetNull(tableElement,scrollbar.barSideGrip);
		scrollbar.barBottom = removeElementAndSetNull(tableElement,scrollbar.barBottom);
		scrollbar.barBottomGrip = removeElementAndSetNull(tableElement,scrollbar.barBottomGrip);
		scrollbar.buttonLeft = removeElementAndSetNull(tableElement,scrollbar.buttonLeft);
		scrollbar.buttonRight = removeElementAndSetNull(tableElement,scrollbar.buttonRight);
		scrollbar.buttonUp = removeElementAndSetNull(tableElement,scrollbar.buttonUp);
		scrollbar.buttonUpPage = removeElementAndSetNull(tableElement,scrollbar.buttonUpPage);
		scrollbar.buttonDown = removeElementAndSetNull(tableElement,scrollbar.buttonDown);
		scrollbar.buttonDownPage = removeElementAndSetNull(tableElement,scrollbar.buttonDownPage);
		scrollbar.buttonRightArrow = removeElementAndSetNull(tableElement,scrollbar.buttonRightArrow);
		scrollbar.buttonLeftArrow = removeElementAndSetNull(tableElement,scrollbar.buttonLeftArrow);
		scrollbar.buttonUpArrow = removeElementAndSetNull(tableElement,scrollbar.buttonUpArrow);
		scrollbar.buttonUpPageArrow = removeElementAndSetNull(tableElement,scrollbar.buttonUpPageArrow);
		scrollbar.buttonDownArrow = removeElementAndSetNull(tableElement,scrollbar.buttonDownArrow);
		scrollbar.buttonDownPageArrow = removeElementAndSetNull(tableElement,scrollbar.buttonDownPageArrow);
	}
	if (this.configuration.drawStatusBar) {
		this._drawStatusBar();
	}
};
// TODO: missing documentation
AtviseTable.prototype._undrawSortingArrow = function(){
	if(this.tableElement.sortingArrow!=null) {
		this.tableElement.removeChild(this.tableElement.sortingArrow);
		this.tableElement.sortingArrow=null;
	}
};
// TODO: missing documentation
AtviseTable.prototype._undrawStatusBar = function() {
	var tableElement = this.tableElement;
	function removeElementAndSetNull(parent,child) {
		if(parent != null && child != null) {
			try {
				parent.removeChild(child);
			} catch(e) {}
		}
		return null;
	}
	var statusbar = this.statusbar;
	if(statusbar != undefined) {
		statusbar.bar = removeElementAndSetNull(tableElement,statusbar.bar);
		statusbar.label = removeElementAndSetNull(tableElement,statusbar.label);
		statusbar.error = removeElementAndSetNull(tableElement,statusbar.error);
	}
};
// TODO: missing documentation
AtviseTable.prototype._updateHeader = function(column) {
	var tableElement = this.tableElement;
	var configuration = this.configuration;
	var style = this.style;

	if (tableElement.headerObjects[column]) {
		// rearrange all following headers and cells if the width has changed
		var currentWidth = parseFloat(webMI.gfx.getWidth(tableElement.headerRects[column]));
		if (currentWidth != tableElement.headerObjects[column].width) {
			webMI.gfx.setWidth(tableElement.headerRects[column], tableElement.headerObjects[column].width);
			for (var i=0; i<configuration.rowCount; i++) {
				webMI.gfx.setWidth(tableElement.cellRects[column][i], tableElement.headerObjects[column].width);
			}
			var currentX = parseFloat(webMI.gfx.getX(tableElement.headerRects[column]));
			if (this.hasVML) {
				webMI.gfx.setX(tableElement.headerTexts[column], currentX + style.textOffsetX);
			} else {
				webMI.gfx.setX(tableElement.headerTexts[column], currentX + (tableElement.headerObjects[column].width / 2));
			}

			var diff = currentWidth - tableElement.headerObjects[column].width;
			// headers
			for (var i=(column+1); i<tableElement.headerRects.length; i++) {
				var startX = parseFloat(webMI.gfx.getX(tableElement.headerRects[i]));
				var newX = startX + (-1) * diff;
				webMI.gfx.setX(tableElement.headerRects[i], newX);
				var headerWidth = parseFloat(webMI.gfx.getWidth(tableElement.headerRects[i]));
				if (this.hasVML) {
					webMI.gfx.setX(tableElement.headerTexts[i], newX + style.textOffsetX);
				} else {
					webMI.gfx.setX(tableElement.headerTexts[i], newX + (headerWidth/2));
				}
				// cells
				for (var j=0; j<configuration.rowCount; j++) {
					webMI.gfx.setX(tableElement.cellRects[i][j], newX);
					webMI.gfx.setX(tableElement.cellTexts[i][j], newX + style.textOffsetX);
				}
			}
		}
		// remove cell if it already has an event attached (workaround, because removeEvent doesn't work)
		if (tableElement.headerRects[column] && tableElement.headerRects[column].hasEvent != undefined) {
			this.removeColumn((column+1), false, false, false);
			this.addColumn((column+1), false);
		}
		webMI.gfx.setText(tableElement.headerTexts[column],tableElement.headerObjects[column].name);
		if (tableElement.headerObjects[column].sortable == true) {
			webMI.addEvent(tableElement.headerRects[column],"click",this._associateObjWithEvent(this,"_sort",[column]));
			webMI.addEvent(tableElement.headerTexts[column],"click",this._associateObjWithEvent(this,"_sort",[column]));
		}

		if (tableElement.headerObjects[column].resizable == true) {
			webMI.addEvent(tableElement.headerRects[column],"dblclick",this._associateObjWithEvent(this,"_mouseDownEditHeader",[tableElement.headerRects[column],column]));
			webMI.addEvent(tableElement.headerTexts[column],"dblclick",this._associateObjWithEvent(this,"_mouseDownEditHeader",[tableElement.headerRects[column],column]));
		}
		if (configuration.highlightCells == true) {
			webMI.addEvent(tableElement.headerRects[column],"mouseover",this._associateObjWithEvent(this,"_highlightCell",[tableElement.headerRects[column],true]));
			webMI.addEvent(tableElement.headerTexts[column],"mouseover",this._associateObjWithEvent(this,"_highlightCell",[tableElement.headerRects[column],true]));
			webMI.addEvent(tableElement.headerRects[column],"mouseout",this._associateObjWithEvent(this,"_highlightCell",[tableElement.headerRects[column],false]));
			webMI.addEvent(tableElement.headerTexts[column],"mouseout",this._associateObjWithEvent(this,"_highlightCell",[tableElement.headerRects[column],false]));
		}
		if (tableElement.headerObjects[column].eventList && tableElement.headerObjects[column].eventList.length > 0) {
			for (var eventObjEntry in tableElement.headerObjects[column].eventList) {
				webMI.addEvent(tableElement.headerRects[column], tableElement.headerObjects[column].eventList[eventObjEntry].name, tableElement.headerObjects[column].eventList[eventObjEntry].fn);
				webMI.addEvent(tableElement.headerTexts[column], tableElement.headerObjects[column].eventList[eventObjEntry].name, tableElement.headerObjects[column].eventList[eventObjEntry].fn);
			}
		}
		if ((tableElement.headerObjects[column].eventList && tableElement.headerObjects[column].eventList.length > 0) || tableElement.headerObjects[column].sortable || tableElement.headerObjects[column].resizable) {
			tableElement.headerRects[column].setAttribute("cursor", tableElement.headerObjects[column].cursor);
			tableElement.headerTexts[column].setAttribute("cursor", tableElement.headerObjects[column].cursor);
			tableElement.headerRects[column].hasEvent = true;
		}
		var fill = style.fill;
		var stroke = style.stroke;
		if (tableElement.headerObjects[column].fill != undefined) {
			fill = tableElement.headerObjects[column].fill;
		}
		webMI.gfx.setFill(tableElement.headerRects[column], fill);
		if (tableElement.headerObjects[column].stroke != undefined) {
			stroke = tableElement.headerObjects[column].stroke;
		}
		webMI.gfx.setStroke(tableElement.headerRects[column], stroke);
	}
};
/*	********** atvise table widget END ********** */
/**
 * The AtviseDataProvider Class.
 * @class
 * @param {Object} source Object containing the source data.
 * @param {Object} configuration Object for configuration of the data provider.
*/
function AtviseDataProvider(source, configuration) {
	if (typeof source == "object") {
		this.source = source;
		this.dataArray = [];
		this.dataExtract = [];
		this.dataFiltered = [];
		this.dataFn = null;
		this.params = null;
		this.types = {
			DATA_PROVIDER_TYPE_ARRAY: "array",
			DATA_PROVIDER_TYPE_XML: "xml",
			DATA_PROVIDER_TYPE_SERVERSIDE: "serverside"
		};
		this.type = this.types.DATA_PROVIDER_TYPE_ARRAY;
		this.listeners = [];
		this.configuration = {maxResults: 100};
		this.offsetStart = 0;
		this.offsetEnd = 0;
		this.filterArray = null;
		this.filteredArrayLength = -1;
		this.sortedByColumn = 0;
		this.sortingUp = false;
		this.init_(configuration);
	}
}
/**
 * Adds an event to a data object at the specified position.
 * @param {Number} rowNr Row index of the data object.
 * @param {Number} colNr Column index of the data object.
 * @param {Object} eventObj Object with event information.
*/
AtviseDataProvider.prototype.addCellEvent = function(rowNr, colNr, eventObj) {
	// decrement user input to array index
	rowNr--;
	colNr--;
	this.addCellEvent_(rowNr, colNr, eventObj, true);
};
/**
 * Adds an event to all data objects of a column.
 * @param {Number} colNr Column index.
 * @param {Object} eventObj Event object.
 * @param {String} eventObj.name Name of the event.
 * @param {Function} eventObj.fn Function that will be called.
*/
AtviseDataProvider.prototype.addColumnEvent = function(colNr, eventObj) {
	// decrement user input to array index
	colNr--;
	if (this.dataArray != undefined && this.dataArray.length > 0) {
		for (var i=0; i<this.dataArray.length; i++) {
			this.addCellEvent_(i,colNr,eventObj,false);
		}
	}
	this.fireDataChanged_();
};
// TODO: missing documentation
AtviseDataProvider.prototype.addItem = function(dataItem, position, overwrite, update) {
	var position = (arguments[1] != undefined) ? arguments[1] : this.dataArray.length;
	var overwrite = (arguments[2] != undefined) ? arguments[2] : false;
	var update = (arguments[3] != undefined) ? arguments[3] : true;
	this.dataArray = this.arrayInsertElement_(this.dataArray, position, dataItem, overwrite);
	this.sort(this.sortedByColumn, this.sortingUp);
	if (update) {
		this.extract_(this.offsetStart, this.offsetEnd);
	}
};
/**
 * Adds an event to all data objects of a row.
 * @param {Number} rowNr Row index.
 * @param {Object} eventObj Event object.
 * @param {String} eventObj.name Name of the event.
 * @param {Function} eventObj.fn Function that will be called.
*/
AtviseDataProvider.prototype.addRowEvent = function(rowNr, eventObj) {
	// decrement user input to array index
	rowNr--;
	if (this.dataArray != undefined && this.dataArray[rowNr] != undefined) {
		for (var i=0; i<this.dataArray[rowNr].length; i++) {
			this.addCellEvent_(rowNr,i,eventObj,false);
		}
	}
	this.fireDataChanged_();
};
/**
 * Returns the current data array of the data provider.
 * @type {Array} dataArray Current data array of the data provider.
*/
AtviseDataProvider.prototype.data = function() {
//	changed with [AT-D-1348] Spaltensortierung geht bei Scrolling verloren on 2011_04_22
//	return this.dataArray;
	return this.sort(this.sortedByColumn, this.sortingUp);
};
/**
 * Returns a data column of the current data array.
 * @param {Number} colNr Column index.
 * @param {Number} [rowOffsetStart] Row offset start.
 * @param {Number} [rowOffsetEnd] Row offset end.
 * @type {Array} dataColumn
*/
AtviseDataProvider.prototype.dataColumn = function(colNr, rowOffsetStart, rowOffsetEnd) {
	// decrement user input to array index
	colNr--;
	rowOffsetStart = (rowOffsetStart==undefined) ? 0 : rowOffsetStart-1;
	rowOffsetEnd = (rowOffsetEnd==undefined) ? this.dataArray.length : rowOffsetEnd-1;
	var dataExtract = [];
	if (this.dataArray != undefined) {
		for (var i=rowOffsetStart; i<rowOffsetEnd; i++) {
			if (this.dataArray[i] != undefined && this.dataArray[i][colNr] != undefined) {
				dataExtract.push(this.dataArray[i][colNr]);
			}
		}
	}
	return dataExtract;
};
/**
 * Returns a data object of the current data array.
 * @param {Number} rowNr Row index.
 * @param {Number} colNr Column index.
 * @type {Object} dataObject
*/
AtviseDataProvider.prototype.dataObject = function(rowNr, colNr) {
	var dataObject = null;
	// decrement user input to array index
	rowNr--;
	colNr--;
	var dataRow = rowNr + this.offsetStart;
	if (this.dataArray != undefined && this.dataArray[dataRow] != undefined && this.dataArray[dataRow][colNr] != undefined) {
		dataObject = this.dataArray[dataRow][colNr];
	}
	return dataObject;
};
/**
 * Returns a data row of the current data array.
 * @param {Number} rowNr Row index.
 * @param {Number} [colOffsetStart] Column offset start.
 * @param {Number} [colOffsetEnd] Column offset end.
 * @type {Array} dataRow
*/
AtviseDataProvider.prototype.dataRow = function(rowNr, colOffsetStart, colOffsetEnd) {
	// decrement user input to array index
	rowNr--;
	colOffsetStart = (colOffsetStart == undefined) ? 0 : colOffsetStart-1;
	var dataCols = (this.dataArray[0] != undefined) ? this.dataArray[0].length : 0;
	colOffsetEnd = (colOffsetEnd == undefined) ? dataCols : colOffsetEnd-1;
	var dataExtract = [];
	if (this.dataArray != undefined) {
		if (this.dataArray[rowNr] != undefined) {
			for (var i=colOffsetStart; i<colOffsetEnd; i++) {
				if (this.dataArray[rowNr][i] != undefined) {
					dataExtract.push(this.dataArray[rowNr][i]);
				}
			}
		}
	}
	return dataExtract;
};
// TODO: missing documentation
AtviseDataProvider.prototype.extract = function(offsetStart, offsetEnd) {
	this.dataExtract = [];
	// decrease input to array indices...
	offsetStart--;
	offsetEnd--;
	if (offsetStart > -1 && offsetStart < this.dataArray.length) {
		this.dataExtract = this.dataArray.slice(offsetStart, offsetEnd);
	}
	this.fireDataChanged_();
};
// TODO: missing documentation
AtviseDataProvider.prototype.filter = function(filterArray) {
	this.filterArray = filterArray;
	if (filterArray == null || this.filterArray.length < 1) {
		this.extract_(this.offsetStart, this.offsetEnd);
	} else {
		this.fireDataChanged_();
	}
};
// TODO: missing documentation
AtviseDataProvider.prototype.hasMore = function(nextOffsetStart, nextOffsetEnd) {
	var hasMore = false;
	if (this.type == this.types.DATA_PROVIDER_TYPE_ARRAY) {
		hasMore = ((nextOffsetStart + this.configuration.maxResults) <= this.dataArray.length);
	} else if (this.type == this.types.DATA_PROVIDER_TYPE_XML) {
		//handle xml
	} else if (this.type == this.types.DATA_PROVIDER_TYPE_SERVERSIDE) {
		var tempData = this.callDataFn_(nextOffsetStart+this.configuration.maxResults, nextOffsetEnd+this.configuration.maxResults);
		hasMore = (typeof tempData == "object" && tempData.constructor.toString().indexOf("Array") != -1);
	}
	return hasMore;
};
// TODO: missing documentation
AtviseDataProvider.prototype.lastItemIndex = function() {
	var lastItemIndex = -1;
	if (this.type == this.types.DATA_PROVIDER_TYPE_ARRAY) {
		if (this.filterArray != null) {
			var delta = (this.dataArray.length-1) - (this.filteredArrayLength-1);
			lastItemIndex = (this.dataArray.length-1) - delta;
		} else {
			lastItemIndex = (this.dataArray.length-1); // - delta;
		}
	} else if (this.type == this.types.DATA_PROVIDER_TYPE_SERVERSIDE) {
		var retValue = webMI.data.call(this.source.lastItemFn, "");
		// TODO: hier fortsetzen...
		lastItemIndex = 200; // retValue.result;
	}
	return lastItemIndex;
};
// TODO: missing documentation
AtviseDataProvider.prototype.next = function(step) {
	this.increaseOffset_(step);
	this.data_();
	this.fireDataChanged_(step);
};
// TODO: missing documentation
AtviseDataProvider.prototype.preloadNext = function(step) {
	this.increaseOffset_(step);
	this.data_();
	this.decreaseOffset_(step);
};
// TODO: missing documentation
AtviseDataProvider.prototype.previous = function(step) {
	this.decreaseOffset_(step);
	this.data_();
	this.fireDataChanged_(step);
};
// TODO: missing documentation
AtviseDataProvider.prototype.removeColumn = function(colNr) {
	colNr--;
	var i = dataArray.length;
	while(i--) {
		if (dataArray[i] != undefined && dataArray[i][colNr] != undefined) {
			dataArray[i].splice(colNr,1);
		}
	}
	this.fireDataChanged_();
};
// TODO: missing documentation
AtviseDataProvider.prototype.removeItem = function(dataItem, identifier, update) {
	if (this.dataArray.length > 0) {
		var rowNr = -1;
		var i = this.dataArray.length-1;
		while (i > -1) {
			if (this.dataArray[i] != undefined) {
				if (this.dataArray[i][identifier] != undefined && this.dataArray[i][identifier] == dataItem[identifier]) {
					rowNr = i;
					break;
				}
			}
			i--;
		}
		if (rowNr > -1) {
			this.dataArray = this.arrayRemoveElement_(this.dataArray, rowNr);
		}
	}
	if (update) {
		this.extract_(this.offsetStart, this.offsetEnd);
	}
};
// TODO: missing documentation
AtviseDataProvider.prototype.removeRow = function(rowNr, update) {
	rowNr--;
	if (this.dataArray[rowNr] != undefined) {
		this.dataArray.splice(rowNr,1);
	}
	if (update) {
		this.fireDataChanged_();
	}
};
/**
 * Sets the style of a data object of a cell.
 * @param {Number} rowNr Row index.
 * @param {Number} colNr Column index.
 * @param {Object} style Style object.
*/
AtviseDataProvider.prototype.setCellStyle = function(rowNr, colNr, style) {
	// decrement user input to array index
	rowNr--;
	colNr--;
	this.setCellStyle_(rowNr, colNr, style, true);
};
/**
 * Sets the configuration object of the data provider.
 * @param {Object} configuration Configuration object
 *
*/
AtviseDataProvider.prototype.setConfiguration = function(configuration) {
	this.setProperties_(this.configuration, configuration);
	this.sortingUp = this.configuration.sortingUp;
	this.sortedByColumn = this.configuration.sortedByColumn;
};
/**
 * Sets the style of all data objects of a column.
 * @param {Number} colNr Column index.
 * @param {Object} style Style object.
*/
AtviseDataProvider.prototype.setColumnStyle = function(colNr, style) {
	// decrement user input to array index
	colNr--;
	if (this.dataArray.length > 0) {
		for (var i=0; i<this.dataArray.length; i++) {
			this.setCellStyle_(i,colNr,style,false);
		}
	}
	this.fireDataChanged_();
};
/**
 * Sets an two-dimensional data array.
 * @param {Array} dataArray Two-dimensional dataArray.
 * @param {Boolean} [appendData] Indicates if the data shall be appended or replaced.
*/
AtviseDataProvider.prototype.setData = function(dataArray, append){
	var append = (arguments[1] != undefined && typeof arguments[1] == "boolean") ? arguments[1] : false;
	if (append && this.dataArray.length > 0) {
		for (var i=0; i<dataArray.length; ++i) {
			this.dataArray.push(dataArray[i]);
		}
		this.sort(this.sortedByColumn, this.sortingUp);
		this.fireDataChanged_();
	} else {
		this.filterArray = null;
		if ((this.dataArray.length != dataArray.length) || (((this.dataArray.length == dataArray.length) && this.filteredArrayLength > 0) && dataArray.length != this.filteredArrayLength)) {
			this.offsetStart = 0;
			this.offsetEnd = this.configuration.maxResults;
		}
		this.dataArray = dataArray;
		this.sort(this.sortedByColumn, this.sortingUp);
		if (this.offsetEnd > (this.lastItemIndex()+2)) {
			this.offsetStart = ((this.lastItemIndex()+2) - this.configuration.maxResults) > -1 ? ((this.lastItemIndex()+2) - this.configuration.maxResults) : 0;
			this.offsetEnd = (this.lastItemIndex()+2);
		} else if (this.offsetEnd < this.configuration.maxResults && (this.lastItemIndex()+2) >= this.configuration.maxResults) {
			this.offsetEnd = this.configuration.maxResults;
		} else if (this.offsetEnd < this.dataArray.length && this.dataArray.length <= this.configuration.maxResults) {
			this.offsetEnd = this.configuration.maxResults;
		}
		this.extract_(this.offsetStart, this.offsetEnd);
	}
};
/**
 * Sets a data column to the data array.
 * @param {Array} dataCol Array of data objects.
 * @param {Number} position Position (default: at the end of the array).
 * @param {Boolean} overwrite Inidicates if the data shall be overriden or not.
*/
AtviseDataProvider.prototype.setDataColumn = function(dataCol) {
	var data = this.dataArray;
	var position = data.length;
	var overwrite = false;
	if (data && data[0] && data[0].length > 0) {
		if(arguments.length>1) {
			if (typeof arguments[1] == "number") {
				position = arguments[1];
			} else {
				return;
			}
			if (typeof arguments[2] == "boolean") {
				overwrite = arguments[2];
			} else {
				return;
			}
		}
		for (var i=0; i<dataCol.length; i++) {
			data = this.arrayInsertElement_(data[position], i, dataCol[i], overwrite);
		}
		this.fireDataChanged_();
	}
};
/**
 * Sets a data object to the table data array.
 * @param {Number} rowNr Row index.
 * @param {Number} colNr Column index.
 * @param {Object} dataObject Data object.
*/
AtviseDataProvider.prototype.setDataObject = function(rowNr, colNr, dataObject) {
	// decrement user input to array index
	rowNr--;
	colNr--;
	var dataRow = this.offsetStart + rowNr;
	if (this.dataArray[dataRow] != undefined && this.dataArray[dataRow][colNr] != undefined) {
		this.dataArray[dataRow][colNr] = dataObject;
		this.fireDataChanged_();
	}
};
/**
 * Sets a data row to the data array.
 * @param {Array} dataRow Array of data objects.
 * @param {Number} position Position (default: at the end of the array).
 * @param {Boolean} overwrite Inidicates if the data shall be overriden or not.
*/
AtviseDataProvider.prototype.setDataRow = function(dataRow) {
	var data = this.dataArray;
	var position = data.length;
	var overwrite = false;
	if(arguments.length>1) {
		if (typeof arguments[1] == "number") {
			position = arguments[1];
		} else {
			return;
		}
		if (typeof arguments[2] == "boolean") {
			overwrite = arguments[2];
		} else {
			return;
		}
	}
	data = this.arrayInsertElement_(data, position, dataRow, overwrite);
	this.fireDataChanged_();
};
/**
 * Sets the style of all data objects of a row.
 * @param {Number} rowNr Row index.
 * @param {Object} style Style object.
*/
AtviseDataProvider.prototype.setRowStyle = function(rowNr, style) {
	// decrement user input to array index
	rowNr--;
	if (this.dataArray[rowNr] != undefined) {
		for (var i=0; i<this.dataArray[rowNr].length; i++) {
			this.setCellStyle_(rowNr,i,style,false);
		}
	}
	this.fireDataChanged_();
};
// TODO: missing documentation
AtviseDataProvider.prototype.sort = function(colNr, sortingUp, sortFn){
	if (this.dataArray.length > 0 && this.dataArray[0][colNr] != undefined) {
		function by(i) {
			return function(a,b) {
				a = a[i];
				b = b[i];
				var multiplicator = (!sortingUp) ? -1 : 1;
				// wenn gleich, dann andere spalte vergleichen?!
				var pos = -1;
				if (a.text == b.text) {
					pos = (a.sortId < b.sortId ? (-1)*multiplicator : 1*multiplicator);
				} else {
					pos = (a.text < b.text ? (-1)*multiplicator : 1*multiplicator);
				}
				return pos;
			};
		};
		var sortByFn = (sortFn != undefined) ? sortFn : by(colNr);
		this.dataArray.sort(sortByFn);
		this.sortedByColumn = colNr;
		this.sortingUp = sortingUp;
		this.extract_(this.offsetStart, this.offsetEnd);
	}
};
// TODO: missing documentation
AtviseDataProvider.prototype.subscribe = function(listener) {
	this.listeners.push(listener);
	listener(this.dataExtract);
};
// TODO: missing documentation
AtviseDataProvider.prototype.unsubscribe = function(listener) {
	var i=this.listeners.length-1;
	while (i > 0) {
		if (this.listeners[i] == listener) {
			this.listeners.splice(i,1);
			break;
		}
		i--;
	}
};
// TODO: missing documentation
AtviseDataProvider.prototype.updateItem = function(dataItem, identifier, update) {
	if (this.dataArray.length > 0) {
		var rowNr = -1;
		var i = this.dataArray.length-1;
		while (i > -1) {
			if (this.dataArray[i] != undefined) {
				if (this.dataArray[i][identifier] != undefined && this.dataArray[i][identifier] == dataItem[identifier]) {
					rowNr = i;
					break;
				}
			}
			i--;
		}
		if (rowNr > -1) {
			this.dataArray = this.arrayInsertElement_(this.dataArray, rowNr, dataItem, true);
		} else {
			this.dataArray.push(dataItem);
		}
		this.sort(this.sortedByColumn, this.sortingUp);
	} else {
		this.dataArray.push(dataItem);
	}
	if (update) {
		this.extract_(this.offsetStart, this.offsetEnd);
	}
};
// *************************
// PRIVATE PUBLIC BORDER
// *************************
/**
 * @private
*/
AtviseDataProvider.prototype.addCellEvent_ = function(rowNr, colNr, eventObj, update) {
	if (this.dataArray != undefined && this.dataArray[rowNr] != undefined && this.dataArray[rowNr][colNr] != undefined) {
		if (this.dataArray[rowNr][colNr].eventList == undefined) {
			this.dataArray[rowNr][colNr].eventList = [];
		}
		this.dataArray[rowNr][colNr].eventList.push(eventObj);
	}
	if (update) {
		this.fireDataChanged_();
	}
};
/**
 * @private
*/
AtviseDataProvider.prototype.arrayInsertElement_ = function(arrayInstance, position, newElement, overwrite) {
	if (arrayInstance.length > 0) {
		if (overwrite) {
			arrayInstance[position] = newElement;
		} else {
			var a = arrayInstance.slice();
			var b = a.splice(position,a.length);
			a[position] = newElement;
			arrayInstance = a.concat(b);
		}
	} else {
		arrayInstance.push(newElement);
	}
	return arrayInstance;
};
/**
 * @private
*/
AtviseDataProvider.prototype.arrayRemoveElement_ = function(arrayInstance, position) {
	if (arrayInstance.length > 0) {
		if (arrayInstance[position] != undefined) {
			arrayInstance.splice(position, 1);
		}
	}
	return arrayInstance;
};
/**
 * @private
*/
AtviseDataProvider.prototype.callDataFn_ = function(offsetStart, offsetEnd) {
	var start = (offsetStart != undefined) ? offsetStart : this.offsetStart;
	var end = (offsetEnd != undefined) ? offsetEnd : this.offsetEnd;
	var serverSideData = webMI.data.call(this.dataFn, "offsetStart="+start+"&offsetEnd="+end+this.parameterList_());
	return (serverSideData != undefined) ? serverSideData : [];
};
/**
 * @private
*/
AtviseDataProvider.prototype.data_ = function() {
	this.dataExtract = [];
	if (this.type == this.types.DATA_PROVIDER_TYPE_ARRAY) {
		if (this.offsetStart < this.dataArray.length) {
			if (this.dataArray != undefined) {
				this.sort(this.sortedByColumn, this.sortingUp);
				this.dataExtract = this.dataArray.slice(this.offsetStart, this.offsetEnd);
			}
		}
	} else if (this.type == this.types.DATA_PROVIDER_TYPE_XML) {

	} else if (this.type == this.types.DATA_PROVIDER_TYPE_SERVERSIDE) {
		if (this.offsetStart < this.dataArray.length) {
			if (this.dataArray != undefined) {
				this.sort(this.sortedByColumn, this.sortingUp);
				this.dataExtract = this.dataArray.slice(this.offsetStart, this.offsetEnd);
			}
		} else {
			this.dataExtract = this.callDataFn_();
			if (this.dataExtract != null && this.dataExtract != undefined) {
				for (var i in this.dataExtract) {
					this.dataArray.push(this.dataExtract[i]);
				}
			}
		}
	}
};
/**
 * @private
*/
AtviseDataProvider.prototype.decreaseOffset_ = function(step) {
	var step = step == undefined ? this.configuration.maxResults : step;
	if (this.offsetStart - step > -1) {
		this.offsetStart -= step;
		this.offsetEnd -= step;
	} else {
		this.offsetStart = 0;
		this.offsetEnd = this.configuration.maxResults;
	}
};
/**
 * @private
*/
AtviseDataProvider.prototype.extract_ = function(offsetStart, offsetEnd) {
	this.extract((offsetStart+1),(offsetEnd+1));
};
/**
 * @private
*/
AtviseDataProvider.prototype.filter_ = function() {
	/*
	 * the characters "\", "?" and "*" must be escaped if it is being explicitly searched by them
	 * wildcard characters are "?" for a single character and "*" for 0 or more characters
	*/
	function applyWildcards(value) {
		var value = value.replace(/[\-\[\]\/\{\}\(\)\+\.\^\$\|]/g, "\\$&")
			.replace(/([^\\])\*/g, "$1.*")
			.replace(/([^\\])\?/g, "$1.");

		if(value.charAt(0) == "*")
			value = ".*" + value.substring(1);

		if(value.charAt(0) == "?")
			value = "." + value.substring(1);

		return value;
	}

	if (this.filterArray != null && this.filterArray.length > 0) {
		var tempExtract = [];
		if (this.dataArray.length > 0) {
			var i = this.dataArray.length-1;
			while (i > -1) {
				var match = 0;
				for (var f in this.filterArray) {
					var filter = this.filterArray[f];
					if (filter.value == undefined || filter.value == "") {
						match++;
					} else {
						var j = this.dataArray[i].length-1;
						while (j > -1) {
							if (this.dataArray[i] != undefined && this.dataArray[i][j] != undefined) {
								if (this.dataArray[i][j].name != undefined && this.dataArray[i][j].text != undefined) {
									if (this.dataArray[i][j].name == filter.name) {
										try {
											switch(filter.type) {
												case "matches":
													var cellContent = this.dataArray[i][j].text.toString();
													var filter = applyWildcards(filter.value.toString());
													if(cellContent.match("^"+filter+"$") != null) {
														match++;
													}
													break;
												case "contains":
													var cellContent = this.dataArray[i][j].text.toString().toLowerCase();
													var filter = applyWildcards(filter.value.toString().toLowerCase());
													if (cellContent.search(filter) > -1) {
														match++;
													}
													break;
												case "valuecontains":
													var cellContent = ("value" in (arr_elem = this.dataArray[i][j])) ? arr_elem.value.toString().toLowerCase() : arr_elem.text.toString().toLowerCase();
													var filter = applyWildcards(filter.value.toString().toLowerCase());
													if (cellContent.search(filter) > -1) {
														match++;
													}
													break;
												case "greaterEqual":
													var cellContent = parseFloat(this.dataArray[i][j].text);
													var filter = parseFloat(filter.value);
													if (cellContent >= filter) {
														match++;
													}
													break;
												case "greaterThan":
													var cellContent = parseFloat(this.dataArray[i][j].text);
													var filter = parseFloat(filter.value);
													if (cellContent > filter) {
														match++;
													}
													break;
												case "lowerEqual":
													var cellContent = parseFloat(this.dataArray[i][j].text);
													var filter = parseFloat(filter.value);
													if (cellContent <= filter) {
														match++;
													}
													break;
												case "lowerThan":
													var cellContent = parseFloat(this.dataArray[i][j].text);
													var filter = parseFloat(filter.value);
													if (cellContent < filter) {
														match++;
													}
													break;
												case "beforeEqual":
													if (typeof this.dataArray[i][j].text == "number"){ //greaterEqual
														var cellContent = parseFloat(this.dataArray[i][j].text);
														var filter = parseFloat(filter.value);
														if (cellContent <= filter) {
															match++;
														}
													} else {
														var cellContent = this.parseDate_(this.dataArray[i][j].text,false);
														var filter = this.parseDate_(filter.value);
														if ((cellContent != null && filter != null) && cellContent.getTime() <= filter.getTime()) {
															match++;
														}
													}
													break;
												case "afterEqual":
													if (typeof this.dataArray[i][j].text == "number"){ //lowerEqual
														var cellContent = parseFloat(this.dataArray[i][j].text);
														var filter = parseFloat(filter.value);
														if (cellContent >= filter) {
															match++;
														}
													} else {
														var cellContent = this.parseDate_(this.dataArray[i][j].text,true);
														var filter = this.parseDate_(filter.value);
														if ((cellContent != null && filter != null) && cellContent.getTime() >= filter.getTime()) {
															match++;
														}
													}
													break;
												default: break;
											}
										} catch (e) { }
									}
								}
							}
							j--;
						}
					}
				}
				if (match == this.filterArray.length) {
					tempExtract.push(this.dataArray[i]);
				}
				i--;
			}
		}
		this.dataFiltered = tempExtract.reverse();

		this.filteredArrayLength = tempExtract.length;
		if (this.offsetStart >= tempExtract.length) {
			this.offsetStart = 0;
		}
		if (tempExtract.length < this.offsetEnd) {
			this.offsetStart = ((tempExtract.length+1) - this.configuration.maxResults) > 0 ? ((tempExtract.length+1) - this.configuration.maxResults) : 0;
			this.offsetEnd = tempExtract.length;
		}
		if (this.offsetEnd < tempExtract.length) {
			this.offsetEnd = this.offsetStart + this.configuration.maxResults;
		}
		this.dataExtract = tempExtract.slice(this.offsetStart, this.offsetEnd);
	}
};
/**
 * @private
*/
AtviseDataProvider.prototype.fireDataChanged_ = function() {
	this.filter_();
	for (var i in this.listeners) {
		this.listeners[i](this.dataExtract);
	}
};
/**
 * @private
*/
AtviseDataProvider.prototype.increaseOffset_ = function(step) {
	var step = step == undefined ? this.configuration.maxResults : step;
	var nextOffsetStart = (this.offsetStart + step);
	var nextOffsetEnd = (this.offsetEnd + step);
	if (this.hasMore(nextOffsetStart, nextOffsetEnd)) {
		this.offsetStart += step;
		this.offsetEnd += step;
	} else {
		this.offsetStart = parseFloat(this.lastItemIndex()+2) - this.configuration.maxResults;
		this.offsetEnd = parseFloat(this.lastItemIndex()+2);
	}
};
/**
 * @private
*/
AtviseDataProvider.prototype.init_ = function(configuration) {
	if (configuration != undefined) {
		if (configuration.maxResults != undefined) {
			this.configuration.maxResults = configuration.maxResults;
		}
		if (configuration.sortingUp != undefined) {
			this.sortingUp = configuration.sortingUp;
		}
		if (configuration.sortedByColumn != undefined) {
			this.sortedByColumn = configuration.sortedByColumn;
		}
	}
	if (this.source.data.constructor.toString().indexOf("Array") != -1) {
		this.type = this.types.DATA_PROVIDER_TYPE_ARRAY;
		this.dataArray = this.source.data;
		this.offsetEnd = this.configuration.maxResults;
		this.sort(this.sortedByColumn, this.sortingUp);
		this.extract_(this.offsetStart, this.offsetEnd);
	} else if (this.source.type == this.types.DATA_PROVIDER_TYPE_XML) {
		this.type = this.types.DATA_PROVIDER_TYPE_XML;
		// TODO: handle xml...
	} else if (typeof this.source.data == "string") {
		this.type = this.types.DATA_PROVIDER_TYPE_SERVERSIDE;
		this.dataFn = this.source.data;
		this.offsetEnd = this.configuration.maxResults;
		this.params = this.source.params;
		this.sort(this.sortedByColumn, this.sortingUp);
		this.dataExtract = this.callDataFn_();
		this.dataArray = this.dataExtract;
		this.fireDataChanged_();
	}
};
/**
 * @private
*/
AtviseDataProvider.prototype.parseDate_ = function(dateString,low) {
	var date = null;
	low = (low == undefined || low)? true : false;
	var dateTime = dateString.split(" ");
	if (dateTime.length == 2) {
		var dateArray = dateTime[0].split("-");
		var timeArray = dateTime[1].split(":");
		if (dateArray.length == 3 && timeArray.length == 3) {
			date = new Date(dateArray[0], dateArray[1]-1, dateArray[2], timeArray[0], timeArray[1], timeArray[2]);
		}
	} else {
		var dateArray = dateTime[0].split("-");
		if (dateArray.length == 3 && low) {
			date = new Date(dateArray[0], dateArray[1]-1, dateArray[2], 0, 0, 0);
		}
		if (dateArray.length == 3 && !low) {
			date = new Date(dateArray[0], dateArray[1]-1, dateArray[2], 23, 59, 59);
		}
	}
	return date;
};
/**
 * @private
*/
AtviseDataProvider.prototype.parameterList_ = function() {
	var paramList = "";
	if (this.params != null && this.params != undefined) {
		for (var i in this.params) {
			paramList += "&" + i + "=" + this.params[i];
		}
	}
	return paramList;
};
/**
 * @private
*/
AtviseDataProvider.prototype.setCellStyle_ = function(rowNr, colNr, style, update) {
	if (this.dataArray[rowNr] != undefined && this.dataArray[rowNr][colNr] != undefined) {
		for (var styleEntry in style) {
			this.dataArray[rowNr][colNr][styleEntry] = style[styleEntry];
		}
	}
	if (update) {
		this.fireDataChanged_();
	}
};
/**
 * @private
*/
AtviseDataProvider.prototype.setProperties_ = function(obj, properties) {
	var overwrite = (arguments[2])?arguments[2]:false;
	if (typeof obj == "object") {
		for (var i in properties) {
			if(!obj[i] || overwrite) {
				if (typeof obj[i] == "object") {
					this._setProperties(obj[i], properties[i], overwrite);
				} else {
					obj[i] = properties[i];
				}
			}
		}
	}
	return obj;
};

var gElement = (base.gElement == undefined) ? document.getElementById(base.id) : base.gElement;
if (gElement == null || gElement == undefined || (gElement.nodeName != "g" && gElement.nodeName != "group")) {
	return null;
} else {
	function convert(paramValue, desiredType) {
		var action = null;
		var types = { "number": 0, "boolean": 1, "string": 2 };
		var numberToBool = function(x) {
			return (x > 0);
		};
		var numberToString = function(x) {
			return "" + x;
		};
		var boolToNumber = function(x) {
			return (x == false) ? 0 : 1;
		};
		var boolToString = function(x) {
			return "" + x;
		};
		var stringToNumber = function(x) {
			return parseFloat(x);
		};
		var stringToBool = function(x) {
			return (x == "true");
		};

		var numberFns = [null, numberToBool, numberToString];
		var boolFns = [boolToNumber, null, boolToString];
		var stringFns = [stringToNumber, stringToBool, null];
		var type = typeof paramValue;
		switch(type) {
			case "number": action = numberFns[types[desiredType]]; break;
			case "boolean": action = boolFns[types[desiredType]]; break;
			case "string": action = stringFns[types[desiredType]]; break;
			default: break;
		}
		var returnVal = paramValue;
		if (action != null) {
			returnVal = action(paramValue);
		}
		return returnVal;
	}
	var aTable = new AtviseTable(gElement);
	base.rowHeight = convert(base.rowHeight, "number");
	base.sortable = convert(base.sortable, "boolean");
	base.sortingUp = convert(base.sortingUp, "boolean");
	base.sortedByColumn = convert(base.sortedByColumn, "number");
	base.scrollbarSize = convert(base.scrollbarSize, "number");
	base.drawStatusBar = convert(base.drawStatusBar, "boolean");
	base.highlightCells = convert(base.highlightCells, "boolean");
	base.selectRow = convert(base.selectRow, "boolean");
	base.selectColumn = convert(base.selectColumn, "boolean");
	base.autoResize = convert(base.autoResize, "boolean");
	base.selectFixed = convert(base.selectFixed, "boolean");
	base.height = convert(base.height, "number");
	base.width = convert(base.width, "number");
	var config = {displayHeight: base.height, displayWidth: base.width, rowHeight: base.rowHeight, sortable: base.sortable, sortingUp: base.sortingUp, sortedByColumn: base.sortedByColumn, scrollbarSize: base.scrollbarSize, drawStatusBar: base.drawStatusBar, highlightCells: base.highlightCells, selectRow: base.selectRow, selectColumn: base.selectColumn, autoResize: base.autoResize, selectFixed: base.selectFixed};
	aTable._init(config);
	return aTable;
}
},{"rowHeight":"40","sortable":"true","sortingUp":"false","sortedByColumn":"0","scrollbarSize":"30","drawStatusBar":"true","highlightCells":"true","selectRow":"true","selectColumn":"false","autoResize":"true","selectFixed":"false","height":"600","width":"1000"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.index":[function(base,webMI,window,document,self){
if (!this.currentLanguage)
	this.currentLanguage = { value: null };
if (!this.firstConnect)
	this.firstConnect = {value: true, defaultFrameName: "", defaultUrl: ""};

var currentLanguage = this.currentLanguage;
var firstConnect = this.firstConnect;
var childwindowsDiv = null;
var currentFrame = [];
var extensionsDiv = null;
var displaysJs = null;
var hasVML = document.createEventObject;
var isIOSDevice = /(iPod|iPhone|iPad)/.test(navigator.userAgent);
var iOSVersion = null;

/*
	iOS workaround for all versions >= iOS 6
	possibility to disable longpoll
	possibility to set a polling interval
	Issue-Id: [AT-D-4256]
*/

if (isIOSDevice){
	iOSVersion = (/OS (\d+)_(\d+)(_\d+)?/).exec(navigator.userAgent);
	if (iOSVersion != null && parseInt(iOSVersion[1], 10) >= 6){
		webMI.setConfig("data.enablelongpoll", false);
		webMI.setConfig("data.publishinterval", 500);
	}
}

webMI.trigger.connect("com.atvise.languages", function(e) { e.value(project.languages); });

webMI.trigger.connect("com.atvise.display_structure", function(e) {
	var loadingscreen = document.getElementById("loadingscreen");
	var excludePreloaded = (webMI.query.excludePreload == null)?[]:webMI.query.excludePreload;
	var includePreloaded = (webMI.query.includePreload == null)?[]:webMI.query.includePreload;

	if (typeof webMI.query.defaultdisplay !== "undefined") {
		for (var i = 0; i < displaysJs.menu.length; ++i) {
			if (displaysJs.menu[i].name == webMI.query.defaultdisplay)
				firstConnect.defaultUrl = webMI.display.createURL(displaysJs.menu[i].display);
		}
	} else if (typeof webMI.query.defaulturl !== "undefined") {
		firstConnect.defaultUrl = webMI.query.defaulturl;
	}

	/*firstConnect.value -> set false in first fire*/
	e.value(displaysJs, webMI.query.preload=="true", excludePreloaded, includePreloaded, loadingscreen, firstConnect);
});

var popup = null;
var popupmenulist = null;
var audio = null;
var popupvisible = "hidden";
var menuTimer = null;
var lastMenu = null;
var popups = [];
var eleStayOnTop = null;
var greatestZIndex = 0;


var extensionSizeCount = 0;

function incESC() {
	if (extensionsDiv) {
		extensionsDiv.style.height = "100%";
		extensionsDiv.style.width = "100%";
	}
	extensionSizeCount++;
}

function decESC() {
	extensionSizeCount--;
	if (extensionsDiv && !extensionSizeCount) {
		extensionsDiv.style.height = "";
		extensionsDiv.style.width = "";
	}
}
function fillCurrentFrame(names,lang){
	firstConnect = {value: true, defaultFrameName: "", defaultUrl: ""};
	var remaining = names.length;
	for (var i=0;i<names.length;i++){
		webMI.trigger.fire("getSource_" + names[i], function(e,currentDisplayWebMI){
			currentFrame[currentFrame.length] = {"name":names[i],"display":decodeURIComponent(e)};
			if (--remaining==0){
				tabHandler.renewGlobal();
				switchLanguage(lang);
			}
		});
	}
}
function checkPopupsTopParent(index){
	var isbodytop = false;
	var elem = popups[index];
	while (elem.parentNode && !isbodytop){
		isbodytop = (elem.parentNode == document.body);
		elem = elem.parentNode;
	}
	if (!isbodytop){
		popups.splice(index,1);
	}
	return isbodytop;
}

function pushPopups(curPopup,onDemand){
	//(replace and remove) or push
	var push_b = true;
	for (var x=0; x<popups.length;x++){
		if (popups[x].id == curPopup.id && popups[x].parentNode == curPopup.parentNode ){
			if (popups[x].style)
				popups[x].style.visibility = "hidden";
			if (onDemand){
				if (popups[x].parentNode)
					popups[x].parentNode.removeChild(popups[x]);
			}
			popups[x] = curPopup;
			push_b = false;
		}
	}
	push_b && popups.push(curPopup);
}

function contentDocumentOf(frame) {
	/* use contentWindow instead of contentDocument for <IE9 */
	return frame.contentWindow.document;
}

var mouseMoveFunctions = [];
var mouseUpFunctions = [];

webMI.addEvent(document, "mousemove", function(e) {
	if (!e)
		e = window.event;

	for (var i = 0; i < mouseMoveFunctions.length; ++i)
		mouseMoveFunctions[i].mouseMoveFunction(e);
});

webMI.addEvent(document, "mouseup", function(e) {
	for (var i = 0; i < mouseUpFunctions.length; ++i)
		mouseUpFunctions[i].mouseUpFunction(e);
});

function openWindow(features, offsetLeft, offsetTop, clientWidth, clientHeight) {


	function addDefaults(obj, features) {
		for (var i in features)
			if (!(i in obj))
				obj[i] = features[i];
		return obj;
	}

	var styleDefaults = { fill: "#FFFFFF", headerFill: "#000000", headerFontFill: "#FFFFFF", headerFontFamily: "Varela Round", headerFontSize: 16 };

	features = addDefaults(features, {
		url: "about:blank",
		display: "",
		query: {},
		title: " ",
		height: 0,
		width: 0,
		extern: false,
		modal: false,
		modalbackground: "black",
		name: "_blank",
		position: "center",
		resizable: true,
		movable: true,
		scrollbars: true,
		menubar: false,
		status: false,
		toolbar: false,
		close_on_esc: true,
		style: styleDefaults
	});

	var ret = null;
	var h = features.height;
	var w = features.width;
	var x = typeof(features.x) == "number" ? features.x : (clientWidth - w) / 2;
	var y = typeof(features.y) == "number" ? features.y : (clientHeight - h) / 2;

	if (features.display != "")
		features.url = webMI.display.createURL(features.display);

	/*query add current language*/
	features.query.language = currentLanguage.value;

	features.url += "?";
	var cnt = 0;
	for (var i in features.query) {
		if (cnt != 0) {
			features.url += "&";
		}
		features.url += i + "=" + encodeURIComponent(features.query[i]);
		cnt++;
	}

	if (features.extern && !features.modal) {
		var href = window.location.href;

		if (href.lastIndexOf("?") != -1)
			href = href.substr(0, href.lastIndexOf("?"));

		if (features.url.indexOf("about:blank") != 0)
			features.url = href + "?defaulturl=" + encodeURIComponent(features.url)+"&language="+currentLanguage.value+"&useSVGKeyboard="+webMI.query["useSVGKeyboard"];
		else
			features.url = "";

		x += offsetLeft;
		y += offsetTop;

		if (features.modal && window.showModalDialog) {
			var args = "dialogHeight:"+h+"px;dialogWidth:"+w+"px";

			if (features.position != "default")
				args += ";dialogTop:"+y+"px;dialogLeft:"+x+"px";

			var ids = {"resizable":"resizable","scrollbars":"scroll", "status":"status"};
			for (var i in ids)
				args += ";"+ids[i]+":"+(features[i] ? "yes" : "no");

			window.showModalDialog(features.url, features.name, args);
			return {};
		} else {
			var args = "height="+h+",width="+w;

			if (features.position != "default")
				args += ",top="+y+",left="+x;

			var ids = ["resizable","scrollbars","menubar","status","modal"];
			for (var i in ids)
				args += ","+ids[i]+"="+(features[ids[i]] ? "yes" : "no");

			ret = {
				openedWindow: window.open(features.url, features.name, args),

				getContentDocument: function() {
					var extPopupFrame = this.openedWindow.document.getElementById("mainframe");
					if(extPopupFrame != null)
						return contentDocumentOf(extPopupFrame);
				},

				close: function () {
					return this.openedWindow.close();
				}
			};

			webMI.addEvent(ret.openedWindow, "load", function(e) {
				var doc = ret.openedWindow.document;
				var mainframe = doc.getElementById("mainframe");
				ret.contentDocument = contentDocumentOf(mainframe);
				webMI.addEvent(mainframe, "load", function() {
					if (doc!=null && doc.location.href != "about:blank"){
						tabHandler.registerDisplay(contentDocumentOf(mainframe));
						tabHandler.beforeFirstUse(contentDocumentOf(mainframe),true);
						mainframe.contentWindow.webMI.addOnfocus(function(){
							if (mainframe.contentWindow != null)
								tabHandler.getFocused(contentDocumentOf(mainframe));
						});
						mainframe.contentWindow.webMI.addOnunload(function(){
							if (mainframe.contentWindow != null)
								tabHandler.removeDoc(contentDocumentOf(mainframe));
							webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoLogout", {"action":"removePopup","popup":ret});
						});
					}
				});
			});

			if (navigator.userAgent.indexOf("MSIE 7") != -1) {
				webMI.addEvent(ret, "load", function() {
					ret.resizeTo(w + 13, h + 31);
					ret.resizeTo(w + 12, h + 31);
				});
			}
			tabHandler.blurFocused();
			tabHandler.renew();
			webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoLogout", {"action":"pushPopup","popup":ret});
		}
	} else {
		var childWindowTopZindex = 1;

		var ret = {};
		var headerheight = 25;

		ret.backgroundDiv = document.createElement("div");
		ret.backgroundDiv.style.position = "absolute";
		ret.backgroundDiv.style.left = 0;
		ret.backgroundDiv.style.top = 0;
		if (features.modal) {
			incESC();
			ret.backgroundDiv.style.zIndex = greatestZIndex;
			ret.backgroundDiv.style.backgroundColor = features.modalbackground;
			ret.backgroundDiv.style.width = mainFrameHandler.element_.clientWidth + "px";
			ret.backgroundDiv.style.height = mainFrameHandler.element_.clientHeight + "px";
			ret.backgroundDiv.style.opacity = 0.7;
			ret.backgroundDiv.style.filter = "alpha(opacity=50)";
			if(features.extern)
				console.warn("External-modal popups are no longer supported, please refer to the documentation.");
		}
		childwindowsDiv.appendChild(ret.backgroundDiv);

		ret.main = document.createElement("div");
		ret.main.style.position = "absolute";
		ret.main.style.border = "0px solid black";
		ret.main.style.zIndex = ++greatestZIndex;
		ret.bgiframe = document.createElement("iframe");
		ret.bgiframe.frameBorder = 0;
		ret.bgiframe.style.position = "absolute";
		ret.bgiframe.style.top = "0px";
		ret.bgiframe.style.left = "0px";
		ret.bgiframe.style.width = "100%";
		ret.bgiframe.style.height = "100%";
		ret.main.appendChild(ret.bgiframe);
		ret.bgdiv = document.createElement("div");
		ret.bgdiv.style.position = "absolute";
		ret.bgdiv.style.top = "0px";
		ret.bgdiv.style.left = "0px";
		ret.bgdiv.style.width = "100%";
		ret.bgdiv.style.height = "100%";
		ret.bgdiv.style.backgroundColor = features.style.fill;
		ret.main.appendChild(ret.bgdiv);
		ret.head = document.createElement("div");
		ret.head.style.position = "absolute";
		ret.head.style.top = 0;
		ret.head.style.left = 0;
		ret.head.style.backgroundColor = features.style.headerFill;
		ret.head.style.height = headerheight+"px";
		ret.main.appendChild(ret.head);
		ret.headtxt = document.createElement("span");
		ret.headtxt.style.position = "absolute";
		ret.headtxt.style.width = "100%";
		ret.headtxt.style.fontSize = features.style.headerFontSize + "px";
		ret.headtxt.style.fontFamily = features.style.headerFontFamily;
		ret.headtxt.style.color = features.style.headerFontFill;
		ret.headtxt.style.backgroundImage = "url()";
		ret.head.appendChild(ret.headtxt);
		ret.title = document.createTextNode("");
		ret.headtxt.appendChild(ret.title);
		ret.closea = document.createElement("a");
		ret.closea.href = "javascript:;";
		ret.main.appendChild(ret.closea);
		ret.closeimg = document.createElement("img");
		ret.closeimg.src = "close.gif";
		ret.closeimg.width = 25;
		ret.closeimg.height = 25;
		ret.closeimg.style.border = "0";
		ret.closeimg.style.position = "absolute";
		ret.closeimg.style.right = "0px";
		ret.closea.appendChild(ret.closeimg);
		ret.content = document.createElement("div");
		ret.content.frameBorder = 0;
		ret.content.style.position = "absolute";
		ret.content.style.top = headerheight+"px";
		ret.content.style.left = 0;
		ret.main.appendChild(ret.content);
		ret.iframe = document.createElement("iframe");
		ret.iframe.frameBorder = 0;
		ret.iframe.style.position = "absolute";
		ret.iframe.style.top = 0;
		ret.iframe.style.left = 0;
		ret.iframe.style.width = "100%";
		ret.iframe.style.height = "100%";
		ret.content.appendChild(ret.iframe);
		ret.foreignObjectDiv = document.createElement("div");
		ret.main.appendChild(ret.foreignObjectDiv);
		childwindowsDiv.appendChild(ret.main);

		function disableDragStart(obj) {
			webMI.addEvent(obj, "dragstart", function(e) {
				if (!e)
					e = window.event;

				if (e.preventDefault)
					e.preventDefault();
			});
		};

		disableDragStart(ret.head);

		ret.resizeTo = function(w, h) {
			ret.main.style.width = w+"px";
			ret.main.style.height = h+"px";
			ret.head.style.width = w+"px";
			ret.content.style.width = w+"px";
			ret.content.style.height = (h-headerheight)+"px";
			if (ret.rs) {
				ret.rs.style.left = (w-5)+"px";
				ret.rs.style.top = (h-5)+"px";
			}
		};

		ret.moveTo = function(l, t) {
			function min(a, b) {
				return a < b ? a : b;
			}

			if (l < 0 ) l = 0;
			if (t < 0 ) t = 0;
//				l = min(l, parseInt(mainframe.style.width) - parseInt(ret.main.style.width) - 2);
//				t = min(t, parseInt(mainframe.style.height) - parseInt(ret.main.style.height) - 2);

			ret.main.style.left = l+"px";
			ret.main.style.top  = t+"px";
		};

		ret.setTitle = function(t) {
			ret.title.data = t;
		};

		ret.setURL = function(u) {
			ret.iframe.src = u;

			webMI.addEvent(ret.iframe, "load", function(e) {
				if (ret.closed)
					return;

				webMI.addEvent(contentDocumentOf(ret.iframe), ["click","keypress","touchstart"], function(e) {
					webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoLogout", {"action":"restartTimer"});
				});
				webMI.addEvent(contentDocumentOf(ret.iframe), "touchstart", function(e) {
					ret.iframe.contentWindow.webMI.display.showPopup(0, 0, null);
				});
				consistencyHandler.read();
			});
		};

		function closeInternalPopup() {
			if (!ret.closed) {
				ret.closed = true;
				if (ret.iframe.contentWindow != null)
					tabHandler.removeDoc(contentDocumentOf(ret.iframe),true);

				ret.iframe.src = "";

				if (features.modal)
					decESC();
				childwindowsDiv.removeChild(ret.backgroundDiv);
				childwindowsDiv.removeChild(ret.main);
				webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoLogout", {"action":"removePopup","popup":ret});
				consistencyHandler.pop();

				for (var i = 0; i < mouseMoveFunctions.length; ++i) {
					if (mouseMoveFunctions[i] != ret)
						continue;

					mouseMoveFunctions.splice(i, 1);
					mouseUpFunctions.splice(i, 1);
					break;
				}
			}
		}

		ret.closed = false;
		ret.close = function() {
			/*
				setTimeout is required as a workaround for iPad Issue [AT-D-3275]
				userAgent: Version/5.1 Mobile/9B176 Safari/7534.48.3
				please retest with newer version if Timeout is still required (browser bug)
			*/
			if (isIOSDevice){
				setTimeout(function() {
					closeInternalPopup();
				}, 500);
			}
			else closeInternalPopup();
		};

		ret.getFrame = function() {
			return ret.iframe;
		};

		ret.getForeignObjectContainer = function() {
			return ret.content;
		};

		ret.getContentDocument = function() {
			try {
				return contentDocumentOf(ret.iframe);
			} catch(ex) {
				return null;
			}
		};
		ret.getContentWindowWebMI = function() {
			try {
				if (ret.iframe.contentWindow.webMI){
					return ret.iframe.contentWindow.webMI;
				}
				return null;
			} catch(ex) {
				return null;
			}
		};

		function setVisibility(value) {
			if (!value){
				greatestZIndex++;
				childWindowTopZindex = greatestZIndex;
				ret.main.style.zIndex = childWindowTopZindex;
			}
			ret.content.style.visibility = value ? "" : "hidden";
		};

		if (features.movable) {
			ret.head.style.cursor = "move";

			webMI.addEvent(ret.head, "mousedown", function(e) {
				if (!e)
					e = window.event;

				if (!features.modal) {
					incESC();
					ret.backgroundDiv.style.width = "100%";
					ret.backgroundDiv.style.height = "100%";
				}

				ret.mouseHandler = { _function: ret.moveTo,
					x: parseInt(ret.main.style.left) - e.clientX,
					y: parseInt(ret.main.style.top) - e.clientY};
				setVisibility();
			});
		}

		if (features.resizable) {
			ret.rs = document.createElement("div");
			ret.rs.style.cursor = "se-resize";
			ret.rs.style.position = "absolute";
			ret.rs.style.width = "5px";
			ret.rs.style.height = "5px";
			ret.main.appendChild(ret.rs);

			disableDragStart(ret.rs);

			webMI.addEvent(ret.rs, "mousedown", function(e) {
				if (!e)
					e = window.event;

				if (!features.modal) {
					incESC();
					ret.backgroundDiv.style.width = "100%";
					ret.backgroundDiv.style.height = "100%";
				}

				ret.mouseHandler = { _function: ret.resizeTo,
					x: parseInt(ret.main.style.width) - e.clientX,
					y: parseInt(ret.main.style.height) - e.clientY};
				setVisibility();
			});
		}

		ret.mouseMoveFunction = function(e) {
			var obj = ret.mouseHandler;

			if (obj != null)
				obj._function(obj.x + e.clientX, obj.y + e.clientY);
		};
		ret.mouseUpFunction = function(e) {
			if (ret.mouseHandler) {
				setVisibility(1);
				ret.mouseHandler = null;
				if (!features.modal) {
					decESC();
					ret.backgroundDiv.style.width = 0;
					ret.backgroundDiv.style.height = 0;
				}
			}
		};

		mouseMoveFunctions.push(ret);
		mouseUpFunctions.push(ret);

		webMI.addEvent(ret.closea, "click", function() {
			webMI.display.closeWindow(ret);
		});

		webMI.addEvent(ret.iframe,"load", function(){
			var docAct, webMIAct;
			if (ret.iframe.contentWindow){
				if ((docAct = ret.getContentDocument()) != null){
					if (docAct.location.href != "about:blank"){
						tabHandler.registerDisplay(docAct);
						tabHandler.beforeFirstUse(docAct,true);
						if ((webMIAct = ret.getContentWindowWebMI()) != null){
							webMIAct.addOnfocus(function(){
								tabHandler.getFocused(docAct);
							});
							features.close_on_esc && webMIAct.keys.addCombinationListener(0,27,function(e) {
									if (tabHandler.isFocused(docAct) && tabHandler.getAcceptKeys()){
										webMI.display.closeWindow(ret);
									}
								});

						}
					}
					if (isIOSDevice && docAct.documentElement){
						// MobileSafari sometimes expands the normal size of the iframe
						// to the size of width / height svg attributes. Avoid this by
						// removing the attributes so the document will fit automatically.

						if (iOSVersion != null && parseInt(iOSVersion[1], 10) >= 8)
							return;

						docAct.documentElement.removeAttribute("width");
						docAct.documentElement.removeAttribute("height");
					}
				}
			}
		});
		ret.resizeTo(w,h);
		ret.moveTo(x + offsetLeft,y + offsetTop);
		ret.setTitle(features.title);
		ret.setURL(features.url);

		consistencyHandler.push();
		tabHandler.blurFocused();
		tabHandler.renew(features.modal);
		webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoLogout", {"action":"pushPopup","popup":ret});
	}

	return ret;
}

function switchUser(uData){
	if (webMI.display.isRoot() && "preferredlanguage" in uData && "username" in uData &&
		uData.username != "" && uData.preferredlanguage != "" && uData.preferredlanguage != currentLanguage.value) {
			/* [AT-D-5620] workaround for Firefox (all versions): call switchLanguage directly in case that default display is not loaded yet */
			if (tabHandler.getIFrameNames().length == 0)
				switchLanguage(uData.preferredlanguage);
			else
				fillCurrentFrame(tabHandler.getIFrameNames(), uData.preferredlanguage);
	}
}

function showPopup(x, y, menu) {
	var showCount = 10000;

	function getHover(color) {
		return function(e) {
			var element = (e.currentTarget != undefined) ? e.currentTarget : e.srcElement;
			element.style.backgroundColor = color;
		};
	};


	function compareMenu(lastMenu, menu) {
		var same = true;
		if (lastMenu != null) {
			for (var i in menu) {
				if (i != "style" && i != "itemsCount") {
					same = lastMenu[i] != undefined;
				}
			}
		} else {
			same = false;
		}
		return same;
	};

	var sameMenu = compareMenu(lastMenu, menu);

	if (menu != null && !sameMenu && !menu.mouseout) {
		if ("itemsCount" in menu && Number(menu.itemsCount) != 0) showCount = Number(menu.itemsCount);

		lastMenu = menu;
		popupvisible = "visible";

		var styleDefaults = { maxRows: 10, fontSize: 12, fontFamily: "Arial", fontFill: "#000000", width: 140, fill: "#FFFFFF", stroke: "#000000", strokeWidth: 2, hoverFill: "#EFEFEF", closeTime: 500, zIndex: 100, showType: "right" };
		var style = (menu.style != undefined) ? menu.style : {};
		for (var i in styleDefaults) {
			if (style[i] == undefined) {
				style[i] = styleDefaults[i];
			}
		}

		var padding = 3;
		var fontPix = Math.ceil(style.fontSize * 1.3);

		if (popupmenulist != undefined) {
			while (popupmenulist.hasChildNodes()) {
				popupmenulist.removeChild(popupmenulist.lastChild);
			}
		}
		if (popup != undefined) {
			while (popup.hasChildNodes()) {
				popup.removeChild(popup.lastChild);
			}
		}

		function closePopups() {
			if (menuTimer != null) {
				window.clearTimeout(menuTimer);
			}
			menuTimer = window.setTimeout(function() {
				for (var x in popups) {
					popups[x].style.visibility = "hidden";
				}
			}, style.closeTime);
			lastMenu = null;
		};

		function createEntry(parent, menuElement, menuAction, menuElementFn, level, listPos, onDemand) {
			var li = document.createElement("li");
			li.setAttribute("listPos",listPos);
			if (menuElement == ""){/*empty row*/
				li.innerHTML = "&nbsp;";
				parent.appendChild(li);
				return;
			}
			if (level && level < 0){/*scroller*/
				var img = document.createElement("img");
				img.src = menuElement;img.style.height = fontPix+"px";
				img.style.width ="40px";
				li.appendChild(img);li.style.textAlign = "center";

				li.setDisabled = function(){
					img.style.opacity = 0.4;
					img.style.filter = "alpha(opacity=40)";
				};
				li.setEnabled = function(){
					img.style.opacity = 1;
					img.style.filter = "alpha(opacity=100)";
				};
			} else {
//				var a = document.createElement("a");
//				var i_style = "position: absolute; width: 100%; height: 100%; border: 0; z-index: -1;";
				var a_style = "text-decoration: none; color: #000000; cursor: pointer;white-space: nowrap;";
				if (hasVML) {
					li.style.setAttribute("cssText", a_style);
				} else {
					li.setAttribute("style", a_style);
				}
//				a.appendChild(document.createTextNode(menuElement));
//				a.href = "javascript:void(0);";
				li.style.color = style.fontFill;
				li.style.lineHeight = (fontPix+padding)+"px";
//				li.appendChild(a);
				li.appendChild(document.createTextNode(menuElement));
				if (!onDemand) /*wegen onDemand and iPad onmouseover*/
					webMI.addEvent(li, "click", closePopups);
				webMI.addEvent(li, "mouseover", getHover(style.hoverFill));
				webMI.addEvent(li, "mouseout", getHover(style.fill));
			}
			parent.appendChild(li);
			for (var i = 0; i < menuAction.length; ++i) {
				webMI.addEvent(li, menuAction[i], menuElementFn[i]);
			}
		};
		function closeAndOpenPopup(parent,level,i,listPos){
			for (var p in popups) {
				var parts = popups[p].id.split("_");
				if (parts[1] != undefined) {
					var lev = parseFloat(parts[1]);
					if (i && popups[p].id == "popup_"+level+"_"+i && popups[p].parentNode == parent){
						popups[p].style.visibility = "visible";
						listPos && popups[p].topCorrection(listPos);
					}
					else if (lev >= level) {
						popups[p].style.visibility = "hidden";
					}
				}
			}
		};
		var level = 1;
		function createMenu(menu, parent, offset, name, level, onDemand) {
			var onD = onDemand || false;
			var curPopup = (parent) ? document.createElement("DIV") : popup;
			var p_style = "position: absolute; visibility: hidden; width: 160px; background-color: #FFFFFF; border: 2px solid #000; padding: 0; margin: 0";
			var curMenulist = (parent) ? document.createElement("UL") : popupmenulist;
			var pm_style = "list-style: none; margin: 0; padding: 3px; margin-left: 5px";

			if (hasVML) {
				curPopup.style.setAttribute("cssText", p_style);
				curMenulist.style.setAttribute("cssText", pm_style);
			} else {
				curPopup.setAttribute("style", p_style);
				curMenulist.setAttribute("style", pm_style);
			}

			var entries = 0;
			var showMenu = 0;

			function showNext(list,step){
				function deltaPos(e){return (e>=0)?1:0;}
				function appendOrRemoveSpacer(showMenu,entries,append){
					var nB;
					if (showMenu <= entries) return;
					list.removeChild(nB = list.lastChild);
					if (append)
						for (var i=0;i<showMenu-entries;i++) createEntry(list,"");
					else
						for (var i=0;i<showMenu-entries;i++) list.removeChild(list.lastChild);
					list.appendChild(nB);
				}
				return function(e) {
					var dP;
					if ((dP=deltaPos(step))==1 && showMenu >= entries || dP==0 && showMenu <= showCount) return;
					if (showMenu > 0) list.firstChild.setEnabled();
					if (showMenu >= entries) list.lastChild.setEnabled();
					appendOrRemoveSpacer(showMenu,entries,false);
					if (dP==1) showMenu += step;
					var lb,corr=((lb = showMenu-showCount+(deltaPos(-step)*step))<0)?Math.abs(lb):0;
					for (var i=1;i<list.childNodes.length-1;i++){
						list.childNodes[i].style.display = ((i-1)>=(lb+corr) && (i-1)<lb+showCount+corr)?"block":"none";
						list.childNodes[i].setAttribute("listPos",i-lb+corr+1);
					}
					if (dP==0) showMenu += step;
					appendOrRemoveSpacer(showMenu,entries,true);
					if (showMenu >= entries) list.lastChild.setDisabled();
					if (showMenu <= showCount) list.firstChild.setDisabled();
				};
			};

			createEntry(curMenulist, "/prev.png",["click"],[showNext(curMenulist,-showCount)],-1);
			for (var i in menu) {
				if (i == "tooltip") {
					var li = document.createElement("li");
					li.style.whiteSpace = "nowrap";
					li.innerHTML = menu.text;
					//li.appendChild(document.createTextNode(menu.text));
					curMenulist.appendChild(li);
					entries++;
					break;
				} else if (i == "languagemenu") {
					function getFn(id) {
						return function() {
							fillCurrentFrame(tabHandler.getIFrameNames(),id);
						};
					};
					for (var id in project.languages) {
						createEntry(curMenulist, project.languages[id], ["click"], [getFn(id)], level, entries+1);
						entries++;
					}
					break;
				} else if (i != "style" && i != "itemsCount") {
					if (menu[i].sub == undefined) {
						function getChangeFn(i, level) {
							return function(e) { closeAndOpenPopup(curPopup,level+1); };
						};
						createEntry(curMenulist, menu[i].text, ["mouseover","click"], [getChangeFn(i,level),menu[i].value], level, entries+1);
						entries++;
				} else if (typeof menu[i].sub == "function") {
						var subLevel = level + 1;
						function getOpenFn1(i,fn,startAdress,level,offset,onclick){
							var clickAdded = false;
							return function(e) {
								var li = (e.currentTarget)?e.currentTarget:e.srcElement;
								var listPos = Number(li.getAttribute("listPos")||"0");
								fn(startAdress,function(tmpObj){
									var subMenu = createMenu(tmpObj, curPopup, offset, i, level,true);
									closeAndOpenPopup(curPopup,level,i,listPos);
									/*wegen onDemand and iPad onmouseover*/
									if (!clickAdded){
										webMI.addEvent(li, "click", closePopups);
										webMI.addEvent(li, "click", onclick);
										clickAdded = true;
									}
								});
							};
						};
						createEntry(curMenulist, i + " >", ["mouseover"], [getOpenFn1(i,menu[i].sub,menu[i].base,subLevel,entries,menu[i].value)], level, entries+1, true);
						entries++;
					} else {
						var subLevel = level + 1;
						var subMenu = createMenu(menu[i].sub, curPopup, entries, i, subLevel);
						function getOpenFn2(i, level) {
							return function(e) {
								var li = (e.currentTarget)?e.currentTarget:e.srcElement;
								var listPos = Number(li.getAttribute("listPos")||"0");
								closeAndOpenPopup(curPopup,level,i,listPos);
							};
						};
						createEntry(curMenulist, i + " >", ["mouseover", "click"], [getOpenFn2(i, subLevel), menu[i].value], level, entries+1);
						entries++;
					}
				}
			}
			createEntry(curMenulist, "/next.png",["click"],[showNext(curMenulist,showCount)],-1);

			if (entries > 0) {
				var height;
				if (entries <= showCount)
					height = ((fontPix+padding) * entries) + 6;
				else
					height = ((fontPix+padding) * (showCount+2)) + 6;
				curPopup.id = "popup_" + level + "_" + name;
				curPopup.appendChild(curMenulist);
				var top = 0;
				var left = 0;
				var innerWidth = webMI.display.isRoot() ? parseFloat(mainFrameHandler.width_) : parseFloat(window.innerWidth);
				var startLeft = 0;
				if (webMI.display.isRoot()) {
					startLeft = ((x + mainFrameHandler.offsetLeft()+style.width) >= innerWidth) ?  innerWidth - (style.width+50) : x + mainFrameHandler.offsetLeft();
				} else {
					//alert(x + " " + style.width + " " + innerWidth);
					startLeft = x + style.width >= innerWidth ? innerWidth - (style.width+50) : x;
				}
				if (parent) {
					top = (fontPix+padding) * (offset);
					/*no window scrolling horizontally*/
					var dir = 1;
					if (style.showType == "right") {
						for (var lev = 0; lev < level; lev++) {
							startLeft += (style.width * dir);
							if (startLeft > mainFrameHandler.width_ - 10) {
								dir = -1;
								startLeft -= 2 * style.width;
							}
							if (startLeft-style.width < 0) {
								dir = 1;
								startLeft += 2 * style.width;
							}
						}
					} else if (style.showType == "alternate")
						dir = (level%2 == 0) ? 1 : -1;

					left = dir*style.width;
					curPopup.style.top  = -mainFrameHandler.height_ + "px";
				} else {

					var innerHeight = webMI.display.isRoot() ? parseFloat(mainFrameHandler.height_) : parseFloat(window.innerHeight);
					if (webMI.display.isRoot()) {
						top = ((y + mainFrameHandler.offsetTop()+height) >= (innerHeight-5)) ? innerHeight - ((height)+50) : y + mainFrameHandler.offsetTop();
					} else {
						top = (y + height) >= (innerHeight-5) ? innerHeight - ((height)+50) : y;
					}
					left = startLeft;
					curPopup.style.top  = top + "px";
				}
				var onlyOnce = false;
				curPopup.topCorrection = function(listPos){
					/*if is scrollable DIV then topCorrection need once*/
					if (entries <= showCount && onlyOnce) return;
					/*mouseover && scrollable -> calculate pos*/
					top = (listPos!=0)?(fontPix+padding) * (listPos-1):top;
					/*no window scrolling  vertically part*/
					curPopup.totalOffset = (parent.totalOffset ? parent.totalOffset : parent.offsetTop) + top;
					if (curPopup.totalOffset + height > (mainFrameHandler.height_ - 10)) {
						top = top - (curPopup.totalOffset + height - mainFrameHandler.height_) - 30;
						curPopup.totalOffset = (parent.totalOffset ? parent.totalOffset : parent.offsetTop) + top;
						if (curPopup.totalOffset < 0) {
							top = top - curPopup.totalOffset;
							curPopup.totalOffset = (parent.totalOffset ? parent.totalOffset : parent.offsetTop) + top;
						}
					}
					onlyOnce = true;
					curPopup.style.top  = top + "px";
				};
				curPopup.style.left = left + "px";
				if (typeof style.width == "string" && style.width=="auto"){
					curPopup.style.width = "auto";
				} else if (typeof style.width == "object" && style.width.length == 2 && style.width[0]=="auto"){
					curPopup.style.width = style.width[0];
					if (curPopup.clientWidth < style.width[1]){
						curPopup.style.width = (style.width[1]) + "px";
					}
				} else if (typeof style.width == "number"){
					curPopup.style.width = (style.width) + "px";
				}
				//curPopup.style.width = (style.width) + "px";
				curPopup.style.fontSize = style.fontSize + "pt";
				curPopup.style.fontFamily = style.fontFamily;
				curPopup.style.backgroundColor = style.fill;
				curPopup.style.border = style.strokeWidth + "px solid " + style.stroke;
				curPopup.style.visibility = (parent) ? "hidden" : "visible";
				curPopup.style.zIndex = Math.max(style.zIndex,greatestZIndex);
				if (parent) {
					parent.appendChild(curPopup);
				}
				pushPopups(curPopup,onD);
				webMI.addEvent(curPopup, "mouseout", closePopups);
				webMI.addEvent(curPopup, "mouseover", function(e) {
					if (menuTimer != null) {
						window.clearTimeout(menuTimer);
					}
				});
				if (curPopup.style.width == "auto"){
					var corLeft;
					if (webMI.display.isRoot()) {
						corLeft = ((x + mainFrameHandler.offsetLeft()+curPopup.offsetWidth) >= innerWidth) ?  innerWidth - (curPopup.offsetWidth+50) : x + mainFrameHandler.offsetLeft();
					} else {
						corLeft = x + curPopup.offsetWidth >= innerWidth ? innerWidth - (curPopup.offsetWidth+50) : x;
					}
					curPopup.style.left = corLeft + "px";
				}
				/*First use Scroller*/
				if (entries <= showCount){
					curMenulist.removeChild(curMenulist.firstChild);
					curMenulist.removeChild(curMenulist.lastChild);
				}
				else {
					showNext(curMenulist,showCount).call();
				}
			} else {
				popupvisible = "hidden";
			}
			return curPopup;
		};
		createMenu(menu, null, null, "main", 1);
		for (var p=popups.length; p>0;p--){
			checkPopupsTopParent(p-1);
		}
	} else if (menu == null || sameMenu || !menu.mouseout) {
		popupvisible = "hidden";
		lastMenu = null;
	}

	popup.style.visibility = popupvisible;

}
function setSoundHandler(){
	loopTimeout = {};
	if (audio != undefined) {
		while (audio.hasChildNodes()) {
			audio.removeChild(audio.lastChild);
		}
	}

	function iterArray(arr,fn){
		for (var i=0; i<arr.length; i++) fn(arr[i],i);
	};
	function iterObject(arr,fn){
		for (var obj in arr) fn(arr[obj],obj);
	};
	function createElementWithAttrs(nodeName,attrs){
		var elem = webMI.dom.createElement("http://www.w3.org/1999/xhtml", nodeName);
		iterObject(attrs,function(val,key){
			elem.setAttribute(key,val);
		});
		return elem;
	};
	function play(myAudio,playcount,loop,URL){
		if (loop == 0 || playcount < loop){
			if(!myAudio.ended){
				loopTimeout[URL||myAudio.src] = window.setTimeout(function(){play(myAudio,playcount,loop)},1500);
			}
			else {
				myAudio.play();
				loopTimeout[URL||myAudio.src] = window.setTimeout(function(){play(myAudio,playcount+1,loop)},500);
			}
		}
	};
	function stop(myAudio,URL){
		myAudio.pause();
		clearTimeout(loopTimeout[URL||myAudio.src]);
	};
	audio.appendObject = function(src,loop){
		var object = null;
		if (/MSIE/.test(navigator.userAgent)){
			object = createElementWithAttrs("object",{'width':'0','height':'0','classid':"clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6"});
			audio.appendChild(object);
			object.URL=src;
			if (loop == 0){
				var intervalId = setInterval(function(){object.controls.play();},1000);
				object.setAttribute('intervalId',intervalId,0);
			}
			else {
				object.settings.playCount = loop;
				object.controls.play();
			}
		} else if (/iPad/.test(navigator.userAgent)) {
		} else {
			var audioTagSupport = !!(document.createElement('audio').canPlayType);
			if (audioTagSupport){
				var myAudio = createElementWithAttrs("audio",{'style':'display:none',controls:"true",autoplay:"true"});
				var canPlayWav = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/wav; codecs="1"');
			}
			if (audioTagSupport && canPlayWav && src.indexOf(".wav") != -1){
				myAudio.src = src;
				audio.appendChild(myAudio);
				play(myAudio,1,loop);
			}
			else {
				object = createElementWithAttrs("object",{'width':'0','height':'0','type':"audio/x-wav",'data':src});
				object.appendChild(createElementWithAttrs("param",{'name':'src','value':src}));
				if (loop == 0)
					object.appendChild(createElementWithAttrs("param",{'name':'loop','value':'true','valuetype':'data'}));
				else
					object.appendChild(createElementWithAttrs("param",{'name':'playcount','value':loop}));
				audio.appendChild(object);
			}
		}
	};
	audio.appendEmbed = function(src,loop){
		var embed = null;
		if (loop == 0){
			embed = createElementWithAttrs("embed",{'src':src,'hidden':'true','loop':'true'});
		}
		else {
			embed = createElementWithAttrs("embed",{'src':src,'hidden':'true','playcount':loop});
		}
		audio.appendChild(embed);
		return embed;
	};
	audio.removeAudio = function(url){
		if (url == "undefined") {
			iterArray(audio.childNodes,function(child){
				if (/MSIE/.test(navigator.userAgent))
					clearInterval(child.getAttribute("intervalId"));
				if (child.nodeName.toLowerCase() == "audio")
					stop(child);
				audio.removeChild(child);
			});
			iterObject(loopTimeout,function(obj){clearTimeout(obj);})
		}
		else {
			var obs = [];
			iterArray(audio.childNodes,function(child){
				if (child.nodeName.toLowerCase() == "object") {
					if (/MSIE/.test(navigator.userAgent)){
						if (RegExp(url+"$").test(child.URL)){
							obs[obs.length] = child;
						}
					}
					iterArray(child.childNodes,function(subchild){
						if ( subchild.nodeName.toLowerCase() == "param" && subchild.getAttribute("value") == url ){
							obs[obs.length] = child;
						}
					});
				}
				if ((child.nodeName.toLowerCase()=="embed" && child.getAttribute("src") == url )||
					(child.nodeName.toLowerCase()=="audio" && RegExp(url+"$").test(child.src) ) ){
					obs[obs.length] = child;
				}
			});
			if (obs.length > 0){
				iterArray(obs,function(ob){
					if (/MSIE/.test(navigator.userAgent))
						window.clearInterval(ob.getAttribute("intervalId"));
					if (ob.nodeName.toLowerCase() == "audio")
						stop(ob);
					audio.removeChild(ob);
				});
			}
		}
	};
	webMI.sound.setHandler(audio.appendObject,audio.removeAudio);
}

webMI.addEvent(webMI.data, "clientvariableschange", function(e) {
	switchUser(e);
});

//initialize quick dynamics
var consistencyHandler = webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Consistency Handler");
var tabHandler = webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Tab Handler");
webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Configuration", {"action":"init", "indexParameters":webMI.query});

return function(type, v1, v2, v3, v4, v5) {
	if (!extensionsDiv) {
		extensionsDiv = document.getElementById("extensions");

		if (extensionsDiv) {
			childwindowsDiv = extensionsDiv.appendChild(document.createElement("div"));
			childwindowsDiv.style.left = 0;
			childwindowsDiv.style.position = "absolute";
			childwindowsDiv.style.top = 0;
			childwindowsDiv.style.width = "100%";
			childwindowsDiv.style.height = "100%";

			popup = extensionsDiv.appendChild(document.createElement("div"));
			popupmenulist = popup.appendChild(document.createElement("ul"));
			audio = extensionsDiv.appendChild(document.createElement("div"));
			setSoundHandler();
		}
	}

	if (type == "addedforeignobject" && "scrolling" in webMI.query) {
		var children = v1.children;

		for (var i = 0; i < children.length; ++i) {
			var child = children[i];
			var nodeName = child.nodeName;

			if (nodeName.toLowerCase() == "iframe")
				child.scrolling = webMI.query["scrolling"];
		}
	}
	if (type == "openwindow")
		return openWindow(v1, v2, v3, v4, v5);
	if (type == "showpopup")
		return showPopup(v1, v2, v3);
	if (type == "loadeddisplaysjs")
		displaysJs = v1;
	if (type == "loadedmainframe"){
		if (webMI.display.isRoot()) {
			webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Alarmmanagement", {"id": ""});
			webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoReconnect", {"activated":"true", "interval":"5", "defaultconfiguration": true});
		}
		webMI.addEvent(contentDocumentOf(v1), ["click","keypress","touchstart"], function(e) {
			webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoLogout", {"action":"restartTimer"});
		});
		webMI.addEvent(contentDocumentOf(v1), "touchstart", function(e) {
			v1.contentWindow.webMI.display.showPopup(0, 0, null);
		});

		if("scrolling" in webMI.query)
			v1.scrolling = webMI.query["scrolling"];

		if (typeof v1.contentWindow.webMI == "undefined"){
			webMI.query.preload = false;
		}
		if (currentFrame.length > 0){
			for (var i=0;i<currentFrame.length;i++){
				/** open display only if current farme is not equal with the frame before switch language occured */
				webMI.trigger.fire("getSource_" + currentFrame[i].name, function(e) {
					if(currentFrame[i].display.replace(displaysJs["postfix"],"") != e) {
						webMI.display.openDisplay(
							currentFrame[i].display.replace(displaysJs["postfix"],""),
							webMI.query,
							currentFrame[i].name
						);
					}
				});
			}
		}
	}
	else if (type == "switchedlanguage") {
		currentLanguage.value = v1;
	}
};
},{}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.Tree":[function(base,webMI,window,document,self){
/*

Tree Quickdynamic
builds a tree navigation based on an object or the project object structure

Parameters:
	- prototype item		The id of a prototype display that will be repeated for every tree item.
						To display data in an item, set the text of a <text>-item to the key 
							of the source object you want to display, leaded and followed by a Dollar-Sign.
							e.g.: <text>${ObjectKeyToDisplay}$</text> (Resulting XML)
							NOTE: Currently only text nodes inside the prototype item root are supported
						NOTE: The prototype item must be grouped (wrapped in a SVG <g> node)
	- indent			If an item is expanded, it's subitems are displayed. They are inset by a width defined here.
	- root node			The node the tree should be built of if mode is 'ObjectStructure'.
	- include root node	Set to true if the root node shall be part of the tree.
	- source object		The object that should be displayed if mode is 'Source Object'
	- delegate			The tree's delegate (optional). A tree delegate is given as a plain object, implementing any 
							of these delegate methods:
								- bind: {
									{DataKeyThatShouldBeBound}: function(sourceItem, value) {
										// Manual update after 'DataKeyThatShouldBeBound' has changed
									}
										OR
									{DataKeyThatShouldBeBound}: {
										node: {AnyNodeId},
										property: {AnyDomElementProperty}
									}
										OR
									{DatakeyThatShouldBeBound}: [{ArrayOfPreviousAttempts}]
								  }
								- init: function(sourceItem) {
									// Use this method to inialize your items. 
									// It is called just after an item is added to the source tree
								  }
								- itemIsSelectable: function(sourceItem) {
									// Return true if 'sourceItem' should be selectable
								  }
								- itemSelected: function(sourceItem) {
									// Callback after an (selectable) item has been selected
								  }
	- node types		A comma-separated list of Types that should be displayed if the tree was built from an object structure.

	UsageExample (Displaying an Object Structure):

	webMI.callExtension('SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.Tree', {
		id: 'id_2',								// The ID of the tree's clipping parent element
		prototypeItem: 'id_10'					// The ID of the element, that should be repeated for each item. (A <g> element containing <text>s, <rect>s, ...)
		indent: 10,								// Each new level will be indented by 10
		rootNode: 'AGENT.OBJECTS.Global',		// The object node from which the tree will start
		includeRootNode: true,					// Display the root node as first level, not it's child items (defaults to false)
		delegate: {								// The Tree's delegate
			bind: {
												// Bind the Object's 'Name' property to the textValue of an element with the id 'nameLabel'
				Name: function(sourceItem, value) {
					sourceItem.view.subview('nameLabel').textContent = value
				},
												// Another Way to do the above
				Name: {
					node: 'nameLabel',
					property: 'textContent'
				}
												// Wrap the above methods in an array if you want to establish multiple bindings on the same key once
				Name: [
					{ node: 'nameLabel', property: 'textContent' },
					{ node: 'nameLabel2', property: 'textContent' }
				]
			},
												// use of the itemSelected delegate method
			itemSelected: function(sourceItem) {
				console.log('An item has been selected: ', sourceItem);
			}
		}
	});


	Usage Example (Displaying a raw Source Object):

	webMI.callExtension('SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.Tree', {
		id: 'id_2',								// see above
		prototypeItem: 'id_10',					// see above
		indent: 10,								// see above
		source: [								// The object from which the tree will be built
			{
				name: 'Name of the Root item',
				childs: [						// set an items subitems
					{
						name: 'Name of the first subitem',
						childs: [ ... ]
					},
					...
				]
			}
		]
	});

Events:
	- com.bachmann.treeexpanditem(SourceItem)	Trigger to expand an item
	- com.bachmann.treeselectitem(SourceItem)	Trigger to select an item

Markup:
	Some element ids are reserved for specific use in the prototype item's markup:
	- expandClickarea							onclick, the represted item's expansion state will be toggled
	- expandedIndicator							this element will be hidden as long as it's represented item is not expanded
	- collapsedIndicator						this element will be visible as long as it's represented item is not expanded
	- selectedIndicator							this element will only be visible for selected items

*/

var containerBox,
	itemContainer,
	prototypeItem,
	prototypeBox,
	indent = base.indent,
	source,
	delegate = base.delegate;

// Delegate Helper
function delegateExists() {
	return delegate && delegate !== '';
};

// Constants
var kTextPlaceholderRegex = /\$([A-Z]*)\$/i,
	kScrollbarWidth = 10,
	kScrollbarColor = '#647A8F'// TODO: Implement theme support, e.g. with ControlTintColor-key (#E3D700 by default),
	kScrollbarSpaceHorizontal = 2,
	kScrollbarSpaceVertical = 3,
	kMinScrollbarHeight = 100;

function addItems(items, position, level, parentId, parent) {
	for (var i = 0; i < items.length; i++) {
		var sourceItem = items[i]

		// set initial expansion state
		sourceItem.expanded = false;
		sourceItem.selected = false;
		sourceItem.parent = parent;
		sourceItem.isLeaf = function() { return !this.childs || this.childs.length === 0 };
		sourceItem.level = level;
		
		// create view
		var view = prototypeItem.cloneNode(true);

		view.subview = function(id) {
			return this.getElementById(base.prototypeItem + '_' + id);
		}
		
		var ind = level * indent;
		view.setAttribute('width', (prototypeBox.width - ind));
		sourceItem.height = ((prototypeBox.width - ind) / prototypeBox.width) * prototypeBox.height;
		view.setAttribute('viewBox', '0 0 ' + prototypeBox.width + ' ' + prototypeBox.height);
		
		var id = parentId + '_' + i;
		view.setAttribute('id', id);
		sourceItem.view = view;
		sourceItem.id = id;

		var keys = [],
			subscribeNodes = [];
			

		function addBindingsKey(key) {
			keys.push(key);
			subscribeNodes.push(sourceItem._id + '.' + key);
		}

		// Delegate bindings
		if (delegateExists()) if (delegate.bind) for (var key in delegate.bind) addBindingsKey(key);

		// Find dynamic text placeholders
		// FIXME: Only root child items are processed.
		for (var j = 0; j < view.childNodes.length; j++) {
			var node = view.childNodes[j];
			if (node.nodeType == 1) {
				var result = kTextPlaceholderRegex.exec(node.textContent);
				
				if (result) {
					var key = result[1];

					if (sourceItem[key.toLowerCase()]) node.textContent = sourceItem[key.toLowerCase()]; // Static content
					else { // dynamic content -> add to bindings
						if (base.rootNode) {
							addBindingsKey(key);
							if (!delegate) delegate = { bind: {} };
							if (!delegate.bind) delegate.bind = {};
							if (!delegate.bind[key]) delegate.bind[key] = [];
							else if (!delegate.bind[key].push) delegate.bind[key] = [delegate.bind[key]];
						
							delegate.bind[key].push({
								node: node.id,
								property: 'textContent'
							});
						}
						else {
							console.warn('Could not get value for bound key "' + key + '"');
						}
					}
				}
			}
		}

		function _bindingCallback(singleBinding) {
			if (singleBinding.node && singleBinding.property) {
				return function(sourceItem, value) {
					(sourceItem.view.getElementById(singleBinding.node) || sourceItem.view.subview(singleBinding.node))[singleBinding.property] = value;
				}
			}
			else return singleBinding;
		}

		function bindingCallback(binding) {
			if (binding[0]) { // array of callbacks
				var callbacks = [];
				for (var i = 0; i < binding.length; i++) callbacks.push(_bindingCallback(binding[i]));
				return function(sourceItem, value) {
					for (var j = 0; j < callbacks.length; j++) {
						callbacks[j](sourceItem, value);
					}
				}
			}
			else return _bindingCallback(binding);
		}

		// Establish Bindings
		webMI.data.subscribeBlock(subscribeNodes, [], (function(sourceItem) {
			return function(e) {
				// TODO: Store binding callback in source item for better performance
				for (var i = 0; i < subscribeNodes.length; i++) {
					var key = subscribeNodes[i];
					bindingCallback(delegate.bind[keys[i]])(sourceItem, e[i].value);
				}
			}
		})(sourceItem));

		// add view
		itemContainer.appendChild(view);

		// add child items
		if (sourceItem.childs) {
			addItems(sourceItem.childs, position, (level + 1), id, sourceItem);
			view.subview('expandClickarea').onclick = (function() { 
				var item = sourceItem;
				
				return function(e) {
					webMI.trigger.fire('com.bachmann.treeexpanditem', item);
					e.stopPropagation();
				}
			})();
		}
		else view.removeChild(view.getElementById(base.prototypeItem + '_expandClickarea'));

		// make selectable
		view.onclick = (function() {
			var item = sourceItem;
			
			return function(e) {
				webMI.trigger.fire('com.bachmann.treeselectitem', item);
			}
		})();

		// call delegate init method
		if (delegateExists()) if (delegate.init) delegate.init(sourceItem);
	}
}

function _updateDisplay(items, position, level) {
	for (var i = 0; i < items.length; i++) {
		//if (!items[i].view) return // Workaround to prevent bug in Source Object mode

		var item = items[i],
			view = item.view,
			shown = !item.parent || item.parent.expanded,
			expandedIndicator = view.subview('expandedIndicator'),
			collapsedIndicator = view.subview('collapsedIndicator'),
			selectedIndicator = view.subview('selectedIndicator');


		view.setAttribute('y', position);
		var ind = prototypeBox.x + (level * indent);
		view.setAttribute('x', ind);
		view.setAttribute('height', (shown) ? item.height : 0);
		if (shown) position += item.height;
		
		// show / hide indicators
		if (expandedIndicator) expandedIndicator.setAttribute('display', item.isLeaf() ? 'none' : item.expanded ? 'auto' : 'none');
		if (collapsedIndicator) collapsedIndicator.setAttribute('display', item.isLeaf() ? 'none' : item.expanded ? 'none' : 'auto');

		// show / hide selected indicator
		if (selectedIndicator) selectedIndicator.setAttribute('display', item.selected ? 'auto' : 'none');

		// update child items
		if (!item.isLeaf()) position = _updateDisplay(item.childs, position, (level + 1));
	}

	return position;
}

function updateDisplay() {
	treeHeight = _updateDisplay(source, 0, 0);
	availableHeight = containerBox.height;
	if (treeHeight > availableHeight) enableScrolling();
	else disableScrolling();
}

function sourceItemAtPath(path) {
	var domain = source;
	var i;
	for (var i = 0; i < (path.length - 1); i++) {
		if (domain[i]) domain = domain[i].childs;
		else return console.error('no source item found at path ' + JSON.stringify(path));
	}

	return domain[path[i]];
}

// Expands a single item
function expandItem(item, expand, expandLater) {
	item.expanded = expand;
	item.expandLater = expandLater;

	if (item.childs) {
		for (var i = 0; i < item.childs.length; i++) {
			if (!expand) expandItem(item.childs[i], false, item.childs[i].expanded);
			else if (expand && item.childs[i].expandLater) expandItem(item.childs[i], true, false);
		}
	}
}

// Expands all items in an item path
function expandPath(path, value) {
	var p = [];
	for (var i = 0; i < path.length; i++) {
		p.push(path[i]);
		expandItem(sourceItemAtPath(p), value);
	}
}

// Selecting items
function _selectItem(domain, item) {
	for (var i = 0; i < domain.length; i++) {
		domain[i].selected = (domain[i] == item);
		if (domain[i].childs) _selectItem(domain[i].childs, item);
	}
}

function selectItem(item) {
	// call delegate if existing
	if (delegateExists() && delegate.itemIsSelectable) {
		if (!delegate.itemIsSelectable(item)) return false;
	}
	
	_selectItem(source, item);
	if (delegateExists() && delegate.itemSelected) delegate.itemSelected(item);
}

// Scrolling
var scrollingEnabled = false,
	scrollTop = 0,
	availableHeight,
	treeHeight,
	scrollbar = document.createElementNS('http://www.w3.org/2000/svg', 'rect'),
	hideScrollbarTimeout;

function maxScrollTop() {
	return (treeHeight - containerBox.height);
}

function setScrollTop(newValue) {
	newValue = newValue || 0; // prevent NaN calls on init

	scrollTop = newValue;
	itemContainer.setAttribute('transform', 'translate(0,' + -scrollTop + ')');

	if (scrollingEnabled) {
		scrollbar.setAttribute('display', 'auto');
	
		var scrollbarHeight = Math.max((containerBox.height / treeHeight) * containerBox.height, kMinScrollbarHeight),
			scrollbarPositionRelative = scrollTop / maxScrollTop(),
			scrollbarPositionAbsolute = (containerBox.height - scrollbarHeight) * scrollbarPositionRelative;

		// top / bottom space
		scrollbarHeight -= kScrollbarSpaceVertical * 2;
		scrollbarPositionAbsolute += kScrollbarSpaceVertical;
	
		scrollbar.setAttribute('height', scrollbarHeight);
		scrollbar.setAttribute('y', scrollbarPositionAbsolute);

		// auto-hide scrollbar
		clearTimeout(hideScrollbarTimeout);
		hideScrollbarTimeout = setTimeout(function() {
			scrollbar.setAttribute('display', 'none');
		}, 1000)
	}
	else scrollbar.setAttribute('display', 'none');
}

function updateScrollTop() {
	setScrollTop(Math.min(maxScrollTop(), scrollTop));
}

function scroll(e) {
	var delta = (e.wheelDelta || -e.detail);
	setScrollTop(Math.min(Math.max(0, (scrollTop - delta)), maxScrollTop()));
}

// Touchscreen support
var touchScrolling = false,
	touchStartScroll,
	touchStartY;

function touchStart(e) {
	touchScrolling = true;
	touchStartScroll = scrollTop;
	touchStartY = e.touches[0].clientY;
}

function touchMove(e) {
	if (touchScrolling) {
		e.preventDefault();

		var d = touchStartY - e.touches[0].clientY,
			to = Math.max(Math.min(maxScrollTop(), touchStartScroll + d), 0);
		
		setScrollTop(to);
	}
}

function touchEnd(e) {
	touchScrolling = false;
}

// Event Listener helper
function eventListeners(add) {
	var events = {
		mousewheel: scroll,
		DOMMouseScroll: scroll,
		touchstart: touchStart,
		touchmove: touchMove,
		touchend: touchEnd,
		touchcancel: touchEnd
	},
		action = (add ? 'add' : 'remove') + 'EventListener',
		treeNode = document.getElementById(base.id);

	for (type in events) {
		treeNode[action](type, events[type], false);
	}
}

function enableScrolling() {
	if (!scrollingEnabled) {
		scrollingEnabled = true;
	
		// register event handlers
		eventListeners(true);
	}

	// Always update scroll top
	updateScrollTop();
}

function disableScrolling() {
	if (!scrollingEnabled) return;

	scrollingEnabled = false;
	
	// reset scoll position
	setScrollTop(0);

	// unregister event handlers
	eventListeners(false);
}

// Get Items
function getItems() {
	function initialUpdate() {
		addItems(source, 0, 0, base.id + '_item', false);

		// initial display update
		updateDisplay();
	}

	if (base.source) { // SOURCE OBJECT MODE
		source = base.source;
		initialUpdate();
		return;
	} // else OBJECT STRUCTURE MODE

	var includeRoot = base.includeRootNode,
		startAddress = base.rootNode || 'AGENT.OBJECTS',
		vTypes = base.nodeTypes.split(/,\s?/);//['ObjectTypes.PROJECT.TreeNode']; // TODO: make parameter
	
	webMI.data.call("BrowseNodes", {
		startAddress: startAddress,
		includeStartAddress: includeRoot,
		vTypes: vTypes,
		mapping: [
			"_id:nodeid:splitnamespace",
			"name:browsename",
			"type:typedefinition:splitnamespace"
		]
	}, function (items) {
		var _source = [];
		function addItem(item, parent) {
			var	_childs = item.childs;
			item.childs = [];
			(parent ? parent.childs : _source).push(item);
			
			// add child items
			if (_childs) for (var childId in _childs) addItem(_childs[childId], item);
		}

		// add items
		for (var itemId in items) addItem(items[itemId]);
		
		// and set as tree source
		source = _source;

		// callback
		initialUpdate();
	});
}

// Initialize
(function() {
	// Get container box
	containerBox = document.getElementById(base.id).getBBox();
	
	// create container clippath
	var defs = document.getElementsByTagName('defs')[0],
		clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
	clipPath.setAttribute('id', base.id + '_clippath');

	var clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	clipRect.setAttribute('x', containerBox.x);
	clipRect.setAttribute('y', containerBox.y);
	clipRect.setAttribute('width', containerBox.width);
	clipRect.setAttribute('height', containerBox.height);

	clipPath.appendChild(clipRect);
	defs.appendChild(clipPath);

	// clip prototype scroll view node
	document.getElementById(base.id).setAttribute('style', 'clip-path: url(#' + base.id + '_clippath);');
	
	// Initialize scrollbar
	scrollbar.setAttribute('width', kScrollbarWidth);
	scrollbar.setAttribute('fill', kScrollbarColor);
	scrollbar.setAttribute('x', containerBox.width - kScrollbarWidth - kScrollbarSpaceHorizontal);
	scrollbar.setAttribute('id', base.id + '_scrollbar');
	scrollbar.setAttribute('rx', (kScrollbarWidth / 2)); // round corners
	
	// Get prototype item and its box
	prototypeItem = document.getElementById(base.prototypeItem);
	prototypeBox = { 
		x: parseFloat(prototypeItem.getAttribute('x')),
		y: parseFloat(prototypeItem.getAttribute('y')),
		width: parseFloat(prototypeItem.getAttribute('width')), 
		height: parseFloat(prototypeItem.getAttribute('height'))
	};
	
	// and remove it
	prototypeItem.parentNode.removeChild(prototypeItem);
	
	// create item container group
	itemContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	itemContainer.id = base.id + '_itemContainer';
	document.getElementById(base.id).appendChild(itemContainer);
	
	// add items
	getItems();
	
	// add scrollbar on top of items
	document.getElementById(base.id).appendChild(scrollbar);
	
	// register for expand events
	webMI.trigger.connect('com.bachmann.treeexpanditem', function(e) {
		expandItem(e.value, !e.value.expanded);
		updateDisplay();
	});

	// register for select events
	webMI.trigger.connect('com.bachmann.treeselectitem', function(e) {
		selectItem(e.value);
		updateDisplay();
	});
})();
},{"indent":"15","includeRootNode":"true"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Rotate":[function(base,webMI,window,document,self){
// This Quick Dynamic rotates the applied graphical element depending on the value of the defined node and the ranged defined by "startAngle" and "stopAngle", i.e. the
// range defined by "minValue" and "maxValue" will be translated to the range defined by "startAngle" and "stopAngle".
// e.g.: the defined range of the value from 0 (=minValue) to 100 (=maxValue) will be translated to 0 (=startAngle) to 360° (=stopAngle)
// Parameters:
//	nodeId:		this node triggers this Quick Dynamic
//	minValue:	lower bound of the range where the node's value should lie in
//	maxValue:	upper bound of the range where the node's value should lie in
//	startAngle:	start position for the rotation where "minValue" will be translated to
//	stopAngle:	stop position for the rotation where "maxValue" will be translated to

webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;
	webMI.gfx.setRotation(base.id, webMI.translate(value, base.minValue, base.maxValue, base.startAngle, base.stopAngle));
});
},{"nodeId":"","minValue":"0","maxValue":"100","startAngle":"0","stopAngle":"360"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Table2":[function(base,webMI,window,document,self){
var initScrollbar = false; // only to run initialisation once
var touchStartPos = 0; // keep start position when "touchmove" action is running
var addAdditionalLines = 1;
var scrollBarWidth = 8; // px

function Table(options) {

	// Options helpers
	function extend(obj1, obj2) {
		for (var key in obj2) {
			if (obj1[key] && typeof obj1[key] == 'object' && typeof obj2[key] == 'object') // Merge if needed
				obj1[key] = extend(obj1[key], obj2[key]);
			else obj1[key] = obj2[key];
		}

		return obj1;
	}

	// Default options
	var defaults = {
		style: {
			general: {
				'font-family': "Bryant Regular,Bryant Light, Bryant Bold, Open Sans"
			}
		},
		columnHeaderStyle: { // FIXME: Not applied
			fill: 'gray',
			'font-size': 12
		},
		headerHeight: 0,
		fillColorEven: '#C71C23',
		fillColorOdd: '#FF0000',
		archivColor: '#00B5E5',
		showFooter: false,
		showScrollbar: true,
		textColor: "white",
		footerHeight: 24,
		columnMinWidth: 200,
		rowHeight: 96,
		scrollbarWidth: 22
	}

	// Check required options
	if (!options.id || !(this.background = document.getElementById(options.id))) throw new Error('Table needs value for "id" option');
	if (!options.columns) throw new Error('Table requires "columns" option');

	// Merge config
	this.config = extend(defaults, options);

	// Wrap in g, get offset and size
	var strokeWidth = parseFloat(this.background.getAttribute('stroke-width')) || 0,
		strokeInset = strokeWidth / 2;
	this.x = parseFloat(this.background.getAttribute('x')) + strokeInset;
	this.y = parseFloat(this.background.getAttribute('y')) + strokeInset;
	this.width = parseFloat(this.background.getAttribute('width')) - strokeWidth;
	this.height = parseFloat(this.background.getAttribute('height')) - strokeWidth;

	var parent = this.background.parentElement;

//*****************************************************************************************************************************************
	// remove old DOM element before add new "this.element"
	var list = document.getElementById("table_group");
	if (list) {
		list.parentNode.removeChild(list);
	}

	// remove old DOM element before add new clipPath "cPath"
	var list = document.getElementById('my_' + this.config.id);
	if (list) {
		list.parentNode.removeChild(list);
	}
//*****************************************************************************************************************************************

	this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');

	// Apply styles
	for (var attr in this.config.style.general) this.element.setAttribute(attr, this.config.style.general[attr]);

	parent.appendChild(this.element);

	// Create clip path
	var cPathId = 'my_' + this.config.id,
		cPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath'),
		cPathRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

	cPathRect.setAttribute('x', this.x);
	cPathRect.setAttribute('y', this.y);
	cPathRect.setAttribute('width', this.width);
	cPathRect.setAttribute('height', this.height);

	cPath.id = cPathId;

	cPath.appendChild(cPathRect);

//*********************************************************************************************************************************
	document.querySelector("defs").appendChild(cPath);
	this.element.setAttribute('clip-path', 'url(#' + cPathId + ')');
	this.element.setAttribute('id', "table_group");

	// Prepare for layout:

	// - Create Header Background
//	this.headerBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//	this.appendChild(this.headerBackground);

	// - Create Layout Group
	this.layoutGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	this.appendChild(this.layoutGroup);

	// - Create Horizontal Clip View
	this.clipViewHorizontal = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	this.appendChild(this.clipViewHorizontal);

	// - Create Data group
	this.dataGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	this.appendToClipViewHorizontal(this.dataGroup);

	// - Create Archiv Text
	if ( this.config.data.length == 0 ) { // only if there are no data
		this.makeCellForItem(0, "", "", 0, 0, 0, "", "ARCHIV", ""); //Data in Zelle füllen

	}

	// - Create Footer & -Background
	if (this.config.showFooter) {
		this.footerBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.footerBackground.setAttribute('y', this.height - this.config.footerHeight);
		this.appendChild(this.footerBackground);

		this.footer = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		this.footer.setAttribute('y', this.height - this.config.footerHeight / 2);
		this.footer.setAttribute('x', this.width / 2);
		this.footer.setAttribute('text-anchor', 'middle');
		this.footer.setAttribute('alignment-baseline', 'central');
		this.footer.setAttribute('fill', 'white');
		this.appendChild(this.footer);

	}

	if (this.config.showScrollbar && this.config.data.length != 0) { // show Scrollbar only if there are data
		this.scrollBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.scrollBar.setAttribute('x', this.width - scrollBarWidth - 8); //387); // 8px space from right side
		this.scrollBar.setAttribute('y', 4);	//this.height - this.config.footerHeight);
		this.scrollBar.setAttribute('width', scrollBarWidth);	//3.4 //this.width);
		this.scrollBar.sizeScrollbar = this.height - 2 * 4; // subtract 4px on both sides: top, bottom
		if (this.config.showFooter)
			this.scrollBar.sizeScrollbar -= this.config.footerHeight;
		this.scrollBar.setAttribute('height', this.scrollBar.sizeScrollbar);
		this.scrollBar.setAttribute('fill', '#37393F');
//		this.scrollBar.setAttribute('fill-opacity', '0.384314');

		this.appendChild(this.scrollBar);
	}


	// Initial Layout
	this.layout();

	// Initialize data
	this.firstIndex = 0;
	this.ordering = 0;
	this.makeData();
}

Table.prototype.appendChild = function(node) {
	node.setAttribute('x', (parseFloat(node.getAttribute('x')) || 0) + this.x);
	node.setAttribute('y', (parseFloat(node.getAttribute('y')) || 0) + this.y);

	this.element.appendChild(node);
}

Table.prototype.appendToGroup = function(node, group) {
	node.setAttribute('x', (parseFloat(node.getAttribute('x')) || 0) + this.x);
	node.setAttribute('y', (parseFloat(node.getAttribute('y')) || 0) + this.y);

	group.appendChild(node);
}

Table.prototype.appendToClipViewHorizontal = function(node) {
	return this.appendToGroup(node, this.clipViewHorizontal);
}

Table.prototype.appendToLayout = function(node) {
	return this.appendToGroup(node, this.layoutGroup);
}

Table.prototype.appendToData = function(node) {
	return this.appendToGroup(node, this.dataGroup);
}

Table.prototype.layout = function() {
//	if (this._scrollsVertically) console.warn('Unimplemented: Table should scroll vertically')

	// Header background
//	this.headerBackground.setAttribute('width', this.width);
//	this.headerBackground.setAttribute('height', this.config.headerHeight);
//	this.headerBackground.setAttribute('fill', '#3f434a');

	// Footer background
	if (this.config.showFooter) {
		this.footerBackground.setAttribute('width', this.width);
		this.footerBackground.setAttribute('height', this.config.footerHeight);
		this.footerBackground.setAttribute('fill', '#3f434a');
	}

	var contentWidth = 0;

	// Get fixed width columns
	var fixedContentWidth = 0,
		fixedColumns = 0;

	for (var i = 0; i < this.config.columns.length; i++) {
		var col = this.config.columns[i];
		if (col.width) {
			fixedContentWidth += col.width;
			fixedColumns++;
		}
	}

	var _columnWidth = Math.max((this.width - fixedContentWidth) / (this.config.columns.length - fixedColumns), this.config.columnMinWidth);


	// Get available height
	this.availableHeight = (this.height - this.config.headerHeight);
	if (this.config.showFooter) {
		this.availableHeight -= this.config.footerHeight;
	}

	// Get number of rows
	this.numberOfRows = Math.floor(this.availableHeight / this.config.rowHeight) + addAdditionalLines; // show additional line at bottom!?
//	if (this.numberOfRows != Math.round(this.numberOfRows)) this.numberOfRows = Math.round(this.numberOfRows) + 1;

	// Draw rows / - backgrounds
	var top = this.config.headerHeight;
	for (var i = 0; i <= (this.numberOfRows); i++) {
		var elm = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		
		elm.setAttribute('x', 0);
		elm.setAttribute('y', top);
		elm.setAttribute('height', this.config.rowHeight);
		elm.setAttribute('width', this.width);
		if (this.data != undefined) // if data exists
			elm.setAttribute('fill', (i) % 2 ? this.config.fillColorEven : this.config.fillColorOdd); //  + this.firstIndex // add firstIndex for moving color of each column
		else
			elm.setAttribute('fill', (i) == 0 ? "#37393F" : "#2C2E33"); //  + this.firstIndex // add firstIndex for moving color of each column
//		elm.setAttribute('stroke-width', 0);
		elm.setAttribute('stroke', 'none');
	
		this.appendToLayout(elm);

		top += this.config.rowHeight;
	}

	//console.log('clipping horizontally? ', col.width > this.width);
}

Table.prototype.makeData = function() {
	var self = this;
	this.data = [];

	// If data is plain object array, add directly
	if (this.config.data[0]) {
		this.data = this.config.data;
	}
	if (this.data.length == 0) // return from function if there are no data!
		return;

	// Otherwise, subscribe to nodes
	if (this.config.data.nodes) {
		webMI.data.subscribeBlock(this.config.data.nodes, function(e) {
			for (var i = 0; i < self.config.data.nodes.length; i++) {
				e[i].address = self.config.data.nodes[i];

				if (!self.data[i]) self.data.push(e[i])
				else {
					for (var attr in e[i]) {
						self.data[i][attr] = e[i][attr];
					}
				}
			}

			self.data.reorder();
			self.fill();
		});
	}
	else if (this.config.data.log) {
		var last = {};
		webMI.data.subscribeBlock(this.config.data.log, function(e) {
			if (self.config.data.log) for (var i = 0; i < self.config.data.log.length; i++) {
				e[i].address = self.config.data.log[i];

				var updated = true;

				// Prevent multiple pushs for the same value
				if (last[i] === undefined || last[i] != e[i].value) {
					last[i] = e[i].value;
					self.data.push(e[i]);
				}
			}

			self.data.reorder();
			self.fill();
		});
	}

	this.data.didChange = function(column, value, data) {
		self.setValue(data, column, value);
		if (column = self.orderColumn) this.reorder();

		if (self.config.data.nodes) {
			var i = self.data.indexOf(data),
				address = self.config.data.nodes[i];

			webMI.data.write([address], [value]);
		}
	}

	this.orderColumn = false;
	this.orderAscending = false;

	this.data.reorder = function(column, ascending) {
		if (column === undefined && ascending === undefined) {
			column = self.orderColumn;
			ascending = self.orderAscending;
		}
		else if (ascending === undefined) {
			if (column != self.orderColumn) ascending = true
			else ascending = !self.orderAscending;
		}
		var key = column.id,
			f = ascending ? 1 : -1;

		self.orderedData = this.slice(0); // clone original array
		self.orderedData.sort(function(a, b) {
			var valA = self.getValue(a, column),
				valB = self.getValue(b, column);

			if (column.type == 'date' || column.type == 'dateTime') {
				valA = (new Date(valA));
				valB = (new Date(valB));
			}

			return (valA < valB ? -1 : valA == valB ? 0 : 1) * f;
		});

		/*for (var i = 0; i < self.config.columns.length; i++) {
			var col = self.config.columns[i],
				colHeader = col == column;
			//col.headerBackground.setAttribute('visibility', colHeader ? 'visible' : 'hidden');
			//col.indicatorAsc.setAttribute('visibility', colHeader && ascending ? 'visible' : 'hidden');
			//col.indicatorDesc.setAttribute('visibility', colHeader && !ascending ? 'visible' : 'hidden');
		}*/

		if (column != self.orderColumn) self.firstIndex = 0;
		self.orderColumn = column;
		self.orderAscending = ascending;

		self.fill();
	}

	// Initialize
	// ordering
	var ordered = false;
	for (var i = 0; i < this.config.columns.length; i++) {
		var col = this.config.columns[i];
		if (col.order) {
			this.data.reorder(col, col.order == 'asc' ? true : false);
			ordered = true;
			break;
		}
	}

	if (!ordered) this.fill();
}

Table.prototype.getValue = function(data, column) {
	var path = column.id.split('.'),
		val = data;

	while (path.length > 0) {
		val = val[path.shift()]
	}

	return val;
}

Table.prototype.setValue = function(data, column, value) {
	var path = column.id.split('.'),
		val = data;

	while (path.length > 1) {
		val = val[path.shift()]
	}

	 val[path.shift()] = value;
}

Table.prototype.fill = function() {
	// Remove old data
	while (this.dataGroup.firstChild) this.dataGroup.removeChild(this.dataGroup.firstChild);

	var top = this.config.headerHeight,
		orderedData = this.orderedData || this.data;

	for (var i = this.firstIndex; i < this.firstIndex + (this.numberOfRows) && i < orderedData.length; i++) {
		var data = orderedData[i],
			left = 0;

		var col1 = this.config.columns[0]; // get data "name" from defined column in DISPLAY
		var col2 = this.config.columns[1];
		var col3 = this.config.columns[2];
		var col4 = this.config.columns[3];
		
		this.makeCellForItem(col1, data, this.getValue(data, col1), left, top, i, this.getValue(data, col2), this.getValue(data, col3), this.getValue(data, col4)); //Data in Zelle füllen
		
		left += col1.width;

		top += this.config.rowHeight;
	}

	this.scrollsVertically(this.data.length > (this.numberOfRows-addAdditionalLines)); //set boolean expression, if there are more data than on one site fit!

	if (this.config.showScrollbar && !initScrollbar) { //resize scrollbar height on inital load. ONLY once!
		var scrollBarFactor = (this.numberOfRows-addAdditionalLines) / this.data.length; // calculate factor: (number of elements) / (total number of elements)
		this.scrollBar.setAttribute('height', this.scrollBar.height.animVal.value * scrollBarFactor);
//		console.log(scrollBarFactor,this.scrollBar.height.animVal.value);
		initScrollbar = true;
	}

	// Footer
	if (this.footer) this.footer.textContent = (this.firstIndex + 1) + ' - ' + Math.min((this.firstIndex + (this.numberOfRows-addAdditionalLines)), this.data.length) + ' / ' + this.data.length;
	
}

Table.prototype.startEditingCell = function(text, column, data, value, left, top, row) {
	var name = '_editableTable_' + row + '_' + column.id;

	// Datepicker
	if (column.type == 'date') {
		webMI.display.openWindow({
			display:"SYSTEM.LIBRARY.PROJECT.OBJECTDISPLAYS.BaseComponents.Datepicker",
			extern:false,
			height:326.5,
			menubar:false,
			modal:true,
			movable:false,
			resizable:false,
			scrollbars:false,
			status:false,
			title:'',
			toolbar:false,
			width:500,
			query: {
				value: (new Date(value)).getTime(),
				popupId: name
			}
		});

		var self = this;
		webMI.trigger.connect('com.atvise.datepicker_' + name, function(e) {
			self.data.didChange(column, e.value, data);
			self.fill();
		})

		return;
	}

	// Datetimepicker
	if (column.type == 'dateTime') {
		webMI.display.openWindow({
			display:"SYSTEM.LIBRARY.PROJECT.OBJECTDISPLAYS.BaseComponents.Datetimepicker",
			extern:false,
			height:326.5,
			menubar:false,
			modal:true,
			movable:false,
			resizable:false,
			scrollbars:false,
			status:false,
			title:'',
			toolbar:false,
			width:500,
			query: {
				value: (new Date(value)).getTime(),
				popupId: name
			}
		});

		var self = this;
		webMI.trigger.connect('com.atvise.datetimepicker_' + name, function(e) {
			self.data.didChange(column, e.value, data);
			self.fill();
		})

		return;
	}

	// Dropdown menu
	if (column.type == 'enum') {
		var options = {
			fontSize: window.getComputedStyle(text, null).getPropertyValue('font-size'),
			onEvent: 'immediately',
			x: text.getAttribute('x'),
			y: (parseFloat(text.getAttribute('y')) + this.config.rowHeight / 2),
			trigger: '_table2_enumset' + (new Date()).getTime()
		}
		for (var i = 0; i < column.options.length; i++) {
			var opt = column.options[i],
				val = opt.value === undefined ? opt : opt.value,
				key = opt.key === undefined ? val : opt.key;

			options['value' + (i + 1)] = val;
			options['key' + (i + 1)] = key; 
		}
		webMI.callExtension("SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Open Context Menu", options);

		var self = this;
		webMI.trigger.connect(options.trigger, function(e) {
			self.data.didChange(column, e.value, data);
		})

		return;
	}
	
	// Edit inline
	var box = text.getBBox(),
		style = window.getComputedStyle(text, null),
		align = style.textAnchor,
		center = align == 'middle';

	// delete existing elements
	if (this.inputForeignObject && this.inputForeignObject.parentElement) this.inputForeignObject.parentElement.removeChild(this.inputForeignObject);

	this.inputForeignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	this.inputForeignObject.setAttribute('x', center ? (-box.width * 5) + parseFloat(text.getAttribute('x')) : text.getAttribute('x'));
	this.inputForeignObject.setAttribute('y', box.y);
	this.inputForeignObject.setAttribute('width', center ? box.width * 10 : '100%');
	this.inputForeignObject.setAttribute('height', '100%');
	
	this.input = document.createElementNS('http://www.w3.org/1999/xhtml', 'input');
	this.input.style.border = 'none';
	this.input.style.margin = 0;
	this.input.style.padding = 0;
	this.input.style.color = text.getAttribute('fill');
	this.input.style.height = box.height + 'px';
	this.input.style.width = column.width;
	this.input.style.fontSize = style.getPropertyValue('font-size');
	this.input.style.textAlign = center ? 'center' : 'left';
	this.input.style.outline = 'none';
	this.input.style.backgroundColor = 'transparent';
	this.input.type = "text";
	this.input.value = text.textContent;
	
	this.inputForeignObject.appendChild(this.input);
	this.dataGroup.appendChild(this.inputForeignObject, true);
	//this.input.focus();
	this.input.select();

	text.style.visibility = 'hidden';
	
	var self = this;
	function end(e) {
		self.endEditing.apply(self, [text, column, row, data]);
	}
	this.input.addEventListener('blur', end, false); // function(e) { endEditing.apply(self, [e]); }
	this.input.addEventListener('keyup', function(e) { // prevents backspace error
		if (e.keyCode == 13 || e.keyCode == 9) end(e);
		else if (e.keyCode == 8) {
			var selection = (document.selection) ? {
				// TODO: Need IE Support
			} : { start: this.selectionStart, end: this.selectionEnd }


			var out, newSel = selection;
			if (selection.start == selection.end) { // backspace
				out = this.value.slice(0, Math.max(selection.start - 1, 0)) + this.value.slice(selection.end);
				newSel = { start: selection.start - 1, end: selection.start - 1 };
			}
			else {
				out = this.value.slice(0, Math.max(selection.start, 0)) + this.value.slice(selection.end);
				newSel = { start: selection.start, end: selection.start };
			}

			this.value = out;
			this.selectionStart = newSel.start;
			this.selectionEnd = newSel.end;
		}
	}, false);
}

Table.prototype.endEditing = function(text, column, row, data) {
	var value = this.input.value;

	this.data.didChange(column, value, data);
	this.fill();

	text.style.visibility = 'visible';
	if (this.inputForeignObject) this.dataGroup.removeChild(this.inputForeignObject);
	this.inputForeignObject = false;
}

Table.prototype.makeCellForItem = function(column, data, value, left, top, row, location, errortext, errordate) {

	if ( column == undefined || column == 0) { // init all needed values!
		column = {width : 395};
	}

//************************************************************************************************************
	var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

	text.setAttribute('x', left + 48.5);
	text.setAttribute('text-anchor', 'central');

	text.setAttribute('y', top + this.config.rowHeight / 4);
	text.setAttribute('alignment-baseline', 'central');
	text.setAttribute('fill', this.config.textColor);
	text.setAttribute('cursor', 'default');
	text.setAttribute('style', 'font-size:12px');

	text.textContent = location; //old: displayValue

	this.appendToData(text);

//************************************************************************************************************
	var text_id = document.createElementNS('http://www.w3.org/2000/svg', 'text');

	text_id.setAttribute('x', left + 10);
	text_id.setAttribute('text-anchor', 'central');

	text_id.setAttribute('y', top + this.config.rowHeight / 2);
	text_id.setAttribute('alignment-baseline', 'central');
	text_id.setAttribute('fill', this.config.textColor);
	text_id.setAttribute('cursor', 'default');
	text_id.setAttribute('style', 'font-size:16px');

	text_id.textContent = value;

	this.appendToData(text_id);

//************************************************************************************************************
	var text_error = document.createElementNS('http://www.w3.org/2000/svg', 'text');

	if (this.data != undefined) { // if data exists
		text_error.setAttribute('x', left + 48.5);
		text_error.setAttribute('fill', this.config.textColor);
		text_error.setAttribute('text-anchor', 'central');
	}
	else { // Archiv text
		text_error.setAttribute('x', left + column.width/2);
		text_error.setAttribute('fill', this.config.archivColor);
		text_error.setAttribute('text-anchor', 'middle');
	}
	text_error.setAttribute('y', top + this.config.rowHeight / 2);

	text_error.setAttribute('alignment-baseline', 'central');
	text_error.setAttribute('cursor', 'default');
	text_error.setAttribute('style', 'font-size:16px');

	text_error.textContent = errortext;

	this.appendToData(text_error);
//console.log(text_error.getComputedTextLength());

//************************************************************************************************************
	var text_date = document.createElementNS('http://www.w3.org/2000/svg', 'text');

	text_date.setAttribute('x', left + 48.5);
	text_date.setAttribute('text-anchor', 'central');

	text_date.setAttribute('y', top + this.config.rowHeight / 2 + this.config.rowHeight / 4);
	text_date.setAttribute('alignment-baseline', 'central');
	text_date.setAttribute('fill', this.config.textColor);
	text_date.setAttribute('cursor', 'default');
	text_date.setAttribute('style', 'font-size:12px');

	if (errordate != 0) {
		var date = new Date(errordate);
		text_date.textContent = webMI.sprintf('%02d', date.getDate()) + '.' + webMI.sprintf('%02d', date.getMonth() + 1) + '.' + date.getFullYear();
	}

	this.appendToData(text_date);

//************************************************************************************************************
	var text_time = document.createElementNS('http://www.w3.org/2000/svg', 'text');

	text_time.setAttribute('x', left + 200);
	text_time.setAttribute('text-anchor', 'central');

	text_time.setAttribute('y', top + this.config.rowHeight / 2 + this.config.rowHeight / 4);
	text_time.setAttribute('alignment-baseline', 'central');
	text_time.setAttribute('fill', this.config.textColor);
	text_time.setAttribute('cursor', 'default');
	text_time.setAttribute('style', 'font-size:12px');

	if (errordate != 0) {
		text_time.textContent = webMI.sprintf('%02d', date.getHours()) + ':' + webMI.sprintf('%02d', date.getMinutes()) + ':' + webMI.sprintf('%02d', date.getSeconds());
	}

	this.appendToData(text_time);

//************************************************************************************************************

	var clickHandler,
		clickarea = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		clickarea.setAttribute('x', left);
		clickarea.setAttribute('y', top);
		clickarea.setAttribute('width', column.width);
		clickarea.setAttribute('height', this.config.rowHeight);
		clickarea.setAttribute('fill', 'rgba(255,255,255,0.0)');
		clickarea.setAttribute('cursor', 'pointer');

	if (column.editable) {
		var self = this;

		clickHandler = function() {
			self.startEditingCell(text, column, data, value, left, top, row);
		};
	}
	else clickHandler = function() {
		webMI.trigger.fire('com.bachmann.tableclickrow', data);
	}

	webMI.addEvent(clickarea, "click"/*["click","touchstart"]*/, clickHandler);
	this.appendToData(clickarea);

	return text;
}

Table.prototype.scrollVertically = function(e) {
	if (this._scrollVerticallyDelta === undefined) this._scrollVerticallyDelta = 0;

	// FIREFOX workaround for not getting onwheel!!!
	if (e.deltaY != undefined || e.wheelDelta != undefined) { // mouse device
		this._scrollVerticallyDelta = (e.wheelDelta || -e.deltaY*4);
		var index = this.firstIndex - (this._scrollVerticallyDelta > 0 ? 1 : -1);
	}
	else { // touch device
//		this.height .. 100% .. this.numberOfRows
//		this._scrollVerticallyDelta .. ?
//console.log(((this.numberOfRows-addAdditionalLines)/this.height*this._scrollVerticallyDelta));

		this._scrollVerticallyDelta += e.touches[0].clientY - touchStartPos;
		//var index = this.firstIndex - Math.round(((this.numberOfRows-addAdditionalLines)/this.height*Math.round(this._scrollVerticallyDelta*100)));// > 0 ? 1 : -1;

		var index = this.firstIndex - (this._scrollVerticallyDelta > 0 ? 1 : -1)*3; // always scroll 3 columns by one move
//console.log(index,this._scrollVerticallyDelta);

		// supervision
		if (index < 0) index = 0;
		if (index > (this.data.length - (this.numberOfRows-addAdditionalLines))) index = (this.data.length - (this.numberOfRows-addAdditionalLines));
	}


	if (Math.abs(this._scrollVerticallyDelta) > 10) {
		if (index <= (this.data.length - (this.numberOfRows-addAdditionalLines)) && index >= 0) {
			this.firstIndex = index;
			this.fill();
			this.layout(); // refresh table if scrolled

			// refresh scrollBar position
			var posScroll = this.scrollBar.sizeScrollbar / (this.data.length) * index; // calculate progress of actual scrollbar!
			this.scrollBar.setAttribute('y', 4 + posScroll);  // add 4px on top
			//console.log(this._scrollVerticallyDelta, index, e.touches[0].clientY - touchStartPos);
			//console.log(index + "/" + (this.data.length - (this.numberOfRows-addAdditionalLines)), index ,this._scrollVerticallyDelta +" von " + touchStartPos);
		}
		this._scrollVerticallyDelta %= 10;
	}

	if (index <= (this.data.length - (this.numberOfRows-addAdditionalLines)) && index >= 0) e.preventDefault();
}

Table.prototype.scrollsVertically = function(scrolls) {
//var scrollBarFactor = Math.min((this.firstIndex + (this.numberOfRows-addAdditionalLines)), this.data.length) / this.data.length;
//console.log(scrollBarFactor, sizeScrollbar, scrollBarFactor * sizeScrollbar);

	if (scrolls &&!this._scrollsVertically) {
		var self = this;
		// FIREFOX workaround for not getting onwheel!!!
		this.element.addEventListener('onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll', function(e) { self.scrollVertically.apply(self, [e]) }, false);
		this.element.addEventListener('touchstart', function(e) { touchStartPos = e.touches[0].clientY;  e.preventDefault(); }, false);
		this.element.addEventListener('touchmove',  function(e) { self.scrollVertically.apply(self, [e]) }, false);
	}

	if (!scrolls && this._scrollsVertically) {
		console.warn('Need to remove event listener');
	}

	var l = false;
	if ((this._scrollsVertically !== undefined && scrolls != this._scrollsVertically) || (this._scrollsVertically === undefined && scrolls)) l = true;

//console.log(l);
	this._scrollsVertically = scrolls;
	if (l) this.layout();
}

// Init
webMI.addOnload(function() {
	new Table(base);
});
},{}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.Theme":[function(base,webMI,window,document,self){
/*

Theme API

This API provides an easy way to configure components for usage in different 
	design themes.

Usage:
	In the SVG component, apply the Theme QD.
	The elements property described by the 'action' key (e.g. fill or stroke) 
		will be overridden by the theme value for 'key'.

	If no value is given in the current theme, the 'Default' theme's value 
		will be applied. Therfore pay attention, that the 'Default' theme 
		has values for all theme keys specified.

	If the output needs to be bound to an object display's parameter, provide 
		it's key as the 'property' input param and set 'defaultValue' to its 
		default value. If the parameter's value equals the default value, it 
		will be overridden by the theme key. To provide a custom value just 
		edit the parameter.

*/

// Add Theme API to global scope if needed
// Theme config is stored in localstorage. If empty, a default theme config is provided. Could also be loaded from external file, e.g. as JSON-String
//window.theme = window.theme || (function() {
window.theme = window.theme || top.window.mainFrameHandler.element_.contentDocument.theme || (function() {
	// Helpers
	function clone(object) {
		return JSON.parse(JSON.stringify(object));
	}

	// Constants
	var kCustomThemePrefix = 'Custom ',
		kThemesStorageKey = 'themes',
		kActiveThemeStorageKey = 'theme',
		kNotificationTarget = window.theme; // top.window.mainFrameHandler.element_.contentDocument
	
	// Default theme config
	var _defaultThemes = {
		Default: {
			ControlBackgroundColor: "#647A8F",
			ControlActiveBackgroundColor: "#647A8F", // black
			ControlInactiveBackgroundColor: '#647A8F',
			ControlEditingBackgroundColor: "#000000", // black
			ControlTextColor: "#FFFFFF", // white
			ControlTintColor: "#00ABE5",
			ControlIndicatorBackgroundColor: "#FFFFFF", // white
			ControlLabelColor: "#B3B3B3",
			WindowBackgroundColor: "#585d67",
			FontFamily: "Varela Round,Open Sans"
		},
		Night: {
			ControlBackgroundColor: "#222222",
			ControlActiveBackgroundColor: "#444444",
			ControlInactiveBackgroundColor: "#141414",
			ControlEditingBackgroundColor: "#FFFFFF", // white
			ControlTextColor: "#FF0000", // red
			ControlTintColor: "#FF0000", // red
			ControlIndicatorBackgroundColor: "#222222",
			ControlLabelColor: "#888888",
			WindowBackgroundColor: "#000000", // black
			FontFamily: "Varela Round,Open Sans"
		},
		Plain: {
			ControlBackgroundColor: "#dddddd",
			ControlActiveBackgroundColor: "#dddddd",
			ControlInactiveBackgroundColor: "#eeeeee",
			ControlEditingBackgroundColor: "#ffffff",
			ControlTextColor: "#333333",
			ControlTintColor: "#3171ff",
			ControlIndicatorBackgroundColor: "#ffffff",
			ControlLabelColor: "#777777",
			WindowBackgroundColor: "#eeeeee",
			FontFamily: "Varela Round,Open Sans"
		}
	};

	// Always return a copy, not the original object
	function defaultThemes() {
		return clone(_defaultThemes);
	}

	function saveThemes(t) {
		t = t || themes;
		localStorage.setItem(kThemesStorageKey, JSON.stringify(t));
		return t;
	}

	// Notifies UI elements
	// theme defaults to active theme
	function notifySubscribers(theme) {
	//	webMI.trigger.fire('com.bachmann.themechange', theme || active);
		webMI.trigger.fire('com.bachmann.themechange', theme || active, kNotificationTarget);
	}

	var ls = localStorage.getItem(kThemesStorageKey),
		themes = ls ? JSON.parse(ls) : (function() {

		// initial save action
		var ts = defaultThemes();
		return saveThemes(ts);
	})();

	// If available, get last active theme from localStorage
	var active = localStorage.getItem(kActiveThemeStorageKey) || 'Default';

	function setTheme(theme) {
		if (!themes[theme]) console.warn('theme "' + theme + '" does not exist. Did not apply change.', 
			'In most cases this exception is raised because of caching issues -> Try clearing temporary files first');
		else {
			active = theme;
			localStorage.setItem(kActiveThemeStorageKey, active);
			notifySubscribers(theme);
		}
	}

	function getTheme(all) { return all ? themes : active; }

	var _loadedFonts = {}

	function getValue(key, inTheme) {
		// If not provided by theme, return default value
		var theme = inTheme || active,
			value = themes[theme][key] || themes.Default[key];
	
		if (value) {
			if (key == 'FontFamily') {
				var fontName = value.split(',')[0];
				if (!_loadedFonts[fontName]) {
					_loadedFonts[fontName] = true;
					webMI.callExtension("SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.FontFace", {"fontName":fontName, "fontPath":"../../fonts/"});
				}
			}
			return value;
		}
		else throw new Error('Could not get value for key "' + key + '"');

		/*return themes[theme][key] ? themes[theme][key] : themes.Default[key] ? themes.Default[key] : (function() {
			throw new Error('Could not get value for key "' + key + '"');
		})();*/
	}

	function setValue(value, key, theme) {
		theme = theme || active;

		if (!themes[theme]) throw new Error('Theme "' + theme + '" does not exist.');
		
		themes[theme][key] = value;
		
		// save changes
		localStorage.setItem(kThemesStorageKey, JSON.stringify(themes));
		
		// update bound elements
		notifySubscribers(theme);
	}

	// Resets value for 'key' in theme 'id'.
	// If not key is given, the whole theme will be reset, without an id all themes will be reset
	function resetTheme(id, key) {
		var all = themes;
	
		if (!id) {
			var dts = defaultThemes();
			for (var theme in dts) all[theme] = dts[theme];
		}
		else {
			all = themes
			if (!_defaultThemes[id]) { // theme is custom -> remove
				// make new selection (last before)
				var last = false
				for (var t in themes) {
					if (t == id) break;
					
					last = t;
				}
				last = last || 'Default';
				setTheme(last);

				// actual remove
				delete themes[id];
				
				// notify subscribers
				webMI.trigger.fire('com.bachmann.themeremove', id, kNotificationTarget);
			}

			// Reset key
			if (key) {
				if (!_defaultThemes[id][key]) throw new Error('Theme "' + id + '" does not have any value for key "' + key + '"');

				all[id][key] = defaultThemes()[id][key];
			}
			else {
				all[id] = defaultThemes()[id];
			}
		}
		
		saveThemes(all);
		notifySubscribers();
	}

	function newTheme() {
		// get new theme name
		var i = 1;
		while (themes[kCustomThemePrefix + i]) i++;
		var name = kCustomThemePrefix + i;

		// actually create
		themes[name] = clone(themes[active]);
		saveThemes();

		// and make active
		setTheme(name);

		// notify subscribers
		webMI.trigger.fire('com.bachmann.themeadd', name, kNotificationTarget);
	}

	function defaultTheme(id) {
		id = id || active;
		return _defaultThemes[id] !== undefined;
	}

	return {
		get: getTheme,
		set: setTheme,
		getValue: getValue,
		setValue: setValue,
		reset: resetTheme,
		new: newTheme,
		defaultTheme: defaultTheme
	}
})();
if (!top.window.mainFrameHandler.element_.contentDocument.theme) top.window.mainFrameHandler.element_.contentDocument.theme = window.theme;

// Apply theme function
function applyTheme() {
	var value = window.theme.getValue(base.key);

	if (base.property && base.property != '') {
	//	webMI.data.write(base.property, value);
		webMI.query[base.property] = value;
	}
	
	if (base.action == 'fill') webMI.gfx.setFill(base.id, value);
	else if (base.action == 'stroke') webMI.gfx.setStroke(base.id, value);
	else if (base.action == 'font family') webMI.gfx.setFontFamily(base.id, value);
	else throw new Error('Unimplemented theme action "' + base.action + '" called');

	webMI.trigger.fire('com.bachmann.themeapplied', window.theme.get(), base.id);

	return value;
}

// Init
// save initial value
webMI.query['_' + base.property] = webMI.query['_' + base.property] || webMI.query[base.property];
if (!base.property || webMI.query['_' + base.property] == base.defaultValue) {

	// Initial apply
	if (base.id) {
		applyTheme();
	}

	if (base.property) {
		var value = window.theme.getValue(base.key); // changed
	//	webMI.data.write(base.property, value);
		webMI.query[base.property] = value;
	}

	// Subscribe to change event
	webMI.trigger.connect('com.bachmann.themechange', applyTheme); // top.window.mainFrameHandler.element_.contentDocument
}
// Return self
return window.theme;
},{"action":"fill"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Save As":[function(base,webMI,window,document,self){
function createElement(nodeName, attributes, style, parent) {
	var element = webMI.dom.createElement("http://www.w3.org/1999/xhtml", nodeName);
	for (var i in attributes)
		element.setAttribute(i, attributes[i]);
	for (var i in style)
		element.style[i] = style[i];

	return parent.appendChild(element);
}

function openDataDialog() {
	var openedWindow = webMI.display.openWindow({
		extern:false,
		modal:false,
		width: 800,
		height: 600
	});
	var doc = openedWindow.getContentDocument();
	var data = base.content;
	doc.open();
	doc.write(data.replace(/\n/g, "<br/>"));
	doc.close();
	openedWindow.iframe.focus();

	webMI.addEvent(doc, "keydown", function(e) {
		if (e.keyCode == 27)
			openedWindow.close();
	});
}

function triggerSaveAsDialog() {
	var location = window.location;
	var origin = location.protocol + "//" + location.host + "/";
	var form = createElement("form", {
		"action": origin + base.action,
		"enctype": base.enctype,
		"method": base.method,
		"target": emptyFrameName
	}, {
		"display": "none"
	}, doc.body);

	for (var i in base) {
		createElement("input", {
			"type": "hidden",
			"name": i,
			"value": base[i]
		}, {}, form);
	}

	form.submit();
	doc.body.removeChild(form);
}

var indexHtmWindow = window;
try {
	while (top != indexHtmWindow && indexHtmWindow.parent.webMI)
		indexHtmWindow = indexHtmWindow.parent;
} catch (ex) { }

var doc = indexHtmWindow.document;
var emptyFrameName = "emptyframe";
var iframe = doc.getElementById(emptyFrameName);
if (iframe != null)
	return triggerSaveAsDialog();
if (indexHtmWindow["NO-EXPORT-SCRIPT"])
	return openDataDialog();

webMI.data.call("BrowseNodes", {
	startAddress: "SYSTEM.LIBRARY.ATVISE.RESOURCES",
	vTypes: ["VariableTypes.ATVISE.ScriptCode"]
}, function(e) {
	var exportScriptExists = !("error" in e) && base.action in e;
	if (exportScriptExists) {
		iframe = createElement("iframe", {
			"name": emptyFrameName,
			"id": emptyFrameName
		}, {
			"display": "none"
		}, doc.body);

		triggerSaveAsDialog();
	} else {
		indexHtmWindow["NO-EXPORT-SCRIPT"] = true;
		openDataDialog();
	}
});

},{"name":"filename.txt","type":"text/plain","action":"export","method":"post","enctype":"application/x-www-form-urlencoded"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Tooltip":[function(base,webMI,window,document,self){
var styleDefaults = { fontFamily: "Bryant Regular,Bryant Light, Bryant Bold,Open Sans", fontSize: 10, fontFill: "#64798E", width: "auto", fill: "#EEF1F2", stroke: "#647a8f", strokeWidth: 0,  hoverFill:"#EFEFEF",  closeTime: 0 };

var tempObj = { tooltip: "tooltip", text: base.text, style: styleDefaults, mouseout: false };
var x = 0;
var y = 0;
/*
webMI.addEvent(base.id, "mousemove", function(e) {
	x = e.clientX;
	y = e.clientY;
});
*/
webMI.addEvent(base.id, "mouseover", function(e) {
	var element = e.toElement || e.target;
	var p = webMI.gfx.createPoint(e.clientX, e.clientY);

	if (element && element.ownerDocument != document) {
		// element is not in SVG document, so it is most likley a foreignObject
		p = p.matrixTransform(webMI.gfx.getScreenCTM(base.id).inverse())
			 .matrixTransform(webMI.gfx.getScreenCTM());
	}

	tempObj.mouseout=false;
	webMI.display.showPopup(p.x, p.y + 20, tempObj);
});

webMI.addEvent(base.id, "mouseout", function(e) {
	tempObj.mouseout=true;
	webMI.display.showPopup(x, y, tempObj);
});

webMI.addOnunload(function() {
	webMI.display.showPopup(x, y, null);
});
},{}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Node":[function(base,webMI,window,document,self){
// This Quick Dynamic sets the value of the defined node to the value defined by the parameter "value" depending on one of the events defined by "onEvent".
// Parameters:
//	nodeId:		node which value will be set
//	value:		the above specified node will be set to this value
//	onEvent:	the event triggering this Quick Dynamic, which is one of the following:
//		click:		mouse click
//		dblclick:	double click of mouse button
//		mousedown:	press down the mouse button
//		mouseup:	release the mouse button
//		muuseover:	move the mouse cursor over the applied graphical element
//		mousemove:	move the mouse anywhere over the applied graphical element
//		mouseout:	move the mouse cursor out of the applied graphical element

webMI.addEvent(base.id, base.onEvent, function(e) {
	webMI.data.write(base.nodeId, base.value);
});
},{"nodeId":"","value":"","onEvent":"click"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Set Text":[function(base,webMI,window,document,self){
// This Quick Dynamic sets the text of the applied text element according to the value of the defined node with the defined decimal places (max. 9).
// Parameters:
//	nodeId:			node from which the value will be taken (variable should be of type "number" or "boolean" or "strings". strings shall only contain numbers)
//	decimalPlaces:	number of decimal places which shall be used to display numbers (not more than 9)

if (base.decimalPlaces > 9) { // more than 9 decimalplaces do not work with "sprintf"
	base.decimalPlaces = 9;
}
var format = "%." + base.decimalPlaces + "f";

webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;

	if (typeof value == "boolean" || typeof value == "string") {
		webMI.gfx.setText(base.id, value);
	} else {
		webMI.gfx.setText(base.id, webMI.sprintf(format, value));
	}
	//CR: Was machen wir mit nodes vom Type "DateTime"?
});
},{"nodeId":"","decimalPlaces":"0"}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.FontFace":[function(base,webMI,window,document,self){
/*

Imports truetype fonts

Note: fontPath shall point to the Resources directory, which is ../../ at runtime

*/
(function() {
	var styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style');
	styleElement.type = "text/css";
	styleElement.textContent = '@font-face { font-family: "' + base.fontName + '"; src: url("../../fonts/' + base.fontName + '.ttf") format("truetype"), url("../../fonts/' + base.fontName + '.woff") format("woff"), url("../../fonts/' + base.fontName + '.woff2") format("woff2") }';
	
	document.documentElement.appendChild(styleElement);
})();
},{"fontPath":"../../fonts/"}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.TwoHands":[function(base,webMI,window,document,self){
/*

Disables controls unless the unlockClickarea is beeing pressed.

*/

var locked = true;

function setLocked(value) {
	locked = value;
	webMI.trigger.fire('setLocked', value, base.unlockClickarea);
	webMI.trigger.fire("com.atvise.setActive", !value, base.id);
}

webMI.addEvent(base.unlockClickarea, ["mousedown", "touchstart"], function(e) {
	e.preventDefault();
	setLocked(false);
});

webMI.addEvent(base.unlockClickarea, ["mouseup", "mouseout", "touchend", "touchleave", "touchcancel"], function(e) {
	setLocked(true);
});

// lock on init
webMI.addOnload(function() {
	setLocked(true);
});
},{}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoLogout":[function(base,webMI,window,document,self){
//Detailed information about the usage of this Quick Dynamic can be found in the help

function setTimer(obj) {
	return setTimeout(function() {
		if(obj.popups != undefined) {
			obj.clonedPopups = obj.popups.slice(0);
			for (var i = 0; i < obj.clonedPopups.length; i++){
				obj.clonedPopups[i].close();
			}
			obj.clonedPopups = [];
		}
		webMI.data.logout();
		webMI.display.openDisplay(obj.logoutDisplay, webMI.query, obj.targetFrame);
		obj.activated = false;
	}, obj.autoLogoutTime);
}

if(base.action == "configure") {
	this.autoLogoutTime = parseFloat(base.autoLogoutTime)*1000;
	this.targetFrame = base.targetFrame;
	this.logoutDisplay = base.logoutDisplay;
	this.activated = base.activated === "true";
}

if(base.action == "start" && this.activated == false) {
		this.timerId = setTimer(this);
		this.activated = true;
}

if(base.action == "restartTimer" && this.activated == true) {
	clearTimeout(this.timerId);
	this.timerId = setTimer(this);
}

if(base.action == "manualLogout" && this.activated == true) {
	clearTimeout(this.timerId);
	this.activated = false;
}

if(base.action == "pushPopup") {
	if(this.popups == undefined)
		this.popups = [];
	this.popups.push(base.popup);
}

if(base.action == "removePopup") {
	for (var i = 0; i < this.popups.length; i++){
		if (this.popups[i] == base.popup) this.popups.splice(i,1);
	}
}
},{"action":"configure","activated":"false","autoLogoutTime":"600","targetFrame":"content","logoutDisplay":"AGENT.DISPLAYS.Main"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Open PopUp":[function(base,webMI,window,document,self){
// This Quick Dynamic opens a display as popup depending on one of the events defined by "onEvent".
// Parameters:
//	PopUp:		display which will be opened as popup
//	onEvent:	the event triggering this Quick Dynamic, which is one of the following:
//		click:		mouse click
//		dblclick:	double click of mouse button
//		mousedown:	press down the mouse button
//		mouseup:	release the mouse button
//		muuseover:	move the mouse cursor over the applied graphical element
//		mousemove:	move the mouse anywhere over the applied graphical element
//		mouseout:	move the mouse cursor out of the applied graphical element
//	width:		width of the popup (in pixels)
//	height:		height of the popup (in pixels)
//	extern:		if true, popup will be opened in external browser window
//	menubar:	if true, menubar will be displayed
//	moveable:	if true, popup will be moveable
//	resizeable:	if true, popup will be resizeable
//	scrollbars:	if true, popup will have scrollbars
//	status:		if true, status bar will be displayed
//	title:		specifies the title of the popup
//	toolbar:	if true, toolbar will be displayed
//  modal:		if true, popup will be open of type modal, i.e. always in foreground

webMI.addEvent(base.id, base.onEvent, function(e) {
	var width = parseFloat(base.width);
	var height = parseFloat(base.height);
	var extern = base.extern==="true";
	var	menubar = base.menubar==="true";
	var moveable = base.moveable==="true";
	var resizeable = base.resizeable==="true";
	var scrollbars = base.scrollbars==="true";
	var status = base.status==="true";
	var toolbar = base.toolbar==="true";
	var modal = base.modal==="true";
	var passParameters = base.passParameters==="true";
	var popup = {display:base.PopUp,extern:extern,height:height,menubar:menubar,modal:modal,movable:moveable,resizable:resizeable,scrollbars:scrollbars,status:status,title:base.title,toolbar:toolbar,width:width,x:120,y:190};

	if(passParameters)
		popup.query = webMI.query;

	webMI.display.openWindow(popup);
});

},{"onEvent":"click","width":"300","height":"400","extern":"false","menubar":"false","moveable":"true","resizeable":"false","scrollbars":"false","status":"false","toolbar":"false","modal":"true","passParameters":"true"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Tab Handler":[function(base,webMI,window,document,self){
if (typeof this.data === "undefined") {
	this.data = { "arr_indexed": [], "arr_not_indexed": [], "act_tab": {"array":null,"index":null}, "act_doc": null, "parent_doc": null, "prev_doc": null };
	this.doc_storage = [];
	this.acceptKeys = {"accept":true, "preventFirst":false, "active": true};
	this.iframes = [];
	this.afterLoadCallbacks = [];

	webMI.keys.addCombinationListener(0,9,nextTab);
	webMI.keys.addCombinationListener(4,9,prevTab);
	webMI.keys.addCombinationListener(0,13,applyTab);
	webMI.keys.addCombinationListener(0,32,applyTab);
	webMI.keys.addCombinationListener(0,27,applyTab);
	webMI.keys.addCombinationListener(0,38,applyTab);
	webMI.keys.addCombinationListener(0,40,applyTab);
	webMI.keys.addCombinationListener(0,37,applyTab);
	webMI.keys.addCombinationListener(0,39,applyTab);

	/*PreventDefault bei Tab,Enter,Esc,Backspace*/
	webMI.keys.addPressListener(function(e){preventTab(e,9)},9);
	webMI.keys.addPressListener(function(e){preventTab(e,13)},13);
	webMI.keys.addPressListener(function(e){preventTab(e,27)},27);
	webMI.keys.addPressListener(function(e){preventTab(e,8)},8);
	webMI.keys.addDownListener(function(e){preventTab(e,9)},9);
	webMI.keys.addDownListener(function(e){preventTab(e,13)},13);
	webMI.keys.addDownListener(function(e){preventTab(e,27)},27);
	webMI.keys.addDownListener(function(e){preventTab(e,8)},8);

	webMI.keys.addUpListener(releaseClick,13);
	webMI.keys.addUpListener(releaseClick,38);
	webMI.keys.addUpListener(releaseClick,40);
	webMI.keys.addUpListener(releaseClick,37);
	webMI.keys.addUpListener(releaseClick,39);
}

var data = this.data;
var doc_storage = this.doc_storage;
var acceptKeys = this.acceptKeys;
var iframes = this.iframes;
var afterLoadCallbacks = this.afterLoadCallbacks;

/*Outer*/
function register(tabIndex, keyHandler, doc) {
    if (!acceptKeys.accept)
        return;

	if (tabIndex&&tabIndex==-999999){
		return;
	} else if (tabIndex&&tabIndex>=1){
		pushToStorage(doc,tabIndex,keyHandler);
	}
	else {
		pushToStorage(doc,null,keyHandler);
	}
}
function registerDisplay(doc) {
    if (!acceptKeys.accept)
        return;

	pushToStorage(doc,null,null);
}
function blurFocused(){
	if (!testDocumentExists(data.act_doc))
		return;

	if (data.act_tab.array == "indexed") {
		data.arr_indexed[data.act_tab.index].keyHandler.call(this,"blur");
	} else if (data.act_tab.array == "not_indexed") {
		data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"blur");
	}
	storeActTab();
}
function beforeFirstUse(doc,storeParent,callback){
	if (storeParent){
		storeParentDoc(doc,data.prev_doc);
		getFocused(doc);
	}
	if(callback){
		callback.call(this);
	}
}
function getFocused(doc){
	if (!acceptKeys.accept || !testDocumentExists(doc) || isFocused(doc))
		return;

	getFromStorage(doc);
	if (data.arr_indexed.length > 0 && data.act_tab.array == "indexed"){
		setCurrentIndex(data.arr_indexed[data.act_tab.index].keyHandler);
	} else if (data.arr_indexed.length > 0){
		setCurrentIndex(data.arr_indexed[0].keyHandler);
	} else if (data.arr_not_indexed.length > 0 && data.act_tab.array == "not_indexed") {
		setCurrentIndex(data.arr_not_indexed[data.act_tab.index].keyHandler);
	} else if (data.arr_not_indexed.length > 0) {
		setCurrentIndex(data.arr_not_indexed[0].keyHandler);
	}
}
function isFocused(doc){
	return (testDocumentExists(data.act_doc) && doc == data.act_doc)
}
function removeDoc(doc, switchToParent){
	removeFromStorage(doc,switchToParent);
}
function setCurrentIndex(keyHandler, callback){
	if (!testDocumentExists(data.act_doc) && acceptKeys.accept)
		return;

	//callback just from button
	var retValBlur;
	if (data.act_tab.array == "indexed") {
		retValBlur = data.arr_indexed[data.act_tab.index].keyHandler.call(this,"blur",callback);
	} else if (data.act_tab.array == "not_indexed") {
		retValBlur = data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"blur",callback);
	}
	data.act_tab = findKeyHandler(keyHandler);
	if (data.act_tab.array == "indexed") {
		data.arr_indexed[data.act_tab.index].keyHandler.call(this,"focus");
	} else 	if (data.act_tab.array == "not_indexed") {
		data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"focus");
	}
	if (callback && (typeof retValBlur === "undefined" || (typeof retValBlur === "boolean" && !retValBlur))){
		callback.call(this);
	}
}
function renew(modal){
	/*if external, internal not modal or prev_doc is null*/
	if (typeof modal === "undefined" || modal || data.prev_doc == null) data.prev_doc = data.act_doc;
	data.arr_indexed = [];
	data.arr_not_indexed = [];
	data.act_tab = {"array":null,"index":null};
	data.act_doc = null;
	data.parent_doc = null;
}
function changeDisplay(){
	data.prev_doc = null;
	data.arr_indexed = [];
	data.arr_not_indexed = [];
	data.act_tab = {"array":null,"index":null};
	data.act_doc = null;
	data.parent_doc = null;
}
function renewGlobal(){
	data.arr_indexed.length = 0;
	data.arr_not_indexed.length = 0;
	data.act_tab = {"array":null,"index":null};
	data.act_doc = null;
	data.parent_doc = null;
	doc_storage.length = 0;
	data.prev_doc = null;
	iframes.length = 0;
	afterLoadCallbacks.length = 0;
}

function pushIFrame(fname, frame, defaultFrameName){
	var replace = false;
	var obj = {name:fname,frame:frame,loaded:false, hasevent:false};
	if (defaultFrameName && fname != defaultFrameName) obj.loaded = true;
	for (var i=0; i<iframes.length;i++){
		if (fname != "" && iframes[i].name == fname){
			iframes[i] = obj;
			replace = true;
		}
	}
	if (!replace){
		iframes.push(obj);
	}
}
function getIFrame(fname){
	for (var i=0;i<iframes.length;i++){
		if (iframes[i].name == fname) return iframes[i].frame;
	}
	return null;
}
function setIFrameHasEvent(frame){
	for (var i=0;i<iframes.length;i++){
		if (iframes[i].frame == frame) iframes[i].hasevent = true;
	}
}
function hasIFrameEvent(frame){
	for (var i=0;i<iframes.length;i++){
		if (iframes[i].frame == frame) return iframes[i].hasevent;
	}
	return false;
}
function setIFrameLoaded(frame,bool){
	for (var i=0;i<iframes.length;i++){
		if (iframes[i].frame == frame) iframes[i].loaded = bool;
	}
}
function areAllIFrameLoaded(){
	for (var i=0;i<iframes.length;i++){
		if (!iframes[i].loaded) return false;
	}
	return true;
}
function getIFrameNames(){
	var ret = [];
	for (var i=iframes.length-1;i>=0;i--){
		try{
			if (iframes[i].frame.contentWindow != null && iframes[i].name != "" ) ret.push(iframes[i].name);
		} catch (ex) {
			iframes.splice(i, 1);
		}
	}
	return ret;
}
function addAfterIFrameLoad(fun){
	var find = false;
	for (var i=0;i<afterLoadCallbacks.length;i++){
		if (afterLoadCallbacks[i]==fun) find = true;
	}
	if (!find) afterLoadCallbacks.push(fun);
}
function runAfterIFrameLoad(){
	for (ali=0;ali<afterLoadCallbacks.length;ali++){
		afterLoadCallbacks[ali].call(this);
	}
	afterLoadCallbacks.length = 0;
}
function setAcceptKeys(bool){
	if (acceptKeys.active)
		acceptKeys.accept = bool;
}
function setAcceptKeysPrevent(bool){
	if (acceptKeys.active)
		acceptKeys.preventFirst = bool;
}
function getAcceptKeys(){
	var ret = (acceptKeys.accept && !acceptKeys.preventFirst);
	acceptKeys.preventFirst = false;
	return ret;
}

/*Inner*/
function sortFunction(a,b){return (a.tabIndex-b.tabIndex)};

function pushToStorage(doc,index1,handler1){
	if (doc.location == "about:blank")
		return;
	var sto_index = null;
	for (var j=0;j<doc_storage.length;j++){
		if (doc_storage[j].doc == doc) sto_index = j;
	}
	if (sto_index == null) {
		sto_index = doc_storage.length;
		doc_storage[doc_storage.length] = {"doc":doc,"data":{ "arr_indexed": [], "arr_not_indexed": [], "act_tab": {"array":null,"index":null}, "act_doc": null, "parent_doc": null }};
	}
	if (index1 != null && handler1 != null){
		doc_storage[sto_index].data.arr_indexed[doc_storage[sto_index].data.arr_indexed.length] = {"tabIndex":index1, "keyHandler": handler1};
	} else if (index1 == null && handler1 != null){
		doc_storage[sto_index].data.arr_not_indexed[doc_storage[sto_index].data.arr_not_indexed.length] = {"tabIndex":doc_storage[sto_index].data.arr_not_indexed.length, "keyHandler": handler1};
	}
}
function findDocStorage(doc,callback) {
	for (var j=0;j<doc_storage.length;++j) {
		if (doc_storage[j].doc == doc) {
			callback.call(this,j);
			return;
		}
	}
}

function getFromStorage(doc) {
	findDocStorage(doc,function(ind){
		data.arr_indexed = doc_storage[ind].data.arr_indexed;
		data.arr_not_indexed = doc_storage[ind].data.arr_not_indexed;
		data.act_tab = doc_storage[ind].data.act_tab;
		data.act_doc = doc;
	});
	data.arr_indexed.sort(sortFunction);
	data.arr_not_indexed.sort(sortFunction);
}

function storeActTab() {
	findDocStorage(data.act_doc,function(ind){
		doc_storage[ind].data.act_tab = data.act_tab;
	});
}

function storeParentDoc(doc,parent) {
	findDocStorage(doc,function(ind){
		doc_storage[ind].data.parent_doc = parent;
	});
}

function removeFromStorage(doc,switchToParent){
	findDocStorage(doc,function(ind){
		switchToParent && getFocused(doc_storage[ind].data.parent_doc);
		doc_storage.splice(ind,1);
	});
}

function setAndRunFirst(ori){
	if (ori == 1){
		for (var i=0;i<data.arr_indexed.length;i++){
			if (data.arr_indexed[i].keyHandler.call(this,"isActive",getComputedVisibility)){
				data.arr_indexed[i].keyHandler.call(this,"focus");
				data.act_tab = {"array":"indexed", "index": i};
				return;
			}
		}
		for (var i=0;i<data.arr_not_indexed.length;i++){
			if (data.arr_not_indexed[i].keyHandler.call(this,"isActive",getComputedVisibility)){
				data.arr_not_indexed[i].keyHandler.call(this,"focus");
				data.act_tab = {"array":"not_indexed", "index": i};
				return;
			}
		}
	} else {
		for (var i=data.arr_not_indexed.length-1;i>-1;i--){
			if (data.arr_not_indexed[i].keyHandler.call(this,"isActive",getComputedVisibility)){
				data.arr_not_indexed[i].keyHandler.call(this,"focus");
				data.act_tab = {"array":"not_indexed", "index": i};
				return;
			}
		}
		for (var i=data.arr_indexed.length-1;i>-1;i--){
			if (data.arr_indexed[i].keyHandler.call(this,"isActive",getComputedVisibility)){
				data.arr_indexed[i].keyHandler.call(this,"focus");
				data.act_tab = {"array":"indexed", "index": i};
				return;
			}
		}
	}
}

function findKeyHandler(keyHandler){
	for (var i=0; i<data.arr_indexed.length;i++){
		if (data.arr_indexed[i].keyHandler == keyHandler){
			return {"array":"indexed","index":i};
		}
	}
	for (var i=0; i<data.arr_not_indexed.length;i++){
		if (data.arr_not_indexed[i].keyHandler == keyHandler){
			return {"array":"not_indexed","index":i}
		}
	}
	return {"array":null,"index":null};
}
function getKeyCode(e){
	var e = window.event||e;
	return (e.keyCode||e.charCode);
}
function preventTab(e,kk){
	if (!acceptKeys.accept) return true;
	if (kk == 9 || kk == 13 || kk == 27 || kk == 8){
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
			return false;
		}
	}
}
function nextTab(e,shiftNum){
	if (!acceptKeys.accept || acceptKeys.preventFirst){ acceptKeys.preventFirst = false; return true;}
	shiftNum = shiftNum || 0;
	if (data.arr_indexed.length == 0 && data.arr_not_indexed.length == 0) return;
	if (data.act_tab.array == null) {
		setAndRunFirst(1);
	} else {
		if (data.act_tab.array == "indexed" &&  data.act_tab.index < data.arr_indexed.length-1){ /*normal next indexed*/
			if (shiftNum == 0)
				data.arr_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"indexed", "index": data.act_tab.index+1};
		} else if (data.act_tab.array == "indexed" &&  data.act_tab.index == data.arr_indexed.length-1 && data.arr_not_indexed.length > 0){ /*indexed overflow and exists not_indexed*/
			if (shiftNum == 0)
				data.arr_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"not_indexed", "index": 0};
		} else if (data.act_tab.array == "indexed" &&  data.act_tab.index == data.arr_indexed.length-1 && data.arr_not_indexed.length == 0){ /*indexed overflow and not exists not_indexed*/
			if (shiftNum == 0)
				data.arr_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"indexed", "index": 0};
		} else if (data.act_tab.array == "not_indexed" &&  data.act_tab.index < data.arr_not_indexed.length-1){ /*normal next not_indexed*/
			if (shiftNum == 0)
				data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"not_indexed", "index": data.act_tab.index+1};
		} else if (data.act_tab.array == "not_indexed" &&  data.act_tab.index == data.arr_not_indexed.length-1 && data.arr_indexed.length > 0){ /*not_indexed overflow and exists indexed*/
			if (shiftNum == 0)
				data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"indexed", "index": 0};
		} else if (data.act_tab.array == "not_indexed" &&  data.act_tab.index == data.arr_not_indexed.length-1 && data.arr_indexed.length == 0){ /*not_indexed overflow and not exists indexed*/
			if (shiftNum == 0)
				data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"not_indexed", "index": 0};
		}
		if (data.act_tab.array == "indexed"){
			if (data.arr_indexed[data.act_tab.index].keyHandler.call(this,"isActive",getComputedVisibility))
				data.arr_indexed[data.act_tab.index].keyHandler.call(this,"focus");
			else if ( shiftNum < (data.arr_indexed.length + data.arr_not_indexed.length) )
				nextTab(e,shiftNum+1);
			else
				data.act_tab = {"array":null, "index": null};
		} else if (data.act_tab.array == "not_indexed") {
			if (data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"isActive",getComputedVisibility))
				data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"focus");
			else if ( shiftNum < (data.arr_indexed.length + data.arr_not_indexed.length) )
				nextTab(e,shiftNum+1);
			else
				data.act_tab = {"array":null, "index": null};
		}
	}
}

function prevTab(e,shiftNum){
	if (!acceptKeys.accept || acceptKeys.preventFirst){ acceptKeys.preventFirst = false; return true;}
	shiftNum = shiftNum || 0;
	if (data.arr_indexed.length == 0 && data.arr_not_indexed.length == 0) return;
	if (data.act_tab.array == null) {
		setAndRunFirst(-1);
	} else {
		if (data.act_tab.array == "indexed" &&  data.act_tab.index > 0){ /*normal next indexed*/
			if (shiftNum == 0)
				data.arr_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"indexed", "index": data.act_tab.index-1};
		} else if (data.act_tab.array == "indexed" &&  data.act_tab.index == 0 && data.arr_not_indexed.length > 0){ /*indexed overflow and exists not_indexed*/
			if (shiftNum == 0)
				data.arr_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"not_indexed", "index": data.arr_not_indexed.length-1};
		} else if (data.act_tab.array == "indexed" &&  data.act_tab.index == 0 && data.arr_not_indexed.length == 0){ /*indexed overflow and not exists not_indexed*/
			if (shiftNum == 0)
				data.arr_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"indexed", "index": data.arr_indexed.length-1};
		} else if (data.act_tab.array == "not_indexed" &&  data.act_tab.index > 0){ /*normal next not_indexed*/
			if (shiftNum == 0)
				data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"not_indexed", "index": data.act_tab.index-1};
		} else if (data.act_tab.array == "not_indexed" &&  data.act_tab.index == 0 && data.arr_indexed.length > 0){ /*not_indexed overflow and exists indexed*/
			if (shiftNum == 0)
				data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"indexed", "index": data.arr_indexed.length-1};
		} else if (data.act_tab.array == "not_indexed" &&  data.act_tab.index == 0 && data.arr_indexed.length == 0){ /*not_indexed overflow and not exists indexed*/
			if (shiftNum == 0)
				data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"blur");
			data.act_tab = {"array":"not_indexed", "index": data.arr_not_indexed.length-1};

		}
		if (data.act_tab.array == "indexed"){
			if (data.arr_indexed[data.act_tab.index].keyHandler.call(this,"isActive",getComputedVisibility))
				data.arr_indexed[data.act_tab.index].keyHandler.call(this,"focus");
			else if ( shiftNum < (data.arr_indexed.length + data.arr_not_indexed.length) )
				prevTab(e,shiftNum+1);
			else
				data.act_tab = {"array":null, "index": null};
		} else if (data.act_tab.array == "not_indexed") {
			if (data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"isActive",getComputedVisibility))
				data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,"focus");
			else if ( shiftNum < (data.arr_indexed.length + data.arr_not_indexed.length) )
				prevTab(e,shiftNum+1);
			else
				data.act_tab = {"array":null, "index": null};
		}
	}
}
function callApply(fun,kk){
	if (data.act_tab.array == "indexed") {
		return data.arr_indexed[data.act_tab.index].keyHandler.call(this,fun,kk);
	} else if (data.act_tab.array == "not_indexed") {
		return data.arr_not_indexed[data.act_tab.index].keyHandler.call(this,fun,kk);
	}
}
function applyTab(e){
	var kk = getKeyCode(e);
	if (!acceptKeys.accept || (acceptKeys.preventFirst)){
		 if (kk != 27) acceptKeys.preventFirst = false;
		 return true;
	}
	if ((data.arr_indexed.length == 0 && data.arr_not_indexed.length == 0) || data.act_tab.array == null ) return;
	if (!callApply("isActive",getComputedVisibility)){ nextTab(e); return;}
	var fun;
	if (kk == 13) {
		fun = "apply";
	} else if ( kk == 27){
		fun = "back";
	} else if ( kk == 32){
		fun = "space";
	} else if ( kk == 38){
		fun = "arrow";
	} else if ( kk == 40){
		fun = "arrow";
	} else if ( kk == 37){
		fun = "arrow";
	} else if ( kk == 39){
		fun = "arrow";
	}
	callApply(fun,kk);
}
function releaseClick(e){
	if ((data.arr_indexed.length == 0 && data.arr_not_indexed.length == 0) || data.act_tab.array == null ) return;
	callApply("releaseClick",null);
}

function getComputedVisibility(element) {
	function isVisible(style) {
		return style["visibility"] != "hidden";
	}
	if (window.getComputedStyle) {
		var computedStyle = window.getComputedStyle(element);
		return isVisible(computedStyle) && computedStyle["display"] != "none";
	}
	var visible = isVisible(element.currentStyle);
	if (!visible)
		return visible;

	var parent = element.parentNode;
	while (parent.id != "webmivmlroot") {
		if (!isVisible(parent.currentStyle))
			return false;
		parent = parent.parentNode;
	}
	return visible;
}

function testDocumentExists(doc) {
	try {
		return doc.location != "";
	} catch(e) {
		return false;
	}
}

if (base.activate == "false"){
	acceptKeys.active = false;
	acceptKeys.accept = false;
	return;
} else {
	return {
		"register": register,
		"registerDisplay": registerDisplay,
		"blurFocused": blurFocused,
		"beforeFirstUse": beforeFirstUse,
		"getFocused": getFocused,
		"isFocused": isFocused,
		"removeDoc": removeDoc,
		"setCurrentIndex": setCurrentIndex,
		"renew": renew,
		"changeDisplay": changeDisplay,
		"renewGlobal": renewGlobal,
		"pushIFrame": pushIFrame,
		"getIFrame": getIFrame,
		"setIFrameHasEvent": setIFrameHasEvent,
		"hasIFrameEvent": hasIFrameEvent,
		"setIFrameLoaded": setIFrameLoaded,
		"areAllIFrameLoaded": areAllIFrameLoaded,
		"getIFrameNames": getIFrameNames,
		"addAfterIFrameLoad": addAfterIFrameLoad,
		"runAfterIFrameLoad": runAfterIFrameLoad,
		"setAcceptKeys": setAcceptKeys,
		"setAcceptKeysPrevent": setAcceptKeysPrevent,
		"getAcceptKeys": getAcceptKeys,
		"nextTab": nextTab,
		"prevTab": prevTab
	}
}
},{"activate":"true"}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.TouchRotate":[function(base,webMI,window,document,self){
var move = false;
var finger = -1;
var reach = "";
var rotAngle = 0;
var baseValue = 0;
var startPosition = {};
var signPosition = {};
var startAngle = 0;
var currentAngle = 0;
var maxReached = null;
var minReached = null;
var centerPoint = {};

function normalizeAngle(ang) {
	return (ang + 2 * Math.PI) % (2 * Math.PI);
}

function near(ang) {
	if (Math.abs(ang - base.maxAngle * Math.PI / 180) < Math.abs(ang -  normalizeAngle(base.minAngle * Math.PI / 180)))
		return "max";
	else
		return "min";
}

function transform(value) {
	value = Math.min(Math.max(value, base.minValue), base.maxValue)
	var _t = (value - base.minValue) * (base.maxAngle - base.minAngle) / (base.maxValue - base.minValue) + base.minAngle;
	return _t * Math.PI / 180;
}

function invtransform(value) {
	var _ang = (value > Math.PI) ? (value - 2 * Math.PI) * 180 / Math.PI : value * 180 / Math.PI;
	return (_ang - base.minAngle) * (base.maxValue - base.minValue) / (base.maxAngle - base.minAngle) + base.minValue;
}

function getCenter(ele) {
	var bcr = ele.getBoundingClientRect();
	return webMI.gfx.createPoint(bcr.width / 2, bcr.height / 2);
}

// On touch devices, touchmove and mousemove events are fired, which prevents other controls from handling those events.
// Therefore, touch devices return invalid positions for non-touch events.
var isTouchDevice;

function getPosition(event) {
	if (event.changedTouches) {
		if (isTouchDevice === undefined) isTouchDevice = true;
		if (event.type == "touchstart" && finger == -1) {// on touchstart
			finger = event.changedTouches[0].identifier;
		}
		else if (finger != event.changedTouches[0].identifier) { // move or touchend
			return {x: -1};
		}
		return webMI.gfx.createPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
			.matrixTransform(webMI.gfx.getScreenCTM().inverse());
	} else {
		if (isTouchDevice === undefined) isTouchDevice = false;
		else if (isTouchDevice) return { x: -1 };

		return webMI.gfx.createPoint(event.clientX, event.clientY)
			.matrixTransform(webMI.gfx.getScreenCTM().inverse());
	}
}

webMI.addOnload(function(e) {
	webMI.data.subscribe(base.node, function(e) {
		if (!move) {
			baseValue = e.value;
			rotAngle = transform(e.value);
			webMI.gfx.setRotation(base.id, webMI.translate(rotAngle, 0, 2*Math.PI, 0, 360));			
		}
	});

	centerPoint = getCenter(base.ele);
	webMI.addEvent(base.id, ["mousedown", "touchstart"], function(e) {
		e.preventDefault();

		if (!_active) return;

		move = true;
		startPosition = getPosition(e);
		signPosition = { x: 2 * centerPoint.x - 2 * startPosition.x, y: 2 * centerPoint.y - 2 * startPosition.y};
		startAngle = currentAngle = normalizeAngle(rotAngle);
	});
	
	webMI.addEvent(document, ["mousemove", "touchmove"], function(e) {
		var currentPosition = getPosition(e);
	
		if (move && currentPosition.x != -1) {
			e.preventDefault();
			var sign = (signPosition.x * (currentPosition.y - startPosition.y) - signPosition.y * (currentPosition.x - startPosition.x) < 0) ? 1 : -1;
			var _a = Math.pow(startPosition.x - centerPoint.x, 2) + Math.pow(startPosition.y - centerPoint.y, 2);
			var _b = Math.pow(currentPosition.x - centerPoint.x, 2) + Math.pow(currentPosition.y - centerPoint.y, 2);
			var _c = Math.pow(currentPosition.x - startPosition.x, 2) + Math.pow(currentPosition.y - startPosition.y, 2);
			var _ang = sign * Math.acos((_a + _b - _c) / (2 * Math.sqrt(_a * _b)));
			currentAngle = normalizeAngle(startAngle + _ang);

			if (reach == "" && currentAngle > base.maxAngle * Math.PI / 180 && currentAngle < normalizeAngle(base.minAngle * Math.PI / 180)) {
				reach = near(currentAngle);
				if (reach == "min")
					webMI.gfx.setRotation(base.id, webMI.translate(normalizeAngle(base.minAngle * Math.PI / 180), 0, 2*Math.PI, 0, 360));
				else
					webMI.gfx.setRotation(base.id, webMI.translate(base.maxAngle * Math.PI / 180, 0, 2*Math.PI, 0, 360));
			} else if (reach == "") {
				webMI.gfx.setRotation(base.id, webMI.translate(currentAngle, 0, 2*Math.PI, 0, 360));
			} else if ((reach == "max" && near(currentAngle) == "max" && currentAngle <= base.maxAngle * Math.PI / 180) ||
					   (reach == "min" && near(currentAngle) == "min" && currentAngle >= normalizeAngle(base.minAngle * Math.PI / 180))) {
				reach = "";
			}
			// trigger for the circularSlider
			webMI.trigger.fire("rotateValue" + base.node, (reach == "min") ? base.minValue : (reach == "max") ? base.maxValue : Math.round(invtransform(currentAngle)));
		}
	});
	
	webMI.addEvent(document, ["mouseup", "touchend"], function(e) {
		var currentPosition = getPosition(e);

		if (move && currentPosition.x != -1) {
			e.preventDefault();
			move = false;
			webMI.data.write(base.node, (reach == "min") ? base.minValue : (reach == "max") ? base.maxValue : Math.round(invtransform(currentAngle)));
			reach = "";
			finger = -1;
		}
	});

	// Active / Inactive support
	var _active = true;
	webMI.trigger.connect('com.atvise.setActive', function(e) {
		_active = e.value;
	});
});
},{}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.AutoReconnect":[function(base,webMI,window,document,self){
var self = this;

if (!this.initialized || base.defaultconfiguration == "false") {
	this.activated = base.activated == "true";
	this.interval = parseInt(base.interval);
	this.keepalive = parseInt(base.keepalive);

	webMI.setConfig("data.keepaliveinterval", this.keepalive * 1000);
}

if (this.initialized)
	return;

var indexHtmWindow = window;
try {
	while (top != indexHtmWindow && indexHtmWindow.parent.webMI)
		indexHtmWindow = indexHtmWindow.parent;
} catch (ex) { }

var connecting = false;
var connectingText = "Connecting ...";
var reconnectingText = "Retry in %d second(s) ...";
var seconds = 0;
var state = 0;
var statusBar = createElement("div", {}, {
	"backgroundColor": "red",
	"bottom": 0,
	"color": "yellow",
	"fontFamily": "Arial",
	"fontWeight": "bold",
	"display": "none",
	"height": "35px",
	"lineHeight": "35px",
	"position": "absolute",
	"textAlign": "center",
	"width": "100%",
	"zIndex": 999
}, indexHtmWindow.document.body);

webMI.addEvent(webMI.data, "statechange", function(s) {
	state = s;
});

setInterval(function() {
	if (!self.activated || state > -1 || connecting)
		return;

	setStatusText(webMI.sprintf(reconnectingText, self.interval - seconds));

	if (seconds >=  self.interval) {
		connecting = false;
		seconds = 0;
		setStatusText(connectingText);
		webMI.data.call("read", "", function(e) {
			var up = false;
			if (e["result"] || e["error"] > -1000)
				up = true;

			handleServerState(up);
		});
	} else {
		++seconds;
	}
}, 1000);

this.initialized = true;

function createElement(nodeName, attributes, style, parent) {
	var element = webMI.dom.createElement("http://www.w3.org/1999/xhtml", nodeName);
	for (var i in attributes)
		element.setAttribute(i, attributes[i]);
	for (var i in style)
		element.style[i] = style[i];

	return parent.appendChild(element);
}

function setStatusText(text) {
	statusBar.style.display = "block";

	if ("innerText" in statusBar)
		statusBar.innerText = text;
	else
		statusBar.textContent = text;
}

function handleServerState(up) {
	if (up)
		indexHtmWindow.location.reload(true);
	else {
		connecting = false;
		var topErrorScreen = indexHtmWindow.document.getElementById("errorscreen");
		if (topErrorScreen)
			topErrorScreen.style.display = "block";
	}
}
},{"activated":"true","interval":"5","defaultconfiguration":"false","keepalive":"4"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Configuration":[function(base,webMI,window,document,self){
if(base.action == "init")
	this.indexParameters = base.indexParameters;

if(base.action == "existsIndexParameter" && base.parameterName != "")
	return this.indexParameters[base.parameterName];
else
	return null;
},{}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.ResetScaling":[function(base,webMI,window,document,self){
// find scaling element
var elm = base.innerNode;
while (!elm.getAttribute('transform')) {
	elm = elm.parentNode;
	if (!elm.getAttribute) return; // reached document element -> element is not scaled, exit
}

// calc values
var matrixString = elm.getAttribute('transform'),
	re = /matrix\(([0-9\.]+),[0-9\.]+,[0-9\.]+,([0-9\.]+),.*\)/gi,
	result = re.exec(matrixString),
	scaleX = parseFloat(result[1]),
	scaleY = parseFloat(result[2]),
	renderedWidth = base.originalWidth * scaleX,
	renderedHeight = base.originalHeight * scaleY,
	scaleXInverse = base.originalWidth / renderedWidth,
	scaleYInverse = base.originalHeight / renderedHeight;

// callback(originalSize, renderedSize, scale, scaleInverse)
base.callback({ width: base.originalWidth, height: base.originalHeight }, { width: renderedWidth, height: renderedHeight }, { x: scaleX, y: scaleY }, { x: scaleXInverse, y: scaleYInverse });
},{}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Change Opacity":[function(base,webMI,window,document,self){
// This Quick Dynamic sets the opacity of the fill color and/or stroke color of the applied graphical element depending on the value of the defined node and the ranged defined by
// "minRange" and "maxRange", i.e. the range defined by "minRange" and "maxRange" will be translated to the range defined by "StartFill" and "StopFill" and/or to the range defined by
// "StartStroke" and "StopStroke".
// The opacity for the fill color will only be set if both "StartFill" and "StopFill" are defined.
// The opacity for the stroke color will only be set if both "StartStroke" and "StopStroke" are defined.
// e.g.: the defined range of the value from 0 (=minRange) to 100 (=maxRange) will be translated to 0 (=StartFill) to 1 (=StopFill) where 1 means 100% opacity
// Parameters:
//	nodeId:			this node triggers this Quick Dynamic
//	minRange:		lower bound of the range where the node's value should lie in
//	maxRange:		upper bound of the range where the node's value should lie in
//	StartFill:		value for the lowest opacity in percent
//	StopFill:		value for the highest opacity in percent (1=100%)
//	StartStroke:	value for the lowest stroke in percent
//	StopStroke:		value for the highest stroke in percent (1=100%)


webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;
	if (base.StartFill != "" && base.StopFill != "") {
		webMI.gfx.setFillOpacity(base.id, webMI.translate(value, base.minRange, base.maxRange, base.StartFill, base.StopFill));
	}
	if (base.StartStroke != "" && base.StopStroke != "") {
		webMI.gfx.setStrokeOpacity(base.id, webMI.translate(value, base.minRange, base.maxRange, base.StartStroke, base.StopStroke));
	}
});
},{"nodeId":"","minRange":"0","maxRange":"100","StartFill":"0","StopFill":"1","StartStroke":"","StopStroke":""}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Open Main Menu":[function(base,webMI,window,document,self){
var styleDefaults = { fontFamily: "Arial", fontSize: base.fontSize, fontFill: "#000000", width: parseInt(base.minWidth,10), fill: "#c7c7c7", stroke: "#393939", strokeWidth: 1, hoverFill: "#fcec3c", closeTime: 0 };

var frameName = base.frameName ? base.frameName : "content";
var itemsCount = base.itemsCount ? base.itemsCount : "0";

var menuMain = {};
var menuUser = {};
var menuSystem = {};
var menuReport = {};

function getDisplayFn(display) {
	return function(e) {
		webMI.display.openDisplay(display,webMI.query,frameName);
	};
}

function getUrlFn(url) {
	return function(e) {
		webMI.display.openUrl(url,webMI.query,frameName);
	};
}

webMI.trigger.fire("com.atvise.display_structure", function(e, preload) {
	var displayConfig = e;
    if (displayConfig) {
		if (displayConfig.menu) {
			function addEntry(menu, menuObj) {
				for (var i in menuObj) {
					menu[i] = menuObj[i];
				}
				return menu;
			};

			function atviseDefault(menuName) {
				return (menuName == "MAIN" || menuName == "SYSTEM" || menuName == "USER" || menuName == "REPORT");
			};

			function createMenu(menuObj, menuItem) {
				if (menuItem.sub) {
					if (!atviseDefault(menuItem.name)) {
						menuObj[menuItem.name] = {
							sub: {},
							text: menuItem.name,
							value: (menuItem.display ? getDisplayFn(menuItem.display) : getUrlFn(menuItem.url))
						};
						for (var i in menuItem.sub) {
							var sub = {};
							createMenu(menuObj[menuItem.name]["sub"], menuItem.sub[i]);
						}
					} else {
						for (var i in menuItem.sub) {
							createMenu(menuObj, menuItem.sub[i]);
						}
					}
				} else if (menuItem.display) {
					menuObj[menuItem.display] = {text: menuItem.name, value: getDisplayFn(menuItem.display) };
				} else if (menuItem.url) {
					menuObj[menuItem.url] = {text: menuItem.name, value: getUrlFn(menuItem.url) };
				}
				switch(menuItem.name) {
					case "MAIN": menuMain = addEntry(menuMain, menuObj); break;
					case "USER": menuUser = addEntry(menuUser, menuObj); break;
					case "SYSTEM": menuSystem = addEntry(menuSystem, menuObj); break;
					case "REPORT": menuReport = addEntry(menuReport, menuObj); break;
					default: break;
				}
			};

			for (var i in displayConfig.menu) {
				var menuObj = { };
				var menuItem = displayConfig.menu[i];
				if (menuItem) {
					createMenu(menuObj, menuItem);
				}
			}
		}
	}
});

var tempObj = {};
tempObj.style = styleDefaults;
tempObj.itemsCount = itemsCount;
if (base.name != undefined) {
	function addEntries(menu) {
		for (var i in menu) {
			tempObj[i] = menu[i];
		}
	};
	switch(base.name) {
		case "MAIN": addEntries(menuMain); break;
		case "USER": addEntries(menuUser); break;
		case "SYSTEM": addEntries(menuSystem); break;
		case "REPORT": addEntries(menuReport); break;
		default: break;
	}
}

webMI.addEvent(base.id, base.onEvent, function(e) {
	var p = webMI.gfx.createPoint(base.x,base.y).matrixTransform(webMI.gfx.getScreenCTM());
	webMI.display.showPopup(p.x, p.y, tempObj);
});

webMI.addOnunload(function() {
	webMI.display.showPopup(0, 0, null);
});
},{"x":"","y":"","onEvent":"click","name":"MAIN","frameName":"content","itemsCount":"0","fontSize":"12","minWidth":"160"}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.SwipeDisplays":[function(base,webMI,window,document,self){
(function() {
	// - Constants
	var kContainerId = base.id + '_myframe',
		kDragDirection = base.swipeAxis,
		kTresholdDistance = parseFloat(base.tresholdDistance),
		kAnimationStep = 70,
		kAnimationStepDuration = 20,
		kPureWebMI = false,
		kCountDisplayParams = 10

	// - Runtime Variables
	var iframe = this.document.getElementById(kContainerId),
		displays = [];

	// - Helpers
	function getEventPosition(e) {
		var t = e.touches ? e.touches[0] : e;

		return t['client' + kDragDirection.toUpperCase()];
	}

	function isValidDisplayParam(n) {
		var val = base['display' + n];
		return !(val === undefined || val == '');
	}

	// returns address prefix (E.g. /en/svg/)
	function addressPrefix() {
		var currentAddress = iframe.src,
			parts = currentAddress.split('/')
		
		for (var i = 0; i < parts.length; i++)
			if (parts[i] == 'svg') {
				return ['', parts[i - 1], parts[i], ''].join('/')
			}
	}

	function determinePureWebMI(address) {
		return kPureWebMI = !(isNaN(parseInt(address)));
	}

	// - Validate parameters
	if (!iframe) throw new Error('SwipeDisplays needs an <iframe>\'s id as id parameter to work properly.\nMake sure you pass the id you see in atvise builder, not the one in the XML output (E.g. "id_4" and not "id_4_myframe").');
	if (!kTresholdDistance) throw new Error('The value passed as "tresholdDistance" could not be parsed as a number.\nOrigin: SwipeDisplay Quickdynamic on id "' + base.id + '"');

	// - Get displays to swipe
	if (!isValidDisplayParam(1))
		// Get displays from project display structure
		webMI.trigger.fire("com.atvise.display_structure", function(e, preload) {
			var displayConfig = e;
			if (displayConfig) {
				if (displayConfig.menu) {
					for (var i = 0; i < displayConfig.menu.length; i++) {
						var item = displayConfig.menu[i];
						
						if (item.sub) for (var j = 0; j < item.sub.length; j++) {
								displays.push(item.sub[j].display);
							}
					}
	
					// Add Main Display
					var prefix = displays[0].split('.')[0];
					
					// If _prefix_ can be parsed as a number, displays are precompiled ( -> a pure webMI installation)
					// In this case, Main display address is set in compile time -> no Main display can be added
					if (!determinePureWebMI(prefix)) displays.unshift(prefix + '.DISPLAYS.Main');
				}
			}
		});
	else {
		determinePureWebMI(base.display1);

		// Get displays from parameters
		for (var i = 1; i <= kCountDisplayParams; i++)
			if (isValidDisplayParam(i))
				displays.push(base['display' + i])
	}

	// - Returns the next or last display's address depending on the direction to go
	function nextDisplay(direction) {
		var currentAddress = iframe.src,
			parts = currentAddress.split('/'),
			currentDisplay = parts[parts.length - 1].split('?')[0], // Remove get part
			addressPrefix = '',
			addressPostfix = (kPureWebMI ? '.svg' : '')

		// get address prefix (E.g. /en/svg/)
		for (var i = 0; i < parts.length; i++)
			if (parts[i] == 'svg') {
				addressPrefix = ['', parts[i - 1], parts[i], ''].join('/')
			}

		// get index
		var currentIndex = 0;
		for (var i = 0; i < displays.length; i++) {
			if ((displays[i] + addressPostfix) == currentDisplay) {
				currentIndex = i;
				break;
			}
		}

		var nextIndex = currentIndex + direction;

		// Adjust bounds
		if (nextIndex < 0) nextIndex = displays.length - 1;
		else if (nextIndex == displays.length) nextIndex = 0;

		return addressPrefix + displays[nextIndex] + addressPostfix;
	}
	

	// - Initialize for every active display
	iframe.onload = function() {
		var doc = iframe.contentWindow.document,
			rootNode = doc.childNodes[0],
			moveNodes = rootNode.childNodes,
			dragStart,
			dragDistance,
			dragging = false,
			events = ('ontouchstart' in top.window) ?
				{
					start: 'touchstart',
					move: 'touchmove',
					end: ['touchend', 'touchcancel']
				} :
				{
					start: 'mousedown',
					move: 'mousemove',
					end: 'mouseup'
				};

		// Remove text and comment nodes
		var n = [];
		for (var i = 0; i < moveNodes.length; i++) if (moveNodes[i].nodeType == 1) {
			n.push(moveNodes[i]);
		}
		moveNodes = n;

		function move(dist) {
			for (var j = 0; j < moveNodes.length; j++) {
				webMI.gfx['setMove' + kDragDirection.toUpperCase()](moveNodes[j], dist);
			}
		}

		webMI.addEvent(rootNode, events.start, function(e) {
			if (e.target == rootNode || e.target.tagName == 'rect') { // target is root element or a background element
				dragStart = getEventPosition(e);
				dragging = true;
			}
		});

		webMI.addEvent(rootNode, events.end, function(e) {
			if (dragging) {
				dragging = false;

				var delta = Math.abs(dragDistance),
					direction = dragDistance / delta;
	
				if (delta > kTresholdDistance) {
					// complete transition
					var width = rootNode.offsetWidth,
						max = width * direction;
	
					var n = 0;
					for (var i = dragDistance; Math.abs(i) < width; i += kAnimationStep * direction, n++) {
						setTimeout((function(dist) {
							return function() {
								move(dist)
							}
						})(i), n * kAnimationStepDuration);
					}
	
					// change frame src
					setTimeout(function() {
						//var address = '/T{}/svg/' + nextDisplay(-direction);
						var address = nextDisplay(-direction);
	
						iframe.setAttribute('src', address);
					}, n * kAnimationStepDuration);
				}
			}
		});

		webMI.addEvent(rootNode, events.move, function(e) {
			if (dragging) {
				dragDistance = getEventPosition(e) - dragStart,
					delta = Math.abs(dragDistance);

				if (delta > kTresholdDistance) {
					e.preventDefault();
				}

				move((delta > kTresholdDistance) ? dragDistance : 0);
			}
		});
	}

})();
},{"tresholdDistance":"50","swipeAxis":"x"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Alarmmanagement":[function(base,webMI,window,document,self){
Date.prototype.toSortableString = function(_withMS) {
	function _preNull(_nr) {
		if (_nr < 10)
	       return "0" + _nr;
		return _nr;
	}
	var _ret = this.getFullYear() + "-" + _preNull(this.getMonth()+1) + "-" + _preNull(this.getDate()) + " " +
	_preNull(this.getHours()) + ":" + _preNull(this.getMinutes()) + ":" + _preNull(this.getSeconds());
	if (_withMS)
		_ret += "." + this.getMilliseconds();
	return _ret;
};

var alarms = [];

function initializeAlarmmanagement(alarmmanagement) {
	if (alarmmanagement["subscriptionId"] != null){
		alarms.length = 0;
		webMI.data.unsubscribeFilter(alarmmanagement["subscriptionId"]);
	} else {
		webMI.trigger.connect("com.atvise.alarms_items", function(e){
			if (typeof e.value == "function")
				e.value(alarms);
		});

		webMI.trigger.connect("com.atvise.alarms_exist", function(e){
			if (typeof e.value == "function")
				e.value(alarms.length > 0);
		});

		webMI.trigger.connect("com.atvise.alarms_next_display", function(e){
			for (var i in alarms){
				if (alarms[i] != undefined && alarms[i][1] != undefined){
					if ((alarms[i][1]).text == 1 && alarms[i][3] != undefined && alarms[i][3].text != ""){
						webMI.display.openDisplay((alarms[i][3]).text);
						break;
					}
				}
			}
		});
	}

	alarmmanagement["subscriptionId"] = webMI.data.subscribeFilter({ type: ["v:2"] }, function(e) {
		(e.state > 0) ? addAlarmItem(e) : removeAlarmItem(e, true);
		webMI.trigger.fire("com.atvise.alarms_notify_item", e);
	});

	function addAlarmItem(itm) {
		if (itm.state == 1 || itm.state == 3) {
			var datarow = [];
			if (itm.address) {
				datarow.id = itm.address;
				datarow.item = itm;
				datarow[0] = { name: "display", text: itm.display ? itm.display : "" };
				datarow[1] = { name: "status", text: itm.state ? itm.state : -1 };
				datarow[2] = { name: "timestamp", text: itm.timestamp ? new Date(itm.timestamp).toSortableString() : "" };
				datarow[3] = { name: "replaceddisplay", text: itm.display ? webMI.sprintf(itm.display, itm) : "" };
				updateItem(datarow, "id");
				webMI.trigger.fire("com.atvise.alarms_notify", true);
			}
		} else if (itm.state == 2) {
			removeAlarmItem(itm, true);
		}
	};

	function removeAlarmItem(itm,refresh) {
		var datarow = [];
		datarow.id = itm.address;
		removeItem(datarow, "id");
		if (alarms.length < 1) {
			webMI.trigger.fire("com.atvise.alarms_notify", false);
		}
	};

	function updateItem(dataItem, identifier) {
		if (alarms.length > 0) {
			var rowNr = -1;
			var i = alarms.length-1;
			while (i > -1) {
				if (alarms[i] != undefined) {
					if (alarms[i][identifier] != undefined && alarms[i][identifier] == dataItem[identifier]) {
						rowNr = i;
						break;
					}
				}
				i--;
			}
			if (rowNr > -1) {
				alarms = _arrayInsertElement(alarms, rowNr, dataItem, true);
			} else {
				alarms.push(dataItem);
			}
		} else {
			alarms.push(dataItem);
		}
	};

	function removeItem(dataItem, identifier) {
		if (alarms.length > 0) {
			var rowNr = -1;
			var i = alarms.length-1;
			while (i > -1) {
				if (alarms[i] != undefined) {
					if (alarms[i][identifier] != undefined && alarms[i][identifier] == dataItem[identifier]) {
						rowNr = i;
						break;
					}
				}
				i--;
			}
			if (rowNr > -1) {
				alarms.splice(rowNr, 1);
			}
		}
	};

	function _arrayInsertElement(arrayInstance, position, newElement, overwrite) {
		if (arrayInstance.length > 0) {
			if (overwrite) {
				arrayInstance[position] = newElement;
			} else {
				var a = arrayInstance.slice();
				var b = a.splice(position,a.length);
				a[position] = newElement;
				arrayInstance = a.concat(b);
			}
		} else {
			arrayInstance.push(newElement);
		}
		return arrayInstance;
	};
}

if (typeof this.alarmmanagement === "undefined")
	this.alarmmanagement = {"subscriptionId": null};

initializeAlarmmanagement(this.alarmmanagement);
},{}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.Conversion_Var":[function(base,webMI,window,document,self){
var mapping = {
	"Length": {
		"mm":	{"mm":1, "cm":0.1, "dm":0.01, "m":0.001, "km":0.000001, "in":0.0393700787401575, "ft":0.00328083989501312, "yd":0.00109361329833771, "mi":0.000000621371192237334},
		"cm":	{"mm":10, "cm":1, "dm":0.1, "m":0.01, "km":0.00001, "in":0.393700787401575, "ft":0.0328083989501312, "yd":0.0109361329833771, "mi":0.00000621371192237334},
		"dm":	{"mm":100, "cm":10, "dm":1, "m":0.1, "km":0.0001, "in":3.93700787401575, "ft":0.328083989501312, "yd":0.109361329833771, "mi":0.0000621371192237334},
		"m":	{"mm":1000, "cm":100, "dm":10, "m":1, "km":0.001, "in":39.3700787401575, "ft":3.28083989501312, "yd":1.09361329833771, "mi":0.000621371192237334},
		"km":	{"mm":1000000, "cm":100000, "dm":10000, "m":1000, "km":1, "in":39370.0787401575, "ft":3280.83989501312, "yd":1093.61329833771, "mi":0.621371192237334},
		"in":	{"mm":25.4, "cm":2.54, "dm":0.254, "m":0.0254, "km":0.0000254, "in":1, "ft":0.0833333333333333, "yd":0.0277777777777778, "mi":0.0000157828282828283},
		"ft":	{"mm":304.8, "cm":30.48, "dm":3.048, "m":0.3048, "km":0.0003048, "in":12, "ft":1, "yd":0.333333333333333, "mi":0.000189393939393939},
		"yd":	{"mm":914.4, "cm":91.44, "dm":9.144, "m":0.9144, "km":0.0009144, "in":36, "ft":3, "yd":1, "mi":0.000568181818181818},
		"mi":	{"mm":1609344, "cm":160934.4, "dm":16093.44, "m":1609.344, "km":1.609344, "in":63360, "ft":5280, "yd":1760, "mi":1}
	},
	"Area": {
		"mm2":	{"mm2":1, "cm2":0.01, "dm2":0.0001, "m2":0.000001, "km2":0.000000000001, "in2":0.0015500031000062, "ft2":0.0000107639104167097, "yd2":0.00000119599004630108, "mi2":0.000000000000386102158542446},
		"cm2":	{"mm2":100, "cm2":1, "dm2":0.01, "m2":0.0001, "km2":0.0000000001, "in2":0.15500031000062, "ft2":0.00107639104167097, "yd2":0.000119599004630108, "mi2":0.0000000000386102158542446},
		"dm2":	{"mm2":10000, "cm2":100, "dm2":1, "m2":0.01, "km2":0.00000001, "in2":15.500031000062, "ft2":0.107639104167097, "yd2":0.0119599004630108, "mi2":0.00000000386102158542446},
		"m2":	{"mm2":1000000, "cm2":10000, "dm2":100, "m2":1, "km2":0.000001, "in2":1550.0031000062, "ft2":10.7639104167097, "yd2":1.19599004630108, "mi2":0.000000386102158542446},
		"km2":	{"mm2":1000000000000, "cm2":10000000000, "dm2":100000000, "m2":1000000, "km2":1, "in2":1550003100.0062, "ft2":10763910.4167097, "yd2":1195990.04630108, "mi2":0.386102158542446},
		"in2":	{"mm2":645.16, "cm2":6.4516, "dm2":0.064516, "m2":0.00064516, "km2":0.00000000064516, "in2":1, "ft2":0.00694444444444444, "yd2":0.000771604938271605, "mi2":0.000000000249097668605244},
		"ft2":	{"mm2":92903.04, "cm2":929.0304, "dm2":9.290304, "m2":0.09290304, "km2":0.00000009290304, "in2":144, "ft2":1, "yd2":0.111111111111111, "mi2":0.0000000358700642791552},
		"yd2":	{"mm2":836127.36, "cm2":8361.2736, "dm2":83.612736, "m2":0.83612736, "km2":0.00000083612736, "in2":1296, "ft2":9, "yd2":1, "mi2":0.000000322830578512397},
		"mi2":	{"mm2":2589988110336, "cm2":25899881103.36, "dm2":258998811.0336, "m2":2589988.110336, "km2":2.589988110336, "in2":4014489600, "ft2":27878400, "yd2":3097600, "mi2":1}
	},
	"Volume": {
		"mm3":	{"mm3":1, "cm3":0.001, "dm3":0.000001, "m3":0.000000001, "km3":0.000000000000000001, "in3":0.0000610237440947323, "ft3":0.00000003531466672149, "yd3":0.00000000130795061931, "mi3":0.00000000000000000024, "l":0.000001},
		"cm3":	{"mm3":1000, "cm3":1, "dm3":0.001, "m3":0.000001, "km3":0.000000000000001, "in3":0.0610237440947323, "ft3":0.0000353146667214886, "yd3":0.00000130795061931439, "mi3":0.00000000000000023991, "l":0.001},
		"dm3":	{"mm3":1000000, "cm3":1000, "dm3":1, "m3":0.001, "km3":0.000000000001, "in3":61.0237440947323, "ft3":0.0353146667214886, "yd3":0.00130795061931439, "mi3":0.00000000000023991276, "l":1},
		"m3":	{"mm3":1000000000, "cm3":1000000, "dm3":1000, "m3":1, "km3":0.000000001, "in3":61023.7440947323, "ft3":35.3146667214886, "yd3":1.30795061931439, "mi3":0.00000000023991275858, "l":1000},
		"km3":	{"mm3":1000000000000000000, "cm3":1000000000000000, "dm3":1000000000000, "m3":1000000000, "km3":1, "in3":61023744094732.3, "ft3":35314666721.4886, "yd3":1307950619.31439, "mi3":0.239912758578928, "l":1000000000000},
		"in3":	{"mm3":16387.064, "cm3":16.387064, "dm3":0.016387064, "m3":0.000016387064, "km3":0.00000000000001638706, "in3":1, "ft3":0.000578703703703704, "yd3":0.0000214334705075446, "mi3":0.00000000000000393147, "l":0.016387064},
		"ft3":	{"mm3":28316846.592, "cm3":28316.846592, "dm3":28.316846592, "m3":0.028316846592, "km3":0.00000000002831684659, "in3":1728, "ft3":1, "yd3":0.037037037037037, "mi3":0.00000000000679357278, "l":28.316846592},
		"yd3":	{"mm3":764554857.984, "cm3":764554.857984, "dm3":764.554857984, "m3":0.764554857984, "km3":0.00000000076455485798, "in3":46656, "ft3":27, "yd3":1, "mi3":0.00000000018342646506, "l":764.554857984},
		"mi3":	{"mm3":4168181825440580000, "cm3":4168181825440580, "dm3":4168181825440.58, "m3":4168181825.44058, "km3":4.16818182544058, "in3":254358061056000, "ft3":147197952000, "yd3":5451776000, "mi3":1, "l":4168181825440.58},
		"l":	{"mm3":1000000, "cm3":1000, "dm3":1, "m3":0.001, "km3":0.000000000001, "in3":61.0237440947323, "ft3":0.0353146667214886, "yd3":0.00130795061931439, "mi3":0.00000000000023991276, "l":1}
	},
	"Weight": {
		"g":	{"g":1, "dag":0.1, "kg":0.001, "grain":15.4323583529414, "ozm":0.0352739619495804, "lbm":0.00220462262184878},
		"dag":	{"g":10, "dag":1, "kg":0.01, "grain":154.323583529414, "ozm":0.352739718003627, "lbm":0.0220462291469134},
		"kg":	{"g":1000, "dag":100, "kg":1, "grain":15432.3583529414, "ozm":35.2739619495804, "lbm":2.20462262184878},
		"grain":	{"g":0.0647989030841686, "dag":0.00647989030841686, "kg":0.0000647989030841686, "grain":1, "ozm":0.00228571428571429, "lbm":0.000142857142857143},
		"ozm":	{"g":28.3495152079732, "dag":2.83495152079732, "kg":0.0283495152079732, "grain":437.5, "ozm":1, "lbm":0.0624999908478883},
		"lbm":	{"g":453.592309748811, "dag":45.3592309748811, "kg":0.453592309748811, "grain":7000, "ozm":16, "lbm":1}
	},
	"Temperature": {
		"C":	{"C":1, "K":[1,273.15], "F":[1.8,32]},
		"K":	{"C":[1,-273.15], "K":1, "F":[1.8,-459.67]},
		"F":	{"C":[10/18,-160/9], "K":[10/18,459.67/1.8], "F":1}
	},
	"Velocity": {
		"m/s":	{"m/s":1, "km/h":3.6, "ft/s":3.28083989501312, "mph":2.2369362920544},
		"km/h":	{"m/s":0.277777777777778, "km/h":1, "ft/s":0.911344415281423, "mph":0.621371192237334},
		"ft/s":	{"m/s":0.3048, "km/h":1.09728, "ft/s":1, "mph":0.681818181818182},
		"mph":	{"m/s":0.44704, "km/h":1.609344, "ft/s":1.46666666666667, "mph":1}
	},
	"Duration": {
		"sec":	{"sec":1, "min":0.0166666666666667, "hr":0.000277777777777778, "day":0.0000115740740740741, "msec":1000, "usec":1000000, "nsec":1000000000},
		"min":	{"sec":60, "min":1, "hr":0.0166666666666667, "day":0.000694444444444444, "msec":60000, "usec":60000000, "nsec":60000000000},
		"hr":	{"sec":3600, "min":60, "hr":1, "day":0.0416666666666667, "msec":3600000, "usec":3600000000, "nsec":3600000000000},
		"day":	{"sec":86400, "min":1440, "hr":24, "day":1, "msec":86400000, "usec":86400000000, "nsec":86400000000000},
		"msec":	{"sec":0.001, "min":0.0000166666666666667, "hr":0.000000277777777777778, "day":0.0000000115740740740741, "msec":1, "usec":1000, "nsec":1000000},
		"usec":	{"sec":0.000001, "min":0.0000000166666666666667, "hr":0.000000000277777777777778, "day":0.0000000000115740740740741, "msec":0.001, "usec":1, "nsec":1000},
		"nsec":	{"sec":0.000000001, "min":0.0000000000166666666666667, "hr":0.000000000000277777777777778, "day":0.0000000000000115740740740741, "msec":0.000001, "usec":0.001, "nsec":1}
	}
}

/*
* convert methode:
*					liefert im Fehlerfall null zurück.
*					liefert bei erfolgreicher Konvertierung den Umrechnungsfaktor zurück
*/

function convert(sourceUnit,targetUnit,sourceGroup){
	if (targetUnit == "")
		return null;

	try {
		if (mapping.hasOwnProperty(sourceGroup) && mapping[sourceGroup].hasOwnProperty(sourceUnit) && mapping[sourceGroup][sourceUnit].hasOwnProperty(targetUnit))
			return mapping[sourceGroup][sourceUnit][targetUnit];
	} catch (e) {
		console.warn("Conversion could not take part due to wrong parameters.");
		return null;
	}
}

webMI.data.subscribe(base.node, function(e) {
	var result = convert(base.sourceUnit ,base.targetUnit ,base.sourceGroup);
	if (result != null)
		result *=  e.value;
	else
		result = "ERROR";

	webMI.gfx.setText(base.id, result);
});
/*
return {
	convert: result
};*/
},{"sourceGroup":"Length","sourceUnit":"m","targetUnit":"mm"}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.SecurityControl":[function(base,webMI,window,document,self){
/* implement user rights security check

*/
var n ;
/*

function(idNode, login, rights, visible, hidden){

}

if (value == false)
	webMI.gfx.setVisible("configuration", false); 
	webMI.gfx.setVisible("icon_configuration", false);
	webMI.gfx.setVisible("bck_configuration", false);
if (value == true)
	webMI.gfx.setVisible("configuration", true);
	webMI.gfx.setVisible("icon_configuration", true);
	webMI.gfx.setVisible("bck_configuration", true);
*/
},{}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Acknowledge Alarm":[function(base,webMI,window,document,self){
// This Quick Dynamic acknowledges the defined alarm depending on one of the events defined by "onEvent".
// Parameters:
//	alarm:		alarm which will be acknowledged
//	onEvent:	the event triggering this Quick Dynamic, which is one of the following:
//		click:		mouse click
//		dblclick:	double click of mouse button
//		mousedown:	press down the mouse button
//		mouseup:	release the mouse button
//		muuseover:	move the mouse cursor over the applied graphical element
//		mousemove:	move the mouse anywhere over the applied graphical element
//		mouseout:	move the mouse cursor out of the applied graphical element

webMI.addEvent(base.id, base.onEvent, function(e) {
	webMI.alarm.accept(base.alarm);
});
},{"alarm":"","onEvent":"click"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Open Context Menu":[function(base,webMI,window,document,self){
var styleDefaults = { fontFamily: "Open Sans", fontSize: base.fontSize, fontFill: "#647A8F", width: parseInt(base.minWidth,84), fill: "#FFFFFF", stroke: "#000000", strokeWidth: 0, hoverFill: "#EFEFEF", closeTime: 0 };

function getFn(val) {
	return function() {
		if (base.trigger != undefined) {
			webMI.trigger.fire(base.trigger, val);
		}
		if (base.outputNode != "") {
			webMI.data.write(base.outputNode, val);
		}
		var p = webMI.gfx.createPoint(base.x,base.y).matrixTransform(webMI.gfx.getScreenCTM());
		webMI.display.showPopup(p.x, p.y, null);
	};
}
function closeContextMenu(){
	webMI.display.showPopup(0, 0, null);
}
function openContextMenu(){
	if (!base.active || base.active()) {
		var p = webMI.gfx.createPoint(base.x,base.y).matrixTransform(webMI.gfx.getScreenCTM());
		if (base.menuObj && typeof base.menuObj == "function"){ //showPopup in callback
			base.menuObj(function(tempObj){
				tempObj.style = styleDefaults;
				tempObj.itemsCount = base.itemsCount;
				webMI.display.showPopup(p.x, p.y, tempObj);
			});
		}
		else {
			webMI.display.showPopup(p.x, p.y, tempObj);
		}
	}
}

var tempObj = {};
if (base.menuObj != undefined && typeof base.menuObj == "object") {
	tempObj = base.menuObj;
	tempObj.style = styleDefaults;
	tempObj.itemsCount = base.itemsCount;
} else if (base.menuObj != undefined && typeof base.menuObj == "function") {
	//tempObj calculate dinamically in Event
} else {
	tempObj = { style: styleDefaults, itemsCount: base.itemsCount };
	var texts = [base.key1, base.key2, base.key3, base.key4, base.key5];
	var textvals = [base.value1, base.value2, base.value3, base.value4, base.value5];
	for (var i=0; i<5; i++) {
		if (texts[i] != undefined && textvals[i] != undefined) {
			tempObj[i] = { text: texts[i], value: getFn(textvals[i]) };
		}
	}
}
if (base.onEvent == "immediately" && base.id != ""){
	openContextMenu();
} else if (base.onEvent == "immediately" && base.id == ""){
	closeContextMenu();
} else {
	webMI.addEvent(base.id, base.onEvent,openContextMenu);
}
webMI.addOnunload(closeContextMenu);
},{"onEvent":"click","itemsCount":"0","fontSize":"16","minWidth":"85"}],
"SYSTEM.LIBRARY.PROJECT.QUICKDYNAMICS.Open Context Menu":[function(base,webMI,window,document,self){
/*

Open Context Menu QD
Fixes some bugs occuring in the standard implementation

*/

function styleDefaults() { 
	return {
		fontFamily: window.theme ? window.theme.getValue('FontFamily') : 'Open Sans', 
		fontSize: base.fontSize, 
		fontFill: window.theme.getValue('ControlTextColor'),
		width: parseInt(base.minWidth,10), 
		fill: window.theme.getValue('ControlActiveBackgroundColor'), 
		stroke: window.theme.getValue('ControlTintColor'),
		strokeWidth: 0, 
		hoverFill: window.theme.getValue('ControlBackgroundColor'),
		closeTime: 0 
	}
};

function getFn(val) {wen
	return function() {
		if (base.trigger != undefined) {
			webMI.trigger.fire(base.trigger, val);
		}
		if (base.outputNode != "") {
			webMI.data.write(base.outputNode, val);
		}
		var p = webMI.gfx.createPoint(base.x,base.y).matrixTransform(webMI.gfx.getScreenCTM());
		webMI.display.showPopup(p.x, p.y, null);
	};
}
function closeContextMenu(){
	webMI.display.showPopup(0, 0, null);
}
function openContextMenu(){
	if (!base.active || base.active()) {
		var p = webMI.gfx.createPoint(base.x,base.y).matrixTransform(webMI.gfx.getScreenCTM());
		if (base.menuObj && typeof base.menuObj == "function"){ //showPopup in callback
			base.menuObj(function(tempObj){
				tempObj.style = styleDefaults();
				tempObj.itemsCount = base.itemsCount;
				webMI.display.showPopup(p.x, p.y, tempObj);
			});
		}
		else {
			webMI.display.showPopup(p.x, p.y, tempObj);
		}
	}
}

var tempObj = {};
if (base.menuObj != undefined && typeof base.menuObj == "object") {
	tempObj = base.menuObj;
	tempObj.style = styleDefaults();
	tempObj.itemsCount = base.itemsCount;
} else if (base.menuObj != undefined && typeof base.menuObj == "function") {
	//tempObj calculate dinamically in Event
} else {
	tempObj = { style: styleDefaults(), itemsCount: base.itemsCount };
	var texts = [base.key1, base.key2, base.key3, base.key4, base.key5];
	var textvals = [base.value1, base.value2, base.value3, base.value4, base.value5];
	for (var i=0; i<5; i++) {
		if (texts[i] != undefined && textvals[i] != undefined) {
			tempObj[i] = { text: texts[i], value: getFn(textvals[i]) };
		}
	}
}
if (base.onEvent == "immediately" && base.id != ""){
	openContextMenu();
} else if (base.onEvent == "immediately" && base.id == ""){
	closeContextMenu();
} else {
	webMI.addEvent(base.id, base.onEvent,openContextMenu);
}
webMI.addOnunload(closeContextMenu);
},{"onEvent":"click","itemsCount":"0","fontSize":"12","minWidth":"180"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Consistency Handler":[function(base,webMI,window,document,self){
if (typeof this.data === "undefined") {
	this.data = { "groups": {}, "storage": [] };

	webMI.trigger.connect("com.atvise.switchedlanguage", function(e) {
		data.groups = {};
		data.storage = [];
	});
}

var data = this.data;

function register(group, address, update) {
	if (!data.groups[group])
		data.groups[group] = [];

	data.groups[group].push({ "address": address, "update": update });
}

function set(group, address, value) {
	if (data.groups[group]) {
		for (var i = 0; i < data.groups[group].length; i++) {
			if (data.groups[group][i].address == address)
				data.groups[group][i].value = value;
		}
	}
}

function read(group) {
	var addresses = [];
	var entries = [];

	for (var i in data.groups) {
		if (i == group || !group) {
			for (var j = 0; j < data.groups[i].length; j++) {
				addresses.push(data.groups[i][j].address);
				entries.push(data.groups[i][j]);
			}
		}
	}

	webMI.data.read(addresses, function(e) {
		for (var i = 0; i < entries.length; i++) {
			entries[i].value = e[i].value;
			entries[i].update(e[i].value);
		}
	});
}

function write(group) {
	if (data.groups[group]) {
		var addresses = [];
		var values = [];

		for (var i = 0; i < data.groups[group].length; i++) {
			addresses.push(data.groups[group][i].address);
			values.push(data.groups[group][i].value);
		}

		webMI.data.write(addresses, values);
	}
}

function renew() {
	data.groups = {};
	data.storage = [];
}

function push() {
	data.storage.push(data.groups);
}

function pop() {
	data.groups = data.storage.pop();
}

return {
	"register": register,
	"set": set,
	"read": read,
	"write": write,
	"renew": renew,
	"push": push,
	"pop": pop
}
},{}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Change Color by Node":[function(base,webMI,window,document,self){
// This Quick Dynamics changes the color and stroke of the applied graphical element depending whether or not the value of the node is within the defined range.
// Parameters:
//	nodeId:			this node (value within or out of the defined range) triggers this Quick Dynamic
//	minRange:		lower bound of the range where the node's value should lie in
//	maxRange:		upper bound of the range where the node's value should lie in; if not specified it will be set to "minRange", i.e. the quick dynamic will be triggered at a
//					discrete value (minRange=maxRange=value) only and not for a range
//	fillInRange:	this fill color of the graphical element will be set when value of the node is within the defined range
//	strokeInRange:	this stroke color of the graphical element will be set when value of the node is within the defined range
//	fillOutRange:	this fill color of the graphical element will be set when value of the node is out of the defined range
//	strokeOutRange:	this stroke color of the graphical element will be set when value of the node is out of the defined range

webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;

	if (String(base.maxRange) == "") {
		var maxRange=base.minRange; // If no maxRange is specified, the color will only be changed at a discrete value (value = minRange = maxRange)
	} else {
		var maxRange = parseFloat(base.maxRange);
	}
	if (value >= base.minRange && value <= maxRange) {
		webMI.gfx.setFill(base.id, base.fillInRange);
		webMI.gfx.setStroke(base.id, base.strokeInRange);
	}
	else {
		webMI.gfx.setFill(base.id, base.fillOutOfRange);
		webMI.gfx.setStroke(base.id, base.strokeOutOfRange);
	}
});
},{"nodeId":"","minRange":"0","maxRange":"","fillInRange":"#00ff00","strokeInRange":"#000000","fillOutOfRange":"#ff0000","strokeOutOfRange":"#000000"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Change Color by Alarm":[function(base,webMI,window,document,self){
// This Quick Dynamic changes the color and stroke of the applied graphical element depending on the different alarm states.
// Parameters:
//	alarm:						alarm (node) which will trigger this Quick Dynamic
//	alarmOnFill:				color to fill the graphical element in case an alarm occurs
//	alarmOnStroke:				color for the stroke of the graphical element in case an alarm occurs
//	alarmOffFill:				fill color of the graphical element to set it back to the original state when the alarm is off acknowledged
//	alarmOffStroke:				stroke color of the graphical element to set it back to the original state when the alarm is off acknowledged
//	blinkOnUnacknowledged:		flash interval for alarm state "on unacknowledged"
//	blinkOnAcknowledged:		flash interval for alarm state "on acknowledged"
//	blinkOffUnacknowledged:		flash interval for alarm state "off unacknowledged"
//	blinkOnOffUnacknowledged:	flash interval for alarm state "on off unacknowledged"

/*
var alarm = webMI.query["alarm"];
var alarmOnFill = webMI.query["alarmOnFill"];
var alarmOnStroke = webMI.query["alarmOnStroke"];
var alarmOffFill = webMI.query["alarmOffFill"];
var alarmOffStroke = webMI.query["alarmOffStroke"];
var blinkOnUnacknowledged = webMI.query["blinkOnUnacknowledged"];
var blinkOnAcknowledged = webMI.query["blinkOnAcknowledged"];
var blinkOffUnacknowledged = webMI.query["blinkOffUnacknowledged"];
var blinkOnOffUnacknowledged = webMI.query["blinkOnOffUnacknowledged"];
*/


webMI.alarm.subscribe(base.alarm, function(e) {
	var value = e.state;
	var flash250 = {0:base.alarmOnStroke,1:base.alarmOffStroke,2:base.alarmOnStroke,3:base.alarmOffStroke,4:base.alarmOnStroke,5:base.alarmOffStroke,6:base.alarmOnStroke,7:base.alarmOffStroke,8:base.alarmOnStroke,9:base.alarmOffStroke,10:base.alarmOnStroke,11:base.alarmOffStroke};
	var flash500 = {0:base.alarmOnStroke,2:base.alarmOffStroke,4:base.alarmOnStroke,6:base.alarmOffStroke,8:base.alarmOnStroke,10:base.alarmOffStroke};
	var flash750 = {0:base.alarmOnStroke,3:base.alarmOffStroke,6:base.alarmOnStroke,9:base.alarmOffStroke};
	var flash1500 = {0:base.alarmOnStroke,6:base.alarmOffStroke};


	switch (value) {
		case 1 : // blinkOnUnacknowledged
			webMI.gfx.setFill(base.id, base.alarmOnFill);
			switch (base.blinkOnUnacknowledged)
			{
				case "visible": webMI.gfx.setVisible(base.id, null); break;
				case "invisible": webMI.gfx.setVisible(base.id, false); break;
				case "Flash every 250ms" : webMI.gfx.setStroke(base.id, flash250); break;
				case "Flash every 500ms" : webMI.gfx.setStroke(base.id, flash500); break;
				case "Flash every 750ms" : webMI.gfx.setStroke(base.id, flash750); break;
				case "Flash every 1500ms" : webMI.gfx.setStroke(base.id, flash1500); break;
			}
			break;
		case 2 : // blinkOnAcknowledged
			webMI.gfx.setFill(base.id, base.alarmOnFill);
			switch (base.blinkOnAcknowledged)
			{
				case "visible": webMI.gfx.setVisible(base.id, null); break;
				case "invisible": webMI.gfx.setVisible(base.id, false); break;
				case "Flash every 250ms" : webMI.gfx.setStroke(base.id, flash250); break;
				case "Flash every 500ms" : webMI.gfx.setStroke(base.id, flash500); break;
				case "Flash every 750ms" : webMI.gfx.setStroke(base.id, flash750); break;
				case "Flash every 1500ms" : webMI.gfx.setStroke(base.id, flash1500); break;
			}
			break;
		case 3 : // blinkOffUnacknowledged
			webMI.gfx.setFill(base.id, base.alarmOnFill);
			switch (base.blinkOffUnacknowledged)
			{
				case "visible": webMI.gfx.setVisible(base.id, null); break;
				case "invisible": webMI.gfx.setVisible(base.id, false); break;
				case "Flash every 250ms" : webMI.gfx.setStroke(base.id, flash250); break;
				case "Flash every 500ms" : webMI.gfx.setStroke(base.id, flash500); break;
				case "Flash every 750ms" : webMI.gfx.setStroke(base.id, flash750); break;
				case "Flash every 1500ms" : webMI.gfx.setStroke(base.id, flash1500); break;
			}
			break;
		case 5 : // blinkOnOffUnacknowledged
			webMI.gfx.setFill(base.id, base.alarmOnFill);
			switch (base.blinkOnOffUnacknowledged)
			{
				case "visible": webMI.gfx.setVisible(base.id, null); break;
				case "invisible": webMI.gfx.setVisible(base.id, false); break;
				case "Flash every 250ms" : webMI.gfx.setStroke(base.id, flash250); break;
				case "Flash every 500ms" : webMI.gfx.setStroke(base.id, flash500); break;
				case "Flash every 750ms" : webMI.gfx.setStroke(base.id, flash750); break;
				case "Flash every 1500ms" : webMI.gfx.setStroke(base.id, flash1500); break;
			}
			break;
		default: // off acknowledged
			webMI.gfx.setFill(base.id,base.alarmOffFill);
			webMI.gfx.setStroke(base.id,base.alarmOffStroke);
			break;
	}
});
},{"alarm":"","alarmOnFill":"","alarmOnStroke":"","alarmOffFill":"","alarmOffStroke":"","blinkOnUnacknowledged":"Flash every 250ms","blinkOnAcknowledged":"Flash every 500ms","blinkOffUnacknowledged":"Flash every 750ms","blinkOnOffUnacknowledged":"Flash every 1500ms"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Change Stroke by Node":[function(base,webMI,window,document,self){
// This Quick Dynamic changes the stroke of the applied graphical element depending whether or not the value of the node is within the defined range.
// Parameters:
//	nodeId:					this node (value within or out of the defined range) triggers this Quick Dynamic
//	minRange:				lower bound of the range where the node's value should lie in
//	maxRange:				upper bound of the range where the node's value should lie in; if not specified it will be set to "minRange", i.e. the quick dynamic will be triggered at a
//							discrete value (minRange=maxRange=value) only and not for a range
//	strokeStyleInRange:		this stroke style of the graphical element will be set when the value of the node is within the defined range
//	strokeColorInRange:		this stroke color of the graphical element will be set when the value of the node is within the defined range
//	strokeWidthInRange:		this stroke width of the graphical element will be set when the value of the node is within the defined range
//	strokeOpacityInRange:	this stroke opacity of the graphical element will be set when the value of the node is within the defined range
//	strokeStyleOutRange:	this stroke style of the graphical element will be set when the value of the node is out of the defined range
//	strokeColorOutRange:	this stroke color of the graphical element will be set when the value of the node is out of the defined range
//	strokeWidthOutRange:	this stroke width of the graphical element will be set when the value of the node is out of the defined range
//	strokeOpacityOutRange:	this stroke opacity of the graphical element will be set when the value of the node is out of the defined range

webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;

	if (String(base.maxRange) == "") {
		var maxRange=base.minRange; // If no maxRange is specified, the stroke will be changed at any value except at the value that coincides with the value of the minRange. (minRange = maxRange = value)
	} else {
		var maxRange = parseFloat(base.maxRange);
	}
	if (value >= base.minRange && value <= maxRange) {
		webMI.gfx.setStroke(base.id, base.strokeColorInRange);
		webMI.gfx.setStrokeOpacity(base.id, base.strokeOpacityInRange);
		webMI.gfx.setStrokeWidth(base.id, base.strokeWidthInRange);
		webMI.gfx.setStrokeDasharray(base.id, base.strokeStyleInRange);
	}
	else {
		webMI.gfx.setStroke(base.id, base.strokeColorOutRange);
		webMI.gfx.setStrokeOpacity(base.id, base.strokeOpacityOutRange);
		webMI.gfx.setStrokeWidth(base.id, base.strokeWidthOutRange);
		webMI.gfx.setStrokeDasharray(base.id, base.strokeStyleOutRange);
	}
});
},{"minRange":"0","strokeColorInRange":"#00ff00","strokeWidthInRange":"1","strokeOpacityInRange":"1","strokeColorOutRange":"#aa0000","strokeWidthOutRange":"2","strokeOpacityOutRange":"1"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Change Display by Node":[function(base,webMI,window,document,self){
// This Quick Dynamic opens a new display if the value of the node defined by "nodeId" lies within the range defined by "minRange" and "maxRange".
// Parameters:
//	nodeId:		node triggering this Quick Dynamic
//	minRange:	lower bound of the range where the node's value should lie in
//	maxRange:	upper bound of the range where the node's value should lie in; if not specified it will be set to "minRange", i.e. the quick dynamic will be triggered at a
//				discrete value (minRange=maxRange=value) only and not for a range
//	Display:	the display which shall be opened

webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;

	if (String(base.maxRange) == "") {
		var maxRange=base.minRange; // If no maxRange is specified, the Display will only be opened at a discrete value (value = minRange = maxRange)
	} else {
		var maxRange = parseFloat(base.maxRange);
	}
	if (value >= base.minRange && value <= maxRange) {
		webMI.display.openDisplay(base.display, {});
	}
});
},{"nodeId":"","minRange":"0","maxRange":"","display":""}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Change Display on Event":[function(base,webMI,window,document,self){
// This Quick Dynamic opens a new display depending on one of the events defined by "onEvent".
// Parameters:
//	display:	display which will be opened
//	onEvent:	the event triggering this Quick Dynamic, which is one of the following:
//		click:		mouse click
//		dblclick:	double click of mouse button
//		mousedown:	press down the mouse button
//		mouseup:	release the mouse button
//		muuseover:	move the mouse cursor over the applied graphical element
//		mousemove:	move the mouse anywhere over the applied graphical element
//		mouseout:	move the mouse cursor out of the applied graphical element

webMI.addEvent(base.id, base.onEvent, function(e) {
	webMI.display.openDisplay(base.display, {});
});
},{"display":"","onEvent":"click"}],
"SYSTEM.LIBRARY.ATVISE.QUICKDYNAMICS.Change Visibility and Blinking":[function(base,webMI,window,document,self){
// This Quick Dynamic changes the visibility (including flashing) of the applied graphical element if the value of the node defined by "nodeId" lies within or out of the range defined
// by "minRange" and "maxRange".
// Parameters:
//	nodeId:					node triggering this Quick Dynamic
//	minRange:				lower bound of the range where the node's value should lie in
//	maxRange:				upper bound of the range where the node's value should lie in; if not specified it will be set to "minRange", i.e. the quick dynamic will be triggered at a
//							discrete value (minRange=maxRange=value) only and not for a range
//	VisibilityBelowRange:	visibility to be set if the node's value is below the defined range; can be "Visible", "Invisible" or one of the specified flash rates
//	VisibilityInRange:		visibility to be set if the node's value is within the defined range; can be "Visible", "Invisible" or one of the specified flash rates
//	VisibilityAboveRange:	visibility to be set if the node's value is above the defined range; can be "Visible", "Invisible" or one of the specified flash rates

webMI.data.subscribe(base.nodeId, function(e) {
	var value = e.value;
	var flash250 = {0:true,1:false,2:true,3:false,4:true,5:false,6:true,7:false,8:true,9:false,10:true,11:false};
	var flash500 = {0:true,2:false,4:true,6:false,8:true,10:false};
	var flash750 = {0:true,3:false,6:true,9:false};
	var flash1500 = {0:true,6:false};
	var maxRange = 0;

	if (String(base.maxRange) == "") {
		maxRange=base.minRange; // If no maxRange is specified, the visibility will only be changed at a discrete value (value = minRange = maxRange)
	} else {
		maxRange = parseFloat(base.maxRange);
	}

	if (value < base.minRange && String(base.VisibilityBelowRange) != "") {
		switch (base.VisibilityBelowRange)
		{
			case "Visible" : webMI.gfx.setVisible(base.id, true); break;
			case "Flash every 250ms" : webMI.gfx.setVisible(base.id, flash250); break;
			case "Flash every 500ms" : webMI.gfx.setVisible(base.id, flash500); break;
			case "Flash every 750ms" : webMI.gfx.setVisible(base.id, flash750); break;
			case "Flash every 1500ms" : webMI.gfx.setVisible(base.id, flash1500); break;
			case "Invisible" : webMI.gfx.setVisible(base.id, false); break;
		}
	}
	if (value >= base.minRange && value <= maxRange && String(base.VisibilityInRange) != "") {
		switch (base.VisibilityInRange)
		{
			case "Visible" : webMI.gfx.setVisible(base.id, true); break;
			case "Flash every 250ms" : webMI.gfx.setVisible(base.id, flash250); break;
			case "Flash every 500ms" : webMI.gfx.setVisible(base.id, flash500); break;
			case "Flash every 750ms" : webMI.gfx.setVisible(base.id, flash750); break;
			case "Flash every 1500ms" : webMI.gfx.setVisible(base.id, flash1500); break;
			case "Invisible" : webMI.gfx.setVisible(base.id, false); break;
		}
	}
	if (value > maxRange && String(base.VisibilityAboveRange) != "") {
		switch (base.VisibilityAboveRange)
		{
			case "Visible" : webMI.gfx.setVisible(base.id, true); break;
			case "Flash every 250ms" : webMI.gfx.setVisible(base.id, flash250); break;
			case "Flash every 500ms" : webMI.gfx.setVisible(base.id, flash500); break;
			case "Flash every 750ms" : webMI.gfx.setVisible(base.id, flash750); break;
			case "Flash every 1500ms" : webMI.gfx.setVisible(base.id, flash1500); break;
			case "Invisible" : webMI.gfx.setVisible(base.id, false); break;
		}
	}
});
},{"nodeId":"","minRange":"","maxRange":"","VisibilityBelowRange":"Flash every 500ms","VisibilityInRange":"Visible","VisibilityAboveRange":"Flash every 1500ms"}]}};project.quickdynamics=project.extensions;
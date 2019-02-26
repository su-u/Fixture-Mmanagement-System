var ID_COLUMN = 2;
var STATE_COLUM = 6;
var NAME = 7;
var PURPOSE = 8;
var RETURN_DATE = 9;

function doGet(e) {
    var html = HtmlService.createTemplateFromFile('List.html');
    if (e.parameter.id == undefined) {
    
    } else if(e.parameter.pages == "action"){
      if(e.parameter.action == "doUse"){
          doUseAction(e.parameter.id, e.parameter.action, e.parameter.name, e.parameter.purpose, e.parameter.date);
      }else if(e.parameter.action == "doUnUse"){
          doUnUseAction(e.parameter.id, e.parameter.action, e.parameter.place);
      }
        var data = getData(e.parameter.id, ID_COLUMN)
        var html = getUserForm(data[0][5]);
        html.data = data;
        html.stateClass = getStateClassName(data[0][5]);
        html.id = data[0][1];

    } else {
        var data = getData(e.parameter.id, ID_COLUMN)
        var html = getUserForm(data[0][5]);
        html.data = data;
        html.stateClass = getStateClassName(data[0][5]);
        html.id = data[0][1];
    }
    return html.evaluate();
}

function getSheet(sheetName){
    var ssId =　PropertiesService.getScriptProperties().getProperty('SSID');
    var ss = SpreadsheetApp.openById(ssId);
    var values = ss.getSheetByName(sheetName);
  　return values;
}

function getList() { 
    return getSheet();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function findRow(val, col, data) {
    for (var i = 1; i < data.length; i++) {
        if (data[i][col - 1] === val) {
          Logger.log(i)
            return  i;
        }
    }
    return 0;
}



function getData(val, col){
    const spcol = 6;
    var sheet = getSheet("シート1");
    var data = sheet.getDataRange().getValues();
    var i = findRow(val, col, data);
    return sheet.getRange(i + 1, 1, 1, spcol).getValues();
}

function doUseAction(val, state, name, purpose, date){
    var sheet = getSheet("シート1");
    var data = sheet.getDataRange().getValues();
  
    var i = findRow(val, ID_COLUMN, data);
    var data =  [[StateReverseString(state), name, purpose, date,""]];
    sheet.getRange( i + 1, STATE_COLUM, 1, 5 ).setValues(data);
}

function doUnUseAction(val, state, place){
    var sheet = getSheet("シート1");
    var data = sheet.getDataRange().getValues();
  
    var i = findRow(val, ID_COLUMN, data);
    var data =  [[StateReverseString(state), "", "", "", place]];
    sheet.getRange( i + 1, STATE_COLUM, 1, 5 ).setValues(data);
}

function StateReverseString(state){
    if(state == "doUse"){
        return "使用中";
    }else if(state == "doUnUse"){
        return "未使用";
    }
}

function getStateClassName(state) {
    if (state == "使用中") {
        return "using"
    } else {
        return "unusing"
    }
}

function getUserForm(state){
    if (state == "使用中") {
        return HtmlService.createTemplateFromFile("Id-unuse.html");
    } else {
        return HtmlService.createTemplateFromFile("Id-use.html");
    }
}


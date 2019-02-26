var ID_COLUMN = 2
var STATE_COLUM = 6

function doGet(e) {
    var html = HtmlService.createTemplateFromFile('List.html');
    if (e.parameter.id == undefined) {
    
    } else if(e.parameter.pages == "action"){
        doAction(e.parameter.id, ID_COLUMN, e.parameter.action);
        html = HtmlService.createTemplateFromFile('Id.html');
        var data = getData(e.parameter.id, ID_COLUMN)
        html.data = data;
        html.stateClass = getStateClassName(data[0][5])

    } else {
        html = HtmlService.createTemplateFromFile('Id.html');
        var data = getData(e.parameter.id, ID_COLUMN)
        html.data = data;
        html.stateClass = getStateClassName(data[0][5])
    }
    return html.evaluate();
}

function doPost(e){
    if (e.parameter.name == undefined) {
        //返却申請
        doUnUse();
    } else {
        //借用申請
        doUse();
    }

    var html = HtmlService.createTemplateFromFile('Id.html');
    var data = getData(e.parameter.id, ID_COLUMN)
    html.data = data;
    html.stateClass = getStateClassName(data[0][5])
    return html.evaluate();
}

function getList() { 
    var ssId =　PropertiesService.getScriptProperties().getProperty('SSID');
    var ss = SpreadsheetApp.openById(ssId);
    var sheetName = 'シート1';
    var values = ss.getSheetByName(sheetName).getDataRange().getValues();

    return values;
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function findRow(val, col) {
    var ssId =　PropertiesService.getScriptProperties().getProperty('SSID');
    var ss = SpreadsheetApp.openById(ssId);
    var sheetName = 'シート1';
    var sheet = ss.getSheetByName(sheetName);
    var dat = sheet.getDataRange().getValues();

    for (var i = 1; i < dat.length; i++) {
        if (dat[i][col - 1] === val) {
          Logger.log(i)
            return  i;
        }
    }
    return 0;
}

function doUse(){

}

function doUnUse(){

}

function getData(val, col){
    const spcol = 6;
    var ssId =　PropertiesService.getScriptProperties().getProperty('SSID');
    var ss = SpreadsheetApp.openById(ssId);
    var sheetName = 'シート1';
    var sheet = ss.getSheetByName(sheetName);
    var dat = sheet.getDataRange().getValues();
    var i = findRow(val, col);
    return sheet.getRange(i + 1, 1, 1, spcol).getValues();
}

function doAction(val, col, state){
    var i = findRow(val, col);
    var ssId =　PropertiesService.getScriptProperties().getProperty('SSID');
    var ss = SpreadsheetApp.openById(ssId);
    var sheetName = 'シート1';
    var sheet = ss.getSheetByName(sheetName);
    sheet.getRange( i + 1, STATE_COLUM, 1, 1 ).setValue(StateString(state));
}


function StateString(state){
    if(state == "use"){
        return "使用中";
    }else{
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
        return HtmlService.createHtmlOutputFromFile("unuse.html").getContent();
    } else {
        return HtmlService.createHtmlOutputFromFile("use.html").getContent();
    }  
}
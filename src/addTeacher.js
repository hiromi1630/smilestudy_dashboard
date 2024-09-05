export default function addTeacher(data){
    const spreadsheet_id = GoogleAppsScript.Properties.PropertiesService.getScriptProperties().getProperty("spreadsheet_id");
    const spreadsheet = SpreadsheetApp.openById(spreadsheet_id);
    const sheet_teacher = spreadsheet.getSheetByName("teachers");
}
function addTeacher(data){
    const spreadsheet_id = PropertiesService.getScriptProperties().getProperty("spreadsheet_id");
    const spreadsheet = SpreadsheetApp.openById(spreadsheet_id);
    const sheet_teacher = spreadsheet.getSheetByName("teachers");
    const uuid = Utilities.getUuid();
    sheet_teacher.appendRow([uuid, data.family_name+data.given_name, data.family_name, data.given_name, data.color, 0, 0]);
}
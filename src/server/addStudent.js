function addStudent(data){
    const spreadsheet_id = PropertiesService.getScriptProperties().getProperty("spreadsheet_id");
    const spreadsheet = SpreadsheetApp.openById(spreadsheet_id);
    const sheet_student = spreadsheet.getSheetByName("students");
    const sheet_classroom = spreadsheet.getSheetByName("classrooms");
    const student_uuid = Utilities.getUuid();
    const classroom_uuid = Utilities.getUuid();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    var fiscal_year = year;
    if(month < 4){
        fiscal_year--;
    }
    // offset_year: 今の年度-学年
    const offset_year = fiscal_year - data.grade;
    sheet_student.appendRow([student_uuid, data.name, offset_year, data.comiru]);
    sheet_classroom.appendRow([classroom_uuid, data.name, student_uuid]);
}
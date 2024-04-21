function doGet(e) {
    const sheet = "image";
    
    var sheet = SpreadsheetApp.getActive().getSheetByName(sheet)
    const lastRow = sheet.getLastRow()
    const lastColumn = sheet.getLastColumn()

    //sheet data into array
    var rng = sheet.getRange(1, 1, lastRow, lastColumn)
    var vals = rng.getValues()

    //change value from array into object
    convert_to_object = (array) => {
        const [headers, ...data] = array;

        const Object = data.map(row => {
            return row.reduce((acc, value, i) => {
                const key = headers[i];
                // console.log({...acc});
                if (key === '') return acc;
                return {
                    ...acc,
                    [key]: value
                };
            }, {});
        });
        return Object
    }
    let cell = sheet.getRange("K13").getValue()
    const data = {
      //"time": currenttime(),
      //"latest_data": currenttime(),
        "cell": lastColumn,
        "data": convert_to_object(vals)
    }

    Logger.log(data)
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

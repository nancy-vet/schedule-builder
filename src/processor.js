const createWorksheet = (workbook, content, tableMap, title) => {

    const worksheet = workbook.addWorksheet(title);

    worksheet.addRows(tableMap);
    
    const columnHeader = [
        { header: '', key: '', width: 20 }
    ];
    
    for(let i = 0; i < getTotalWorkPersonelCount(content); i++) {
    
        columnHeader.push({
            header: '', key: '', width: 40
        });
    }
    
    worksheet.columns = columnHeader;
    
    worksheet.eachRow((row, rowNumber) => {
    
        row.height = 20;
    
        let colorThisRow = false;
        row.eachCell((cell, colNumber) => {

            if(['08:00', '09:00','10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00'].includes(cell.value)) {
                colorThisRow = true;

                cell.font = {
                    size: 16
                }

            }

            if(['12:30', '13:00','13:30', '14:00', '14:30', '15:00', '15:30'].includes(cell.value)) {
                colorThisRow = false;
            }

            if(['08:30', '09:30','10:30', '11:30', '12:30', '15:30', '16:30', '17:30', '18:30', '19:30'].includes(cell.value)) {

                cell.font = {
                    size: 14
                }

                colorThisRow = false;
            }
            
            //if(colorThisRow) {
                cell.fill = {
                    type    : 'pattern',
                    pattern : 'solid',
                    fgColor : {argb:'F4CCCC'}
                    // fgColor : {argb:'CFE2F3'},
                };
            //}
    
    
            if(cell.value == 'обедна почивка') {

                cell.fill = {
                    type    : 'pattern',
                    pattern : 'solid',
                    fgColor : {argb:'E06666'},
                };
            }

            if(['първа', 'втора', 'междинка'].includes(cell.value)) {

                cell.fill = {
                    type    : 'pattern',
                    pattern : 'solid',
                    fgColor : {argb:'D9D9D9'},
                };

                cell.font = { 
                    bold: true 
                };
            } 

    
            cell.alignment = {
                horizontal  : 'center',
                vertical    : 'middle'
            };
        
            cell.border = {
                top     : { style: 'thin', color: { argb: '00000000' } },
                left    : { style: 'thin', color: { argb: '00000000' } },
                bottom  : { style: 'thin', color: { argb: '00000000' } },
                right   : { style: 'thin', color: { argb: '00000000' } }
            };
        });
    });
}
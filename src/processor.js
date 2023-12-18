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
    
        row.eachCell((cell, colNumber) => {
    
    
            if(cell.value == 'обедна почивка') {

                cell.fill = {
                    type    : 'pattern',
                    pattern : 'solid',
                    fgColor : {argb:'F9CB9C'},
                };
            }

            if(cell.value == 'първа' || cell.value == 'втора' || cell.value == 'междиннка') {

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
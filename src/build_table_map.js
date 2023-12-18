const buildSheduleRow = (index, tableRecord) => {

    const row = [];

    if([0 ,7  ,14  ,21  ].includes(index)) row.push('Понеделник');
    if([1 ,8  ,15  ,22  ].includes(index)) row.push('Вторник'   );
    if([2 ,9  ,16  ,23  ].includes(index)) row.push('Сряда'     );
    if([3 ,10 ,17  ,24  ].includes(index)) row.push('Четвъртък' );
    if([4 ,11 ,18  ,25  ].includes(index)) row.push('Петък'     );
    if([5 ,12 ,19  ,26  ].includes(index)) row.push('Събота'    );
    if([6 ,13 ,20  ,27  ].includes(index)) row.push('Недебя'    );

    for(const record of tableRecord.collection) {

        if(record.workRelation == '1') row.push('първа');
        if(record.workRelation == '2') row.push('втора');
        if(record.workRelation == 'M' || record.workRelation == 'М') row.push('междиннка');
    }

    return row;
}

const buildHeaderRow = (tableRecord) => {

    const row = [];
    row.push(tableRecord.index);
    
    for(let i = 0; i < tableRecord.collection.length; i++) {
        row.push(tableRecord.collection[i].person);
    }    

    return row;
}

const buildTimeFrameRow = (timeFrame, tableRecord) => {

    const tableRow = [timeFrame];

    for(const record of tableRecord.collection) {

        if(record.workRelation == '1') {
            if( timeFrame == '17:00' || 
                timeFrame == '17:30' || 
                timeFrame == '18:00' || 
                timeFrame == '18:30' ||
                timeFrame == '19:00' ||
                timeFrame == '19:30') {
                tableRow.push('-');
            }
            else if(timeFrame == '12:30' || timeFrame == '13:00') {
                tableRow.push('обедна почивка');
            }                
            else {
                tableRow.push('');
            }
        }

        if(record.workRelation == 'М' || record.workRelation == 'M') {
            if( timeFrame == '08:00' || 
                timeFrame == '08:30' || 
                timeFrame == '09:00' || 
                timeFrame == '19:00' ||
                timeFrame == '19:30') {
                    tableRow.push('-');
            }
            else if(timeFrame == '13:30' || timeFrame == '14:00') {
                tableRow.push('обедна почивка');
            }
            else {
                tableRow.push('');
            }
        }

        if(record.workRelation == '2') {
            if( timeFrame == '08:00' || 
                timeFrame == '08:30' || 
                timeFrame == '09:00' || 
                timeFrame == '09:30' ||
                timeFrame == '10:00' ||
                timeFrame == '10:30') {
                    tableRow.push('-');
            }
            else if(timeFrame == '14:30' || timeFrame == '15:00') {
                tableRow.push('обедна почивка');
            }                
            else {
                tableRow.push('');
            }
        }
    }

    return tableRow;
};

const buildTableMap = (applicationObject) => {

    const sheetTable = [];

    for(let index = 0; index < applicationObject.length; index++) {

        const tableRecord = applicationObject[index];

        const tableMap = [[]];
        tableMap.push(buildSheduleRow(index, tableRecord));
        tableMap.push(buildHeaderRow(tableRecord));
        tableMap.push(buildTimeFrameRow('08:00', tableRecord));
        tableMap.push(buildTimeFrameRow('08:30', tableRecord));
        tableMap.push(buildTimeFrameRow('09:00', tableRecord));
        tableMap.push(buildTimeFrameRow('09:30', tableRecord));
        tableMap.push(buildTimeFrameRow('10:00', tableRecord));
        tableMap.push(buildTimeFrameRow('10:30', tableRecord));
        tableMap.push(buildTimeFrameRow('11:00', tableRecord));
        tableMap.push(buildTimeFrameRow('11:30', tableRecord));
        tableMap.push(buildTimeFrameRow('12:00', tableRecord));
        tableMap.push(buildTimeFrameRow('12:30', tableRecord));
        tableMap.push(buildTimeFrameRow('13:00', tableRecord));
        tableMap.push(buildTimeFrameRow('13:30', tableRecord));
        tableMap.push(buildTimeFrameRow('14:00', tableRecord));
        tableMap.push(buildTimeFrameRow('14:30', tableRecord));
        tableMap.push(buildTimeFrameRow('15:00', tableRecord));
        tableMap.push(buildTimeFrameRow('15:30', tableRecord));
        tableMap.push(buildTimeFrameRow('16:00', tableRecord));
        tableMap.push(buildTimeFrameRow('16:30', tableRecord));
        tableMap.push(buildTimeFrameRow('17:00', tableRecord));
        tableMap.push(buildTimeFrameRow('17:30', tableRecord));
        tableMap.push(buildTimeFrameRow('18:00', tableRecord));
        tableMap.push(buildTimeFrameRow('18:30', tableRecord));                
        tableMap.push(buildTimeFrameRow('19:00', tableRecord));
        tableMap.push(buildTimeFrameRow('19:30', tableRecord));
        tableMap.push([]);

        sheetTable.push(tableMap);
    }


    let resultCollection    = [];
    let dump                = [];
    for(let i = 0; i < sheetTable.length; i++) {
        dump.push(sheetTable[i]);

        if((i + 1) % 7 == 0) {

            resultCollection.push(dump.flat());
            dump = [];
        }
    }

    return resultCollection;
}
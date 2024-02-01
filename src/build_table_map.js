/**
 * @author Mihail Petrov
 * @param {*} index 
 * @param {*} tableRecord 
 * @returns 
 */
const buildSheduleRow = (index, tableRecord) => {

    const row = [];

    if([0 ,7  ,14  ,21  ].includes(index)) row.push('Понеделник');
    if([1 ,8  ,15  ,22  ].includes(index)) row.push('Вторник'   );
    if([2 ,9  ,16  ,23  ].includes(index)) row.push('Сряда'     );
    if([3 ,10 ,17  ,24  ].includes(index)) row.push('Четвъртък' );
    if([4 ,11 ,18  ,25  ].includes(index)) row.push('Петък'     );
    if([5 ,12 ,19  ,26  ].includes(index)) row.push('Събота'    );
    if([6 ,13 ,20  ,27  ].includes(index)) row.push('Неделя'    );

    for(const record of tableRecord.collection) {

        const workFlag = (record.workRelation).toUpperCase();

        if(workFlag == '1'  ) row.push('първа [08:00 - 17:00]');
        if(workFlag == '2'  ) row.push('втора [11:00 - 20:00]');
        if(workFlag == 'М'  ) row.push('междинка [09:30 - 18:30]');
    }

    return row;
}

/**
 * @author Mihail Petrov
 * @param {*} tableRecord 
 * @returns 
 */
const buildHeaderRow = (tableRecord) => {

    if(tableRecord.index == 1) {
        STATE.isNextMonth = true; 
    }
1
    const row = [];
    
    let tty = -1;
    if(!STATE.isNextMonth) {
        tty = (STATE.monthIndex < 10) ? ('0' + STATE.monthIndex) : STATE.monthIndex; 
    }
    else {
        tty = (STATE.monthIndex < 10) ? ('0' + (STATE.monthIndex + 1)) : (STATE.monthIndex + 1);
    }

    row.push(`${tableRecord.index}.${tty}.2023`);
    
    for(let i = 0; i < tableRecord.collection.length; i++) {
        row.push(tableRecord.collection[i].person);
    }    

    return row;
}

/**
 * @author Mihail Petrov
 * @param {*} timeFrame 
 * @param {*} regularTimeframeCollection 
 * @param {*} lanchTimeframeCollection 
 * @returns 
 */
const processTimeFrameIdentificator = (timeFrame, regularTimeframeCollection, lanchTimeframeCollection) => {

    if( regularTimeframeCollection.includes(timeFrame)  ) return '-';
    if( lanchTimeframeCollection.includes(timeFrame)    ) return 'обедна почивка';
    return '';
}

/**
 * @author Mihail Petrov
 * @param {*} timeFrame 
 * @param {*} tableRecord 
 * @returns 
 */
const buildTimeFrameRow = (timeFrame, tableRecord) => {

    const tableRow = [timeFrame];

    for(const record of tableRecord.collection) {

        const workFlag = (record.workRelation).toUpperCase();

        if(workFlag == '1')  tableRow.push(processTimeFrameIdentificator(
            timeFrame,
            ['17:00', '17:30', '18:00','18:30','19:00', '19:30' ],
            ['12:30', '13:00']
        ));

        if(workFlag == 'М')  tableRow.push(processTimeFrameIdentificator(
            timeFrame,
            ['08:00', '08:30', '09:00','19:00','19:30' ],
            ['13:30', '14:00']
        ));

        if(workFlag == '2')  tableRow.push(processTimeFrameIdentificator(
            timeFrame,
            ['08:00', '08:30', '09:00','09:30','10:00', '10:30' ],
            ['14:30', '15:00']
        ));
    }

    return tableRow;
};

/**
 * @author Mihail Petrov
 * @param {*} applicationObject 
 * @returns 
 */
const buildTableMap = (applicationObject) => {

    const sheetTable = [];

    for(let index = 0; index < applicationObject.length; index++) {

        const tableRecord = applicationObject[index];

        if(index == 0) {
            STATE.initDayIndex = tableRecord.index;
        }

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

        sheetTable.push({dateIndex: tableRecord.index, tableMap: tableMap});
    }


    let resultCollection    = [];
    let dump                = [];
    for(let i = 0; i < sheetTable.length; i++) {
        


        dump.push(sheetTable[i].tableMap);

        if((i + 1) % 7 == 0) {

            const startIndex    = sheetTable[i - 6].dateIndex;
            const endIndex      = sheetTable[i].dateIndex;
            resultCollection.push({ 
                startIndex: startIndex, 
                endIndex: endIndex, 
                collection: dump.flat()
            });
            dump = [];
        }
    }

    return resultCollection;
}
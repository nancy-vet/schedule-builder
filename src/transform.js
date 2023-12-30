const getMonthIndex = (text) => {

    if(text == 'януари'     ) return 1;
    if(text == 'февруари'   ) return 2;
    if(text == 'март'       ) return 3;
    if(text == 'април'      ) return 4;
    if(text == 'май'        ) return 5;
    if(text == 'юни'        ) return 6;
    if(text == 'юли'        ) return 7;
    if(text == 'август'     ) return 8;
    if(text == 'септември'  ) return 9;
    if(text == 'октомври'   ) return 10;
    if(text == 'ноември'    ) return 11;
    if(text == 'декември'   ) return 12;
}

/**
 * @author Mihail Petrov
 * @param {*} element 
 */
const processHeader = (element) => {

    const elementCollection = element.split(',');
    const collection        = elementCollection.splice(2);
    return ['', ...collection];
};

/**
 * @author Mihail Petrov
 * @param {*} element 
 * @returns 
 */
const processCurrentMonth = (element) => {
    
    const elementCollection = element.split(',');
    const collection        = elementCollection[1];
    const monthElement      = collection.splice('/')[0];

    return getMonthIndex(monthElement);
}

/**
 * @author Mihail Petrov
 * @param {*} element 
 */
const processPerson = (element) => {

    const collection = element.split(',');
    const person     = collection[0];
    const calendar   = collection.splice(2);

    return [person, ...calendar];
};

/**
 * @author Mihail Petrov
 * @param {*} data 
 * @returns 
 */
const parseCSVToArray = (data) => {

    const arrayReference    = {
        initMonthIndex      : null,
        workDays            : [],
        personelCallendar   : []
    };

    let indexParser         = 0;
    for(let element of data) {
        
        if(indexParser == 0) {

            arrayReference.initMonthIndex   = processCurrentMonth(element);
            arrayReference.workDays         = processHeader(element);
        }
    
        if(indexParser > 1) {
            arrayReference.personelCallendar.push(processPerson(element));
        }
    
        indexParser++;
    }

    return arrayReference;
}

/**
 * @author Mihail Petrov
 * @param {*} flag 
 * @returns 
 */
const getTimeFrame = (flag) => {

    const f = flag.toUpperCase();
    if(f == '1') return `08:00 - 17:00`
    if(f == 'М') return `09:30 - 18:30`
    if(f == '2') return `11:00 - 20:00`
};

/**
 * @author Mihail Petrov
 * @param {*} flag 
 * @returns 
 */
const isWorkTimeFrame = (flag) => {

    const f = flag.toUpperCase();
    return ['1', '2', 'М'].includes(f);
};

/**
 * @author Mihail Petrov
 * @param {*} flag 
 * @returns 
 */
const getScheduleId = (flag) => {
    
    const f = flag.toUpperCase();
    if(f == '1') return 0;
    if(f == 'М') return 1;
    return 2;
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
const getTotalWorkPersonelCount = (data) => {

    const arrayResult =  parseCSVToArray(data);
    return arrayResult.personelCallendar.length;
};

/**
 * 
 * @param {*} data 
 * @returns 
 */
const transformCSVToObject = (data) => {

    const arrayResult =  parseCSVToArray(data);

    const template = [];
    for(let index = 1; index < arrayResult.workDays.length; index++ ) {
    
        const dateIndex     = arrayResult.workDays[index];
        const personObject  = [];

        for(let row of arrayResult.personelCallendar) {
            
            const workRelation  = row[index];
            const time          = getTimeFrame(workRelation);
            const isWorkable    = isWorkTimeFrame(workRelation);
            const id            = getScheduleId(workRelation);
            const person        = row[0];
            
            if(isWorkable) personObject.push({
                person, workRelation, time, id
            });
        }

        personObject.sort((a, b) => a.id - b.id);
    
        const getMonthIndex = (dateIndex, index) => {

            if(index > 20) return arrayReference.initMonthIndex + 1;
            return arrayReference.initMonthIndex;
        }


        const monthIndex    = getMonthIndex(dateIndex, index, arrayReference.initMonthIndex);
        const dateId        = `${dateIndex}.0${arrayReference.initMonthIndex}.2024`;

        template.push({
            index       : dateId,
            collection  : personObject
        });
    }

    return template;
};
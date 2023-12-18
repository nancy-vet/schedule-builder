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
 */
const processPerson = (element) => {

    const collection = element.split(',');
    const person     = collection[0];
    const calendar   = collection.splice(2);

    return [person, ...calendar];
};

/**
 * @author Mihail Petrov
 */
const parseCSVToArray = (data) => {

    const arrayReference    = {
        workDays            : [],
        personelCallendar   : []
    };

    let indexParser         = 0;
    for(let element of data) {
        
        if(indexParser == 0) {
            console.log(indexParser);
            arrayReference.workDays = processHeader(element);
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

    if(flag == '1') return `08:00 - 17:00`
    if(flag == 'М') return `09:30 - 18:30`
    if(flag == '2') return `11:00 - 20:00`
};

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
    
        const dateIndex = arrayResult.workDays[index];
        
        const personObject = [];

        for(let row of arrayResult.personelCallendar) {
    
            
            const workRelation  = row[index];
            let time            = getTimeFrame(workRelation);
            const isWorkable    = workRelation == '1' || 
                                  workRelation == 'М' || 
                                  workRelation == '2';
            let id = 2;
            if(workRelation == '1') {
                id = 0;
            }

            if(workRelation == 'M' || workRelation == 'М') {
                id = 1;
            }

            const person        = isWorkable ? row[0] : '-';

            if(isWorkable) personObject.push({
                person, workRelation, time, id
            });
        }

        personObject.sort((a, b) => {
            return a.id - b.id
        });
    
        template.push({
            index       : dateIndex,
            collection  : personObject
        });
    }

    return template;
};
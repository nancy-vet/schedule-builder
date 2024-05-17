const readFileSyn = (file) => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target.result);
        };

        reader.readAsText(file);
    });
}

const isDayInWeek = (id) => {

    return [
        "Понеделник"    ,
        "Вторник"       ,
        "Сряда"         ,
        "Четвъртък"     ,
        "Петък"         ,
        "Събота"        ,
        "Неделя"
    ].includes(id);
}

const containsYear = (id) => {
    return id.includes('2023') ||  id.includes('2024') || id.includes('2025')
}
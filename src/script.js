document.getElementById("inputId").addEventListener('change', async (e) => {

    const content   = await readFileSyn(e.target.files[0]);
    const data      = content.split('\n');

    let d = [];
    data.forEach((element) => {
        d.push(element.replace('\r', ''));
    });

    const applicationObject = transformCSVToObject(d);
    const tableMap          = buildTableMap(applicationObject);
    const workbook          = new ExcelJS.Workbook();

    for(let i = 0; i < tableMap.length; i++) {
        
        const startIndex    = tableMap[i].startIndex;
        const endIndex      = tableMap[i].endIndex; 
        const title         = `Седмица ${i + 1} (${startIndex} - ${endIndex})`

        createWorksheet(workbook, content, tableMap[i].collection, title);
    }
        
    const xls64         = await workbook.xlsx.writeBuffer( { base64: true });
    const fileContent   = new Blob([xls64]);

    var a       = document.createElement("a");
    var url     = URL.createObjectURL(fileContent);
    a.href      = url;
    a.download  = "export.xlsx";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
});
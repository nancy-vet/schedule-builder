document.getElementById("inputId").addEventListener('change', async (e) => {

    const content   = await readFileSyn(e.target.files[0]);
    const data      = content.split('\n');

    const applicationObject = transformCSVToObject(data);
    const tableMap          = buildTableMap(applicationObject);
    const workbook          = new ExcelJS.Workbook();

    for(let i = 0; i < tableMap.length; i++) {
        createWorksheet(workbook, content, tableMap[i], `Седмица ${i + 1}`);
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
var beautify = require('js-beautify').js,
fs = require('fs');


var dialog = require('dialog-node');
dialog.fileselect("", "Выберите папку с файлами *.js", 0, function (exitCode, retVal, stderr) {
    if (retVal != "") {
        retVal = retVal.replace(/\r\n/g, '');
        files = fs.readdirSync(retVal);
        temp = false;
        for (i of files) {
            if (i.indexOf(".js") != -1) {
                const data = fs.readFileSync(retVal + "\\" + i, 'utf8');

                fs.writeFileSync(retVal + "\\" + i, beautify(data, { indent_size: 2, space_in_empty_paren: true }));
                temp = true;
                console.log(i)
            }
        }
        if (temp) return dialog.warn("Успешно!", "Конец", 0, "");
        return dialog.warn("В папке не найдено файлов *.js", "Конец", 0, "");
    }
    dialog.warn("Вы не выбрали папку!", "Ошибка", 0, "");
}
);
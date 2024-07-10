const fs = require('node:fs');
const { daysDiff } = require("./timeCalc.js");

const newObj = (acc, obj) => {
    const newVal = {
        'Дата с': obj['Дата с'],
        'Дата по': obj['Дата по'],
        'Дней': obj['Дней'],
    };
    const key = "Таб.№";
    const currentValue = obj["Таб.№"];
    const index = acc.findIndex(obj => obj[key] === currentValue);
    const startDate = obj['Принят'].split('.').reverse();
    const sumOfDays = parseInt(obj['Дней']) > 0 ? parseInt(obj['Дней']) : 0;
    
    if (index > -1) {
        acc[index]["Отпуск"].push(newVal);
        acc[index]["sumOfDays"] += sumOfDays;
    } else {
        const newObj = {
            "Таб.№": obj["Таб.№"],
            "ФИО": obj["ФИО"],
            "Принят": startDate,
            "Уволен": obj["Уволен"],
            "Отпуск": [newVal],
            ["sumOfDays"]: sumOfDays,
        };
        acc.push(newObj);
    }
    return acc;
};
const currentDate = new Date;
const data = fs.readFileSync('staff.json', 'utf8');

const newData = JSON.parse(data).reduce(newObj, []);
newData.map(el => daysDiff(el, currentDate));
//console.log(newData);

const exelObj = newData.reduce((acc, el) => {
    const newObj = { "ФИО" : el["ФИО"],
        "Остаток": el["daysLeft"][0],
    }
    acc.push(newObj);
    return acc;
}, []);

const dataForJs = `const data = ${JSON.stringify(newData)}; const currentDate = "${currentDate.toLocaleDateString()}"`;

fs.writeFile('../data.js', dataForJs, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('done');
    }
});

fs.writeFile('../to-exel.json', JSON.stringify(exelObj), err => {
    if (err) {
        console.error(err);
    } else {
        console.log('done');
    }
});





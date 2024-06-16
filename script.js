import { data, currentDate } from './data.js';

const container = document.getElementById('content');
const div = document.createElement('div');
const h3 = document.createElement('h3');
const span = document.createElement('span');

const h1 = document.querySelector('[data-js="currentDate"]');

const dateH1 = currentDate.split('/');
const h1Month = dateH1[0].length === 1 ? `0${dateH1[0]}` : dateH1[0];
h1.append(`${dateH1[1]}.${h1Month}.${dateH1[2]}`);

const excludedPerson = ['Маканов', 'Семенко'];
const daysPerYear = 28;

const timeRecord = { //todo
    fullYears: [],
    months: [],
    days: [],
};


const daysDiff = (startDate, endDate) => { // DELETE

    const difference = endDate - startDate;
    if (difference < 0) return 'smth wrong with dates';

    const iter = (date1, date2) => {

        const year = date1.getFullYear();
        const month = date1.getMonth();
        const days = date1.getDate();
        const tempDate = new Date(year + 1, month, days);

        if (tempDate > date2) return;

        timeRecord.fullYears.push(tempDate.toLocaleDateString());

        return iter(tempDate, date2);
    };

    iter(startDate, endDate);

    return;
};

data.map((el, index) => {
    const templ = document.querySelector('#tmpl');
    const templClone = templ.content.cloneNode(true);

    const vocationsTemplate = templClone.querySelector("#tmplVocations");
    const vocationsTemplateClone = vocationsTemplate.content.cloneNode(true);

    const vocation = templClone.querySelectorAll('[data-js="vocation"]');
    const table = vocationsTemplateClone.querySelectorAll('[data-js="table"]');

    const periodsTemplate = vocationsTemplateClone.querySelector("#periods");

    //vocations

    el["Отпуск"].map(() => {
        const periodsTemplateClone = periodsTemplate.content.cloneNode(true);
        table[0].append(periodsTemplateClone);

    });

    vocation[0].append(vocationsTemplateClone)
    container.append(templClone);

    const h2 = container.querySelectorAll('[data-js="name"]');
    h2[index].append(el["ФИО"]);

    const startDate = container.querySelectorAll('[data-js="startDate"]');
    const startDateStr = el["Принят"].reverse().join('.');
    startDate[index].append(startDateStr);


    const tableList = container.querySelectorAll('[data-js="table"]');
    const dateUp = tableList[index].querySelectorAll('[data-js="dateUp"]');
    const dateTo = tableList[index].querySelectorAll('[data-js="dateTo"]');
    const days = tableList[index].querySelectorAll('[data-js="days"]');

    el["Отпуск"].map((el, elIindex) => {
        dateUp[elIindex].append(el["Дата с"]);
        dateTo[elIindex].append(el["Дата по"]);
        days[elIindex].append(el["Дней"]);
    });


    const summary = tableList[index].querySelectorAll('[data-js="sumOfDays"]');
    const sumOfDays = el["sumOfDays"]
    summary[0].append(sumOfDays);

    const totalDays = container.querySelectorAll('[data-js="totalDays"]');

    const daysLeft = el.fullYears ? el.fullYears.length * daysPerYear - sumOfDays : 0 - sumOfDays;
    totalDays[index].append(daysLeft);

    const currentSurname = el["ФИО"].split(' ')[0];


    if (daysLeft > 28 && excludedPerson.indexOf(currentSurname) < 0) {
        totalDays[index].classList.add("red");
        const parent = totalDays[index].closest(".person-block");
        parent.classList.add('show');
    }

    //todo
    if (el["Отпуск"].length === 0) {
        const p = document.createElement("p");
        const test = p.append('Пока пусто');
    };
});

const toggle = container.querySelectorAll('[data-js="toggle"]');

toggle.forEach(function (el) {
    el.addEventListener("click", function (e) {
        const elem = e.target;
        const parent = elem.closest(".person-block");
        parent.querySelector('[data-js="vocation"]').classList.toggle('show');
    });
});

const main = document.querySelector('#main');
const showAllPpl = main.querySelector('[data-js="showAllPpl"]');

showAllPpl.addEventListener(
    "click", function () {
        if (showAllPpl.checked) {
            const persons = container.querySelectorAll(".person-block");
            [...persons].map((person) => {
                person.classList.add('show');
            });
        };
        if (showAllPpl.checked === false) {
            const persons = container.querySelectorAll(".person-block");
            const filtered = [...persons].filter((person) => {
                const days = person.querySelector('[data-js="totalDays"]');
                if (days.classList.contains("red") === false) return person;
            }).map(person => {
            person.classList.remove('show');
        });
        };
    }
);

//div.classList.contains("foo")
//person.classList.remove('show');



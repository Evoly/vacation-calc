const daysDiff = (obj, endDate) => {
    const startDate = new Date(obj["Принят"]);
    const difference = endDate - Date.parse(startDate);
    const daysPerYear = 28;

    if (difference < 0) return 'smth wrong with dates';

    const iter = (date1, date2) => {
        //console.log('date12:', date1,date2);

        const year = date1.getFullYear();
        const month = date1.getMonth();
        const days = date1.getDate();
        const tempDate = new Date(year + 1, month, days);

        if (tempDate > date2) return;

        if (!Object.hasOwn(obj, "fullYears")) {
            obj["fullYears"] = [];            
        }

        obj["fullYears"].push(tempDate.toLocaleDateString());


        return iter(tempDate, date2);
    };

    iter(startDate, endDate);

    if (!Object.hasOwn(obj, "daysLeft")) {
        obj["daysLeft"] = [];
    }
    const daysLeft = obj.fullYears ? obj.fullYears.length * daysPerYear - parseInt(obj['sumOfDays']) : 0 - parseInt(obj['sumOfDays']);
    obj["daysLeft"].push(daysLeft);


    /*     const diffYears = endDate.getFullYear() - startDate.getFullYear();
        let months = 0;
        let years = diffYears;
        console.log(startDate.getFullYear() + diffYears, 'dif', diffYears);
        if (startDate + diffYears > endDate) {
            years -= 1;
            months += 1;
        }; */

    //const days = difference / (24 * 60 * 60 * 1000) - (years * 365);
    //months += endDate.getMonth() - startDate.getMonth();

    return;
};

module.exports = { daysDiff };
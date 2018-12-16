"use strict"
var main = (function () {
    let body = document.querySelector("body"),
        calendar = addItem("div", "class", "calendar", ""),
        select = addItem("select", null, null, ""),
        cancell = addItem("input", "type", "submit", ""),
        week = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'],
        months = ['Сiчень', 'Лютий', 'Березень', 'Квiтень', 'Травень', 'Червень',
                  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        count_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        curr_month = 11,
        curr_year = 2018,
        curr_day = 17,
        input_year = addItem("input", "value", curr_year, ""),
        input_day = addItem("input", "value", curr_day, "");

    for (let i = 0; i < 12; i++) {
        select.appendChild(addItem("option", "value", i, months[i]));
    }
    select.childNodes[curr_month].setAttribute("selected", "");
    cancell.value = "Відміна";
    calendar.appendChild(input_day);
    calendar.appendChild(select);
    calendar.appendChild(input_year);
    calendar.appendChild(cancell);
    calendar.appendChild(document.createElement('br'));
    for (let i = 0; i < 7; i++) {
        calendar.appendChild(addItem("div", "class", "dayweek", week[i] + "\t"));
    }
    for (let i = 0; i < 37; i++) {
        calendar.appendChild(addItem("div", "class", "item", ""));
    }
    body.appendChild(calendar);
    input_year.addEventListener("change", changeYear, false);
    select.addEventListener("change", changeMonth, false);
    input_day.addEventListener("change", changeDay, false);
    cancell.addEventListener("click", cancelDay, false);

    function getDay(year, month) {
        let now = new Date(year, month).getDay();
        return (now === 0) ? 6 : now--;
    }

    function changeYear() {
        curr_year = this.value;
        (curr_year % 4 === 0) ? count_days[1] = 29: count_days[1] = 28;
        updateCalendar();
    }

    function changeMonth() {
        curr_month = this.value;
        updateCalendar();
    }

    function changeDay() {
        if (curr_day != 32) {
            calendar.querySelector("#active").removeAttribute("id");
        }
        curr_day = +this.value;
        if (curr_day <= count_days[curr_month] && curr_day > 0) {
            calendar.querySelector(".id" + curr_day).id = "active";
        } else {
            curr_day = 32;
            alert("Error day");
            input_day.value = "";
        }
    }

    function cancelDay() {
        if (curr_day != 32) {
            curr_day = 32;
            calendar.querySelector("#active").removeAttribute("id");
            input_day.value = "";
        }
    }

    function addItem(tagname, attr_name, attr_val, content) {
        let item = document.createElement(tagname);
        item.innerHTML = content;
        item.setAttribute(attr_name, attr_val);
        return item;
    }

    function changeColor() {
        if (curr_day != 32) {
            calendar.querySelector("#active").removeAttribute("id");
        }
        this.id = "active";
        curr_day = this.innerHTML;
        input_day.value = curr_day;
    }

    function updateCalendar() {
        let j = getDay(curr_year, curr_month),
            day = 1,
            items = calendar.getElementsByClassName("item");
        for (let i = 0; i < j; i++) {
            items[i].parentNode.replaceChild(addItem("div", "class", "item", ""), items[i]);
        }
        while (day <= count_days[curr_month]) {
            items[j].parentNode.replaceChild(addItem("div", "class", "item id" + day, day), items[j]);
            items[j].addEventListener("click", changeColor, false);
            j++;
            day++;
        }
        for (; j < 37; j++) {
            items[j].parentNode.replaceChild(addItem("div", "class", "item", ""), items[j]);
        }
        if (curr_day <= count_days[curr_month]) {
            calendar.querySelector(".id" + curr_day).setAttribute("id", "active");
        }
    }

    return {
        createCalendar: updateCalendar,
    };

}());

window.addEventListener("load", main.createCalendar, false);

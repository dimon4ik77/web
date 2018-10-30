"use strict";
var main = (function () {
    var calendar = document.querySelector(".calendar"),
        select = document.querySelector("select"),
        input = document.querySelector('input'),
        week = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'],
        months = ['Сiчень',
                 'Лютий',
                 'Березень',
                 'Квiтень',
                 'Травень',
                 'Червень',
                 'Липень',
                 'Серпень',
                 'Вересень',
                 'Жовтень',
                 'Листопад',
                 'Грудень'],
        count_days = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'],
        date = new Date(),
        curr_month = date.getMonth(),
        curr_year = date.getFullYear(),
        curr_day = date.getDay();

    function getDay(year, month) {
        var now = new Date(year, month).getDay();
        if (now == 0) {
            now = 6;
        } else {
            now--;
        }
        return now;
    }

    function changeYear() {
        curr_year = this.value;
    }

    function changeMonth() {
        curr_month = this.value;
    }

    function addItem(tagname, attr_name, attr_val, content) {
        var item = document.createElement(tagname);
        item.innerHTML = content;
        item.setAttribute(attr_name, attr_val);
        return item;
    }

    function drawCalendar() {
        input.setAttribute("value", curr_year);
        var i, j, day = 1;
        for (i = 0; i < 12; i++) {
            select.appendChild(addItem("option", "value", i, months[i]));
        }
        select.childNodes[curr_month].setAttribute("selected", null);
        for (i = 0; i < 7; i++) {
            calendar.appendChild(addItem("div", "class", "dayweek", week[i] + "\t"));
        }
        calendar.appendChild(document.createElement('br'));
        j = getDay(curr_year, curr_month);
        for (i = 0; i < j; i++) {
            calendar.appendChild(addItem("div", "class", "item", ""));
        }
        while (day <= count_days[i]) {
            calendar.appendChild(addItem("div", "class", "item", day));
            if (j % 7 == 6) {
                calendar.appendChild(document.createElement('br'));
            }
            j++;
            day++;
        }

    }
    input.addEventListener("change", changeYear, false);
    select.addEventListener("change", changeMonth, false);
    return {
        createCalendar: drawCalendar,
    };
}());
window.addEventListener("load", main.createCalendar, false);

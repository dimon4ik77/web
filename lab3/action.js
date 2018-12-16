(function () {
    "use strict";
    let calendar = addItem("div", "class", "calendar"),
        select = addItem("select"),
        cancel = addItem("input", "type", "submit"),
        months = getInfo("months"),
        week = getInfo("week"),
        days = getInfo("days"),
        dataInfo = {"curr_day": 17,
                    "curr_month":11,
                    "curr_year":2018},
        input_year = addItem("input", "value", dataInfo.curr_year),
        input_day = addItem("input", "value", dataInfo.curr_day);
    function init(){
        for (let i = 0; i < 12; i++) {
            select.appendChild(addItem("option", "value", i, months[i]));
        }
        select.childNodes[dataInfo.curr_month].setAttribute("selected", true);
        cancel.value = "Відміна";
        calendar.appendChild(input_day);
        calendar.appendChild(select);
        calendar.appendChild(input_year);
        calendar.appendChild(cancel);
        calendar.appendChild(document.createElement('br'));
        for (let i = 0; i < 7; i++) {
            calendar.appendChild(addItem("div", "class", "dayweek", week[i] + "\t"));
        }
        for (let i = 0; i < 37; i++) {
            calendar.appendChild(addItem("div", "class", "item", "",changeColor));
        }
        document.body.appendChild(calendar);
        input_year.addEventListener("change", changeYear);
        select.addEventListener("change", changeMonth);
        input_day.addEventListener("change", changeDay);
        cancel.addEventListener("click", cancelDay );}

    function changeYear() {
        dataInfo.curr_year=this.value;
        updateCalendar();
    }

    function changeMonth() {
        dataInfo.curr_month = this.value;
        updateCalendar();
    }

    function changeDay() {
        if (dataInfo.curr_day !== 32) {
            calendar.querySelector("#active").removeAttribute("id");
        }
        dataInfo.curr_day = +this.value;
        if (dataInfo.curr_day <= days[dataInfo.curr_month]&&dataInfo.curr_day>0) {
            calendar.getElementsByClassName("active")[dataInfo.curr_day-1].id = "active";
        } else {
            dataInfo.curr_day = 32;
            alert("Error day");
            input_day.value = "";
        }
    }

    function cancelDay() {
        if (dataInfo.curr_day !== 32) {
            dataInfo.curr_day = 32;
            calendar.querySelector("#active").removeAttribute("id");
            input_day.value = "";
        }
    }

    function changeColor() {
        if(this.innerHTML){
            if (dataInfo.curr_day !== 32) {
                calendar.querySelector("#active").removeAttribute("id");
            }
            this.setAttribute("id","active");
            dataInfo.curr_day = this.innerHTML;
            input_day.value=dataInfo.curr_day;}
    }

     function getInfo(nameArray) {
        let response = null;
         $.ajax({
             type: "POST",
             url: "/info",
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             async: false,
             data: JSON.stringify({id:nameArray}),
             error:()=> alert("Error getting information from server"),
             success:data=>{response=JSON.parse(data);}});
        return response;}

    function addItem(tagname, attr_name, attr_val, content,handler) {
        let item = document.createElement(tagname);
        if(content){item.innerHTML = content;}
        if(attr_name){item.setAttribute(attr_name, attr_val);}
        if(handler){item.addEventListener("click",handler);}
        return item;
    }

    function updateCalendar() {
        fetch("/data",
            {
                method:'post',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify(dataInfo)})
            .then(response=>{
                return response.json();})
            .then(data=>{
                let array=JSON.parse(data),
                    items = calendar.getElementsByClassName("item");
                for(let i =0;i<37;i++){
                    items[i]["className"]=array[i]["class"];
                    items[i]["innerHTML"]=array[i]["innerHTML"];
                    items[i]["id"]=array[i]["id"];}})
            .catch(()=>alert("Error updating calendar"))};
    init();
    updateCalendar();
}());

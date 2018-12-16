const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const week = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'],
      months = ['Сiчень', 'Лютий', 'Березень', 'Квiтень', 'Травень', 'Червень',
                'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
      days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();;
});
app.get("/main.html",function (request,response) {
    response.sendFile("/main.html");
});
app.post("/info",function (request,response) {
    let message;
    switch (request.body.id) {
        case "months":{
            message=months;
            break;
        }
        case "week":{
            message=week;
            break;
        }
        case "days":{
            message=days;
            break;
        }
        default:{
            response.sendStatus(404);
            break;
        }
    }
    response.json(JSON.stringify(message));
})
app.post("/data",function (request,response) {
    if(!request.body) return response.sendStatus(400);
    response.json(defCalendar(request.body));
});
function defCalendar(dataInfo) {
    (dataInfo.curr_year % 4 === 0) ? days[1] = 29: days[1] = 28;
    let j = new Date(dataInfo.curr_year,dataInfo.curr_month).getDay(),
        day = 1,
        array = [];
    j === 0 ? j=6 : j--;
    for (let i = 0; i < j; i++) {
        array.push({"class":"item","innerHTML":"","id":""});
    }
    while (day <= days[dataInfo.curr_month]) {
        let object = {"class":"item active","innerHTML":day,"id":""};
        if(+dataInfo.curr_day===day){
            object["id"]="active";
        }
        array.push(object);
        j++;
        day++;
    }
    for (; j < 37; j++) {
        array.push({"class":"item","innerHTML":"","id":""});
    }
    return JSON.stringify(array);
}
app.listen(3000);

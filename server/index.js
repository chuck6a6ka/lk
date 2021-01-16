var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var fs = require('fs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'lab_lk',
    password: ''
});
var nowTime = new Date();

var logFileName = 'person_lk-'+ nowTime.getFullYear()+'.'+ nowTime.getMonth()+ '.' +nowTime.getDay() + '-' + nowTime.getHours() + '.' + nowTime.getMinutes() +'.txt';

//Создание лог файла
fs.open(logFileName, 'w', (err) => {
    if(err) throw err;
    console.log('File created');
});

//Функция логирования
function log(nameLogFile, logMessage){
    let time = new Date();
    let fullLogMessage = time.getHours() + ':' + time.getMinutes()+ ':' + time.getSeconds() + ' Задача: ' + logMessage + '\n';
    fs.appendFile(nameLogFile, fullLogMessage, (err) => {
        if(err) throw err;
        console.log('Logging data to a file');
    });

}

//Создание подключения к БД
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    log(logFileName, 'Создание подключения к БД. id потока подключения БД - ' + connection.threadId)
});

//Поддержка подключения к БД
setInterval(function () {
    connection.query('SELECT 1');
    console.log('reset db connection')
    log( logFileName, 'Поддержка подключения к БД')
}, 10000);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.send('Hello');
})

//АВТОРИЗАЦИЯ
app.get('/login', function (req, res) {
    let que = 'SELECT * FROM person WHERE p_login = \"'+ req.query.login + '\" AND p_password = '+ req.query.password +'';
    connection.query(que, function (err, rows, fields) {
        if (err) throw err;
        console.log('найдено: ', rows[0]);
        if(rows[0].id != 0){
            res.send({"cookies" : 'accept', "idProf" : rows[0].id, "name" : rows[0].p_name});
            log( logFileName, 'Авторизация клиента. Id его профиля = ' + rows[0].id)
        }
    });
})


//РЕГИСТРАЦИЯ
app.post('/login', function (req, res) {
    let que = 'INSERT INTO person(p_name, p_lastName, p_secondName, p_sex, p_state, p_city, p_address, p_apartNumber, p_login, p_password, p_email, p_phone, p_bd_date)' +
        ' VALUES(\''+ req.body.name +'\',\''+ req.body.lastName +'\',\''+ req.body.secondName +'\',\''+ req.body.sex +'\',\''+ req.body.state +'\',' +
        '\''+ req.body.city +'\',\''+ req.body.address +'\',\''+ req.body.ap_number +'\',\''+ req.body.login +'\',\''+ req.body.password +'\',\''+ req.body.eMail +'\',' +
        '\''+ req.body.phone +'\',\''+ req.body.bdDate +'\')';
    connection.query(que, function (err, rows, fields) {
        if (err) throw err;
    });
    que = 'SELECT * FROM person ORDER BY id DESC LIMIT 1';
    connection.query(que, function (err, rows, fields) {
        if (err) throw err;
        console.log('найдено: ', rows[0]);
        if(rows[0].id != 0){
            res.send({"cookies" : 'accept', "idProf" : rows[0].id, "name" : rows[0].p_name});
            log( logFileName, 'Регистрация нового клиента. Id его профиля = ' + rows[0].id)
        }
    });
})

//ПОЛУЧЕНИЕ ВСЕЙ ИНФЫ
app.get('/get-info', function (req, res) {
    // let que = 'SELECT * FROM person WHERE id = \"'+ req.query.id +'\"';
    var name;
    var news;
    var request;
    var oldRequest;
    var doctor;
    var doc_direction;
    let allInfo = [];

    let lastNews = 'SELECT * FROM news ORDER BY id DESC LIMIT 2';
    connection.query(lastNews, function (err, rows, fields) {
        if (err) throw err;
        news = rows;
        allInfo.push(news);
    });


    let listRequest = 'SELECT * FROM request WHERE req_date > "'+ nowTime.getFullYear()+'-'+ nowTime.getMonth()+ '-' +nowTime.getDay() +'" AND req_idPerson = "'+ req.query.id +'"';
    connection.query(listRequest, function (err, rows, fields) {
        if (err) throw err;
        request = rows;
        allInfo.push(request);
    });

    let listOldRequest = 'SELECT * FROM request WHERE req_date < "'+ nowTime.getFullYear()+'-'+ nowTime.getMonth()+ '-' +nowTime.getDay() +'" AND req_idPerson = "'+ req.query.id +'"';
    connection.query(listOldRequest, function (err, rows, fields) {
        if (err) throw err;
        oldRequest = rows;
        allInfo.push(oldRequest);
    });

    let listDoctor = 'SELECT * FROM doctor';
    connection.query(listDoctor, function (err, rows, fields) {
        if (err) throw err;
        doctor = rows;
        allInfo.push(doctor);
    });

    let listDirDoctor = 'SELECT * FROM direction';
    connection.query(listDirDoctor, function (err, rows, fields) {
        if (err) throw err;
        doc_direction = rows;
        allInfo.push(doc_direction);
    });


    setTimeout(function (){
        res.send(allInfo);
        log( logFileName, 'Получение клиентом информации для процесса отображения главной страницы личного кабинета')
    },1500);

})


//Получение предстоящих записей
app.get('/get-request', function (req, res) {
    let shudele = [];
    let request, doctor,direction;

    let listRequest = 'SELECT * FROM request WHERE req_date > "'+ nowTime.getFullYear()+'-'+ nowTime.getMonth()+ '-' +nowTime.getDay() +'" AND req_idPerson = "'+ req.query.id +'"';
    connection.query(listRequest, function (err, rows, fields) {
        if (err) throw err;
        request = rows;
        shudele.push(request);
    });

    let listDoctor = 'SELECT * FROM doctor';
    connection.query(listDoctor, function (err, rows, fields) {
        if (err) throw err;
        doctor = rows;
        shudele.push(doctor);
    });

    let listDirDoctor = 'SELECT * FROM direction';
    connection.query(listDirDoctor, function (err, rows, fields) {
        if (err) throw err;
        direction = rows;
        shudele.push(direction);
    });

    setTimeout(function (){
        res.send(shudele)
        log( logFileName, 'Получение клиентом информации для процесса просмотра предстоящих записей')
    },1500);

})

//Получение прошедших записей
app.get('/get-old-request', function (req, res) {
    let shudele = [];
    let request, doctor,direction;

    let listRequest = 'SELECT * FROM request WHERE req_date < "'+ nowTime.getFullYear()+'-'+ nowTime.getMonth()+ '-' +nowTime.getDay() +'" AND req_idPerson = "'+ req.query.id +'"';
    connection.query(listRequest, function (err, rows, fields) {
        if (err) throw err;
        request = rows;
        shudele.push(request);
    });

    let listDoctor = 'SELECT * FROM doctor';
    connection.query(listDoctor, function (err, rows, fields) {
        if (err) throw err;
        doctor = rows;
        shudele.push(doctor);
    });

    let listDirDoctor = 'SELECT * FROM direction';
    connection.query(listDirDoctor, function (err, rows, fields) {
        if (err) throw err;
        direction = rows;
        shudele.push(direction);
    });

    setTimeout(function (){
        res.send(shudele)
        log( logFileName, 'Получение клиентом информации для процесса просмотра истории болезни(Старых заявок посещения доктора)')
    },1500);

})

//Получение расписания доктора
app.get('/get-doctor-shedule', function (req, res) {
    let listShudele = [];
    let doctor,direction;

    let listDoctor = 'SELECT * FROM doctor';
    connection.query(listDoctor, function (err, rows, fields) {
        if (err) throw err;
        doctor = rows;
        listShudele.push(doctor);
    });

    let listDirDoctor = 'SELECT * FROM direction';
    connection.query(listDirDoctor, function (err, rows, fields) {
        if (err) throw err;
        direction = rows;
        listShudele.push(direction);
    });

    setTimeout(function (){
        res.send(listShudele)
        log( logFileName, 'Получение клиентом информации для процесса просмотра расписания докторов')
    },1500);

})

//Получение инфы для заявок
app.get('/create-new-request', function (req, res) {
    let listShudele = [];
    let doctor,direction;

    let listDoctor = 'SELECT * FROM doctor';
    connection.query(listDoctor, function (err, rows, fields) {
        if (err) throw err;
        doctor = rows;
        listShudele.push(doctor);
    });

    let listDirDoctor = 'SELECT * FROM direction';
    connection.query(listDirDoctor, function (err, rows, fields) {
        if (err) throw err;
        direction = rows;
        listShudele.push(direction);
    });

    setTimeout(function (){
        res.send(listShudele)
        log( logFileName, 'Получение клиентом информации для процесса создания новой заявки')
    },1500);

})

//Создание новых заявок
app.post('/create-new-request', function (req, res) {
    let que = 'INSERT INTO request(req_idPerson, req_idDoctor, req_date, time)' +
        ' VALUES(\''+ Number(req.body.idPerson) +'\',\''+ Number(req.body.idDoctor) +'\',\''+ req.body.day +'\',\''+ req.body.time +'\')';
    connection.query(que, function (err, rows, fields) {
        if (err) throw err;
    });
    console.log(req.body);
    setTimeout(function (){
        res.send('ok');
        log( logFileName, 'Создание новой заявки')
    },1500);
})

//Удаление заявок
app.delete('/delete-request', function (req, res) {
    let que = 'DELETE FROM request WHERE id = \''+ Number(req.body.id) +'\' ';
    connection.query(que, function (err, rows, fields) {
        if (err) throw err;
    });
    console.log(que);
    setTimeout(function (){
        res.send('ok');
        log( logFileName, 'Удаление записи c id=' + req.body.id)
    },1500);
})


//Получение информации о профиле
app.get('/profile', function (req, res) {
    let que = 'SELECT * FROM person WHERE id = \''+ Number(req.query.id) +'\' ';
    connection.query(que, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows[0]);
        log( logFileName, 'Получение информации о профиле c id=' + req.query.id)
    });
})
//Изменение информации профиля
app.put('/profile', function (req, res) {
    let que = 'UPDATE person SET p_name = \''+ req.body.name +'\', p_lastName = \''+ req.body.lastName +'\',p_secondName = \''+ req.body.secondName +'\',p_state = \''+ req.body.state +'\',p_city = \''+ req.body.city +'\',p_address = \''+ req.body.address +'\',p_apartNumber = \''+ req.body.ap_number +'\',p_login = \''+ req.body.login +'\',' +
        'p_password = \''+ req.body.password +'\',p_email = \''+ req.body.eMail +'\',p_phone = \''+ req.body.phone +'\',p_bd_date = \''+ req.body.bdDate +'\' WHERE id = \''+ req.body.id +'\' ';
    connection.query(que, function (err, rows, fields) {
        if (err) throw err;
        res.send({"mes":"success"});
        log( logFileName, 'Изменение информации профиля c id=' + req.body.id)
    });
})
app.listen(3012, function () {
    log( logFileName, 'Сервер запущен по адресу http://localhost:3012/')
})


const validateId = (x) => {
    if (isNaN(x)) {
        return false;
    }
    return true;
}

const validateJSON = (x) => {
    if (typeof (x) == 'object') {
        return true;
    }
    return false;
}

const add = (x, y) => (+x) + (+y);
module.exports = {
    add,
    validateId,
    validateJSON};
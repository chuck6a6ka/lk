$( document ).ready(function() {
    let name = Cookies.get('name');
    console.log(name);
    $('.lk-dashboard__profile-name').html('Привет, ' + name);


    //Авторизация
    $('#login_btn').on('click', function (){
        var login = $('#login').val();
        var password = $('#password').val();
        let data = {
            "login": login,
            "password": password
        };
        console.log(data);
        $.ajax({
            url: 'http://localhost:3012/login',         /* Куда пойдет запрос */
            contentType: 'application/json',
            method: 'get',             /* Метод передачи (post или get) */
            dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            data: data,     /* Параметры передаваемые в запросе. */
            success: function (data){
                Cookies.set('registration', data.cookies, { expires: 7 })
                Cookies.set('idProf', data.idProf, { expires: 7 })
                Cookies.set('name', data.name, { expires: 7 })
                window.location.href = "http://localhost:3000/lk.html"
            }
        });
    })

    //Выход из аккаунта
    $('#exit_btn').on("click", function (){
        Cookies.remove('registration')
        Cookies.remove('idProf');
        Cookies.remove('name');
        window.location.href = "http://localhost:3000/"
    })

    //Регистрация
    $('#reg_btn').on('click', function (){
        console.log('post');
        let sex = 'Мужской';

        let info = {
            "name": $('#name').val(),
            "lastName": $('#lastName').val(),
            "secondName": $('#secondName').val(),
            "sex": sex,
            "state": $('#state').val(),
            "city": $('#city').val(),
            "address": $('#address').val(),
            "ap_number": $('#ap_number').val(),
            "login": $('#login').val(),
            "password": $('#password').val(),
            "eMail": $('#eMail').val(),
            "phone": $('#phone').val(),
            "bdDate": $('#bdDate').val(),
        };

        console.log(JSON.stringify(info));
       $.ajax({
            url: 'http://localhost:3012/login',         /* Куда пойдет запрос */
            contentType: 'application/json',
            method: 'post',             /* Метод передачи (post или get) */
            dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            data: JSON.stringify(info),     /* Параметры передаваемые в запросе. */
            success: function (data){
                Cookies.set('registration', data.cookies, { expires: 7 })
                Cookies.set('idProf', data.idProf, { expires: 7 })
                Cookies.set('name', data.name, { expires: 7 })
                window.location.href = "http://localhost:3000/registration-success.html"
            }
        });
    })


    $(document).on('click','.show_history_btn',function (){
        Swal.fire(
            'ОРВИ (простуда)',
            'Осмотр. Симптомы: Першение в горле. Боль в горле. Осиплость голоса. Заключение: ОРВИ (простуда)',
            'info'
        )
    })
});
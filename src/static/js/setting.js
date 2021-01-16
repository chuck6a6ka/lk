$(document).ready(function () {
    //Регистрация
    $('#update_btn').on('click', function (){
        let info = {
            "id": Cookies.get('idProf'),
            "name": $('#name').val(),
            "lastName": $('#lastName').val(),
            "secondName": $('#secondName').val(),
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
            url: 'http://localhost:3012/profile',         /* Куда пойдет запрос */
            contentType: 'application/json',
            method: 'PUT',             /* Метод передачи (post или get) */
            dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            data: JSON.stringify(info),     /* Параметры передаваемые в запросе. */
            success: function (data) {
                console.log(data);
                Cookies.set('name', info.name);
                Swal.fire(
                    'Успех',
                    'Вы успешно изменили информацию в профиле',
                    'success'
                )
                setTimeout(function (){
                    window.location.reload();
                },1500);
            }
        });
    })
})
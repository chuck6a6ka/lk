$(document).ready(function () {
    $('select').niceSelect();

    $('#create_new_request_btn').on('click', function (){
        let idPerson = Cookies.get('idProf');
        let idDoctor = $('.listDoctor option:selected').attr('value');
        let day = $('.listDay option:selected').attr('value')
        let time = $('.listTime option:selected').attr('value')

        let info = {
            "idPerson": idPerson,
            "idDoctor": idDoctor,
            "day": day,
            "time": time,
        };

        console.log(JSON.stringify(info));
        $.ajax({
            url: 'http://localhost:3012/create-new-request',         /* Куда пойдет запрос */
            contentType: 'application/json',
            method: 'post',             /* Метод передачи (post или get) */
            dataType: 'html',          /* Тип данных в ответе (xml, json, script, html). */
            data: JSON.stringify(info),     /* Параметры передаваемые в запросе. */
            success: function (data){
                //alert('Вы успешно записались на прием');
                Swal.fire(
                    'Будьте здоровы',
                    'Вы успешно записались на прием!',
                    'success'
                )
                setTimeout(function (){
                    window.location.href = '/my-schedule.html';
                },1500);
            }
        });

    })

    //Удаление записей
    $(document).on('click','.btn-delete-request', function (){
        console.log('delete');
        let idDelete = $(this).parent().parent().attr('newrequest-id');
        let deleteCard = $(this).parent().parent();
        let info = {"id" : idDelete};
        $.ajax({
            url: 'http://localhost:3012/delete-request',         /* Куда пойдет запрос */
            contentType: 'application/json',
            method: 'DELETE',             /* Метод передачи (post или get) */
            dataType: 'html',          /* Тип данных в ответе (xml, json, script, html). */
            data: JSON.stringify(info),     /* Параметры передаваемые в запросе. */
            success: function (data){
                Swal.fire(
                    'Будьте здоровы',
                    'Вы успешно удалили запись на прием!',
                    'success'
                )
                deleteCard.fadeOut(300);
                setTimeout(function (){
                    deleteCard.remove();
                },500);
            }
        });
    });

});


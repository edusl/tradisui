/**
 * Created by alberto.vara on 06/09/2017.
 */
// Validaciones AJAX - Identificación

if ($('body').attr("data-content") == 'signon') {
    //Activamos "continuar" en diferentes momentos
    $('#empresa-ext').click(function(){
        $('[data-validation="continue-identify"]').css('display','block');
    });
    //Reseteamos ocultar apartado "Continuar" en empresa
    $('#empresa-esp').click(function(){
        if (!$('#validNifEmp').is(":visible")) {
            $('[data-validation="continue-identify"]').css('display','block');
        }
        else {
            $('[data-validation="continue-identify"]').css('display','none');
        }
    });
    $('#form-particular').click(function(){
        $('[data-validation="aeat"], [data-validation="continue-identify"]').css('display','none');
        $('#validNIF').show();
    });

    // Si seleccionamos NIE, al no existir actualmente validación para el mismo, mostramos el formulario completo.
    $('#particular-esp-id-type').change(function(){
        if ($(this).val() === 'NIE') {
            $('[data-validation="aeat"]').css('display','');
            $('.errormsg').addClass('hide');
        }
        else {
            $('[data-validation="aeat"]').css('display','');
            $('.errormsg').addClass('hide');
        }
    })
    // Acciones a llevar a cabo en el onChange del combo "Tipo de documento" de "Datos del representante de la sociedad" en Empresa.
    $('#empresa-esp-id-type').change(function(){
        if ($(this).val() === 'NIF' || $(this).val() === 'NIE') {
            $('[data-validation="aeat-emp"], [data-validation="continue-identify"]').css('display','none');
            $('.errormsg').addClass('hide');
            $('#validNIEemp, #validNifEmp').show();
        }
        else {
            $('[data-validation="aeat-emp"], [data-validation="continue-identify"]').css('display','block');
            $('.errormsg').addClass('hide');
            $('#validNIEemp').hide();
        }
    })
    // NIE Representante empresa - Comprobamos que el nif es correcto según la AEAT y en caso afirmativo, mostrar el resto del formulario
    function checkNieEmp () {
        var docnum = $('input#empresa-re-nie').val();
        var name = $('input#empresa-re-nom').val();
        var lastname = $('input#empresa-re-pa').val();
        var requestURL = 'https://sede.registradores.org/api/validate/aeat?identificationNumber=' + docnum + '&name=' + name + '&primaryLastName=' + lastname;
        $.getJSON(requestURL)
            .fail(function(){
                $('#ajaxError').removeClass('hide');
                $('#validNIEerrorAEAT').addClass('hide');
                $('[data-validation="aeat-emp"]').css('display','none');
                $('[data-validation="continue-identify"]').css('display','none');
            })
            .done(function(response) {
                if (response.valid === true) {
                    $('[data-validation="aeat-emp"]').css('display','block');
                    $('[data-validation="continue-identify"]').css('display','block');
                    $('#validNIEerrorAEAT').addClass('hide');
                    $('#ajaxError').addClass('hide');
                    $('#validNIEemp').hide();
                }
                else {
                    $('#validNIEerrorAEAT').removeClass('hide');
                    $('[data-validation="aeat-emp"]').css('display','none');
                    $('#ajaxError').addClass('hide');
                    $('[data-validation="continue-identify"]').css('display','none');
                }
            });
    }
    // NIF Representante empresa - Comprobamos que el nif es correcto según la AEAT y en caso afirmativo, mostrar el resto del formulario
    function checkNifEmp () {
        var docnum = $('input#empresa-re-nif').val();
        var name = $('input#empresa-re-nom').val();
        var lastname = $('input#empresa-re-pa').val();
        var slastname = $('input#empresa-re-sa-nif').val();
        var requestURL = 'https://sede.registradores.org/api/validate/aeat?identificationNumber=' + docnum + '&name=' + name + '&primaryLastName=' + lastname + '&secondLastName=' + slastname;
        $.getJSON(requestURL)
            .fail(function(){
                $('#ajaxError').removeClass('hide');
                $('*#validNIFerrorAEAT').addClass('hide');
                $('[data-validation="aeat-emp"]').css('display','none');
                $('[data-validation="continue-identify"]').css('display','none');
            })
            .done(function(response) {
                if (response.valid === true) {
                    $('[data-validation="aeat-emp"]').css('display','block');
                    $('[data-validation="continue-identify"]').css('display','block');
                    $('*#validNIFerrorAEAT').addClass('hide');
                    $('#ajaxError').addClass('hide');
                    $('#validNifEmp').hide();
                }
                else {
                    $('*#validNIFerrorAEAT').removeClass('hide');
                    $('[data-validation="aeat-emp"]').css('display','none');
                    $('#ajaxError').addClass('hide');
                    $('[data-validation="continue-identify"]').css('display','none');
                }
            });
    } 
    // NIF Particular - Comprobamos que el nif es correcto según la AEAT y en caso afirmativo, mostrar el resto del formulario
    function checkNIF () {
        var docnum = $('input#particular-nif').val();
        var name = $('input#particular-nombre').val();
        var lastname = $('input#particular-pa').val();
        var slastname = $('input#particular-sa').val();
        var requestURL = 'https://sede.registradores.org/api/validate/aeat?identificationNumber=' + docnum + '&name=' + name + '&primaryLastName=' + lastname + '&secondLastName=' + slastname;
        $.getJSON(requestURL)
            .fail(function(){
                $('#ajaxError').removeClass('hide');
                $('*#validNIFerrorAEAT').addClass('hide');
                $('[data-validation="aeat"]').css('display','none');
                $('[data-validation="continue-identify"]').css('display','none');
            })
            .done(function(response) {
                if (response.valid === true) {
                    $('[data-validation="aeat"]').css('display','block');
                    $('[data-validation="continue-identify"]').css('display','block');
                    $('*#validNIFerrorAEAT').addClass('hide');
                    $('#ajaxError').addClass('hide');
                    $('#validNIF').hide();
                }
                else {
                    $('*#validNIFerrorAEAT').removeClass('hide');
                    $('[data-validation="aeat"]').css('display','none');
                    $('#ajaxError').addClass('hide');
                    $('[data-validation="continue-identify"]').css('display','none');
                }
            });
    } 
    // Comprobamos que el nif es correcto según la AEAT y en caso afirmativo, mostrar el resto del formulario
    function checkNIE () {
        var docnum = $('input#particular-nie').val();
        var name = $('input#particular-nombre').val();
        var lastname = $('input#particular-pa').val();
        var requestURL = 'https://sede.registradores.org/api/validate/aeat?identificationNumber=' + docnum + '&name=' + name + '&primaryLastName=' + lastname;
        $.getJSON(requestURL)
            .fail(function(){
                $('#ajaxError').removeClass('hide');
                $('*#validNIFerrorAEAT').addClass('hide');
                $('[data-validation="aeat"]').css('display','none');
            })
            .done(function(response) {
                if (response.valid === true) {
                    $('[data-validation="aeat"]').css('display','block');
                    $('*#validNIFerrorAEAT').addClass('hide');
                    $('#ajaxError').addClass('hide');
                    $('#validNIE').hide();
                }
                else {
                    $('*#validNIFerrorAEAT').removeClass('hide');
                    $('[data-validation="aeat"]').css('display','none');
                    $('#ajaxError').addClass('hide');
                }
            });
    }
    // Mostramos el formulario completo en el caso de que se seleccione un país distinto a España
    $('#particular-pais').change(function(){
        if ($(this).children(":selected").val() !== '108') {
            $('[data-validation="aeat"], [data-validation="continue-identify"]').css('display','block');
        }
        else {
            $('[data-validation="aeat"]').css('display','none');
        }
    });
    // Si venimos de una página posterior, mostramos el formulario completo desplegado
    if ($('#particular-esp-id-type option:selected').val() === 'NIF') {
        $('[data-validation="aeat"]').css('display','block');
    }
    // Particular - Si rellenamos NIF, Nombre y Apellidos, llamamos a la función de comprobar datos por la AEAT
    $('#validNIF').click(function() {
        if ($('input#particular-nif').val() !== '' && $('input#particular-nombre').val() !== '' && $('input#particular-pa').val() !== '' && $('input#particular-sa').val() !== '') {
            checkNIF();
        }
        else {
            $('form').submit();
        }
    })
    $('#validNIE').click(function() {
        if ($('input#particular-nie').val() !== '' && $('input#particular-nombre').val() !== '' && $('input#particular-pa').val() !== '' && !$('#particular-nie').hasClass('error')) {
            checkNIE();
        }
        else {
            $('form').submit();
        }
    })
    // Empresa - Si rellenamos NIF, Nombre y Apellidos, llamamos a la función de comprobar datos por la AEAT
    $('#validNifEmp').click(function() {
        if ($('input#empresa-re-nif').val() !== '' && $('input#empresa-re-nom').val() !== '' && $('input#empresa-re-pa').val() !== '' && $('input#empresa-re-sa-nif').val() !== '') {
            checkNifEmp();
        }
        else {
           $('form').submit();
        }
    })
    $('#validNIEemp').click(function() {
        if ($('input#empresa-re-nif').val() !== '' && $('input#empresa-re-nom').val() !== '' && $('input#empresa-re-pa').val() !== '') {
            checkNieEmp();
        }
        else {
            $('form').submit();
        }
    })
    /*    $('#validNIE').click(function() {
     if ($('input#particular-nie').val() !== '' && $('input#particular-nombre').val() !== '' && $('input#particular-pa').val() !== '' && !$('#particular-nie').hasClass('error')) {
     checkNIE();
     }
     else {
     $('form').submit();
     }
     })*/
};
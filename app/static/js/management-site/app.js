// app management 1.2

// SVG for IE

// svg4everybody();

// make input only numeric

$("input.number-only").on({
    keydown: function(e) {
        if (e.shiftKey === true ) {
            if (e.which == 9) {
                return true;
            }
            return false;
        }
        if (e.which > 57) {
            return false;
        }
        if (e.which==32) {
            return false;
        }
        return true;
    }
});

//Filter - full month date rangue
function updateFullMonthFilter() {
    if($('#selectFilterMonthMonth').val() && $('#selectFilterMonthYear').val()){
        var date_month = $('#selectFilterMonthMonth').val();
        var date_year = $('#selectFilterMonthYear').val();
        var dp_from = moment().year(date_year).month(date_month).startOf('month').format('DD/MM/YYYY');
        var dp_to = moment().year(date_year).month(date_month).endOf('month').format('DD/MM/YYYY');
        $('#filterFrom').val(dp_from);
        $('#filterTo').val(dp_to);
    }
}

//Filter - full year date rangue
function updateFullYearFilter() {
    if($('#selectFilterYearYear').val()){
        var date_year = $('#selectFilterYearYear').val();
        var dp_from = moment().year(date_year).startOf('year').format('DD/MM/YYYY');
        var dp_to = moment().year(date_year).endOf('year').format('DD/MM/YYYY');
        $('#filterFrom').val(dp_from);
        $('#filterTo').val(dp_to);
    }
}

//Slider - full month date rangue
function updateFullMonth() {
    if($('#selectMonthMonth').val() && $('#selectMonthYear').val()){
        var date_month = $('#selectMonthMonth').val();
        var date_year = $('#selectMonthYear').val();
        var dp_from = moment().year(date_year).month(date_month).startOf('month').format('DD/MM/YYYY');
        var dp_to = moment().year(date_year).month(date_month).endOf('month').format('DD/MM/YYYY');
        $('#from').val(dp_from);
        $('#to').val(dp_to);
    }
}

//Slider - full year date rangue
function updateFullYear() {
    if($('#selectYearYear').val()){
        var date_year = $('#selectYearYear').val();
        var dp_from = moment().year(date_year).startOf('year').format('DD/MM/YYYY');
        var dp_to = moment().year(date_year).endOf('year').format('DD/MM/YYYY');
        $('#from').val(dp_from);
        $('#to').val(dp_to);
    }
}

// Update slider dates
function updateDates() {
    var date_option = $('#selectDate').val();
    if (date_option != "") {
        if (date_option == "current_month") {
            $('.capa-solicitudes .year, .capa-solicitudes .rangue').addClass('hide');
            $('.capa-solicitudes .month').removeClass('hide');
        } 
        else if (date_option == "current_year") {
            $('.capa-solicitudes .month, .capa-solicitudes .rangue').addClass('hide');
            $('.capa-solicitudes .year').removeClass('hide');
        }
    } else {
        $('.capa-solicitudes .year, .capa-solicitudes .month').addClass('hide');
        $('.capa-solicitudes .rangue').removeClass('hide');
    }
}

// Update filter dates
function updateFilterDates() {
    var date_option = $('#selectFilterDate').val();
    if (date_option != "") {
        if (date_option == "current_month") {
            $('.filter-options .year, .filter-options .rangue').addClass('hide');
            $('.filter-options .month').removeClass('hide');
        } 
        else if (date_option == "current_year") {
            $('.filter-options .month, .filter-options .rangue').addClass('hide');
            $('.filter-options .year').removeClass('hide');
        }
    } else {
        $('.filter-options .year, .filter-options .month').addClass('hide');
        $('.filter-options .rangue').removeClass('hide');
    }
}

// Abono por sustitución

var visitedOut;

function checkCountry(countryCode){
    if(countryCode != 108){
        $('#selectProvinceDiv').hide();
        $('#selectTownDiv').hide();
        visitedOut = true;
    } else {
        $('#selectProvinceDiv').show();
        $('#selectTownDiv').show();
        if (visitedOut)
        {
            setTimeout(function(){
                $('#provinceSelect').prepend('<option value="">Seleciona un una provincia ...</option>');
                $('#provinceSelect').val($("#provinceSelect option:first").val());
                $('#townSelect').html('');
            }, 200);
        }
    }
}


// on document ready
$(document).ready(function() {
    
    // Global

        // Cerramos mensaje
        $('.close-msg').click(function () {
            $(this).parent().addClass('hide');
        });

    // Filter: Remember date options
    if ($('#selectFilterDate :selected').val() === 'current_month') {
            $('.filter-options .year, .filter-options .rangue').addClass('hide');
            $('.filter-options .month').removeClass('hide');
    }
    if ($('#selectFilterDate :selected').val() === 'current_year') {
            $('.filter-options .month, .filter-options .rangue').addClass('hide');
            $('.filter-options .year').removeClass('hide');
    }
    
    // Sidebar: Remember date options
    if ($('#selectDate :selected').val() === 'current_month') {
        $('.capa-solicitudes .year, .capa-solicitudes .rangue').addClass('hide');
        $('.capa-solicitudes .month').removeClass('hide');
    }
    if ($('#selectDate :selected').val() === 'current_year') {
        $('.capa-solicitudes .month, .capa-solicitudes .rangue').addClass('hide');
        $('.capa-solicitudes .year').removeClass('hide');
    }

    
    
    // Página de anular solicitud
    if ($('body').hasClass('cancelPage')) {

        // Habilitamos / deshabilitamos el campo email mediante el check
        $('#sendmailChk').click(function () {
            if (this.checked) {
                $("input[name=email]").attr({
                    disabled:false
                });
            }
            else {
                $("input[name=email]").attr({
                    disabled:true
                });
            }
        });
    }



    // Página de resultados
    if ($('body').hasClass('resultsPage')) {

        // Sacamos el listado de filas seleccionadas en la tabla de lista de resultados

        var listResult = [];

        $('.listado').click(function () {
            $('.form-msg').addClass('hide');
            //downloadPDF forwardRequest
            listResult = [];
            $("input:checkbox.listado:checked").each(function(){
                listResult.push($(this).attr('id'));
            });
            if (listResult.length === 0) {
                $('.downloadPDF, .forwardRequest').addClass('btn--disabled');
            }
            else {
                $('.downloadPDF, .forwardRequest').removeClass('btn--disabled');
            }
        });

        $('.forwardRequest').click(function () {
            var url = $(this).attr('data-url');
            if (listResult.length === 0) {
                $('.noItemSelected').removeClass('hide');
            }
            if (listResult.length === 1) {
                window.location.href = url + listResult + '?origin=list';
            }
            else {
                $.ajax({
                    type: "GET",
                    url: url + 'multiple?requestIds=' + listResult.join('&requestIds='),
                    contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    success: function (response) {
                        if(response.ok){
                            $('.success').removeClass('hide');
                        } else {
                            $('.error').removeClass('hide')
                        }
                    },
                    error: function () { $('.error').removeClass('hide') }
                });
            }
        });

    }


    //Mostrar más opciones de búsqueda
    $('#showmoreoptions, #showlessoptions').click(function () {
        $('.capa-opciones-busqueda, #showmoreoptions, #showlessoptions').toggleClass('hide');
/*        if ($('.capa-opciones-busqueda').hasClass('hide')) {
            $('#showmoreoptions').html('Más opciones de búsqueda')
        }
        else {
            $('#showmoreoptions').html('Menos opciones de búsqueda')
        }*/
    });


    if ($('body').hasClass('hasCollapsers'))
    {
        $(window).resize(function(){
            var width = $(window).width();
            if (width < 1280)
            {
                if (!$('body').hasClass('noCollapseLeft')) {
                    $( "#leftArrow-dropDown" ).addClass( "close" );
                    $( ".content-lefttbar" ).addClass( "hide" );
                    $( "body" ).addClass( "collapse-leftbar" );
                }
                $( "#rightArrow-dropDown" ).addClass( "close" );
                $( "body" ).addClass( "collapse-rightbar" );
                $('#ui-datepicker-div').hide();
            }
        });

        $( "#leftBar" ).click(function() {
            $( "body" ).toggleClass( "collapse-leftbar" );
            $( "#leftArrow-dropDown" ).toggleClass( "close" );
            var width = $(window).width();
            if (width < 1280 && !$("body").hasClass('collapse-leftbar'))
            {
                $( "#rightArrow-dropDown" ).addClass( "close" );
                $( "body" ).addClass( "collapse-rightbar" );
                $('#ui-datepicker-div').hide();
            }
        });

        $( "#rightbar" ).click(function() {
            $( "body" ).toggleClass( "collapse-rightbar" );
            $( "#rightArrow-dropDown" ).toggleClass( "close" );
            var width = $(window).width();
            if (width < 1280 && !$("body").hasClass('collapse-rightbar') && !$('body').hasClass('noCollapseLeft'))
            {
                $( "#leftArrow-dropDown" ).addClass( "close" );
                $( ".content-lefttbar" ).addClass( "hide" );
                $( "body" ).addClass( "collapse-leftbar" );
                $('#ui-datepicker-div').hide();
            }
        });
    }

    // Página de abonar factura completo
    if ($('body').hasClass('paymentPage completo')) {

        // Habilitamos / deshabilitamos el campo Abono Justicia Gratuita
        $("#reason").change(function() {
            var val = $(this).val();
            if(val === "abonoJusticia") {
                $(".justicia-gratuita").removeClass('hide');
            }
            else {
                $(".justicia-gratuita").addClass('hide');
            }
        });

        $('button[form="complete_refund_form"]').click(function(){
            $('form#complete_refund_form').submit();
        })
        
    }

    // Página de abonar factura parcial
    if ($('body').hasClass('paymentPage parcial')) {

        var listResult = [];

        $('.listado').click(function () {
            $('.form-msg').addClass('hide');
            listResult = [];
            $("input.checkbox.listado:checked").each(function(){
                listResult.push($(this).attr('id'));
            });
        });

        $('#confirmPartial').click(function () {
            if (listResult.length === 0) {
                $('.noItemSelected').removeClass('hide');
            }
            else {
                // http://putsreq.com/JDqRuZxvUoYcpGaZqRf9/inspect
                $.ajax({
                    type: "POST",
                    url: "https://putsreq.herokuapp.com/JDqRuZxvUoYcpGaZqRf9",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(listResult),
                    crossDomain: true,
                    dataType: "json",
                    success: function () { $('.success').removeClass('hide') },
                    error: function () { $('.error').removeClass('hide') },
                });
            }
        });
    }   

    // Página de abonar factura por sustitución
    $('#confirm').click(function(){
        $('#substitution_refund_form').submit();
    });
    if ($('body').hasClass('paymentPage sustitucion')) {
        $('[data-js="name"]').click(function () {
            if ($(this).prop('checked')) {
                $('[data-js="nombre"]').prop( "disabled", false );
            }
            else {
                $('[data-js="nombre"]').prop( "disabled", true );
            }
        });
        $('[data-js="nif"]').click(function () {
            if ($(this).prop('checked')) {
                $('[data-js="nifnie"]').prop( "disabled", false );
            }
            else {
                $('[data-js="nifnie"]').prop( "disabled", true );
                $('.nif .letra, .nif .correcto, .nif svg, .nif .formato').addClass('hide');
            }
        });
        $('[data-js="taxes"]').click(function () {
            if ($(this).prop('checked')) {
                $('[data-js="selectTaxes"]').prop( "disabled", false );
                $('.taxes svg').removeClass('hide');
            }
            else {
                $('[data-js="selectTaxes"]').prop( "disabled", true );
                $('.taxes svg').addClass('hide');
            }
        });
        $('[data-js="irpf"]').click(function () {
            if ($(this).prop('checked')) {
                $('#selectIRPF, .irpf svg').removeClass('hide');
                if ($('#selectIRPF').val() == 'nuevo')
                {
                    $('.percent').removeClass('initial');
                    $('[data-js="inpIrpf"]').prop( "disabled", false );
                }
            }
            else {
                $('[data-js="inpIrpf"]').prop( "disabled", true );
                $('#selectIRPF, .irpf svg').addClass('hide');
                $('.percent').addClass('initial');
            }
        });
        $('.clickarea').click(function () {
            $('#pais').val($('#countrySelect option:selected').html());
            $('#provincia').val($('#provinceSelect option:selected').html());
            $('#municipio').val($('#townSelect option:selected').html());
            if (!$('[data-js="billAddress"]').prop('checked')) {
                $('#billAddressModification').prop('checked', true);
                $('.direccion .form-ico.form-ico--out input').prop( "disabled", false );
                $('.direccion select, .direction svg').removeClass('hide');
                $('.direction input').addClass('hide');
            }
            else {
                if ($('#substitution_refund_form').isValid()) {
                    $('[data-js="billAddress"]').prop('checked');
                    $('.direccion .form-ico.form-ico--out input').prop( "disabled", true );
                    $('.direccion select, .direction svg').addClass('hide');
                    $('.direction input').removeClass('hide');
                    $('#billAddressModification').prop('checked', false);
                }

            }
        });
        
        
       
        
        $("#selectIRPF").change(function() {
            var val = $(this).val();
            if(val === "nuevo") {
                $('[data-js="inpIrpf"]').val('16');
                $('.percent').removeClass('invisible');
                $('[data-js="inpIrpf"]').prop( "disabled", false );
                $('.percent').removeClass('initial');
            }
            else if(val === "noaplicar") {
            	
                $('.percent').addClass('invisible');
                $('[data-js="inpIrpf"]').val('0');
                $('[data-js="inpIrpf"]').prop( "disabled", false );
            }
            else {
                $('.percent').removeClass('invisible');
                $('[data-js="inpIrpf"]').prop( "disabled", true );
                $('[data-js="inpIrpf"]').val('16');
                $('.percent').addClass('initial');
            }
        });
        
        var pais = $('#pais').val();
        var countrycode =  $('#countrySelect').find('option:contains(' +pais+ ')').val();
        $('#countrySelect').val(countrycode);
        $('#countrySelect').change();
 

        setTimeout(function(){
            var provincia = $('#provincia').val();
            var provcode =  $('#provinceSelect').find('option:contains(' +provincia+ ')').val();
            $('#provinceSelect').val(provcode).change();
        }, 200);

        setTimeout(function(){
            var municipio = $('#municipio').val();
            var municode =  $('#townSelect').find('option:contains(' +municipio+ ')').val();
            $('#townSelect').val(municode).change();
        }, 400);

        $('#provinceSelect').change(function(){
            if ($(this).val() == 0) {
                $('#townSelect').html('');
            }
        });
    }
    
    // Página de abonar factura por cambio de emisor
    if ($('body').hasClass('paymentPage cambio-emisor')) {
        $('button[form="issuer_change_form"]').click(function(){
            $('form#issuer_change_form').submit();
        })
        $('[data-js="billAddress"]').click(function () {
            if ($(this).prop('checked')) {
                $('.direccion .form-ico.form-ico--out input').prop( "disabled", false );
                $('.direccion select, .direction svg').removeClass('hide');
                $('.direction input').addClass('hide');
            }
            else {
                $('.direccion .form-ico.form-ico--out input').prop( "disabled", true );
                $('.direccion select, .direction svg').addClass('hide');
                $('.direction input').removeClass('hide');
            }
        });
        $('#name').click(function () {
            if ($(this).prop('checked')) {
                $('#nombre, #apellidos').prop( "disabled", false );
            }
            else {
                $('#nombre, #apellidos').prop( "disabled", true );
            }
        });
        $('#nif').click(function () {
            if ($(this).prop('checked')) {
                $('#nifnie').prop( "disabled", false );
            }
            else {
                $('#nifnie').prop( "disabled", true );
                $('.nif .letra, .nif .correcto, .nif svg, .nif .formato').addClass('hide');
            }
        });
    }

    // Página de abonar factura por cambio de emisor
    if ($('body').hasClass('paymentPage cambio-emisor')) {

        $('#dni').focusout(function(){
            var dni = $('#dni').val();
            if  (nif(dni) === 1) {
                $('.nif .correcto, .nif .formato, .nif svg').addClass('hide');
                $('.nif .letra, svg.error').removeClass('hide');
            }
            else if (nif(dni) === 2) {
                $('.nif .formato, .nif .letra, .nif svg').addClass('hide');
                $('.nif .correcto').removeClass('hide');
            }
            else {
                $('.nif .letra, .nif .correcto, .nif svg').addClass('hide');
                $('.nif .formato, .nif svg.error').removeClass('hide');
            }
        })
        $('#dni').keypress(function(e){
            if(e.which == 13){
                $(this).blur();
            }
        });
        $('#name').click(function () {
            if ($(this).prop('checked')) {
                $('#nombre, #apellidos').prop( "disabled", false );
            }
            else {
                $('#nombre, #apellidos').prop( "disabled", true );
            }
        });
        $('#nif').click(function () {
            if ($(this).prop('checked')) {
                $('#dni').prop( "disabled", false );
            }
            else {
                $('#dni').prop( "disabled", true );
                $('.nif .letra, .nif .correcto, .nif svg, .nif .formato').addClass('hide');
            }
        });
    }

    // Página de confirmación de abono de factura
    if ($('body').hasClass('payment-confirm')) {
        if ($('.form-msg.form-msg--success.pay').length === 1) {
            $('body').prepend("<div class='spinner-curtain'></div><div class='sk-folding-cube'><div class='sk-cube1 sk-cube'></div><div class='sk-cube2 sk-cube'></div><div class='sk-cube4 sk-cube'></div><div class='sk-cube3 sk-cube'></div></div>")
            setTimeout(function(){
                $('a[data-js="abono-factura"]').addClass('disabled').attr("disabled", true);
                $('.spinner-curtain, .sk-folding-cube').remove();
            }, 1500);
        }
    }
    
    /*
     VALIDATION
     */


    var myLanguage = {
        errorTitle: 'El formulario no se ha podido enviar!',
        requiredField: 'Este campo es obligatorio',
        requiredFields: 'No ha contestado todos los campos requeridos',
        badTime: 'La hora proporcionada no es v&aacute;lida',
        badTelephone: 'El n&uacute;mero de teléfono proporcionado no es v&aacute;lido',
        badSecurityAnswer: 'La respuesta a su pregunta de seguridad es incorrecta',
        badDate: 'La fecha proporcionada no es v&aacute;lida',
        lengthBadStart: 'El campo debe incluir entre ',
        lengthBadEnd: ' caracteres',
        lengthTooLongStart: 'El campo debe de ser menor a ',
        lengthTooShortStart: 'El campo debe de ser mayor a ',
        notConfirmed: 'Los valores proporcionados no pudieron ser confirmados',
        badDomain: 'Ha introducido un dominio incorrecto',
        badUrl: 'La URL proporcionada no es v&aacute;lida',
        badCustomVal: 'Los valores proporcionados no son v&aacute;lidos',
        andSpaces: ' y espacios ',
        badInt: 'El valor proporcionado no es un n&uacute;mero v&aacute;lido',
        badSecurityNumber: 'El n&uacute;mero de seguridad social proporcionado es incorrecto',
        badUKVatAnswer: 'El número VAT proporcionado no es v&aacute;lido para el Reino Unido',
        badStrength: 'La contraseña proporcionada no es lo suficientemente segura',
        badNumberOfSelectedOptionsStart: 'Debe seleccionar al menos',
        badNumberOfSelectedOptionsEnd: ' respuesta(s)',
        badAlphaNumeric: 'El formato introducido es incorrecto (a-z y números)',
        badAlphaNumericExtra: ' y',
        badEmail: 'El formato introducido no es correcto',
        wrongFileSize: 'El archivo que está tratando de subir es demasiado grande (máx. %s)',
        wrongFileType: 'Sólo los archivos del tipo %s están permitido',
        groupCheckedRangeStart: 'Por favor, elija entre ',
        groupCheckedTooFewStart: 'Por favor, elija al menos ',
        groupCheckedTooManyStart: 'Por favor, elija un máximo de ',
        groupCheckedEnd: ' ítem(s)',
        badCreditCard: 'El n&uacute;mero de tarjeta de crédito proporcionado no es v&aacute;lido',
        badCVV: 'CVV proporcionado no es válido',
        wrongFileDim: 'Las dimensiones de la imagen no son validas,',
        imageTooTall: 'el alto de la imagen no puede ser mayor a',
        imageTooWide: 'el ancho de la imagen no puede ser mayor a',
        imageTooSmall: 'la imagen es demasiado pequeña',
        min: 'min.',
        max: 'máx.',
        imageRatioNotAccepted: 'La proporción de imagen (alto x ancho) no es v&aacute;lida',
        passwordComplexityStart: 'La contraseña debe contener al menos ',
        passwordComplexitySeparator: ', ',
        passwordComplexityUppercaseInfo: ' mayúscula(s)',
        passwordComplexityLowercaseInfo: ' minúscula(s)',
        passwordComplexitySpecialCharsInfo: ' caracter(es) especial(es)',
        passwordComplexityNumericCharsInfo: ' número(s)',
        passwordComplexityEnd: '.',
        bad: 'Very bad',
        weak: 'Weak',
        good: 'Good',
        strong: 'Strong'
    };



    // config validator

    $.validate({
        form: '.form',
        validateOnBlur: true, // disable validation when input looses focus
        inputParentClassOnError: 'form-box--error',
        borderColorOnError: 'none',
        modules: 'logic, security',
        language: myLanguage
    });

    // custom validations

    $.formUtils.addValidator({
        name : 'nifnie',
        validatorFunction : function(value, $el, config, language, $form) {
            return validateID(value);
        },
    });
 


    $.formUtils.addValidator({
        name : 'emailconfirm',
        validatorFunction : function(value, $el, config, language, $form) {
            return emailConfirm($el.attr('data-confirm'),$el.val());
        },
    });


    $.formUtils.addValidator({
        name : 'vies',
        validatorFunction : function(value, $el, config, language, $form) {
            return validateVIES(value);
        },
    });


    $.formUtils.addValidator({
        name : 'empresa',
        validatorFunction : function(value, $el, config, language, $form) {
            return validateEmpresa(value);
        },
    });


    $('.empresa-esp-ts').change(function () {
        return validateSociedad($(this).find('option:selected').val());
    });


    $.formUtils.addValidator({
        name : 'sociedad',
        validatorFunction : function(value, $el, config, language, $form) {
            return validateSociedad(value);
        },
    });



//DATEPICKER RANGE
$( function() {
    var dateFormat = "dd/mm/yy",
      from = $( "#from, #filterFrom" )
        .datepicker({
          defaultDate: "+1w",
          dateFormat: "dd/mm/yy",
          dayNamesMin: [ "D", "L", "M", "X", "J", "V", "S" ],
          dayNames: [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ],
          monthNamesShort: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
          changeMonth: true,
          firstDay: 1,
          numberOfMonths: 1
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to, #filterTo" ).datepicker({
        defaultDate: "+1w",
        dateFormat: "dd/mm/yy",
        dayNamesMin: [ "D", "L", "M", "X", "J", "V", "S" ],
        dayNames: [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ],
        monthNamesShort: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        changeMonth: true,
        firstDay: 1,
        numberOfMonths: 1
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });

    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }

      return date;
    }
  } );



// DESACTIVAR RADIOBUTTON
function myFunction() {
    document.getElementById("abonado").disabled = true;
}

// calling to svg-sprite management --



$.get("#staticServerUri#/img/management-site/svg/svg-symbols.svg", function(data) {
    console.log('svg-sprite')
    var div = document.createElement("div");
    div.className = "invisible";
    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    document.body.insertBefore(div, document.body.childNodes[0]);
});


});

/*
 JSON LOCATIONS
 http://registry-site-#openShiftDomainUri#
 */


// check if exists regions combo

if ($(".comu").length > 0) {
    $.getJSON("/tradis/api/location/regions", function(jsonData) {
        cb = '';
        $.each(jsonData, function(i, data) {
            cb += '<option value="' + data.value + '">' + data.label + '</option>';
        });

        //$(".comu").after('.first').append(cb);

        $(".comu").append(cb);

    });
}


// check if exists provinces combo

if ($('.prov').length > 0) {
    $.getJSON("/tradis/api/location/provinces", function(jsonData) {
        cb = '';
        $.each(jsonData, function(i, data) {
            cb += '<option value="' + data.value + '">' + data.label + '</option>';
        });
        $(".prov").append(cb);

        if (visitedOut)
        {
            setTimeout(function(){
                $('#provinceSelect').prepend('<option selected="selected">Seleciona un una provincia ...</option>');
            }, 50);
        }       

        // Check on load
        $('.cp').each(function() {

            if ($(this).val() > 0) {
                $(this).val(prependZeros($(this).val()));
                if ($(this).attr('data-depend')) {

                    $('#' + $(this).attr('data-depend') + ' option').prop('selected', false);
                    $('#' + $(this).attr('data-depend') + ' option[value=' + parseInt($(this).val().slice(0, 2)) + ']').prop('selected', true).change();
                    $('.spinner').remove();
                }

            }

        });


    });
}




// check if exists countries combo

$('.pais').each(function() {

    var $id_pais = $(this).attr('id');


    if ($(this).attr('data-cache') == "true") {

    } else if($(this).attr('data-cache') == "false"){

        // check if spain is excluded

        if (($(this).attr('data-spain')) == "excluded") {
            $url_pais = "/tradis/api/location/countries?spainExcluded=true";
        } else {
            $url_pais = "/tradis/api/location/countries";
        }


        $.getJSON($url_pais, function(jsonData) {
            cb = '';
            $.each(jsonData, function(i, data) {
                if (data.code == 108) {
                    cb += '<option data-content="' + $id_pais + '--00" value="' + data.code + '" selected="selected">' + data.name + '</option>';
                } else {
                    cb += '<option data-content="' + $id_pais + '--01" value="' + data.code + '">' + data.name + '</option>';
                }
            });
            console.log($id_pais);
            $('#' + $id_pais).append(cb);
            $.each($("option:selected"), function() {
                $('.' + $(this).attr('data-content')).removeClass('hide');
            });
            checkForms();
        });


    }


});



// check if exists european countries combo

$('.pais-ue').each(function() {

    var $id_paisUE = $(this).attr('id');


    // check if spain is excluded

    if (($(this).attr('data-spain')) == "excluded") {
        $url_paisUE = "/tradis/api/location/countries/UE?spainExcluded=true";
    } else {
        $url_paisUE = "/tradis/api/location/countries/UE";
    }


    $.getJSON($url_paisUE, function(jsonData) {

        cb = '';

        $('#' + $id_paisUE).append(cb);

        $.each($("option:selected"), function() {
            $('.' + $(this).attr('data-content')).removeClass('hide');
        });

        checkForms();
    });

});



// check if select has data-depend
$('select').on('change', function() {

    if ($(this).attr('data-load')) {

        loadJson = $(this).attr('data-load');

        if (loadJson == "prov") {
            cargaProv(this.value, $(this).attr('data-depend'));


        } else if (loadJson == "muni") {
            if (this.value == "") {
                //$(".muni").prop('disabled', true);
                //$(".regi").prop('disabled', true);
            }


            cargaMuni(this.value, $(this).attr('data-depend'), 'change');

            $(".regi").html('');
            $(".secc").html('');


        } else if (loadJson == "muniRegi") {
            cargaMuniRegi(this.value, $(this).attr('data-depend'), 'change');
            //$(".regi").html('');
            $('.search-reg').hide();

        } else if (loadJson == "regi") {
            cargaRegi(this.value, $(this).attr('data-depend'));
        } else if (loadJson == "regiProv") {
            cargaRegiProv(this.value, $(this).attr('data-depend'));
        } else if (loadJson == "secc") {
            cargaSecc(this.value, $(this).attr('data-depend'));
        }
    }
});




// load provincias
function cargaProv(value, depend) {

    $('#' + depend).children('option').remove();

    $.getJSON("/tradis/api/location/provinces?region=" + value, function(jsonData) {
        cb = '';
        $.each(jsonData, function(i, data) {
            cb += '<option value="' + data.value + '">' + data.label + '</option>';
        });
        $('#' + depend).append(cb);
        
        
    });

    $('#' + depend).focus();
}






// load municipios Registro

function cargaMuniRegi(value, depend, action) {

    spinCombo(depend);

    if ($('#' + depend).attr('data-cache')) {
        $(this).data('cache', false);


    } else if (action == 'change') {
        $('#' + depend).html('<option value="">Cargando municipios ...</option>');


        $.getJSON("/tradis/api/location/registralTowns?province=" + value, function(jsonData) {

            cb = "";
            item = 0;

            $.each(jsonData, function(i, data) {
                cb += '<option value="' + data.value + '">' + data.label + '</option>';
                item++;

            });

            if (item > 1) {
                $('#' + depend).html('<option value="">Selecciona un municipio</option>' + cb);
            } else {
                $('#' + depend).html(cb);
                cargaRegi($('#' + depend).value, $('#' + depend).attr('data-depend'));

            }

            $('#' + depend).removeClass('disable');
            $('#'+depend).focus();
        });

    }

    $('.spinner').remove();

}
 



// load municipios

function cargaMuni(value, depend, action) {

    spinCombo(depend);


    if ($('#' + depend).attr('data-cache')) {
        $(this).data('cache', false);
        alert('none');

    } else if (action == 'change' && value > 0) {

        $('#' + depend).html('<option value="">Cargando municipios ...</option>');

        $.getJSON("/tradis/api/location/towns?province=" + value, function(jsonData) {
            cb = "";
            var item = 0;

            $.each(jsonData, function(i, data) {
                cb += '<option value="' + data.value + '">' + data.label + '</option>';
                item++;
            });


            if (item > 1) {
                $('#' + depend).html('<option value="">Seleccione el municipio</option>' + cb);
            } else {
                $('#' + depend).html(cb);
                cargaRegi($('#' + depend).value, $('#' + depend).attr('data-depend'));
            }

        });

        $('#' + depend).removeClass('disable');
        $('.spinner').remove();
        $('#'+depend).focus();


    }




}




// load registros
function cargaRegi(value, depend) {

    spinCombo(depend);
    $('#' + depend).children('option').remove();


    $.getJSON("/tradis/api/registries?province=" + ($('.provi:enabled').find('option:selected').val()) + "&town=" + ($('.muni:enabled').val()), function(jsonData) {

        cb = "";
        item = 0;

        $.each(jsonData, function(i, data) {
            cb += '<option value="' + data.value + '">' + data.label + '</option>';
            item++;
        });

alert('1');

        if (item > 1) {
            $('#' + depend).html('<option value="">Selecciona el registro</option>' + cb);
            alert('2');

            if(depend == 'selectRegistro-01')
                $('.search-reg').show();
            alert('3'); 

        } else {
            alert('4');
            $('#' + depend).html(cb);
            cargaSecc($('#' + depend).value, $('#' + depend).attr('data-depend'));


            if ($('#'+depend).attr('data-input')) {
                alert('5');
                $('.'+$(this).attr('data-input')).attr('value', $(this).find('option:selected').text());
            }

            if(depend == 'selectRegistro-01')
                $('.search-reg').hide(); alert('6');

        }


    });

    $('#' + depend).removeClass('disable');
    $('.spinner').remove();


}

// load registros de provincia
function cargaRegiProv(value, depend) {

    spinCombo(depend);
    $('#' + depend).children('option').remove();
    $('#' + depend).html('<option>Cargando registros ...</option>');


    $.getJSON("/tradis/api/provinceRegistries?province=" + value, function(jsonData) {

        cb = "";
        item = 0;

        $.each(jsonData, function(i, data) {
            cb += '<option value="' + data.value + '">' + data.label + '</option>';
            item++;
        });


        if (item > 1) {
            $('#' + depend).html('<option value="">Seleccione un registro</option>' + cb);
        } else {
            $('#' + depend).html(cb);
        }



    });

    $('#' + depend).removeClass('disable');
    $('.spinner').remove();

}

//load secciones
function cargaSecc(value, depend) {

    spinCombo(depend);
    $('#' + depend).children('option').remove();
    $('#' + depend).html('<option>Cargando secciones ...</option>');


    $.ajax({
        type: 'GET',
        url: '/api/registrySections?registryCode=' + $('.regi:enabled').val(),
        data: { get_param: 'label, value' },
        dataType: 'json',
        timeout: 3000,
        success: function (data) {
            cb = 0;
            item = 0;

            $.each(data, function(i, data) {
                cb += '<option value="' + data.value + '" th:text="'+ data.label +'">' + data.label + '</option>';
                item++;
            });



            if (item > 1) {
                $('#' + depend).html('<option value="" th:text="#{search.section.select}">' + $('#' +depend).attr('data-option') + '</option>' + cb);
            } else {
                $('#' + depend).html(cb);
            }

        },
        error: function(xmlhttprequest, textstatus, message) {
            if(textstatus==="timeout") {
                alert("got timeout");
            } else {
                alert(textstatus);
            }
        }
    }).done(function() {
        console.log('secciones cargadas con éxito');
    })



    $('#' + depend).removeClass('disable');
    $('.spinner').remove();
    $('#'+depend).focus();
}

// Spinner image when combo is loading
function spinCombo (comboid) {
    $('#' + comboid).parent().append('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>')
}
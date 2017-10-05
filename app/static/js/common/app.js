/* app functions common 1.19 */

/*function checkPasswordMatch() {
    var password = $(".pw1:enabled").val();
    var confirmPassword = $(".pw2:enabled").val();
    if (password != confirmPassword) {
        $('.form-text.pw.error').removeClass('hide');
        return '1'
    }
    else {
        $('.form-text.pw.error').addClass('hide');
        return '2'
    }
}*/



// cookies stuff
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}






// Mobile detector
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

function scrollBottom(id) {
    var d = $('.' + id);
    d.scrollTop(d.prop("scrollHeight"));
}

function markCheck(id, mode) {
    var d = $('#' + id);
    d.prop('checked', mode)
}

// uuid generator
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}


// Spinner image when combo is loading

function spinCombo (comboid) {
    $('#' + comboid).parent().append('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>')
}


function spinner() {
	$('body').addClass('loading');
}


/*
 PREPEND ZEROS
 */

function prepend (str, max) {
    str = str.toString();
    return str.length < max ? prepend("0" + str, max) : str;
}

// functions
function openLateral(modalContent) {
    $('.modal-lateral-content .hidden').hide();
    $('.'+ modalContent).show();
    $('.modal-lateral').addClass('modal-lateral--move');
    $('.overlay').fadeIn('slow');
    $('body').css({
        'overflow' : 'hidden',
       // 'position' : 'fixed'
    });
    // set focus to open link
    $('.modal-lateral-close').attr("href", "#"+modalContent);
}

function closeLateral() {
    $('.modal-lateral').removeClass('modal-lateral--move');
    $('.overlay').fadeOut('slow');
    $('body').css({
        'overflow' : 'auto',
        'position' : 'static'
    });
}

// Open lateral modal

$('.modal-lateral-open').click(function() {
    openLateral($(this).attr('data-content'));
});

// Close lateral modal

$('.modal-lateral-close').click(function() {
    closeLateral();
});

// close all modals when press outside

$('.overlay').click(function() {
	if(!$(this).hasClass('blocked')) {
        $('.modal-lateral').removeClass('modal-lateral--move');
        $('.modal').removeClass('modal--move');
        $('.overlay').fadeOut('slow');
        $('body').css({
            'overflow': 'auto',
            'position': 'static'
        });
    }
});



/*
FILTRADO
*/

$('.table-filter__options').on('keyup change', 'input, select, textarea', function(){
    item = 0;

    // activamos el boton y mostramos link eliminar
    //$('.apply-filter').removeClass('btn--disabled');
    //$('.delete-filter').show();


    $('.table-filter__options :input').each(function() {
     if ($(this).val() !== '') {
       item++;
     }
    });

   // si todos los campos estan vacios
   if(item<=1) {
      //$('.apply-filter').addClass('btn--disabled');
     //$('.delete-filter').hide();
     console.log('ocultamos');
     $('.table-filter__buttons').slideUp('fast');
   } else {
     console.log('mostramos');
     $('.table-filter__buttons').slideDown('fast');
   }

});

// si pulsamos eliminar filtro
$('.delete-filter').on('click', function() {
  $('.table-filter__buttons').slideUp('fast');
  $('.table-filter__options .form').trigger("reset");
});





/*
CARGADOR
*/

// mostrar cargador
function showLoading() {
	$('.overlay').css('display', 'flex');
	$('.overlay').addClass('blocked');
	$('.overlay').html('<div class="loader"><div class="lds-css ng-scope"> <div style="width:32px;height:32px" class="lds-rolling"> <div></div> </div></div></div>');
}

// ocultar cargador
function hideLoading() {
	$('.overlay').fadeOut('slow');
}



function getSearchParams(k){
	 var p={};
	 location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
	 return k?p[k]:p;
	}

/*
 CAMBIO IDIOMA
 */



$('#select-language').change(function() {

	// obtenemos url sin parametros
	url = (location.protocol + '//' + location.host + location.pathname);

	// se concatena parametro de idioma y se recarga la web
	window.location.replace(url + "?lang=" + $(this).find('option:selected').val());

});



/*
 Codificación password SHA3
*/


$("input:password").change(function() {
console.log('el password instroducido es: ' +$(this).val()+' y su hash es: ' +sha3_256($(this).val()));
$('.'+$(this).attr('data-sha3')).val(sha3_256($(this).val()));
});





/*
 WINDOW MODAL
 */

function openModal(modalContent) {
    $('.modal-content .hidden').hide();
    $('.'+ modalContent).show();
    $('.modal').css('display','flex');
    $('.overlay').fadeIn('slow');
    $('.modal-box').addClass('modal--move');
    $('body').addClass('no-scrolling');

}

function closeModal() {
    $('.modal-box').removeClass('modal--move');
    $('.modal-lateral').removeClass('modal-lateral--move');
    $('.modal').fadeOut('slow');
    $('.overlay').fadeOut('slow');
    $('body').removeClass('no-scrolling');
    $('body').css({
        'overflow' : 'auto',
        'position' : 'static'
    });
}


// Open window modal
$('.modal-open').click(function() {
    if (!$(this).hasClass('no-open')) {
        openModal($(this).attr('data-content'));
    }
});

// Close window modal

$('.modal-close').click(function() {
    closeModal();
});


$('.modal-box').click(function(event) {
    event.stopPropagation();
});


function legalModalQA () {
    openModal('modal-terms')
    setTimeout(function () {
        $('.legal-container').animate({scrollTop:5000}, 2000);
    }, 4000);
    setTimeout(function () {
        $('#acceptTermsIdentify').click();
    }, 8000);
}

// reCaptcha

function imNotARobot() {
    var code = grecaptcha.getResponse();
    $('#ccode').val(code);
    $('.recaptchaInput').addClass('hide');
}



//This is an IE fix because pointer-events does not work in IE
$(document).on('mousedown', '.disable', function (e) {

    $(this).hide();
    var BottomElement = document.elementFromPoint(e.clientX, e.clientY);
    $(this).show();
    $(BottomElement).mousedown(); //Manually fire the event for desired underlying element

    return false;

});






$(document).ready(function() {


  $('.home-box__areas .list__item').click(function () {
    $('.home-box__areas .list__item').removeClass('list__item--active');
    $(this).addClass('list__item--active');

    $('.section').hide();
    $('.'+$(this).data('content')).show();
  });


  $('.section-box .title-submod').click(function() {
        if($(window).width() &lt; 768) {
            
            if($(this).next('box__content:visible')) {
                
            } else {
                $('.section-box .title-submod .icon').css('transform', 'rotate(90deg)');
                $(this).children('.icon').css('transform', 'rotate(270deg)');
                $('.section-box .box__content').slideUp();
                $(this).next('.box__content').slideDown();
                $(this).addClass('open');
            }
           
        }
  });

    // Alta nuevo abonado
        //Password strength
        $("input:password.pw1").pwstrength(); // First password input field
        //Password matching
/*      $("input:password.pw2").keyup(checkPasswordMatch);*/

/*        $("input:password.pw1, input:password.pw2").focusout( function(){
                if (checkPasswordMatch() === '1') {
                    alert('no coinciden')
                }
                else {
                    alert('coinciden')
                }
            }
        )*/


    // Prevent multisession
    /*if (!$('main').hasClass('multisession')) {
        // setting sessionStorage uuid
            var uuidNumber = guid();
            sessionStorage.uuid = uuidNumber;
            localStorage.uuid = uuidNumber;

        var sessionWatcher = setInterval(function(){
            if (sessionStorage.uuid !== localStorage.uuid)
            {
                clearInterval(sessionWatcher);
                $('.modal-content .hidden').hide();
                $('.modal-multisession').show();
                $('.modal-ms').css('display','flex');
                $('.overlay').fadeIn('slow');
                $('.modal-box').addClass('modal--move');
                $('body').addClass('no-scrolling');
                $('body').addClass('no-scape');
                document.addEventListener("contextmenu", function(e){
                    e.preventDefault();
                }, false);
                function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
                $(document).on("keydown", disableF5);
            }
        }, 5000);
    }*/


    // Set #uuid hidden input value

    $('#uuid').val(sessionStorage.uuid);

    /*
     SVG4EVERYBODY svg for ie9 and lower versions
     TODO Necesario compatibilidad svg ?¿

    */

    // svg4everybody();










    /*
      TOOLTIP JQUERY UI.
      TODO Necesario tooltip ?¿
    */

    /*
     $( function() {
        $( document ).tooltip();
        $( document ).tooltip().off("mouseover mouseout click");
      } );
    */



// Modales

    /*
     LATERAL MODAL
     */


// Datos de la solicitud (por cuenta y en nombre de)
    // Detectamos si lo introducido en el campo NIF es empresa o persona física, seteando required o no el campo nombre.
    $('input.nifcif').focusout(function() {
        var data = $(this).val();
        if (data !== '')
        {
            var val = ValidateSpanishID(data);
            if (val.type == 'cif') {
                $('input.ifEmpresa').attr("data-validation" , '');
                $('input.ifEmpresa').validate();
            }
            else {
                var num = data.substr(data.length-1);
                if (!$.isNumeric(num))
                {
                    $(this).val(prepend(data, '9'));
                }
                $('input.ifEmpresa').attr("data-validation" , 'required');
                $('input.ifEmpresa').validate();
            }
        }
    })

    // Seteamos a opcional el campo nombre al seleccionar VAT Number en el combo
    $('#applicant-id-type').change(function() {
        if ($(this).val() == 'VAT_NUMBER') {
            $('input.ifEmpresa').attr("data-validation" , '');
            $('#inp-sd02').blur();
        }
        else {
            $('input.ifEmpresa').attr("data-validation" , 'required');
        }
    })

// Pago seguro

    if ($('body').attr("data-content") == 'checkout') {


        $('button#acceptTermsCheckout').click(function() {
            $('label.modal-open').addClass('no-open');
            if (!$("input#termsAndConditionsCheckout").is('checked')) {
                $("input#termsAndConditionsCheckout").removeAttr("disabled");
                closeModal();
                $('html, body').animate({
                    scrollTop: $("#termsAndConditionsCheckout").offset().top -100
                }, 1000);
                $("input#termsAndConditionsCheckout").prop('checked','true');
            }
        });

        $('label[for="termsAndConditionsCheckout"]').click(function(){
            if (!$("input#termsAndConditionsCheckout").is(':checked')) {
                $('label.modal-open').removeClass('no-open');
            }
            else {
                $('label.modal-open').addClass('no-open');
            }
        })


    }

// Certificaciones
    $('[data-label="certificaciones"] #cert-01, [data-label="certificaciones"] #cert-02').click(function(){
        $('*[data-title="certificacion"]').html($(this).next().next().html())
    })

// Legal terms and conditions

    // Enable acceptation of legal terms on scroll
    $('.legal-container').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() + 10 >= $(this)[0].scrollHeight) {
            $(this).parent().children('.legal-buttons').children('button').removeClass('btn--disabled');
        }
    })





    // Enable legal translation terms check on accept button
    $('button.acceptTerms').click(function() {
        $(".translationCheck ").removeAttr("disabled");
        closeModal();
        $('html, body').animate({
            scrollTop: $(".translation").offset().top -100
        }, 1000);
        $('input.translationCheck').prop('checked','true');
        toggleItem($('.translationCheck'));
        $('label.modal-open').addClass('no-open');

    });





    // Enable legal/translation terms check on accept button
    $('button.acceptTermsIdentify').click(function() {
        $('label.modal-open').addClass('no-open');
        if (!$("input#termsAndConditionsIdentify").is('checked')) {
            closeModal();
            $('html, body').animate({
                scrollTop: $("#termsAndConditionsIdentify").offset().top -100
            }, 1000);
            $('.masked').remove();
            if (!$('#termsAndConditionsIdentify').is(':checked'))
            {
                $('#termsAndConditionsIdentify').trigger('click');
            }
        }
    });





    // Enable checkout terms check on accept button
    $('button.acceptTermsCheckout').click(function() {
        $('label.modal-open').addClass('no-open');
        if (!$("input#termsAndConditionsCheckout").is('checked')) {
            closeModal();
            $('html, body').animate({
                scrollTop: $("#termsAndConditionsCheckout").offset().top -100
            }, 1000);
            $('.masked').remove();
            if (!$('#termsAndConditionsCheckout').is(':checked'))
            {
                $('#termsAndConditionsCheckout').trigger('click');
            }
        }
    });


    $('.submit-identify-checkout').click(function(){
        $("input#termsAndConditionsCheckout").attr('disabled', false);
    })

    $('.masked').click(function(){
        if ($('#termsAndConditionsIdentify').is(':checked')) {
            $('#termsAndConditionsIdentify').trigger('click');
        }
        if ($('#termsAndConditionsCheckout').is(':checked')) {
            $('#termsAndConditionsCheckout').trigger('click');
        }
        else {
            openModal('modal-terms');
        }
    })

    $('.masked-payment').click(function(){
        if ($('#termsAndConditionsIdentify').is(':checked')) {
            $('#termsAndConditionsIdentify').trigger('click');
        }
        if ($('#termsAndConditionsCheckout').is(':checked')) {
            $('#termsAndConditionsCheckout').trigger('click');
        }
        else {
            openModal('modal-terms-lopd');
        }
    })



    // close all modals when press esc

    $(document).keydown(function(e) {
        // ESCAPE key pressed
        if (e.keyCode == 27 && !$('body').hasClass('no-scape')) {
            $('.modal-lateral').removeClass('modal-lateral--move');
            $('.overlay:not(.blocked)').fadeOut('slow');
            $('.modal').fadeOut('slow');
            $('.modal-box').removeClass('modal--move');
            $('body').removeClass('no-scrolling');
            $('body').css({
                'overflow' : 'auto',
                'position' : 'static'
            });
        }
    });


    /*
      GET URL PARAM

    */

    // $.urlParam = function(name){
    //     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    //     return results[1] || 0;
    // }
    //
    //
    // console.log($.urlParam('form'));
    //

    function urlParam(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        // Need to decode the URL parameters, including putting in a fix for the plus sign
        // http://stackoverflow.com/a/24417399
        return results ? decodeURIComponent(results[1].replace(/\+/g, '%20')) : null;
    }


    /*
      RELOAD PAGE
      Must add "reload-page" class to refresh page.
    */

    function reloadPage() {
        window.location.reload(true);
    }


    $('.reload-page').click(function() {
        reloadPage();
    })


    /*
      DON'T SCROLL UP
      Add "noUp" class to don't up on clicking link
    */

    $('.notUp').click(function(e) {
        e.preventDefault();
    });


    /*
      GO BACK
      Add ".go-back" class to return before´s page
    */

    function goBack() {
        window.history.back();
    }

    $('.go-back').click(function() {
        goBack();
    });


    /*
      ADD FILE
    */

    $(".add-file__input").change(function() {
        $(this).siblings(".add-file__file").html('<strong>' + $(this).val().split('\\').pop() + '</strong>');
    });


    /*
   	  SHOW MSG
    */

    $(".show-msg").click(function() {
    	$(this).parent().parent().next('.gen-msg').show();
    });


    /*
      DISABLED INPUT
    */


    /*
     * 	TODO: Borrar ?¿?
     *
     * $('.disable').on('mousedown', function(e) {
    	  e.preventDefault();
    	  this.blur();
    	  window.focus();
	});*/


    /*
      TOOLTIP
      Add "tooltip-open" to show data-content
    */

    $('.tooltip-open').click(function() {
        openTooltip($(this).attr('data-content'));
    });

    function openTooltip(tooltipContent) {
        $('.' + tooltipContent).toggle();
    }


    // menu dropdown
    $('.panel--dropdown .link--primary').click(function() {
        $('.panel--dropdown').toggleClass('panel--dropdown--open');
    });


    function indexElement() {
        $(".rb-group .rb-option").eq(2).prop('checked', true);
    }

    indexElement();




    /*
      MENU
    */

    // menu functions

    function openMenu(menuClass) {
        $(menuClass).addClass('show-menu');
        $('body').addClass('o-hidden');
    }

    function closeMenu(menuClass) {
        $(menuClass).removeClass('show-menu');
        $('body').removeClass('o-hidden');
    }

    // web links menu

    $('.link--menu-web').click(function() {
        if ($('.menu__user--nav').hasClass('show-menu')) {
            closeMenu('.menu__user--nav');
        } else if ($('.menu__menu--nav').hasClass('show-menu')) {
            closeMenu('.menu__menu--nav');
        } else {
            openMenu('.menu__menu--nav');
        }
    });

    // user menu

    $('.link--user').click(function() {
        if ($('.menu__user--nav').hasClass('show-menu')) {
        	console.log('cerramos menu');
            closeMenu('.menu__user--nav');
        } else {
        	console.log('abrimos menu');
            openMenu('.menu__user--nav');
        }
    });


    $(document).on("click", '.add-remove', function() {

        var removeCheck = $(this).attr('data-remove');
        $('.' + removeCheck + '-hide').prop('checked', false);
        $(this).parent().parent().remove();
        sumTotal();

    });

    /*
      SLIDE MENU
    */


    $('.slide-menu__menu .link').click(function() {
        $('.slide-menu .link').removeClass('link--active');
        $(this).addClass('link--active');

        if ($(this).attr('data-content')) {
            $('.slide-menu__options .panel').hide();
            $('.' + $(this).attr('data-content')).removeClass('hide').fadeIn();

        }
    });





    /*
    SLIDE TOGGLE
    Add .slideToggle and data-content to apply effect:


    <a class="slideToggle" data-content="info-div">Show info<a>

    <div class="info-div>Info content</div>
    */


    $('.slideToggle').click(function() {
        if ($(this).attr('data-content')) {
        	$('.' + $(this).attr('data-content')).slideToggle();
        }

    });



    /*
    AUTOSELECT
   */


    // If no radiobutton selected, select first
    if ($(".autoselect input:checked").length == 0) {
        $(".autoselect input:first").prop('checked', true);
    }





    /*
    CHECKFORMS
   */


    function checkForms() {
        $('.form-panel').addClass('hide');


        $.each($("input[type=radio]:checked"), function() {
            	$('.' + $(this).attr('data-content')).removeClass('hide');

            	if($(this).attr('data-enable')) {
            		$('.' + $(this).attr('data-enable')).prop('readonly', false).removeClass('disable');
            	}
            	if($(this).attr('data-disable')) {
            		$('.' + $(this).attr('data-disable')).prop('readonly', true).addClass('disable');
            	}

            	// mostrar ocultar si existe data-show o data-hide
            	$('.' + $(this).attr('data-show')).removeClass('hide');
            	$('.' + $(this).attr('data-hide')).addClass('hide');
        });




        $.each($("input[type=checkbox]:checked"), function() {
            $('.' + $(this).attr('data-content')).removeClass('hide');


        });




        $('.form-panel').each(function() {

            if ($(this).hasClass('hide')) {
            	$(this).find('.form-panel').addClass('hide');
            	$(this).find(':input').prop("checked", false);
                $(this).find(':input').prop("disabled", true);
               // $(this).find(':input').val('');

            } else {
                $(this).find(':input').prop("disabled", false);
                $.each($("option:selected"), function() {

                    //only when parent (select) is visible, show related content
					if($(this).parent().is(":visible"))
                        $('.' + $(this).attr('data-content')).removeClass('hide');

                });
                if ($('input[type=radio]').attr('data-cache') == "true") {
                	$('.' + $(this).attr('data-content')).removeClass('hide');
            		$(this).prop("checked", true);
                	$(this).attr('data-cache', false);
                }
            }
        });

        $('.form-gen').each(function() {
        	if($(this).hasClass('hide')) {
                $(this).find(':input').prop("disabled", true);

        	}
        });
    }


    $('.select').change(function() {
        if ($(this).attr('data-depend')) {
            $('.' + $(this).attr('data-depend')).addClass('hide');
        }

        // clear fields with the same class defined in data-clear
        if ($(this).attr('data-clear')) {
            $('.' + $(this).attr('data-clear')).val('');
        }

        if ($(this).attr('data-input')) {
        	$('.'+$(this).attr('data-input')).attr('value', $(this).find('option:selected').text());
        }
        checkForms();
    });

    $('.radiobutton').each(function() {
    	if($(this).attr('data-cache') == "true") {
    		$('.' + $(this).attr('data-content')).removeClass('hide');
    		$(this).prop("checked", true);
        	$(this).attr('data-cache', false);
    	}

    })

    $('.radiobutton').change(function() {
        checkForms();
    });

    $('.checkbox').change(function() {
        checkForms();
    });


    checkForms();



    /*
     STICKY RESUME
     */

    // si ancho mayor a 1024px aplicamos sticky
	if($(window).width() > 1024) {
        $(".resume-box").sticky({topSpacing:60});
     }

    // al redimensionar la pantalla comprobamos su ancho para sticky / no sticky
	$(window).on('resize', function(){
		if($(window).width() > 1024) {
	         $(".resume-box").sticky({topSpacing:60});
		} else {
			 $(".resume-box").unstick();
		}
    });



    /*
      ADD ITEMS TO RESUME
    */


    function toggleItem(item) {
        if (item.prop('checked')) {

            // checking if item already exists
            if ($('.' + item.attr('id')).length === 0) {
                $('.resume-add').append('<div class="add ' + item.attr('id') + '"><div class="add__concept">' + item.attr('data-concept') + '<a class="link link--primary add-remove" data-remove=' + item.attr('id') + '>' + item.attr('data-delete-concept') + '</a></div><div class="add__amount"><strong><span class="price">' + item.attr('data-value') + '</span>&euro;</strong></div></div>');
                $('.' + $(this).attr('id')).prop("checked", false);
                //var url = document.location.href+"&success=yes";
                //document.location = url;
            }

        } else {
            $('.' + item.attr('id')).remove();
            $('.' + item.attr('id') + '-hide').prop('checked', false);
        }

        sumTotal();
    }


    $.each($(".additional[type=checkbox]:checked"), function() {
        toggleItem($(this));
    });

    // click delete item
    $(document.body).on('click', '.add-remove', function() {
        $('.' + $(this).attr('data-remove')).remove();
        $('#' + $(this).attr('data-remove')).prop("checked", false);
        sumTotal();
        $('a.link--back').each(function(){
            this.href += '?checkTranslation=false';
       })


    });

    // if checkbox status is updated
    $('.additional').change(function() {
        toggleItem($(this));
    });



    /*
    SUM
    Add "price-total" to show sum
    */


    function sumTotal() {
        var total = 0;
        $('.resume-box').find(".price").each(function() {

            total += parseFloat(($(this).text().replace(",", ".")));
        });


        $('.price-total').html(((total) * parseInt($('.resume-max').text())).toFixed(2));

    }

    if ($('.resume-box')) {
        sumTotal();
    }


    /*
      FILTERS
    */

    // show/hide filters

    $('.link--filter').click(function() {
        $(this).toggleClass('link--active');
        $('.table-filter__show').toggleClass('table-filter__show--active');
        $('.table-filter__options').slideToggle('fast');
    });







    /*
      CAPTCHA
    */

    // show captcha (login)

    $('.btn--captcha').click(function() {
        $(this).fadeOut('fast');
        $('.g-recaptcha').fadeIn('slow');
    });


    /*
      MESSAGES
    */

    // close message

    $('.close-msg').click(function() {
        $(this).parent().fadeOut('slow');
    });


    /*
      ACCESSIBILITY
      TODO modo alto contraste
    */


    $('.hc-mode').click(function() {
        $('body').toggleClass('hc');
    });



    /*
      FEEDBACK
    */


    $("#help-feedback").click(function() {
        $("#help-feedback").toggleClass("closed-feedback opened-feedback");
        $(".feedback__wrap").slideToggle("slow");
    });

    /* Scroll to end */

    $(".link--toggle").click(function() {
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 1000);
    });



    /*
      RADIOBUTTON TABLE
     */

    $(".table--radio .radiobutton").change(function() {
    	$(".table--radio").find(':input[type=hidden]').prop("disabled", true);
    	$(this).closest('tr').find(':input').prop("disabled", false);
    });


    /*
      SELECT ALL
    */

    // add multiple select / deselect functionality
    $("#cb-all").click(function() {
        $('.case').attr('checked', this.checked);
        $(".cb-option.disabled").prop("disabled", false);
    });

    // if all checkbox are selected, check the selectall checkbox
    // and viceversa
    $(".case").click(function() {

        if ($(".case").length == $(".case:checked").length) {
            $("#cb-all").attr("checked", "checked");
        } else {
            $("#cb-all").removeAttr("checked");
        }

    });










    /*
    	POSTAL CODES
    */


    $('.cp').on('blur', function() {

    	if ($(this).val() > 0) {
            $(this).val(prepend ($(this).val(), 5));
        }

        if ($(this).attr('data-depend')) {

            $('.muni').removeAttr('data-cache');
            $('.muni:enabled').html('');
            $('#' + $(this).attr('data-depend') + ' option').prop('selected', false);
            $('#' + $(this).attr('data-depend') + ' option[value=' + parseInt($(this).val().slice(0, 2)) + ']').prop('selected', true).change();
            //$('#'+$(this).attr('data-depend')).prop('disabled', 'disabled');

        }
    });






    /*
		FORMAT NIF
    */


    $('.nif').on('blur', function() {
    	if($(this).val().length > 1)
    		$(this).val(prepend($(this).val(), 9));

    })




    /*
        JSON LOCATIONS
        http://registry-site-#openShiftDomainUri#
    */


    // check if exists regions combo

    if ($(".comu").length > 0) {
        $.getJSON("/api/location/regions", function(jsonData) {
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
        $.getJSON("/api/location/provinces", function(jsonData) {
            cb = '';
            $.each(jsonData, function(i, data) {
                cb += '<option value="' + data.value + '">' + data.label + '</option>';
            });
            $(".prov").append(cb);


            // Check on load
            $('.cp').each(function() {

                if ($(this).val() > 0) {
                    $(this).val(prepend($(this).val()));
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
                $url_pais = "/api/location/countries?spainExcluded=true";
            } else {
                $url_pais = "/api/location/countries";
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
            $url_paisUE = "/api/location/countries/UE?spainExcluded=true";
        } else {
            $url_paisUE = "/api/location/countries/UE";
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

        $.getJSON("/api/location/provinces?region=" + value, function(jsonData) {
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
        	$('#' + depend).html('<option value="">Cargando datos ... </option>');
            //$('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-loading') + '</option>');


            $.getJSON("/api/location/registralTowns?province=" + value, function(jsonData) {

                cb = "";
                var item = 0;

                $.each(jsonData, function(i, data) {
                    cb += '<option value="' + data.value + '">' + data.label + '</option>';
                    item++;

                });

                if (item > 1) {
                	$('#' + depend).html('<option value="">Seleccione municipio </option>' + cb);
                    //$('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-select') + '</option>' + cb);
                } else {
                    $('#' + depend).html(cb);
                    cargaRegi($('#' + depend).value, $('#' + depend).attr('data-depend'));

                }

                $('#' + depend).removeClass('disable');
                $('#'+depend).focus();
                $('.spinner').remove();
            });

        }



    }




    // load municipios

    function cargaMuni(value, depend, action) {

    	spinCombo(depend);


        if ($('#' + depend).attr('data-cache')) {
            $(this).data('cache', false);

        } else if (action == 'change') {
        	$('#' + depend).html('<option value="">Cargando datos ... </option>');
            //$('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-loading') + '</option>');

            $.getJSON("/api/location/towns?province=" + value, function(jsonData) {

                cb = "";
                var item = 0;

                $.each(jsonData, function(i, data) {
                    cb += '<option value="' + data.value + '">' + data.label + '</option>';
                    item++;
                });


                if (item > 1) {
                	$('#' + depend).html('<option value="">Seleccione municipio </option>' + cb);
                    // $('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-select') + '</option>' + cb);
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




    // Carga de registros

    function cargaRegi(value, depend) {

    	// cargamos spinner y borramos resultados anteriores

    	spinCombo(depend);
        $('#' + depend).children('option').remove();
        $('#' + depend).html('<option value="">Cargando datos ... </option>');
        //$('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-loading') + '</option>');

        var item = 0;
        var data;

        $.getJSON("/api/registries?province=" + ($('.provi:enabled').find('option:selected').val()) + "&town=" + ($('.muni:enabled').val()), function(jsonData) {

            var cb = "";

            $.each(jsonData, function(i, data) {

                /*   TRADIS-2450
            	if(data.disabled == false) {
            		cb += '<option value="' + data.value + '">' + data.label + '</option>';
            	} else {
            		cb += '<option value="' + data.value + '" disabled>' + data.label + '</option>';
            	}
            	*/

                cb += '<option value="' + data.value + '">' + data.label + '</option>';

                item++;
            });



            if (item > 1) {
            	$('#' + depend).html('<option value="">Seleccione registro </option>' + cb);
                //$('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-select') + '</option>' + cb);

                if(depend == 'selectRegistro-01')
                	$('.search-reg').show();

                // si no hay municipio borramos enlace buscador y borramos registros
                if(!($('.muni:enabled').find('option:selected').val())) {
                	$('.search-reg').hide();
                	$('#' + depend).html('<option value=""></option>');
                }


            } else {
                $('#' + depend).html(cb);
                cargaSecc($('#' + depend).value, $('#' + depend).attr('data-depend'));


                if ($('#'+depend).attr('data-input')) {

                	$('.'+$(this).attr('data-input')).attr('value', $(this).find('option:selected').text());
                }


                if(depend == 'selectRegistro-01')
                	$('.search-reg').hide();

            }

            // eliminamos el spinner y activamos el select

            $('#' + depend).removeClass('disable');
            $('.spinner').remove();

        });




    }


    // Carga Registros de una provincia

    function cargaRegiProv(value, depend) {

    	spinCombo(depend);
        $('#' + depend).children('option').remove();

        $('#' + depend).html('<option value="">Cargando datos ... </option>');
        // $('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-loading') + '</option>');

        $.ajax({
            type: 'GET',
            url: '/api/provinceRegistries?province=' + value,
            data: { get_param: 'label, value' },
            dataType: 'json',
            timeout: 3000,
            success: function (data) {
            	  cb = "";
                  var item = 0;


                  $.each(jsonData, function(i, data) {
                      cb += '<option value="' + data.value + '">' + data.label + '</option>';
                      item++;
                  });


                  if (item > 1) {
                  	$('#' + depend).html('<option value="">Seleccione registro </option>' + cb);
                      //$('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-select') + '</option>' + cb);
                  } else {
                      $('#' + depend).html(cb);
                  }

                  $('#' + depend).removeClass('disable');
                  $('.spinner').remove();


            },
            error: function(xmlhttprequest, textstatus, message) {
                if(textstatus==="timeout") {
                    console.log("got timeout");
                } else {
                    console.log(textstatus);
                }
            }
        }).done(function() {

        })


    }










    // Carga Secciones de un registro

    function cargaSecc(value, depend) {

    	spinCombo(depend);
        $('#' + depend).children('option').remove();
        $('#' + depend).html('<option value="">Cargando datos ...</option>');
        //$('#' + depend).html('<option value="">' + $('#' + depend).attr('data-msg-loading') + '</option>');


        $.ajax({
            type: 'GET',
            url: '/api/registrySections?registryCode=' + $('.regi:enabled').val(),
            data: { get_param: 'label, value' },
            dataType: 'json',
            timeout: 3000,
            success: function (data) {
            	cb = 0;
            	var item = 0;

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
                    console.log("got timeout");
                } else {
                    console.log(textstatus);
                }
            }
        }).done(function() {

        })

        $('#' + depend).removeClass('disable');
        $('.spinner').remove();
        $('#'+depend).focus();
    }





    /*
      Validador de formularios
      http://www.formvalidator.net/
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
            notConfirmed: 'Las contraseñas no coinciden',
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


    // Configuracion

    $.validate({
        form: '.form',
        validateOnBlur: true, // disable validation when input looses focus
        inputParentClassOnError: 'form-box--error',
        borderColorOnError: 'none',
        language: myLanguage,
        modules: 'logic, security'
    });

    // LoginPage Captcha

    $('form.has-validation-callback').on('submit', function() {
        if (grecaptcha.getResponse() === '')
        {
            return false;
        }
        else {
            // verificación adicional antirobots
            var code = grecaptcha.getResponse();
            if ($('#ccode').val() !== code)
            {
                return false;
            }
        }
    });

	 // Validadores propios

	 $.formUtils.addValidator({
		  name : 'nifnie',
		  validatorFunction : function(value, $el, config, language, $form) {
		    return validateNifnie(value);
		  },
	 });

	 $.formUtils.addValidator({
		  name : 'nif',
		  validatorFunction : function(value, $el, config, language, $form) {
		    return validateNif(value, $el);
		  },
	 });

    $.formUtils.addValidator({
        name : 'nifcif',
        validatorFunction : function(value, $el, config, language, $form) {
            return validateNifCif(value, $el);
        },
    });

	 $.formUtils.addValidator({
		  name : 'nie',
		  validatorFunction : function(value, $el, config, language, $form) {
		    return validateNie(value);
		  },
	 });

	 $.formUtils.addValidator({
		  name : 'empresa',
		  validateOnBlur : true,
		  validatorFunction : function(value, $el, config, language, $form) {
		    return validateEmpresa(value, $el);
		  },
	 });

	 $.formUtils.addValidator({
		  name : 'idufir',
		  validatorFunction : function(value, $el, config, language, $form) {
              if (idufir(value) === false) {
                  $('.form-msg.form-msg--error').slideUp();
              }
              return idufir(value);
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
        name : 'notEqual',
        validatorFunction : function(value, $el, config, language, $form) {
            return notEqual($el.attr('data-confirm'),$el.val());
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


    // Busqueda registro por direccion

	 // clean results
	 $('.search-reg').click(function() {
		 $('#od-finca').focus();
		 $('#od-result').html('');
	 })

    $('#checkDir').click(function() {

        $('.od-action').html('');
		$('#od-noresult').hide();
        $('.od-wait').show();

        var $dir = $('.od-finca').val() +' '+ $('.od-prov option:selected').text() +' '+ $('.od-muni option:selected').text();
        var $formattedDir = formatString($dir);

    	checkDir($formattedDir);
    });


    // format direction
    function formatString(str){
      //  console.log(str.replace(/[\u0300-\u036f]/g,"").replace(/,/g , " "));
	  //  return str.replace(/[\u0300-\u036f]/g,"").replace(/,/g , " ");
        // Definimos los caracteres que queremos eliminar
        var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
        // Los eliminamos todos
        for (var i = 0; i < specialChars.length; i++) {
            str= str.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
        }
        // Lo queremos devolver limpio en minusculas
        str = str.toLowerCase();
        // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
        str = str.replace(/ /g," ");
        // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
        str = str.replace(/\u00F1/gi,"n"); //ñ
        str = str.replace(/\u00E1/gi,"a"); //á
        str = str.replace(/\u00E9/gi,"e"); //é
        str = str.replace(/\u00ED/gi,"i"); //í
        str = str.replace(/\u00F3/gi,"o"); //ó
        str = str.replace(/\u00FA/gi,"u"); //ú
        str = str.replace(/\u00E0/gi,"a"); //à
        str = str.replace(/\u00E8/gi,"e"); //è
        str = str.replace(/\u00EC/gi,"i"); //ì
        str = str.replace(/\u00F2/gi,"o"); //ò
        str = str.replace(/\u00F9/gi,"u"); //ù
        str = str.replace(/\u00e7/gi,"c"); //ç
        return str;
        }



    // check direction
    function checkDir(value) {


    	//spinCombo('od-result');

        $.ajax({
            type: 'GET',
            url: '/api/geocoding/addresses?q=' + value,
            data: { get_param: 'code, description' },
            dataType: 'json',
            timeout: 3000,
            success: function (data) {
            	var cb = 0;
            	var item = 0;

            	if(data.code == 500) {

            		$('#od-noresult').show();
            		$('.od-result').html('');
            		$('.od-wait').hide();
            	} else {

            		$('.od-result').html('');
            		$('.od-wait').hide();

            		if(!(data.length == 0)) {
            			$.each(data, function(i, data) {
              				$('.od-result').append('<div class="rb-option"><label class="rb-label" for="'+ item +'"><input class="invisible radiobutton" value="'+ data.code  +'" id="'+ item +'" type="radio" name="od-finca"><span class="rb-pick"></span><span class="rb-text">'+data.name+'</span><span class="rb-line"></span></label>');
                			item++;
                        });
            			$('#od-noresult').hide();
            		} else {
            			$('#od-noresult').show();
            		}

            	}

            },
            error: function(xmlhttprequest, textstatus, message) {
                if(textstatus==="timeout") {
                    console.log("got timeout");
                } else {
                    console.log(textstatus);
                }
            }
        }).done(function() {
              $('#od-sFinca').show();

        })

    }


    $('#od-sFinca').click(function() {
    	var $odselect = $('input[name="od-finca"]:checked').val();
        $('.od-regi option[value="' + $odselect + '"]').prop('selected', true).change();
        if ($('.od-regi option[value="' + $odselect + '"]').length === 0) {
            $('.od-regi option[value=""]').prop('selected', true).change();
            $('.od-regi').focus();
        }
        closeModal();
        $('.od-result').html('');
        $('#od-sFinca').hide();
        $('.od-finca').val('');
        $('#od-noresult').hide();
    });




    // calling to svg-sprite #7
    $.get("../../static/img/common/svg/svg-symbols.svg", function(data) {
        var div = document.createElement("div");
        div.className = "invisible";
        div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
        document.body.insertBefore(div, document.body.childNodes[0]);
    });



    // Cookie info
    if (readCookie('cookieinfo') === 'accepted')
        {
            $('.cookie-bar').remove();
        }
    else {
        $('.cookie-bar').removeClass('hide');
    }

    $('#closeCookiesInfo').click(function(){
        $('.cookie-bar').addClass('close');
        createCookie('cookieinfo', 'accepted');
    })







    // Alphanumeric only input text (without spaces): DNI, NIF, CIF ...

    $('[data-js="alphaonly"]').on('keypress', function (event) {
        alphaonly(event);
    });

    $('[data-js="numonly"]').on('keypress', function (event) {
        numonly(event);
    });

    $('[data-js="alphaonly"]').on('paste', function() {
        var $el = $(this);
        var regx = /[\W_]/g;
        setTimeout(function () {
            $el.val(function (i, val) {
                return val.replace(regx, "")
            })
        })
    });

    //Email username mirror filler
    $('#particular-email').keyup(function() {
        $('#username-txt').html($(this).val());
    });


    // end document.ready

});

// Nif EMPRESA
function validateEmpresa(value){

	        var pares = 0; 
	        var impares = 0; 
	        var suma; 
	        var ultima; 
	        var unumero; 
	        var uletra = new Array("J", "A", "B", "C", "D", "E", "F", "G", "H", "I"); 
	        var xxx; 
	         
	        value = value.toUpperCase(); 
	         
	        var regular = new RegExp(/^[ABCDEFGHKLMNPQS]\d\d\d\d\d\d\d[0-9,A-J]$/g); 
	           if (!regular.exec(value)) return false; 
	                
	           ultima = value.substr(8,1); 

	           for (var cont = 1 ; cont < 7 ; cont ++){ 
	               xxx = (2 * parseInt(value.substr(cont++,1))).toString() + "0"; 
	               impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1)); 
	               pares += parseInt(value.substr(cont,1)); 
	           } 
	           xxx = (2 * parseInt(value.substr(cont,1))).toString() + "0"; 
	           impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1)); 
	            
	           suma = (pares + impares).toString(); 
	           unumero = parseInt(suma.substr(suma.length - 1, 1)); 
	           unumero = (10 - unumero).toString(); 
	           if(unumero == 10) unumero = 0; 
	            
	           if ((ultima == unumero) ||  (ultima == uletra[unumero])) {
	        	   return true;
	           } else {
	        	   return false;
	           } 
}



//Nif/nie validation
function validateNifnie(value){

  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var str = value.toString().toUpperCase();

  
  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;
  

  if (validChars.charAt(charIndex) === letter) {
	  
	  if(parseInt(str.substr(0,1)) || (str.substr(0,1) == 0)) {
		  $('.idType').val('NIF');
	  } else {
		  $('.idType').val('NIE');
	  }
	  return true;
  } 
	  
  return false;
}

//Nif/nie validation
function validateNifCif(value){
    var ID = ValidateSpanishID(value);
    if (ID.valid == true)
    {
        return true;
    }
    else {
        return false;
    }
}


//Nif validation
function validateNif(value){
  $('.juridic-man').addClass('hide');	
  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var str = value.toString().toUpperCase();
  
  var letter = str.substr(-1);
  var charIndex = parseInt(str.substr(0, 8)) % 23;
  var ID = ValidateSpanishID(value);
    
  if (ID.type == 'cif' && ID.valid == true) {
      $('.juridic-man').removeClass('hide');
      return;
  }  
  
  else if (validChars.charAt(charIndex) === letter) {
	  return true;
  }
	  
  return false;

 
}



//Nie validation
function validateNie(value){

	  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
	  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
	  var str = value.toString().toUpperCase();

	  
	  if (!nieRexp.test(str)) return false;

	  var nie = str
	      .replace(/^[X]/, '0')
	      .replace(/^[Y]/, '1')
	      .replace(/^[Z]/, '2');

	  var letter = str.substr(-1);
	  var charIndex = parseInt(nie.substr(0, 8)) % 23;
	  

	  if (validChars.charAt(charIndex) === letter) {
		  
		  return true;
	  } 
		  
	  return false;
}



// validacion IDUFIR

function idufir(idufir) {
	//el valor vuelve de un input que es number, si volviera de otra fuente habría que quitarle espacios y comprobar caracteres
	var _validation = false;
    
	if(idufir.length >= 13) {

	var _idufir = prepend(idufir.toString(), 14); //Se pasa a string para hacer determinadas transformaciones
	_validation = _idufir.length === 14 && Number(idufir); //Se comprueba que la longitud es la correcta y que es number

        if (_validation) {
            var _idufirControl = Number(_idufir.slice(-1)); //Se extrae el dígito de control
            _idufir = _idufir.slice(0, -1).split('').reverse().join(''); //Se elimina el dígito de control, se crea un array por cada letra para posteriormente interar y se invierte
            var _digiControl = 0;
            for (i in _idufir) { //se recorre el array invertido empezando por el cero
                var _digit = Number(_idufir[i]);
                if (i & 1) {
                    _digiControl = _digiControl + 1 * _digit; //posición par
                } else {
                    _digiControl = _digiControl + 3 * _digit; //posición impar
                }
                ;
            }
            ;
            var _ceilingDigiControl = Math.ceil(_digiControl / 10) * 10; //se redondea a la decena superior
            _validation = _ceilingDigiControl - _digiControl === _idufirControl; //la resta del _ceilingDigiControl menos la comprobación tiene que ser igual que el dígito de control
        }
        ;
        return _validation;

    }
    
    return false;
};







// Mail validation

function emailConfirm(mail,mailConf) { 
   
  if(($('#'+mail).val().toLowerCase()) == mailConf.toLowerCase()) { 
    return true; 
  } 
  return false; 
}

// Not equal inputs (phone / mobile)

function notEqual(dataNe1,dataNe2) {

    if(($('#'+dataNe1).val()) !== dataNe2) {
        return true;
    }
    return false;
}

 
// VIES validation 




function validateVIES(valor){ 
 
	$.getJSON("/api/validate/vies?viesCode=" + valor, function(jsonData) {
		if(jsonData.valido) {
				$('.form-msg--vies').slideUp();
				return true;
			} else {
				$('.form-msg--vies').slideDown();
				return false;
			}
	})
 }

function validateEmpresa(valor, campo){ 
	
	// consultamos que el valor del input NIF oculto sea distinto al NIF introducido
	if($('#empresa-nif-conf').val() != valor) {
		spinCombo('empresa-nif');
		var item = 0;
		
		
		$('#empresa-nif-conf').val(valor);
		
		// formateo NIF 
		
		valor = valor.replace(/[^\w\s/[ -]]/gi, '');
		campo.val(valor);
		
		console.log('nif empresarial' + valor);
		
		
		
		$.getJSON("/api/validate/sociedad?identificationNumber=" + valor)
			.done(function(jsonData) {
			
			
			if(jsonData.needSociedadType) {
				
				// needSociedadType true -- cargamos los tipos de sociedad
				
				$('.info-empresa').show();
				$('.form-msg--nif').hide();
				$('.form-msg--nif500').hide();

				//$('.empresa-nif-valido').show();

				nombre = jsonData.name;
				sType = '';
				
				$.each(jsonData.typesAllowed, function(i, data) {
		        	console.log(jsonData.typesAllowed[i].value);
		        	
		        	if(jsonData.typesAllowed[i].code == "OTROS")         	
		        		sType += '<option data-content="OTHER" value="'+jsonData.typesAllowed[i].code+'">' + jsonData.typesAllowed[i].value + '</option>';
		        	else
		        		sType += '<option data-content="'+jsonData.typesAllowed[i].code+'" value="'+jsonData.typesAllowed[i].code+'">' + jsonData.typesAllowed[i].value + '</option>';

		        });
				
	            $('.empresa-esp-ts').html('<option value="">Seleccione un tipo de sociedad</option>' + sType);

				$('.info-empresa-ts').show();
				
				
	            if(nombre == "") {
	            	$('.empresa-esp-ds').prop("readonly", false);
	            } else {
	            	$('.empresa-esp-ds').val(nombre);
	            }
				
			
			} else {
				

				if(jsonData.valid) {

					// valid true && needSociedadType false -- cargamos los cargos
					
					$('.info-empresa').show();
					$('.form-msg--nif').hide();
					$('.form-msg--nif500').hide();

					
					// $('.empresa-nif-valido').show();
					
					nombre = jsonData.name;
					sCargo = '';
					sType = '';
					
					// listar cargos
					
					$.each(jsonData.cargosAllowed, function(i, data) {
			        	
			        	if(jsonData.cargosAllowed[i].code == "OTROS") {
			        		sCargo += '<option data-content="OTROS" value="'+jsonData.cargosAllowed[i].code+'">' + jsonData.cargosAllowed[i].value + '</option>';
			        	}else{
			        		sCargo += '<option value="'+jsonData.cargosAllowed[i].code+'">' + jsonData.cargosAllowed[i].value + '</option>';
			        	}

			        });
					
					
					$('#empresa-re-car').find('option').remove();
					$('#empresa-re-car').html('<option value="">Seleccione un cargo</option>' + sCargo);
					
					
					// listar tipo sociedad
					
					$.each(jsonData.typesAllowed, function(i, data) {
						
						$.each(jsonData.typesAllowed, function(i, data) {
				        	
				        	if(jsonData.typesAllowed[i].code == "OTHER") {         	
				        		sType += '<option data-content="OTHER" value="'+jsonData.typesAllowed[i].code+'">' + jsonData.typesAllowed[i].value + '</option>';
				        		item++;
				        	} else {
				        		sType += '<option data-content="'+jsonData.typesAllowed[i].code+'" value="'+jsonData.typesAllowed[i].code+'">' + jsonData.typesAllowed[i].value + '</option>';
				        	}
				        	
			        		item++;


				        });		        	
			        	
			        });
					
					
					// Si solo tiene una sociedad no mostramos desplegable, excepto si tiene opcion otros
					if(item == 1) {
						$('.info-empresa-ts').hide();
			            $('.empresa-esp-ts').html(sType);
					} else {
						$('.info-empresa-ts').show();
			            $('.empresa-esp-ts').html('<option value="">Seleccione un tipo de sociedad</option>' + sType);
					}
											
					
					//$('.info-empresa-ts').hide();
					
		            if(nombre == "") {
		            	$('.empresa-esp-ds').prop("readonly", false);
						$('.empresa-esp-ds').val('');

		            } else {
		            	$('.empresa-esp-ds').val(nombre);
		            }
					

				} else {
				
					
					// valid false && needSociedadType false = nif no válido

					// Mostramos mensaje NIF no válido
					$('.form-msg--nif').show();
					$('.form-msg--nif500').hide();


					// Ocultamos tipo empresa
					$('.info-empresa').hide();
					
					// $('.empresa-nif-valido').hide();
					console.log('NIF no valido');
				}
				
			}
			
			

			$('.spinner').remove();
		
			})
			.fail(function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log( "Request Failed: " + err );
				$('.form-msg--nif').hide();
				$('.form-msg--nif500').show();
				$('.spinner').remove();
			
		// fin getJSON
		});

	}
}






function validateSociedad(valor) {
	
	sCargoSoc = '';
	
	$.getJSON("/api/validate/sociedad?identificationNumber=" + $('#empresa-nif').val() + "&sociedadType=" + valor, function(jsonData) {
		
		if(jsonData.needSociedadType) {
			console.log('No se ha podido comprobar la sociedad ');
		
		} else {
			
			console.log('needSociedadType false');
			
			$.each(jsonData.cargosAllowed, function(i, data) {
	        	console.log(jsonData.cargosAllowed[i].value);
	        	
                sCargoSoc += '<option data-content="' + jsonData.cargosAllowed[i].code + '" value="' + jsonData.cargosAllowed[i].code + '">' + jsonData.cargosAllowed[i].value + '</option>';

	        });
			
			$('#empresa-re-car').find('option').remove();
			$('#empresa-re-car').html('<option value="">Seleccione un tipo de cargo</option>' + sCargoSoc);

		}
	
	});
}

// Only aphanumeric input 

function alphaonly(event) {
    event = event || window.event //For IE
    var regex = new RegExp("^[a-zA-Z0-9\b]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
function numonly(event) {
    event = event || window.event //For IE
    var regex = new RegExp("^[0-9\b]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
// Nif/nie validation
function validateID(value){

  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nifEmp  = /^[A-Z]{1}\d{8}|[A-Z]{1}\d{7}[A-Z]{1}$/i;
  var str = value.toString().toUpperCase();

  
  if (!nifRexp.test(str) && !nieRexp.test(str) && !nifEmp.test(str)) return false;

  if(nifEmp.test(str)) {
      $('.ifEmpresa').attr("data-validation", ''); // Seteamos el campo "Nombre" al seleccionar NIF en la página de datos de solicitud, si lo que se introduce es un NIF de empresa.
      return true;
  }
  else {
      $('.ifEmpresa').attr("data-validation", 'required')
  }
  
 
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



// Mail validation

function emailConfirm(mail,mailConf) { 
   
  if(($('#'+mail).val()) == mailConf) { 
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




// AEAT Empresa
/*
function validateEmpresa(valor){ 
	 
	$.getJSON("/api/validate/aeat?identificationNumber=" + valor, function(jsonData) {
		if(jsonData.valid) {
				console.log('empresa valida');
			} else {
				console.log('empresa no valida');
			}
	})
 } 
*/



function validateEmpresa(valor){ 
	 
	$.getJSON("/api/validate/sociedad?identificationNumber=" + valor, function(jsonData) {
		
		
		if(jsonData.needSociedadType) {
			
			// needSociedadType true -- cargamos los tipos de sociedad
			
			$('.info-empresa').slideDown();
			$('.form-msg--nif').slideUp();


			nombre = jsonData.name;
			sType = '';
			
			$.each(jsonData.typesAllowed, function(i, data) {
	        	console.log(jsonData.typesAllowed[i].value);
	        	
	        	if(jsonData.typesAllowed[i].value == "Otros")	        	
	        		sType += '<option data-content="otros" value="'+jsonData.typesAllowed[i].code+'">' + jsonData.typesAllowed[i].value + '</option>';
	        	else
	        		sType += '<option value="'+jsonData.typesAllowed[i].code+'">' + jsonData.typesAllowed[i].value + '</option>';

	        });
			
            $('.empresa-esp-ts').html('<option value="">Seleccione un tipo de sociedad</option>' + sType);

			$('.info-empresa-ts').slideDown();
			
			
            if(nombre == "") {
            	$('.empresa-esp-ds').prop("readonly", false);
            } else {
            	$('.empresa-esp-ds').val(nombre);
            }
			

			
		} else {
			
			
			if(jsonData.valid) {
				
				// valid true && needSociedadType false -- cargamos los cargos
				
				$('.info-empresa').slideDown();
				$('.form-msg--nif').slideUp();
				
				nombre = jsonData.name;
				sCargo = '';
				
				$.each(jsonData.cargosAllowed, function(i, data) {
					
		        	console.log(jsonData.cargosAllowed[i].value);
		        	
	                sCargo += '<option value="' + jsonData.cargosAllowed[i].value + '">' + jsonData.cargosAllowed[i].value + '</option>';

		        });
				
				$('#empresa-re-car').find('option').remove();
				$('#empresa-re-car').html('<option value="">Seleccione un tipo de cargo</option>' + sCargo);
	
				$('.info-empresa-ts').hide();
				
	            if(nombre == "") {
	            	$('.empresa-esp-ds').prop("readonly", false);
					$('.empresa-esp-ds').val('');

	            } else {
	            	$('.empresa-esp-ds').val(nombre);
	            }
				

			} else {
				
				// valid false && needSociedadType false = nif no válido

				// $('.info-empresa').slideUp();
				$('.form-msg--nif').slideDown();
				
				console.log('NIF No valido!!');

			}
			
		}
		
		
	})
 }







function validateSociedad(valor){
	
	sCargoSoc = '';
	
	$.getJSON("/api/validate/sociedad?identificationNumber=" + $('#empresa-nif').val() + "&sociedadType=" + valor, function(jsonData) {
		
		if(jsonData.needSociedadType) {
			console.log('No se ha podido comprobar la sociedad ');
			
			
		} else {
			
			console.log('needSociedadType false');
			
			$.each(jsonData.cargosAllowed, function(i, data) {
	        	console.log(jsonData.cargosAllowed[i].value);
	        	
                sCargoSoc += '<option data-content="empresa-re-car--' + jsonData.cargosAllowed[i].value + '" value="' + jsonData.cargosAllowed[i].value + '">' + jsonData.cargosAllowed[i].value + '</option>';

	        });
			
			$('#empresa-re-car').find('option').remove();
			$('#empresa-re-car').html('<option value="">Seleccione un tipo de cargo</option>' + sCargoSoc);

		}
	
	});
}

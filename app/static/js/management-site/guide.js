/* app functions */

$(document).ready(function() {


  // datepicker

  $( function() {
   $( "#calendar" ).datepicker();
  });


  $( function() {
    $( "#tabs" ).tabs();
  } );


  $( function() {
    var availableTags = [
      "alava",
      "albacete",
      "alicante",
      "almeria",
      "asturias",
      "avila",
      "badajoz",
      "a coruna",
      "baleares",
      "barcelona",
      "burgos",
      "caceres",
      "cadiz",
      "cantabria",
      "castellon",
      "ceuta",
      "ciudad real",
      "cordoba",
      "cuenca",
      "girona",
      "granada",
      "guadalajara",
      "guipuzcoa",
      "huelva",
      "huesca",
      "jaen",
      "la rioja",
      "las palmas",
      "leon",
      "lleida",
      "lugo",
      "madrid",
      "malaga",
      "melilla",
      "murcia",
      "navarra",
      "ourense",
      "palencia",
      "pontevedra",
      "salamanca",
      "tenerife",
      "segovia",
      "sevilla",
      "soria",
      "tarragona",
      "teruel",
      "toledo",
      "valencia",
      "valladolid",
      "vizcaya",
      "zamora",
      "zaragoza"
    ];
    $( ".323" ).autocomplete({
      source: availableTags,
      minLength: 0
    }).click(function(){
       $(this).autocomplete("search", "");
    });





    $( ".autonomia" ).autocomplete({
      source: function (request, response) {
          $.ajax({
              url: "https://raw.githubusercontent.com/edusl/test/master/municipios1.json",
              dataType: "jsonp",
              data: { query: request.term },
              success: function (data) {
                  var transformed = $.map(data, function (el) {
                      return {
                          label: el.label
                          //value: el.value
                      };
                  });
                  response(transformed);
              },
              error: function () {
                  response([]);
              }
          });
        },
      minLength: 2,
      select: function( event, ui ) {
        log( "Selected: " + ui.item.value + " aka " + ui.item.id );
      },
      focus: function(event, ui) {
          event.preventDefault();
      }
    }).click(function(){
       $(this).autocomplete("search", "");
    });



  });



  // show / hide filter options

  $('.table-filter__show .link').click(function(){
    $('.table-filter__options').toggleClass('hide');
  });




});

// Descrizione:
// Facciamo una chiamata ajax all'api di boolean al seguente indirizzo.
// https://flynn.boolean.careers/exercises/api/array/music
// L'api ci restituirà decina di dischi musicali che dovremo stampare a schermo con Handlebars.
// Concentratevi sulla parte JS per la grafica potrete utilizzare il layout che troverete al seguente link
// https://bitbucket.org/booleancareers/ex-dischi-musicali-layout/downloads/
// Bonus:
// Creare una select con i seguenti generi: pop, rock, metal e jazz.
// In base a cosa scegliamo nella select vedremo solo i corrispondenti cd.
$(document).ready(function(){

  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/array/music",
      method: "GET",
      success: function (data, stato) {

        //Estrapolo l'html che sarà la struttura del mio template
        var source = $("#music-template").html();
        //Compilo il source
        var template = Handlebars.compile(source);

        for(var i = 0; i < data.response.length; i++){
          //Entrapoli i dati
          var context = data.response[i];
          // Inserisco i date dentro il template
          var html = template(context);
          // Appendo il cd
          $(".cds-container").append(html);
        }

      },
      error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
    }
  );

  $("option").click(
    function(){
      var option = $(this);

      $.ajax(
        {
          url: "https://flynn.boolean.careers/exercises/api/array/music",
          method: "GET",
          success: function (data, stato) {

            //Nascondo tutti i cd
            if(option.text() == "All"){
              $(".cd").show();
            } else {
              $(".cd").hide();
              for(var i = 0; i < data.response.length; i++){
                if(option.text() == data.response[i].genre)
                {
                  $("." + data.response[i].genre).show();
                }
              }
            }

          },
          error: function (richiesta, stato, errori) {
          alert("E' avvenuto un errore. " + errore);
          }
        }
      );


  });
});








//CHIAMATA AJAX
// $.ajax(
//   {
//     url: "http://www.boolean.careers/api/random/boolean",
//     method: "GET",
//     success: function (data, stato) {
//     $("#risultati").html(data);
//     },
//     error: function (richiesta, stato, errori) {
//     alert("E' avvenuto un errore. " + errore);
//     }
//   }
// );



var bas_url="http://localhost/blog1/Index.php";
var selectedId;

  userSelection=function(id){
    
    selectedId=id;
 
    $.get(bas_url+"?e=user&action=all", function(data, status){
      // alert(selectedId);
      for (var i = 0; i < data[1].length; i++) {
        if (data[1][i].id == selectedId) {

          var identifiant = data[1][i].id;
          var prenom = data[1][i].prenom;
          var nom = data[1][i].nom;
          var adresse = data[1][i].adresse;
            // alert(data[1][i].prenom);
          document.getElementById('identifiant').value = identifiant;
          document.getElementById('Prenom').value = prenom;
          document.getElementById('Nom').value = nom;
          document.getElementById('Adresse').value = adresse;

        }
    }  
      $.mobile.navigate("#profil");
      // alert(data[1][i].prenom);
      });
  }

findAll=function(){
  $.get(bas_url+"?e=user&action=all", function(data, status){
  //data[0] le code 
  //data[1] la liste des users
  if(data[0].code){
    // le for parcourt les indices
    var list=$("#resultat");
    for(i in data[1]){
      line='<li><a onclick="userSelection('+data[1][i].id+')">'+data[1][i].prenom+' '+data[1][i].nom+'</a></li>';
      list.append(line);
      }
    }
  });
}


$(document).ready(function(){
    $("#user").click(function(){
    $("li").remove();
    $.mobile.navigate("#page2");
    findAll();
});

    $("#user-opt").click(function(){
    $("li").remove();
    $.mobile.navigate("#page2");
    findAll();
});


    // $("#all").click(function(){
        //var id  = $("#id").val();
        //   $.ajax({
        //     url: "http://localhost/blog1/Index.php?e=user&action=all",
        //     datatype: "jsonp",
        //     error:function(msg, string){
        //               alert( "Error !: ", string);
        //           },
        //     success:function(data){
        //             console.log("ca marche", data);
        //             // alert(data[1].length);
        //             for(var i = 0; i<data[1].length; i++){
        //                 var user = $("<li>").html(data[1][i].id+" "+data[1][i].prenom+" "+data[1][i].nom+" "+data[1][i].adresse);
        //                 $("#resultat").append(user);
        //             }
        //            // parseJSON(data);
        //            // $("#resultat").html(data);
        //           }  
        // });

        // var parseJSON = function(data){
        //     $(data).each(function(i){
        //       createHTML(this);
        //     });
        //   }
        
        //   var createHTML = function(element){
        //     for(var i = 0; i < 5; i++){
        //       var user = $("<p>").html(element.results[i].text);
        //         $("#resultat").append(user);
        //     }
        // }

    //  });

    $("#ajouter").click(function(){
        var nom  = $("#nom").val();
        var prenom   = $("#prenom").val();
        var adresse       = $("#adresse").val();

        if(nom=="" || prenom=="" || adresse==""){
          alert("Veuillez remplir tout les champs");
        }else{
           $.ajax({
          method: "POST",
          url:    bas_url+"?e=user&action=add",
          data: { "nom": nom, "prenom": prenom, "adresse": adresse},
        
        error: function(msg, string){
           alert( "Error !: ", string);
        },

        success: function(){
            alert("User added succesfully");
        }
      });
        }    
   });

    $("#update").click(function(){
        var id = $("#identifiant").val();
        var nom  = $("#Nom").val();
        var prenom   = $("#Prenom").val();
        var adresse       = $("#Adresse").val();

        if(nom=="" || prenom=="" || adresse==""){
          alert("Veuillez remplir tout les champs");
        }else{
           $.ajax({
          method: "POST",
          url:    bas_url+"?e=user&action=modif",
          data: { "id": id,"nom": nom, "prenom": prenom, "adresse": adresse},
        
        error: function(msg, string){
           alert( "Error !: ", string);
        },

        success: function(){
            alert("User Updated succesfully");
        }
      });
        }    
   });

    $("#delete").click(function(){
            var id  = $("#identifiant").val();
            $.ajax({
              method: "POST",
              url:    bas_url+"?e=user&action=del",
              data: { "id": id},
              error: function(msg, string){
               alert( "Error !: ", string);
             },   
              success: function(){
            alert("User Deleted succesfully");
          }

            
       });
          $.mobile.navigate("#page2");

    });







})



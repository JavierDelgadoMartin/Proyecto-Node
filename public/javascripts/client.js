var socket = io();
var modal= $('<div class="modal"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">'
        +'<h5 class="modal-title">Usuario</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close">'
        +'<span aria-hidden="true">&times;</span></button></div><form id="formulario">'
        +'<div class="modal-body"><input id="nick" type="text" placeholder="Nick"></div>'
        +'<div class="modal-footer"><button type="button" class="btn btn-primary id="enviar">Enviar</button></div></form></div></div></div>');

$(document).ready(function(){
    $("body").append(modal);
    $("#formulario").submit(function(){
        var nick = $("#nick").val();
        console.log("truño");
        if(nick!=""){
            socket.emit("login",nick);
            modal.css("display","none");
        }
    });
});

socket.on("login",function(user){
    var alertUserConect = "<div><p>"+user+"</p></div>";
    $("body").append(alertUserConect);
    setTimeout(function(){alertUserConect.css("display","none")},3000);
})
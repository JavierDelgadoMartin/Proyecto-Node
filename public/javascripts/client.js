var socket = io.connect();
var nick = "";
var modal= $('<div class="modal"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">'
        +'<h5 class="modal-title">Introduce datos</h5>'
        +'<div id="imagenes"></div>'
        +'<form id="formulario"><div class="modal-body"><input id="nick" type="text" placeholder="Nick"></div>'
        +'<div class="modal-footer"><input type="submit" class="btn btn-primary id="enviar" value="Enviar"></input></div></form></div></div></div>');

$(document).ready(function(){
    $("body").append(modal);
    $("#formulario").submit(function(){
        nick = $("#nick").val();
        if(nick!=""){
            socket.emit("new user",nick);
            $(".modal").css("display","none");
        }
        return false;
    });
});

socket.on("new user",function(user){
    var alertUserConect = "<div id=alertaUser><p>"+user+ " se ha conectado</p></div>";
    $("body").append(alertUserConect);
        setTimeout(function(){$("#alertaUser").css("display","none")},3000);

});

$("#formularioMensaje").submit(function(){
    var textoMensaje = $("#textoMensaje").val();
    if(textoMensaje!=""){
        var msg = {"nick":nick,"mensaje":textoMensaje};
        socket.emit("newMesaje",msg);
        $("#chat").append("<div><span>"+msg.nick+" </span><span>"+msg.mensaje+"</span><div>");
        $("#textoMensaje").val("")
    }
    return false;
});

socket.on("newMesaje",function(msg){
    $("#chat").append("<div><span>"+msg.nick+" </span><span>"+msg.mensaje+"</span><div>");
    animateScroll();
})

function animateScroll(){
    var container = $('#chat');
    container.animate({"scrollTop": container[0].scrollHeight}, "slow");
}
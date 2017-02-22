var socket = io.connect();
var nick = "";
var avatar;
var modal= $('<div class="modal"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">'
        +'<h5 class="modal-title">Introduce datos</h5>'
        +'<div id="imagenes"><div id=culo><img src="/images/avatar1.jpg"></div>'
        +'<form id="formulario"><div class="modal-body"><input id="nick" type="text" placeholder="Nick"></div>'
        +'<div class="modal-footer"><input type="submit" class="btn btn-primary id="enviar" value="Enviar"></input></div></form></div></div></div>');

$(document).ready(function(){
    $("body").append(modal);
        $("#culo").click(function(e){
        avatar = $(e.target).children().attr("src");
    });
    $("#formulario").submit(function(){
        nick = $("#nick").val();
        if(nick!="" && avatar!=null){
            $(body).append("<div>"+nick+"</div>");
            socket.emit("new user",nick);
            $(".modal").css("display","none");
        }
        return false;
    });
});

socket.on("new user",function(id,user){
    var alertUserConect = "<div id=alertaUser><p>"+user+ " se ha conectado</p></div>";
    $("body").append(alertUserConect);
    $("#usuarios").append("<div id="+id+"><span>"+user+"</span></div>");
    setTimeout(function(){$("#alertaUser").css("display","none")},3000);

});

$("#formularioMensaje").submit(function(){
    var textoMensaje = $("#textoMensaje").val();
    if(textoMensaje!=""){
        var msg = {"nick":nick,"mensaje":textoMensaje};
        socket.emit("newMesaje",msg);
        animateScroll();
        $("#chat").append("<div><span>"+msg.nick+" </span><span>"+msg.mensaje+"</span><div>");
        $("#textoMensaje").val("")
    }
    return false;
});

socket.on("newMesaje",function(msg){
    $("#chat").append("<div><span>"+msg.nick+" </span><span>"+msg.mensaje+"</span><div>");
    animateScroll();
})

socket.on("allUsers",function(users){
    users.forEach(function(item){
        $("#usuarios").append("<div id="+item+"><span>"+item+"</span></div>");
    });
});
function animateScroll(){
    var container = $('#chat');
    container.animate({"scrollTop": container[0].scrollHeight},"faster");
}

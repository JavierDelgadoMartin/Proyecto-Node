var socket = io.connect();
var nick = "";
var avatar;
var conectado = false;
var modal= $('<div class="modal"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">'
        +'<h5 class="modal-title">Introduce datos</h5>'
        +'<div id="imagenes"><img src="/images/avatar1.png"><img src="/images/avatar2.png"><img src="/images/avatar3.png"><img src="/images/avatar4.png">'
        +'<img src="/images/avatar5.png"><img src="/images/avatar6.png">'
        +'<form id="formulario"><div class="modal-body"><input id="nick" type="text" placeholder="Nick"></div>'
        +'<div class="modal-footer"><input type="submit" class="btn btn-primary id="enviar" value="Enviar"></input></div></form></div></div></div>');

socket.on("new user",function(user){
    if(conectado!=false){
        var alertUserConect = "<div id=alertaUserConect><p>"+user.name+ " se ha conectado</p></div>";
        setTimeout(function(){$("#alertaUserConect").remove()},3000);
        $("body").append(alertUserConect);
        $("#usuarios").append("<div id="+user.id+"><img src="+user.avatar+"></img><span>"+user.name+"</span></div>");
    }
});

socket.on("newMesaje",function(msg){
    $("#chat").append("<div><span>"+msg.nick+" </span><span>"+msg.mensaje+"</span><div>");
    animateScroll();
});

socket.on("allUsers",function(users){
    for (var item in users){
        $("#usuarios").append("<div id="+users[item].id+"><img src="+users[item].avatar+"></img><span>"+users[item].name+"</span></div>");
    };
});

socket.on("userDisconnect",function(id){
    $("div #"+id).remove();
});

function animateScroll(){
    var container = $('#chat');
    container.animate({"scrollTop": container[0].scrollHeight},"faster");
};

function conectarse(){
     $("body").append(modal);
    $("img").click(function(e){
        avatar = $(e.target).attr("src");
    });
    $("#formulario").submit(function(){
        nick = $("#nick").val();
        estado = $("#estado").children();
        if(nick!="" && avatar!=null){
            $("#esteUsuario").append("<img src="+avatar+"></img><span>"+nick+"</span>");
            socket.emit("new user",nick,avatar);
            conectado = true;
            $(".modal").css("display","none");
        }
        return false;
    });
}

function enviarMensaje(){
    $("#formularioMensaje").submit(function(){
        var textoMensaje = $("#textoMensaje").val();
        if(textoMensaje!=""){
            var msg = {"nick":nick,"mensaje":textoMensaje};
            socket.emit("newMesaje",msg);
            animateScroll();
            $("#chat").append("<div><span>"+msg.nick+" </span><span>"+msg.mensaje+"</span><div>");
            $("#textoMensaje").val("");
        }
        return false;
    });
}

$(document).ready(function(){
   conectarse();
   avisoEscribiendo();
   enviarMensaje();
});
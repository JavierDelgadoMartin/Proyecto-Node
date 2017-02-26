var socket = io.connect();
var nick = "";
var avatar;
var conectado = false;

var modal= $('<div class="modal"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">'
        +'<h5 class="modal-title">Introduce datos</h5>'
        +'<div id="imagenes"><img src="/images/avatar1.png"><img src="/images/avatar2.png"><img src="/images/avatar3.png"><img src="/images/avatar4.png">'
        +'<img src="/images/avatar5.png"><img src="/images/avatar6.png">'
        +'<form id="formulario"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
        +'<input class="mdl-textfield__input" type="text" id="nick">'
        +'<label class="mdl-textfield__label" for="nick">Introduce nombre usuario</label></div>'
        +'<input type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="enviar" value="Enviar"></input></div></form></div></div>');

socket.on("new user",function(user){
    if(conectado!=false){
        var alertUserConect = "<div id=alertaUserConect><p>"+user.name+ " se ha conectado</p></div>";
        setTimeout(function(){$("#alertaUserConect").remove()},3000);
        $("body").append(alertUserConect);
        $("#usuarios").append('<span id='+user.id+' class="mdl-chip mdl-chip--contact">'
            +'<img class="mdl-chip__contact" src="'+user.avatar+'"></img>'
            +'<span class="mdl-chip__text">'+user.name+'</span></span>'
        );
    }
});

socket.on("newMesaje",function(msg){
    $("#chat").append("<div id='mensajeRecibido'><img src="+msg.avatar+"></img><span>"+msg.nick+" </span><span>"+msg.mensaje+"</span><div>");
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
            $("#esteUsuario").append('<span class="mdl-chip mdl-chip--contact">'
                +'<img class="mdl-chip__contact" src="'+avatar+'"></img>'
                +'<span class="mdl-chip__text">'+nick+'</span></span>'
            );
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
            var msg = {"avatar":avatar,"nick":nick,"mensaje":textoMensaje};
            socket.emit("newMesaje",msg);
            animateScroll();
            $("#chat").append("<div id='mensajePropio'><img src="+msg.avatar+"></img><span>"+msg.nick+" </span><span>"+msg.mensaje+"</span><div>");
            $("#textoMensaje").val("");
        }
        return false;
    });
}

$(document).ready(function(){
   conectarse();
   enviarMensaje();
});
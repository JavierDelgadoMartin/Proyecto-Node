var socket = io();

$(document).ready(function(){
    var modal= $('<div class="modal"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">'
        +'<h5 class="modal-title">Usuario</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close">'
        +'<span aria-hidden="true">&times;</span></button></div>'
        +'<div class="modal-body"><input class="nick" type="text" placeholder="Nick"></div>'
        +'<div class="modal-footer"><button type="button" class="btn btn-primary enviar">Enviar</button></div></div></div></div>');
    $(".enviar").click(conectarse(modal));
    $("body").append(modal);
});

function conectarse(modal){
    var nick = $(".nick").val();
    console.log(nick);
    if(nick!=""){
        socket.emit("new user",nick);
        modal.css("display","none");
    }
}

socket.on("new user",function(user){
    var alertUserConect = "<div><p>"+user+"</p></div>";
    $("body").append(alertUserConect);
    setTimeout(function(){alertUserConect.css("display","none")},3000);
})
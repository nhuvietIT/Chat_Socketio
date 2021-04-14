const socket = io("http://localhost:3000/");


//that bai
socket.on("server_send_fail",function () {
        alert("đã có UserName dk rôi !");
})
//thanh cong
socket.on("server_send_succsess",function (data) {

    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
})
// hien thị all
socket.on("server_send_all_user",function (data) {
    $("#boxContent").html("");
    data.forEach(function (i) {
        $("#boxContent").append("<div class='useronline'>"+i+"</div>")
    })
})
// hien thị chat
socket.on("server_sent_message",function (data) {
    $("#listmessager").append("<div class='ms'>"+data.un +" : "+data.nd+"<div")
})
// hien thi ai dang go noi dung
socket.on("sever_start_content",function (data) {
    $("#thongbao").html(data +"<img width='50px' src='bacham.gif'/>")
})
socket.on("sever_stop_content",function () {
    $("#thongbao").html("")
})

//=============>  chat roomm <=================

socket.on("server_send_room", function(data) {
    // data.map(function(r){
    for(let i in data){
        $('#dsroom').append("<h4>"+ data[i] +"</h4>")
    }

    // })
})

$(document).ready(function () {
    $("#loginForm").show()
    $("#chatForm").hide()
    $("#btnDK").click(function () {
        socket.emit("client_send_User", $("#textUsername").val())
    })
    $("#btnLogout").click(function () {
        socket.emit("client_User_logout")
        $("#loginForm").show(2000);
        $("#chatForm").hide(1000);
    })
    //chat
    $("#bnt_send").click(function () {
        socket.emit("client_send_messager",$("#txtMessage").val())
    })
    //chat
    $("#txtMessage").focusin(function () {
        socket.emit("enter_start_content")
    })
    $("#txtMessage").focusout(function () {
        socket.emit("enter_stop_content")
    })

    // tao room
    $("#btn_createroom").click(function () {
        socket.emit("create_room",$("#txt_room").val())
    })
});
 

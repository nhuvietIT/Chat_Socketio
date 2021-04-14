const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

const server = require("http").Server(app);
const io = require("socket.io")(server);
console.log("Server Success..!");
server.listen(3000);

const arrayUrer=[];
io.on("connection",function (socket) {


    console.log("da nguoi ket noi : " + socket.id)

    //===> chat group
    socket.on("create_room",function(data){

        socket.join(data)
        socket.phong = data
        // const mroom = Object.keys(Map,)
        console.log(socket.adapter.rooms)

        const arrayRoom = []

        io.sockets.emit("server_send_room",)

    })


    // chat
    socket.on("client_send_User",function (data) {
        console.log("User Name : " +data)
        if (arrayUrer.indexOf(data)>=0){
            //fail
            socket.emit("server_send_fail");
        }else {
            //succsess
            arrayUrer.push(data);
            socket.UserName = data;
            socket.emit("server_send_succsess",data);
            io.sockets.emit("server_send_all_user",arrayUrer)
        }
    })

    socket.on("client_User_logout",function () {
        //outlog
        arrayUrer.splice(arrayUrer.indexOf(socket.UserName), 1);
        // phat cho nguoi còn online
        socket.broadcast.emit("server_send_all_user",arrayUrer)
    })

    // noi dung chat
    socket.on("client_send_messager",function (data) {
        io.sockets.emit("server_sent_message",{un:socket.UserName, nd:data})
    })

    // check nguoi nhap
    socket.on("enter_start_content",function (data) {
        console.log("musername : " + data)
         const checkTB = socket.UserName + " đang trả lời"
         io.sockets.emit("sever_start_content",checkTB)
    })
    //check nguoi nhap
    socket.on("enter_stop_content",function () {
        console.log(socket.UserName + " : toi ngung go")
        io.sockets.emit("sever_stop_content")
    })
})





app.get("/",function (req,res) {
    res.render("trangchu");
})


var app = require('express')();
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server, {
    cors: {
      origin: "http://etfholdings.ga",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

io.on('connection', function (socket) {
    let users  = [{user: 'GME', socketId: 'GME'},{user : 'EHANG', socketId:'EHANG'}];
    let rooms = [];

    // 클라이언트로부터의 메시지가 수신되면
    socket.on('chat', function (data) {
        console.log('Message from %s: %s', data.user, data.msg);

        var msg = {
            user : data.user,
            socketId : data.socketId,
            msg : data.msg
        };

        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', msg);
    });

    socket.on('leave_chat', function (data) {
        users.pop(users.indexOf(o => o.user == data.user));
        socket.broadcast.emit('leave_chat', {
            user : data.user,
            socketId : data.socketId 
        });
    });

    socket.on('connect', function (data) {
        log.info('Inner from %s: %s', data.user)
        users.push({user : data.user, socketId : data.socketId})
        socket.emit('set_user_list',{
            users : users
        });
    });
    socket.on('connecttion', function (data) {
        log.info('Inner2 from %s: %s', data.user)
        users.push({user : data.user, socketId : data.socketId})
        socket.emit('set_user_list',{
            users : users
        });
    });

    socket.on('start_chat', function(data){
        // console.log(socket);
        log.info('Inner from %s: %s', data.user)
        socket.broadcast.emit('start_chat', {
            user : data.user,
            socketId : data.socketId ,
            users : users
        });
    })


});

// namespace /chat에 접속한다.
// var chat = io.of('/chat').on('connection', function (socket) {
//     socket.on('chat message', function (data) {
//         console.log('message from client: ', data);

//         var name = socket.name = data.name;
//         var room = socket.room = data.room;

//         // room에 join한다
//         socket.join(room);
//         // room에 join되어 있는 클라이언트에게 메시지를 전송한다
//         chat.to(room).emit('chat message', data.msg);
//     });
// });

server.listen(3000, function () {
    console.log('Socket IO server listening on port 3000');
});
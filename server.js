var app = require('express')();
var server = require('http').createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server, {
    cors: {
        origin: ["etfholdings.ga:*", "http://localhost"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: false
    }
});

let users = [{ user: '[GM] /web/main', socketId: 'devloper' }];
let rooms = [];
io.on('connect', function (socket) {
    // 누군가 입장시 
    socket.on('start_chat', (data) => {
        socket.user = data.user;
        console.log(' connect : ' + data.socketId + ' name : ' + socket.user);
        users.push({ user: data.user, socketId: data.socketId })
        socket.emit('set_user_list', {
            users: users
        });
        socket.broadcast.emit('set_user_list', {
            users: users
        });
    })

    // 내가 퇴장시
    socket.on('disconnect', (data) => {
        console.log(' disconnect : ' + socket.id + ' name : ' + socket.user);
        users = users.filter((item, index) => !(item.socketId === socket.id));
        socket.emit('set_user_list', {
            users: users
        });
        socket.broadcast.emit('set_user_list', {
            users: users
        });
    });


    // 클라이언트로부터의 메시지가 수신되면
    socket.on('chat', function (data) {
        console.log('Message from %s: %s', data.user, data.msg);
        var msg = {
            user: data.user,
            socketId: data.socketId,
            msg: data.msg
        };

        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', msg);
    });

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
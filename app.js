var express = require("express");
var app = express();
var port = 3700;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("pages/index");
});

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
	console.log("connected.");
    socket.emit('message', { message: 'welcome to the chat', username: 'System' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
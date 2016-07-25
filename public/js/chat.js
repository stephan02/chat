window.onload = function() {

    var messages = [];
    var usernames = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            usernames.push(data.username);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += usernames[i] + ": " + messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    $("#form").submit(function(e){
        e.preventDefault();
        uname = $("#username").val();
        if(uname != ""){
            var text = field.value;
            socket.emit('send', { message: text, username: uname });
            field.value = "";
            $("#content").scrollTop($("#content")[0].scrollHeight);
        }else{
            alert("Enter username.");
        }
    });

}
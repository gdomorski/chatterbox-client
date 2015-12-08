$(function(){

  var arr = ['<','>',"&", ';',")","("]
  var rooms = [];

  $('.submit').on('click', function(event){
    event.preventDefault();

    app.send({
      username:'pokemon',
      text:$('#message').val(),
      roomname:'lobby'
    });
  });


  $('.update').on('click', function(event){
    event.preventDefault();
    $('#chats').html('')
    app.fetch();
  });


  window.app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    init:function(){
      $('#send .submit').on('submit', app.handleSubmit)
      $('.username').on('click',app.addFriend)
    },
    send:function(msg){
      
      $.ajax({
        url: app.server,
        type:'POST',
        data: JSON.stringify(msg),
        contentType: 'application/json',
        success:function(data){
          $('#chats').html('');
          $('.update').trigger('click');
        },
        error:function(data){

        }
      })
    },
    fetch: function(){
      $.ajax({
        url: app.server,
        type:'GET',
        contentType: 'application/json',
        success:function(data){
          data.results.reverse();
          app.addMessage(data.results);
        },
        error:function(data){
        }
      });
    },
    clearMessages:function(){
      $('#chats').html('')
    },
    addMessage: function(message){
      
      _.each(message,function(msg){
        app.addRoom(msg.roomname)

        var ourMessage = '<li class="username">' + app.checkMessage(msg.username) + " : " + app.checkMessage(msg.text) + '</li>'
        $('#chats').prepend(ourMessage);
      });

    },
    addRoom: function(room){
      if(rooms.indexOf(room) === -1){
       $("#roomSelect").append('<option value=' + room +'>' + room + '</option>')
       rooms.push(room)
      }

    },
    addFriend:function(){

    },
    handleSubmit:function(){
      
    },
    checkMessage:function(message){
        if(typeof message !== 'string'){
          return;
        }

      for(var i = 0; i < message.length; i++){
        if(arr.indexOf(message[i]) !== -1){
          return "Invalid Message";
        }
      }
      return message;
    }

  };

  app.fetch();


});


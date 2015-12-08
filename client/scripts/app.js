$(function(){

  var arr = ['<','>',"&", ';',")","("]
  var rooms = [];

  $('.submit').on('click', function(event){
    event.preventDefault();

    app.send({
      username:'Larry',
      text:$('#message').val(),
      roomname:'lobby'
    });
  });


  $('.update').on('click', function(event){
    event.preventDefault();
    app.fetch();
  });

  $('#roomSelect').change(function(){
    app.fetch() 
  });

  $('#chats').on('click','span', function(){
    app.addFriend('.' + this.className)
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

          var value = $('#roomSelect option:selected').text()


          if(value === 'ALL'){
            app.addMessage(data.results);  
          } else {
            app.filterRoom(data);
          }
          
        },
        error:function(data){
        }
      });
    },
    clearMessages:function(){
      $('#chats').html('')
    },
    addMessage: function(message){

      $('#chats').html('')
      
      _.each(message,function(msg){
        app.addRoom(msg.roomname)
        if(msg.username !== undefined){
          var ourMessage = $('<li> <span class=' + msg.username.toString() + '>' + app.checkMessage(msg.username) + "</span> : " + app.checkMessage(msg.text) + '</li>').addClass("username").addClass(msg.roomname)
          $('#chats').prepend(ourMessage);
        }
      });

    },
    addRoom: function(room){
      if(rooms.indexOf(room) === -1){
       $("#roomSelect").append('<option value=' + room +'>' + room + '</option>')
       rooms.push(room)
      }

    },
    addFriend:function(className){
      $(className).css('font-weight', 'bold');
      console.log($(className))



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
    },
    filterRoom:function(data){
 
      var value = $('#roomSelect option:selected').text()

      var roomNodes =  _.filter(data.results, function(msg){
        if(msg.roomname === value){
          return true;
        } 
        return false;
      });

      $('#chats').html('');

      _.each(roomNodes, function(msg){
        var ourMessage = $('<li> <span class=' + msg.username.toString() + '>' + app.checkMessage(msg.username) + " : " + app.checkMessage(msg.text) + '</li>').addClass("username").addClass(msg.roomname)
        $('#chats').prepend(ourMessage);
      });
    }

  };

  app.fetch();


});


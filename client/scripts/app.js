// YOUR CODE HERE:

var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  //text: $('#send').val(),
  roomname: 'lobby'
}


$('.submit').click(function(){
  app.handleSubmit();

})


var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init:function(){
    $('#send .submit').on('submit', app.handleSubmit)
    $('.username').on('click',app.addFriend)
  },
  send:function(){
    
    $.ajax({
      url: app.server,
      type:'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success:function(data){

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
        console.log(data);
      },
      error:function(data){

      }
    });
  },
  clearMessages:function(){
    $('#chats').html('')
  },
  addMessage: function(message){
    $('#chats').append('<li class="username">' + message.username + " : " + message.text + '</li>');
  },
  addRoom: function(room){
    $("#roomSelect").append('<option value=' + room +'>' + room + '</option>')
  },
  addFriend:function(){

  },
  handleSubmit:function(){
    console.log("hello");
  }

};

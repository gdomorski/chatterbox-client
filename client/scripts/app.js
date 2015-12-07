// YOUR CODE HERE:

var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
}


var app = {
  init:function(){

  },
  send:function(){
    
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
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
      //url:'https://api.parse.com/1/classes/chatterbox/',
    
      type:'GET',
      contentType: 'application/json',
      success:function(data){
      },
      error:function(data){

      }
    });
  }

};

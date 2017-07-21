'use strict';

$(document).ready(function(){

$('#submit').click(function (event){
 event.preventDefault();

  let users = {
   firstName: $('#firstNameInput').val(),
   lastName: $('#lastNameInput').val(),
   username: $('#usernameInput').val(),
   email: $('#emailInput').val(),
   phone: $('#phoneInput').val()
  };

  var options = {
    contentType: 'application/json',
    type: 'POST',
    url: '/users',
    data: JSON.stringify({users})
  };

  $.ajax(options)
    .done(() => {
      window.location.href = '/';
    })
    .fail((err) => {
      console.log(err.responseText);
    });
  });

  $.getJSON('/users')
    .done((results) => {
      for (var i = 0; i < results.length; i++) {
        let appendUser = {
          id: results[i].id,
          firstName: $('<h3>').text(results[i].firstname),
          lastName: $('<h3>').text(results[i].lastname),
          username: $('<h5>').text(results[i].username),
          phone: $('<h5>').text(results[i].phone),
          email: $('<h5>').text(results[i].email)
        }

        $('#userContainer').append(appendUser.id);
        $('#userContainer').append(appendUser.firstName);
        $('#userContainer').append(appendUser.lastName);
        $('#userContainer').append(appendUser.username);
        $('#userContainer').append(appendUser.email);
        $('#userContainer').append(appendUser.phone);
        $('#userContainer').append('<hr />');
      }
    })
}); //document ready closure

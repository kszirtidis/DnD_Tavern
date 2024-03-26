/* Citation for the following delete_room.js function:
    Date: 2/29/2024 
    Adapted from code provided by Prof. Safonte and Dr. Curry for students at Oregon State University. Function
    was adapted and changed according to the needs of our database.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app */

function deleteRoom(roomNumber) {
    let link = '/delete-rooms-ajax/';
    let data = {
      id: roomNumber
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(roomNumber);
        location.reload();

      }
    });
  }
  
  function deleteRow(roomNumber){
      let table = document.getElementById("rooms-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == roomNumber) {
              table.deleteRow(i);
              break;
         }
      }
  }

   
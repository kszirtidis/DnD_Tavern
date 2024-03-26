/* Citation for the following delete_item.js function:
    Date: 2/29/2024 
    Adapted from code provided by Prof. Safonte and Dr. Curry for students at Oregon State University. Function
    was adapted and changed according to the needs of our database.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function deleteItem(itemID) {
    let link = '/delete-item-ajax/';
    let data = {
      id: itemID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(itemID);
        location.reload();

      }
    });
  }
  
  function deleteRow(itemID){
      let table = document.getElementById("taverninventory-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == itemID) {
              table.deleteRow(i);
              break;
         }
      }
  }
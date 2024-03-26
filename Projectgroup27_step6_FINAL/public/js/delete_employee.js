/* Citation for the following delete_employee.js function:
    Date: 2/29/2024 
    Adapted from code provided by Prof. Safonte and Dr. Curry for students at Oregon State University. Function
    was adapted and changed according to the needs of our database.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function deleteEmployee(employeeID) {
    let link = '/delete-employee-ajax/';
    let data = {
      id: employeeID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(employeeID);
        location.reload();
      }
    });
  }
  
  function deleteRow(employeeID){
      let table = document.getElementById("employee-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == employeeID) {
              table.deleteRow(i);
              break;
         }
      } 
  }
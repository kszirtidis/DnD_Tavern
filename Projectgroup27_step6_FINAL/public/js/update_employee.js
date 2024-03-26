/* Citation for the following update_employee.js function:
    Date: 2/29/2024 
    Adapted from code provided by Prof. Safonte and Dr. Curry for students at Oregon State University. Function
    was adapted and changed according to the needs of our database. Some comments were modified or removed.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputemployeeID = document.getElementById("mySelect");
    let inputTitle = document.getElementById("input-title-update");
    let inputServiceType = document.getElementById("input-serviceType-update");

    // Get the values from the form fields
    let employeeID = inputemployeeID.value;
    let titleValue = inputTitle.value;
    let serviceTypeValue = inputServiceType.value;
    
    // currently the database table for Employees does not allow updating titles to NULL
    // so we must abort if being passed NULL for title

    if (isNaN(employeeID)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        employee: employeeID,
        title: titleValue,
        serviceType: serviceTypeValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, employeeID, title);
           
            location.reload();


        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, employeeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("employee-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeeID) {

            // Get the location of the row where we found the matching employee ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of room value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign room to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

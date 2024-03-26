/* Citation for the following update_person.js function:
    Date: 2/29/2024 
    Adapted from code provided by Prof. Safonte and Dr. Curry for students at Oregon State University. Function
    was adapted and changed according to the needs of our database. Some comments were modified or removed.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-person-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputroom = document.getElementById("input-roomNumber-update");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let roomValue = inputroom.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for room

    if (isNaN(roomValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        room: roomValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-person-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, guestID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("guest-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == guestID) {

            // Get the location of the row where we found the matching guest ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of room value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign room to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

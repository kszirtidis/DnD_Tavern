/* Citation for the following update_room.js function:
    Date: 2/29/2024 
    Adapted from code provided by Prof. Safonte and Dr. Curry for students at Oregon State University. Function
    was adapted and changed according to the needs of our database. Some comments were modified or removed.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let updateRoomForm = document.getElementById('update-room-form-ajax');

// Modify the objects we need
updateRoomForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputroomNumber = document.getElementById("mySelect");
    let inputroomType = document.getElementById("input-roomType-update");
    let inputprice = document.getElementById("input-Price-update");
    let inputavailability = document.getElementById("input-availability-update");
    let inputemployeeName = document.getElementById("input-employeeName-update");

    // Get the values from the form fields
    let roomNumber = inputroomNumber.value;
    let roomType = inputroomType.value
    let price = inputprice.value
    let availability = inputavailability.value
    let employeeName = inputemployeeName.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(roomNumber, roomType,availability, price)) 
    {
        return;
    }

    if (isNaN(employeeName))
    {
         NULL;
    }

    // Put our data we want to send in a javascript object
    let data = {
        roomNumber: inputroomNumber.value,
        employeeName: inputemployeeName.value,
        roomType: inputroomType.value,
        price: inputprice.value,
        availability: inputavailability.value

    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-room-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, employeeName, roomType, availability, price);
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, roomNumber){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("rooms-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == roomNumber) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

// App.js

/* Citation for the following app.js function:
    Date: 2/29/2024 
    Adapted from code provided by Prof. Safonte and Dr. Curry for students at Oregon State University. Functions
    were adapted and changed according to the needs of our database. Comments were added, removed, or changed 
    depending on the needs of our database.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app  = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 9200;                 // Set a port number at the top so it's easy to change in the future
// app.js

// Database
var db = require('./database/db-connector')


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/

// app.js

app.get ('/', (req, res) => {
    res.render('index')
});

app.get('/guests', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lastName === undefined)
    {
        query1 = "SELECT * FROM Guests;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Guests WHERE lastName LIKE "${req.query.lastName}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Rooms;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let guests = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let rooms = rows;

            return res.render('guests', {data: guests, rooms: rooms});
        })
    })
});

app.get('/transactions', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lastName === undefined)
    {
        query1 = "SELECT transactionID, Guests.guestID,  CONCAT(Guests.firstName, ' ', Guests.lastName) AS Guest, TavernInventory.itemID, TavernInventory.itemName, quantity, TavernInventory.price AS `Unit Price`, quantity * TavernInventory.price AS totalPrice, transactionDate FROM Transactions INNER JOIN Guests ON Transactions.guestID = Guests.guestID  INNER JOIN TavernInventory ON Transactions.itemID = TavernInventory.itemID ORDER BY transactionID ASC;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT transactionID, Guests.guestID,  CONCAT(Guests.firstName, ' ', Guests.lastName) AS Guest, TavernInventory.itemID, TavernInventory.itemName, quantity, TavernInventory.price AS 'Unit Price', quantity * TavernInventory.price AS totalPrice, transactionDate FROM Transactions INNER JOIN Guests ON Transactions.guestID = Guests.guestID INNER JOIN TavernInventory ON Transactions.itemID = TavernInventory.itemID WHERE lastName LIKE "${req.query.lastName}%" ORDER BY transactionID ASC`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Guests;";

    //Query 3
    let query3 = "SELECT * FROM TavernInventory;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the transactions
        let transactions = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the guests
            let guests = rows;


        db.pool.query(query3, (error, rows, fields) => {
        
            // Save the items
            let items = rows;

            return res.render('transactions', {data: transactions, guests: guests, items: items});
        })
    })
})});

app.get('/employees', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.employeeLastName === undefined)
    {
        query1 = "SELECT * FROM Employees;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Employees WHERE employeeLastName LIKE "${req.query.employeeLastName}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the employees
        let employees = rows;

        return res.render('employees', {data: employees});
    })
});

app.get('/taverninventory', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.itemName === undefined)
    {
        query1 = "SELECT * FROM TavernInventory;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM TavernInventory WHERE itemName LIKE "${req.query.itemName}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the items
        let items = rows;

        return res.render('taverninventory', {data: items});
    })
});

app.get('/rooms', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.roomType === undefined)
    {
        query1 = "SELECT * FROM Rooms;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Rooms WHERE roomType LIKE "${req.query.roomType}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Employees;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let rooms = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let employees = rows;

            
            return res.render('rooms', {data: rooms, employees: employees});
        })
    })
});

app.post('/add-person-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let roomNumber = parseInt(data ['input-roomNumber']);
    if (isNaN(roomNumber))
    {
        roomNumber = 'NULL'
    }

    let gold = parseInt(data['input-gold']);
    if (isNaN(gold))
    {
        gold = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Guests (firstName, lastName, race, class, gold, roomNumber) VALUES ('${data['input-firstName']}', '${data['input-lastName']}', '${data['input-race']}', '${data['input-class']}', ${gold}, ${roomNumber} )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
           res.redirect('/guests');
        }
            })
});                                                       // received back from the query                                        // will process this file, before sending the finished HTML to the client.

app.post('/add-employee-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let serviceType = parseInt(data ['input-serviceType']);
    if (isNaN(serviceType))
    {
        serviceType = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (title, employeeFirstName, employeeLastName, serviceType) VALUES ('${data['input-title']}', '${data['input-employeeFirstName']}', '${data['input-employeeLastName']}', '${data['input-serviceType']}' )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
           res.redirect('/employees');
        }
            })
});                                                       // received back from the query                                        // will process this file, before sending the finished HTML to the client.

app.post('/add-item-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let quantityInStock = parseInt(data ['input-quantityInStock']);
    if (isNaN(quantityInStock))
    {
        quantityInStock = 'NULL'
    }

    let price = parseInt(data ['input-price']);
    if (isNaN(price))
    {
        price = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO TavernInventory (itemName, quantityInStock, price) VALUES ('${data['input-itemName']}', '${data['input-quantityInStock']}', '${data['input-price']}' )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
           res.redirect('/taverninventory');
        }
            })
});

// app.js

app.post('/add-room-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let employeeID = parseInt(data['input-employeeID']);
    if (isNaN(employeeID))
    {
        employeeID = null; // set null if not valid
    }


    // Create the query and run it on the data base
    query1 = `INSERT INTO Rooms (roomType, price, availability, employeeID) VALUES ('${data['input-roomType']}', '${data['input-price']}', '${data['input-availability']}', ${employeeID} )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/rooms');
        }
    })
})

app.post('/add-transaction-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let quantity = parseInt(data ['input-quantity']);
    if (isNaN(quantity))
    {
        quantity = 'NULL'
    }

    let totalPrice = parseInt(data['input-totalPrice']);
    if (isNaN(totalPrice))
    {
        totalPrice = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Transactions (guestID, itemID, quantity, totalPrice, transactionDate) VALUES ('${data['input-guestID']}', '${data['input-itemID']}', '${quantity}', ${totalPrice}, '${data['input-transactionDate']}' )`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
           res.redirect('/transactions');
        }
            })
});                

app.delete('/delete-person-ajax/', function(req,res,next){
    let data = req.body;
    let guestID = parseInt(data.id);
    let deleteGuests = `DELETE FROM Guests WHERE guestID = ?`;
    let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteGuests, [guestID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204);
                
              }
  
  })});

  app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.id);
    let deleteEmployees = `DELETE FROM Employees WHERE employeeID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteEmployees, [employeeID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204);
                
              }
  
  })});

    app.delete('/delete-item-ajax/', function(req,res,next){
        let data = req.body;
        let itemID = parseInt(data.id);
        let deleteItems = `DELETE FROM TavernInventory WHERE itemID = ?`;
    
    
            // Run the 1st query
            db.pool.query(deleteItems, [itemID], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
                else
                {
                    res.sendStatus(204);
                    
                }
    
    })});

  app.delete('/delete-rooms-ajax/', function(req,res,next){
    let data = req.body;
    let roomNumber = parseInt(data.id);
    let deleteRoom = `DELETE FROM Rooms WHERE roomNumber = ?`;
  
  
          // Run the 1st query
            db.pool.query(deleteRoom, [roomNumber], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              
              else{

                res.sendStatus(204);}
        
  })}); 
  
                                        // received back from the query                                        // will process this file, before sending the finished HTML to the client.
  
  app.delete('/delete-transaction-ajax/', function(req,res,next){
      let data = req.body;
      let transactionID = parseInt(data.id);
      let deleteTransaction = `DELETE FROM Transactions WHERE transactionID = ?`;
      
    
    
            // Run the 1st query
            db.pool.query(deleteTransaction, [transactionID], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
                else
                {
                  res.sendStatus(204);}
                })});



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

app.put('/put-person-ajax', function(req,res,next){
    let data = req.body;
  
    let room = parseInt(data.room);
    let person = parseInt(data.fullname);
  
    let queryUpdateRoom = `UPDATE Guests SET roomNumber = ? WHERE Guests.guestID = ?`;
    let selectRoom = `SELECT * FROM Rooms WHERE roomNumber = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateRoom, [room, person], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectRoom, [room], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

  app.put('/put-employee-ajax', function(req,res,next){
    let data = req.body;
  
    let employee = parseInt(data.employee);
    let title = data.title;
    let serviceType = data.serviceType;
  
    let queryUpdateEmployee = `UPDATE Employees SET title = ?, serviceType = ? WHERE Employees.employeeID = ?`;
  
          // Run the 1st query
          db.pool.query(queryUpdateEmployee, [title, serviceType, employee], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  })});

    app.put('/put-item-ajax', function(req,res,next){
        let data = req.body;
    
        let itemName = parseInt(data.itemName);
        let quantityInStock = parseInt(data.quantityInStock);
        let price = parseInt(data.price);
    
        let queryUpdateItem = `UPDATE TavernInventory SET quantityInStock = ?, price = ? WHERE TavernInventory.itemID = ?`;
    
            // Run the 1st query
            db.pool.query(queryUpdateItem, [quantityInStock, price, itemName], function(error, rows, fields){
                
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    })});


    app.put('/put-room-ajax', function(req,res,next){
    let data = req.body;

    let room = parseInt(data.roomNumber);
    let employee = parseInt(data.employeeName) ? parseInt(data.employeeName) : null;
    let type = data.roomType;
    let prices = parseInt(data.price);
    let available = data.availability === '0' ? '0' : '1';
    

    let queryUpdateEmployee = `UPDATE Rooms SET employeeID = ?, roomType = ?, price = ?, availability = ? WHERE Rooms.roomNumber = ?`;
    let selectroom = `SELECT * FROM Rooms WHERE roomNumber = ?`

            // Run the 1st query
            db.pool.query(queryUpdateEmployee, [employee, type, prices, available, room], function(error, rows, fields){
                if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else
                {
                    // Run the second query
                    db.pool.query(selectroom, [room], function(error, rows, fields) {

                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
    })});



  app.put('/put-transaction-ajax', function(req,res,next){
    let data = req.body;
  
    let transaction = parseInt(data.transaction);
    let guest = parseInt(data.guest);
    let item = parseInt(data.item);
    let quantity = parseInt(data.quantity);
    let date = data.date;
  
    let queryUpdateTransaction = `UPDATE Transactions SET guestID = ?, itemID = ?, quantity = ?, transactionDate = ? WHERE Transactions.transactionID = ?`;
    let selecttransaction = `SELECT * FROM Transactions WHERE transactionID = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateTransaction, [guest, item, quantity, date, transaction], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selecttransaction, [transaction], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});


  // Update all page to have ansynchronos updates. DONE
  // Fix transactions to show all guests currently only shows guests in transactions table and shows guests and Items more than once. Issue was picking correct array. DONE
  // Search not working DONE
  // add math to transactions page to calculate total if possible. DONE
  // check each page for CRUD
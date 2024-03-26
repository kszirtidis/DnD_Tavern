/* Project: DML.SQL for Inn Management System
Members: Justin Hayne Kayo Zirtidis
Group: 27
*/

/* Guests Table CRUD Operations */

/* View the Guests table */
SELECT Guests.guestID, Guests.firstName, Guests.lastName, Guests.race, Guests.class, Guests.gold, Rooms.roomNumber
    FROM Guests
    INNER JOIN Rooms ON Guests.roomNumber = Rooms.roomNumber;

/* Add a new guest to the Guests table */
INSERT INTO Guests (firstName, lastName, race, class, gold, roomNumber)
    VALUES ('${data['input-firstName']}', '${data['input-lastName']}', '${data['input-race']}', '${data['input-class']}', ${gold}, ${roomNumber});

/* Update a guest in the Guests table */
UPDATE Guests
    SET roomNumber = ? WHERE Guests.guestID = ?;

/* Delete a guest from the Guests table */

DELETE FROM Guests WHERE guestID = ?;


/* Rooms Table CRUD Operations */

/* View the Rooms table */
SELECT Rooms.roomNumber, Rooms.roomType, Rooms.price, Rooms.availability, Rooms.employeeID
    FROM Rooms
    INNER JOIN Employees ON Rooms.employeeID = Employees.employeeID;

/* Add a new room to the Rooms table */
INSERT INTO Rooms (roomType, price, availability, employeeID)
    VALUES(:roomTypeInput, :priceInput, :availabilityInput, :employeeIDInput);

/* Update a room in the Rooms table */
UPDATE Rooms
    SET roomType = :roomTypeInput, price = :priceInput, availability = :availabilityInput, employeeID = :employeeIDInput
    WHERE roomNumber = :roomNumberInput;

/* Delete a room from the Rooms table */
DELETE FROM Rooms WHERE roomNumber = :roomNumberInput;


/* Employees Table CRUD Operations */

/* View the Employees table */
SELECT * FROM Employees;

/* Add a new employee to the Employees table */
INSERT INTO Employees (title, employeeFirstName, employeeLastName, serviceType)
    VALUES (:titleInput, :employeeFirstNameInput, :employeeLastNameInput, :serviceTypeInput);

/* Update an employee's information in the Employees table */
UPDATE Employees
    SET title = :titleInput, employeeFirstName = :employeeFirstNameInput, employeeLastName = :employeeLastNameInput, serviceType = :serviceTypeInput
    WHERE employeeID = :employeeIDInput;

/* Delete an employee's information from the Employees table */
DELETE FROM Employees WHERE employeeID = :employeeIDInput;


/* TavernInventory Table CRUD Operations */

/* View the TavernInventory table */
SELECT * FROM TavernInventory;

/* Add a new item to the TavernInventory table */
INSERT INTO TavernInventory (itemName, quantityInStock, price)
    VALUES (:itemNameInput, :quantityInStockInput, :priceInput);

/* Update an item's information in the TavernInventory table */
UPDATE TavernInventory
    SET itemName = :itemNameInput, quantityInStock = :quantityInStockInput, price = :priceInput
    WHERE itemID = :itemIDInput;

/* Delete an item from TavernInventory table */
DELETE FROM TavernInventory WHERE itemID = :itemIDInput;


/* Transactions Table CRUD Operations */

/* View the Transactions table */
SELECT Transactions.transactionID, Guests.guestID, TavernInventory.itemID, Transactions.quantity, Transactions.totalPrice, Transactions.transactionDate
    FROM Transactions
    INNER JOIN Guests ON Transactions.guestID = Guests.guestID
    INNER JOIN TavernInventory ON Transactions.itemID = TavernInventory.itemID;

/* Add a new transaction to the Transactions table */
INSERT INTO Transactions (guestID, itemID, quantity, totalPrice, transactionDate)
    VALUES (:guestIDInput, :itemIDInput, :quantityInput, :totalPriceInput, :transactionDateInput);

/* Update a transaction's information in the Transactions table */
UPDATE Transactions
    SET guestID = :guestIDInput, guestName = :guestNameInput, itemID = :itemIDInput, itemName = :itemNameInput quantity = :quantityInput, unitPrice = :unitPriceInput, totalPrice = :totalPriceInput, transactionDate = :transactionDateInput
    WHERE transactionID = :transactionIDInput;

/* Deletes an transaction from the Transactions table.*/
DELETE FROM Transactions WHERE transactionID = :transactionIDInput;

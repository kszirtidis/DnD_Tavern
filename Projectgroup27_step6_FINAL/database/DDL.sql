SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/* Project: DDL.SQL for Inn Management System
Members: Justin Hayne Kayo Zirtidis
Group: 27
*/

/* Creating the table to manage guest information with reference to room number. */

CREATE OR REPLACE TABLE Guests (
    `guestID` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(145) NOT NULL,
    `lastName` VARCHAR(145) NOT NULL,
    `race` VARCHAR(145),
    `class` VARCHAR(145),
    `gold` INT(11),
    `roomNumber` INT(11),
    FOREIGN KEY (`roomNumber`) REFERENCES Rooms(`roomNumber`)
);

/* Creating the table to manage room information. */

CREATE OR REPLACE TABLE Rooms (
    `roomNumber` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `roomType` VARCHAR(145),
    `price` INT(11),
    `availability` TINYINT(1),
    `employeeID` INT(11),
    FOREIGN KEY (`employeeID`) REFERENCES Employees (`employeeID`) ON DELETE SET NULL
);

/* Creating the table to manage items and information about items available at the tavern. */

CREATE OR REPLACE TABLE TavernInventory (
    `itemID` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `itemName` VARCHAR(145) NOT NULL,
    `quantityInStock` INT(11),
    `price` INT(11)
);

/* Creating the table to manage employee information. */

CREATE OR REPLACE TABLE Employees (
    `employeeID` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(145) NOT NULL,
    `employeeFirstName` VARCHAR(145) NOT NULL,
    `employeeLastName` VARCHAR(145) NOT NULL,
    `serviceType` VARCHAR(145)
);

/* Creating the transactions table to manage the M:N relationship between Guests and TavernInventory. */

CREATE OR REPLACE TABLE Transactions (
    `transactionID` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `guestID` INT(11),
    `guestName` VARCHAR(145),
    `itemID` INT(11),
    `itemName` VARCHAR(145),
    `quantity` INT(11),
    `unitPrice` INT(11),
    `totalPrice` INT(11),
    `transactionDate` DATE,
    FOREIGN KEY (`guestID`) REFERENCES Guests(`guestID`) ON DELETE SET NULL,
    FOREIGN KEY (`itemID`) REFERENCES TavernInventory(`itemID`)
);

/* Inserting sample data for each entity */

INSERT INTO Guests (`firstName`,`lastName`, `race`, `class`, `gold`, `roomNumber`)
VALUES
    ('Elowen', 'Swiftblade', 'Human', 'Warrior', 100, 1),
    ('Thrain', 'Fireheart', 'Elf', 'Mage', 150, 2),
    ('Seraphina', 'Moonshadow', 'Dwarf', 'Rogue', 80, 3),
    ('Lyra', 'Frostwind', 'Halfling', 'Bard', 120, 4);

INSERT INTO Rooms (`roomType`, `price`, `availability`, `employeeID`)
VALUES
    ('Single', 50, FALSE, 2),
    ('Double', 80, FALSE, 2),
    ('Suite', 120, TRUE, 2),
    ('Royal Suite', 500, TRUE, 2);

INSERT INTO TavernInventory (`itemName`, `quantityInStock`, `price`)
VALUES
    ('Health Potion', 20, 50),
    ('Mana Elixer', 15, 25),
    ('Roast Chicken', 30, 10),
    ("Dwarf's Ale", 50, 8),
    ('Rabbit Stew', 45, 6);

INSERT INTO Employees (`title`,`employeeFirstName`,`employeeLastName`, `serviceType`)
VALUES
    ('Innkeeper', 'Bob', 'Conners', 'Management'),
    ('Maid', 'Alice', 'Wonderlands', 'Housekeeping'),
    ('Chef', 'Charlie', 'Brownson', 'Kitchen'),
    ('Server', 'Quinlan', 'Stargazer', 'Server');

INSERT INTO Transactions (`guestID`, `guestName`, `itemID`, `itemName`, `quantity`, `unitPrice`, `totalPrice`, `transactionDate`)
VALUES
    (1, 'Elowen Swiftblade', 1, 'Health Potion', 2, 50, 100, '2024-02-07'),
    (2, 'Thrain Fireheart', 3, 'Roast Chicken', 1, 10, 10, '2024-02-08'),
    (3, 'Seraphina Moonshadow', 2, 'Mana Elixer', 3, 25, 75, '2024-02-09'),
    (4, 'Lyra Frostwind', 4, "Dwarf's Ale", 2, 8, 16, '2024-02-10'),
    (4, 'Lyra Frostwind', 3, 'Roast Chicken', 1, 10, 10, '2024-02-10');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
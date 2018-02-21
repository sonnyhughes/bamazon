//DEPENDENCIES
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');


//CONNECTION TO MYSQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
});


//FUNCTIONS
// function showItems() {
//     //SHOW ME ALL IDs, NAMES, AND PRODUCTS FROM BAMAZON
//     connection.query('SELECT * FROM Products', function (error, response) {
//         if (error) { console.log(error) };
//         //NEW INSTANCE OF CONSTRUCTOR
//         var theDisplayTable = new Table({
//             //DECLARE VALUE CATEGORIES
//             head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
//             //SET COLUMN WIDTH TO SCALE
//             colWidths: [10, 30, 18, 10, 14]
//         });
//         //LOOP THROUGH EACH ROW
//         for (i = 0; i < response.length; i++) {
//             //PUSH RECORD DATA TO TABLE
//             theDisplayTable.push(
//                 [response[i].ItemID, response[i].MenuItem, response[i].Category, response[i].Price, response[i].Inventory]
//             );
//         }
//         //CONSOLE LOG NEW TABLE
//         console.log(theDisplayTable.toString());
//         //ASK FOR UPDATES 
//         manageInventory();
//     });
// };

function manageInventory() {
    //FETCH MANAGEMENT OPTION FROM CHOICES
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Please choose an inventory action below:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Remove Item from Stock"]
    }]).then(function (answers) {
        //USER PICKS A MANAGEMENT OPTION FROM THE MENU
        switch (answers.action) {

            case 'View Products for Sale':
                showItems();
                break;
            
            case 'View Low Inventory':
                showLowStock();
                break;

            case 'Add to Inventory':
                restockItem();
                break;

            case 'Add New Product':
                addItem();
                break;

            case 'Remove Item from Stock':
                removeItem();
                break;
        }
    });
};

function showItems() {
    //SHOW ME ALL IDs, NAMES, AND PRODUCTS FROM BAMAZON
    connection.query('SELECT * FROM Products', function (error, response) {
        if (error) { console.log(error) };
        //NEW INSTANCE OF CONSTRUCTOR
        var theDisplayTable = new Table({
            //DECLARE VALUE CATEGORIES
            head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
            //SET COLUMN WIDTH TO SCALE
            colWidths: [10, 30, 18, 10, 14]
        });
        //LOOP THROUGH EACH ROW
        for (i = 0; i < response.length; i++) {
            //PUSH RECORD DATA TO TABLE
            theDisplayTable.push(
                [response[i].ItemID, response[i].MenuItem, response[i].Category, response[i].Price, response[i].Inventory]
            );
        }
        //CONSOLE LOG NEW TABLE
        console.log(theDisplayTable.toString());
        //ASK FOR UPDATES 
        manageInventory();
    });
};

function showLowStock() {
    //SHOW ME ALL IDs, NAMES, AND PRODUCTS FROM BAMAZON
    connection.query('SELECT * FROM products WHERE Inventory < 200', function (error, response) {
        if (error) { console.log(error) };
        //NEW INSTANCE OF CONSTRUCTOR
        var theDisplayTable = new Table({
            //DECLARE VALUE CATEGORIES
            head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
            //SET COLUMN WIDTH TO SCALE
            colWidths: [10, 30, 18, 10, 14]
        });
        //LOOP THROUGH EACH ROW
        for (i = 0; i < response.length; i++) {
            //PUSH RECORD DATA TO TABLE
            theDisplayTable.push(
                [response[i].ItemID, response[i].MenuItem, response[i].Category, response[i].Price, response[i].Inventory]
            );
        }
        //CONSOLE LOG NEW TABLE
        console.log(theDisplayTable.toString());
        //ASK FOR UPDATES 
        manageInventory();
    });
};




function restockItem() {
    //FETCH ITEM ID AND QUANTITY FROM USER
    inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "Please enter the item number of the product you wish to restock: "
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many items would you like to add? "
        },

    ]).then(function (answers) {
        //SAVE INPUT AS VARIABLES, PASS VARIABLES AS ARGUMENTS TO updateDatabaseStock() FUNCTION
        var quantityAdded = answers.Quantity;
        var IDOfProduct = answers.ID;
        updateDatabaseStock(IDOfProduct, quantityAdded);
    });
};

function updateDatabaseStock(id, quant) {
    //UPDATES DATABASE
    connection.query('SELECT * FROM Products WHERE ItemID = ' + id, function (error, response) {
        if (error) { console.log(error) };
        connection.query('UPDATE Products SET Inventory = Inventory + ' + quant + ' WHERE ItemID = ' + id);
        //SHOWS UPDATED DISPLAY OF ITEMS IN STOCK
        showItems();
    });
};




function addItem() {
    //FETCH ITEM NAME, CATEGORY, PRICE, AND QUANTITY FROM USER
    inquirer.prompt([

        {
            name: "Name",
            type: "input",
            message: "Please enter the name of the product you wish to add to inventory: "
        },
        {
            name: 'Category',
            type: 'input',
            message: "Is this item food or drink? "
        },
        {
            name: 'Price',
            type: 'input',
            message: "What will be the price for this item? (Example: 14.99) "
        },
        {
            name: 'Quantity',
            type: 'input',
            message: "How many items would you like to add? "
        },

    ]).then(function (answers) {
        //SAVE INPUT AS VARIABLES, PASS VARIABLES AS ARGUMENTS TO addDatabaseItem() FUNCTION
        var name = answers.Name;
        var category = answers.Category;
        var price = answers.Price;
        var quantity = answers.Quantity;
        addDatabaseItem(name, category, price, quantity);
    });
};

function addDatabaseItem(name, category, price, quantity) {
    //query database, insert new item
    connection.query('INSERT INTO Products (MenuItem,Category,Price,Inventory) VALUES("' + name + '","' + category + '",' + price + ',' + quantity + ')');
    //display updated results
    showItems();

};




function removeItem() {
    //FETCH ITEM NUMBER FROM USER
    inquirer.prompt([{
        name: "ID",
        type: "input",
        message: "Please enter the item number of the product you wish to remove. "
    }]).then(function (answer) {
        //SAVE INPUT AS VARIABLE, PASS VARIABLE AS ARGUMENT TO removeDatabaseItem() FUNCTION
        var id = answer.ID;
        removeDatabaseItem(id);
    });
};

function removeDatabaseItem(id) {
    connection.query('DELETE FROM Products WHERE ItemID = ' + id);
    showItems();
};

manageInventory();

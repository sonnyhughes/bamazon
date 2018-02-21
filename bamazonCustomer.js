//DEPENDENCIES
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');


//CONNECTION TO MYSQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});


//FUNCTIONS
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
        //ASK FOR A NEW ORDER 
        takeNewOrder();
    });
};


function takeNewOrder() {
    //FETCH ITEM ID AND QUANTITY FROM USER
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please enter item number: "
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like? "
        },
        //SAVE INPUT AS VARIABLES, PASS VARIABLES AS ARGUMENTS TO grabDatabaseItem() FUNCTION
    ]).then(function (answers) {
        var quantityDesired = answers.Quantity;
        var IDDesired = answers.ID;
        grabDatabaseItem(IDDesired, quantityDesired);
    });
};


function grabDatabaseItem(ID, quantityNeeded) {
    //CHECK INVENTORY BY ITEM ID
    connection.query('SELECT * FROM Products WHERE ItemID = ' + ID, function (error, response) {
        if (error) { console.log(error) };
        //IF ITEM IS IN STOCK...
        if (quantityNeeded <= response[0].Inventory) {
            //CALCULATE PRICE
            var totalCost = response[0].Price * quantityNeeded;
            //PROVIDE USER FEEDBACK
            console.log(`Your ${response[0].MenuItem} item is available! Your order will be ready shortly!`);
            console.log(`Your check for ${quantityNeeded} orders of ${response[0].MenuItem} is ${totalCost}. Thank you for dining with us!`);
            //UPDATE DATABASE AND DEDUCT ONE FROM ITEM INVENTORY OR RESPONSE WITH OUT OF STOCK
            connection.query('UPDATE Products SET Inventory = Inventory - ' + quantityNeeded + ' WHERE ItemID = ' + ID);
        } else {
            console.log(`Bummer... We don't have all of those ${response[0].MenuItem} in-stock right now.`);
        };
        showItems();//LETS MAKE THIS A RECURSIVE MARKETPLACE
    });
}; //END grabDatabaseItem

showItems();

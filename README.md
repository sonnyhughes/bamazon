# Bamazon

The app takes pastry shop orders from customers and allows admins to manager their cafe's inventory.



## Customer App
![alt tag](/assets/BamazonCustomerApp.png)
#### To run the Customer Node application, enter `bamazonCustomer.js.` into the command line.

Executing this application will display all of the items available for sale, including item numbers, names, and prices of products for sale.

The app will then prompt users with two messages.

1. The first prompt will ask them the number of the product they would like to buy.
2. The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, the application will check if cafe has enough of the product to meet the customer's order.

* If so, the app will fulfill the customer's order.
* If not, the app  will log say, "Bummer... We don't have all of those in-stock right now.", and then prevent the order from going through.

The app will then update the SQL database to reflect the remaining quantity and provide the customer with the total cost of their order.

#### Products are organized in tables:

* **Database**: bamazon
* **Table Name**: Products
* **Product Categories**: 
    * `Item ID` 
    * `MenuItem` 
    * `Category` 
    * `Price` 
    * `Inventory`



## Manager App
![alt tag](/assets/BamazonManagerMenu.png)
#### To run the Manager Node application, enter `bamazonManager.js.` into the command line.

Executing this application will display the following menu:

List a set of menu options:
* `View Products for Sale`
* `View Low Inventory`
* `Add to Inventory`
* `Add New Product`
* `Remove Item From Stock`


#### View Products for Sale
![alt tag](/assets/BamazonManagerViewStock.png)
* If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.


#### View Low Inventory
![alt tag](/assets/BamazonManagerViewLow.png)
* If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.


#### Add to Inventory
![alt tag](/assets/BamazonManagerRestock.png)
* If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently on the menu.


#### Add New Product
![alt tag](/assets/BamazonManagerAdd.png)
* If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the menu.


#### Remove Item From Stock
![alt tag](/assets/BamazonManagerRemove.png)
* If a manager selects `Remove Item From Stock`, it should allow the manager to remove a product from the menu.



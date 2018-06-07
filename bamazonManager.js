// npms required
var mysql = require("mysql");
var inquirer = require("inquirer");

// Establishing the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,

    // Username and password
    user: "root",
    password: "",
    database: "bamazon_DB"
});

// Connection to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;

    // Run the start function after the connection is made to prompt the user
    console.log("connected as id " + connection.threadId);
    start();
});

// Function to execute logic
function start() {
    inquirer
        .prompt([{
            name: "main",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(function (response) {
            if (response.main === "View Products for Sale") {
                console.log("Here are the items for sale:");
                inventory();
            }
            else if (response.main === "View Low Inventory") {
                console.log("Here are the items we're low on:");
                // lowItems();
            }
            else if (response.main === "Add to Inventory") {
                console.log("We need to add more inventory");
                // orderInventory();
            }
            else if (response.main === "Add New Product") {
                console.log("What new item are we adding?");
                newItem();
            }
        });

    // Function to log all necessary data from database
    function inventory() {
        connection.query("SELECT * FROM items", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("Item " + res[i].id + " | " + res[i].product_name + " | " + "$" + res[i].price);
            }
            console.log("-----------------------------------");
        });
    }

    function lowItems() {
        connection.query("SELECT * FROM items WHERE ?", [
            {
                count_remaining: 6
            }
        ], function (err, res) {
            if (err) throw err;
            console.log(res);
        })
    }

    function newItem() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is this product called?",
                value: "input"
            },
            {
                type: "input",
                name: "department",
                message: "What department does this belong in?"
            },
            {
                type: "input",
                name: "price",
                message: "How much does this item cost?"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many do we have?"
            }
        ]).then(function (response) {
            createProduct(response.name, response.department, response.price, response.quantity);
        })
    };
    function createProduct(response) {
        console.log("We're adding " + name + " to our inventory!");

        var query = connection.query(
            "INSERT INTO items SET ?",
            {
                product_name: response.name,
                department: response.department,
                price: response.price,
                quantity: response.count_remaining
            },
            function (err, res) {
                console.log(res.affectedRows = " successfully added!")
            }
        )
    }
}
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

// Function which prompts the user to select item for purchase
function start() {
    queryAllItems();
    inquirer
        .prompt([{
            name: "itemSelect",
            type: "input",
            message: "Which item would you like to purchase?\n",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
        }]).then(function compare(answers) {

            // Setting variable for answers
            var itemNumber = parseInt(answers.itemSelect);
            var amount = parseInt(answers.quantity);

            // Query variable to pull correct info
            var query = connection.query(
                "SELECT id, product_name, price, count_remaining FROM items WHERE ?",
                {
                    id: itemNumber,
                }, function (err, res, fields) {
                    if (err) throw err;
                    if (res[0].count_remaining >= amount) {

                        var cost = res[0].price * amount
                        console.log("You made a purchase!");
                        console.log("Your cost was $" + cost + ".");
                        update(res[0], amount);
                    }
                    else {
                        console.log("Insufficient Quantity!");
                        inquirer
                            .prompt([{
                                name: "another",
                                type: "confirm",
                                message: "Would you like to make another transaction?"
                            }]).then(function (response) {
                                if (response.another === true) {
                                    start();
                                }
                                else {
                                    process.exit();
                                }
                            });
                    };
                });
        });
}

// Function to update quantity remaining
function update(res, amount) {
    var query = connection.query(
        "UPDATE items SET ? WHERE ?",
        [
            {
                count_remaining: res.count_remaining - amount
            },
            {
                id: res.id
            }
        ],
        function (err, res) {
          console.log(res.affectedRows)
        }
    )
}

// Function to log all necessary data from database
function queryAllItems() {
    connection.query("SELECT * FROM items", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item " + res[i].id + " | " + res[i].product_name + " | " + "$" + res[i].price);
        }
        console.log("-----------------------------------");
    });
}
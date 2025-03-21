const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
//   port: 3306, // Default MySQL port
  database: "discounts", // Your database name
  user: "root", // MySQL username
  password: "", // MySQL password (empty by default in XAMPP)
});

// Export the connection to use in other files
module.exports = connection;
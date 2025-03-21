var express = require("express");
const cors = require("cors");
const connection = require("./db_connection.js");
const PORT = 3000;
var app = express();
var things = require("./things.js");
var discounts = require("./discounts.js");

app.use(cors());
app.use(express.json());
app.get("/", function (req, res) {
  res.send("Welcomw to the application and port 3000");
});
app.post("/hello", function (req, res) {
  res.send("You just called the post method at '/hello'!\n");
});

app.use("/things", things);
app.use("/api/discount", discounts);

connection.connect((err) => {
  if (err) {
    console.error(" Database connection failed:", err);
    process.exit(1); // Stop the server if DB connection fails
  } else {
    console.log(" Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  }
});

// Handle process exit (CTRL+C) to close DB connection
process.on("SIGINT", () => {
  connection.end(() => {
    console.log("🔌 MySQL connection closed");
    process.exit(0);
  });
});

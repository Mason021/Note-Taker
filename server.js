// adding in modules to be used
const express = require("express");
const path = require("path");

// Creating the server app and setting PORT to be 3000
const app = express();
const PORT = process.env.PORT || 3000;

// Read the URL or JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// This is so the route JS files are included
require("./routes/routesOfAPI")(app);
require("./routes/routesOfHTML")(app);

// This is so the public folder gets used
app.use(express.static("public"));

// Add listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
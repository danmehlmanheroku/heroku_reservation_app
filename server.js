// Dependencies
// =============================================================

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(bodyParser.json());

// Reservations (DATA)

var reservation = {
    routeName: "reservationone",
    name: "",
    phoneNumber: "",
    email: "",
    uniqueID: ""

};

// =============================================================
var reservations = [];


// Waiting List (DATA)
// =============================================================
var waitingList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/tables", function (req, res) {
    console.log(req, res);
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Get all reservations and waiting list
app.get("/tables", function (req, res) {
    res.json(reservations);
});

app.get("/waitlist", function (req, res) {
    res.json(waitingList);
});

// Create New Reservations - takes in JSON input
app.post("/api/new", function (req, res) {

    console.log(req, res);
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newReservation = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    if (reservations.length < 5) {
        reservations.push(newReservation);
    } else {
        waitingList.push(newReservation);
    }
    res.json(newReservation);


});

// Starts the server to begin listening
// =============================================================

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});




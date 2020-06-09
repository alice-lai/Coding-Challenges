var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/cabs"
 *    PUT: insert new cab pinto table
 *    GET: search for nearest cab
 *    DELETE: destroy all cab records
 */
app.put("/api/cabs/:cab_id", function(req, res) {
});

app.get("/api/cabs", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.delete("/api/cabs", function(req, res) {
});

/*  "/api/cabs/:cab_id"
 *    GET: get full cab details by cab_id
 *    PUT: update lat/long of specific cab by cab_id
 *    DELETE: destroy cab record
 */

app.get("/api/cabs/:cab_id", function(req, res) {
});

app.put("/api/cabs/:cab_id", function(req, res) {
});

app.delete("/api/cabs/:cab_id", function(req, res) {
});

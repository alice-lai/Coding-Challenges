let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");
let ObjectID = mongodb.ObjectID;
let querystring = require('querystring');
let SKINCARE_COLLECTION = "skincare";
let app = express();
app.use(bodyParser.json());
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://heroku_sm1j269f:epifdaim6ou3oq1f2g4h5g6lb2@ds013926.mlab.com:13926/heroku_sm1j269f", function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    let server = app.listen(process.env.PORT || 8080, function () {
        let port = server.address().port;
        console.log("App now running on port", port);
    });
});

// CONTACTS API ROUTES BELOW
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

function between(x, min, max) {
    return x >= min && x <= max;
}

/*  /api/skincare
 *    POST: insert new skincare to table
 *    GET: search skincare by name
 *
 *    /api/shop
 *    GET: skincare by category, ordering from highest to lowest rating
 */

app.post("/api/skincare", (req, res) => {
    let newSkincare = req.body;
    // Name, Price, Link, Rating, Category
    if (!req.body.name || !req.body.price || !req.body.link || !req.body.rating || !req.body.category) {
        handleError(res, "Invalid user input", "Missing data", 400);
    } else if(req.body.rating !== parseInt(req.body.rating, 10) || !between(req.body.rating, 0, 100)){
        handleError(res, "Invalid user input", "rating must be an integer value in between 0 and 100", 400);
    } else if( typeof req.body.name !== 'string' || req.body.price !== parseInt(req.body.price, 10)
        || typeof req.body.link !== 'string' || typeof req.body.category !== 'string'){
        handleError(res, "Invalid user input", "Incorrect input type", 400);
    } else{
        db.collection(SKINCARE_COLLECTION).insertOne(newSkincare, (err, doc) => {
            if (err) {
                handleError(res, err.message, "Failed to input new skincare");
            } else {
                res.status(200).json(doc.ops[0]);
            }
        });
    }
});

app.get("/api/skincare/:id", (req, res) => {
    const id = req.params.id;

    db.collection(SKINCARE_COLLECTION).findOne({_id: new ObjectID(id)}, (err, doc) => {
        if (err) {
            handleError(res, err.message, "Failed to get skincare details for that id");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.get("/api/shop", (req, res) => {
    const category = req.query.category;

    db.collection(SKINCARE_COLLECTION).find({}).toArray((err, docs) => {
        if (err) {
            handleError(res, err.message, "Failed to get skincare by category");
        } else {
            let allSkincare = docs;
            let result = [];
            for (const skincare of allSkincare) {
                if(skincare.category == category) {
                    result.push(skincare);
                }
            }

            result.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
            res.status(200).json(result);
        }
    });
});
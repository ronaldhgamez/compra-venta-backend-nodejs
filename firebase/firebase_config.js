var admin = require("firebase-admin");

var serviceAccount = require("./compra-venta-db-firebase-adminsdk-gu66g-8ccd5e3468.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://compra-venta-db.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;
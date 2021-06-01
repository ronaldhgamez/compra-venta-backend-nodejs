/* Firebase conection */
const db = require('../../firebase/firebase_config');


const addProduct = async (req, res) => {
    try {
        /* Add the new product to the user. Generates id by itself */
        await db.collection('products').doc().set(req.body);
        return res.status(200).send({ "inserted": true });
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
};


/* Receives the username of the user and returns all his products */
async function getUserProducts(req, res) {
    try {
        const data = db.collection('products');

        // Create a query against the collection
        const queryRef = await data.where('user', '==', `${req.body.user}`).get();

        var products = [];
        queryRef.forEach(product => {
            var data = product.data();
            data.id = product.id;
            products.push(data);
        });
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
}


module.exports = {
    addProduct,
    getUserProducts
}
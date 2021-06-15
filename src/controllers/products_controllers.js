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

/* returns all products */
async function getAllProducts(req, res) {
    try {
        const data = db.collection('products');

        // Select all products except its own products
        const queryRef = await data.where('user', '!=', `${req.body.user}`).get();
        var products = [];
        queryRef.forEach(product => {
            var data = product.data();
            data.id = product.id;
            data.display = true;
            products.push(data);
        });
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
}

const getProductCollection = async (req, res) => {
    try {
        const reg = await db.collection('products').doc(req.body.id).get();
        const response = reg.data();
        return (response != undefined) ? res.status(200).send(response) : res.status(200).send({});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error); /* 500: internal error */
    }
}

async function deleteProduct(req, res) {
    try {
        await db.collection('products').doc(req.body.id).delete();
        return res.status(200).send({ "deleted": true });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "deleted": false }); /* 500: internal error */
    }
}

module.exports = {
    addProduct,
    getUserProducts,
    getAllProducts,
    deleteProduct,
    getProductCollection
}
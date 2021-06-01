/* Firebase conection */
const db = require('../../firebase/firebase_config');


const addUser = async (req, res) => {
    try {
        const users = db.collection('users');
        const snapshot = await users.where('user', '==', req.body.user).get();

        /* validates if the username already exists */
        if (snapshot.empty) {
            /* Add the new user. The  id of document is the same as the username */
            await users.doc(req.body.user).set(req.body);
            return res.status(200).send({ "inserted": true });
        }
        else { // matching id of document
            return res.status(200).send({ "inserted": false });
        }
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
};


const validateUser = async (req, res) => {
    try {
        const reg = await db.collection('users').doc(req.body.user).get();
        const response = reg.data();
        if (response != undefined) {
            /* validates password and username */
            (response.user == req.body.user && response.pass == req.body.pass) ?
                res.send({ "valid": true }) : res.status(200).send({ "valid": false });
        } else {
            res.status(200).send({ "valid": false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error); /* 500: internal error */
    }
}

/* Receives the username of the user and returns his data */
const getUserCollections = async (req, res) => {
    try {
        const reg = await db.collection('users').doc(req.body.user).get();
        const response = reg.data();
        return (response != undefined) ? res.status(200).send(response) : res.status(200).send({});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error); /* 500: internal error */
    }
}


/* updates the body information of a user */
async function updateUserData(req, res) {
    try {
        await db.collection('users').doc(req.body.user).set(req.body);
        return res.status(200).send({ "updated": true });
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
}


async function updateDocument(req, res) {
    try {
        const { collection, username, attribute, newValue } = req.body;

        const ref = db.collection(collection).doc(username);
        const response = await ref.update({ attribute: newValue }); // Set the new value of the document

        console.log('Update: ', response);
        return res.status(204).json(); /* 204: no response, everithing ok */
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
}

module.exports = {
    addUser,
    validateUser,
    getUserCollections,
    updateUserData
}
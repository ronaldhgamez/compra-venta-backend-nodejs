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
        const object = {
            "name": req.body.name,
            "lastname": req.body.lastname,
            "tel": req.body.tel,
            "exactAddress": req.body.exactAddress,
            "biography": req.body.biography
        };
        await db.collection('users').doc(req.body.user).update(object);
        return res.status(200).send({ "updated": true });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "updated": false }); /* 500: internal error */
    }
}

//----------------------------------WEB------------------------------

async function updatePassw(req, res) {
    try {
        await db.collection('users').doc(req.body.user).update({ pass: req.body.pass });
        return res.status(200).send({ "updated": true });
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
}

/* comments and ranking */
const addCalificationUser = async (req, res) => {
    try {
        const data = {
            "user_ranked": req.body.user_ranked,
            "user": req.body.user, /* who makes the comment */
            "ranking": req.body.ranking,
            "comment": req.body.comment
        };

        const snapshot = await db.collection('ranking').where('user_ranked', '==', req.body.user_ranked)
            .where('user', '==', req.body.user).get();

        if (!snapshot.empty) {
            var id_document = '';
            snapshot.forEach(doc => {
                id_document = doc.id;
            });
            /* modify data if already exist */
            await db.collection('ranking').doc(id_document).set(data);
            return res.status(200).send({ "ranked": true });
        } else {
            /* if no exist create a new doc */
            await db.collection('ranking').doc().set(data);
            return res.status(200).send({ "ranked": true });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ "ranked": false });
    }
}

const getUserRanking = async (req, res) => {
    try {
        const data = db.collection('ranking');
        const queryRef = await data.where('user', '==', `${req.body.user}`).get();

        var response = [];
        queryRef.forEach(h => {
            var data = h.data();
            data.id = h.id;
            response.push(data);
        });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send([]);
    }
}


module.exports = {
    addUser,
    validateUser,
    getUserCollections,
    updateUserData,
    updatePassw,
    /* ranking */
    addCalificationUser,
    getUserRanking
}
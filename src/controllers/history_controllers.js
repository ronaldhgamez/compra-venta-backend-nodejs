/* Firebase conection */
const db = require('../../firebase/firebase_config');

const addHistory = async (req, res) => {
    try {
        await db.collection('history').doc().set(req.body);
        return res.status(200).send({ "inserted": true });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "inserted": false });
    }
};


/* Receives the username of the user and returns his history */
async function getUserHistory(req, res) {
    try {
        const data = db.collection('history');
        const queryRef = await data.where('user', '==', `${req.body.user}`).get();

        var history = [];
        queryRef.forEach(h => {
            var data = h.data();
            data.id = h.id;
            history.push(data);
        });
        return res.status(200).send(history);
    } catch (error) {
        console.log(error);
        return res.status(500).send([]);
    }
}

module.exports = {
    addHistory,
    getUserHistory,
}
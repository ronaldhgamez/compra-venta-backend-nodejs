/* Firebase conection */
const db = require('../../firebase/firebase_config');

/* notifications */
const sendNotificationToUser = async (req, res) => {
    try {
        const data ={
            "user": req.body.user,
            "client": req.body.client,
            "id_product": req.body.id_product,
            "amount": req.body.amount
        };
        await db.collection('notifications').doc().set(data);
        return res.status(200).send({ "sended": true });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "sended": false });
    }
}

const getUserNotifications = async (req, res) => {
    try {
        const data = db.collection('notifications');
        const queryRef = await data.where('user', '==', `${req.body.user}`).get();

        var notifications = [];
        queryRef.forEach(h => {
            var data = h.data();
            data.id = h.id;
            notifications.push(data);
        });
        return res.status(200).send(notifications);
    } catch (error) {
        console.log(error);
        return res.status(500).send([]);
    }
}

module.exports = {
    sendNotificationToUser,
    getUserNotifications
};
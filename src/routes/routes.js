// Para definir las rutas o urls del servidor
const { Router } = require('express');
const router = Router();

const users_controllers = require('../controllers/users_controllers')
const products_controllers = require('../controllers/products_controllers')
const history_controllers = require('../controllers/history_controllers')
const notifications_controllers = require('../controllers/notifications_controllers')

///////////////////////////////////////////////////////////////////////
/////////////////////////// User routes ///////////////////////////////
///////////////////////////////////////////////////////////////////////
router.post('/api/addUser', users_controllers.addUser);
router.post('/api/updateUserData', users_controllers.updateUserData);
router.post('/api/getUserCollections', users_controllers.getUserCollections);
router.post('/api/validateUser', users_controllers.validateUser);
router.post('/api/updatePassw', users_controllers.updatePassw);
router.post('/api/addCalificationUser', users_controllers.addCalificationUser);
router.post('/api/getUserRanking', users_controllers.getUserRanking);

///////////////////////////////////////////////////////////////////////
//////////////////////// Products routes //////////////////////////////
///////////////////////////////////////////////////////////////////////
router.post('/api/addProduct', products_controllers.addProduct);
router.post('/api/getUserProducts', products_controllers.getUserProducts);
router.post('/api/getAllProducts', products_controllers.getAllProducts);
router.delete('/api/deleteProduct', products_controllers.deleteProduct);

///////////////////////////////////////////////////////////////////////
//////////////////////// History routes ///////////////////////////////
///////////////////////////////////////////////////////////////////////
router.post('/api/addHistory', history_controllers.addHistory);
router.post('/api/getUserHistory', history_controllers.getUserHistory);

///////////////////////////////////////////////////////////////////////
///////////////////// Notifications routes ////////////////////////////
///////////////////////////////////////////////////////////////////////
router.post('/api/sendNotificationToUser', notifications_controllers.sendNotificationToUser);
router.post('/api/getUserNotifications', notifications_controllers.getUserNotifications);


// Default route.
router.get('/', (req, res) => {
    res.send('server running successfully');
});

// Export routes.
module.exports = router;
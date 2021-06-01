// Para definir las rutas o urls del servidor
const { Router } = require('express');
const router = Router();

const users_controllers = require('../controllers/users_controllers')
const products_controllers = require('../controllers/products_controllers')

///////////////////////////////////////////////////////////////////////
/////////////////////////// User routes ///////////////////////////////
///////////////////////////////////////////////////////////////////////

router.post('/api/addUser', users_controllers.addUser);
router.post('/api/updateUserData', users_controllers.updateUserData);
router.post('/api/getUserCollections', users_controllers.getUserCollections);
router.post('/api/validateUser', users_controllers.validateUser);

///////////////////////////////////////////////////////////////////////
//////////////////////// Products routes //////////////////////////////
///////////////////////////////////////////////////////////////////////
router.post('/api/addProduct', products_controllers.addProduct);
router.post('/api/getUserProducts', products_controllers.getUserProducts);


/* 
router.post('/api/simpleQuery', users_controllers.simpleQuery);
router.post('/api/updateUser', users_controllers.updateDocument);
router.post('/api/updateDocument', users_controllers.updateDocument); 
*/

// Default route.
router.get('/', (req, res) => {
    res.send('server running successfully');
});

// Export routes.
module.exports = router;
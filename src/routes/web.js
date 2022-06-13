const express = require('express')
const userController = require('../controllers/UserController');
const placeController = require('../controllers/PlaceController');
const tourController = require('../controllers/TourController');

const router = express.Router();
let initWebRoutes = (app)=>{

    router.get('/home',userController.getHomePage);

    router.post('/api/create-new-user',userController.createNewUser);

    router.get('/api/search',userController.searchUserByName);

    router.get('/api/get-all-users',userController.getAllUsers);
    router.post('/api/log-in',userController.userLogin);
    router.post('/api/log-out',userController.userLogout);

    router.post('/api/create-new-place',placeController.createNewPlace);

    router.post('/api/create-new-tour',tourController.createNewTour);
    router.get('/api/get-tours-by-limit',tourController.getToursByLimit)

    

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.use('/',router);


}

module.exports = initWebRoutes;
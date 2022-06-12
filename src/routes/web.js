const express = require('express')
const userController = require('../controllers/UserController');

const router = express.Router();
let initWebRoutes = (app)=>{

    router.get('/home',userController.getHomePage);

    router.post('/api/create-new-user',userController.createNewUser);

    router.get('/api/search',userController.searchUserByName);

    router.get('/api/get-all-users',userController.getAllUsers);
    router.post('/api/log-in',userController.userLogin);
    router.post('/api/log-out',userController.userLogout)

    

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.use('/',router);


}

module.exports = initWebRoutes;
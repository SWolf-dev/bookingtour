const express = require('express')
const userController = require('../controllers/UserController');

const router = express.Router();
let initWebRoutes = (app)=>{

    router.get('/home',userController.getHomePage);

    router.post('/api/create-new-user',userController.createNewUser);

    router.get('/api/search',userController.searchUserByName);

    router.get('/api/get-all-users',userController.getAllUsers);

    

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.use('/',router);


}

module.exports = initWebRoutes;
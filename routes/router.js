const express = require('express');
const router = express.Router();

const { validateRegister, isLoggedIn } = require('../middleware/users.js');
const controllerUser = require('../controllers/user')
//const controllerPatient = require('../controllers/patient')

// http://localhost:3000/api/sign-up
router.post('/user', validateRegister, controllerUser.register)
router.put('/user', validateRegister, controllerUser.update)
router.delete('/user/:userDocument', controllerUser.delete)
router.get('/user', controllerUser.get)
router.get('/user/:userDocument', controllerUser.getByUserDocument)

// http://localhost:3000/api/login
router.post('/auth/login', controllerUser.login)

// http://localhost:3000/api/secret-route
router.get('/secret-route', isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send("This is secret content...")
})
//router.get('/patient', controllerPatient.register)
//router.put('/patient', controllerPatient.update)

module.exports = router;



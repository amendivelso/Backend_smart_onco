const express = require('express');
const router = express.Router();

const { validateRegister, isLoggedIn } = require('../middleware/users.js');
const controllerUser = require('../controllers/user')
const controllerPacient = require('../controllers/patient')

// http://localhost:5000/api/user
router.post('/user', validateRegister, controllerUser.register)
router.put('/user', validateRegister, controllerUser.update)
router.delete('/user/:userDocument', controllerUser.delete)
router.get('/user', controllerUser.get)
router.get('/user/:userDocument', controllerUser.getByUserDocument)

// http://localhost:5000/api/login
router.post('/login', controllerUser.login)

// http://localhost:5000/api/secret-route
router.get('/secret-route', isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send("This is secret content...")
})
// http://localhost:5000/api/patient
router.post('/patient', controllerPacient.createPatient)
router.delete('/patient/:patientDocument', controllerPacient.deletePatient)
router.get('/patient', controllerPacient.getPatient)
router.get('/patient/:patientDocument', controllerPacient.getBypatientDocument)
router.put('/patient/:patientDocument',controllerPacient.updatePatient)

// http://localhost:5000/appointment
//router.post('/appointment', appointmentController.createPatient)



module.exports = router;



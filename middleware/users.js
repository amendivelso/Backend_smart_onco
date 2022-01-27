
const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        // username min length 3
        if(!req.body.username || req.body.username.length < 3){
            return res.status(400).send({
                message: "Por favor ingrese un username de mínimo tres caracteres."
            });
        }
        // password min 6 chars
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                message: "Por favor ingrese un password de mínimo seis caracteres."
            });
        }
        // password (repeat) must match
        if(!req.body.password_repeat || req.body.password != req.body.password_repeat){
            return res.status(400).send({
                message: "Ambas contraseñas deben ser iguales."
            });
        }
        next();
    },
    isLoggedIn: (req, res, next) => {
        if(!req.headers.authorization){
            return res.status(400).send({
                message: "Your session is not valid!"
            })
        }
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRETKEY);
            req.userData = decoded;
            next();
        } catch (err) {
            throw err;
            return res.status(400).send({
                message: "Your session is not valid!"
            })
        }
    },

};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');
const uuid = require('uuid');





const userController = {
    register: async (req, res, next) => {
        db.query(`SELECT idUser FROM user WHERE LOWER(username) = LOWER(${req.body.username});`, 
        (err, result) => {
            if(result && result.length){
                // error
                return res.status(400).send({
                    message: 'El usuario ya existe en el sistema'
                })
            }else{
                // username is not in use
                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    if(err){
                        throw err;
                        return res.status(500).send({
                            message: err
                        }) ;
                    }else{
                        db.query(`INSERT INTO user (idUser, userDocument, username, name, UserLastname, UserEntity, UserEmail, password, profesionalRegister) 
                        VALUES ('${uuid.v4()}', ${db.escape(req.body.UserDocument)}, ${db.escape(req.body.username)}, ${db.escape(req.body.name)}, ${db.escape(req.body.UserLastname)},
                        ${db.escape(req.body.UserEntity)}, ${db.escape(req.body.UserEmail)},'${hash}', ${db.escape(req.body.profesionalRegister)});`,
                        (err, result) => {
                            if(err){
                                throw err;
                                return res.status(400).send({
                                    message: err
                                });
                            }
                            return res.status(201).send({
                                message: "Usuario registrado con éxito..."
                            })
                        });
                    }
                })
            }
        })

    }, 

    login : async (req, res, next) => {
        db.query(
            `SELECT * FROM usuarios WHERE username = ${db.escape(req.body.username)};`,
            (err, result) => {
                if(err){
                    throw err;
                    return res.status(400).send({
                        message: err
                    });
                }
                if(!result.length){
                    return res.status(400).send({
                        message: 'Username o password incorrectos!'
                    });
                }
                bcrypt.compare(req.body.password, result[0]['password'], 
                (bErr, bResult) =>{
                    if(bErr){
                        throw bErr;
                        return res.status(400).send({
                            message: 'Username o password incorrectos!'
                        });
                    }
                    if(bResult){ // password Match
                        const token = jwt.sign({
                            username: result[0].username,
                            userId: result[0].id,
                        }, process.env.SECRETKEY,
                        { expiresIn: "1d"}
                        );
                        db.query(`UPDATE usuarios SET last_login = now() WHERE id = '${result[0].id}';`);
                        return res.status(200).send({
                            message: 'Logged in!',
                            token,
                            user: result[0]
                        })
                    }
                    return res.status(401).send({
                        message: 'Username o password son incorrectos'
                    })
                }
               );
            }
        )
    }
} 

module.exports = userController;
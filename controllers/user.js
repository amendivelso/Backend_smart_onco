const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const db = require('../lib/db.js');
const uuid = require('uuid');





const userController = {
    register: async (req, res, next) => {// Create user
        db.query(`SELECT * FROM user WHERE LOWER(Username) = LOWER(${db.escape(req.body.Username)});`, 
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
                            message: err.code
                        }) ;
                    }else{
                        db.query(`INSERT INTO user (idUser, UserDocument,TypeDocument,Username, name, UserLastName, UserEntity, UserEmail, password,profesionalRegister, Rol_idRol,UserActive) 
                        VALUES ('${uuid.v4()}', ${db.escape(req.body.UserDocument)},${db.escape(req.body.TypeDocument)}, ${db.escape(req.body.Username)}, ${db.escape(req.body.name)}, ${db.escape(req.body.UserLastName)},
                        ${db.escape(req.body.UserEntity)}, ${db.escape(req.body.UserEmail)},'${hash}', 
                        ${db.escape(req.body.profesionalRegister)}, ${db.escape(req.body.Rol_idRol)}, ${db.escape(req.body.UserActive)});`,
                        (err, result) => {
                            if(err){
                                if (err.code === "ER_DUP_ENTRY"){
                                    return res.status(400).send({
                                        message: "Documento ya esta registrado"
                                    });
                                }
                                return res.status(400).send({
                                    message: err
                                });
                            }
                            return res.status(201).send({
                                message: "Usuario registrado con ??xito..."
                            })
                            
                        });
                    }
                })
            }
        })

    }, 

    login : async (req, res, next) => {
        db.query(
            `SELECT * FROM user WHERE Username = ${db.escape(req.body.Username)};`,
            (err, result) => {
                if(err){
                    throw err;
                    return res.status(400).send({
                        message: err
                    });
                }
                if(!result.length){
                    Console.log(user)
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
                            Username: result[0].Username,
                            userId: result[0].id,
                        }, process.env.SECRETKEY,
                        { expiresIn: "1d"}
                        );
                        //db.query(`UPDATE user SET last_login = now() WHERE id = '${result[0].id}';`);
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
    ,delete: async( req, res, next)=>{
        db.query(`SELECT * FROM user WHERE userDocument = ${db.escape(req.params.userDocument)};`,
            (err, result) => {
                if(err){
                    throw err;
                    return res.status(400).send({
                        message: err
                    });
                }
                if(!result.length){
                    return res.status(400).send({
                        message: "Usuario no existe en el sistema."
                    });
                }
                db.query(`DELETE FROM user WHERE idUser = '${result[0].idUser}';`,
                (err, result) => {
                    if(err){
                        throw err;
                        return res.status(400).send({
                            message: err
                        });
                    }
                    return res.status(200).send({
                        message: "Usuario eliminado con ??xito"
                    });
                });
                
            }
        )
    }, update : async ( req, res, next)=>{
        db.query(`SELECT * FROM user WHERE UserDocument = ${db.escape(req.body.UserDocument)};`,
        (err, result) =>{
            if(err){
                throw err;
                return res.status(400).send({
                    message: err
                });
            }
            if(!result.length){
                return res.status(400).send({
                    message: "Usuario no existe en el sistema."
                });
            }
            db.query(`UPDATE user SET 
             name=${db.escape(req.body.name)},
             UserEntity =${db.escape(req.body.TypeDocument)}, 
             UserLastName =${db.escape(req.body.UserLastName)},
             UserEntity =${db.escape(req.body.UserEntity)}, 
             UserEmail=${db.escape(req.body.UserEmail)}, 
             password= ${db.escape(req.body.password)},
             profesionalRegister=${db.escape(req.body.profesionalRegister)},
             Rol_idRol =${db.escape(req.body.Rol_idRol)},
             UserActive = ${db.escape(req.body.UserActive)} WHERE idUser = '${result[0].idUser}';`,
            (err, result) => {
                if(err){
                    throw err;
                    return res.status(400).send({
                        message: err
                    });
                }
                return res.status(201).send({
                    message: "Usuario modificado con ??xito..."
                })
                
            });
        })
    
       
    },get: async( req, res, next)=>{
        db.query(`SELECT * FROM user ;`,
            (err, result) => {
                if(err){
                    throw err;
                    return res.status(400).send({
                        message: err
                    });
                }else if(!result.length){
                    return res.status(400).send({
                        message: "no hay datos en el sistema."
                    });
                }else{
                    return res.status(200).send({
                        users: result
                    });
                }
                
            }
        )
    },getByUserDocument: async( req, res, next)=>{
        db.query(`SELECT * FROM user WHERE userDocument = ${db.escape(req.params.userDocument)};`,
        (err, result) => {
            if(err){
                throw err;
                return res.status(400).send({
                    message: err
                });
            }
            if(!result.length){
                return res.status(400).send({
                    message: "Usuario no existe en el sistema."
                });
            }else{
                return res.status(200).send({
                    users: result
                });
            }
      } )
    }  
} 



module.exports = userController;
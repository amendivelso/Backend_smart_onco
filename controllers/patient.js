const express = require('express');
const router = express.Router();
const db = require('../lib/db.js');
const uuid = require('uuid');

const patientController = { 
    
    createPatient: async (req, res, next) => {
        db.query(`SELECT * FROM patient WHERE idPatient(${db.escape(req.body.idPatient)});`, 
        (err, result) => {
            if(result && result.length){
                // error
                return res.status(400).send({
                    message: 'El usuario ya existe en el sistema'
                })
            }else{ 
                db.query(`INSERT INTO patient (idPatient, patientDocument,firstName,secondName, firstLastName, secondLastName,sex, age, birthday, activity, email1, email2, address, zone, nacionality, active, patientNeighborhood, patientTypeId, patientCity, patientDepartment, patientPhone1,patientPhone2,EPSName,regimenEPS,tutela,familyTypeID,familyID,familyFirstName,familySecondName,familyFirstLastname,familySecondLastname,familyAddress,familyNeighborhood,familyCity,familyDepartment,familyEmail1,familyEmail2,familyPhone1,familyPhone2) VALUES 
                ('${uuid.v4()}', ${db.escape(req.body.patientDocument)}, ${db.escape(req.body.firstName)}, 
                ${db.escape(req.body.secondName)}, ${db.escape(req.body.firstLastName)}, ${db.escape(req.body.secondLastName)},
                ${db.escape(req.body.sex)}, ${db.escape(req.body.age)}, ${db.escape(req.body.birthday)},
                ${db.escape(req.body.activity)},${db.escape(req.body.email1)}, ${db.escape(req.body.email2)}, 
                ${db.escape(req.body.address)}, ${db.escape(req.body.zone)}, ${db.escape(req.body.nacionality)}, 
                ${db.escape(req.body.active)}, ${db.escape(req.body.patientNeighborhood)}, ${db.escape(req.body.patientTypeId)},     
                ${db.escape(req.body.patientCity)}, ${db.escape(req.body.patientDepartment)}, ${db.escape(req.body.patientPhone1)},
                ${db.escape(req.body.patientPhone2)}, ${db.escape(req.body.EPSName)}, ${db.escape(req.body.regimenEPS)},
                ${db.escape(req.body.tutela)}, ${db.escape(req.body.familyTypeID)}, ${db.escape(req.body.familyID)},         
                ${db.escape(req.body.familyFirstName)}, ${db.escape(req.body.familySecondname)}, ${db.escape(req.body.familyFirstLastname)},  
                ${db.escape(req.body.familySecondLastname)}, ${db.escape(req.body.familyAddress)}, ${db.escape(req.body.familyNeighborhood)},   
                ${db.escape(req.body.familyCity)}, ${db.escape(req.body.familyDepartment)}, ${db.escape(req.body.familyEmail1)},         
                ${db.escape(req.body.familyEmail2)}, ${db.escape(req.body.familyPhone1)}, ${db.escape(req.body.familyPhone2)})`,
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
                        message: "Usuario registrado con éxito..."
                    })
                    
                });
                    
            }
        })

    }
    ,deletePatient: async( req, res, next)=>{
        db.query(`SELECT * FROM patient WHERE patientDocument = ${db.escape(req.params.patientDocument)};`,
            (err, result) => {
                if(err){
                    throw err;
                    return res.status(400).send({
                        message: err
                    });
                }
                if(!result.length){
                    return res.status(400).send({
                        message: "Paciente no existe en el sistema."
                    });
                }
                db.query(`DELETE FROM patient WHERE idPatient = '${result[0].idPatient}';`,
                (err, result) => {
                    if(err){
                        throw err;
                        return res.status(400).send({
                            message: err
                        });
                    }
                    return res.status(200).send({
                        message: "Paciente eliminado con éxito"
                    });
                });
                
            }
        )
    },getPatient: async( req, res, next)=>{
        db.query(`SELECT * FROM patient ;`,
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
    },getBypatientDocument: async( req, res, next)=>{
        db.query(`SELECT * FROM patient WHERE patientDocument = ${db.escape(req.params.patientDocument)};`,
        (err, result) => {
            if(err){
                throw err;
                return res.status(400).send({
                    message: err
                });
            }
            if(!result.length){
                return res.status(400).send({
                    message: "paciente no existe en el sistema."
                });
            }else{
                return res.status(200).send({
                    users: result
                });
            }
      } )
    }, updatePatient : async ( req, res, next)=>{
        db.query(`SELECT * FROM patient WHERE patientDocument = ${db.escape(req.params.patientDocument)};`,
        (err, result) =>{
            if(err){
                throw err;
                return res.status(400).send({
                    message: err
                });
            }
            if(!result.length){
                return res.status(400).send({
                    message: "Paciente no existe en el sistema."
                });
            }
            db.query(`UPDATE patient SET 
            firstName =${db.escape(req.body.firstName)},
            secondName =${db.escape(req.body.secondName)}, 
            firstLastName=${db.escape(req.body.firstLastName)}, 
            secondLastName= ${db.escape(req.body.secondLastName)},
            sex=${db.escape(req.body.sex)},
            age =${db.escape(req.body.age)},
            birthday = ${db.escape(req.body.birthday)},
            activity=${db.escape(req.body.activity)},
            email1 =${db.escape(req.body.email1)},
            email2 =${db.escape(req.body.email2)}, 
            address=${db.escape(req.body.address)}, 
            zone= ${db.escape(req.body.zone)},
            nacionality=${db.escape(req.body.nacionality)},
            active =${db.escape(req.body.active)},
            patientNeighborhood = ${db.escape(req.body.patientNeighborhood)},
            patientTypeId=${db.escape(req.body.patientTypeId)},
            patientCity =${db.escape(req.body.patientCity)},
            patientDepartment =${db.escape(req.body.patientDepartment)}, 
            patientPhone1=${db.escape(req.body.patientPhone1)}, 
            patientPhone2= ${db.escape(req.body.patientPhone2)},
            EPSName=${db.escape(req.body.EPSName)},
            regimenEPS =${db.escape(req.body.regimenEPS)},
            tutela = ${db.escape(req.body.tutela)},
            familyID=${db.escape(req.body.familyID)},
            familyTypeID =${db.escape(req.body.familyTypeID)},
            familyFirstName =${db.escape(req.body.familyFirstName)}, 
            familySecondName=${db.escape(req.body.familySecondName)}, 
            familyFirstLastname= ${db.escape(req.body.familyFirstLastname)},
            familySecondLastname=${db.escape(req.body.familySecondLastname)},
            familyAddress =${db.escape(req.body.familyAddress)}, 
            familyNeighborhood =${db.escape(req.body.familyNeighborhood)}, 
            familyCity=${db.escape(req.body.familyCity)}, 
            familyDepartment= ${db.escape(req.body.familyDepartment)},
            familyEmail1=${db.escape(req.body.familyEmail1)},
            familyEmail2 =${db.escape(req.body.familyEmail2)},
            familyPhone1 = ${db.escape(req.body.familyPhone1)},
            familyPhone2 = ${db.escape(req.body.familyPhone2)} WHERE idPatient = '${result[0].idPatient}';`,
            (err, result) => {
                if(err){
                    throw err;
                    return res.status(400).send({
                        message: err
                    });
                }
                return res.status(201).send({
                    message: "Paciente modificado con éxito..."
                })
                
            });
        })
    
       
    }
}
module.exports =  patientController;
    
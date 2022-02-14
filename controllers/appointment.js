const express = require('express');
const router = express.Router();
const db = require('../lib/db.js');

const appointmentController = { 
    
    createAppointment: async (req, res, next) => {
        db.query(`SELECT * FROM patient WHERE idPatient(${db.escape(req.body.idPatient)});`, 
        (err, result) => {
            if(result && result.length){
                // error
                return res.status(400).send({
                    message: 'Historia ya existe en el sistema'
                })
            }else{ 
                db.query(`INSERT INTO idappointment (idappointment, date, place, address, consultingRoom, recomendations,patient_idPatient,User_idUser) VALUES 
                ('${uuid.v4()}', 
                ${db.escape(req.body.date)},  
                ${db.escape(req.body.place)},
                ${db.escape(req.body.address)}, 
                ${db.escape(req.body.consultingRoom)}, 
                ${db.escape(req.body.address)}, 
                ${db.escape(req.body.recomendations)},     
                ${db.escape(req.body.patient_idPatient)}, 
                ${db.escape(req.body.User_idUser)}`,
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
                        message: "cita registrada con éxito..."
                    })
                    
                });
                    
            }
        })

    }
    ,deleteAppointment: async( req, res, next)=>{
        db.query(`SELECT * FROM   WHERE idappointment = ${db.escape(req.params.idappointment)};`,
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
                db.query(`DELETE FROM idappointment WHERE idappointment = '${result[0].idappointment}';`,
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
    },getAppointment: async( req, res, next)=>{
        db.query(`SELECT * FROM appointment ;`,
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
    },getByAppointmentDocument: async( req, res, next)=>{
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
            tutela = ${db.escape(req.body.tutela)}
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
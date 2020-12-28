const {check,validatorResult,body} = require('express-validator');
const bcrypt = require('bcrypt');


const db = require('../database/models');

module.exports = [
    check('emailLogin')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .isLength(1)
    .withMessage('Debes ingresar una contraseña'),

    body('emailLogin')
    .custom(function(value){
       return db.Users.findOne({
           where: {
               email:value
           }
       })
       .then(user => {
           if(!user){
               return Promise.reject("Email no registrado");
           }
       })
    }),
    

    body('pass')
    .custom((value,{req})=>{
        return db.Users.findOne({
            where:{
                email:req.body.emailLogin
            }
        })
        .then(user => {
            
            if(!bcrypt.compareSync(value,user.dataValues.password)){
               
                return Promise.reject()
            }
        })
        .catch(() => {
            return Promise.reject("Contraseña incorrecta")
        })
    })

]
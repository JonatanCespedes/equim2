const dbUsers = require('../data/dbUsuarios');

const db = require('../database/models');

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const userController = {
    registro: function (req,res){
        res.render('registro',{
            title: 'e-Quim - Registro'  
        })
    },
    crear:function(req,res){
        let errors = validationResult(req);

        if(errors.isEmpty()){
        db.Users.create({
            email:req.body.email.trim(),
            password:bcrypt.hashSync(req.body.password.trim(),10),
            nombre:req.body.nombre.trim(),
            apellido:req.body.apellido.trim(),
            direccion:req.body.direccion.trim(),
            ciudad:req.body.ciudad.trim(),
            provincia:req.body.provincia.trim(),
            
            
        })
        .then(results=>{
            console.log(results),
            res.redirect('/users/registro')
        }) 
        .catch(error=>{
            console.log(error);
            res.redirect('/users/registro')
           })
        }else{
            console.log(errors.mapped())
            res.render('registro', {
                title: 'Error',
                errors : errors.mapped(),
                oldRegister: req.body
            })
        }  
    },
    login:function(req,res){
        res.render('registro',{
            title:"Ingresá a tu cuenta",
            css: "style.css",
            usuario:req.session.usuario
        })
    },
    processLogin:function(req,res){
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
           
            db.Users.findOne({
                where:{
                    email:req.body.emailLogin
                }
            })
            .then(user => {
                req.session.user = {
                    id: user.id,
                    nick: user.nombre,
                    email: user.email,
                    rol:user.rol,
                }
                if(req.body.recordar){
                    res.cookie('userEquim',req.session.user,{maxAge:1000*60*2})
                }
                res.locals.user = req.session.user;

                return res.redirect('/')
            })
        }else{
            res.render('registro',{
                title:"Ingresá a tu cuenta",
                css: "index.css",
                errors:errors.mapped(),
                old:req.body
            })
        }
    },
    profile:function(req,res){
        
        if(req.session.user){
            db.Users.findByPk(req.session.user.id)
            .then(user => {
                console.log(user)
                res.render('userProfile', {
                    title: "Perfil de usuario",
                    css:"profile.css",
                    usuario:user,
                })
            })
        }else{
            res.redirect('/')
        }
    },
    updateProfile: function(req,res){
        
        db.Users.update(
            
            {
              direccion:req.body.direccion.trim(),
                ciudad:req.body.ciudad.trim(),
                provincia:req.body.provincia.trim(), 
            },
            {
                where:{
                    id:req.params.id
                }
            }
        )
        .then(result => {
             res.redirect('/users/profile')
        })
        .catch(err => {
            console.log(err)
        })
    },
    logout:function(req,res){
        req.session.destroy();
        if(req.cookies.userEquim){
            res.cookie('userEquim','',{maxAge:-1})
        }
        return res.redirect('/')

    },




}

module.exports= userController;
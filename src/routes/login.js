const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');

// sessions - consulta la session y el numero de visitas
router.get('/session/:session_id', async (req, res) => {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    req.session.visitas = req.session.visitas ? ++req.session.visitas :1;
    console.log(req.session.visitas);
    const visitas = req.session.visitas
    try {
        const session = await db.User.findAll();
         res.json({
            session,
            visitas
        });
    } catch (error) {
        res.send(error.message);
    }
});

// Login - Genera el token de autorizacion
router.post('/login', async (req, res) => {
    

    if (!req.body.username || !req.body.password) {
        return res.json({
            message: 'Usuario y Contraseña son requeridos'
        });
       
    }
    if (req.body.password.length<8 || req.body.password.length>32) {
        return res.json({
            message: 'Contraseña debe ser mayor que 8 y menor que 32 caracteres'
        });
    }
     else {

        const user = {
            username : req.body.username,
            password : req.body.password,
        }
            jwt.sign({ user}, 'secret', { expiresIn: '32s' }, (err, token) => {
                return res.json({
                    status: 'ok',
                    user: {
                        token
                    }
                });
            });
    }
});




module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../database/db');

// List users
router.get('/list', verifyToken,  async (req,res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        res.send(err);
    }
});

// Query Users for ID
router.get('/:id', verifyToken,async (req, res) => {

    try {
        const { id } = req.params;
        const result = await db.User.findByPk(id);
        res.json(result);
    } catch (error) {
        res.send(error.message);
    }
});

// Create User
router.post('/create', verifyToken, async (req, res) => {
    console.log('Body: ', req.body);
    const username = req.body.username;
    const password = req.body.password;

    if (username === undefined || password === undefined ) {
        return res.json({
            message: "Bad Request. Please fill all field."
        });
    }

    try {
        await db.User.create({
            username,
            password
        });
        res.status(200).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ message: 'User not created successfully' });
    }
});


// Delete User
router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await db.User.destroy({
            where: { 
                id: id
            }
            });
        return res.json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        return res.send(error.message);
    }
});

// Vericacion del token y separacion de Bearer
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.json({
            status: 'Unauthorized',
        })
    }
}
module.exports = router;
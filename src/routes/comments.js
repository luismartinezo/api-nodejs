const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Lista de comentarios
router.get('/list', verifyToken, async (req, res) => {
    try {
        const comment = await db.User.findAll();
        res.json(comment);
    } catch (err) {
        res.send(err);
    }
});

// Query Comments for ID
router.get('/:id', verifyToken, async (req, res) => {

    try {
        const { id } = req.params;
        const result = await db.User.findByPk(id);
        res.json(result);
    } catch (error) {
        res.send(error.message);
    }
});




// Create Comment
router.post('/create', verifyToken, async (req, res) => {
    console.log('Body: ', req.body);
    const issue = req.body.issue;
    const website = req.body.website;
    const text = req.body.text;
    const email = req.body.email;
    const user_id = req.body.user_id;

    if (issue === undefined || website === undefined || text === undefined || email === undefined || user_id === undefined) {
        return res.json({
            message: "Bad Request. Please fill all field."
        });
    }

    try {
        await db.Comment.create({
            issue,
            website,
            text,
            email,
            user_id
        });
        res.status(200).send({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Comment not created successfully' });
    }
});

router.post('/prueba', verifyToken, async (req, res) => {
    console.log('Body: ', req.body);
    const title = req.body.title;
    const description = req.body.description;
    const score = req.body.score;
    const direction = req.body.direction;

    if (title === undefined || description === undefined || score === undefined || direction === undefined) {
        return res.json({
            message: "Bad Request. Please fill all field."
        });
    }

    try {
        await db.Prueba.create({
            title,
            description,
            score,
            direction
        });
        res.status(200).send({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Comment not created successfully' });
    }
});


// Delete Comment
router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await db.Comment.destroy({
        where: { 
            id: id
        }
        });
        return res.json({
            message: 'Comment deleted successfully'
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
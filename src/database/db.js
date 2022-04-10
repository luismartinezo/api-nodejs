const { Sequelize } = require('sequelize');

const CommentModel = require('../models/comment.model');
const UserModel= require('../models/user.model');
const PruebaModel= require('../models/prueba.model');

const sequelize = new Sequelize('commentary','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

const Comment = CommentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Prueba = PruebaModel(sequelize, Sequelize);

sequelize.sync({force: false}).then(() => {
    console.log('Servidor Arrancado');
})

module.exports ={
    Comment,
    User,
    Prueba
}
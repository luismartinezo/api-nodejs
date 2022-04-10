module.exports = (sequelize,type) => {
    return sequelize.define('prueba',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        description: type.STRING,
        score: type.INTEGER,
        direction: type.STRING
    })
}
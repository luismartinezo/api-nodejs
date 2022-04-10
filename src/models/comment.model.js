
module.exports = (sequelize,type) => {
    return sequelize.define('comment',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        issue: type.STRING,
        website: type.STRING,
        text: type.STRING,
        email: type.STRING,
        user_id: type.INTEGER
    })
}

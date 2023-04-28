const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const ToDo = sequelize.define('ToDo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    isDone: {type: DataTypes.BOOLEAN}
})

module.exports = {ToDo}

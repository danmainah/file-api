// Create Sequelize instance
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
  
  // Define Blacklist model
class Blacklist extends Model {
    
}

Blacklist.init({
    type: DataTypes.STRING,
    allowNull: false
}, { 
  sequelize, 
  modelName: 'blacklist'
});
  
  // Sync models with database
  sequelize.sync();
  
  module.exports = Blacklist;
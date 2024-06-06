// Create Sequelize instance
const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
  
  // Define User model
class User extends Model {
    static async findByUsername(username) {
      const user = await this.findOne({ where: { username } });
      return user ? this.build(user.dataValues) : null;
    }

    async isValidPassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

User.init({
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING
}, { 
  sequelize, 
  modelName: 'user',
  hooks: {
      beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
      }
  }
});
  
  // Sync models with database
  sequelize.sync();
  
  module.exports = User;
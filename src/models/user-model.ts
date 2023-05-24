import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import { sequelize } from '../database/database'; // Importa la instancia de Sequelize

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;

  // Método para comparar la contraseña ingresada con la contraseña encriptada
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

// Antes de crear un nuevo usuario, se encripta la contraseña
User.addHook('beforeCreate', async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

export default User;
import sequelize from "../database";
import { DataTypes } from "sequelize";
const { UUID, STRING } = DataTypes;

const User = sequelize.define("user", {
  id: { type: UUID, primaryKey: true },
  email: { type: STRING, unique: true },
  password: { type: STRING },
  first_name: { type: STRING, allowNull: true },
  second_name: { type: STRING, allowNull: true },
  role: { type: STRING, defaultValue: "user" }
});

export default User;

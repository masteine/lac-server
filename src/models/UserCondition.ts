import sequelize from "../database";
import { DataTypes } from "sequelize";

const { INTEGER, STRING } = DataTypes;

const UserCondition = sequelize.define("userCondition", {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  weight: { type: INTEGER, allowNull: true },
  height: { type: INTEGER, allowNull: true },
  age: { type: INTEGER, allowNull: true },
  sex: { type: STRING, allowNull: true }
});

export default UserCondition;

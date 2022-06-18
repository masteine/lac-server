import sequelize from "../database";
import { DataTypes } from "sequelize";

const { INTEGER, STRING, DATE } = DataTypes;

const Training = sequelize.define("training", {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: STRING, allowNull: true },
  date: { type: DATE, allowNull: false }
});

export default Training;

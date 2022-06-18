import sequelize from "../database";
import { DataTypes } from "sequelize";

const { STRING, INTEGER } = DataTypes;

const Exercise = sequelize.define("exercise", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  order: { type: INTEGER },
  name: { type: STRING },
  type: { type: STRING },
  load: { type: STRING, allowNull: true }
});

export default Exercise;

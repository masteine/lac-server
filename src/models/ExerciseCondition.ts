import sequelize from "../database";
import { DataTypes } from "sequelize";

const { INTEGER } = DataTypes;

const ExerciseCondition = sequelize.define("exerciseCondition", {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  order: { type: INTEGER },
  repeat: { type: INTEGER },
  set: { type: INTEGER },
  weight: { type: INTEGER }
});

export default ExerciseCondition;

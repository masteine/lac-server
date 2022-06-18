import User from "./User";
import Role from "./Role";
import Training from "./Training";
import UserCondition from "./UserCondition";
import Exercise from "./Exercise";
import ExerciseCondition from "./ExerciseCondition";

User.hasOne(UserCondition);
UserCondition.belongsTo(User);

User.hasMany(Training);
Training.belongsTo(User);

Training.hasMany(Exercise);
Exercise.belongsTo(Training);

Exercise.hasMany(ExerciseCondition);
ExerciseCondition.belongsTo(Exercise);

export default { User, Role, Training, UserCondition, Exercise };

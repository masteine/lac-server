import ExerciseCondition from "../../models/ExerciseCondition";
import parseResDataValues from "../../utils/parseResDataValues";
import Exercise from "../../models/Exercise";

/**
 * @Model ExerciseCondition - order, weight, repeat, set, exerciseId
 *
 */

class ExerciseConditionService {
  async createExerciseCondition(exercises, exerciseWithConditions) {
    const parsedExercise: any = await parseResDataValues(exercises);
    let exConditionsWithId = [];
    // get all conditions from req.body.exercise.conditions for each exercises
    await parsedExercise.forEach((key, index) => {
      let exCondition = exerciseWithConditions[index].exerciseConditions.map(
        (k) => ({
          ...k,
          exerciseId: key.id
        })
      );
      exConditionsWithId = [...exConditionsWithId, ...exCondition];
    });

    try {
      const exerciseConditionWithId = await ExerciseCondition.bulkCreate(
        exConditionsWithId,
        {
          returning: true,
          plain: true,
          individualHooks: true
        }
      );

      let parsedCondition: any = await parseResDataValues(
        exerciseConditionWithId
      );

      let mergedExerciseConditions = [];

      // Mount each conditionsExercise from DB to each exercise again
      // conditionExercise insert in DB
      await parsedExercise.forEach((value) => {
        let newExercise = value;
        newExercise.exerciseConditions = [];
        parsedCondition.forEach((v) => {
          if (v.exerciseId === value.id) {
            newExercise.exerciseConditions = [
              ...newExercise.exerciseConditions,
              v
            ];
          }
        });

        mergedExerciseConditions = [...mergedExerciseConditions, newExercise];
      });

      return mergedExerciseConditions;
    } catch (e) {
      return {
        data: null,
        message: `${e}`
      };
    }
  }
  async getAllExercise(exerciseId) {
    try {
      const exercises = await ExerciseCondition.findAll(exerciseId);

      return {
        data: exercises,
        message: "Found is all exercises."
      };
    } catch (e) {
      return {
        data: null,
        message: `${e}`
      };
    }
  }
}

export default new ExerciseConditionService();

import Exercise from "../../models/Exercise";

/**
 * @model Exercise fields:
 * order, name, type, load, trainingId
 */

class ExerciseService {
  async addNewExercise(trainingId, exercises) {
    const exWithId = await exercises.map((k) => ({
      ...k,
      trainingId
    }));

    try {
      const bulkExercise = await Exercise.bulkCreate(exWithId, {
        returning: true,
        plain: true,
        individualHooks: true
      });

      return {
        data: bulkExercise,
        message: "Exercise created is successfully."
      };
    } catch (e) {
      return {
        data: null,
        message: `${e}`
      };
    }
  }
  async getAllExercise(trainingId) {
    try {
      const exercises = await Exercise.findAll(trainingId);

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

export default new ExerciseService();

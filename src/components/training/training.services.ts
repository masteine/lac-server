import Training from "../../models/Training";
import Exercise from "../../models/Exercise";
import ExerciseCondition from "../../models/ExerciseCondition";

class TrainingService {
  async createNewTraining(id, { name, date }) {
    try {
      const newTraining = await Training.create(
        {
          userId: id,
          date,
          name
        },
        {
          returning: true,
          plain: true
        }
      );

      return {
        data: newTraining,
        message: "Training created is successfully."
      };
    } catch (e) {
      return {
        data: null,
        message: `${e}`
      };
    }
  }
  async getAllTrainings(id: string | null = null) {
    try {
      let training = await Training.findAll({
        ...(id && { where: { id } }),
        include: [
          {
            model: Exercise,
            include: {
              model: ExerciseCondition
            }
          }
        ],
        order: [["id", "ASC"]]
      });

      return {
        data: training,
        message: "Find all trainings is successfully."
      };
    } catch (e) {
      return {
        data: null,
        message: `${e}`
      };
    }
  }
  async deleteTraining(id) {
    try {
      await Training.destroy({
        where: {
          id
        }
      });

      return {
        data: null,
        message: "Deleted training is successfully."
      };
    } catch (e) {
      return {
        data: null,
        message: `${e}`
      };
    }
  }
  async updateTraining(id, data) {
    let mergedConditions = [];
    try {
      const training = await Training.update(
        { data: data.date, name: data.name },
        { where: { id } }
      );

      if (training[0] !== 1) return false;

      for (const value of data.exercises) {
        const { id, order, name, type, load, exerciseConditions } = value;
        mergedConditions = [...mergedConditions, ...exerciseConditions];
        try {
          await Exercise.update(
            {
              order,
              name,
              type,
              load
            },
            { where: { id } }
          );
        } catch (e) {
          Error(`${e}`);
        }
      }

      for (const c of mergedConditions) {
        const { id, repeat, set, order, weight } = c;
        await ExerciseCondition.update(
          { id, repeat, set, order, weight },
          { where: { id } }
        );
      }

      return training;
    } catch (e) {
      return {
        data: null,
        message: `${e}`
      };
    }
  }
}

export default new TrainingService();

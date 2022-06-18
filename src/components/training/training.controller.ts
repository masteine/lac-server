import TrainingService from "./training.services";
import ExerciseService from "../exercise/exercise.services";
import ExerciseConditionService from "../exercise/exerciseCondition.services";
import { Request, Response } from "express";

class TrainingController {
  async createTraining(req, res) {
    const body = req.body;
    const id = req.session.user_id;

    try {
      const training = await TrainingService.createNewTraining(id, body);

      if (!training.data) return res.status(403).json(training);

      const exercises = await ExerciseService.addNewExercise(
        training.data.id,
        body.exercises
      );

      if (!exercises.data) return res.status(403).json(exercises);

      const exerciseWithConditions = await ExerciseConditionService.createExerciseCondition(
        exercises,
        body.exercises
      );

      res.status(200).json({
        data: {
          ...training.data.dataValues,
          exercises: exerciseWithConditions
        },
        message: training.message
      });
    } catch (e) {
      res.json({ message: `${e}`, data: null });
    }
  }
  async getAllTrainings(req, res) {
    try {
      let training = await TrainingService.getAllTrainings();
      return res.status(200).json(training);
    } catch (e) {
      return res.json({ message: `${e}`, data: null });
    }
  }

  async updateTraining(req: Request, res: Response) {
    try {
      const updatedTraining = await TrainingService.updateTraining(
        req.query.id,
        req.body
      );

      if (!updatedTraining) {
        return res.status(404).json({ data: null, message: "Incorrect data." });
      }

      let training = await TrainingService.getAllTrainings(req.params.id);
      //if(!updatedTraining.data) return
      return res.status(200).json(training);
    } catch (e) {
      return res.json({ message: `${e}`, data: null });
    }
  }

  async deleteTraining(req, res) {
    try {
      const result = await TrainingService.deleteTraining(req.query.id);

      return res.status(200).json(result);
    } catch (e) {
      return res.json({ message: `${e}`, data: null });
    }
  }
}

export default new TrainingController();

import { Router } from "express";
import TrainingController from "./training.controller";
import { authMiddleware, trainingValidation } from "../../middlewares";

const router = Router();

const {
  createTraining,
  deleteTraining,
  getAllTrainings,
  updateTraining
} = TrainingController;

const trainingBaseApiUrl: string = "/api/training";

router
  .post(
    trainingBaseApiUrl,
    [authMiddleware(), trainingValidation],
    createTraining
  )
  .get(`${trainingBaseApiUrl}s`, authMiddleware(), getAllTrainings)
  .put(
    `${trainingBaseApiUrl}`,
    [authMiddleware(), trainingValidation],
    updateTraining
  )
  .delete(`${trainingBaseApiUrl}`, authMiddleware(), deleteTraining);

export default router;

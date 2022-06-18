export default function trainingValidation(req, res, next) {
  const body = req.body;
  const entries = Object.entries(body);
  const errorRes = { data: null, message: "Incorrect training data." };

  if (entries.length === 0 || !Array.isArray(body?.exercises)) {
    return res.status(404).json(errorRes);
  }

  if (body.exercises.length === 0) {
    return res.status(404).json(errorRes);
  }

  const exercises = body.exercises;

  const exerciseKeys = [
    "id",
    "order",
    "name",
    "type",
    "load",
    "exerciseConditions",
    "createdAt",
    "updatedAt",
    "trainingId"
  ];
  const conditionsKeys = [
    "id",
    "order",
    "repeat",
    "set",
    "weight",
    "createdAt",
    "updatedAt",
    "exerciseId"
  ];

  exercises.forEach((key) => {
    Object.entries(key).forEach(([key, value]) => {
      if (value === "" || !exerciseKeys.includes(key)) {
        return res.status(404).json(errorRes);
      }

      if (key === "conditions" && !Array.isArray(value)) {
        return res.status(404).json(errorRes);
      }
      if (key === "conditions") {
        let v: any = value;

        v.forEach((ks) => {
          Object.entries(ks).forEach(([conditionKey, conditionValue]) => {
            if (
              conditionValue === "" ||
              !conditionsKeys.includes(conditionKey)
            ) {
              return res.status(404).json(errorRes);
            }
          });
        });
      }
    });
  });

  next();
}

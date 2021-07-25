import express from "express";
import { calculateBmi } from "./calculateBmi";
import { exerciseCalculator } from "./exerciseCalculator";
// import { calculateBmi } from "./calculateBmi";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (isNaN(weight) || isNaN(height))
    res.send({ error: "malformatted parameters" });
  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  // console.log(req.body);
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(i) || isNaN(target)) {
      return res.status(400).json({
        error: "malformatted parameters",
      });
    }
  }

  // console.log("values", values);
  const result = exerciseCalculator(daily_exercises, target);
  res.send(result);
  return res.status(200);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

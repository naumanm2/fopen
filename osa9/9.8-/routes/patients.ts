import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

// type Fields = {
//   id: unknown;
//   name: unknown;
//   dateOfBirth: unknown;
//   ssn: unknown;
//   gender: unknown;
//   occupation: unknown;
// };

router.get("/", (_req, res) => {
  console.log("fetching patients");
  res.send(patientService.getNonSensitivePatientInfo());
});

router.post("/", (req, res) => {
  console.log("posting patient");
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatient);
});

export default router;

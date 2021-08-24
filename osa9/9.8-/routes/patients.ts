import express from "express";

import patientService from "../services/patientService";

import toNewPatientEntry from "../utils"

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
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (e) {
      res.status(400).send(e.message);
  }

});

export default router;

import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("fetching patients");
  res.send(patientService.getNonSensitivePatientInfo());
});

export default router;

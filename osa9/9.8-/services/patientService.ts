import { v1 as uuid } from "uuid";
const id = uuid();

import patientData from "../data/patients.json";

import { patientList, nonSensitivePatientList, patientEntry } from "../types";

const patients: Array<patientList> = patientData;

const getPatients = (): Array<patientList> => {
  return patients;
};

const getNonSensitivePatientInfo = (): Array<nonSensitivePatientList> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: patientEntry): patientList => {
  const newPatient = {
    id: id,
    ...entry,
  };
    patients.push(newPatient);
    return newPatient;


};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient
};

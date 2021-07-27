import diagnoseData from "../data/diagnoses.json";

import { diagnoseList } from '../types'

const diagnoses: Array<diagnoseList> = diagnoseData

const getDiagnoses = (): Array<diagnoseList> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};

export interface diagnoseList {
  code: string;
  name: string;
  latin?: string;
}

export interface patientList {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export type patientEntry = Omit<patientList, "id">;

export type nonSensitivePatientList = Omit<patientList, "ssn">;

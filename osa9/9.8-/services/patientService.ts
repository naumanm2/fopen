import patientData from '../data/patients.json'

import { patientList, nonSensitivePatientList } from '../types'

const patients: Array<patientList> = patientData

const getPatients = (): Array<patientList> => {
    return patients
}

const getNonSensitivePatientInfo = (): Array<nonSensitivePatientList> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }))
}

export default {
    getPatients,
    getNonSensitivePatientInfo
}
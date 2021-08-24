import { patientEntry, Gender } from './types'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
    }

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender)
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('incorrect gender ' + gender)
    }
    return gender
} 

const parseName = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error('incorrect name ' + str)
    }
    return str;
}
const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date)) {
        throw new Error('incorrect date ' + date)
    }
    return date;
}
const parseSSN = (ssn: unknown): string => {
    if (!ssn|| !isString(ssn)) {
        throw new Error('incorrect ssn ' + ssn)
    }
    return ssn;
}
const parseOccupation = (occupation: unknown): string => {
    if (!occupation|| !isString(occupation)) {
        throw new Error('incorrect occupation ' + occupation)
    }
    return occupation;
}

//   id: unknown;
//   name: unknown;
//   dateOfBirth: unknown;
//   ssn: unknown;
//   gender: unknown;
//   occupation: unknown;

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }
const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): patientEntry => {
    const newEntry: patientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)

    }
return newEntry
}

export default toNewPatientEntry

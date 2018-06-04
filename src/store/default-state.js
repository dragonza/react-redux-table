/* eslint-disable */
// use normalizr for data from api
import { normalize, schema } from 'normalizr';
import studentData from '../students';

// adding id for student for normalization
let count = 0;
const students = studentData.map(student => ({
  id: count++,
  ...student,
  FullName: `${student.FirstName} ${student.LastName}`,
  updateData: {}
}));

const myData = { students };

const student = new schema.Entity('students');
const mySchema = {
  students: [student],
};

const normalizedData = normalize(myData, mySchema);
export default {
  students: normalizedData.entities.students,
  setSort: {
    orderBy: 'id',
    order: 'asc',
  }
};

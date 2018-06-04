import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import StudentRow from './table-row';

export default class StudentList extends Component {
  renderComponent = (props) => {
    const {
      studentsList, rowsPerPage, page,
    } = props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, studentsList.length - (page * rowsPerPage));

    return (
      <TableBody>
        {studentsList.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(student => {
          return (
            <StudentRow
              hover
              student={student}
              key={student.StudentId}
            />
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={7} />
          </TableRow>
        )}
      </TableBody>
    );
  }

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

StudentList.propTypes = {
  studentsList: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import ActionComponent from './action-component';
import Editable from './editable';
import ConfirmationBox from './confirmation-box';
import { updateInput, removeRow, updateRow } from '../action/table-action';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

class StudentRow extends Component {
  state = {
    editing: false,
    openModal: false,
    isValid: {
      FirstName: true,
      LastName: true,
      Gender: true,
      Nationality: true,
    },
  }

  handleInputChange = (value, field) => {
    const { student } = this.props;
    this.props.updateInput(student.id, value, field);
  }

  handleModalClose = () => {
    this.setState({
      openModal: false,
    });
  }

  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  }

  handleDeleteRow = (id) => {
    this.props.removeRow([id]);
  }

  handleEdit = () => {
    this.setState({ editing: true });
  }

  handleUpdateRow = (props, kindOfUpdate) => {
    if (kindOfUpdate === 'save') {
      const { updateData } = props.student;
      props.updateRow(props.student.id, updateData);
    } else {
      props.updateRow(props.student.id, {});
    }
    this.setState({
      editing: false,
    });
  }

  handleValidation = (fieldName, isValid) => {
    this.setState({
      isValid: {
        ...this.state.isValid,
        [fieldName]: isValid,
      },
    });
  }

  renderComponent = (props, state) => {
    const { student, classes } = props;
    const { editing } = state;
    return (
      <TableRow
        hover
        key={student.id}
      >
        <TableCell component="th" scope="row">
          {student.StudentId}
        </TableCell>
        <TableCell>
          <div className="full-name">
            <Editable
              isValid={state.isValid}
              onValidate={(fieldName, isValid) => this.handleValidation(fieldName, isValid)}
              id="FirstName"
              value={student.FirstName}
              editing={editing}
              onChange={(value, field) => this.handleInputChange(value, field)}
            />
            {' '}
            <Editable
              onValidate={(fieldName, isValid) => this.handleValidation(fieldName, isValid)}
              isValid={state.isValid}
              id="LastName"
              value={student.LastName}
              editing={editing}
              onChange={(value, field) => this.handleInputChange(value, field)}
            />
          </div>
        </TableCell>
        <TableCell>
          <Editable
            isValid={state.isValid}
            onValidate={(fieldName, isValid) => this.handleValidation(fieldName, isValid)}
            id="DateOfBirth"
            isDate
            value={moment(student.DateOfBirth).format('MM/DD/YYYY')}
            editing={editing}
            onChange={(value, field) => this.handleInputChange(value, field)}
          />
        </TableCell>
        <TableCell>
          <Editable
            id="Gender"
            onValidate={(fieldName, isValid) => this.handleValidation(fieldName, isValid)}
            isValid={state.isValid}
            value={student.Gender}
            editing={editing}
            onChange={(value, field) => this.handleInputChange(value, field)}
          />
        </TableCell>
        <TableCell>
          <Editable
            isValid={state.isValid}
            onValidate={(fieldName, isValid) => this.handleValidation(fieldName, isValid)}
            id="Nationality"
            value={student.Nationality}
            editing={editing}
            onChange={(value, field) => this.handleInputChange(value, field)}
          />
        </TableCell>
        <TableCell>
          <Editable
            id="JoinDate"
            value={moment(student.JoinDate).format('MM/DD/YYYY')}
            isDate
            editing={editing}
            onChange={(value, field) => this.handleInputChange(value, field)}
          />
        </TableCell>
        <TableCell>
          <ActionComponent
            rowId={student.id}
            isValid={state.isValid}
            editing={state.editing}
            onDeleteRow={this.handleOpenModal}
            onEdit={this.handleEdit}
            onSave={() => this.handleUpdateRow(props, 'save')}
            onCancel={() => this.handleUpdateRow(props)}
          />
          <ConfirmationBox
            id={student.id}
            open={state.openModal}
            onRemoveRow={(id) => this.handleDeleteRow(id)}
            onClose={this.handleModalClose}
            styles={getModalStyle()}
            className={classes.paper}
          />
        </TableCell>
      </TableRow>
    );
  }

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default connect(
  () => ({}),
  (dispatch) => {
    return bindActionCreators({
      updateInput,
      removeRow,
      updateRow,
    }, dispatch);
  },
)(withStyles(styles)(StudentRow));

StudentRow.propTypes = {
  student: PropTypes.object.isRequired,
  updateInput: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

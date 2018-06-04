import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const columnData = [
  {
    id: 'StudentId', numeric: false, disablePadding: false, label: 'Student ID',
  },
  {
    id: 'FullName', numeric: false, disablePadding: false, label: 'Full Name',
  },
  {
    id: 'DateOfBirth', numeric: false, disablePadding: false, label: 'Date of Birth',
  },
  {
    id: 'Gender', numeric: false, disablePadding: false, label: 'Gender',
  },
  {
    id: 'Nationality', numeric: false, disablePadding: false, label: 'Nationality',
  },
  {
    id: 'JoinDate', numeric: false, disablePadding: false, label: 'Join Date',
  },
  {
    id: 'Actions', numeric: false, disablePadding: false, label: 'Actions',
  },
];

export default class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      order, orderBy,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

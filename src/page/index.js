import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './components/table-head';
import StudentList from './components/table-body';
import { sortedStudentList, orderKind, orderCate } from './selectors/selectors';
import { setSort } from './action/table-action';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class StudentTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleRequestSort = (event, property) => {
    if (this.props.orderBy === property && this.props.order === 'desc') {
      this.props.setSort('asc', this.props.orderBy);
    } else {
      this.props.setSort('desc', property);
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };


  render() {
    const {
      classes, studentsList, order, orderBy,
    } = this.props;
    const {
      rowsPerPage, page,
    } = this.state;
    return (
      <Paper className={classes.root}>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={studentsList.length}
            />
            <StudentList
              studentsList={studentsList}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
            />
          </Table>
        </div>
        <TablePagination
          component="div"
          count={studentsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

StudentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  studentsList: PropTypes.array.isRequired,
  setSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};


export default connect(
  (state) => {
    return {
      studentsList: sortedStudentList(state),
      order: orderKind(state),
      orderBy: orderCate(state),
    };
  },
  (dispatch) => {
    return bindActionCreators({
      setSort,
    }, dispatch);
  },
)(withStyles(styles)(StudentTable));

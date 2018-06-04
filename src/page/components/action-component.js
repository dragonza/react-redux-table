import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    fontSize: 'inherit',
  },
});

class ActionComponent extends Component {
  renderViewButtons = (props) => {
    const { classes } = props;
    return (
      <Fragment>
        <Button variant="raised" color="primary" className={classes.button} size="small" onClick={() => props.onEdit()}>
          Edit
        </Button>
        <Button
          variant="raised"
          color="secondary"
          className={classes.button}
          size="small"
          onClick={() => props.onDeleteRow()}
        >
          Delete
        </Button>
      </Fragment>
    );
  }

  renderEditingButtons = (props) => {
    const { classes } = props;
    const isDisabled = Object.keys(props.isValid).some(key => !props.isValid[key]);
    return (
      <Fragment>
        <Button
          disabled={isDisabled}
          variant="raised"
          color="primary"
          className={classes.button}
          size="small"
          onClick={() => props.onSave()}
        >
          Save
        </Button>
        <Button variant="raised" className={classes.button} size="small" onClick={() => props.onCancel()}>
          Cancel
        </Button>
      </Fragment>
    );
  }

  renderComponent = (props) => {
    const { editing } = props;
    return (
      <div className="action-component">
        { editing ? this.renderEditingButtons(props) : this.renderViewButtons(props) }
      </div>
    );
  }

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default withStyles(styles)(ActionComponent);

ActionComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  rowId: PropTypes.number.isRequired,
  editing: PropTypes.bool.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

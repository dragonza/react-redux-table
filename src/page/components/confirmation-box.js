import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const style = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

const ConfirmationBox = ({
  className, styles, open, onClose, classes, onRemoveRow, id,
}) => {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
    >
      <div style={styles} className={className}>
        <Typography variant="subheading" id="simple-modal-description">
          Do you want to delete this row?
        </Typography>
        <Button
          variant="raised"
          color="secondary"
          size="medium"
          className={classes.button}
          onClick={() => onRemoveRow(id)}
        >
          Delete
        </Button>
        <Button variant="raised" size="medium" onClick={() => onClose()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default withStyles(style)(ConfirmationBox);
ConfirmationBox.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  styles: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
};

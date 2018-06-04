import React from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';

const propTypes = {
  id: PropTypes.string.isRequired,
  initialDate: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

class SingleDatePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: props.initialDate,
    };
  }

  onDateChange = (date) => {
    this.setState(() => ({ date }));
    this.props.onChange(date._d, this.props.id);
  }

  onFocusChange = ({ focused }) => {
    this.setState({ focused });
  }

  render() {
    const { focused, date } = this.state;
    const { id } = this.props;
    return (
      <SingleDatePicker
        numberOfMonths={1}
        id={id}
        noBorder
        readOnly
        date={date}
        focused={focused}
        isOutsideRange={() => false}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
      />
    );
  }
}


SingleDatePickerWrapper.propTypes = propTypes;

export default SingleDatePickerWrapper;

import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import SingleDatePickerWrapper from './singleDatePickerWrapper';
import InputText from './input-text';

class Editable extends Component {
  renderEditing = (props) => {
    return (
      props.isDate ?
        <SingleDatePickerWrapper id={props.id} initialDate={moment(props.value)} onChange={props.onChange} />
        :
        <InputText
          onValidate={props.onValidate}
          id={props.id}
          text={props.value}
          type="text"
          onChange={props.onChange}
        />
    );
  }

  renderView = (props) => {
    return (
      <span className="field-value">
        { props.value }
      </span>
    );
  }

  renderComponent = (props) => {
    const cls = classNames(props.className, {
      editable: true,
    });
    return (
      <span className={cls}>
        { !props.editing ? this.renderView(props) : this.renderEditing(props) }
      </span>
    );
  }

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default Editable;

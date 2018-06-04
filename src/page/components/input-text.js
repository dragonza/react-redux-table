import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  input: {
    fontSize: 'inherit',
  },
});

class InputText extends Component {
  state = {
    text: this.props.text || '',
  }


  shouldComponentUpdate(nextProps, nextState) {
    return nextState.text !== this.state.text;
  }

  handleOnChange = (e) => {
    this.setState({
      text: e.target.value,
    });

    if (!e.target.value.length) {
      this.setState({
        error: true,
      });
      this.props.onValidate(this.props.id, false);
    } else {
      this.setState({
        error: false,
      });
      this.props.onValidate(this.props.id, true);
      this.props.onChange(e.target.value, this.props.id);
    }
  }

  renderComponent = (props, state) => {
    return (
      <div className="input-text">
        <Input
          id={props.id}
          className={props.classes.input}
          inputProps={{
            'aria-label': 'Description',
          }}
          error={state.error}
          value={state.text}
          onChange={(e) => this.handleOnChange(e)}
        />
      </div>
    );
  }

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

InputText.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(InputText);

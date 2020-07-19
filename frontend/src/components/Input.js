import React from 'react';

import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const Input = ({ value, hintText, type, onChange }) => (
  <TextField
    value={value}
    hintText={hintText}
    type={type}
    onChange={(e) => onChange(e.target.value)}
  />
);

const { string, func } = PropTypes;

Input.propTypes = {
  hintText: string.isRequired,
  type: string.isRequired,
  onChange: func.isRequired,
  value: string,
};

export default Input;

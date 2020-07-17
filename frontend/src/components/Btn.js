import React from 'react';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const Btn = ({variant, onClick, color, text }) => (
<Button variant={variant} color={color} onClick={onClick} >{text}</Button>
);

const { string, func } = PropTypes

Btn.propTypes = {
  variant: string.isRequired,
  color: string.isRequired,
  onClick: func.isRequired,
}

export default Btn;

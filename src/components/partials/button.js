import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type,
  text,
  iconLink,
  onClick,
  disabled,
  className,
  title,
  onMouseEnter,
  onMouseLeave,
}) => {
  switch (type) {
    case 'text':
      return (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={className}
          title={title}>
          {text}
        </button>
      );

    case 'icon':
      return (
        <button
          type="button"
          aria-label={text}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          title={title}
          disabled={disabled}
          className={`${className} icon`}>
          <img src={iconLink} alt="button icon" />
        </button>
      );

    default:
      return null;
  }
};

Button.defaultProps = {
  text: '',
  iconLink: '',
  onClick: () => null,
  disabled: false,
  className: '',
  title: '',
  onMouseLeave: () => null,
  onMouseEnter: () => null,
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  iconLink: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default Button;

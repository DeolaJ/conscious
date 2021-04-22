import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLocalError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasLocalError: true,
      error,
    };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    toast.error('An error occurred', {
      toastId: 'error-boundary',
    });
  }

  render() {
    const { children, content, color } = this.props;
    const { hasLocalError } = this.state;

    if (hasLocalError) {
      return (
        <section className="flex items-center justify-center w-screen h-screen bg-rose-200">
          <article className="text-center">
            <p style={{ color: color || null }}>
              {content || 'An error has occurred. Please reload this page'}
            </p>
          </article>
        </section>
      );
    }

    return children;
  }
}

ErrorBoundary.defaultProps = {
  content: '',
  color: '',
};

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  content: PropTypes.string,
  color: PropTypes.string,
};

export default ErrorBoundary;

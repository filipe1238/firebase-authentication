
import React, { useEffect } from 'react';

const Alert = ({ type, message, removeAlert}) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [removeAlert]);

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
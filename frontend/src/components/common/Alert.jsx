import React from 'react';

export default function Alert({ children, type = 'info' }) {
  return <div className={`alert alert-${type}`}>{children}</div>;
}

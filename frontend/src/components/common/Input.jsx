import React from 'react';

export default function Input({ value, onChange, placeholder = '', type = 'text', ...props }) {
  return (
    <input
      className="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      {...props}
    />
  );
}

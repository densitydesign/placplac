import React from 'react';

export const OutlinedButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      style={{
        cursor: 'pointer',
        display: 'block',
        marginLeft: 'auto',
        background: '#ffffff',
        border: '1px solid #000000',
        borderRadius: '50px',
        textDecoration: 'none',
        fontSize: '20px',
        lineHeight: '36px',

        padding: '0 20px',
      }}
    />
  );
};

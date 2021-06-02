import React from 'react';

import styled from '@emotion/styled';

function BasicButton({ children, className, type = 'button', ...props }) {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}

const Button = styled(BasicButton)`
  background: #008cf0;
  color: #fff;
  font-size: 16px;
  font-weight: lighter;
  font-family: 'Ubuntu';
  padding: 0.8em 2em;
  border-width: 0;
  border-radius: 1.3em;

  &:hover {
    filter: brightness(120%);
  }

  &:disabled,
  &:active {
    filter: brightness(70%);
  }
`;

export default Button;

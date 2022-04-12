import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import './styles.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  cy: string;
  children?: React.ReactNode | React.ReactNode[];
}

const MyButton = ({ children, cy, ...props }: ButtonProps & IButton): React.ReactElement => (
  <Button data-cy={cy} {...props}>
    {children}
  </Button>
);

MyButton.defaultProps = { children: '' };

export default MyButton;

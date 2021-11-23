import React from 'react';
import classNames from 'classnames';
import { IText } from './interfaces';
import './styles.scss';

const Text: React.FunctionComponent<IText> = ({
  children,
  as,
  size,
  weight,
  color,
  className = '',
}): React.ReactElement => {
  const styles = {
    fontSize: size,
    fontWeight: weight,
    color,
  };

  const textElement = React.createElement(
    as,
    { style: styles, className: classNames('textElement', className) },
    children
  );

  return textElement;
};

export default Text;

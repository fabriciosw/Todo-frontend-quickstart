import React from 'react';
import { Container } from 'react-bootstrap';
import classnames from 'classnames';
import './styles.scss';

interface ISection {
  className?: string;
}

const Section: React.FunctionComponent<ISection> = ({ children, className = '' }): React.ReactElement => (
  <section className={classnames('section mt-4 pt-3 pb-3', className)}>
    <Container fluid>{children}</Container>
  </section>
);

Section.defaultProps = { className: '' };

export default Section;

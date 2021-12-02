import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { HiUser, HiMenuAlt3 } from 'react-icons/hi';
import Text from '../Text';
import { useAuth } from '../../contexts/AuthContext';
import { useToggleMenu } from '../../contexts/ToggleMenuContext';
import './styles.scss';

const Header: React.FunctionComponent = () => {
  const { logout, currentUser } = useAuth();
  const { updateToggleMenu } = useToggleMenu();

  return (
    <header>
      <nav className="nav pt-4 pb-4">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="nav__grid-items d-flex justify-content-between align-items-center">
                <div className="nav__toggle">
                  <HiMenuAlt3
                    size={25}
                    onClick={() => {
                      updateToggleMenu();
                    }}
                  />
                </div>
                <div className="nav__user">
                  <Dropdown>
                    <Dropdown.Toggle variant="none">
                      <Text as="small" size="var(--is-sm)" weight={400}>
                        <HiUser size={18} />
                        Olá,{' '}
                        <Text as="b" weight={700}>
                          {currentUser?.displayName || currentUser?.email}
                        </Text>
                      </Text>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <ul>
                        <li>
                          <Link to="/perfil">Configurações</Link>
                        </li>
                        <li>
                          <Button
                            type="button"
                            variant="light"
                            className="mb-1"
                            onClick={() => {
                              logout();
                            }}
                          >
                            Sair
                          </Button>
                        </li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </nav>
    </header>
  );
};

export default Header;

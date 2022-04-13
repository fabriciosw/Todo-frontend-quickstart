import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { HiLogout, HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useToggleMenu } from '../../contexts/ToggleMenuContext';
import { useAuth } from '../../contexts/AuthContext';
import Text from '../Text';
import './styles.scss';

const Header: React.FunctionComponent = () => {
  const history = useHistory();
  const { logout, currentUser } = useAuth();
  const { updateToggleMenu } = useToggleMenu();

  return (
    <header className="shadow-sm">
      <nav className="nav">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="nav__grid-items d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="nav__toggle">
                    <HiOutlineMenuAlt3
                      size={25}
                      aria-label="Abrir/Fechar"
                      aria-describedby="Abrir/Fechar menu lateral"
                      onClick={() => {
                        updateToggleMenu();
                      }}
                      data-cy="test-toggleMenu"
                    />
                  </div>
                  <div className="nav__title">
                    <Text as="h2" ariaLabel="Portal administrador">
                      Portal administrador
                    </Text>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      history.push('/perfil');
                    }}
                    title="Clique aqui para editar o perfil"
                    className="nav__button border-0 bg-transparent"
                  >
                    <Text as="b" weight={600} size="1rem" ariaLabel="Nome do usuário">
                      {currentUser?.displayName || currentUser?.email || 'nome_usuario'},
                    </Text>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                    }}
                    title="Clique aqui para sair do sistema"
                    className="nav__button border-0 bg-transparent"
                  >
                    sair <HiLogout />
                  </button>
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

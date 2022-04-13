import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Text from '../../../components/Text';
import { useAuth } from '../../../contexts/AuthContext';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import './styles.scss';
import Section from '../../../components/Section';

export default function Login(): React.ReactElement {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      try {
        if (!emailRef || !emailRef.current || !passwordRef || !passwordRef.current) {
          toastMsg(ToastType.Error, 'Existem campos inválidos');
          return;
        }
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        history.push('/');
      } catch (error) {
        toastMsg(ToastType.Error, (error as Error).message);
      }

      setLoading(false);
    },
    [history, login]
  );

  return (
    <Section title="Login" description="Login">
      <Row className="login d-flex align-items-center justify-content-center mt-5">
        <Col sm={12} lg={4}>
          <Card>
            <Card.Body>
              <Text as="h2" weight={700} className="text-center">
                Acessar
              </Text>
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group className="mb-3 mt-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" ref={emailRef} required placeholder="Digite o seu e-mail" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required placeholder="Digite a sua senha" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="button">
                  <Button disabled={loading} className="w-100 mt-3" type="submit">
                    Acessar
                  </Button>
                </Form.Group>
              </Form>
              <Text as="p" className="text-center">
                <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
              </Text>
            </Card.Body>
          </Card>
          <Text as="p" className="text-center mt-2">
            Não tem uma conta? <Link to="/criar-conta">Criar conta</Link>
          </Text>
        </Col>
      </Row>
    </Section>
  );
}

import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Text from '../../../components/Text';
import { useAuth } from '../../../contexts/AuthContext';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import './styles.scss';

export default function Signup(): React.ReactElement {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      try {
        if (!nameRef || !nameRef.current || !emailRef || !emailRef.current || !passwordRef || !passwordRef.current)
          return;

        if (passwordRef.current.value !== passwordConfirmRef?.current?.value) {
          toastMsg(ToastType.Error, 'Senhas não são iguais!');
        } else {
          setLoading(true);
          await signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
          history.push('/');
          toastMsg(ToastType.Success, 'Conta criada com sucesso!');
        }
      } catch (error) {
        toastMsg(ToastType.Error, (error as Error).message);
      }

      setLoading(false);
    },
    [history, signup]
  );

  return (
    <Container fluid>
      <Row className="signup d-flex align-items-center justify-content-center mt-5">
        <Col sm={6} lg={3}>
          <Card>
            <Card.Body>
              <Text as="h2" weight={700} className="text-center">
                Criar conta
              </Text>
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group className="mb-3 mt-3" controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" ref={nameRef} required placeholder="Digite o seu nome" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" ref={emailRef} required placeholder="Digite o seu e-mail" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="´password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required placeholder="Digite sua senha" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirmar senha</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                    placeholder="Digite novamente sua senha"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="button">
                  <Button disabled={loading} className="w-100" type="submit">
                    Criar conta
                  </Button>
                </Form.Group>
              </Form>
              <Text as="p" className="text-center">
                Já tem uma conta? <Link to="/login">Acessar</Link>
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Text from '../../../components/Text';
import Section from '../../../components/Section';
import { useAuth } from '../../../contexts/AuthContext';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import './styles.scss';

export default function ForgotPassword(): React.ReactElement {
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      try {
        if (!emailRef || !emailRef.current) return;
        setLoading(true);
        await resetPassword(emailRef.current.value);
      } catch {
        setLoading(false);
        toastMsg(ToastType.Success, 'Enviamos suas configurações para o seu e-mail!');
      }
    },
    [resetPassword]
  );

  return (
    <Section title="Esqueci minha senha" description="Esqueci minha senha">
      <Row className="forgot-password d-flex align-items-center justify-content-center mt-5">
        <Col sm={12} lg={4}>
          <Card>
            <Card.Body>
              <Text as="h2" weight={700} className="text-center">
                Redefinir senha
              </Text>
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group className="mb-3 mt-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" ref={emailRef} placeholder="Digite o seu e-mail" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="button">
                  <Button disabled={loading} type="submit" className="w-100" id="button">
                    Redefinir senha
                  </Button>
                </Form.Group>
              </Form>
              <div className="w-100 text-center mt-3">
                <Text as="p">
                  <Link to="/login">Acessar</Link>
                </Text>
              </div>
            </Card.Body>
          </Card>
          <Text as="p" className="text-center">
            Não tem uma conta? <Link to="/criar-conta">Criar conta</Link>
          </Text>
        </Col>
      </Row>
    </Section>
  );
}

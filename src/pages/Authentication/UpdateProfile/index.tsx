import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import { useAuth } from '../../../contexts/AuthContext';
import toastMsg, { ToastType } from '../../../utils/toastMsg';

export default function UpdateProfile(): React.ReactElement {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (!emailRef || !emailRef.current || !passwordRef || !passwordRef.current) return;
      if (passwordRef.current.value !== passwordConfirmRef?.current?.value) {
        toastMsg(ToastType.Error, 'Senhas não são iguais!');
      } else {
        const promises = [];
        setLoading(true);

        if (emailRef.current.value !== currentUser?.email) {
          promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
          .then(() => {
            toastMsg(ToastType.Success, 'Conta atualizada com sucesso!');
            history.push('/');
          })
          .catch((error) => {
            toastMsg(ToastType.Error, (error as Error).message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [history, updateEmail, updatePassword, currentUser]
  );

  return (
    <Section className="create">
      <Row>
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            Atualizar perfil
          </Text>
          <Text as="small" size=".85rem" weight={400}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </Text>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3 mt-3" controlId="name">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser?.email || ''}
                placeholder="Digite o seu e-mail"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Digite sua senha" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="repeatPassword">
              <Form.Label>Confirmar senha</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} placeholder="Digite novamente sua senha" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="button">
              <Button disabled={loading} type="submit" id="button">
                Atualizar
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Section>
  );
}

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { isValidEmail } from '@brazilian-utils/brazilian-utils';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import UsersService from '../../../services/users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';

const Update: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCleaningUp = false;

    async function getUserById(): Promise<void> {
      try {
        if (!isCleaningUp) {
          const res = await UsersService.user(params.id);
          setName(res.first_name);
          setLastName(res.last_name);
          setEmail(res.email);
        }
      } catch (error) {
        toastMsg(ToastType.Error, (error as Error).message);
      }
    }

    getUserById();

    return () => {
      isCleaningUp = true;
    };
  }, [history, params.id]);

  const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
    e.preventDefault();
    if (!name || !email || !lastName || !email) return;

    if (!isValidEmail(email)) {
      toastMsg(ToastType.Error, 'E-mail inválido!');
      return;
    }

    try {
      await UsersService.update(name, lastName, email, params.id);
      setLoading(true);
      toastMsg(ToastType.Success, 'Atualização realizada com sucesso!');
      history.push('/funcionarios');
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
    setLoading(false);
  };

  return (
    <Section className="create">
      <Row>
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            Editar funcionário
          </Text>
          <Text as="small" size=".85rem" weight={400}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </Text>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Digite o nome"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Sobrenome</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Digite o sobrenome"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Digite o e-mail"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="button">
              <Button disabled={loading} type="submit">
                Editar
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Section>
  );
};

export default Update;

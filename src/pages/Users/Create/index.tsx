import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { isValidEmail } from '@brazilian-utils/brazilian-utils';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import UsersService from '../../../services/users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';

const Create: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }): Promise<void> => {
    e.preventDefault();
    if (!name || !email || !lastName || !email) return;

    if (!isValidEmail(email)) {
      toastMsg(ToastType.Error, 'E-mail inválido!');
      return;
    }

    try {
      await UsersService.create(name, lastName, email);
      setLoading(true);
      toastMsg(ToastType.Success, 'Cadastro realizado com sucesso!');
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
            Criar novo funcionário
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
              <Button disabled={loading} type="submit" id="button">
                Cadastrar
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Section>
  );
};

export default Create;

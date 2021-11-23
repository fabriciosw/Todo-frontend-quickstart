import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import DataTable from '../../../components/DataTable';
import { IData, IUser } from '../../../interfaces';
import UsersService from '../../../services/users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';

const Users: React.FunctionComponent = (): React.ReactElement => {
  const [users, setUsers] = useState<IData<IUser>>({} as IData<IUser>);

  const fetchUsers = async (): Promise<void> => {
    try {
      const res = await UsersService.users();
      setUsers(res);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  useEffect(() => {
    let isCleaningUp = false;

    if (!isCleaningUp) {
      fetchUsers();
    }
    return () => {
      isCleaningUp = true;
    };
  }, []);

  return (
    <Section className="users">
      <Row>
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            Funcionários
          </Text>
          <Text as="small" size=".85rem" weight={400}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </Text>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataTable data={users} renderUsers={fetchUsers} />
        </Col>
      </Row>
    </Section>
  );
};

export default Users;

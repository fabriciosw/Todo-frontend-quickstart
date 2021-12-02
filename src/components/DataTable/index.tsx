import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { HiTrash, HiPencil } from 'react-icons/hi';
import { IData, IUser } from '../../interfaces';
import UsersService from '../../services/users.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import './styles.scss';

const DataTable = ({ data, renderUsers }: { data: IData<IUser>; renderUsers: () => void }): React.ReactElement => {
  const history = useHistory();

  const deleteUser = async (id: string): Promise<void> => {
    try {
      const res = await UsersService.delete(id);
      toastMsg(ToastType.Success, res);
      renderUsers();
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  return (
    <Table responsive bordered hover size="md" className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>E-mail</th>
          <th className="table__actions">Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.data?.length > 0 ? (
          data.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td className="table__actions">
                <HiPencil
                  size={17}
                  className="table__icon-update table__icon-svg"
                  onClick={() => {
                    history.push(`/editar-funcionario/${item.id}`);
                  }}
                />
                <HiTrash
                  size={17}
                  className="table__icon-trash table__icon-svg"
                  onClick={() => {
                    deleteUser(item.id);
                  }}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>Nenhuma item cadastrado</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default DataTable;

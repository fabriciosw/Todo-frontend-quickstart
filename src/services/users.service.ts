import HttpClient from './httpClient';
import { IData, IUser } from '../interfaces';

class UsersService {
  static async users(): Promise<IData<IUser>> {
    return HttpClient.api.get('/users');
  }

  static async user(id: string): Promise<IUser> {
    const { data } = await HttpClient.api.get(`/users/${id}`);
    return data;
  }

  static async create(name: string, lastName: string, email: string): Promise<void> {
    const obj = {
      first_name: name,
      last_name: lastName,
      email,
    };
    const { data } = await HttpClient.api.post('/users', obj);
    return data;
  }

  static async update(name: string, lastName: string, email: string, id: string): Promise<void> {
    const obj = {
      first_name: name,
      last_name: lastName,
      email,
    };
    const { data } = await HttpClient.api.put(`/users/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<string> {
    const { statusText } = await HttpClient.api.delete(`/users/${id}`);
    return statusText;
  }
}

export default UsersService;

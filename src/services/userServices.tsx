import axios from 'axios';
import { getToken } from './todoServices';

export async function loginUser(
  evento: React.FormEvent,
  email: string,
  password: string,
  setIsAuthenticated: (x: boolean) => void
): Promise<void> {
  evento.preventDefault();
  await axios.post('http://localhost:3333/sessions/', { email, password }).then(async (response) => {
    localStorage.setItem('token', response.data);
    getToken();
    setIsAuthenticated(true);
  });
  // .catch((erro) => console.log(erro))
}

export function logoutUser(): void {
// setIsAuthenticated: (x: boolean) => void
  localStorage.removeItem('token');
  // setIsAuthenticated(false);
  document.location.reload();
}

export async function validateToken(): Promise<boolean> {
  let isValid = false;
  const token = localStorage.getItem('token');
  if (token) {
    await axios
      .post('http://localhost:3333/sessions/validate', {}, { headers: { Authorization: `bearer ${token}` } })
      .then((res: { data: boolean }) => {
        isValid = res.data;
      })
      .catch(() => {
        isValid = false;
      });
    return isValid;
  }
  return isValid;
}

import axios from 'axios';
import { ITarefa } from '../interfaces/tarefa';

let token: string | null;

export function getToken(): void {
  token = localStorage.getItem('token');
}
getToken();

export function getAll(setTarefas: (x: ITarefa[]) => void): void {
  axios
    .get('http://localhost:3333/tasks/', { headers: { Authorization: `bearer ${token}` } })
    .then((response: { data: Array<ITarefa> }) => setTarefas(response.data));
  // .catch((error: string) =>
  //   console.log(error)
  // );
}

export function endTask(id: number, setTarefas: (x: ITarefa[]) => void): void {
  axios
    .put(
      `http://localhost:3333/tasks/${id}`,
      {
        complete: true,
      },
      { headers: { Authorization: `bearer ${token}` } }
    )
    .then(() => getAll(setTarefas));
  // .catch((error: string) => {
  //   console.log(error);
  // });
}

export function deleteTask(id: number, setTarefas: (x: ITarefa[]) => void): void {
  axios.delete(`http://localhost:3333/tasks/${id}`, { headers: { Authorization: `bearer ${token}` } }).then(() => {
    getAll(setTarefas);
  });
  // .catch((error: string) =>
  //   console.log(error)
  // );
}

export function adicionarTarefa(
  evento: React.FormEvent,
  description: string,
  title: string,
  setTarefas: (x: ITarefa[]) => void,
  setTitle: React.Dispatch<string>,
  setDescription: React.Dispatch<string>
): void {
  evento.preventDefault();

  let desc;
  if (description.trim() === '') desc = 'Sem descrição';
  else desc = description;

  axios
    .post(
      'http://localhost:3333/tasks/',
      {
        title,
        description: desc,
      },
      { headers: { Authorization: `bearer ${token}` } }
    )
    .then(() => {
      getAll(setTarefas);
    });
  // .catch((error: string) =>
  //   console.log(error)
  // );

  setTitle('');
  setDescription('');
}

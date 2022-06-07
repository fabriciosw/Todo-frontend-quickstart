import { ITarefa } from '../interfaces/tarefa';
import HttpClient from './httpClient';

export function getAll(setTarefas: (x: ITarefa[]) => void): void {
  HttpClient.api
    .get('/tasks/')
    .then((response: { data: Array<ITarefa> }) => setTarefas(response.data));
  // .catch((error: string) =>
  //   console.log(error)
  // );
}

export function endTask(id: number, setTarefas: (x: ITarefa[]) => void): void {
  HttpClient.api.put(
      `/tasks/${id}`,
      {
        complete: true,
      }
    )
    .then(() => getAll(setTarefas));
  // .catch((error: string) => {
  //   console.log(error);
  // });
}

export function deleteTask(id: number, setTarefas: (x: ITarefa[]) => void): void {
  HttpClient.api
    .delete(`/tasks/${id}`)
    .then(() => {
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
  if (description.trim() === '')
    desc = 'Sem descrição';
  else
    desc = description;

  HttpClient.api
    .post(
      '/tasks/',
      {
        title,
        description: desc,
      },
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

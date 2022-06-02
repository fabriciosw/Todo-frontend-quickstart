import { createContext, useContext } from 'react';
import { ITarefa } from '../../interfaces/tarefa';

type Props = {
  tarefas: ITarefa[];
  setTarefas: (x: ITarefa[]) => void;
};

export const Tarefa = createContext<Props>({} as Props);

export const Tarefas = (): Props => useContext(Tarefa);

import React, { useContext } from 'react';
import { ITarefa } from '../../interfaces/tarefa';
import Trash from '../../statics/images/Trash.png';
import finish from '../../statics/images/finish.jpg';
import { Tarefa } from '../../contexts/TaskContext/index';
import * as todoServices from '../../services/todoServices';

interface Props {
  tarefa: ITarefa;
}

export default function Item({ tarefa }: Props): JSX.Element {
  const { setTarefas } = useContext(Tarefa);

  return (
    <div className={`tarefa${tarefa.complete ? ' finalizado' : ''}`} key={tarefa.id}>
      <div className="dados">
        <p>{tarefa.title}</p>
        <span>{tarefa.description}</span>
      </div>
      <div className="opcoes">
        {!tarefa.complete && (
          <button type="button" onClick={() => todoServices.endTask(tarefa.id, setTarefas)} className="button_item">
            <img src={finish} alt="terminar" />
          </button>
        )}

        <button type="button" onClick={() => todoServices.deleteTask(tarefa.id, setTarefas)} className="button_item">
          <img src={Trash} alt="deletar" />
        </button>
      </div>
    </div>
  );
}

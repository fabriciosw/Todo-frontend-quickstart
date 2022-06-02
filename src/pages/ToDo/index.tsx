import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../contexts/TaskContext';
import { ITarefa } from '../../interfaces/tarefa';
import Formulario from '../../components/Form';
import * as todoServices from '../../services/todoServices';
import Lista from '../../components/List';
import { logoutUser } from '../../services/userServices';
// import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const ToDo = (): JSX.Element => {
  const [taskStatus, setTaskStatus] = useState<boolean | undefined>(undefined);
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  // const { setIsAuthenticated } = AuthenticationContext();

  useEffect(() => {
    todoServices.getAll(setTarefas);
  }, []);

  function verFinalizadas(): void {
    setTaskStatus(true);
  }
  function verPendentes(): void {
    setTaskStatus(false);
  }
  function verTodas(): void {
    setTaskStatus(undefined);
  }
  return (
    <Tarefa.Provider value={{ tarefas, setTarefas }}>
      <div className="App">
        <div className="leftside">
          <div className="formbox">
            <Formulario />

            <div className="linha">
              <button type="button" onClick={() => verTodas()}>
                Ver Todas
              </button>
              <button type="button" onClick={() => verPendentes()}>
                Ver Pendentes
              </button>
              <button type="button" onClick={() => verFinalizadas()}>
                Ver Concluídas
              </button>
            </div>
            <button
              type="button"
              onClick={
                () => logoutUser()
                // setIsAuthenticated
              }
            >
              Deslogar
            </button>
          </div>
        </div>
        <div className="rightside">
          <h1 className="title">Tarefas</h1>
          <Lista taskStatus={taskStatus} />
        </div>
      </div>
    </Tarefa.Provider>
  );
};

export default ToDo;

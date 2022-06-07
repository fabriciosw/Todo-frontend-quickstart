import React, { useState } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

export default function Login({
  loginUser,
}: {
  loginUser: (
    evento: React.FormEvent<Element>,
    email: string,
    password: string,
    setIsAuthenticated: (x: boolean) => void
  ) => void;
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { setIsAuthenticated } = AuthenticationContext();

  return (
    <form onSubmit={(event) => loginUser(event, email, senha, setIsAuthenticated)}>
      <div className="campos">
        <label htmlFor="email">
          Digite seu email
          <input
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            required
          />
        </label>
        <label htmlFor="senha">
          Digite sua senha
          <input
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            type="password"
            name="senha"
            id="senha"
            placeholder="Senha"
            required
          />
        </label>
        <input type="submit" data-testid="logar" />
      </div>
    </form>
  );
}

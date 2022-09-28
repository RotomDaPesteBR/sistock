import { useState } from 'react';
import { signIn } from 'next-auth/react';
import LoginButton from './LoginButton/LoginButton';
import LoginInput from './LoginInput/LoginInput';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="titulo">SISTOCK</h1>
      <LoginInput
        id="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
      />
      <LoginInput
        id="password"
        name="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        type="password"
      />
      <LoginButton onClick={() => signIn()} type="submit" />
    </form>
  );
}

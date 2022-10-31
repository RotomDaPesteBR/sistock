import { useState } from 'react';
import { signIn } from 'next-auth/react';
import styled from 'styled-components';
import Link from 'next/link';
import LoginButton from './LoginButton/LoginButton';
import LoginInput from './LoginInput/LoginInput';
import LoginMethodsButton from './LoginButton/LoginMethodsButton';

const LoginDiv = styled.div`
  background: ${({ theme }) => theme.backgroundLogin};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 10px;
  width: 100%;
  height: 80vh;
  margin: 0;
  max-width: 40rem;
  max-height: 50rem;
  padding: 0 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 800px) {
    max-width: 30rem;
  }
  @media (max-width: 500px) {
    max-width: 25rem;
  }
  @media (max-width: 425px) {
    max-width: 22.5rem;
    padding: 0;
  }
`;

const LoginForm = styled.form`
  color: ${({ theme }) => theme.text};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginMethods = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    width: 85%;
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <LoginDiv>
      <LoginForm onSubmit={e => handleSubmit(e)}>
        <img className="logo" src="/logo.png" alt="" />
        <LoginInput
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <LoginInput
          id="password"
          name="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          type="password"
        />
        <Link href="/recover">Esqueceu a senha?</Link>
        <LoginButton
          onClick={() =>
            signIn('credentials', {
              callbackUrl: 'https://sistock.vercel.app/',
              // eslint-disable-next-line object-shorthand
              email: email,
              password: senha,
              redirect: false,
            })
          }
          type="submit"
        />
        <Link href="/register">Cadastre-se</Link>
        <LoginMethods>
          <LoginMethodsButton
            label="Google"
            onClick={() =>
              signIn('google', { callbackUrl: 'https://sistock.vercel.app' })
            }
          />
          <LoginMethodsButton
            label="Facebook"
            onClick={() =>
              signIn('facebook', { callbackUrl: 'https://sistock.vercel.app' })
            }
          />
        </LoginMethods>
      </LoginForm>
    </LoginDiv>
  );
}

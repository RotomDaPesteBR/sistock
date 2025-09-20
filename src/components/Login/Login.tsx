import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import LoginButton from './LoginButton/LoginButton';
import LoginMethodsButton from './LoginButton/LoginMethodsButton';
import LoginInput from './LoginInput/LoginInput';
import PasswordInput from './LoginInput/PasswordInput';

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
  min-height: 40rem;
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

const ToastContent = styled.div`
  text-align: center;
`;

const TogglePassword = styled.button`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: #ffffff;
  border: 0;
  @media (max-width: 500px) {
    right: 0.75rem;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  @media (max-width: 500px) {
    width: 80%;
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleLogin() {
    if (email !== '' && senha !== '') {
      const res = await signIn('credentials', {
        callbackUrl: 'https://sistock.vercel.app/',
        // eslint-disable-next-line object-shorthand
        email: email.toLowerCase(),
        password: senha,
        redirect: false
      });
      if (res.ok) {
        Router.push('/dashboard');
      } else {
        toast(
          <ToastContent>
            Verifique se o email ou senha foram digitados corretamente
          </ToastContent>
        );
      }
    } else {
      toast(<ToastContent>Informe email e senha</ToastContent>);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleLogin();
  }

  return (
    <LoginDiv>
      <Toaster />
      <LoginForm onSubmit={e => handleSubmit(e)}>
        <img className="logo" src="/logo.png" alt="" draggable={false} />
        <LoginInput
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <PasswordContainer>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            type={passwordVisible ? 'text' : 'password'}
          />
          <TogglePassword
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            <img
              src={passwordVisible ? '/view.png' : '/hide.png'}
              alt="Password visibility toggle"
              draggable={false}
            />
          </TogglePassword>
        </PasswordContainer>
        <Link href="/recover">
          <div className="loginLabel">Esqueceu a senha?</div>
        </Link>
        <LoginButton type="submit" />
        <Link href="/signup">
          <div className="loginLabel">Cadastre-se</div>
        </Link>
        <LoginMethods>
          <LoginMethodsButton
            method="Google"
            type="button"
            onClick={() =>
              signIn('google', {
                callbackUrl: 'https://sistock.vercel.app'
              })
            }
          />
          <LoginMethodsButton
            method="Facebook"
            type="button"
            onClick={() =>
              signIn('facebook', { callbackUrl: 'https://sistock.vercel.app' })
            }
          />
        </LoginMethods>
      </LoginForm>
    </LoginDiv>
  );
}

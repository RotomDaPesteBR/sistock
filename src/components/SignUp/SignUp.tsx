import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import SignUpButton from './SignUpButton/SignUpButton';
import PasswordInput from './SignUpInput/PasswordInput';
import SignUpInput from './SignUpInput/SignUpInput';

const SignUpDiv = styled.div`
  background: ${({ theme }) => theme.backgroundLogin};
  position: relative;
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

const Back = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
  height: 4rem;
  width: 4rem;
  flex-direction: row;
  cursor: pointer;
`;

const SignUpForm = styled.form`
  color: ${({ theme }) => theme.text};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  font-size: 3rem;
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

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSignUp() {
    if (
      nome !== '' &&
      email !== '' &&
      senha !== '' &&
      nomeEstabelecimento !== ''
    ) {
      const dados = {
        name: nome,
        email,
        password: senha,
        establishmentName: nomeEstabelecimento
      };
      const promise = await axios
        .post('api/db/auth/signup', { data: { ...dados } })
        .then(response => response.data)
        .catch(error => error.response);
      console.log(promise);
      if (promise.status !== 500) {
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
          Router.push('/login');
        }
      } else {
        toast(
          <ToastContent>
            Verifique se todos os campos foram digitados corretamente
          </ToastContent>
        );
      }
    } else {
      toast(<ToastContent>Informe email e senha</ToastContent>);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Toaster />
      <SignUpDiv>
        <Link href="/login">
          <Back>
            <img src="/back.svg" alt="" />
          </Back>
        </Link>
        <SignUpForm onSubmit={e => handleSubmit(e)}>
          <Title>Cadastre-se</Title>
          <SignUpInput
            id="name"
            name="name"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            type="text"
          />
          <SignUpInput
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
              />
            </TogglePassword>
          </PasswordContainer>
          <SignUpInput
            id="restaurantName"
            name="restaurantName"
            placeholder="Nome do estabelecimento"
            value={nomeEstabelecimento}
            onChange={e => setNomeEstabelecimento(e.target.value)}
            type="text"
          />
          <SignUpButton onClick={() => handleSignUp()} type="submit" />
        </SignUpForm>
      </SignUpDiv>
    </>
  );
}

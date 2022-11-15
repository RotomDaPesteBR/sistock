import axios from 'axios';
import Router from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import Notifier, { notify } from '../Notifier/loginNotifier';
import SignUpButton from './SignUpButton/SignUpButton';
import SignUpInput from './SignUpInput/SignUpInput';

const SignUpDiv = styled.div`
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

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');

  const [notifierRef, setNotifierRef] = useState({
    animation: undefined,
    expire: undefined
  });

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
      if (promise === 'Conta criada com sucesso') {
        Router.push('/dashboard');
      } else {
        const ref = notify(
          'Verifique se todos os campos foram digitados corretamente',
          5000,
          notifierRef
        );
        setNotifierRef(ref);
      }
    } else {
      const ref = notify('Informe email e senha', 5000, notifierRef);
      setNotifierRef(ref);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <SignUpDiv>
      <Notifier />
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
        <SignUpInput
          id="password"
          name="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          type="password"
        />
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
  );
}

import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import SignUpButton from './RecoverButton/RequestButton';
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

export default function Recover() {
  const [email, setEmail] = useState('');

  async function handleRecover() {
    if (email !== '') {
      const dados = {
        email
      };
      const promise = await axios
        .post('api/db/auth/requestRecover', { data: { ...dados } })
        .then(response => response.data)
        .catch(error => error.response);
      if (promise.status !== 500) {
        toast('Email de recuperação enviado com sucesso');
      } else {
        toast('Conta não encontrada');
      }
    } else {
      toast('Os campos não podem estar vazios');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleRecover();
  }

  return (
    <SignUpDiv>
      <Toaster />
      <SignUpForm onSubmit={e => handleSubmit(e)}>
        <Title>Recuperar senha</Title>
        <SignUpInput
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <SignUpButton type="submit" />
      </SignUpForm>
    </SignUpDiv>
  );
}

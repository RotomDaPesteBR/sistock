import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import RecoverButton from './RecoverButton/RequestButton';
import RecoverInput from './RecoverInput/RecoverInput';

const RecoverDiv = styled.div`
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
  position: relative;
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

const RecoverForm = styled.form`
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
  text-align: center;
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

const ToastContent = styled.div`
  text-align: center;
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
        toast(
          <ToastContent>Email de recuperação enviado com sucesso</ToastContent>
        );
      } else {
        toast(<ToastContent>Conta não encontrada</ToastContent>);
      }
    } else {
      toast(<ToastContent>Os campos não podem estar vazios</ToastContent>);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleRecover();
  }

  return (
    <RecoverDiv>
      <Toaster />
      <Link href="/login">
        <Back>
          <img src="/back.svg" alt="" draggable={false} />
        </Back>
      </Link>
      <RecoverForm onSubmit={e => handleSubmit(e)}>
        <Title>Recuperar senha</Title>
        <RecoverInput
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <RecoverButton type="submit" />
      </RecoverForm>
    </RecoverDiv>
  );
}

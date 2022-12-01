import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import RecoverButton from './RecoverButton/ResetButton';
import PasswordInput from './RecoverInput/PasswordInput';
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

export default function Recover() {
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  async function handleRecover() {
    if (senha !== '' && confirmSenha !== '') {
      if (senha === confirmSenha) {
        const dados = {
          password: senha,
          token
        };
        const promise = await axios
          .post('/api/db/auth/recover', { data: { ...dados } })
          .then(response => response.data)
          .catch(error => error.response);
        if (promise.status !== 500) {
          toast(<ToastContent>Senha redefinida com sucesso</ToastContent>);
        } else {
          toast(<ToastContent>Erro, tente novamente mais tarde</ToastContent>);
        }
      } else {
        toast(<ToastContent>As senhas não coincidem</ToastContent>);
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
      <RecoverForm onSubmit={e => handleSubmit(e)}>
        <Title>Redefinir senha</Title>
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
        <PasswordContainer>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Confirmar senha"
            value={confirmSenha}
            onChange={e => setConfirmSenha(e.target.value)}
            type={confirmPasswordVisible ? 'text' : 'password'}
          />
          <TogglePassword
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <img
              src={confirmPasswordVisible ? '/view.png' : '/hide.png'}
              alt="Password visibility toggle"
            />
          </TogglePassword>
        </PasswordContainer>
        <RecoverButton type="submit" />
      </RecoverForm>
    </RecoverDiv>
  );
}

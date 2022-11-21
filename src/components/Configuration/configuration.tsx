import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { darken } from 'polished';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginMethodsButton from '../Login/LoginButton/LoginMethodsButton';

const Configuration = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 70rem;
  height: auto;
  padding: 1.5%;
  flex-direction: column;
  font-size: 1rem;
  @media (max-width: 800px) {
    font-size: 0.75rem;
    justify-content: start;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
  background: ${({ theme }) => darken(0.01, theme.background)};
  padding: 5rem;
  @media (max-width: 800px) {
    flex-wrap: wrap;
    padding: 2rem;
    height: 100%;
  }
`;

const ProfilePicture = styled.div`
  height: 10rem;
  width: 12.5rem;
  @media (max-width: 800px) {
    width: 10rem;
  }
  & img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;

const ProfileInfo = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProfileInfoItem = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileInfoLabel = styled.div`
  font-size: 1rem;
`;

const ProfileInfoEdit = styled.button`
  width: 10rem;
  padding: 0.25rem;
  border: 0;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
`;

const AccountLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
  background: ${({ theme }) => darken(0.01, theme.background)};
`;

/* const Input = styled.input`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`; */

const LoginMethods = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    width: 85%;
  }
`;

const ModalScreen = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  top: 0;
  bottom: 0;
  background: #00000055;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 90%;
  height: 40%;
  max-width: 30rem;
  border-radius: 10px;
  @media (max-width: 500px) {
    height: 50%;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const Title = styled.h1`
  padding: 1rem;
  padding-top: 0;
  font-size: 2.5rem;
  text-align: center;
`;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

export default function Configuracao() {
  // const [user, setUser] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  // const [senha, setSenha] = useState('');
  // const [imagem, setImagem] = useState('');
  const [establishmentName, setEstablishmentName] = useState('');

  const [nomeModal, showNomeModal] = useState(false);
  const [emailModal, showEmailModal] = useState(false);
  const [establishmentModal, showEstablishmentModal] = useState(false);

  const [nomeInput, setNomeInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');

  const session = useSession();

  async function getProviders(user) {
    const promise = await axios
      .post('api/db/configuration/providers', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    console.log(promise);
  }

  async function getUser(usuario) {
    const promise = await axios
      .post('api/db/config', { data: usuario.id })
      .then(response => response.data)
      .catch(error => error.response);
    setNome(promise.name ? promise.name : '');
    setEmail(promise.email ? promise.email : '');
    // setSenha(promise.password ? promise.password : '');
    // setImagem(promise.image ? promise.image : '');
    setEstablishmentName(
      promise.establishmentName ? promise.establishmentName : ''
    );
  }

  /* async function saveUser(data, usuario) {
    const promise = await axios
      .post('api/db/register/config', { data: { ...data, user: usuario.id } })
      .then(response => response.data)
      .catch(error => error.response);
    console.log(promise);
  } */

  /* function handleClick() {
    const dados = {
      nome,
      email,
      senha,
      imagem,
      establishmentName: establishmentName
    };
    saveUser(dados, session.data.user);
  } */

  function handleClickScreen() {
    showNomeModal(false);
    showEmailModal(false);
    showEstablishmentModal(false);
  }

  function handleClickModal(e) {
    e.stopPropagation();
  }

  function toggleNomeModal() {
    showNomeModal(true);
    showEmailModal(false);
    showEstablishmentModal(false);
    setNomeInput('');
    setSenhaInput('');
  }

  function toggleEmailModal() {
    showNomeModal(false);
    showEmailModal(true);
    showEstablishmentModal(false);
    setNomeInput('');
    setSenhaInput('');
  }

  function toggleEstablishmentModal() {
    showNomeModal(false);
    showEmailModal(false);
    showEstablishmentModal(true);
    setNomeInput('');
    setSenhaInput('');
  }

  useEffect(() => {
    getProviders(session.data.user);
    getUser(session.data.user);
  }, []);

  return (
    <Configuration>
      {nomeModal ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Nome:</Title>
              <Input
                type="text"
                placeholder="Nome"
                value={nomeInput}
                onChange={e => setNomeInput(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Senha"
                value={senhaInput}
                onChange={e => setSenhaInput(e.target.value)}
              />
              <Buttons>
                <Button
                  type="button"
                  id="cancelar"
                  onClick={() => handleClickScreen()}
                >
                  Cancelar
                </Button>
                <Button type="button" id="confirmar">
                  Salvar
                </Button>
              </Buttons>
            </Form>
          </Modal>
        </ModalScreen>
      ) : null}
      {emailModal ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Email:</Title>
              <Input
                type="email"
                placeholder="Email"
                value={nomeInput}
                onChange={e => setNomeInput(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Senha"
                value={senhaInput}
                onChange={e => setSenhaInput(e.target.value)}
              />
              <Buttons>
                <Button
                  type="button"
                  id="cancelar"
                  onClick={() => handleClickScreen()}
                >
                  Cancelar
                </Button>
                <Button type="button" id="confirmar">
                  Salvar
                </Button>
              </Buttons>
            </Form>
          </Modal>
        </ModalScreen>
      ) : null}
      {establishmentModal ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Nome do estabelecimento:</Title>
              <Input
                type="text"
                placeholder="Nome do estabelecimento"
                value={nomeInput}
                onChange={e => setNomeInput(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Senha"
                value={senhaInput}
                onChange={e => setSenhaInput(e.target.value)}
              />
              <Buttons>
                <Button
                  type="button"
                  id="cancelar"
                  onClick={() => handleClickScreen()}
                >
                  Cancelar
                </Button>
                <Button type="button" id="confirmar">
                  Salvar
                </Button>
              </Buttons>
            </Form>
          </Modal>
        </ModalScreen>
      ) : null}
      <ProfileContainer>
        <ProfilePicture>
          <img
            src={
              session.data.user.image
                ? session.data.user.image
                : '/blank-profile.png'
            }
            alt=""
            draggable={false}
          />
        </ProfilePicture>
        <ProfileInfo>
          <ProfileInfoItem>
            <ProfileInfoLabel>{nome}</ProfileInfoLabel>
            <ProfileInfoEdit onClick={() => toggleNomeModal()}>
              Editar
            </ProfileInfoEdit>
          </ProfileInfoItem>
          <ProfileInfoItem>
            <ProfileInfoLabel>{email}</ProfileInfoLabel>
            <ProfileInfoEdit onClick={() => toggleEmailModal()}>
              Editar
            </ProfileInfoEdit>
          </ProfileInfoItem>
          <ProfileInfoItem>
            <ProfileInfoLabel>{establishmentName}</ProfileInfoLabel>
            <ProfileInfoEdit onClick={() => toggleEstablishmentModal()}>
              Editar
            </ProfileInfoEdit>
          </ProfileInfoItem>
        </ProfileInfo>
      </ProfileContainer>
      <AccountLinksContainer>
        <LoginMethods>
          <LoginMethodsButton
            method="Google"
            onClick={() =>
              signIn('google', {
                callbackUrl: 'https://sistock.vercel.app'
              })
            }
          />
          <LoginMethodsButton
            method="Facebook"
            onClick={() =>
              signIn('facebook', { callbackUrl: 'https://sistock.vercel.app' })
            }
          />
        </LoginMethods>
      </AccountLinksContainer>
      {/* <Input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Imagem"
        value={imagem}
        onChange={e => setImagem(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Nome do Establishmente"
        value={establishmentName}
        onChange={e => setEstablishmentName(e.target.value)}
      />
      <Button type="button" onClick={() => handleClick()}>
        Salvar
      </Button> */}
    </Configuration>
  );
}

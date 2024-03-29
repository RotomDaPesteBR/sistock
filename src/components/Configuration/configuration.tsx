import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { darken } from 'polished';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

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
    padding-top: 75px;
  }
`;

const Space = styled.div`
  padding: 0;
  @media (max-width: 800px) {
    padding: 10px;
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
  @media (max-width: 800px) {
    padding: 0;
  }
`;

const ProfileInfoItem = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ProfileInfoLabel = styled.div`
  font-size: 1rem;
  white-space: nowrap;
  @media (max-width: 800px) {
    padding-bottom: 0.5rem;
  }
`;

const ProfileInfoEdit = styled.button`
  width: 10rem;
  padding: 0.4rem;
  border: 0;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  @media (max-width: 800px) {
    width: 100%;
    max-width: 15rem;
  }
`;

const AccountLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
  margin-top: 20px;
  padding: 2rem;
  background: ${({ theme }) => darken(0.01, theme.background)};
  @media (max-width: 500px) {
    height: 100%;
  }
`;

const AccountLinksTitle = styled.div`
  font-size: 2rem;
  padding-bottom: 1rem;
`;

const AccountLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LinkContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  color: ${({ theme }) => theme.textDark};
`;

const LinkImage = styled.img`
  height: 4rem;
  padding: 0.5rem;
`;

const LinkStatus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  border: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
`;

const LinkButton = styled.button`
  font-size: 1.2rem;
  background: white;
  width: 12rem;
  height: 12rem;
  border-radius: 10px;
  margin: 0.5rem;
  text-align: center;
  border: 0;
  color: ${({ theme }) => theme.text};
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const LinkButtons = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

const ModalScreen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #00000055;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 90%;
  height: 40%;
  min-height: 25rem;
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
  @media (max-width: 500px) {
    font-size: 2rem;
  }
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
  @media (max-width: 800px) {
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

const ToastContent = styled.div`
  text-align: center;
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

  const [googleProvider, setGoogleProvider] = useState(false);
  const [facebookProvider, setFacebookProvider] = useState(false);

  const session = useSession();
  const Router = useRouter();

  async function getProviders(user) {
    const promise = await axios
      .post('api/db/configuration/providers', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    promise.forEach(p => {
      if (p.provider === 'google') {
        setGoogleProvider(true);
      }
      if (p.provider === 'facebook') {
        setFacebookProvider(true);
      }
    });
  }

  async function saveName(dados, user) {
    if (nomeInput !== '' && senhaInput !== '') {
      const promise = await axios
        .post('api/db/configuration/name', {
          data: { ...dados, user: user.id }
        })
        .then(response => response.data)
        .catch(error => error.response);
      if (promise.status !== 500) {
        Router.reload();
      } else {
        toast(<ToastContent>Senha incorreta, tente novamente</ToastContent>);
      }
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
    }
  }

  async function saveEmail(dados, user) {
    if (nomeInput !== '' && senhaInput !== '') {
      const promise = await axios
        .post('api/db/configuration/email', {
          data: { ...dados, user: user.id }
        })
        .then(response => response.data)
        .catch(error => error.response);

      if (promise.status !== 500) {
        Router.reload();
      } else {
        toast(<ToastContent>Senha incorreta, tente novamente</ToastContent>);
      }
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
    }
  }

  async function saveEstablishmentName(dados, user) {
    if (nomeInput !== '' && senhaInput !== '') {
      const promise = await axios
        .post('api/db/configuration/establishmentName', {
          data: { ...dados, user: user.id }
        })
        .then(response => response.data)
        .catch(error => error.response);

      if (promise.status !== 500) {
        Router.reload();
      } else {
        toast(<ToastContent>Senha incorreta, tente novamente</ToastContent>);
      }
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
    }
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
      promise.establishmentName ? promise.establishmentName : 'Estabelecimento'
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

  function handleSaveName() {
    const dados = {
      name: nomeInput,
      password: senhaInput
    };
    saveName(dados, session.data.user);
  }

  function handleSaveEmail() {
    const dados = {
      email: nomeInput,
      password: senhaInput
    };
    saveEmail(dados, session.data.user);
  }

  function handleSaveEstablishmentName() {
    const dados = {
      establishmentName: nomeInput,
      password: senhaInput
    };
    saveEstablishmentName(dados, session.data.user);
  }

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
      <Toaster />
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
                <Button
                  type="button"
                  id="confirmar"
                  onClick={() => handleSaveName()}
                >
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
                <Button
                  type="button"
                  id="confirmar"
                  onClick={() => handleSaveEmail()}
                >
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
                <Button
                  type="button"
                  id="confirmar"
                  onClick={() => handleSaveEstablishmentName()}
                >
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
        <AccountLinksTitle>Conexões</AccountLinksTitle>
        <AccountLinks>
          <LinkButtons>
            <LinkButton
              className={googleProvider ? 'vinculado' : ''}
              disabled={googleProvider}
              onClick={() =>
                signIn('google', {
                  callbackUrl: 'https://sistock.vercel.app'
                })
              }
            >
              <LinkContent>
                <LinkImage src="/google.svg" alt="" />
              </LinkContent>
              <LinkStatus
                className={
                  googleProvider ? 'status-vinculado' : 'status-desvinculado'
                }
              >
                {googleProvider ? 'Vinculado' : 'Vincular'}
              </LinkStatus>
            </LinkButton>
            <LinkButton
              className={facebookProvider ? 'vinculado' : ''}
              disabled={facebookProvider}
              onClick={() =>
                signIn('facebook', {
                  callbackUrl: 'https://sistock.vercel.app'
                })
              }
            >
              <LinkContent>
                <LinkImage src="/facebook.svg" alt="" />
              </LinkContent>
              <LinkStatus
                className={
                  facebookProvider ? 'status-vinculado' : 'status-desvinculado'
                }
              >
                {facebookProvider ? 'Vinculado' : 'Vincular'}
              </LinkStatus>
            </LinkButton>
          </LinkButtons>
        </AccountLinks>
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
      <Space />
    </Configuration>
  );
}

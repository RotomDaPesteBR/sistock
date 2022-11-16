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
`;

const ProfileInfoLabel = styled.div`
  font-size: 1rem;
`;

const ProfileInfoEdit = styled.button`
  width: 10rem;
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

export default function Configuracao() {
  // const [user, setUser] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  // const [senha, setSenha] = useState('');
  // const [imagem, setImagem] = useState('');
  const [establishmentName, setEstablishmentName] = useState('');

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

  useEffect(() => {
    getProviders(session.data.user);
    getUser(session.data.user);
  }, []);

  return (
    <Configuration>
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
            <ProfileInfoEdit>Editar</ProfileInfoEdit>
          </ProfileInfoItem>
          <ProfileInfoItem>
            <ProfileInfoLabel>{email}</ProfileInfoLabel>
            <ProfileInfoEdit>Editar</ProfileInfoEdit>
          </ProfileInfoItem>
          <ProfileInfoItem>
            <ProfileInfoLabel>{establishmentName}</ProfileInfoLabel>
            <ProfileInfoEdit>Editar</ProfileInfoEdit>
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

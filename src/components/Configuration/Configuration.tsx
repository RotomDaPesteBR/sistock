import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
`;

export default function Configuracao() {
  // const [user, setUser] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [imagem, setImagem] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [CPF, setCPF] = useState('');
  const session = useSession();

  async function getUser(usuario) {
    const promise = await axios
      .post('api/db/config', { data: usuario.id })
      .then(response => response.data)
      .catch(error => error.response);
    setNome(promise.name ? promise.name : '');
    setEmail(promise.email ? promise.email : '');
    setSenha(promise.password ? promise.password : '');
    setImagem(promise.image ? promise.image : '');
    setRestaurantName(promise.restaurantName ? promise.restaurantName : '');
    setCPF(promise.cpf ? promise.cpf : '');
  }

  async function saveUser(data, usuario) {
    const promise = await axios
      .post('api/db/register/config', { data: { ...data, user: usuario.id } })
      .then(response => response.data)
      .catch(error => error.response);
    console.log(promise);
  }

  function handleClick() {
    const dados = {
      nome,
      email,
      senha,
      imagem,
      restaurantName,
      CPF
    };
    saveUser(dados, session.data.user);
  }

  useEffect(() => {
    getUser(session.data.user);
  }, []);

  return (
    <Form>
      <Input
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
        placeholder="Nome do Restaurante"
        value={restaurantName}
        onChange={e => setRestaurantName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="CPF"
        value={CPF}
        onChange={e => setCPF(e.target.value)}
      />
      <Button type="button" onClick={() => handleClick()}>
        Salvar
      </Button>
    </Form>
  );
}

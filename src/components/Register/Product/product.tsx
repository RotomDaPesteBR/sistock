import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
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

export default function CadastrarProdutos() {
  // const [products, setProducts] = useState([]);
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [unidade, setUnidade] = useState('');
  const [limite, setLimite] = useState(0);
  const session = useSession();

  async function getProducts(data, user) {
    const promise = await axios
      .post('api/db/register/products', { data: { ...data, user: user.id } })
      .then(response => response.data)
      .catch(error => error.response);
    console.log(promise);
  }

  function handleClick() {
    const dados = {
      nome,
      marca,
      unidade,
      limite
    };
    getProducts(dados, session.data.user);
  }

  return (
    <Form>
      <Input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Marca"
        value={marca}
        onChange={e => setMarca(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Unidade"
        value={unidade}
        onChange={e => setUnidade(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Limite"
        value={limite}
        onChange={e => setLimite(parseInt(e.target.value, 10))}
      />
      <Button type="button" onClick={() => handleClick()}>
        Cadastrar
      </Button>
    </Form>
  );
}

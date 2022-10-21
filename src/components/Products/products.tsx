import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Produto from './Product/product';

const Lista = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 70rem;
  height: auto;
  padding: 1rem;
  flex-direction: column;
  font-size: 1rem;
  margin-top: 3.4375rem;
  @media (max-width: 800px) {
    font-size: 0.75rem;
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
`;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: #999999;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`

const Button = styled.button`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: #999999;
`;

export default function Produtos(props) {
  const [products, setProducts] = useState('');
  const [insert, showInsert] = useState(false);
  const [withdraw, showWithdraw] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [quantity, setQuantity] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [motivo, setMotivo] = useState('');

  const session = useSession();

  function insertModal(product) {
    showInsert(true);
    showWithdraw(false);
    setQuantity(undefined);
    setValue(undefined);
    setMotivo('');
    setSelectedProduct(product);
  }

  function withdrawModal(product) {
    showInsert(false);
    showWithdraw(true);
    setQuantity(undefined);
    setValue(undefined);
    setMotivo('');
    setSelectedProduct(product);
  }

  async function getProducts(user) {
    const promise = await axios
      .post('api/db/products', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      const result = promise.map(product => (
        <Produto
          key={product.id}
          product={product}
          insertModal={() => insertModal(product)}
          withdrawModal={() => withdrawModal(product)}
        />
      ));
      setProducts(result);
    }
  }

  function handleClickScreen() {
    showInsert(false);
    showWithdraw(false);
  }

  function handleClickModal(e) {
    e.stopPropagation();
  }

  async function handleAdicionar(product, user) {
    const data = new Date().toISOString();
    const quantidade = product.stock + parseInt(quantity, 10);
    const dados = {
      product: product.id,
      quantity: quantidade,
      addedQuantity: parseInt(quantity, 10),
      value: parseInt(value, 10),
      date: data,
      user: user.id
    };
    const promise = await axios
      .post('api/db/product/insert', { data: dados })
      .then(response => response.data)
      .catch(error => error.response);
    console.log(promise);
  }

  async function handleRemover(product, user) {
    const data = new Date().toISOString();
    const quantidade = product.stock - parseInt(quantity, 10);
    const dados = {
      product: product.id,
      quantity: quantidade,
      withdrawQuantity: parseInt(quantity, 10),
      motive: motivo,
      date: data,
      user: user.id
    };
    const promise = await axios
      .post('api/db/product/withdraw', { data: dados })
      .then(response => response.data)
      .catch(error => error.response);
    console.log(promise);
  }

  useEffect(() => {
    getProducts(session.data.user);
  }, []);

  return (
    <Lista {...props}>
      {insert ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Adicionar</Title>
              <Input
                type="number"
                placeholder="Quantidade"
                value={quantity === undefined ? '' : quantity}
                onChange={e => setQuantity(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Valor"
                value={value === undefined ? '' : value}
                onChange={e => setValue(e.target.value)}
              />
              <Buttons>
                <Button
                  type="button"
                  id="cancelar"
                  onClick={() =>
                    handleClickScreen()
                  }
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  id="confirmar"
                  onClick={() =>
                    handleAdicionar(selectedProduct, session.data.user)
                  }
                >
                  Adicionar
                </Button>
              </Buttons>
            </Form>
          </Modal>
        </ModalScreen>
      ) : null}
      {withdraw ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Remover</Title>
              <Input
                type="number"
                placeholder="Quantidade"
                value={quantity === undefined ? '' : quantity}
                onChange={e => setQuantity(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Motivo"
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
              />
              <Buttons>
                <Button
                  type="button"
                  id="cancelar"
                  onClick={() =>
                    handleClickScreen()
                  }
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  id="confirmar"
                  onClick={() =>
                    handleRemover(selectedProduct, session.data.user)
                  }
                >
                  Remover
                </Button>
              </Buttons>
            </Form>
          </Modal>
        </ModalScreen>
      ) : null}
      <div className="0" id="SafeArea">
        <h1>Produtos:</h1>
      </div>
      {products}
    </Lista>
  );
}

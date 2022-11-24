import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import Notifier, { notify } from '../Notifier/notifier';
import Produto from './Product/product';

import 'react-datepicker/dist/react-datepicker.css';

const Lista = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 70rem;
  height: auto;
  padding: 1rem;
  flex-direction: column;
  font-size: 1rem;
  @media (max-width: 800px) {
    font-size: 0.75rem;
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
  left: 0;
  right: 0;
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
  min-height: 25rem;
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

const Select = styled.select`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const Picker = styled(DatePicker)`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  margin-left: 0;
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

export default function Produtos(props) {
  const [products, setProducts] = useState('');
  const [insert, showInsert] = useState(false);
  const [withdraw, showWithdraw] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [quantity, setQuantity] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [motivo, setMotivo] = useState('');
  const [date, setDate] = useState(new Date());

  const [notifierRef, setNotifierRef] = useState({
    animation: undefined,
    expire: undefined
  });

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
          getProducts={() => getProducts(session.data.user)}
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
    if (
      quantity !== '' &&
      value !== '' &&
      quantity !== undefined &&
      value !== undefined
    ) {
      const data = date.toISOString();
      const quant = product.stock + parseInt(quantity, 10);
      const quantidade = quant >= 0 ? quant : 0;
      const dados = {
        product: product.id,
        quantity: quantidade,
        addedQuantity: parseInt(quantity, 10),
        value: parseInt(value, 10),
        date: data,
        user: user.id
      };
      await axios
        .post('api/db/product/insert', { data: dados })
        .then(response => response.data)
        .catch(error => error.response);
      getProducts(session.data.user);
      const ref = notify('Adicionado com sucesso', 5000, notifierRef);
      setNotifierRef(ref);
      setQuantity(undefined);
      setValue(undefined);
      setDate(new Date());
    } else {
      const ref = notify('Preencha todos os campos', 5000, notifierRef);
      setNotifierRef(ref);
    }
  }

  async function handleRemover(product, user) {
    if (quantity !== '' && motivo !== '' && quantity !== undefined) {
      const data = date.toISOString();
      const quant = product.stock - parseInt(quantity, 10);
      const quantidade = quant >= 0 ? quant : 0;
      const dados = {
        product: product.id,
        quantity: quantidade,
        withdrawQuantity: parseInt(quantity, 10),
        motive: motivo,
        date: data,
        user: user.id
      };
      await axios
        .post('api/db/product/withdraw', { data: dados })
        .then(response => response.data)
        .catch(error => error.response);
      const ref = notify('Removido com sucesso', 5000, notifierRef);
      setNotifierRef(ref);
      getProducts(session.data.user);
      setQuantity(undefined);
      setMotivo('');
      setDate(new Date());
    } else {
      const ref = notify('Preencha todos os campos', 5000, notifierRef);
      setNotifierRef(ref);
    }
  }

  function validate(e) {
    const ev = e || window.event;
    let key = ev.keyCode || ev.which;
    key = String.fromCharCode(key);
    const regex = /[0-9]/;
    if (!regex.test(key)) {
      ev.returnValue = false;
      if (ev.preventDefault) ev.preventDefault();
    }
  }

  useEffect(() => {
    getProducts(session.data.user);
  }, []);

  return (
    <>
      <Notifier />
      <Lista {...props}>
        {insert ? (
          <ModalScreen onClick={() => handleClickScreen()}>
            <Modal onClick={e => handleClickModal(e)}>
              <Form>
                <Title>Adicionar</Title>
                <Input
                  type="number"
                  placeholder="Quantidade"
                  onKeyPress={e => validate(e)}
                  value={quantity === undefined ? '' : quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Valor Unitário"
                  onKeyPress={e => validate(e)}
                  value={value === undefined ? '' : value}
                  onChange={e => setValue(e.target.value)}
                />
                <Picker
                  id="date-picker"
                  placeholder="Data"
                  selected={date}
                  onChange={e => setDate(e)}
                  dateFormat="dd/MM/yyyy"
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
                  onKeyPress={e => validate(e)}
                  value={quantity === undefined ? '' : quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
                <Select
                  placeholder="Motivo"
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                >
                  <option value="" label="Motivo" />
                  <option value="Uso">Uso</option>
                  <option value="Perda">Perda</option>
                </Select>
                <Picker
                  className="date-picker"
                  placeholder="Data"
                  selected={date}
                  onChange={e => setDate(e)}
                  dateFormat="dd/MM/yyyy"
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
          <h1>Estoque:</h1>
        </div>
        {products}
      </Lista>
    </>
  );
}

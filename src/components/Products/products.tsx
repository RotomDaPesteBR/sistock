import axios from 'axios';
import ptBR from 'date-fns/locale/pt-BR';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Produto from './Product/product';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

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

const SaveButton = styled.button`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary};
  border: 0;
  color: white;
`;

const ToastContent = styled.div`
  text-align: center;
`;

export default function Produtos({ initial }) {
  type InsertModal = (product: any) => any;
  type WithdrawModal = (product: any) => any;
  type GetProducts = (user: any) => any;

  const session = useSession();

  const [products, setProducts] = useState(() => {
    const result = initial.map(product => (
      <Produto
        key={product.id}
        product={product}
        insertModal={() => InsertModal(product)}
        withdrawModal={() => WithdrawModal(product)}
        getProducts={() => GetProducts(session.data.user)}
      />
    ));
    return result;
  });
  const [insert, showInsert] = useState(false);
  const [withdraw, showWithdraw] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [quantity, setQuantity] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [motivo, setMotivo] = useState('');
  const [date, setDate] = useState(new Date());

  // eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare
  const InsertModal: InsertModal = function insertModal(product) {
    showInsert(true);
    showWithdraw(false);
    setQuantity(undefined);
    setValue(undefined);
    setMotivo('');
    setSelectedProduct(product);
  };

  // eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare
  const WithdrawModal: WithdrawModal = function withdrawModal(product) {
    showInsert(false);
    showWithdraw(true);
    setQuantity(undefined);
    setValue(undefined);
    setMotivo('');
    setSelectedProduct(product);
  };

  // eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare
  const GetProducts: GetProducts = async function getProducts(user) {
    const promise = await axios
      .post('api/db/products', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      const actives = _.filter(promise, ['active', true]);
      const result = actives.map(product => (
        <Produto
          key={product.id}
          product={product}
          insertModal={() => InsertModal(product)}
          withdrawModal={() => WithdrawModal(product)}
          getProducts={() => GetProducts(session.data.user)}
        />
      ));
      setProducts(result);
    }
  };

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
      GetProducts(session.data.user);
      toast(<ToastContent>Adicionado com sucesso</ToastContent>);
      setQuantity(undefined);
      setValue(undefined);
      setDate(new Date());
      showInsert(false);
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
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
      toast(<ToastContent>Removido com sucesso</ToastContent>);
      GetProducts(session.data.user);
      setQuantity(undefined);
      setMotivo('');
      setDate(new Date());
      showWithdraw(false);
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
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
    GetProducts(session.data.user);
  }, []);

  return (
    <>
      <Toaster />
      <Lista>
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
                  locale="pt-BR"
                />
                <Buttons>
                  <Button
                    type="button"
                    id="cancelar"
                    onClick={() => handleClickScreen()}
                  >
                    Cancelar
                  </Button>
                  <SaveButton
                    type="button"
                    id="confirmar"
                    onClick={() =>
                      handleAdicionar(selectedProduct, session.data.user)
                    }
                  >
                    Adicionar
                  </SaveButton>
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
                  required
                  className="motivo"
                  placeholder="Motivo"
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                >
                  <option value="" label="Motivo" disabled hidden />
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
                  <SaveButton
                    type="button"
                    id="confirmar"
                    onClick={() =>
                      handleRemover(selectedProduct, session.data.user)
                    }
                  >
                    Remover
                  </SaveButton>
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

import axios from 'axios';
import ptBR from 'date-fns/locale/pt-BR';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import Venda from './Good/good';

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

export default function Goods(props) {
  const [goods, setGoods] = useState('');
  const [insert, showInsert] = useState(false);
  const [selectedGood, setSelectedGood] = useState([]);
  const [quantity, setQuantity] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [date, setDate] = useState(new Date());

  const session = useSession();

  function insertModal(good) {
    showInsert(true);
    setQuantity(undefined);
    setValue(undefined);
    setDate(new Date());
    setSelectedGood(good);
  }

  async function getGoods(user) {
    const promise = await axios
      .post('api/db/goods', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      const actives = _.filter(promise, ['active', true]);
      const result = actives.map(good => (
        <Venda
          key={good.id}
          good={good}
          insertModal={() => insertModal(good)}
          getGoods={() => getGoods(session.data.user)}
        />
      ));
      setGoods(result);
    }
  }

  function handleClickScreen() {
    showInsert(false);
  }

  function handleClickModal(e) {
    e.stopPropagation();
  }

  async function handleAdicionar(good, user) {
    if (
      value !== '' &&
      value !== undefined &&
      quantity !== '' &&
      quantity !== undefined
    ) {
      const data = date.toISOString();
      const dados = {
        good: good.id,
        value: parseFloat(value),
        quantity: parseInt(quantity, 10),
        date: data,
        user: user.id
      };
      await axios
        .post('api/db/good/insert', { data: dados })
        .then(response => response.data)
        .catch(error => error.response);
      getGoods(session.data.user);
      toast(<ToastContent>Venda registrada com sucesso</ToastContent>);
      setValue(undefined);
      setQuantity(undefined);
      setDate(new Date());
      showInsert(false);
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
    }
  }

  useEffect(() => {
    getGoods(session.data.user);
  }, []);

  return (
    <>
      <Toaster />
      <Lista {...props}>
        {insert ? (
          <ModalScreen onClick={() => handleClickScreen()}>
            <Modal onClick={e => handleClickModal(e)}>
              <Form>
                <Title>Venda</Title>
                <Input
                  type="number"
                  placeholder="Valor Unitário"
                  value={value === undefined ? '' : value}
                  onChange={e => setValue(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Quantidade"
                  value={quantity === undefined ? '' : quantity}
                  onChange={e => setQuantity(e.target.value)}
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
                      handleAdicionar(selectedGood, session.data.user)
                    }
                  >
                    Vender
                  </SaveButton>
                </Buttons>
              </Form>
            </Modal>
          </ModalScreen>
        ) : null}
        <div className="0" id="SafeArea">
          <h1>Mercadorias:</h1>
        </div>
        {goods}
      </Lista>
    </>
  );
}

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import Notifier, { notify } from '../Notifier/notifier';
import Venda from './Expense/expense';

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

export default function Expenses(props) {
  const [expenses, setExpenses] = useState('');
  const [insert, showInsert] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState([]);
  const [value, setValue] = useState(undefined);
  const [date, setDate] = useState(new Date());

  const [notifierRef, setNotifierRef] = useState({
    animation: undefined,
    expire: undefined
  });

  const session = useSession();

  function insertModal(expense) {
    showInsert(true);
    setValue(undefined);
    setDate(new Date());
    setSelectedExpense(expense);
  }

  async function getExpenses(user) {
    const promise = await axios
      .post('api/db/expenses', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      const result = promise.map(expense => (
        <Venda
          key={expense.id}
          expense={expense}
          insertModal={() => insertModal(expense)}
          getExpenses={() => getExpenses(session.data.user)}
        />
      ));
      setExpenses(result);
    }
  }

  function handleClickScreen() {
    showInsert(false);
  }

  function handleClickModal(e) {
    e.stopPropagation();
  }

  async function handleAdicionar(expense, user) {
    if (value !== '' && value !== undefined) {
      const data = date.toISOString();
      const dados = {
        date: data,
        value: parseFloat(value),
        expense: expense.id,
        user: user.id
      };
      await axios
        .post('api/db/expense/insert', { data: dados })
        .then(response => response.data)
        .catch(error => error.response);
      getExpenses(session.data.user);
      const ref = notify('Despesa inserida com sucesso', 5000, notifierRef);
      setNotifierRef(ref);
      setValue(undefined);
      setDate(new Date());
    } else {
      const ref = notify('Preencha todos os campos', 5000, notifierRef);
      setNotifierRef(ref);
    }
  }

  useEffect(() => {
    getExpenses(session.data.user);
  }, []);

  return (
    <>
      <Notifier />
      <Lista {...props}>
        {insert ? (
          <ModalScreen onClick={() => handleClickScreen()}>
            <Modal onClick={e => handleClickModal(e)}>
              <Form>
                <Title>Inserir</Title>
                <Input
                  type="number"
                  placeholder="Valor"
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
                      handleAdicionar(selectedExpense, session.data.user)
                    }
                  >
                    Inserir
                  </Button>
                </Buttons>
              </Form>
            </Modal>
          </ModalScreen>
        ) : null}
        <div className="0" id="SafeArea">
          <h1>Despesas:</h1>
        </div>
        {expenses}
      </Lista>
    </>
  );
}

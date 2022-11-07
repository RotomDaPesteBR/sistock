import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Venda from './Expense/expense';

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
  const [quantity, setQuantity] = useState(undefined);
  const [value, setValue] = useState(undefined);

  const session = useSession();

  function insertModal(expense) {
    showInsert(true);
    setQuantity(undefined);
    setValue(undefined);
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
    const data = new Date().toISOString();
    const dados = {
      expense: expense.id,
      value: parseFloat(value),
      quantity: parseInt(quantity, 10),
      date: data,
      user: user.id
    };
    const promise = await axios
      .post('api/db/expense/insert', { data: dados })
      .then(response => response.data)
      .catch(error => error.response);
    console.log(promise);
    getExpenses(session.data.user);
  }

  useEffect(() => {
    getExpenses(session.data.user);
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
                placeholder="Valor"
                value={value === undefined ? '' : value}
                onChange={e => setValue(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Quantidade"
                value={quantity === undefined ? '' : quantity}
                onChange={e => setQuantity(e.target.value)}
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
                  Adicionar
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
  );
}

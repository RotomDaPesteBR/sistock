import axios from 'axios';
import ptBR from 'date-fns/locale/pt-BR';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import Venda from './Expense/expense';

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

export default function Expenses(props?) {
  const { initial } = props;

  type InsertModal = (expense: any) => any;
  type GetExpenses = (user: any) => any;

  const session = useSession();
  const [expenses, setExpenses] = useState(() =>
    initial.map(expense => (
      <Venda
        key={expense.id}
        expense={expense}
        insertModal={() => InsertModal(expense)}
        getExpenses={() => GetExpenses(session.data.user)}
      />
    ))
  );
  const [insert, showInsert] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState([]);
  const [value, setValue] = useState(undefined);
  const [date, setDate] = useState(new Date());

  // eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare
  const InsertModal: InsertModal = function insertModal(expense) {
    showInsert(true);
    setValue(undefined);
    setDate(new Date());
    setSelectedExpense(expense);
  };

  // eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare
  const GetExpenses: GetExpenses = async function getExpenses(user) {
    const promise = await axios
      .post('api/db/expenses', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      const actives = _.filter(promise, ['active', true]);
      const result = actives.map(expense => (
        <Venda
          key={expense.id}
          expense={expense}
          insertModal={() => InsertModal(expense)}
          getExpenses={() => GetExpenses(session.data.user)}
        />
      ));
      setExpenses(result);
    }
  };

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
      GetExpenses(session.data.user);
      toast(<ToastContent>Despesa inserida com sucesso</ToastContent>);
      setValue(undefined);
      setDate(new Date());
      showInsert(false);
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
    }
  }

  useEffect(() => {
    GetExpenses(session.data.user);
  }, []);

  return (
    <>
      <Toaster />
      <Lista>
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
                      handleAdicionar(selectedExpense, session.data.user)
                    }
                  >
                    Inserir
                  </SaveButton>
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

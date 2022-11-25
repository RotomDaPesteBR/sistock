import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HistoricProduct from './Historic/historicProduct';
import HistoricGood from './Historic/historicGood';
import HistoricExpense from './Historic/historicExpense';

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

const HeaderLista = styled.div`
  width: 90%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const HeaderItem = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default function Historicos(props) {
  const [historicProductIn, setHistoricProductIn] = useState('');
  const [historicProductOut, setHistoricProductOut] = useState('');
  const [historicMercadorias, setHistoricMercadorias] = useState('');
  const [historicDespesas, setHistoricDespesas] = useState('');

  const [historicProducts, toggleHistoricProducts] = useState(true);
  const [historicGoods, toggleHistoricGoods] = useState(false);
  const [historicExpenses, toggleHistoricExpenses] = useState(false);

  const [historicoProduto, toggleHistoricoProduto] = useState(false);

  const session = useSession();

  async function getHistoricProducts(user) {
    const promiseProductIn = await axios
      .post('api/db/historic/productIn', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    const promiseProductOut = await axios
      .post('api/db/historic/productOut', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promiseProductIn?.status !== 500) {
      let stripe = false;
      const resultProductIn = promiseProductIn.map(historic => {
        stripe = !stripe;
        return (
          <HistoricProduct
            key={historic.id}
            historic={historic}
            stripe={stripe}
            type="in"
          />
        );
      });
      setHistoricProductIn(resultProductIn);
    }
    if (promiseProductOut?.status !== 500) {
      let stripe = false;
      const resultProductOut = promiseProductOut.map(historic => {
        stripe = !stripe;
        return (
          <HistoricProduct
            key={historic.id}
            historic={historic}
            stripe={stripe}
            type="out"
          />
        );
      });
      setHistoricProductOut(resultProductOut);
    }
  }

  async function getHistoricGoods(user) {
    const promiseGoods = await axios
      .post('api/db/historic/goodsRec', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promiseGoods?.status !== 500) {
      let stripe = false;
      const resultProductIn = promiseGoods.map(historic => {
        stripe = !stripe;
        return (
          <HistoricGood
            key={historic.id}
            historic={historic}
            stripe={stripe}
            type="in"
          />
        );
      });
      setHistoricMercadorias(resultProductIn);
    }
  }

  async function getHistoricExpenses(user) {
    const promiseGoods = await axios
      .post('api/db/historic/expensesRec', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promiseGoods?.status !== 500) {
      let stripe = false;
      const resultProductIn = promiseGoods.map(historic => {
        stripe = !stripe;
        return (
          <HistoricExpense
            key={historic.id}
            historic={historic}
            stripe={stripe}
            type="in"
          />
        );
      });
      setHistoricDespesas(resultProductIn);
    }
  }

  function handleClickProducts() {
    toggleHistoricProducts(true);
    toggleHistoricGoods(false);
    toggleHistoricExpenses(false);
  }

  function handleClickGoods() {
    toggleHistoricProducts(false);
    toggleHistoricGoods(true);
    toggleHistoricExpenses(false);
  }

  function handleClickExpenses() {
    toggleHistoricProducts(false);
    toggleHistoricGoods(false);
    toggleHistoricExpenses(true);
  }

  function handleClick(e) {
    toggleHistoricoProduto(e);
  }

  useEffect(() => {
    getHistoricProducts(session.data.user);
    getHistoricGoods(session.data.user);
    getHistoricExpenses(session.data.user);
  }, []);

  return (
    <Lista {...props}>
      <div id="SafeArea">
        <h1>Histórico:</h1>
      </div>
      <HeaderLista>
        <HeaderItem
          className={historicProducts ? 'selected' : ''}
          onClick={() => handleClickProducts()}
          style={{ cursor: 'pointer' }}
        >
          Estoque
        </HeaderItem>
        <HeaderItem
          className={historicGoods ? 'selected' : ''}
          onClick={() => handleClickGoods()}
          style={{ cursor: 'pointer' }}
        >
          Vendas
        </HeaderItem>
        <HeaderItem
          className={historicExpenses ? 'selected' : ''}
          onClick={() => handleClickExpenses()}
          style={{ cursor: 'pointer' }}
        >
          Despesas
        </HeaderItem>
      </HeaderLista>
      <br />
      {historicProducts ? (
        <>
          <HeaderLista>
            <HeaderItem
              className={!historicoProduto ? 'selected' : ''}
              onClick={() => handleClick(false)}
              style={{ cursor: 'pointer' }}
            >
              Entrada
            </HeaderItem>
            <HeaderItem
              className={historicoProduto ? 'selected' : ''}
              onClick={() => handleClick(true)}
              style={{ cursor: 'pointer' }}
            >
              Saida
            </HeaderItem>
          </HeaderLista>
          <br />
          {!historicoProduto ? (
            <>
              <HeaderLista>
                <HeaderItem>Produto</HeaderItem>
                <HeaderItem>Valor</HeaderItem>
                <HeaderItem>Quantidade</HeaderItem>
                <HeaderItem>Data</HeaderItem>
              </HeaderLista>
              {historicProductIn}
            </>
          ) : null}
          {historicoProduto ? (
            <>
              <HeaderLista>
                <HeaderItem>Produto</HeaderItem>
                <HeaderItem>Quantidade</HeaderItem>
                <HeaderItem>Motivo</HeaderItem>
                <HeaderItem>Data</HeaderItem>
              </HeaderLista>
              {historicProductOut}
            </>
          ) : null}
        </>
      ) : null}
      {historicGoods ? (
        <>
          <HeaderLista>
            <HeaderItem>Mercadoria</HeaderItem>
            <HeaderItem>Valor</HeaderItem>
            <HeaderItem>Quantidade</HeaderItem>
            <HeaderItem>Data</HeaderItem>
          </HeaderLista>
          {historicMercadorias}
        </>
      ) : null}
      {historicExpenses ? (
        <>
          <HeaderLista>
            <HeaderItem>Despesa</HeaderItem>
            <HeaderItem>Valor</HeaderItem>
            <HeaderItem>Data</HeaderItem>
          </HeaderLista>
          {historicDespesas}
        </>
      ) : null}
    </Lista>
  );
}

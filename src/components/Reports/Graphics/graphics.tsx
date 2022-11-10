import axios from 'axios';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { darken } from 'polished';
import { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

Chart.register(CategoryScale);

const GraphicsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => darken(0.01, theme.background)};
  flex-direction: column;
  font-size: 1rem;
  padding: 1.5%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const Graphic = styled.div`
  background: white;
  height: 25rem;
  padding-bottom: 3rem;
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Graficos = styled.div`
  padding: 1rem;
  padding-left: 10rem;
  padding-right: 10rem;
  height: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    padding-left: 6rem;
    padding-right: 6rem;
  }
  @media (max-width: 1000px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  @media (max-width: 800px) {
    padding: 1rem;
    height: 15rem;
  }
`;

const Titulo = styled.h2`
  text-align: center;
  padding: 1rem;
  padding-bottom: 0;
`;

const Faturamento = styled(Bar)`
  height: 100%;
  width: 100%;
`;

const Relatório = styled(Bar)`
  height: 100%;
  width: 100%;
`;

export default function graphics() {
  const [meses, setMeses] = useState([
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]);

  const mesesList = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  const chartRef = useRef();

  const session = useSession();

  async function getExpenses(user) {
    const promise = await axios
      .post('api/db/historic/expensesRec', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      /* const expensesLastMonth = _.filter(promise, item => {
        const data = new Date();
        const oldData = new Date(item.date);
        const i = data.getTime() - oldData.getTime();
        const x = Math.ceil(i / (1000 * 3600 * 24));
        console.log(x);
        return x <= 30;
      }); */
      // const ano = new Date().getFullYear;
      const mes = new Date().getFullYear;
      const expensesByYear = _.groupBy(promise, item => {
        const year = new Date(item.date).getFullYear();
        return year;
      });
      const expensesLastYear = _.groupBy(promise, item => {
        const data = new Date();
        const oldData = new Date(item.date);
        const i = data.getTime() - oldData.getTime();
        const x = Math.ceil(i / (1000 * 3600 * 24));
        return x <= 365;
      });
      const expensesByMonth = _.groupBy(expensesLastYear.true, item => {
        const mesE = new Date(item.date).getMonth();
        return mesE;
      });
      const arrayExpensesLastYearValue = Object.values(expensesByMonth);
      const expensesLastYearValue = _.sum(
        arrayExpensesLastYearValue.map(e => e[0].value)
      );
      const arrayExpensesLastMonth = expensesByMonth[mes];
      // const expensesLastMonth = _.sum(arrayExpensesLastMonth[0].value);

      console.log(expensesByYear);
      console.log(expensesLastYear);
      console.log(expensesByMonth);
      console.log(expensesLastYearValue);
      console.log(arrayExpensesLastMonth);
    }
  }

  async function getGoods(user) {
    const promise = await axios
      .post('api/db/historic/goodsRec', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      /* const result = promise.map(product => (
        <Produto
          key={product.id}
          product={product}
          insertModal={() => insertModal(product)}
          withdrawModal={() => withdrawModal(product)}
          getProducts={() => getProducts(session.data.user)}
        />
      ));
      setProducts(result); */
      console.log(promise);
    }
  }

  function listMonths() {
    const month = new Date().getMonth();
    const i = 11 - month;
    const monthsA = _.take(mesesList, month + 1);
    const monthsB = _.takeRight(mesesList, i);
    const months = _.concat(monthsB, monthsA);
    console.log(months);
    setMeses(months);
  }

  useEffect(() => {
    getExpenses(session.data.user);
    getGoods(session.data.user);
    listMonths();
  }, []);

  const relatorioData = {
    labels: [...meses],
    datasets: [
      {
        label: 'Relatório',
        data: [
          1500, 1300, 1100, 1400, 1600, 1200, 1900, 2100, 1500, 2000, 1300, 1800
        ],
        backgroundColor: ['rgba(32, 170, 255, 0.2)'],
        borderColor: ['rgba(32, 170, 255, 1)'],
        borderWidth: 1
      }
    ]
  };

  const faturamentoData = {
    labels: [...meses],
    datasets: [
      {
        label: 'Faturamento',
        data: [
          1200, 1900, 2100, 1500, 2000, 1300, 1900, 2100, 1500, 2000, 1300, 2400
        ],
        backgroundColor: ['rgba(0, 255, 0, 0.2)'],
        borderColor: ['rgba(0, 255, 0, 1)'],
        borderWidth: 1
      }
    ]
  };

  return (
    <GraphicsContainer>
      <Graphic>
        <Titulo>RELATÓRIO GERAL</Titulo>
        <Graficos>
          <Relatório
            datasetIdKey="relatorio"
            data={relatorioData}
            ref={chartRef}
            width={400}
            options={{
              responsive: true,
              maintainAspectRatio: false
            }}
          />
        </Graficos>
      </Graphic>
      <Graphic>
        <Titulo>FATURAMENTO</Titulo>
        <Graficos>
          <Faturamento
            datasetIdKey="faturamento"
            data={faturamentoData}
            ref={chartRef}
            width={400}
            options={{
              responsive: true,
              maintainAspectRatio: false
            }}
          />
        </Graficos>
      </Graphic>
    </GraphicsContainer>
  );
}

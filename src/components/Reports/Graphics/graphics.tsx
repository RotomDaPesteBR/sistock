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
  /* const [meses, setMeses] = useState([
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
  ]); */
  const [faturamento, setFaturamento] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [geral, setGeral] = useState([]);

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

  const mes = new Date().getMonth();

  const chartRef = useRef();

  const session = useSession();

  /* type ReportType = {
    [i: number]: { month: string; value: number };
  }; */

  type RecordType = {
    id: string;
    date: number;
    value: number;
    quantity: number;
  };

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
      // const mes = new Date().getMonth();
      /* const expensesByYear = _.groupBy(promise, item => {
        const year = new Date(item.date).getFullYear();
        return year;
      }); */
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
      const formatedExpensesByMonth = Object.values(mesesList).map((e, i) => {
        const format = {
          month: e,
          value: expensesByMonth[i]
            ? _.sum(
                Object.values(expensesByMonth[i]).map(
                  (n: RecordType) => n.value
                )
              )
            : 0
        };

        return format;
      });
      // const arrayExpensesLastYearValue = Object.values(expensesByMonth);
      /* const expensesLastYearValue = _.sum(
        arrayExpensesLastYearValue.map((e: MapType) =>
          _.sum(e.map(n => n.value))
        )
      );
      const arrayExpensesLastMonth = Object.values(expensesByMonth[mes]);
      const expensesLastMonth = _.sum(arrayExpensesLastMonth.map(e => e.value)); */

      // console.log(expensesByYear);
      // console.log(expensesLastYear);
      // console.log(arrayExpensesLastYearValue);
      // console.log(expensesLastYearValue);
      // console.log(arrayExpensesLastMonth);
      // console.log(expensesLastMonth);
      const i = 11 - mes;
      const monthsA = _.take(formatedExpensesByMonth, mes + 1);
      const monthsB = _.takeRight(formatedExpensesByMonth, i);
      const months = _.concat(monthsB, monthsA);

      setDespesas(months);
    }
  }

  async function getGoods(user) {
    const promise = await axios
      .post('api/db/historic/goodsRec', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      const goodsLastYear = _.groupBy(promise, item => {
        const data = new Date();
        const oldData = new Date(item.date);
        const i = data.getTime() - oldData.getTime();
        const x = Math.ceil(i / (1000 * 3600 * 24));
        return x <= 365;
      });
      const goodsByMonth = _.groupBy(goodsLastYear.true, item => {
        const mesE = new Date(item.date).getMonth();
        return mesE;
      });
      const formatedGoodsByMonth = Object.values(mesesList).map((e, i) => {
        const format = {
          month: e,
          value: goodsByMonth[i]
            ? _.sum(
                Object.values(goodsByMonth[i]).map(
                  (n: RecordType) => n.value * n.quantity
                )
              )
            : 0
        };
        return format;
      });
      const i = 11 - mes;
      const monthsA = _.take(formatedGoodsByMonth, mes + 1);
      const monthsB = _.takeRight(formatedGoodsByMonth, i);
      const months = _.concat(monthsB, monthsA);

      setFaturamento(months);
    }
  }

  /* function listMonths() {
    const month = new Date().getMonth();
    const i = 11 - month;
    const monthsA = _.take(mesesList, month + 1);
    const monthsB = _.takeRight(mesesList, i);
    const months = _.concat(monthsB, monthsA);
    setMeses(months);
  } */

  function getGeneral() {
    const general = faturamento.map((e, i) => {
      const format = { month: e.month, value: e.value - despesas[i].value };
      return format;
    });
    setGeral(general);
  }

  useEffect(() => {
    getExpenses(session.data.user);
    getGoods(session.data.user);
    // listMonths();
  }, []);

  useEffect(() => getGeneral(), [faturamento, despesas]);

  // const expensesLabel = despesas.map(e => e.month);
  // const expensesData = despesas.map(e => e.value);

  const generalLabel = geral.map(e => e.month);
  const generalData = geral.map(e => e.value);

  const relatorioData = {
    labels: [...generalLabel],
    datasets: [
      {
        label: 'Relatório',
        data: [...generalData],
        backgroundColor: ['rgba(32, 170, 255, 0.2)'],
        borderColor: ['rgba(32, 170, 255, 1)'],
        borderWidth: 1
      }
    ]
  };

  const goodsLabel = faturamento.map(e => e.month);
  const goodsData = faturamento.map(e => e.value);

  const faturamentoData = {
    labels: [...goodsLabel],
    datasets: [
      {
        label: 'Faturamento',
        data: [...goodsData],
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

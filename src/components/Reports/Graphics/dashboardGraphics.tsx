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

const Graphics = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 70rem;
  background: ${({ theme }) => darken(0.01, theme.background)};
  height: auto;
  padding: 1.5%;
  flex-direction: column;
  font-size: 1rem;
  @media (max-width: 800px) {
    font-size: 0.75rem;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
`;

const Button = styled.button`
  border: 0;
  width: 50%;
  height: 6rem;
  font-size: 1.2rem;
  text-align: center;
  @media (max-width: 800px) {
    height: 4rem;
    font-size: 0.75rem;
  }
`;

const Graphic = styled.div`
  background: white;
  height: 20rem;
  @media (max-width: 800px) {
    height: 15rem;
  }
`;

const Graficos = styled.div`
  padding: 1rem;
  padding-left: 10rem;
  padding-right: 10rem;
  height: 100%;
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

const Relatório = styled(Bar)`
  height: 100%;
  width: 100%;
`;

const Faturamento = styled(Bar)`
  height: 100%;
  width: 100%;
`;

export default function graphics() {
  const [activeGraphic, toggleActiveGraphic] = useState(true);
  const [showRelatorio, activateRelatorio] = useState('active');
  const [showFaturamento, activateFaturamento] = useState('');

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

  const session = useSession();

  const chartRef = useRef();

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
  }, []);

  useEffect(() => getGeneral(), [faturamento, despesas]);

  function setShowRelatorio() {
    toggleActiveGraphic(true);
    activateRelatorio('active');
    activateFaturamento('');
  }

  function setShowFaturamento() {
    toggleActiveGraphic(false);
    activateRelatorio('');
    activateFaturamento('active');
  }

  const generalLabel = geral.map(e => e.month);
  const generalData = geral.map(e => e.value);
  const generalColor = geral.map(e =>
    e.value >= 0 ? 'rgba(32, 170, 255, 0.2)' : 'rgba(255, 0, 0, 0.2)'
  );

  const generalBorder = geral.map(e =>
    e.value >= 0 ? 'rgba(32, 170, 255, 1)' : 'rgb(255, 0, 0)'
  );

  const relatorioData = {
    labels: [...generalLabel],
    datasets: [
      {
        label: 'Relatório',
        data: [...generalData],
        backgroundColor: [...generalColor],
        borderColor: [...generalBorder],
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
    <Graphics>
      <Container>
        <Buttons>
          <Button
            className={showRelatorio}
            type="button"
            onClick={() => setShowRelatorio()}
          >
            Relatório Geral
          </Button>
          <Button
            className={showFaturamento}
            type="button"
            onClick={() => setShowFaturamento()}
          >
            Faturamento
          </Button>
        </Buttons>
        <Graphic>
          <Graficos>
            {activeGraphic ? (
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
            ) : null}
            {!activeGraphic ? (
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
            ) : null}
          </Graficos>
        </Graphic>
      </Container>
    </Graphics>
  );
}

import axios from 'axios';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { darken } from 'polished';
import { useEffect, useRef, useState } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import styled from 'styled-components';

Chart.register(CategoryScale);

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  font-size: 1rem;
  padding: 1.5%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const GraphicsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => darken(0.01, theme.background)};
  flex-direction: column;
  font-size: 1rem;
  padding: 1.5%;
`;

const Graphic = styled.div`
  background: white;
  height: 100%;
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Graficos = styled.div`
  padding: 1rem;
  padding-left: 10rem;
  padding-right: 10rem;
  height: 25rem;
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

const Info = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 100%;
  max-height: 20rem;
  padding: 2.5rem;
  padding-top: 1rem;
  @media (max-width: 800px) {
    padding: 2.5rem;
    padding-top: 0;
    flex-wrap: wrap;
    max-height: 100%;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const FaturamentoColumn = styled.div`
  height: 100%;
  width: 50%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const InfoTitle = styled.div`
  font-size: 2rem;
  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

const InfoItems = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  overflow: auto;
  @media (max-width: 800px) {
    font-size: 0.75rem;
    padding: 0.5rem;
    max-height: 5rem;
  }
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.1rem;
  justify-content: space-between;
`;

const Space = styled.div`
  padding: 0.5rem;
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
  const [faturamentoPorMes, setFaturamentoPorMes] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [despesasPorMes, setDespesasPorMes] = useState([]);
  const [despesasProdutos, setDespesasProdutos] = useState([]);
  const [despesasProdutosPorMes, setDespesasProdutosPorMes] = useState([]);
  const [geral, setGeral] = useState([]);

  const [relatorioInfo, setRelatorioInfo] = useState([]);
  const [produtosInfo, setProdutosInfo] = useState([]);
  const [despesasInfo, setDespesasInfo] = useState([]);
  const [faturamentoInfo, setFaturamentoInfo] = useState([]);

  const [relatorioInfoVisibility, setRelatorioInfoVisibility] = useState(false);
  const [faturamentoInfoVisibility, setFaturamentoInfoVisibility] =
    useState(false);

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

  const relatorioRef = useRef();
  const faturamentoRef = useRef();

  const session = useSession();

  /* type ReportType = {
    [i: number]: { month: string; value: number };
  }; */

  type RecordType = {
    forEach(arg0: (r: any, m: any) => void): any;
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
      const fExpensesByMonth = Object.values(mesesList).map((e, i) => {
        const group = _.groupBy(expensesByMonth[i], item => item.expenses.name);
        const grouped = group;
        const groupkeys = Object.keys(group);

        let m = 0;
        Object.values(group).forEach((n: RecordType) => {
          n.forEach(r => {
            grouped[groupkeys[m]] = r.value;
            m += 1;
          });
        });
        const format = expensesByMonth[i] ? grouped : {};

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

      const monthsC = _.take(fExpensesByMonth, mes + 1);
      const monthsD = _.takeRight(fExpensesByMonth, i);
      const byMonths = _.concat(monthsD, monthsC);

      setDespesas(months);
      setDespesasPorMes(byMonths);
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

      const fGoodsByMonth = Object.values(mesesList).map((e, i) => {
        const group = _.groupBy(goodsByMonth[i], item => item.prodsale.name);
        const grouped = group;
        const groupkeys = Object.keys(group);
        Object.values(group).forEach((n: RecordType) =>
          _.sum(
            n.forEach((r, m) => {
              grouped[groupkeys[m]] = r.value * r.quantity;
            })
          )
        );
        const format = goodsByMonth[i] ? grouped : {};

        return format;
      });

      const i = 11 - mes;
      const monthsA = _.take(formatedGoodsByMonth, mes + 1);
      const monthsB = _.takeRight(formatedGoodsByMonth, i);
      const months = _.concat(monthsB, monthsA);

      const monthsC = _.take(fGoodsByMonth, mes + 1);
      const monthsD = _.takeRight(fGoodsByMonth, i);
      const byMonths = _.concat(monthsD, monthsC);

      setFaturamento(months);
      setFaturamentoPorMes(byMonths);
    }
  }

  async function getProductExpenses(user) {
    const promise = await axios
      .post('api/db/historic/productExpenses', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      const productExpensesLastYear = _.groupBy(promise, item => {
        const data = new Date();
        const oldData = new Date(item.date);
        const i = data.getTime() - oldData.getTime();
        const x = Math.ceil(i / (1000 * 3600 * 24));
        return x <= 365;
      });
      const productExpensesByMonth = _.groupBy(
        productExpensesLastYear.true,
        item => {
          const mesE = new Date(item.date).getMonth();
          return mesE;
        }
      );
      const formatedProductExpensesByMonth = Object.values(mesesList).map(
        (e, i) => {
          const format = {
            month: e,
            value: productExpensesByMonth[i]
              ? _.sum(
                  Object.values(productExpensesByMonth[i]).map(
                    (n: RecordType) => n.value * n.quantity
                  )
                )
              : 0
          };
          return format;
        }
      );

      const fProductExpensesByMonth = Object.values(mesesList).map((e, i) => {
        const group = _.groupBy(
          productExpensesByMonth[i],
          item => `${item.product.name} ${item.product.brand}`
        );
        const grouped = group;
        const groupkeys = Object.keys(group);

        let m = 0;
        Object.values(group).forEach((n: RecordType) => {
          n.forEach(r => {
            grouped[groupkeys[m]] = r.value * r.quantity;
          });
          m += 1;
        });
        const format = productExpensesByMonth[i] ? grouped : {};

        return format;
      });

      const i = 11 - mes;
      const monthsA = _.take(formatedProductExpensesByMonth, mes + 1);
      const monthsB = _.takeRight(formatedProductExpensesByMonth, i);
      const months = _.concat(monthsB, monthsA);

      const monthsC = _.take(fProductExpensesByMonth, mes + 1);
      const monthsD = _.takeRight(fProductExpensesByMonth, i);
      const byMonths = _.concat(monthsD, monthsC);

      setDespesasProdutos(months);
      setDespesasProdutosPorMes(byMonths);
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
      const format = {
        month: e.month,
        value:
          e.value -
          (despesas[i] ? despesas[i].value : 0) -
          (despesasProdutos[i] ? despesasProdutos[i].value : 0)
      };
      return format;
    });
    setGeral(general);
  }

  function showRelatorioInfo(element) {
    const { index } = element;
    setRelatorioInfo(faturamentoPorMes[index]);
    setProdutosInfo(despesasProdutosPorMes[index]);
    setDespesasInfo(despesasPorMes[index]);
    if (
      faturamentoPorMes[index] === relatorioInfo &&
      despesasProdutosPorMes[index] === produtosInfo &&
      despesasPorMes[index] === despesasInfo
    ) {
      setRelatorioInfoVisibility(false);
      setRelatorioInfo([]);
      setProdutosInfo([]);
      setDespesasInfo([]);
    } else {
      setRelatorioInfoVisibility(true);
    }
  }

  function showFaturamentoInfo(element) {
    const { index } = element;
    setFaturamentoInfo(faturamentoPorMes[index]);
    if (faturamentoPorMes[index] === faturamentoInfo) {
      setFaturamentoInfoVisibility(false);
      setFaturamentoInfo([]);
    } else {
      setFaturamentoInfoVisibility(true);
    }
  }

  useEffect(() => {
    getExpenses(session.data.user);
    getGoods(session.data.user);
    getProductExpenses(session.data.user);
    // listMonths();
  }, []);

  useEffect(() => getGeneral(), [faturamento, despesas, despesasProdutos]);

  // const expensesLabel = despesas.map(e => e.month);
  // const expensesData = despesas.map(e => e.value);

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
    <Container>
      <GraphicsContainer>
        <Graphic>
          <Titulo>RELATÓRIO GERAL</Titulo>
          <Graficos>
            <Relatório
              datasetIdKey="relatorio"
              data={relatorioData}
              ref={relatorioRef}
              width={400}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
              onClick={event => {
                const { current: chart } = relatorioRef;

                if (!chart) {
                  return null;
                }

                const element = getElementAtEvent(chart, event);

                if (!element.length) return null;

                showRelatorioInfo(element[0]);
                //

                // console.log(goodsLabel[index], goodsData[index]);

                return event;

                // printDatasetAtEvent(getDatasetAtEvent(chart, event));
                // printElementAtEvent(getElementAtEvent(chart, event));
                // printElementsAtEvent(getElementsAtEvent(chart, event));
              }}
            />
          </Graficos>
          {relatorioInfoVisibility ? (
            <Info>
              {!_.isEmpty(relatorioInfo) ? (
                <InfoColumn>
                  <InfoTitle>Vendas:</InfoTitle>
                  <InfoItems>
                    {Object.values(relatorioInfo).map((e, i) => (
                      <InfoItem key={Object.keys(relatorioInfo)[i]}>{`${
                        Object.keys(relatorioInfo)[i]
                      }: R$${e.toFixed(2).replace(/\./, ',')}`}</InfoItem>
                    ))}
                  </InfoItems>
                </InfoColumn>
              ) : null}
              {!_.isEmpty(produtosInfo) ? (
                <InfoColumn>
                  <InfoTitle>Produtos:</InfoTitle>
                  <InfoItems>
                    {Object.values(produtosInfo).map((e, i) => (
                      <InfoItem key={Object.keys(produtosInfo)[i]}>{`${
                        Object.keys(produtosInfo)[i]
                      }: R$${e.toFixed(2).replace(/\./, ',')}`}</InfoItem>
                    ))}
                  </InfoItems>
                </InfoColumn>
              ) : null}
              {!_.isEmpty(despesasInfo) ? (
                <InfoColumn>
                  <InfoTitle>Despesas:</InfoTitle>
                  <InfoItems>
                    {Object.values(despesasInfo).map((e, i) => (
                      <InfoItem key={Object.keys(despesasInfo)[i]}>{`${
                        Object.keys(despesasInfo)[i]
                      }: R$${e.toFixed(2).replace(/\./, ',')}`}</InfoItem>
                    ))}
                    {Object.values(despesasInfo).map((e, i) => (
                      <InfoItem key={Object.keys(despesasInfo)[i]}>{`${
                        Object.keys(despesasInfo)[i]
                      }: R$${e.toFixed(2).replace(/\./, ',')}`}</InfoItem>
                    ))}
                  </InfoItems>
                </InfoColumn>
              ) : null}
            </Info>
          ) : null}
        </Graphic>
      </GraphicsContainer>
      <Space />
      <GraphicsContainer>
        <Graphic>
          <Titulo>FATURAMENTO</Titulo>
          <Graficos>
            <Faturamento
              datasetIdKey="faturamento"
              data={faturamentoData}
              ref={faturamentoRef}
              width={400}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
              onClick={event => {
                const { current: chart } = faturamentoRef;

                if (!chart) {
                  return null;
                }

                const element = getElementAtEvent(chart, event);

                if (!element.length) return null;

                showFaturamentoInfo(element[0]);

                return event;
              }}
            />
          </Graficos>
        </Graphic>
        {faturamentoInfoVisibility ? (
          <Info>
            <FaturamentoColumn>
              <InfoColumn>
                <InfoTitle>Faturamento:</InfoTitle>
                <InfoItems>
                  {Object.values(faturamentoInfo).map((e, i) => (
                    <InfoItem key={Object.keys(faturamentoInfo)[i]}>
                      <div>{`${Object.keys(faturamentoInfo)[i]}:`}</div>{' '}
                      <div>{`R$${e.toFixed(2).replace(/\./, ',')}`}</div>
                    </InfoItem>
                  ))}
                </InfoItems>
              </InfoColumn>
            </FaturamentoColumn>
          </Info>
        ) : null}
      </GraphicsContainer>
    </Container>
  );
}

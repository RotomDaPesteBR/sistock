import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { darken } from 'polished';
import { useRef, useState } from 'react';
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
  padding: 5%;
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
    height: 100%;
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

const relatorioData = {
  labels: [
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
  ],
  datasets: [
    {
      label: 'Relatório',
      data: [0, 0, 0, 0, 0, 1200, 1900, 2100, 1500, 2000, 1300],
      backgroundColor: ['rgba(32, 170, 255, 0.2)'],
      borderColor: ['rgba(32, 170, 255, 1)'],
      borderWidth: 1
    }
  ]
};

const faturamentoData = {
  labels: [
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
  ],
  datasets: [
    {
      label: 'Faturamento',
      data: [1200, 1900, 2100, 1500, 2000, 1300, 1900, 2100, 1500, 2000, 1300],
      backgroundColor: ['rgba(0, 255, 0, 0.2)'],
      borderColor: ['rgba(0, 255, 0, 1)'],
      borderWidth: 1
    }
  ]
};

export default function graphics() {
  const [activeGraphic, toggleActiveGraphic] = useState(true);
  const [relatorio, activateRelatorio] = useState('active');
  const [faturamento, activateFaturamento] = useState('');
  const chartRef = useRef();

  function setRelatorio() {
    toggleActiveGraphic(true);
    activateRelatorio('active');
    activateFaturamento('');
  }

  function setFaturamento() {
    toggleActiveGraphic(false);
    activateRelatorio('');
    activateFaturamento('active');
  }

  return (
    <Graphics>
      <Container>
        <Buttons>
          <Button
            className={relatorio}
            type="button"
            onClick={() => setRelatorio()}
          >
            Relatório Geral
          </Button>
          <Button
            className={faturamento}
            type="button"
            onClick={() => setFaturamento()}
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

import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { darken } from 'polished';
import { useRef } from 'react';
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
  const chartRef = useRef();

  return (
    <GraphicsContainer>
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
    </GraphicsContainer>
  );
}
